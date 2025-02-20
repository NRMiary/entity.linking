import React, { useState } from "react";
import axios from "axios";

// Helper function to remove HTML tags from a string
function stripHTML(html) {
  return html.replace(/<[^>]+>/g, "");
}

function App() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);

  const handleAnalyze = async () => {
    try {
      const response = await axios.post(
        "/process",
        { text },
        { headers: { "Content-Type": "application/json" } }
      );
      setResults(response.data.entities);
    } catch (error) {
      console.error("Error processing text:", error.response || error);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-4">Entity Linking Web</h1>
      <p className="mb-4">
        Extract and link entities from your text using Wikidata and Wikipedia.
      </p>

      {/* Text Input Card */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary">Enter Your Text</h4>
        </div>
        <div className="card-body">
          <div className="form-group">
            <textarea
              className="form-control bg-light border-0"
              placeholder="Enter your text here..."
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary mt-2"
              type="button"
              onClick={handleAnalyze}
            >
              <i className="fas fa-search fa-sm"></i> Analyze
            </button>
          </div>
        </div>
      </div>

      {/* Results Table Card */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary">Results</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Label</th>
                  <th>Wikidata</th>
                  <th>Wikipedia</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No results yet.
                    </td>
                  </tr>
                ) : (
                  results.map((item, index) => {
                    const wikidataUrl = item.wikidata
                      ? `https://www.wikidata.org/wiki/${item.wikidata.id}`
                      : null;
                    const wikipediaUrl = item.wikipedia
                      ? `https://en.wikipedia.org/wiki/${encodeURIComponent(
                          item.wikipedia.title.replace(/ /g, "_")
                        )}`
                      : null;
                    return (
                      <tr key={index}>
                        <td>{item.entity.text}</td>
                        <td>{item.entity.label}</td>
                        <td>
                          {item.wikidata ? (
                            <a
                              href={wikidataUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.wikidata.description || "View"}
                            </a>
                          ) : (
                            "No info"
                          )}
                        </td>
                        <td>
                          {item.wikipedia ? (
                            <a
                              href={wikipediaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {stripHTML(item.wikipedia.snippet) || "View"}
                            </a>
                          ) : (
                            "No info"
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
