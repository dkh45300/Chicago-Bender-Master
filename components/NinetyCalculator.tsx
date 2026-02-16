
import React, { useMemo } from 'react';
import { PipeSpec } from '../types';
import { Calculator, Ruler, ChevronRight, ChevronLeft, ArrowDown } from 'lucide-react';

interface NinetyProps {
  state: {
    selectedSize: number;
    targetHeight: string;
    manualDeduction: string;
  };
  setState: React.Dispatch<React.SetStateAction<any>>;
  pipeSpecs: PipeSpec[];
}

const NinetyCalculator: React.FC<NinetyProps> = ({ state, setState, pipeSpecs }) => {
  const { selectedSize, targetHeight, manualDeduction } = state;

  const calculation = useMemo(() => {
    const h = parseFloat(targetHeight) || 0;
    const d = parseFloat(manualDeduction) || 0;
    if (h === 0) return null;

    const markingPoint = h - d;
    return {
      markingPoint,
      deduction: d,
      target: h
    };
  }, [targetHeight, manualDeduction]);

  const targetSizes = [16, 22, 28, 36, 42];
  const filteredPipes = pipeSpecs.filter(p => targetSizes.includes(p.size));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-black flex items-center gap-2 text-slate-800">
            <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
            90도 노말 밴딩
          </h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-slate-100">
            Standard 90° Normal
          </span>
        </div>

        <div className="p-6 space-y-8">
          <div className="relative w-full h-80 bg-slate-50 rounded-2xl flex flex-col items-center justify-center p-6 border border-slate-100 overflow-hidden">
            <div className="w-full relative py-12">
               <div className="absolute top-[-70px] left-0 w-[85%] flex flex-col items-center">
                  <div className="w-full h-[1px] bg-slate-300 relative mb-2">
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  </div>
                  <div className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1.5 shadow-sm">
                     <span className="bg-slate-100 text-[10px] font-black px-1.5 py-0.5 rounded text-slate-500">1</span>
                     <span className="text-[10px] font-bold text-slate-700">
                       {calculation ? `높이 ${calculation.target}mm 체크` : '목표 높이(H) 체크'}
                     </span>
                     <ChevronRight className="w-3 h-3 text-blue-500" />
                  </div>
               </div>

               <div className="h-10 w-full bg-slate-200/80 rounded-sm border-y-2 border-slate-300 relative flex items-center shadow-inner z-10">
                  <div className="absolute left-0 h-[150%] w-[4px] bg-slate-800 rounded-l-sm">
                     <div className="absolute top-12 left-0">
                        <span className="text-[9px] font-black text-slate-400 whitespace-nowrap uppercase">배관 끝단</span>
                     </div>
                  </div>

                  <div className="absolute left-[50%] h-[240%] w-[3px] bg-blue-600 z-20 -translate-y-[8px] shadow-[0_0_12px_rgba(37,99,235,0.4)]">
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg whitespace-nowrap border border-blue-500">마킹 지점</div>
                        <ArrowDown className="w-3 h-3 text-blue-600 mt-0.5" />
                     </div>
                     <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                        <span className="text-[9px] font-black text-blue-700 whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded border border-blue-200">밴더 화살표(Start)</span>
                     </div>
                  </div>

                  <div className="absolute left-[85%] h-[150%] w-[2px] bg-slate-300 border-dashed border-slate-400">
                     <div className="absolute top-12 left-1/2 -translate-x-1/2">
                        <span className="text-[9px] font-black text-slate-400 whitespace-nowrap">배관높이 체크</span>
                     </div>
                  </div>

                  <div className="absolute left-0 w-[50%] h-full flex items-center justify-center px-2">
                     <div className="bg-white/40 backdrop-blur-[1px] px-2 py-0.5 rounded-md border border-blue-400/20">
                        <span className="text-[10px] font-black text-blue-800/60 whitespace-nowrap">
                          {calculation ? `${calculation.markingPoint}mm` : 'L = H - D'}
                        </span>
                     </div>
                  </div>
               </div>

               <div className="absolute bottom-[-75px] left-[50%] w-[35%] flex flex-col items-center">
                  <div className="bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 mb-2 flex items-center gap-1.5 shadow-sm">
                     <ChevronLeft className="w-3 h-3 text-amber-500" />
                     <span className="bg-amber-100 text-[10px] font-black px-1.5 py-0.5 rounded text-amber-600">2</span>
                     <span className="text-[10px] font-bold text-amber-700">
                       공제 {manualDeduction}mm 리턴
                     </span>
                  </div>
                  <div className="w-full h-[1.5px] bg-amber-400 relative">
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 border-l-2 border-amber-500"></div>
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 border-r-2 border-amber-500"></div>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-tight">배관 규격 선택 (mm)</label>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {filteredPipes.map((pipe) => (
                  <button
                    key={pipe.size}
                    /* Updated onClick to sync manualDeduction with selected pipe size spec */
                    onClick={() => setState((prev: any) => ({ 
                      ...prev, 
                      selectedSize: pipe.size,
                      manualDeduction: pipe.deduction?.toString() || prev.manualDeduction
                    }))}
                    className={`relative overflow-hidden py-3 rounded-xl text-sm font-black transition-all border-2 ${
                      selectedSize === pipe.size 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100 scale-[1.02]' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-blue-200'
                    }`}
                  >
                    {pipe.size}
                    {selectedSize === pipe.size && <div className="absolute top-0 right-0 w-4 h-4 bg-white/20 rounded-bl-lg"></div>}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-black text-slate-500 uppercase">
                  <Calculator className="w-3 h-3 text-blue-500" /> 원하는 높이 (H) mm
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={(e) => setState((prev: any) => ({ ...prev, targetHeight: e.target.value }))}
                    placeholder="예: 500"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-xl font-black text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">mm</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-black text-amber-600 uppercase">
                  <Ruler className="w-3 h-3 text-amber-500" /> 공제값 (D) mm
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={manualDeduction}
                    onChange={(e) => setState((prev: any) => ({ ...prev, manualDeduction: e.target.value }))}
                    className="w-full bg-amber-50 border-2 border-amber-100/50 rounded-2xl p-4 text-xl font-black text-amber-700 focus:ring-4 focus:ring-amber-50 focus:border-amber-400 outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400">mm</span>
                </div>
              </div>
            </div>
          </div>

          {calculation ? (
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-100 relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <span className="text-[11px] font-black text-blue-200 uppercase tracking-[0.2em]">최종 마킹 거리 (H - D)</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter">{calculation.markingPoint}</span>
                    <span className="text-xl font-bold opacity-80">mm</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                  <p className="text-[11px] font-bold text-blue-100 leading-relaxed italic">
                    1. 끝단에서 {calculation.target}mm 체크 후,<br/>
                    2. 그곳에서 {calculation.deduction}mm 만큼 되돌아와 마킹하세요.
                  </p>
                </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-slate-400 justify-center p-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <Calculator className="w-6 h-6 text-slate-300" />
              <span className="font-bold text-sm text-center">높이를 입력하면<br/>현장 마킹 순서가 표시됩니다.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NinetyCalculator;
