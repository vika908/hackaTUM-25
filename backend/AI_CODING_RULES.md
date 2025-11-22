# AI Coding Agent Rules (Backend)

This file establishes the ground rules for AI agents contributing to the backend project. **Do not update this file unless explicitly instructed by a human user.**

## Core Principles

1.  **MVC / Layered Architecture**: Strictly adhere to the project structure:
    *   `app/api`: Routes and controllers (FastAPI routers).
    *   `app/schemas`: Pydantic models for data validation (Request/Response).
    *   `app/models`: Database models (SQLAlchemy/SQLModel).
    *   `app/services`: Business logic (keep routes clean).
    *   `app/core`: Configuration and global dependencies.
2.  **Type Safety**: Use Python type hints everywhere. Pydantic is your friend.
3.  **FastAPI Best Practices**:
    *   Use `APIRouter` for modularity.
    *   Use Dependency Injection (`Depends`) for services and database sessions.
    *   Return Pydantic models from endpoints.
4.  **No "Magic"**: Explicit is better than implicit. Avoid circular imports.

## Documentation Update Rules

AI agents must maintain the project documentation up-to-date.

### 1. `AI_CODING_RULES.md` (This File)
*   **Update Trigger**: ONLY when explicitly requested by a human user.

### 2. `ARCHITECTURE.md`
*   **Update Trigger**: After a major architectural change (e.g., adding a new layer, changing DB, adding async workers).
*   **Content**: High-level overview of the backend structure, data flow, and key technology decisions.

### 3. Feature Dives (`app/api/v1/endpoints/<feature>_FEATURE_DIVE.md`)
*   **Update Trigger**: Each time a user implements or significantly modifies an endpoint group (feature).
*   **Content**: In-depth technical explanation.
    *   **Routes**: List of endpoints.
    *   **Schemas**: Data models used.
    *   **Services**: Business logic invoked.
    *   **Database**: Tables affected.

## General Workflow

*   When creating a new endpoint group, instantiate a `FEATURE_DIVE.md` from the template.
*   Keep business logic out of the route handlers; delegate to `services`.
