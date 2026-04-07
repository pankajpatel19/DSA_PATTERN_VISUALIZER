import React, { useState } from "react";

const TwoPointersVisualizer = () => {
  const [array] = useState([2, 5, 8, 12, 16, 23, 28, 30, 35]);
  const [target, setTarget] = useState(31);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const generateSteps = () => {
    let tempSteps = [];
    let left = 0;
    let right = array.length - 1;
    let found = false;

    while (left < right) {
      const currentSum = array[left] + array[right];
      
      tempSteps.push({
        left,
        right,
        currentSum,
        found: false,
        description: `Checking L(${array[left]}) + R(${array[right]}) = ${currentSum}`,
      });

      if (currentSum === target) {
        tempSteps.push({
          left,
          right,
          currentSum,
          found: true,
          description: `Target ${target} found at indices ${left} and ${right}!`,
        });
        found = true;
        break;
      } else if (currentSum < target) {
        tempSteps.push({
          left: left + 1,
          right,
          currentSum: null,
          found: false,
          description: `${currentSum} < ${target}. Moving Left pointer →`,
        });
        left++;
      } else {
        tempSteps.push({
          left,
          right: right - 1,
          currentSum: null,
          found: false,
          description: `${currentSum} > ${target}. Moving Right pointer ←`,
        });
        right--;
      }
    }

    if (!found) {
      tempSteps.push({
        left,
        right,
        currentSum: null,
        found: false,
        description: `Search exhausted. Target ${target} not found.`,
      });
    }

    setSteps(tempSteps);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const reset = () => {
    setCurrentStep(-1);
    setSteps([]);
  };

  const currentData = steps[currentStep] || {
    left: -1,
    right: -1,
    currentSum: null,
    found: false,
    description: "Ready",
  };

  return (
    <div className="visualizer-card">
      <div className="visualizer-controls">
        <div className="control-group">
          <label>Target Sum:</label>
          <input
            type="number"
            className="control-input"
            style={{ width: "80px" }}
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
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
          const isLeft = idx === currentData.left;
          const isRight = idx === currentData.right;
          
          let borderColor = "var(--border)";
          let bgColor = "var(--bg-secondary)";

          if (currentData.found && (isLeft || isRight)) {
            borderColor = "#10b981"; // Success Green
            bgColor = "rgba(16, 185, 129, 0.1)";
          } else if (isLeft) {
            borderColor = "#3b82f6"; // Blue
            bgColor = "rgba(59, 130, 246, 0.1)";
          } else if (isRight) {
            borderColor = "#ef4444"; // Red
            bgColor = "rgba(239, 68, 68, 0.1)";
          }

          return (
            <div key={idx} className="array-element-wrapper">
              <span className="element-index">{idx}</span>
              <div
                className="array-element"
                style={{
                  borderColor,
                  backgroundColor: bgColor,
                  transform: (isLeft || isRight) ? "scale(1.1) translateY(-5px)" : "scale(1)",
                }}
              >
                {val}
              </div>
              <div style={{ height: "20px", display: "flex", justifyContent: "center" }}>
                {isLeft && <span className="pointer-label" style={{ color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)" }}>L</span>}
                {isRight && <span className="pointer-label" style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.1)" }}>R</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="info-panel">
        <h3>Current State</h3>
        <ul className="info-list">
          <li><strong>Operation:</strong> {currentData.description}</li>
          <li>
            <strong>Left Pointer:</strong> Index {currentData.left !== -1 ? currentData.left : "-"} 
            {currentData.left !== -1 && ` (Value: ${array[currentData.left]})`}
          </li>
          <li>
            <strong>Right Pointer:</strong> Index {currentData.right !== -1 ? currentData.right : "-"}
            {currentData.right !== -1 && ` (Value: ${array[currentData.right]})`}
          </li>
          <li><strong>Current Sum:</strong> {currentData.currentSum !== null ? currentData.currentSum : "-"}</li>
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

export default TwoPointersVisualizer;
