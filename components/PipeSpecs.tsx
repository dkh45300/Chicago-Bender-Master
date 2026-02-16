
import React, { useState } from 'react';
import { PipeSpec } from '../types';
import { Search, Info } from 'lucide-react';

interface PipeSpecsProps {
  pipeSpecs: PipeSpec[];
  setPipeSpecs: (specs: PipeSpec[]) => void;
}

const PipeSpecs: React.FC<PipeSpecsProps> = ({ pipeSpecs, setPipeSpecs }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (size: number, field: keyof PipeSpec, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    const updated = pipeSpecs.map(p => 
      p.size === size ? { ...p, [field]: numValue } : p
    );
    setPipeSpecs(updated);
  };

  const filteredData = pipeSpecs.filter(p => 
    p.size.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="number"
          placeholder="배관 규격 검색 (예: 22)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 font-bold shadow-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-300"
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm table-fixed">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black tracking-widest border-b border-slate-100">
              <tr>
                <th className="w-20 px-4 py-4">규격(mm)</th>
                <th className="px-4 py-4 text-blue-600">90도 늘어가는 길이</th>
                <th className="px-4 py-4">노말길이</th>
                <th className="w-24 px-4 py-4 text-right">공제값</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((pipe) => (
                <tr key={pipe.size} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-6 font-black text-blue-600 text-xl">{pipe.size}</td>
                  <td className="px-4 py-6">
                    <div className="flex flex-col gap-1">
                      <input
                        type="number"
                        value={pipe.gain90 || ''}
                        onChange={(e) => handleInputChange(pipe.size, 'gain90', e.target.value)}
                        className="w-full bg-slate-100/50 border border-slate-100 rounded-lg px-2 py-1.5 font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="0"
                      />
                      {pipe.gain90 > 0 && (
                        <span className="text-[10px] text-slate-400 font-bold px-1">({(pipe.gain90/10).toFixed(1)}전)</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <input
                      type="number"
                      value={pipe.normalLength || ''}
                      onChange={(e) => handleInputChange(pipe.size, 'normalLength', e.target.value)}
                      className="w-full bg-slate-100/50 border border-slate-100 rounded-lg px-2 py-1.5 font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-4 py-6 text-right">
                    <input
                      type="number"
                      value={pipe.deduction || ''}
                      onChange={(e) => handleInputChange(pipe.size, 'deduction', e.target.value)}
                      className="w-full text-right bg-amber-50 border border-amber-100 rounded-lg px-2 py-1.5 font-black text-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-100/50 p-4 rounded-2xl flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-400 mt-0.5" />
        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
          수치를 클릭하여 직접 수정할 수 있습니다. 변경된 값은 기기에 자동으로 저장되며, 계산기 탭에 즉시 반영됩니다. 상단 '초기화' 버튼으로 기본값 복구가 가능합니다.
        </p>
      </div>
    </div>
  );
};

export default PipeSpecs;
