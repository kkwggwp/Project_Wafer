'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import WaferGrid from './components/WaferGrid';
import WaferHeatmap from './components/WaferHeatmap';
import Statistics from './components/Statistics';

export default function Home() {
  const [selectedLot, setSelectedLot] = useState('D101');
  const [selectedAction, setSelectedAction] = useState('query');
  const [selectedWafer, setSelectedWafer] = useState<{
    id: string;
    waferNumber: string;
    lotId: string;
    yield: number;
  } | null>(null);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('TODAY');
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [generatedLots, setGeneratedLots] = useState<string[]>([]);
  const [generatedWafers, setGeneratedWafers] = useState<{[key: string]: string[]}>({});

  const handleLotChange = (lot: string) => {
    setSelectedLot(lot);
    setSelectedWafer(null); // Lot 변경 시 선택된 웨이퍼 초기화
  };

  const handleActionChange = (action: string) => {
    // 이미지가 업로드되지 않은 상태에서 통계나 웨이퍼 맵을 선택하려고 할 때
    if ((action === 'statistics' || action === 'wafer-map') && !uploadedImage) {
      alert('웨이퍼 맵 이미지를 먼저 업로드해주세요.');
      return;
    }
    
    setSelectedAction(action);
    setSelectedWafer(null); // 액션 변경 시 선택된 웨이퍼 초기화
  };

  const handleTimeFilterChange = (filter: string, customRange?: { startDate: string; endDate: string }) => {
    setSelectedTimeFilter(filter);
    if (customRange) {
      setCustomDateRange(customRange);
    }
  };

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    console.log('업로드된 파일:', file.name);
    
    // 업로드된 이미지에 따라 Lots와 Wafers 동적 생성
    generateLotsAndWafers(file);
  };

  const generateLotsAndWafers = (file: File) => {
    // 파일명이나 크기에 따라 다른 Lots 생성 (실제로는 이미지 분석 결과에 따라)
    const lots = [];
    const wafers: {[key: string]: string[]} = {};
    
    // 예시: 파일 크기나 이름에 따라 다른 개수의 Lots 생성
    const fileSize = file.size;
    const numLots = Math.min(Math.max(Math.floor(fileSize / 50000) + 5, 5), 12); // 5-12개 Lots (스크롤 테스트용)
    
    for (let i = 0; i < numLots; i++) {
      const lotId = `D${100 + i}`;
      lots.push(lotId);
      
      // 각 Lot마다 25개 웨이퍼 생성
      const waferList = [];
      for (let j = 1; j <= 25; j++) {
        waferList.push(`${lotId}_${j}`);
      }
      wafers[lotId] = waferList;
    }
    
    setGeneratedLots(lots);
    setGeneratedWafers(wafers);
    
    // 첫 번째 Lot을 기본 선택으로 설정
    if (lots.length > 0) {
      setSelectedLot(lots[0]);
    }
  };

  const handleWaferSelect = (wafer: { id: string; waferNumber: string; lotId: string; yield: number }) => {
    setSelectedWafer(wafer);
  };

  const handleBackToGrid = () => {
    setSelectedWafer(null);
  };

  const renderMainContent = () => {
    if (selectedAction === 'statistics') {
      return (
        <Statistics 
          selectedTimeFilter={selectedTimeFilter}
          customDateRange={customDateRange}
        />
      );
    } else if (selectedAction === 'wafer-map') {
      if (selectedWafer) {
        return (
          <WaferHeatmap
            waferId={selectedWafer.id}
            waferNumber={selectedWafer.waferNumber}
            lotId={selectedWafer.lotId}
            yield={selectedWafer.yield}
            onBack={handleBackToGrid}
          />
        );
      } else {
        return (
          <>
            <div className="mb-4 text-sm text-gray-700">
              아래 목록의 웨이퍼의 결함을 텍스트로 입력{' '}
              <span className="text-green-600 font-semibold">Scratch</span>,{' '}
              <span className="text-red-600 font-semibold">Edge-Ring</span>,{' '}
              <span className="text-yellow-600 font-semibold">No Pattern</span>{' '}
              등 아래 웨이퍼 배경색에 따라 글자 색에도 반영
            </div>
            <div className="mb-4 text-lg font-bold text-gray-800">
              현재 선택된 Lot: <span className="text-green-600">{selectedLot}</span>
            </div>
                    <WaferGrid 
                      selectedLot={selectedLot} 
                      onWaferSelect={handleWaferSelect}
                      generatedLots={generatedLots}
                      generatedWafers={generatedWafers}
                    />
          </>
        );
      }
    } else if (selectedAction === 'query') {
      return (
        <div className="flex flex-col items-center justify-center h-96 space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-4">웨이퍼 결함 분석 조회</div>
            <div className="text-lg text-gray-600 mb-2">선택된 기간: <span className="font-semibold text-blue-600">{selectedTimeFilter}</span></div>
            {customDateRange.startDate && customDateRange.endDate && (
              <div className="text-sm text-gray-500 mb-4">
                ({new Date(customDateRange.startDate).toLocaleDateString('ko-KR')} ~ {new Date(customDateRange.endDate).toLocaleDateString('ko-KR')})
              </div>
            )}
            {uploadedImage && (
              <div className="text-sm text-green-600 mb-4">
                ✅ 업로드된 이미지: {uploadedImage.name}
              </div>
            )}
            <div className="text-gray-500 mb-6">
              {uploadedImage ? '이미지가 업로드되었습니다. 좌측 사이드바의 조회 버튼을 클릭하세요.' : '웨이퍼 맵 이미지를 업로드하고 기간을 선택한 후 좌측 사이드바의 조회 버튼을 클릭하세요.'}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 좌측 사이드바 */}
      <Sidebar 
        onLotChange={handleLotChange}
        onActionChange={handleActionChange}
        selectedAction={selectedAction}
        onTimeFilterChange={handleTimeFilterChange}
        onImageUpload={handleImageUpload}
        generatedLots={generatedLots}
        generatedWafers={generatedWafers}
        selectedLot={selectedLot}
        onWaferSelect={handleWaferSelect}
        selectedWafer={selectedWafer}
      />
      
      {/* 우측 메인 콘텐츠 영역 */}
      <main className="flex-1 p-6">
        {renderMainContent()}
      </main>
    </div>
  );
}
