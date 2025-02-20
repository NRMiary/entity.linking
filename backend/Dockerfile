# Use an official Python base image
FROM python:3.11

# Set the working directory inside the container
WORKDIR /entity.linking

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download the spaCy language model (adjust model name as needed)
RUN python -m spacy download en_core_web_sm

# Copy the entire backend source code into the container
COPY . .

# Expose the port FastAPI will run on
EXPOSE 8000

# Run the application in development mode with auto-reload
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
