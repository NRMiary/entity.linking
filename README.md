# Entity Linking Web

This project is a web application that extracts and links entities from a given free text using FastAPI, spaCy, and external APIs (Wikidata and Wikipedia) for enrichment. The application consists of a FastAPI-based backend and a React-based frontend. Docker is used to orchestrate both services for development and production.

## Features

- **Entity Extraction:** Uses spaCy to extract entities from input text.
- **Entity Linking:** Enriches entities by linking them to corresponding entries in Wikidata and Wikipedia.
- **Modern UI:** Responsive user interface built with React and styled using the SB Admin 2 template.
- **Docker Integration:** Uses Docker and docker-compose for easy setup and deployment.
- **Development Mode:** Auto-reload enabled for backend and frontend for faster development cycles.

## Project structure

```plaintext
entity.linking/
│
├── backend/                   # FastAPI backend
│   ├── main.py                # FastAPI application entry point
│   ├── requirements.txt       # Python dependencies (e.g., fastapi, uvicorn, spacy, requests)
│   ├── Dockerfile             # Docker configuration for the backend
│   └── ...                    # Other backend files
│
├── frontend/                  # React frontend
│   ├── public/                # Static assets (HTML, icons, etc.)
│   ├── src/                   # React source code
│   ├── package.json           # npm dependencies and scripts
│   ├── Dockerfile             # Docker configuration for the frontend
│   └── ...                    # Other frontend files
│
├── docker-compose.yml         # Orchestrates backend and frontend containers
├── .gitignore                 # Files and directories to exclude from Git
└── README.md                  # Project documentation
```
---


## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.
- Alternatively, for local development, you’ll need Python (≥3.9), Node.js (≥16), and npm.

### Using Docker (Recommended)

  **Clone the Repository:**

   ```bash
   git clone https://github.com/NRMiary/entity.linking.git
   cd my-project
  ```
  ---

  **Build and Run the Containers:** 
  ```bash
  docker-compose up --build
  ```
  ---

  **Access the Services:** 

    FastAPI backend: http://localhost:8000
    React frontend: http://localhost:3000

### Local Development Setup
  **Backend (FastAPI)** 
  - Navigate to the backend directory.
  - Create and activate a virtual environment:
    ```bash
     python -m venv env
     source env/bin/activate   # On Windows use: env\Scripts\activate
    ```
    ---
  - Install the dependencies:
     ```bash
     pip install -r requirements.txt
    ```
    ---
  - Download the spaCy language model:
    ```bash
     python -m spacy download en_core_web_sm
    ```
    ---
  - Start the FastAPI application in development mode:
    ```bash
     uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```
    ---
  **Frontend (React)** 

  - Navigate to the frontend directory.
  - Install npm dependencies:
    ```bash
     npm install
    ```
    ---
  - Start the React development server:
    ```bash
     npm start
    ```
    ---
  - Open [http://localhost:3000](http://localhost:3000) in your browser.


### How It Works
  - **Enter Your Text:** 
    Type or paste your free text in the input area on the React frontend and click "Analyze".
  - **Entity Extraction & Linking:** 
    The FastAPI backend processes the text using spaCy to extract entities and then links each entity to its corresponding entries on Wikidata and Wikipedia.
  - **View Results:** 
    The extracted entities are displayed in a table with columns for the entity name, label, and links to Wikidata and Wikipedia pages. Clicking a link opens the corresponding page in a new tab.









