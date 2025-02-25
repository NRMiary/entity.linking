import React, { useState } from "react";
import axios from "axios";
import TextInput from "./components/TextInput";
import ResultsTable from "./components/ResultsTable";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle text change and update results accordingly
  const handleTextChange = (newText) => {
    setText(newText);
    setResults((prevResults) =>
      prevResults.filter((result) => newText.includes(result.entity.text))
    );
  };

  // Handle analyze button click
  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/process",
        { text },
        { headers: { "Content-Type": "application/json" } }
      );
      setResults(response.data.entities);
    } catch (error) {
      console.error("Error processing text:", error.response || error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-4">Entity Linking Web</h1>
      <p className="mb-4">
        Extract and link entities from your text using Wikidata and Wikipedia.
      </p>

      {/* Text Input Component */}
      <TextInput
        text={text}
        onTextChange={handleTextChange}
        onAnalyze={handleAnalyze}
        isLoading={isLoading}
      />

      {/* Results Table Component */}
      <ResultsTable results={results} isLoading={isLoading} />
    </div>
  );
}

export default App;
