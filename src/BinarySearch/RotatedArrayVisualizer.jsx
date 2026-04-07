import React, { useState } from "react";

const RotatedArrayVisualizer = () => {
  const [array] = useState([4, 5, 6, 7, 0, 1, 2]);
  const [target, setTarget] = useState(0);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(null);

  const generateSteps = () => {
    let low = 0;
    let high = array.length - 1;
    let tempSteps = [];
    let found = false;

    while (low <= high) {
      let mid = Math.floor(low + (high - low) / 2);

      let sortedHalf = array[low] <= array[mid] ? "Left" : "Right";

      tempSteps.push({
        low,
        high,
        mid,
        sortedHalf,
        description: `Mid is ${array[mid]}. ${sortedHalf} half is currently sorted.`,
      });

      if (array[mid] === target) {
        tempSteps.push({
          low,
          high,
          mid,
          sortedHalf: null,
          final: true,
          description: `Target ${target} found at index ${mid}!`,
        });
        found = true;
        break;
      }

      // If left portion is sorted
      if (array[low] <= array[mid]) {
        if (target >= array[low] && target < array[mid]) {
          tempSteps.push({
            low,
            high: mid - 1,
            mid: null,
            description: `Target ${target} is in the sorted left half (${array[low]} to ${array[mid-1]}). Moving HIGH to ${mid - 1}`,
          });
          high = mid - 1;
        } else {
          tempSteps.push({
            low: mid + 1,
            high,
            mid: null,
            description: `Target ${target} is NOT in the left half. Moving LOW to ${mid + 1}.`,
          });
          low = mid + 1;
        }
      } 
      // If right portion is sorted
      else {
        if (target > array[mid] && target <= array[high]) {
          tempSteps.push({
            low: mid + 1,
            high,
            mid: null,
            description: `Target ${target} is in the sorted right half (${array[mid+1]} to ${array[high]}). Moving LOW to ${mid + 1}`,
          });
          low = mid + 1;
        } else {
          tempSteps.push({
            low,
            high: mid - 1,
            mid: null,
            description: `Target ${target} is NOT in the right half. Moving HIGH to ${mid - 1}.`,
          });
          high = mid - 1;
        }
      }
    }

    if (!found) {
      tempSteps.push({
        low: -1,
        high: -1,
        mid: -1,
        final: true,
        notFound: true,
        description: `Target ${target} not found in the array.`,
      });
    }

    setSteps(tempSteps);
    setCurrentStep(0);
    setFoundIndex(null);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (steps[next].final && !steps[next].notFound) {
        setFoundIndex(steps[next].mid);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      setFoundIndex(null);
    }
  };

  const reset = () => {
    setCurrentStep(-1);
    setFoundIndex(null);
    setSteps([]);
  };

  const currentData = steps[currentStep] || {
    low: -1,
    high: -1,
    mid: -1,
    description: "Ready",
  };

  return (
    <div className="visualizer-card">
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
        <button className="btn btn-primary" onClick={generateSteps}>
          Start Search
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="array-container">
        {array.map((val, idx) => {
          let bgColor = "var(--bg-secondary)";
          let borderColor = "var(--border)";

          if (idx === currentData.mid && !currentData.final) {
             bgColor = "rgba(234, 179, 8, 0.1)"; // Yellow
             borderColor = "#eab308";
          }
          if (idx >= currentData.low && idx <= currentData.high && !currentData.final) {
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
                {idx === currentData.low && !currentData.final && (
                  <span className="pointer-label" style={{ color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)" }}>L</span>
                )}
                {idx === currentData.mid && !currentData.final && (
                  <span className="pointer-label" style={{ color: "#eab308", background: "rgba(234, 179, 8, 0.1)" }}>M</span>
                )}
                {idx === currentData.high && !currentData.final && (
                  <span className="pointer-label" style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.1)" }}>H</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="info-panel">
        <h3>Current State</h3>
        <ul className="info-list">
          <li><strong>Operation:</strong> {currentData.description}</li>
          {!currentData.final && (
            <>
              <li>
                <strong>Search Range:</strong> [Low: {currentData.low !== -1 ? currentData.low : "-"}, High: {currentData.high !== -1 ? currentData.high : "-"}]
              </li>
              <li>
                <strong>Midpoint:</strong> Index {currentData.mid !== null && currentData.mid !== -1 ? currentData.mid : "-"}
              </li>
              {currentData.sortedHalf && (
                <li>
                  <strong>Sorted Check:</strong> Conceptually, the <strong>{currentData.sortedHalf}</strong> half is purely sorted ascending right now.
                </li>
              )}
            </>
          )}
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
      </div>
    </div>
  );
};

export default RotatedArrayVisualizer;
