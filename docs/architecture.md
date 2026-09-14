# KisanMandi-Agent — System Architecture

## 1. Overview

KisanMandi-Agent is an AI-powered mandi recommendation system designed to help farmers decide where to sell their crops.

The system combines a web-based frontend, a FastAPI backend, and an AI agent that processes farmer requirements and produces mandi recommendations.

The application supports:

- Mandi recommendation based on farmer and crop information
- Alternative mandi suggestions
- Mandi-related conversational queries
- Health/status monitoring through an API endpoint
- Structured API responses for frontend consumption

---

## 2. High-Level Architecture

```mermaid
flowchart TD

    U[Farmer / User]

    subgraph FRONTEND["Frontend — Vercel"]
        UI[React + Vite Web Application]
        FORM[Farmer Input Form]
        CHAT[AI Mandi Agent Chat]
        RESULT[Recommendation Results]
    end

    subgraph BACKEND["Backend — Render"]
        API[FastAPI API]
        REC["/api/recommend"]
        CHATAPI["/api/chat"]
        HEALTH["/api/health"]

        AGENT[KisanMandi AI Agent]
    end

    subgraph DATA["Mandi / Market Data"]
        MARKET[Market & Mandi Information]
    end

    U --> UI

    UI --> FORM
    UI --> CHAT

    FORM --> REC
    CHAT --> CHATAPI

    REC --> API
    CHATAPI --> API
    HEALTH --> API

    API --> AGENT
    AGENT --> MARKET

    AGENT --> API
    API --> RESULT
    API --> CHAT

    RESULT --> U
    CHAT --> U
