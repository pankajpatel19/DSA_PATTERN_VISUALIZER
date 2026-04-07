import React, { useState } from "react";

const SlidingWindowVisualizer = () => {
  const [array] = useState([2, 1, 5, 1, 3, 2, 7, 4]);
  const [k, setK] = useState(3);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const generateSteps = () => {
    if (k > array.length || k <= 0) {
      alert("Invalid K size");
      return;
    }

    let tempSteps = [];
    let maxSum = 0;
    let windowSum = 0;

    for (let i = 0; i < k; i++) {
      windowSum += array[i];
    }
    maxSum = windowSum;

    tempSteps.push({
      start: 0,
      end: k - 1,
      windowSum,
      maxSum,
      description: `Initial compute phase for window size ${k}. Sum = ${windowSum}`,
    });

    for (let i = k; i < array.length; i++) {
      windowSum = windowSum - array[i - k] + array[i];
      let newMaxSum = Math.max(maxSum, windowSum);
      tempSteps.push({
        start: i - k + 1,
        end: i,
        windowSum,
        maxSum: newMaxSum,
        description: `Slide window -> Removed ${array[i - k]}, Added ${array[i]}. Current Sum: ${windowSum}. Max Sum so far: ${newMaxSum}`,
      });
      maxSum = newMaxSum;
    }

    setSteps(tempSteps);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const reset = () => {
    setCurrentStep(-1);
    setSteps([]);
  };

  const currentData = steps[currentStep] || {
    start: -1,
    end: -1,
    windowSum: 0,
    maxSum: 0,
    description: "Ready",
  };

  return (
    <div className="visualizer-card">
      <div className="visualizer-controls">
        <div className="control-group">
          <label>Window Size (K):</label>
          <input
            type="number"
            className="control-input"
            style={{ width: "80px" }}
            value={k}
            min="1"
            max={array.length}
            onChange={(e) => setK(parseInt(e.target.value) || 1)}
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
          const isWindow = idx >= currentData.start && idx <= currentData.end;
          const isAdded = idx === currentData.end && currentStep > 0;
          const isRemoved = idx === currentData.start - 1 && currentStep > 0;

          let borderColor = "var(--border)";
          let bgColor = "var(--bg-secondary)";

          if (isWindow) {
            borderColor = "var(--accent)";
            bgColor = "var(--accent-bg)";
          }

          return (
            <div key={idx} className="array-element-wrapper">
              <span className="element-index">{idx}</span>
              <div
                className="array-element"
                style={{
                  borderColor,
                  backgroundColor: bgColor,
                  transform: isAdded ? "scale(1.1)" : "scale(1)",
                  opacity: isRemoved ? 0.4 : 1,
                }}
              >
                {val}
              </div>
            </div>
          );
        })}
      </div>

      <div className="info-panel">
        <h3>Current State</h3>
        <ul className="info-list">
          <li>
            <strong>Operation:</strong> {currentData.description}
          </li>
          <li>
            <strong>Window Range:</strong> [
            {currentData.start !== -1 ? currentData.start : "-"} ,{" "}
            {currentData.end !== -1 ? currentData.end : "-"}]
          </li>
          <li>
            <strong>Current Window Sum:</strong> {currentData.windowSum}
          </li>
          <li>
            <strong>Max Sum Found:</strong> {currentData.maxSum}
          </li>
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

export default SlidingWindowVisualizer;
