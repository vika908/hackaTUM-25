# Frontend Architecture

This document provides a bird's eye view of the frontend architecture for the AI Watermarking application.

## Overview

The application is built using **React**, **TypeScript**, and **Vite**, following the **Bulletproof React** architecture. It emphasizes separation of concerns by organizing code into feature-based modules.

### Key Technologies
*   **UI Framework**: React 19
*   **Styling**: Tailwind CSS (v4) with Shadcn UI components.
*   **State Management**: Redux Toolkit (Global), React Query (Server State).
*   **Routing**: React Router DOM (v7).
*   **Forms**: React Hook Form + Zod.
*   **Build Tool**: Vite.

## Page Flow & Features

### 1. Landing Page (`src/features/landing`)
*   **Purpose**: Entry point for users. Showcases the value proposition of the AI watermarking software.
*   **Flow**:
    *   **Hero Section**: Immediate call to action ("Start Watermarking").
    *   **Features**: High-level capabilities.
    *   **How It Works**: Step-by-step process guide.
*   **Architecture**:
    *   Isolated feature with its own routes and components.
    *   Uses shared UI components (`Button`, `Card` concepts) but maintains feature-specific layout.

### 2. Server Stats (`src/features/server-stats`)
*   **Purpose**: Simple diagnostic page to check backend connectivity.
*   **Flow**:
    *   **Status Check**: Pings `/api/health` and displays online/offline status.
*   **Architecture**:
    *   Uses `react-query` for data fetching and state handling (loading/error).

### 3. [Future] Authentication
*   (Planned) Will handle user login/signup flows.

### 3. [Future] Dashboard/Watermarking Tool
*   (Planned) The core application area where users upload and process content.

## Architectural Decisions

*   **Feature-Based Folder Structure**: We avoid grouping by file type (e.g., `components`, `hooks`) globally. Instead, we group by feature. This makes the codebase scalable and easier to maintain.
*   **Provider Pattern**: All global providers (Redux, Router, QueryClient, Helmet) are aggregated in `src/providers/app.tsx`. This keeps `main.tsx` clean and makes testing easier.
*   **Strict Boundary**: Features should not import from other features directly if possible. Shared logic should be moved to `src/components`, `src/hooks`, or `src/utils`.
