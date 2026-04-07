import React, { useState } from "react";

const BinarySearchVisualizer = () => {
  const [array] = useState([2, 3, 5, 5, 5, 8, 10, 12, 15]);
  const [target, setTarget] = useState(5);
  const [mode, setMode] = useState("lower"); // 'lower' or 'upper'
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(null);

  // Binary Search Logic to generate steps
  const generateSteps = () => {
    let low = 0;
    let high = array.length - 1;
    let ans = array.length;
    let tempSteps = [];

    while (low <= high) {
      let mid = Math.floor(low + (high - low) / 2);
      tempSteps.push({ low, high, mid, ans, checking: mid, description: `Checking midpoint: Index ${mid} (Value: ${array[mid]})` });

      if (mode === "lower") {
        if (array[mid] >= target) {
          ans = mid;
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      } else {
        if (array[mid] > target) {
          ans = mid;
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }
    }
    tempSteps.push({ low, high, mid: null, ans, final: true, description: `Search Complete. Found answer index: ${ans}` });
    setSteps(tempSteps);
    setCurrentStep(0);
    setFoundIndex(null);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (steps[next].final) {
        setFoundIndex(steps[next].ans);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      if (!steps[prev].final) {
        setFoundIndex(null);
      }
    }
  };

  const reset = () => {
    setCurrentStep(-1);
    setFoundIndex(null);
  };

  const currentData = steps[currentStep] || {
    low: -1,
    high: -1,
    mid: -1,
    ans: "?",
    description: "Ready"
  };

  return (
    <div className="visualizer-card">
      {/* Controls */}
      <div className="visualizer-controls">
        <div className="control-group">
          <label>Target:</label>
          <input
            type="number"
            className="control-input"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
            style={{ width: "60px" }}
          />
        </div>
        <div className="control-group">
          <select
            className="control-input"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="lower">Lower Bound (arr[i] ≥ X)</option>
            <option value="upper">Upper Bound (arr[i] &gt; X)</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={generateSteps}>
          Start Search
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      {/* Array Visualization */}
      <div className="array-container">
        {array.map((val, idx) => {
          let bgColor = "var(--bg-secondary)";
          let borderColor = "var(--border)";

          if (idx === currentData.mid) {
             bgColor = "rgba(234, 179, 8, 0.1)"; // Yellow
             borderColor = "#eab308";
          }
          if (idx >= currentData.low && idx <= currentData.high) {
             borderColor = "var(--accent)"; // Blue range
          }
          if (idx === foundIndex) {
             bgColor = "rgba(16, 185, 129, 0.1)"; // Green result
             borderColor = "#10b981";
          }

          return (
            <div key={idx} className="array-element-wrapper">
              <span className="element-index">{idx}</span>
              <div
                className="array-element"
                style={{
                  backgroundColor: bgColor,
                  borderColor: borderColor,
                  transform: idx === currentData.mid ? "scale(1.1)" : "scale(1)",
                  borderWidth: (idx >= currentData.low && idx <= currentData.high) ? "2px" : "1px"
                }}
              >
                {val}
              </div>
              <div style={{ height: "40px", display: "flex", flexDirection: "column", gap: "2px", alignItems: "center" }}>
                {idx === currentData.low && (
                  <span className="pointer-label" style={{ color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)" }}>L</span>
                )}
                {idx === currentData.mid && (
                  <span className="pointer-label" style={{ color: "#eab308", background: "rgba(234, 179, 8, 0.1)" }}>M</span>
                )}
                {idx === currentData.high && (
                  <span className="pointer-label" style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.1)" }}>H</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Panel */}
      <div className="info-panel">
        <h3>Current State</h3>
        <ul className="info-list">
          <li><strong>Operation:</strong> {currentData.description}</li>
          <li>
            <strong>Bounds:</strong> [Low: {currentData.low !== -1 ? currentData.low : "-"}, High: {currentData.high !== -1 ? currentData.high : "-"}]
          </li>
          <li>
            <strong>Midpoint:</strong> Index {currentData.mid !== null && currentData.mid !== -1 ? currentData.mid : "-"}
          </li>
          <li><strong>Temporary Answer (Ans):</strong> {currentData.ans}</li>
        </ul>

        {steps.length > 0 && (
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <button
              className="btn btn-secondary"
              onClick={prevStep}
              disabled={currentStep <= 0}
              style={{ flex: 1 }}
            >
              ← Previous Iteration
            </button>
            <button
              className="btn btn-primary"
              onClick={nextStep}
              disabled={currentStep >= steps.length - 1}
              style={{ flex: 1 }}
            >
              Next Iteration →
            </button>
          </div>
        )}

        {currentData.final && (
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              padding: "16px",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              color: "#10b981",
              border: "1px solid #10b981",
              borderRadius: "8px",
            }}
          >
            <strong>
              Final {mode === "lower" ? "Lower" : "Upper"} Bound Index:{" "}
              {currentData.ans}
            </strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;
