import React, { useState } from "react";

const MATRIX = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
];

const MatrixSearchVisualizer = () => {
  const [matrix] = useState(MATRIX);
  const [target, setTarget] = useState(11);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [foundCell, setFoundCell] = useState(null); // { row, col }

  const rows = matrix.length;
  const cols = matrix[0].length;
  const total = rows * cols;

  const generateSteps = () => {
    let low = 0;
    let high = total - 1;
    const tempSteps = [];
    let found = false;

    while (low <= high) {
      const mid = Math.floor(low + (high - low) / 2);
      const row = Math.floor(mid / cols);
      const col = mid % cols;
      const val = matrix[row][col];

      tempSteps.push({
        low,
        high,
        mid,
        midRow: row,
        midCol: col,
        midVal: val,
        description: `Checking virtual index ${mid} → matrix[${row}][${col}] = ${val}`,
      });

      if (val === target) {
        tempSteps.push({
          low,
          high,
          mid,
          midRow: row,
          midCol: col,
          midVal: val,
          final: true,
          description: `Target ${target} found at matrix[${row}][${col}] (virtual index ${mid})!`,
        });
        found = true;
        break;
      } else if (val < target) {
        tempSteps.push({
          low: mid + 1,
          high,
          mid: null,
          description: `${val} < ${target}. Moving Low to virtual index ${mid + 1}.`,
        });
        low = mid + 1;
      } else {
        tempSteps.push({
          low,
          high: mid - 1,
          mid: null,
          description: `${val} > ${target}. Moving High to virtual index ${mid - 1}.`,
        });
        high = mid - 1;
      }
    }

    if (!found) {
      tempSteps.push({
        low: -1,
        high: -1,
        mid: -1,
        final: true,
        notFound: true,
        description: `Target ${target} not found in the matrix.`,
      });
    }

    setSteps(tempSteps);
    setCurrentStep(0);
    setFoundCell(null);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      const s = steps[next];
      if (s.final && !s.notFound) {
        setFoundCell({ row: s.midRow, col: s.midCol });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setFoundCell(null);
    }
  };

  const reset = () => {
    setCurrentStep(-1);
    setFoundCell(null);
    setSteps([]);
  };

  const cur = steps[currentStep] || { low: -1, high: -1, mid: null, description: "Ready" };

  const toVirtual = (r, c) => r * cols + c;

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
            style={{ width: "70px" }}
          />
        </div>
        <button className="btn btn-primary" onClick={generateSteps}>
          Start Search
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      {/* Matrix Grid */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          margin: "32px 0",
        }}
      >
        {matrix.map((row, r) => (
          <div key={r} style={{ display: "flex", gap: "8px" }}>
            {row.map((val, c) => {
              const vi = toVirtual(r, c);
              const isMid = cur.mid === vi;
              const inRange = cur.low !== -1 && vi >= cur.low && vi <= cur.high;
              const isFound = foundCell?.row === r && foundCell?.col === c;

              let bgColor = "var(--bg-secondary)";
              let borderColor = "var(--border)";

              if (isMid) {
                bgColor = "rgba(234, 179, 8, 0.15)";
                borderColor = "#eab308";
              }
              if (inRange && !cur.final) {
                borderColor = "var(--accent)";
              }
              if (isFound) {
                bgColor = "rgba(16, 185, 129, 0.15)";
                borderColor = "#10b981";
              }

              return (
                <div key={c} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--text)",
                      marginBottom: "4px",
                    }}
                  >
                    [{r},{c}]
                  </div>
                  <div
                    className="array-element"
                    style={{
                      width: "56px",
                      height: "56px",
                      fontSize: "1rem",
                      backgroundColor: bgColor,
                      borderColor,
                      borderWidth: inRange || isMid || isFound ? "2px" : "1px",
                      transform: isMid ? "scale(1.12)" : "scale(1)",
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--text)",
                      marginTop: "4px",
                    }}
                  >
                    i={vi}
                  </div>
                  {isMid && (
                    <span
                      className="pointer-label"
                      style={{
                        color: "#eab308",
                        background: "rgba(234,179,8,0.1)",
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      M
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="info-panel">
        <h3>Current State</h3>
        <ul className="info-list">
          <li>
            <strong>Operation:</strong> {cur.description}
          </li>
          {!cur.final && (
            <>
              <li>
                <strong>Virtual Range:</strong> [Low: {cur.low !== -1 ? cur.low : "-"}, High:{" "}
                {cur.high !== -1 ? cur.high : "-"}]
              </li>
              <li>
                <strong>Virtual Mid:</strong>{" "}
                {cur.mid !== null ? `${cur.mid} → matrix[${cur.midRow}][${cur.midCol}]` : "-"}
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

export default MatrixSearchVisualizer;
