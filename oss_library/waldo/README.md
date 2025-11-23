A set of custom generative models with different watermarking capabilities enabled. 
The scripts can be easily configured to run on Google Colab using the free T4 GPU.

The models here are already ready to be used as a fastapi server connected with ngrok. Customise ngrok to your liking and run the scripts.

## Models

Gemma-2b-2-it- A simple model from Google released in 2024 for mainly text generation. We have used SynthID's watermarking and a cheeky watermarking method to add a watermark to the generated text.  
<img width="3364" height="821" alt="gemma_watermark_insertion" src="https://github.com/user-attachments/assets/2aff7278-7359-43f7-84c9-0deef7d3e8aa" />
<img width="4119" height="834" alt="gemma_watermark_detection" src="https://github.com/user-attachments/assets/f7b0b7c8-63cc-417d-9271-cabf87a276fa" />


StableDiffusion-v1-5- A simple model from HuggingFace released in 2024 for mainly image generation. We have used a custom noise injection method to add a watermark to the generated image. We used a simple Fourier transform to inject the watermark into the image.
<img width="4423" height="699" alt="stable_diffusion_watermark_creation" src="https://github.com/user-attachments/assets/40e268be-174b-44df-9936-35977eb154f1" />
<img width="4318" height="720" alt="stable_diffusion_watermark_detection" src="https://github.com/user-attachments/assets/20ab5a5b-ac2e-4ee6-9dc9-7b633a36dfae" />
