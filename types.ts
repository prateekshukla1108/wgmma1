export interface WarpData {
  id: number;
  rowStart: number;
  rowEnd: number;
  color: string;
}

export interface ThreadMapping {
  threadId: number; // 0-31
  registers: {
    regName: string;
    row: number;
    col: number;
  }[];
}

export enum Section {
  INTRO = 'INTRO',
  WARP_VIEW = 'WARP_VIEW',
  THREAD_VIEW = 'THREAD_VIEW',
  STMATRIX = 'STMATRIX',
  PIPELINE = 'PIPELINE'
}
