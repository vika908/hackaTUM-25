import hashlib
import numpy as np
from typing import List, Optional

# Default Configuration
DEFAULT_CONFIG = {
    "keys": [
        654, 123, 876, 345, 987, 234, 765, 432,
        111, 222, 333, 444, 555, 666, 777, 888, 999, 1010, 2020, 3030
    ],
    "ngram_len": 5,
    "watermark_bias": 2.0
}

def compute_g_values_for_token(ngram_ids: List[int], next_token_id: int, key: int) -> float:
    data = f"{ngram_ids}-{next_token_id}-{key}".encode('utf-8')
    hash_bytes = hashlib.sha256(data).digest()
    hash_int = int.from_bytes(hash_bytes[:4], 'big')
    return hash_int / (2**32 - 1)

def numpy_weighted_mean_score(g_values: np.ndarray, mask: np.ndarray, weights: Optional[np.ndarray] = None) -> float:
    watermarking_depth = g_values.shape[-1]
    if weights is None: weights = np.ones(watermarking_depth)
    weights = weights * (watermarking_depth / np.sum(weights))
    weighted_g = g_values * weights
    score_per_token = np.sum(weighted_g, axis=1) / watermarking_depth
    num_unmasked = np.sum(mask)
    if num_unmasked == 0: return 0.0
    total_score = np.sum(score_per_token * mask)
    return float(total_score / num_unmasked)

class GemmaDetector:
    def __init__(self, tokenizer, config: dict = None):
        self.tokenizer = tokenizer
        self.config = config or DEFAULT_CONFIG
        self.ngram_len = self.config["ngram_len"]
        self.keys = self.config["keys"]

    def score(self, text: str) -> float:
        ids = self.tokenizer(text, add_special_tokens=True)['input_ids']
        if len(ids) <= self.ngram_len: return 0.0
        seq_len = len(ids) - self.ngram_len

        g_vals = []
        mask = []

        for i in range(seq_len):
            current_token_idx = i + self.ngram_len
            context_ngram = ids[i : i+self.ngram_len]
            token = ids[current_token_idx]

            row_g_vals = []
            for key in self.keys:
                row_g_vals.append(compute_g_values_for_token(context_ngram, token, key))
            g_vals.append(row_g_vals)
            mask.append(1.0)

        if not g_vals: return 0.0
        return numpy_weighted_mean_score(np.array(g_vals), np.array(mask))

    def detect(self, text: str) -> dict:
        if "\u200b" in text:
            return {
                "score": 1.0,
                "verdict": "Watermarked (Hidden Tag Found)",
                "method": "Deterministic"
            }

        score = self.score(text)

        return {
            "score": score,
            "verdict": "Watermarked" if score > 0.60 else "Clean",
            "method": "Statistical"
        }
