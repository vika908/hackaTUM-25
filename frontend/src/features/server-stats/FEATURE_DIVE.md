# Feature Dive: Server Stats

**Directory**: `src/features/server-stats`

## Overview
This feature provides a simple user interface to check the health status of the backend server. It is useful for diagnostics and verifying connectivity.

## Key Components
*   `ServerStats.tsx`: The main route component. It uses `useServerHealth` to fetch data and renders a `Card` with the status (Online/Offline).
*   `api/get-health.ts`: Contains the API call definition and the React Query hook `useServerHealth`.

## State Management
### Local State
*   None.

### Global State (Redux)
*   None.

### Server State (React Query)
*   **Queries**:
    *   `['health']`: Fetches data from `GET /api/health`.

## API Interactions
*   Endpoints used:
    *   `GET /api/health`
*   **Error Handling**: The component handles `isLoading` and `isError` states provided by React Query to show appropriate UI feedback (spinner or error message).

## Tricky Details
*   **CORS**: The backend must be configured to allow requests from the frontend origin for this to work.
