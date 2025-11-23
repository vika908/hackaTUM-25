# 🕵️‍♂️ Waldo: AI Watermarking & Detection Platform

> **"Waldo hides, we find."**

Waldo is a comprehensive platform for generating and detecting watermarks in AI-generated content (Text & Images). It consists of a web application for easy interaction and an open-source library for researchers and developers.

## 📂 Project Structure

- **[`frontend/`](./frontend)**: A Next.js web interface for users to generate and detect watermarks.
- **[`backend/`](./backend)**: A FastAPI server handling the core logic and model inference.
- **[`oss_library/`](./oss_library)**: A standalone open-source library containing:
    -   **`waldo`**: Notebooks for generating watermarked content.
    -   **`wheres_waldo`**: A lightweight Python package for detection.

---  
## 📚 Open Source Library

We have extracted our core research into a standalone library for the community.

👉 **[Explore the OSS Library](./oss_library/README.md)**

It includes:
- **Gemma Detector**: Detects invisible zero-width characters and statistical watermarks in text.
- **Stable Diffusion Detector**: Analyzes frequency domain (FFT) to find injected noise patterns in images.

---

## 🚀 Quick Start

### 1. Backend Setup
The backend powers the detection API.

```bash
# 1. Create & Activate Virtual Environment
python -m venv venv
./venv/Scripts/activate  # Windows
# source venv/bin/activate # Linux/Mac

# 2. Install Dependencies
pip install -r "requirements.txt"

# 3. Authenticate (Required for Vertex AI)
gcloud auth application-default login

# 4. Run Server
fastapi dev app/main.py
```

### 2. Frontend Setup
The frontend provides the user interface.

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to use the app.
Check system status at `http://localhost:3000/health`.

---
### 3. Remote Access
We've hosted a running frontend for you: [Waldo](https://hacka-tum-25.vercel.app/).  

## 🔬 References & Research

This project implements concepts from the following papers:

- [Scalable watermarking for identifying large language model outputs: SynthID Text (Google)](https://www.nature.com/articles/s41586-024-08025-4)
- [Gemma 2: Improving Open Language Models at a Practical Size](https://arxiv.org/abs/2408.00118)
- [High-Resolution Image Synthesis with Latent Diffusion Models](https://arxiv.org/abs/2112.10752)
- [Secure Data Embedding using Fourier Transform-based Watermarking](https://ieeexplore.ieee.org/document/10726146)
