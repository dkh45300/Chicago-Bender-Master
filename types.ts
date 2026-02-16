
export interface PipeSpec {
  size: number;
  gain90: number; // 90도 늘어가는 길이 (mm)
  normalLength: number; // 노말 길이
  outerDiameter?: number; // 외경
  deduction?: number; // 공제값
}

export type CalcType = 'OFFSET' | 'SADDLE' | 'NINETY' | 'SPECS';
