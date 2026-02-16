
import React, { useState } from 'react';
import { Calculator, Table, Ruler, Settings2, CornerDownRight } from 'lucide-react';
import OffsetCalculator from './components/OffsetCalculator';
import SaddleCalculator from './components/SaddleCalculator';
import NinetyCalculator from './components/NinetyCalculator';
import PipeSpecs from './components/PipeSpecs';
import { CalcType } from './types';
import { PIPE_DATA } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CalcType>('NINETY');

  // Calculator States
  const [ninetyState, setNinetyState] = useState({ selectedSize: 22, targetHeight: '', manualDeduction: '215' });
  const [offsetState, setOffsetState] = useState({ height: '', angle: '30', correction: '10', correctionSign: 1 as 1 | -1 });
  const [saddleState, setSaddleState] = useState({ height: '', angle: '30', gap: '160', correction: '0', correctionSign: 1 as 1 | -1 });

  return (
    <div className="min-h-screen pb-24 max-w-lg mx-auto bg-slate-50 shadow-xl overflow-x-hidden border-x border-slate-200 font-sans">
      <header className="bg-white border-b border-slate-200 p-6 sticky top-0 z-50">
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Settings2 className="w-8 h-8 text-blue-600" /> 시카고 밴더 마스터
        </h1>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">
          Chicago Bender Calculation Utility
        </p>
      </header>

      <main className="p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {/* Added missing pipeSpecs prop from PIPE_DATA constant */}
        {activeTab === 'NINETY' && <NinetyCalculator state={ninetyState} setState={setNinetyState} pipeSpecs={PIPE_DATA} />}
        {activeTab === 'OFFSET' && <OffsetCalculator state={offsetState} setState={setOffsetState} />}
        {activeTab === 'SADDLE' && <SaddleCalculator state={saddleState} setState={setSaddleState} />}
        {activeTab === 'SPECS' && <PipeSpecs />}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-around p-3 pb-8 z-50 rounded-t-[32px] shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
        {[
          { id: 'NINETY', icon: CornerDownRight, label: '90도 노말' },
          { id: 'OFFSET', icon: Calculator, label: 'S-밴딩' },
          { id: 'SADDLE', icon: Ruler, label: '모자(Ohm)' },
          { id: 'SPECS', icon: Table, label: '배관정보' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as CalcType)}
            className={`flex flex-col items-center px-4 py-2 rounded-2xl transition-all ${
              activeTab === tab.id ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon className={`w-6 h-6 mb-1 ${activeTab === tab.id ? 'stroke-[3px]' : 'stroke-[2px]'}`} />
            <span className="text-[10px] font-black">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
