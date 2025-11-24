import { WarpData } from './types';

export const WARPS: WarpData[] = [
  { id: 0, rowStart: 0, rowEnd: 15, color: 'text-cyan-400' },
  { id: 1, rowStart: 16, rowEnd: 31, color: 'text-purple-400' },
  { id: 2, rowStart: 32, rowEnd: 47, color: 'text-yellow-400' },
  { id: 3, rowStart: 48, rowEnd: 63, color: 'text-pink-400' },
];

// Logic for mapping a Thread ID (0-31) to a 16x8 matrix fragment (Row 0-15, Col 0-7)
// Based on description: 
// 1. Warp owns 16 rows.
// 2. Thread 0 owns (0,0), (0,1) and (8,0), (8,1).
// Pattern: Thread t covers row pair [floor(t/4), floor(t/4)+8]
// And column pair [(t%4)*2, (t%4)*2 + 1]
export const getThreadMapping = (threadId: number) => {
  const rowBase = Math.floor(threadId / 4);
  const rowPairs = [rowBase, rowBase + 8];
  
  const colBase = (threadId % 4) * 2;
  const colPairs = [colBase, colBase + 1];

  const registers = [
    { regName: 'R0', row: rowPairs[0], col: colPairs[0] },
    { regName: 'R1', row: rowPairs[0], col: colPairs[1] },
    { regName: 'R2', row: rowPairs[1], col: colPairs[0] },
    { regName: 'R3', row: rowPairs[1], col: colPairs[1] },
  ];

  return registers;
};
