# Backend Architecture

This document provides a bird's eye view of the backend architecture for the AI Watermarking application.

## Overview

The backend is built using **FastAPI**, following a modular **MVC-like (Model-View-Controller)** or **Layered** architecture. It emphasizes separation of concerns, type safety, and scalability.

### Key Technologies
*   **Framework**: FastAPI
*   **Language**: Python 3.10+
*   **Data Validation**: Pydantic
*   **Configuration**: Pydantic Settings
*   **Server**: Uvicorn

## Application Structure

The application is organized into the following layers:

### 1. API Layer (`app/api`)
*   **Responsibility**: Handle HTTP requests, validate inputs (via Schemas), and return responses.
*   **Components**: `APIRouter` instances defined in `endpoints`.
*   **Flow**: Request -> Router -> Service -> Response.

### 2. Service Layer (`app/services`)
*   **Responsibility**: Contain the business logic. This layer is agnostic of the HTTP transport.
*   **Components**: Functions or Classes that perform operations (e.g., `create_user`, `process_watermark`).
*   **Flow**: Service -> Database Model / External API.

### 3. Data Layer
*   **Schemas (`app/schemas`)**: Pydantic models used for API request bodies and response objects. They define the "shape" of the data at the API boundary.
*   **Models (`app/models`)**: (Planned) Database models (e.g., SQLAlchemy) representing tables in the database.

### 4. Core (`app/core`)
*   **Responsibility**: Global configuration, settings, and security utilities.
*   **Components**: `config.py` (Settings).

## Key Decisions

*   **Router-based Modularity**: We use `APIRouter` to split the application into logical features (e.g., `users`, `auth`). These are aggregated in `app/api/v1/router.py`.
*   **Pydantic for Everything**: We use Pydantic for both settings management and data validation, ensuring type safety throughout the application.
*   **Service Pattern**: We avoid putting logic inside route handlers. Routes should be thin wrappers around services.
