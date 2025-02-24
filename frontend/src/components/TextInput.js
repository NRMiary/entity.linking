import React from "react";

function TextInput({ text, onTextChange, onAnalyze, isLoading }) {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h4 className="m-0 font-weight-bold text-primary">Enter your text</h4>
      </div>
      <div className="card-body">
        <div className="form-group">
          <textarea
            className="form-control bg-light border-0"
            placeholder="Enter your text here..."
            rows="4"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary mt-2"
            type="button"
            onClick={onAnalyze}
            disabled={isLoading}
          >
            <i className="fas fa-search fa-sm"></i> {isLoading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextInput;
