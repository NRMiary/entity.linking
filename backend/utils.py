import spacy
import requests

# Load the language model once at the module level
nlp = spacy.load("en_core_web_sm")


def extract_entities(text: str) -> list[dict]:
    """
    Extract named entities from the given text using spaCy.
    
    Args:
        text (str): The input text.

    Returns:
        list[dict]: A list of dictionaries containing extracted entities and their labels.
    """
    doc = nlp(text)
    return [{"text": ent.text, "label": ent.label_} for ent in doc.ents]


def query_wikidata(entity_text: str) -> dict | None:
    """
    Query the Wikidata API to retrieve information about the given entity.

    Args:
        entity_text (str): The entity to search for.

    Returns:
        dict | None: The first search result from Wikidata, or None if no result is found.
    """
    url = "https://www.wikidata.org/w/api.php"
    params = {
        "action": "wbsearchentities",
        "format": "json",
        "language": "en",
        "search": entity_text
    }
    
    response = requests.get(url, params=params)
    response.raise_for_status()  # Raises an error for HTTP issues

    data = response.json()
    return data.get("search", [None])[0]  # Return first result or None


def query_wikipedia(entity_text: str) -> dict | None:
    """
    Query the Wikipedia API to retrieve a snippet of the corresponding article.

    Args:
        entity_text (str): The entity to search for.

    Returns:
        dict | None: The first search result from Wikipedia, or None if no result is found.
    """
    url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "list": "search",
        "srsearch": entity_text,
        "format": "json"
    }
    
    response = requests.get(url, params=params)
    response.raise_for_status()  # Raises an error for HTTP issues

    data = response.json()
    return data.get("query", {}).get("search", [None])[0]  # Return first result or None
