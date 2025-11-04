'use client';

import { useState } from 'react';

interface WaferCardProps {
  waferId: string;
  waferNumber: string;
  defectType: 'Scratch' | 'Edge-Ring' | 'No Pattern';
  onClick: () => void;
}

interface WaferGridProps {
  selectedLot: string;
  onWaferSelect: (wafer: { id: string; waferNumber: string; lotId: string; yield: number }) => void;
  generatedLots?: string[];
  generatedWafers?: {[key: string]: string[]};
}

function WaferCard({ waferId, waferNumber, defectType, onClick }: WaferCardProps) {
  const getDefectStyle = (type: string) => {
    switch (type) {
      case 'Scratch':
        return 'bg-green-100 text-black';
      case 'Edge-Ring':
        return 'bg-red-100 text-red-800';
      case 'No Pattern':
        return 'bg-yellow-100 text-black';
      default:
        return 'bg-gray-100 text-black';
    }
  };

  return (
    <div 
      className={`p-4 rounded-lg border-2 border-gray-300 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 ${getDefectStyle(defectType)}`}
      onClick={onClick}
    >
      <div className="text-sm font-medium mb-2">{waferId} Wafer {waferNumber}</div>
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center bg-white">
          <div className="text-xs font-bold">{defectType}</div>
        </div>
      </div>
    </div>
  );
}

export default function WaferGrid({ selectedLot, onWaferSelect, generatedLots, generatedWafers }: WaferGridProps) {
  // 동적 또는 정적 웨이퍼 데이터 생성
  const generateWafersForLot = (lot: string) => {
    // 동적 데이터가 있으면 사용, 없으면 정적 데이터 사용
    if (generatedWafers && generatedWafers[lot]) {
      return generatedWafers[lot].map((waferId, index) => {
        const waferNumber = (index + 1).toString();
        let defectType: 'Scratch' | 'Edge-Ring' | 'No Pattern' = 'Scratch';
        
        // 랜덤하게 결함 유형 결정 (실제로는 이미지 분석 결과에 따라)
        const random = Math.random();
        if (random < 0.2) defectType = 'Edge-Ring';
        else if (random < 0.4) defectType = 'No Pattern';
        
        return {
          id: lot,
          waferNumber,
          defectType
        };
      });
    }
    
    // 정적 데이터 (기본값)
    const lotData = {
      'D101': { baseId: 'D101', totalWafers: 25, defectPattern: [1, 5, 8, 12, 15] },
      'D100': { baseId: 'D100', totalWafers: 25, defectPattern: [2, 6, 9, 13, 16] },
      'D099': { baseId: 'D099', totalWafers: 25, defectPattern: [3, 7, 10, 14, 17] }
    };
    
    const currentLot = lotData[lot as keyof typeof lotData] || lotData['D101'];
    
    return Array.from({ length: currentLot.totalWafers }, (_, index) => {
      const waferNumber = (index + 1).toString();
      let defectType: 'Scratch' | 'Edge-Ring' | 'No Pattern' = 'Scratch';
      
      // Lot별로 다른 결함 패턴 적용
      if (currentLot.defectPattern.includes(index + 1)) {
        const defectTypes: ('Edge-Ring' | 'No Pattern')[] = ['Edge-Ring', 'No Pattern'];
        defectType = defectTypes[index % 2];
      }
      
      return {
        id: currentLot.baseId,
        waferNumber,
        defectType
      };
    });
  };

  const wafers = generateWafersForLot(selectedLot);

  const handleWaferClick = (wafer: any) => {
    // 수율 계산 (결함 유형에 따라 다른 수율)
    let yieldPercentage = 85; // 기본 수율
    if (wafer.defectType === 'Edge-Ring') yieldPercentage = 65;
    else if (wafer.defectType === 'No Pattern') yieldPercentage = 75;
    
    onWaferSelect({
      id: wafer.id,
      waferNumber: wafer.waferNumber,
      lotId: `${wafer.id}.${wafer.waferNumber}`,
      yield: yieldPercentage
    });
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {wafers.map((wafer, index) => (
        <WaferCard
          key={index}
          waferId={wafer.id}
          waferNumber={wafer.waferNumber}
          defectType={wafer.defectType}
          onClick={() => handleWaferClick(wafer)}
        />
      ))}
    </div>
  );
}
