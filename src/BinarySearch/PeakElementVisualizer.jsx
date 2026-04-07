import React, { useState } from "react";

const PeakElementVisualizer = () => {
  const [array] = useState([1, 2, 1, 3, 5, 6, 4]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(null);

  const generateSteps = () => {
    let low = 0;
    let high = array.length - 1;
    let tempSteps = [];

    while (low < high) {
      let mid = Math.floor(low + (high - low) / 2);
      
      tempSteps.push({
        low,
        high,
        mid,
        checking: [mid, mid + 1],
        description: `Comparing Mid (${array[mid]}) with Mid+1 (${array[mid + 1]})`,
      });

      if (array[mid] > array[mid + 1]) {
        tempSteps.push({
          low,
          high: mid, // Mid might be the peak
           mid: null,
          checking: [],
          description: `${array[mid]} > ${array[mid+1]}. Descending slope. Peak must be at Mid or before Mid. Moving High to Mid(${mid}).`,
        });
        high = mid;
      } else {
        tempSteps.push({
          low: mid + 1,
          high,
          mid: null,
          checking: [],
          description: `${array[mid]} <= ${array[mid+1]}. Ascending slope. Peak must be after Mid. Moving Low to Mid+1(${mid + 1}).`,
        });
        low = mid + 1;
      }
    }

    tempSteps.push({
      low,
      high,
      mid: low,
      checking: [],
      final: true,
      description: `Low and High converged. Peak Element found at index ${low} (Value: ${array[low]}).`,
    });

    setSteps(tempSteps);
    setCurrentStep(0);
    setFoundIndex(null);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (steps[next].final) {
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
    checking: [],
    description: "Ready",
  };

  return (
    <div className="visualizer-card">
      <div className="visualizer-controls">
        <button className="btn btn-primary" onClick={generateSteps}>
          Find Peak
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="array-container">
        {array.map((val, idx) => {
          let bgColor = "var(--bg-secondary)";
          let borderColor = "var(--border)";

          if (currentData.checking && currentData.checking.includes(idx)) {
             bgColor = "rgba(168, 85, 247, 0.1)"; // Purple for comparing
             borderColor = "#a855f7";
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
                  transform: currentData.checking?.includes(idx) ? "scale(1.1)" : "scale(1)",
                  borderWidth: (idx >= currentData.low && idx <= currentData.high) ? "2px" : "1px"
                }}
              >
                {val}
              </div>
              <div style={{ height: "40px", display: "flex", flexDirection: "column", gap: "2px", alignItems: "center" }}>
                {idx === currentData.low && !currentData.final && (
                  <span className="pointer-label" style={{ color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)" }}>L</span>
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

export default PeakElementVisualizer;
