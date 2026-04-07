import React, { useState } from "react";

// Koko Eating Bananas problem:
// piles = [3, 6, 7, 11], h = 8 hours
// Find minimum k (bananas/hr) such that Koko can eat all piles in h hours
const DEFAULT_PILES = [3, 6, 7, 11];
const DEFAULT_HOURS = 8;

const canFinish = (piles, k, h) => {
  let totalHours = 0;
  for (const pile of piles) {
    totalHours += Math.ceil(pile / k);
  }
  return totalHours <= h;
};

const hoursNeeded = (piles, k) => {
  return piles.reduce((sum, pile) => sum + Math.ceil(pile / k), 0);
};

const BinarySearchOnAnswerVisualizer = () => {
  const [piles] = useState(DEFAULT_PILES);
  const [h] = useState(DEFAULT_HOURS);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const maxPile = Math.max(...piles);

  const generateSteps = () => {
    let low = 1;
    let high = maxPile;
    let ans = high;
    const tempSteps = [];

    while (low <= high) {
      const mid = Math.floor(low + (high - low) / 2);
      const hours = hoursNeeded(piles, mid);
      const possible = hours <= h;

      tempSteps.push({
        low,
        high,
        mid,
        hours,
        possible,
        ans,
        description: `Trying speed k=${mid}: needs ${hours} hrs (limit=${h}). ${
          possible
            ? `✓ Feasible! Record ans=${mid}, search smaller.`
            : `✗ Too slow. Need faster speed.`
        }`,
      });

      if (possible) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    tempSteps.push({
      low,
      high,
      mid: null,
      final: true,
      ans,
      description: `Minimum eating speed found: k = ${ans} bananas/hour.`,
    });

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

  const cur = steps[currentStep] || {
    low: -1,
    high: -1,
    mid: null,
    ans: maxPile,
    description: "Ready",
  };

  // Build the answer-space range for visualization
  const answerRange = Array.from({ length: maxPile }, (_, i) => i + 1);

  return (
    <div className="visualizer-card">
      {/* Problem Description Banner */}
      <div
        style={{
          background: "var(--accent-bg)",
          border: "1px solid var(--accent-border)",
          borderRadius: "8px",
          padding: "14px 18px",
          marginBottom: "20px",
          fontSize: "0.9rem",
          color: "var(--text)",
          lineHeight: "1.6",
        }}
      >
        <strong style={{ color: "var(--accent)" }}>
          Problem (Koko Eating Bananas):
        </strong>{" "}
        Piles ={" "}
        <code style={{ color: "var(--text-h)" }}>[{piles.join(", ")}]</code>,
        Hours limit = <code style={{ color: "var(--text-h)" }}>{h}</code>. Find
        the <em>minimum</em> eating speed <code>k</code> so Koko finishes all
        piles in time. Search space: 1 to {maxPile}.
      </div>

      <div className="visualizer-controls">
        <button className="btn btn-primary" onClick={generateSteps}>
          Find Minimum Speed
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      {/* Piles visualization */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--text)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 600,
          }}
        >
          Banana Piles
        </span>
      </div>
      <div
        className="array-container"
        style={{ marginTop: "8px", marginBottom: "16px" }}
      >
        {piles.map((pile, idx) => {
          const hoursForThisPile =
            cur.mid !== null ? Math.ceil(pile / cur.mid) : null;
          return (
            <div key={idx} className="array-element-wrapper">
              <span className="element-index">Pile {idx + 1}</span>
              <div
                className="array-element"
                style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "1.2rem",
                  borderColor: "var(--accent-border)",
                  backgroundColor: "var(--accent-bg)",
                }}
              >
                {pile}
              </div>
              {cur.mid !== null && (
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text)",
                    marginTop: "4px",
                  }}
                >
                  ⌈{pile}/{cur.mid}⌉ = {hoursForThisPile}h
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Answer Space Range visualization */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--text)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 600,
          }}
        >
          Search Space (k = 1 to {maxPile})
        </span>
      </div>
      <div
        className="array-container"
        style={{
          marginTop: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {answerRange.map((k) => {
          const isMid = cur.mid === k;
          const inRange = cur.low !== -1 && k >= cur.low && k <= cur.high;
          const isAns = cur.final && cur.ans === k;

          let bgColor = "var(--bg-secondary)";
          let borderColor = "var(--border)";

          if (inRange && !cur.final) {
            borderColor = "var(--accent)";
          }
          if (isMid) {
            bgColor = cur.possible
              ? "rgba(16, 185, 129, 0.15)"
              : "rgba(239, 68, 68, 0.12)";
            borderColor = cur.possible ? "#10b981" : "#ef4444";
          }
          if (isAns) {
            bgColor = "rgba(16, 185, 129, 0.15)";
            borderColor = "#10b981";
          }

          return (
            <div
              key={k}
              className="array-element-wrapper"
              style={{ gap: "4px" }}
            >
              <div
                className="array-element"
                style={{
                  width: "42px",
                  height: "42px",
                  fontSize: "0.9rem",
                  backgroundColor: bgColor,
                  borderColor,
                  borderWidth: isMid || inRange || isAns ? "2px" : "1px",
                  transform: isMid ? "scale(1.12)" : "scale(1)",
                }}
              >
                {k}
              </div>
              {isMid && (
                <span
                  className="pointer-label"
                  style={{
                    color: cur.possible ? "#10b981" : "#ef4444",
                    background: cur.possible
                      ? "rgba(16,185,129,0.1)"
                      : "rgba(239,68,68,0.1)",
                  }}
                >
                  {cur.possible ? "✓" : "✗"}
                </span>
              )}
              {isAns && !isMid && (
                <span
                  className="pointer-label"
                  style={{
                    color: "#10b981",
                    background: "rgba(16,185,129,0.1)",
                  }}
                >
                  Ans
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="info-panel" style={{ marginTop: "24px" }}>
        <h3>Current State</h3>
        <ul className="info-list">
          <li>
            <strong>Operation:</strong> {cur.description}
          </li>
          {!cur.final && (
            <>
              <li>
                <strong>Search Space:</strong> [Low:{" "}
                {cur.low !== -1 ? cur.low : "-"}, High:{" "}
                {cur.high !== -1 ? cur.high : "-"}]
              </li>
              <li>
                <strong>Trying Speed (Mid):</strong> k = {cur.mid ?? "-"}
              </li>
              <li>
                <strong>Hours Needed at k={cur.mid}:</strong> {cur.hours ?? "-"}{" "}
                / {h} allowed
              </li>
              <li>
                <strong>Best Answer So Far:</strong> k = {cur.ans}
              </li>
            </>
          )}
          {cur.final && (
            <li>
              <strong>✅ Minimum Speed:</strong> k = {cur.ans} bananas/hour
            </li>
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

export default BinarySearchOnAnswerVisualizer;
