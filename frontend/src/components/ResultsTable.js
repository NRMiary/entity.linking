import React from "react";
import { stripHTML } from "../utils";

function ResultsTable({ results, isLoading }) {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h4 className="m-0 font-weight-bold text-primary">Results</h4>
      </div>
      <div className="card-body">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
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
                    <td colSpan="4" className="text-center">No results yet.</td>
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
                            <a href={wikidataUrl} target="_blank" rel="noopener noreferrer">
                              {item.wikidata.description || "View"}
                            </a>
                          ) : (
                            "No info"
                          )}
                        </td>
                        <td>
                          {item.wikipedia ? (
                            <a href={wikipediaUrl} target="_blank" rel="noopener noreferrer">
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
        )}
      </div>
    </div>
  );
}

export default ResultsTable;
