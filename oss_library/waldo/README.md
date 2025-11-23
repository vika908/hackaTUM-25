# 🎨 Waldo (Generation Models)

A collection of custom generative models equipped with advanced watermarking capabilities. These notebooks are designed to be run on **Google Colab** (free T4 GPU recommended) or a local GPU machine.

## 🚀 Quick Start

1.  **Open a Notebook**:
    -   [`gemma-2b-2-it.ipynb`](./gemma-2b-2-it.ipynb) for Text.
    -   [`stablediffusion-v1-5.ipynb`](./stablediffusion-v1-5.ipynb) for Images.
2.  **Install Dependencies**: Run the first cell to install `transformers`, `diffusers`, `fastapi`, etc.
3.  **Configure Tokens**: Add your HuggingFace and Ngrok tokens where indicated.
4.  **Run**: Execute all cells to start the generation server.

## 📡 API & Deployment

The notebooks automatically launch a **FastAPI** server exposed via **Ngrok**.

## Models

Gemma-2b-2-it- A simple model from Google released in 2024 for mainly text generation. We have used SynthID's watermarking and a cheeky watermarking method to add a watermark to the generated text.  
<img width="3364" height="821" alt="gemma_watermark_insertion" src="https://github.com/user-attachments/assets/2aff7278-7359-43f7-84c9-0deef7d3e8aa" />
<img width="4119" height="834" alt="gemma_watermark_detection" src="https://github.com/user-attachments/assets/f7b0b7c8-63cc-417d-9271-cabf87a276fa" />
We have been cheeky here and added a deterministic check as well by hiding zero width spaces in the LLM text. Unfortunately resource limitations did not allow us to find a sweet spot while training the bayesian detector model so we used a combination of the weighted means model and the deterministic check. These detector models are fairly easy to setup if the user wishes so.


StableDiffusion-v1-5- A simple model from HuggingFace released in 2024 for mainly image generation. We have used a custom noise injection method to add a watermark to the generated image. 
<img width="4423" height="699" alt="stable_diffusion_watermark_creation" src="https://github.com/user-attachments/assets/40e268be-174b-44df-9936-35977eb154f1" />
<img width="4318" height="720" alt="stable_diffusion_watermark_detection" src="https://github.com/user-attachments/assets/20ab5a5b-ac2e-4ee6-9dc9-7b633a36dfae" />
