
import React, { useState } from 'react';
import { PipeSpec } from '../types';
import { PIPE_DATA } from '../constants';
import { Search } from 'lucide-react';

const PipeSpecs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = PIPE_DATA.filter(p => 
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
                <th className="px-4 py-4">90도 연장</th>
                <th className="px-4 py-4">노말길이</th>
                <th className="w-24 px-4 py-4 text-right">공제값</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((pipe) => (
                <tr key={pipe.size} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-6 font-black text-blue-600 text-xl">{pipe.size}</td>
                  <td className="px-4 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">{pipe.gain90 ? `${pipe.gain90} mm` : '-'}</span>
                      {pipe.gain90 > 0 && (
                        <span className="text-[10px] text-slate-400 font-bold">({(pipe.gain90/10).toFixed(1)}전)</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-6 font-bold text-slate-700">
                    {pipe.normalLength} mm
                  </td>
                  <td className="px-4 py-6 text-right font-black text-amber-600 text-lg">
                    {pipe.deduction || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PipeSpecs;
