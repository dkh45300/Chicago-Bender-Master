
import React, { useState, useEffect } from 'react';
import { Calculator, Table, Ruler, Settings2, CornerDownRight } from 'lucide-react';
import OffsetCalculator from './components/OffsetCalculator';
import SaddleCalculator from './components/SaddleCalculator';
import NinetyCalculator from './components/NinetyCalculator';
import PipeSpecs from './components/PipeSpecs';
import { CalcType, PipeSpec } from './types';
import { PIPE_DATA } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CalcType>(() => {
    return (localStorage.getItem('chicago_active_tab') as CalcType) || 'NINETY';
  });

  // 배관 데이터 상태 관리
  const [pipeSpecs, setPipeSpecs] = useState<PipeSpec[]>(() => {
    const saved = localStorage.getItem('chicago_bender_specs');
    return saved ? JSON.parse(saved) : PIPE_DATA;
  });

  // 계산기 상태 관리 (LocalStorage 연동)
  const [ninetyState, setNinetyState] = useState(() => {
    const saved = localStorage.getItem('chicago_ninety_state');
    if (saved) return JSON.parse(saved);
    // 초기 공제값을 현재 배관 데이터에서 22mm 기준으로 찾음
    const defaultDeduction = pipeSpecs.find(p => p.size === 22)?.deduction || 215;
    return { selectedSize: 22, targetHeight: '', manualDeduction: defaultDeduction.toString() };
  });

  const [offsetState, setOffsetState] = useState(() => {
    const saved = localStorage.getItem('chicago_offset_state');
    return saved ? JSON.parse(saved) : { height: '', angle: '30', correction: '10', correctionSign: 1 };
  });

  const [saddleState, setSaddleState] = useState(() => {
    const saved = localStorage.getItem('chicago_saddle_state');
    return saved ? JSON.parse(saved) : { height: '', angle: '30', gap: '160', correction: '0', correctionSign: 1 };
  });

  // 상태 변화 시 LocalStorage 저장
  useEffect(() => {
    localStorage.setItem('chicago_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('chicago_bender_specs', JSON.stringify(pipeSpecs));
  }, [pipeSpecs]);

  useEffect(() => {
    localStorage.setItem('chicago_ninety_state', JSON.stringify(ninetyState));
  }, [ninetyState]);

  useEffect(() => {
    localStorage.setItem('chicago_offset_state', JSON.stringify(offsetState));
  }, [offsetState]);

  useEffect(() => {
    localStorage.setItem('chicago_saddle_state', JSON.stringify(saddleState));
  }, [saddleState]);

  const handleUpdatePipeSpecs = (updatedSpecs: PipeSpec[]) => {
    setPipeSpecs(updatedSpecs);
  };

  return (
    <div className="min-h-screen pb-24 max-w-lg mx-auto bg-slate-50 shadow-xl overflow-x-hidden border-x border-slate-200 font-sans">
      <header className="bg-white border-b border-slate-200 p-6 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Settings2 className="w-8 h-8 text-blue-600" /> 시카고 밴더 마스터
            </h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">
              Chicago Bender Calculation Utility
            </p>
          </div>
          {activeTab === 'SPECS' && (
            <button 
              onClick={() => {
                if(confirm('데이터를 초기화하시겠습니까?')) {
                  setPipeSpecs(PIPE_DATA);
                  localStorage.removeItem('chicago_bender_specs');
                }
              }}
              className="text-[10px] font-black text-slate-400 border border-slate-200 px-2 py-1 rounded-md active:bg-slate-100"
            >
              초기화
            </button>
          )}
        </div>
      </header>

      <main className="p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTab === 'NINETY' && (
          <NinetyCalculator 
            state={ninetyState} 
            setState={setNinetyState} 
            pipeSpecs={pipeSpecs} 
          />
        )}
        {activeTab === 'OFFSET' && (
          <OffsetCalculator 
            state={offsetState} 
            setState={setOffsetState} 
          />
        )}
        {activeTab === 'SADDLE' && (
          <SaddleCalculator 
            state={saddleState} 
            setState={setSaddleState} 
          />
        )}
        {activeTab === 'SPECS' && (
          <PipeSpecs 
            pipeSpecs={pipeSpecs} 
            setPipeSpecs={handleUpdatePipeSpecs} 
          />
        )}
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
