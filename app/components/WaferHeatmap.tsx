'use client';

interface WaferHeatmapProps {
  waferId: string;
  waferNumber: string;
  lotId: string;
  yield: number;
  onBack: () => void;
}

export default function WaferHeatmap({ waferId, waferNumber, lotId, yield: waferYield, onBack }: WaferHeatmapProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* 상단 정보 */}
      <div className="mb-6 text-right">
        <div className="text-lg font-bold text-gray-800">
          {lotId}
        </div>
        <div className="text-sm text-gray-600">
          수율 {waferYield}%
        </div>
      </div>

      {/* 웨이퍼 히트맵 */}
      <div className="relative mb-6">
        <div className="w-80 h-80 rounded-full bg-gray-200 border-4 border-gray-400 flex items-center justify-center shadow-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700 mb-2">
              {waferId} Wafer {waferNumber}
            </div>
            <div className="text-sm text-gray-600">
            </div>
          </div>
        </div>
        
        {/* 히트맵 점들 (결함 위치 시뮬레이션) */}
        <div className="absolute inset-0 w-80 h-80 rounded-full">
          {/* 랜덤한 위치에 결함 점들 표시 */}
          <div className="absolute top-16 left-20 w-3 h-3 bg-red-500 rounded-full opacity-70"></div>
          <div className="absolute top-32 right-24 w-2 h-2 bg-yellow-500 rounded-full opacity-60"></div>
          <div className="absolute bottom-20 left-16 w-2 h-2 bg-orange-500 rounded-full opacity-50"></div>
          <div className="absolute bottom-32 right-20 w-3 h-3 bg-red-500 rounded-full opacity-70"></div>
          <div className="absolute top-24 left-32 w-2 h-2 bg-yellow-500 rounded-full opacity-60"></div>
          <div className="absolute bottom-16 right-32 w-2 h-2 bg-orange-500 rounded-full opacity-50"></div>
        </div>
      </div>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        웨이퍼 목록으로 돌아가기
      </button>
    </div>
  );
}

