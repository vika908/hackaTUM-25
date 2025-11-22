# Feature Dive: Gemma SynthID Integration

## Overview
The **Gemma SynthID Integration** feature allows users to generate text using the Gemma model and compare the standard output with a watermarked version generated using Google DeepMind's SynthID technology. This feature demonstrates the capability to embed invisible watermarks into AI-generated text for authenticity and traceability.

## User Flow
1.  **Navigation**: Users access the feature via the "Try out LLM watermarking & SynthID" button on the landing page or by navigating to `/gemma-synthID`.
2.  **Input**: The user enters a prompt in the text area.
3.  **Generation**: Upon clicking "Generate", the frontend sends a request to the backend (`POST /api/v1/watermark/compare`).
4.  **Comparison**: The application displays two results side-by-side:
    *   **Standard Response**: The clean, unwatermarked text.
    *   **Watermarked Response**: The text containing the invisible SynthID watermark.

## Technical Implementation

### Frontend
*   **Route**: `/gemma-synthID`
*   **Components**:
    *   `GemmaSynthGenerator`: Main page controller.
    *   `GemmaSynthForm`: Input form with loading state.
    *   `GemmaSynthResult`: Side-by-side comparison display.
*   **API**: `getWatermarkComparison` calls the backend endpoint.

### Backend
*   **Endpoint**: `POST /api/v1/watermark/compare`
*   **Service**: `watermark_service.compare_text` handles the interaction with the Vertex AI endpoint.

## Future Improvements
*   **Watermark Detection**: Add a feature to verify if a given text contains a watermark.
*   **Visual Indicators**: Highlight subtle differences or provide a confidence score for the watermark.
*   **Model Selection**: Allow users to choose different models or watermark configurations.
