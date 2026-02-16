
import React, { useMemo } from 'react';
import { Info, Calculator, Ruler, Compass, Plus, Minus } from 'lucide-react';

interface OffsetProps {
  state: {
    height: string;
    angle: string;
    correction: string;
    correctionSign: 1 | -1;
  };
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const OffsetCalculator: React.FC<OffsetProps> = ({ state, setState }) => {
  const { height, angle, correction, correctionSign } = state;

  const results = useMemo(() => {
    const h = parseFloat(height) || 0;
    const a = parseFloat(angle) || 0;
    const c = (parseFloat(correction) || 0) * correctionSign;
    
    if (h === 0 || a <= 0 || a >= 90) return null;

    const rad = (a * Math.PI) / 180;
    const hypotenuse = h / Math.sin(rad);
    const run = h / Math.tan(rad);

    return {
      hypotenuse: Math.round(hypotenuse * 100) / 100,
      run: Math.round(run * 100) / 100,
      corrected: Math.round((hypotenuse + c) * 100) / 100,
      appliedCorrection: c
    };
  }, [height, angle, correction, correctionSign]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-black mb-4 flex items-center gap-2 text-slate-800">
          <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
          S-밴딩 (오프셋)
        </h2>

        {/* Diagram */}
        <div className="relative w-full h-48 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center p-4 border border-slate-100">
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <line x1="20" y1="100" x2="160" y2="100" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />
            <line x1="20" y1="100" x2="160" y2="40" stroke="#2563eb" strokeWidth="3" />
            <line x1="160" y1="100" x2="160" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 40 100 A 20 20 0 0 0 35 93" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <text x="90" y="65" fill="#2563eb" fontSize="8" fontWeight="bold" transform="rotate(-23, 90, 65)">길이 C (체크포인트)</text>
            <text x="165" y="75" fill="#64748b" fontSize="8" fontWeight="bold">S높이 (b)</text>
            <text x="45" y="95" fill="#f59e0b" fontSize="8">{parseFloat(angle) || 0}°</text>
          </svg>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
                <Calculator className="w-3 h-3 text-blue-500" /> 원하는 S높이 (mm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setState((prev: any) => ({ ...prev, height: e.target.value }))}
                placeholder="예: 120"
                className="w-full bg-slate-100 border-slate-200 rounded-xl p-4 text-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
                <Ruler className="w-3 h-3 text-slate-400" /> 오차 보정 (mm)
              </label>
              <div className="flex gap-1 h-[60px]">
                <div className="flex flex-col gap-1 w-12">
                   <button 
                    onClick={() => setState((prev: any) => ({ ...prev, correctionSign: 1 }))}
                    className={`flex-1 flex items-center justify-center rounded-lg border-2 transition-all ${correctionSign === 1 ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'}`}
                   >
                    <Plus className="w-4 h-4" />
                   </button>
                   <button 
                    onClick={() => setState((prev: any) => ({ ...prev, correctionSign: -1 }))}
                    className={`flex-1 flex items-center justify-center rounded-lg border-2 transition-all ${correctionSign === -1 ? 'bg-amber-500 border-amber-500 text-white shadow-sm' : 'bg-white border-slate-100 text-slate-400 hover:border-amber-200'}`}
                   >
                    <Minus className="w-4 h-4" />
                   </button>
                </div>
                <input
                  type="number"
                  value={correction}
                  onChange={(e) => setState((prev: any) => ({ ...prev, correction: e.target.value }))}
                  className={`flex-1 min-w-0 bg-slate-100 border-slate-200 rounded-xl px-3 text-xl font-bold transition-all focus:ring-2 outline-none ${correctionSign === 1 ? 'text-blue-700 focus:ring-blue-500' : 'text-amber-700 focus:ring-amber-500'}`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
              <Compass className="w-3 h-3 text-amber-500" /> 밴딩 각도 (°)
            </label>
            <div className="relative">
              <input
                type="number"
                value={angle}
                onChange={(e) => setState((prev: any) => ({ ...prev, angle: e.target.value }))}
                placeholder="예: 30"
                className="w-full bg-slate-100 border-slate-200 rounded-xl p-4 text-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">°</span>
            </div>
          </div>
        </div>

        {results ? (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-3 shadow-inner">
            <div className="flex justify-between items-center border-b border-blue-100/50 pb-2">
              <span className="text-blue-600/70 font-bold text-sm">계산된 길이 C</span>
              <span className="text-xl font-black text-blue-800/60 tracking-tight">{results.hypotenuse} mm</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-blue-700 font-black text-lg">보정 후 길이</span>
                <span className={`text-[10px] font-bold ${results.appliedCorrection >= 0 ? 'text-blue-500' : 'text-amber-600'}`}>
                  (보정값: {results.appliedCorrection > 0 ? '+' : ''}{results.appliedCorrection}mm)
                </span>
              </div>
              <span className="text-4xl font-black text-blue-600 tracking-tighter">{results.corrected} mm</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400 justify-center p-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Calculator className="w-8 h-8 opacity-20" />
            <span className="font-bold text-sm">수치를 입력하면 계산이 시작됩니다.</span>
          </div>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
        <h4 className="text-amber-700 text-sm font-bold flex items-center gap-2 mb-2">
          <Info className="w-4 h-4" /> 현장 팁
        </h4>
        <ul className="text-xs text-amber-800/80 space-y-1.5 list-disc pl-4 font-medium">
          <li>30도 기준으로 밴딩 시 높이의 2배가 길이 C가 됩니다.</li>
          <li>보정값 설정 시 +는 길이를 더하고, -는 길이를 뺍니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default OffsetCalculator;
