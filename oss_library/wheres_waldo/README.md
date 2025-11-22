A set of detectors for Waldo models.

## Detectors

Waldo-2b-2-it- A simple detector for the Gemma-2b-2-it model with SynthID + cheeky watermark. The cheeky watermark here is the simple \u200b (zero width space) character. This is a deterministic check, so it will always return the same result. Additionally we have configured a simple weighted mean algorithm and a rough draft for training a bayesian classifier. Unfortunately time did not permit us to better the weighted means or the bayesian classifier.

StableDiffusion-v1-5- A simple detector for the StableDiffusion-v1-5 model with fourier noise injection. 
