import React, { useState } from "react";

const FastSlowPointersVisualizer = () => {
  // Representing a custom linked list setup
  // We'll visualize it in a row/circle-like manner
  // Array format: [value, nextIndex]
  const [nodes] = useState([
    { val: 1, next: 1 },
    { val: 2, next: 2 },
    { val: 3, next: 3 },
    { val: 4, next: 4 },
    { val: 5, next: 5 },
    { val: 6, next: 2 }, // Cycle back to index 2
  ]);

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const generateSteps = () => {
    let tempSteps = [];
    let slow = 0;
    let fast = 0;
    let cycleDetected = false;

    tempSteps.push({
      slow,
      fast,
      description: "Initial state. Slow and Fast pointers at head.",
    });

    while (
      fast !== null &&
      nodes[fast] !== undefined &&
      nodes[nodes[fast].next] !== undefined
    ) {
      slow = nodes[slow].next;
      fast = nodes[nodes[fast].next].next;

      tempSteps.push({
        slow,
        fast,
        description: `Slow moves 1 step. Fast moves 2 steps.`,
      });

      if (slow === fast) {
        cycleDetected = true;
        tempSteps.push({
          slow,
          fast,
          cycleDetected: true,
          description: `Cycle Detected! Slow and Fast pointers meet at node with value ${nodes[slow].val}.`,
        });
        break;
      }
    }

    if (!cycleDetected) {
      tempSteps.push({
        slow,
        fast,
        cycleDetected: false,
        description: "Fast pointer reached end. No cycle detected.",
      });
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
    slow: -1,
    fast: -1,
    cycleDetected: false,
    description: "Ready",
  };

  return (
    <div className="visualizer-card">
      <div className="visualizer-controls">
        <button className="btn btn-primary" onClick={generateSteps}>
          Start Tortoise & Hare
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="array-container" style={{ flexWrap: "wrap", justifyContent: "center" }}>
        {nodes.map((node, idx) => {
          const isSlow = idx === currentData.slow;
          const isFast = idx === currentData.fast;
          
          let borderColor = "var(--border)";
          let bgColor = "var(--bg-secondary)";

          if (isSlow && isFast && currentData.cycleDetected) {
            borderColor = "#10b981"; // Success Green
            bgColor = "rgba(16, 185, 129, 0.1)";
          } else if (isSlow && isFast) {
            borderColor = "#a855f7"; // Purple if they meet before detection confirm?
            bgColor = "rgba(168, 85, 247, 0.1)";
          } else if (isFast) {
            borderColor = "#ef4444"; // Red for Fast
            bgColor = "rgba(239, 68, 68, 0.1)";
          } else if (isSlow) {
            borderColor = "#3b82f6"; // Blue for Slow
            bgColor = "rgba(59, 130, 246, 0.1)";
          }

          return (
            <div key={idx} className="array-element-wrapper" style={{ margin: "10px" }}>
              <span className="element-index">Node {idx}</span>
              <div
                className="array-element"
                style={{
                  borderColor,
                  backgroundColor: bgColor,
                  transform: (isSlow || isFast) ? "scale(1.1)" : "scale(1)",
                  borderRadius: "50%", // Make them circles to look like nodes
                }}
              >
                {node.val}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text)", marginTop: "4px" }}>
                Next: {node.next}
              </div>
              <div style={{ height: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                {isFast && <span className="pointer-label" style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.1)" }}>Hare</span>}
                {isSlow && <span className="pointer-label" style={{ color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)" }}>Tortoise</span>}
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
            <strong>Tortoise (Slow):</strong> Node {currentData.slow !== -1 ? currentData.slow : "-"}
          </li>
          <li>
            <strong>Hare (Fast):</strong> Node {currentData.fast !== -1 ? currentData.fast : "-"}
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

export default FastSlowPointersVisualizer;
