
import React, { useMemo } from 'react';
import { Ruler, AlertTriangle, Calculator, Target, Plus, Minus, Compass } from 'lucide-react';

interface SaddleProps {
  state: {
    height: string;
    angle: string;
    gap: string;
    correction: string;
    correctionSign: 1 | -1;
  };
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const SaddleCalculator: React.FC<SaddleProps> = ({ state, setState }) => {
  const { height, angle, gap, correction, correctionSign } = state;

  const result = useMemo(() => {
    const h = parseFloat(height) || 0;
    const a = parseFloat(angle) || 0;
    const g = parseFloat(gap) || 0;
    const c = (parseFloat(correction) || 0) * correctionSign;
    
    if (h === 0 || a <= 0 || a >= 90) return null;

    const rad = (a * Math.PI) / 180;
    const multiplier = 1 / Math.sin(rad);
    const baseLeg = h * multiplier;
    
    const correctedLeg = baseLeg + c;
    const totalMarkingLength = correctedLeg + g + correctedLeg;

    return {
      leg: Math.round(correctedLeg),
      baseLeg: Math.round(baseLeg),
      multiplier: Math.round(multiplier * 100) / 100,
      correction: c,
      gap: g,
      angle: a,
      total: Math.round(totalMarkingLength)
    };
  }, [height, angle, gap, correction, correctionSign]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black flex items-center gap-2 text-slate-800">
            <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
            모자(Ohm) 밴딩
          </h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
            Saddle / Ohm Bend
          </span>
        </div>

        {/* Straight Pipe Diagram */}
        <div className="relative w-full h-[320px] bg-slate-50 rounded-2xl mb-6 flex flex-col items-center justify-center p-6 border border-slate-100 overflow-hidden">
          <div className="w-full relative py-12">
            
            {/* Step Guides Above Pipe */}
            <div className="absolute top-[-70px] left-0 w-full flex justify-between px-2">
               <div className="bg-white px-2.5 py-1 rounded-lg border border-emerald-100 shadow-sm flex items-center gap-1.5">
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">1</span>
                  <span className="text-[10px] font-bold text-slate-600 whitespace-nowrap">시작점 체크</span>
               </div>
               <div className="bg-white px-2.5 py-1 rounded-lg border border-emerald-100 shadow-sm flex items-center gap-1.5">
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">2</span>
                  <span className="text-[10px] font-bold text-slate-600 whitespace-nowrap">순차적 마킹</span>
               </div>
            </div>

            {/* Pipe Body */}
            <div className="h-10 w-full bg-slate-200/80 rounded-sm border-y-2 border-slate-300 relative flex items-center shadow-inner z-10">
               <div className="absolute left-[10%] h-[240%] w-[3px] bg-emerald-500 z-20 -translate-y-[8px] shadow-sm">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-emerald-600 bg-white px-1.5 py-0.5 rounded border border-emerald-100 whitespace-nowrap shadow-sm">1번</div>
               </div>
               <div className="absolute left-[35%] h-[240%] w-[3px] bg-emerald-500 z-20 -translate-y-[8px] shadow-sm">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-emerald-600 bg-white px-1.5 py-0.5 rounded border border-emerald-100 whitespace-nowrap shadow-sm">2번</div>
               </div>
               <div className="absolute left-[65%] h-[240%] w-[3px] bg-blue-500 z-20 -translate-y-[8px] shadow-sm">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-100 whitespace-nowrap shadow-sm">3번</div>
               </div>
               <div className="absolute left-[90%] h-[240%] w-[3px] bg-emerald-500 z-20 -translate-y-[8px] shadow-sm">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-emerald-600 bg-white px-1.5 py-0.5 rounded border border-emerald-100 whitespace-nowrap shadow-sm">4번</div>
               </div>

               <div className="absolute left-[10%] w-[25%] flex justify-center items-center h-full">
                  <span className="text-[10px] font-black text-emerald-800/40 tracking-tighter whitespace-nowrap">{result ? `${result.leg}mm` : 'C거리'}</span>
               </div>
               <div className="absolute left-[35%] w-[30%] flex justify-center items-center h-full">
                  <span className="text-[10px] font-black text-blue-800/40 tracking-tighter whitespace-nowrap">{result ? `${result.gap}mm` : '여유'}</span>
               </div>
               <div className="absolute left-[65%] w-[25%] flex justify-center items-center h-full">
                  <span className="text-[10px] font-black text-emerald-800/40 tracking-tighter whitespace-nowrap">{result ? `${result.leg}mm` : 'C거리'}</span>
               </div>
            </div>

            <div className="absolute bottom-[-65px] left-[10%] w-[80%]">
               <div className="flex justify-between items-start">
                  <div className="flex-1 flex flex-col items-center">
                     <span className="text-[9px] font-bold text-emerald-600 mb-1.5 text-center leading-tight">다리 길이(C)</span>
                     <div className="w-full h-[2px] bg-emerald-300 relative">
                        <div className="absolute left-0 -top-1.5 w-[2px] h-3 bg-emerald-400"></div>
                        <div className="absolute right-0 -top-1.5 w-[2px] h-3 bg-emerald-400"></div>
                     </div>
                  </div>
                  <div className="flex-[1.2] flex flex-col items-center px-1">
                     <span className="text-[9px] font-bold text-blue-600 mb-1.5 text-center leading-tight">중간 여유(Gap)</span>
                     <div className="w-full h-[2px] bg-blue-300 relative">
                        <div className="absolute left-0 -top-1.5 w-[2px] h-3 bg-blue-400"></div>
                        <div className="absolute right-0 -top-1.5 w-[2px] h-3 bg-blue-400"></div>
                     </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                     <span className="text-[9px] font-bold text-emerald-600 mb-1.5 text-center leading-tight">다리 길이(C)</span>
                     <div className="w-full h-[2px] bg-emerald-300 relative">
                        <div className="absolute left-0 -top-1.5 w-[2px] h-3 bg-emerald-400"></div>
                        <div className="absolute right-0 -top-1.5 w-[2px] h-3 bg-emerald-400"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Caption */}
          <div className="absolute bottom-2 left-6 right-6 flex justify-between items-center opacity-70">
             <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
               <Target className="w-3 h-3" /> 마킹 가이드
             </span>
             <div className="flex items-center gap-2 bg-white px-1.5 py-0.5 rounded border border-slate-100">
               <span className="text-[8px] text-slate-400 font-bold uppercase">전체:</span>
               <span className="text-[9px] text-slate-800 font-black">{result ? `${result.total}mm` : '---'}</span>
             </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-black text-slate-500 uppercase">
                <Calculator className="w-3 h-3 text-emerald-500" /> 원하는 S높이 (mm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setState((prev: any) => ({ ...prev, height: e.target.value }))}
                placeholder="예: 50"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-xl font-bold text-slate-900 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-black text-slate-500 uppercase">
                <Compass className="w-3 h-3 text-amber-500" /> 밴딩 각도 (°)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={angle}
                  onChange={(e) => setState((prev: any) => ({ ...prev, angle: e.target.value }))}
                  placeholder="30"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-xl font-bold text-slate-900 focus:ring-4 focus:ring-amber-50 focus:border-amber-500 outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">°</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-black text-slate-400 uppercase">
                <Ruler className="w-3 h-3 text-slate-400" /> 오차 보정 (mm)
              </label>
              <div className="flex gap-1 h-[62px]">
                <div className="flex flex-col gap-1 w-10">
                   <button 
                    onClick={() => setState((prev: any) => ({ ...prev, correctionSign: 1 }))}
                    className={`flex-1 flex items-center justify-center rounded-lg border-2 transition-all ${correctionSign === 1 ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-100 text-slate-400'}`}
                   >
                    <Plus className="w-3 h-3" />
                   </button>
                   <button 
                    onClick={() => setState((prev: any) => ({ ...prev, correctionSign: -1 }))}
                    className={`flex-1 flex items-center justify-center rounded-lg border-2 transition-all ${correctionSign === -1 ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-slate-100 text-slate-400'}`}
                   >
                    <Minus className="w-3 h-3" />
                   </button>
                </div>
                <input
                  type="number"
                  value={correction}
                  onChange={(e) => setState((prev: any) => ({ ...prev, correction: e.target.value }))}
                  className={`flex-1 min-w-0 bg-slate-50 border-2 border-slate-100 rounded-2xl px-3 text-xl font-bold transition-all focus:ring-4 outline-none ${correctionSign === 1 ? 'text-emerald-700 focus:ring-emerald-50 focus:border-emerald-500' : 'text-amber-700 focus:ring-amber-50 focus:border-amber-500'}`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-black text-blue-500 uppercase">
                <Ruler className="w-3 h-3 text-blue-400" /> 중간 여유 (Gap)
              </label>
              <input
                type="number"
                value={gap}
                onChange={(e) => setState((prev: any) => ({ ...prev, gap: e.target.value }))}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-xl font-bold text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {result ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 divide-y divide-emerald-100 shadow-sm">
             <div className="flex justify-between py-3 items-center">
               <div className="flex flex-col">
                  <span className="text-slate-600 font-bold text-sm">다리 체크 거리 (C)</span>
                  <span className={`text-[10px] font-bold ${result.correction >= 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {result.baseLeg}mm ({result.angle}° 승수 {result.multiplier}) {result.correction >= 0 ? '+' : ''}{result.correction}mm 적용
                  </span>
               </div>
               <div className="text-right">
                  <span className="text-2xl font-black text-emerald-600">{result.leg} mm</span>
               </div>
             </div>
             <div className="flex justify-between py-3 items-center">
               <span className="text-slate-600 font-bold text-sm">중간 여유 공간</span>
               <span className="text-2xl font-black text-blue-600">{result.gap} mm</span>
             </div>
             <div className="flex justify-between py-4 items-baseline border-t-2 border-dashed border-emerald-100 mt-2">
               <span className="text-slate-800 font-black">총 마킹 거리</span>
               <div className="text-right">
                  <div className="text-4xl font-black text-slate-900 tracking-tighter">{result.total} mm</div>
                  <div className="text-[10px] text-slate-400 font-bold mt-1">({result.leg} + {result.gap} + {result.leg})</div>
               </div>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-slate-400 justify-center p-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Calculator className="w-8 h-8 opacity-20" />
            <span className="font-bold text-sm text-center">수치를 입력하면<br/>현장 마킹 거리가 계산됩니다.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaddleCalculator;
