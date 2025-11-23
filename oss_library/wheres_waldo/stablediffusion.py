import numpy as np
from PIL import Image

def get_radial_profile(fft_shift, center, max_r):
    y, x = np.indices(fft_shift.shape)
    r = np.sqrt((x - center[1])**2 + (y - center[0])**2)
    r = r.astype(int)

    tbin = np.bincount(r.ravel(), fft_shift.ravel())
    nr = np.bincount(r.ravel())

    radialprofile = np.zeros_like(tbin, dtype=float)
    nonzero = nr > 0
    radialprofile[nonzero] = tbin[nonzero] / nr[nonzero]

    return radialprofile[:max_r]

class StableDiffusionDetector:
    def __init__(self, target_radius: int = 40, threshold: float = 3.0):
        self.target_radius = target_radius
        self.threshold = threshold

    def detect(self, image: Image.Image) -> dict:
        """Returns detection result dict with z-score and verdict."""
        img_gray = image.convert("L")
        img_arr = np.array(img_gray)

        f = np.fft.fft2(img_arr)
        fshift = np.fft.fftshift(f)
        magnitude = np.abs(fshift)

        center = (magnitude.shape[0] // 2, magnitude.shape[1] // 2)
        profile = get_radial_profile(magnitude, center, max_r=self.target_radius + 20)

        if self.target_radius >= len(profile):
             return {
                "z_score": 0.0,
                "is_generated": False,
                "confidence": "Low (Radius out of bounds)"
            }

        signal = profile[self.target_radius]

        start_idx = max(0, self.target_radius - 5)
        end_idx_1 = max(0, self.target_radius - 2)
        start_idx_2 = min(len(profile), self.target_radius + 2)
        end_idx_2 = min(len(profile), self.target_radius + 5)
        
        neighbors = np.concatenate([
            profile[start_idx : end_idx_1],
            profile[start_idx_2 : end_idx_2]
        ])
        
        if len(neighbors) == 0:
             return {
                "z_score": 0.0,
                "is_generated": False,
                "confidence": "Low (No neighbors)"
            }

        noise_mean = np.mean(neighbors)
        noise_std = np.std(neighbors)

        z_score = (signal - noise_mean) / (noise_std + 1e-8)
        z_score = float(z_score)

        is_detected = z_score > self.threshold

        if z_score > 6.0: confidence = "Very High"
        elif z_score > 3.0: confidence = "High"
        elif z_score > 2.0: confidence = "Suspect"
        else: confidence = "Low"

        return {
            "z_score": z_score,
            "is_generated": is_detected,
            "confidence": confidence
        }
