'use client';

import { useState } from 'react';

interface SidebarProps {
  onLotChange: (lot: string) => void;
  onActionChange: (action: string) => void;
  selectedAction: string;
  onTimeFilterChange: (filter: string, customRange?: { startDate: string; endDate: string }) => void;
  onImageUpload: (file: File) => void;
  generatedLots: string[];
  generatedWafers: {[key: string]: string[]};
  selectedLot: string;
  onWaferSelect?: (wafer: { id: string; waferNumber: string; lotId: string; yield: number }) => void;
  selectedWafer?: { id: string; waferNumber: string; lotId: string; yield: number } | null;
}

export default function Sidebar({ onLotChange, onActionChange, selectedAction, onTimeFilterChange, onImageUpload, generatedLots, generatedWafers, selectedLot, onWaferSelect, selectedWafer }: SidebarProps) {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('TODAY');
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const timeFilters = [
    'TODAY',
    'Last 24 Hours',
    'Latest 25',
    'Last 3 Weeks',
    'Time Range'
  ];

  // 동적으로 생성된 Lots와 Wafers 사용
  const lots = generatedLots.length > 0 ? generatedLots : ['D101', 'D100', 'D099'];
  const wafers = selectedLot && generatedWafers[selectedLot] ? generatedWafers[selectedLot] : [];

  const handleTimeFilterClick = (filter: string) => {
    if (filter === 'Time Range') {
      setShowDatePicker(!showDatePicker);
    } else {
      setShowDatePicker(false);
      setSelectedTimeFilter(filter);
      onTimeFilterChange(filter);
    }
  };

  const handleDateRangeSubmit = () => {
    if (customDateRange.startDate && customDateRange.endDate) {
      setSelectedTimeFilter('Time Range');
      setShowDatePicker(false);
      onTimeFilterChange('Time Range', customDateRange);
    }
  };

  const handleLotClick = (lot: string) => {
    onLotChange(lot);
  };

  const handleWaferClick = (waferId: string) => {
    if (onWaferSelect) {
      // 웨이퍼 ID에서 번호 추출 (예: D100_5 -> 5)
      const waferNumber = waferId.split('_')[1] || '1';
      
      // 수율 계산 (랜덤하게)
      const yieldPercentage = Math.floor(Math.random() * 30) + 70; // 70-100%
      
      onWaferSelect({
        id: selectedLot,
        waferNumber,
        lotId: waferId,
        yield: yieldPercentage
      });
    }
  };

  const handleActionClick = (action: string) => {
    // 조회 버튼을 클릭했을 때 이미지가 업로드되어 있으면 통계 화면으로 이동
    if (action === 'query') {
      if (generatedLots.length > 0) {
        onActionChange('statistics');
      } else {
        alert('웨이퍼 맵 이미지를 먼저 업로드해주세요.');
        return;
      }
    } else {
      onActionChange(action);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const formatDateRange = () => {
    if (customDateRange.startDate && customDateRange.endDate) {
      const start = new Date(customDateRange.startDate).toLocaleDateString('ko-KR');
      const end = new Date(customDateRange.endDate).toLocaleDateString('ko-KR');
      return `${start} ~ ${end}`;
    }
    return '';
  };

  return (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-300">
      {/* 이미지 업로드 섹션 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-gray-800">웨이퍼 맵 업로드</h3>
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="w-full py-2 px-3 bg-blue-200 text-blue-800 rounded text-sm font-medium hover:bg-blue-300 transition-colors cursor-pointer flex items-center justify-center"
          >
            📁 이미지 업로드
          </label>
          <div className="text-xs text-gray-500 text-center">
            JPG, PNG, GIF 파일만 업로드 가능
          </div>
        </div>
      </div>

      {/* 시간 필터 섹션 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-gray-800">Time Filter</h3>
        {timeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleTimeFilterClick(filter)}
            className={`w-full text-left py-2 px-3 mb-1 rounded text-sm font-medium transition-all duration-200 ${
              selectedTimeFilter === filter
                ? 'bg-blue-500 text-white border-2 border-blue-600 shadow-md transform scale-105'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{filter}</span>
              {selectedTimeFilter === filter && (
                <span className="text-xs">✓</span>
              )}
            </div>
          </button>
        ))}
        
        {/* 날짜 선택 UI */}
        {showDatePicker && (
          <div className="mt-3 p-3 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">시작 날짜</label>
              <input
                type="date"
                value={customDateRange.startDate}
                onChange={(e) => setCustomDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">종료 날짜</label>
              <input
                type="date"
                value={customDateRange.endDate}
                onChange={(e) => setCustomDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDateRangeSubmit}
                className="flex-1 py-1 px-2 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                적용
              </button>
              <button
                onClick={() => setShowDatePicker(false)}
                className="flex-1 py-1 px-2 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
              >
                취소
              </button>
            </div>
          </div>
        )}
        
        {/* 선택된 기간 표시 */}
        {selectedTimeFilter === 'Time Range' && formatDateRange() && (
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
            <div className="font-medium">선택된 기간:</div>
            <div>{formatDateRange()}</div>
          </div>
        )}
      </div>

      {/* Lots 섹션 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-gray-800">
          Lots {generatedLots.length > 0 && `(${generatedLots.length}개)`}
        </h3>
        <div className="max-h-48 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {generatedLots.length > 0 ? (
            lots.map((lot) => (
              <button
                key={lot}
                onClick={() => handleLotClick(lot)}
                className={`w-full text-left py-2 px-3 rounded text-sm font-medium transition-all duration-200 ${
                  selectedLot === lot
                    ? 'bg-green-500 text-white border-2 border-green-600 shadow-md transform scale-105'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{lot}</span>
                  {selectedLot === lot && (
                    <span className="text-xs">✓</span>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="py-4 text-center text-sm text-gray-500">
              이미지를 업로드하세요
            </div>
          )}
        </div>
      </div>

      {/* Wafers 섹션 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-gray-800">
          Wafers {wafers.length > 0 && `(${wafers.length}개)`}
        </h3>
        <div className="max-h-64 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {wafers.length > 0 ? (
            wafers.map((wafer) => {
              const isSelected = selectedWafer?.lotId === wafer;
              return (
                <button
                  key={wafer}
                  onClick={() => handleWaferClick(wafer)}
                  className={`w-full text-left py-2 px-3 text-sm rounded transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-500 text-white border-2 border-blue-600 shadow-md transform scale-105'
                      : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{wafer}</span>
                    {isSelected && (
                      <span className="text-xs">✓</span>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-4 text-center text-sm text-gray-500">
              {generatedLots.length > 0 ? 'Lot을 선택하세요' : '이미지를 업로드하세요'}
            </div>
          )}
        </div>
      </div>

      {/* 액션 버튼 섹션 */}
      <div className="space-y-2">
        <button 
          onClick={() => handleActionClick('statistics')}
          className={`w-full py-2 px-3 rounded text-sm font-medium transition-colors ${
            selectedAction === 'statistics'
              ? 'bg-blue-300 text-blue-900 border-2 border-blue-400'
              : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
          }`}
        >
          통계
        </button>
        <button 
          onClick={() => handleActionClick('wafer-map')}
          className={`w-full py-2 px-3 rounded text-sm font-medium transition-colors ${
            selectedAction === 'wafer-map'
              ? 'bg-green-300 text-green-900 border-2 border-green-400'
              : 'bg-green-200 text-green-800 hover:bg-green-300'
          }`}
        >
          웨이퍼 맵
        </button>
        <div className="text-xs text-gray-500 mb-1">Frame 45</div>
        <button 
          onClick={() => handleActionClick('query')}
          className={`w-full py-2 px-3 rounded text-sm font-medium transition-colors ${
            generatedLots.length > 0
              ? selectedAction === 'statistics'
                ? 'bg-purple-300 text-purple-900 border-2 border-purple-400'
                : 'bg-purple-200 text-purple-800 hover:bg-purple-300'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          조회
        </button>
      </div>
    </div>
  );
}
