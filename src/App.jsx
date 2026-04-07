import React, { useState } from "react";
import "./App.css";
import { PATTERNS } from "./config/patterns";
import BinarySearchVisualizer from "./BinarySearch/BinarySearchVisualizer";
import RotatedArrayVisualizer from "./BinarySearch/RotatedArrayVisualizer";
import PeakElementVisualizer from "./BinarySearch/PeakElementVisualizer";
// import MatrixSearchVisualizer from "./BinarySearch/MatrixSearchVisualizer";
import BinarySearchOnAnswerVisualizer from "./BinarySearch/BinarySearchOnAnswerVisualizer";
import SlidingWindowVisualizer from "./SlidingWindow/SlidingWindowVisualizer";
import TwoPointersVisualizer from "./TwoPointers/TwoPointersVisualizer";
import FastSlowPointersVisualizer from "./FastSlowPointers/FastSlowPointersVisualizer";
import MergeIntervalsVisualizer from "./MergeIntervals/MergeIntervalsVisualizer";
import CyclicSortVisualizer from "./CyclicSort/CyclicSortVisualizer";
import LinkedListReversalVisualizer from "./LinkedListReversal/LinkedListReversalVisualizer";
import TreeBFSVisualizer from "./TreeBFS/TreeBFSVisualizer";
import TreeDFSVisualizer from "./TreeDFS/TreeDFSVisualizer";
import HeapsVisualizer from "./Heaps/HeapsVisualizer";
import SubsetsVisualizer from "./Subsets/SubsetsVisualizer";
import TopologicalSortVisualizer from "./TopologicalSort/TopologicalSortVisualizer";
import BacktrackingVisualizer from "./Backtracking/BacktrackingVisualizer";
import TrieVisualizer from "./Trie/TrieVisualizer";
import MatrixSearchVisualizer from "./BinarySearch/MatrixSearchVisualizer";
import { ChevronRight, Code2, Menu, X } from "lucide-react";

function App() {
  const [activePattern, setActivePattern] = useState("binary-search");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderVisualizer = () => {
    switch (activePattern) {
      case "binary-search":
        return <BinarySearchVisualizer />;
      case "bs-rotated-array":
        return <RotatedArrayVisualizer />;
      case "bs-peak-element":
        return <PeakElementVisualizer />;
      case "bs-matrix-search":
        return <MatrixSearchVisualizer />;
      case "bs-on-answer":
        return <BinarySearchOnAnswerVisualizer />;
      case "sliding-window":
        return <SlidingWindowVisualizer />;
      case "two-pointers":
        return <TwoPointersVisualizer />;
      case "fast-slow-pointers":
        return <FastSlowPointersVisualizer />;
      case "merge-intervals":
        return <MergeIntervalsVisualizer />;
      case "cyclic-sort":
        return <CyclicSortVisualizer />;
      case "linked-list-reversal":
        return <LinkedListReversalVisualizer />;
      case "tree-bfs":
        return <TreeBFSVisualizer />;
      case "tree-dfs":
        return <TreeDFSVisualizer />;
      case "heaps":
        return <HeapsVisualizer />;
      case "subsets":
        return <SubsetsVisualizer />;
      case "topological-sort":
        return <TopologicalSortVisualizer />;
      case "backtracking":
        return <BacktrackingVisualizer />;
      case "trie":
        return <TrieVisualizer />;
      default:
        return <div className="placeholder">Select a pattern</div>;
    }
  };

  const getActiveTitle = () => {
    return PATTERNS.find((p) => p.id === activePattern)?.title || "Visualizer";
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <Code2 className="logo-icon" size={28} />
            <h2>DSA Mastery</h2>
          </div>
          <button
            className="mobile-close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group-title">Patterns</div>
          {PATTERNS.map((pattern) => (
            <button
              key={pattern.id}
              className={`nav-item ${activePattern === pattern.id ? "active" : ""}`}
              onClick={() => {
                setActivePattern(pattern.id);
                setIsSidebarOpen(false);
              }}
            >
              <div className="nav-item-content">
                <span className="nav-item-title">{pattern.title}</span>
              </div>
              {activePattern === pattern.id && (
                <ChevronRight className="nav-item-indicator" size={18} />
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1>{getActiveTitle()}</h1>
          </div>
        </header>

        <div className="visualizer-container">{renderVisualizer()}</div>
      </main>
    </div>
  );
}

export default App;
