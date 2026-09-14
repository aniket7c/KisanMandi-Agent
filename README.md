# KisanMandi Agent

> AI-powered mandi intelligence for helping farmers make smarter selling decisions.

KisanMandi Agent is an AI-powered decision-support application that helps farmers identify better mandi options by considering **market prices, distance, transportation costs, and estimated net realization** rather than simply choosing the mandi with the highest listed price.

The application combines a FastAPI backend, live mandi data, a Strands-based AI agent, and a React frontend into a single farmer-focused experience.

---

## Features

- 🌾 **Mandi Recommendation**
  - Find suitable mandi options based on farmer-provided details.
  - Ranks available markets using estimated net realization.

- 💰 **Net Realization Analysis**
  - Considers mandi price and transportation cost.
  - Helps identify the option that may provide better take-home revenue.

- 📊 **Live Mandi Data**
  - Displays available mandi market information.
  - Shows market, commodity, variety, modal price, and distance.

- 🤖 **AI Mandi Agent**
  - Farmers can ask natural-language questions.
  - The agent can reason over mandi-related information and use the mandi tool when required.

- 💬 **Conversational Interface**
  - Chat directly with the KisanMandi agent.
  - Farmer context collected through the calculator can be used alongside the recommendation workflow.

- 📍 **Location-Aware Recommendations**
  - Uses farmer location information when determining relevant mandi options.

- 📈 **Market Comparison**
  - Provides a visual comparison between available mandi options.

---
## Project Structure

```text
KisanMandi-Agent/
│
├── backend/
│   ├── agent/
│   │   ├── mandi_agent.py
│   │   ├── mandi_tools.py
│   │   └── prompts.py
│   │
│   ├── models/
│   │   ├── farmer.py
│   │   └── mandi.py
│   │
│   ├── services/
│   │   ├── agmarknet.py
│   │   ├── location.py
│   │   ├── mandi_service.py
│   │   ├── recommendation.py
│   │   ├── revenue.py
│   │   └── transport.py
│   │
│   ├── tests/
│   ├── config.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── sections/
│   │   │   ├── Architecture/
│   │   │   ├── Calculator/
│   │   │   ├── Chat/
│   │   │   ├── Comparison/
│   │   │   ├── Dilemma/
│   │   │   ├── FinalCTA/
│   │   │   ├── Hero/
│   │   │   ├── Intelligence/
│   │   │   ├── LiveData/
│   │   │   └── Recommendation/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   └── architecture.md
│
├── LICENSE
└── README.md
```
## Tech Stack

Frontend
React
Vite
Tailwind CSS
JavaScript
Backend
Python
FastAPI
Pydantic
Uvicorn
AI Agent
Strands Agents
Gemini
Custom mandi tool
Agent system prompt
Data & Recommendation
Agmarknet market data
Location-based mandi matching
Transportation cost estimation
Net revenue calculation

## How It Works
The farmer enters their state, district, crop, variety and quantity.
The frontend sends the information to the FastAPI backend.
The backend retrieves and processes available mandi information.
Location and transportation costs are considered.
Potential revenue is calculated for each mandi.
Markets are ranked according to estimated net realization.
The frontend displays the recommended mandi and alternatives.
The farmer can also interact directly with the AI mandi agent through the chat interface.
Net Realization
Net Realization = Market Revenue − Transportation Cost

The goal is therefore not simply to find the mandi with the highest listed price, but the option that can provide the farmer with the best estimated take-home realization.

## Data & Attribution

KisanMandi uses agricultural market information and external services where applicable.

External data/services are used according to their respective terms, licenses and attribution requirements.

The project does not claim ownership of third-party data, APIs, libraries, frameworks, models, or other external resources.

## License

This project is licensed under the MIT License.

See the LICENSE file for the complete license text.

## Hackathon

KisanMandi-Agent was developed as a submission for the Agents for Humans hackathon.

The project focuses on applying agentic AI to a practical agricultural decision-support problem: helping farmers make better mandi-selling decisions by considering both market prices and logistics.