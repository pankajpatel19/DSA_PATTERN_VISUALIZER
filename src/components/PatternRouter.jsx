import React from "react";
import { useParams } from "react-router-dom";

// Visualizers
import BinarySearchVisualizer from "../BinarySearch/BinarySearchVisualizer";
import RotatedArrayVisualizer from "../BinarySearch/RotatedArrayVisualizer";
import PeakElementVisualizer from "../BinarySearch/PeakElementVisualizer";
import MatrixSearchVisualizer from "../BinarySearch/MatrixSearchVisualizer";
import BinarySearchOnAnswerVisualizer from "../BinarySearch/BinarySearchOnAnswerVisualizer";
import SlidingWindowVisualizer from "../SlidingWindow/SlidingWindowVisualizer";
import TwoPointersVisualizer from "../TwoPointers/TwoPointersVisualizer";
import FastSlowPointersVisualizer from "../FastSlowPointers/FastSlowPointersVisualizer";
import MergeIntervalsVisualizer from "../MergeIntervals/MergeIntervalsVisualizer";
import CyclicSortVisualizer from "../CyclicSort/CyclicSortVisualizer";
import LinkedListReversalVisualizer from "../LinkedListReversal/LinkedListReversalVisualizer";
import TreeBFSVisualizer from "../TreeBFS/TreeBFSVisualizer";
import TreeDFSVisualizer from "../TreeDFS/TreeDFSVisualizer";
import HeapsVisualizer from "../Heaps/HeapsVisualizer";
import SubsetsVisualizer from "../Subsets/SubsetsVisualizer";
import TopologicalSortVisualizer from "../TopologicalSort/TopologicalSortVisualizer";
import BacktrackingVisualizer from "../Backtracking/BacktrackingVisualizer";
import TrieVisualizer from "../Trie/TrieVisualizer";

// Array Questions
import LargestElement from "../Array/LargestElement";
import SecondLargest from "../Array/SecondLargest";
import CheckSorted from "../Array/CheckSorted";
import RemoveDuplicates from "../Array/RemoveDuplicates";
import RotateArray from "../Array/RotateArray";
import MoveZeros from "../Array/MoveZeros";
import LinearSearch from "../Array/LinearSearch";
import UnionArrays from "../Array/UnionArrays";
import MissingNumber from "../Array/MissingNumber";
import MaxConsecutiveOnes from "../Array/MaxConsecutiveOnes";
import SingleNumber from "../Array/SingleNumber";
import LongestSubarraySumK from "../Array/LongestSubarraySumK";
import TwoSum from "../Array/TwoSum";
import SortColors from "../Array/SortColors";
import MajorityElement from "../Array/MajorityElement";
import KadanesAlgorithm from "../Array/KadanesAlgorithm";
import BuySellStock from "../Array/BuySellStock";
import RearrangeBySign from "../Array/RearrangeBySign";
import NextPermutation from "../Array/NextPermutation";
import LeadersInArray from "../Array/LeadersInArray";
import LongestConsecutiveSequence from "../Array/LongestConsecutiveSequence";
import SetMatrixZeroes from "../Array/SetMatrixZeroes";
import RotateImage from "../Array/RotateImage";
import SpiralMatrix from "../Array/SpiralMatrix";
import PascalsTriangle from "../Array/PascalsTriangle";

const PatternRouter = () => {
  const { patternId } = useParams();

  switch (patternId) {
    case "binary-search": return <BinarySearchVisualizer />;
    case "bs-rotated-array": return <RotatedArrayVisualizer />;
    case "bs-peak-element": return <PeakElementVisualizer />;
    case "bs-matrix-search": return <MatrixSearchVisualizer />;
    case "bs-on-answer": return <BinarySearchOnAnswerVisualizer />;
    case "sliding-window": return <SlidingWindowVisualizer />;
    case "two-pointers": return <TwoPointersVisualizer />;
    case "fast-slow-pointers": return <FastSlowPointersVisualizer />;
    case "merge-intervals": return <MergeIntervalsVisualizer />;
    case "cyclic-sort": return <CyclicSortVisualizer />;
    case "linked-list-reversal": return <LinkedListReversalVisualizer />;
    case "tree-bfs": return <TreeBFSVisualizer />;
    case "tree-dfs": return <TreeDFSVisualizer />;
    case "heaps": return <HeapsVisualizer />;
    case "subsets": return <SubsetsVisualizer />;
    case "topological-sort": return <TopologicalSortVisualizer />;
    case "backtracking": return <BacktrackingVisualizer />;
    case "trie": return <TrieVisualizer />;

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
      return (
        <div className="placeholder" style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Pattern Not Found</h2>
          <p>The pattern you are looking for does not exist or is still under development.</p>
        </div>
      );
  }
};

export default PatternRouter;
