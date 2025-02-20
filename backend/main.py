from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from utils import extract_entities, query_wikidata, query_wikipedia

app = FastAPI()

# Define allowed CORS origins 
ALLOWED_ORIGINS = [
    "http://localhost",
    "http://localhost:3000"
]  

# Allow CORS so that the frontend can access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

@app.post("/process", response_model=dict)
def process_text(input: TextInput) -> dict:
    """
    Process the input text, extract named entities, and retrieve information from Wikidata and Wikipedia.
    
    Args:
        input (TextInput): The text input from the request.

    Returns:
        dict: A dictionary containing the original text and the extracted entities with additional information.
    """
    entities = extract_entities(input.text)

    results = [
        {
            "entity": ent,
            "wikidata": query_wikidata(ent["text"]),
            "wikipedia": query_wikipedia(ent["text"])
        }
        for ent in entities
    ]

    return {"text": input.text, "entities": results}
