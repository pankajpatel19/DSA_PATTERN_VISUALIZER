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

// Array Questions
import LargestElement from "./Array/LargestElement";
import SecondLargest from "./Array/SecondLargest";
import CheckSorted from "./Array/CheckSorted";
import RemoveDuplicates from "./Array/RemoveDuplicates";
import RotateArray from "./Array/RotateArray";
import MoveZeros from "./Array/MoveZeros";
import LinearSearch from "./Array/LinearSearch";
import UnionArrays from "./Array/UnionArrays";
import MissingNumber from "./Array/MissingNumber";
import MaxConsecutiveOnes from "./Array/MaxConsecutiveOnes";
import SingleNumber from "./Array/SingleNumber";
import LongestSubarraySumK from "./Array/LongestSubarraySumK";
import TwoSum from "./Array/TwoSum";
import SortColors from "./Array/SortColors";
import MajorityElement from "./Array/MajorityElement";
import KadanesAlgorithm from "./Array/KadanesAlgorithm";
import BuySellStock from "./Array/BuySellStock";
import RearrangeBySign from "./Array/RearrangeBySign";
import NextPermutation from "./Array/NextPermutation";
import LeadersInArray from "./Array/LeadersInArray";
import LongestConsecutiveSequence from "./Array/LongestConsecutiveSequence";
import SetMatrixZeroes from "./Array/SetMatrixZeroes";
import RotateImage from "./Array/RotateImage";
import SpiralMatrix from "./Array/SpiralMatrix";
import PascalsTriangle from "./Array/PascalsTriangle";

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
      
      // Array Questions
      case "arr-largest": return <LargestElement />;
      case "arr-second-largest": return <SecondLargest />;
      case "arr-check-sorted": return <CheckSorted />;
      case "arr-remove-duplicates": return <RemoveDuplicates />;
      case "arr-rotate-one":
      case "arr-rotate-d": return <RotateArray />;
      case "arr-move-zeros": return <MoveZeros />;
      case "arr-linear-search": return <LinearSearch />;
      case "arr-union": return <UnionArrays />;
      case "arr-missing": return <MissingNumber />;
      case "arr-max-ones": return <MaxConsecutiveOnes />;
      case "arr-single-number": return <SingleNumber />;
      case "arr-longest-subarray-k": return <LongestSubarraySumK />;
      case "arr-two-sum": return <TwoSum />;
      case "arr-sort-colors": return <SortColors />;
      case "arr-majority-element": return <MajorityElement />;
      case "arr-kadanes": return <KadanesAlgorithm />;
      case "arr-stocks": return <BuySellStock />;
      case "arr-rearrange-sign": return <RearrangeBySign />;
      case "arr-next-permutation": return <NextPermutation />;
      case "arr-leaders": return <LeadersInArray />;
      case "arr-longest-consecutive": return <LongestConsecutiveSequence />;
      case "arr-set-matrix-zero": return <SetMatrixZeroes />;
      case "arr-rotate-image": return <RotateImage />;
      case "arr-spiral-matrix": return <SpiralMatrix />;
      case "arr-pascals-triangle": return <PascalsTriangle />;

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
