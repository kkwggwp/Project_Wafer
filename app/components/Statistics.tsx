'use client';

interface StatisticsProps {
  selectedTimeFilter: string;
  customDateRange?: {
    startDate: string;
    endDate: string;
  };
}

export default function Statistics({ selectedTimeFilter, customDateRange }: StatisticsProps) {
  // 기간에 따른 데이터 생성
  const generateStatisticsData = () => {
    const baseData = {
      totalWafers: 1234,
      defectiveWafers: 196,
      defectRate: 15.9,
      dailyChange: 2.3,
      defectTypes: {
        'Center': 120,
        'Edge-Ring': 85,
        'Scratch': 80,
        'Donut': 60
      },
      dailyTrend: [
        { day: '1일', rate: 10 },
        { day: '2일', rate: 15 },
        { day: '3일', rate: 7 },
        { day: '4일', rate: 18 }
      ],
      pieChartData: [
        { name: 'Center', value: 40, color: 'bg-rose-300' },
        { name: 'Donut', value: 35, color: 'bg-orange-300' },
        { name: 'Scratch', value: 15, color: 'bg-emerald-300' },
        { name: 'Edge-Ring', value: 10, color: 'bg-amber-300' }
      ]
    };

    // 기간에 따른 데이터 조정
    if (selectedTimeFilter === 'TODAY') {
      return {
        ...baseData,
        totalWafers: 456,
        defectiveWafers: 68,
        defectRate: 14.9,
        dailyChange: -1.2,
        defectTypes: {
          'Center': 45,
          'Edge-Ring': 12,
          'Scratch': 8,
          'Donut': 3
        },
        dailyTrend: [
          { day: '오전', rate: 12 },
          { day: '오후', rate: 8 },
          { day: '저녁', rate: 15 },
          { day: '야간', rate: 18 }
        ],
        pieChartData: [
          { name: 'Center', value: 66, color: 'bg-rose-300' },
          { name: 'Edge-Ring', value: 18, color: 'bg-amber-300' },
          { name: 'Scratch', value: 12, color: 'bg-emerald-300' },
          { name: 'Donut', value: 4, color: 'bg-orange-300' }
        ]
      };
    } else if (selectedTimeFilter === 'Last 24 Hours') {
      return baseData;
    } else if (selectedTimeFilter === 'Latest 25') {
      return {
        ...baseData,
        totalWafers: 25,
        defectiveWafers: 4,
        defectRate: 16.0,
        dailyChange: 0.5,
        defectTypes: {
          'Center': 2,
          'Edge-Ring': 1,
          'Scratch': 1,
          'Donut': 0
        },
        dailyTrend: [
          { day: '1시간', rate: 8 },
          { day: '2시간', rate: 12 },
          { day: '3시간', rate: 16 },
          { day: '4시간', rate: 20 }
        ],
        pieChartData: [
          { name: 'Center', value: 50, color: 'bg-rose-300' },
          { name: 'Edge-Ring', value: 25, color: 'bg-amber-300' },
          { name: 'Scratch', value: 25, color: 'bg-emerald-300' },
          { name: 'Donut', value: 0, color: 'bg-orange-300' }
        ]
      };
    } else if (selectedTimeFilter === 'Last 3 Weeks') {
      return {
        ...baseData,
        totalWafers: 2580,
        defectiveWafers: 412,
        defectRate: 16.0,
        dailyChange: 3.1,
        defectTypes: {
          'Center': 180,
          'Edge-Ring': 120,
          'Scratch': 80,
          'Donut': 32
        },
        dailyTrend: [
          { day: '1주차', rate: 12 },
          { day: '2주차', rate: 18 },
          { day: '3주차', rate: 14 },
          { day: '4주차', rate: 20 }
        ],
        pieChartData: [
          { name: 'Center', value: 44, color: 'bg-rose-300' },
          { name: 'Edge-Ring', value: 29, color: 'bg-amber-300' },
          { name: 'Scratch', value: 19, color: 'bg-emerald-300' },
          { name: 'Donut', value: 8, color: 'bg-orange-300' }
        ]
      };
    } else if (selectedTimeFilter === 'Time Range') {
      return {
        ...baseData,
        totalWafers: 890,
        defectiveWafers: 134,
        defectRate: 15.1,
        dailyChange: 1.8,
        defectTypes: {
          'Center': 65,
          'Edge-Ring': 35,
          'Scratch': 25,
          'Donut': 9
        },
        dailyTrend: [
          { day: '시작', rate: 8 },
          { day: '중간1', rate: 12 },
          { day: '중간2', rate: 18 },
          { day: '끝', rate: 22 }
        ],
        pieChartData: [
          { name: 'Center', value: 48, color: 'bg-rose-300' },
          { name: 'Edge-Ring', value: 26, color: 'bg-amber-300' },
          { name: 'Scratch', value: 19, color: 'bg-emerald-300' },
          { name: 'Donut', value: 7, color: 'bg-orange-300' }
        ]
      };
    }
    
    return baseData;
  };

  const data = generateStatisticsData();

  return (
    <div className="space-y-6">
      {/* 페이지 제목 */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">웨이퍼 결함 분석 통계</h1>
        <div className="text-sm text-gray-600">
          선택된 기간: <span className="font-semibold text-blue-600">{selectedTimeFilter}</span>
          {customDateRange?.startDate && customDateRange?.endDate && (
            <span className="ml-2">
              ({new Date(customDateRange.startDate).toLocaleDateString('ko-KR')} ~ {new Date(customDateRange.endDate).toLocaleDateString('ko-KR')})
            </span>
          )}
        </div>
      </div>

      {/* 상단 요약 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-600 mb-1">전체 웨이퍼</div>
              <div className="text-3xl font-bold text-slate-800">{data.totalWafers.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">📊</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-rose-50 to-rose-100 p-6 rounded-xl shadow-lg border border-rose-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-rose-600 mb-1">불량 웨이퍼</div>
              <div className="text-3xl font-bold text-rose-800">{data.defectiveWafers.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 bg-rose-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">⚠️</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-xl shadow-lg border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-amber-600 mb-1">불량률</div>
              <div className="text-3xl font-bold text-amber-800">{data.defectRate}%</div>
            </div>
            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">📈</span>
            </div>
          </div>
        </div>
        
        <div className={`bg-gradient-to-r p-6 rounded-xl shadow-lg border ${
          data.dailyChange >= 0 
            ? 'from-emerald-50 to-emerald-100 border-emerald-200' 
            : 'from-rose-50 to-rose-100 border-rose-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-sm font-medium mb-1 ${
                data.dailyChange >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}>전일 대비</div>
              <div className={`text-3xl font-bold ${
                data.dailyChange >= 0 ? 'text-emerald-800' : 'text-rose-800'
              }`}>
                {data.dailyChange >= 0 ? '+' : ''}{data.dailyChange}%
              </div>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              data.dailyChange >= 0 ? 'bg-emerald-400' : 'bg-rose-400'
            }`}>
              <span className="text-white text-xl">{data.dailyChange >= 0 ? '📈' : '📉'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 불량 유형별 빈도 (막대 그래프) */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">불량 유형별 빈도</h3>
          <div className="text-sm text-gray-500">단위: 개</div>
        </div>
        <div className="space-y-4">
          {Object.entries(data.defectTypes).map(([type, count]) => {
            const percentage = (count / 400) * 100;
            const colors = {
              'Center': 'from-rose-300 to-rose-500',
              'Edge-Ring': 'from-amber-300 to-amber-500', 
              'Scratch': 'from-emerald-300 to-emerald-500',
              'Donut': 'from-orange-300 to-orange-500'
            };
            return (
              <div key={type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${colors[type as keyof typeof colors] || 'from-gray-400 to-gray-600'}`}></div>
                    <span className="font-medium text-gray-700">{type}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-800">{count}</span>
                    <span className="text-sm text-gray-500 ml-1">개</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full h-8 relative overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r ${colors[type as keyof typeof colors] || 'from-gray-400 to-gray-600'} h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="text-white text-sm font-medium">{percentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 기간별 불량률 추이 (꺾은선 그래프) */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">기간별 불량률 추이</h3>
          <div className="text-sm text-gray-500">단위: %</div>
        </div>
        <div className="h-96 relative">
          <svg className="w-full h-full" viewBox="0 0 500 400">
            {/* Y축 그리드 라인 */}
            {[0, 5, 10, 15, 20].map((value, index) => (
              <g key={index}>
                <line
                  x1="60"
                  y1={320 - (value * 12)}
                  x2="440"
                  y2={320 - (value * 12)}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <text
                  x="50"
                  y={325 - (value * 12)}
                  textAnchor="end"
                  className="text-sm fill-gray-500"
                >
                  {value}%
                </text>
              </g>
            ))}
            
            {/* X축 라인 */}
            <line
              x1="60"
              y1="320"
              x2="440"
              y2="320"
              stroke="#374151"
              strokeWidth="2"
            />
            
            {/* Y축 라인 */}
            <line
              x1="60"
              y1="80"
              x2="60"
              y2="320"
              stroke="#374151"
              strokeWidth="2"
            />
            
            {/* 데이터 포인트들 */}
            {data.dailyTrend.map((item, index) => {
              const x = 60 + (index * 95);
              const y = 320 - (item.rate * 12);
              return (
                <g key={index}>
                  {/* 데이터 포인트 */}
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="#3b82f6"
                    stroke="#1d4ed8"
                    strokeWidth="2"
                    className="hover:r-10 transition-all duration-200"
                  />
                  
                  {/* 데이터 라벨 */}
                  <text
                    x={x}
                    y={y - 20}
                    textAnchor="middle"
                    className="text-base font-medium fill-gray-700"
                  >
                    {item.rate}%
                  </text>
                  
                  {/* X축 라벨 */}
                  <text
                    x={x}
                    y={350}
                    textAnchor="middle"
                    className="text-base fill-gray-600"
                  >
                    {item.day}
                  </text>
                </g>
              );
            })}
            
            {/* 꺾은선 연결 */}
            <polyline
              points={data.dailyTrend.map((item, index) => {
                const x = 60 + (index * 95);
                const y = 320 - (item.rate * 12);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* 그라데이션 영역 */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
              </linearGradient>
            </defs>
            
            {/* 영역 채우기 */}
            <polygon
              points={`60,320 ${data.dailyTrend.map((item, index) => {
                const x = 60 + (index * 95);
                const y = 320 - (item.rate * 12);
                return `${x},${y}`;
              }).join(' ')} 440,320`}
              fill="url(#areaGradient)"
            />
          </svg>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          최근 4일간의 불량률 변화 추이
        </div>
      </div>

      {/* 불량 상위 5개 유형 (테이블) */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">불량 상위 5개 유형</h3>
          <div className="text-sm text-gray-500">빈도순 정렬</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">순위</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">유형</th>
                <th className="text-right py-3 px-4 text-gray-700 font-semibold">빈도</th>
                <th className="text-right py-3 px-4 text-gray-700 font-semibold">비율</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.defectTypes)
                .sort(([,a], [,b]) => b - a)
                .map(([type, count], index) => {
                  const percentage = ((count / Object.values(data.defectTypes).reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                  const colors = {
                    'Center': 'bg-rose-100 text-rose-800',
                    'Edge-Ring': 'bg-amber-100 text-amber-800', 
                    'Scratch': 'bg-emerald-100 text-emerald-800',
                    'Donut': 'bg-orange-100 text-orange-800'
                  };
                  return (
                    <tr key={type} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-amber-300 text-amber-900' :
                            index === 1 ? 'bg-slate-300 text-slate-700' :
                            index === 2 ? 'bg-orange-300 text-orange-900' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
                          {type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-800">{count}</td>
                      <td className="py-3 px-4 text-right text-gray-600">{percentage}%</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 불량 유형별 비중 (원형 차트) */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">불량 유형별 비중</h3>
          <div className="text-sm text-gray-500">전체 불량 대비</div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
          {/* 원형 차트 */}
          <div className="relative w-64 h-64">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* 배경 원 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              
              {/* 차트 슬라이스들 */}
              {data.pieChartData.map((item, index) => {
                const total = data.pieChartData.reduce((sum, d) => sum + d.value, 0);
                const percentage = item.value / total;
                const circumference = 2 * Math.PI * 40;
                const strokeDasharray = `${circumference * percentage} ${circumference}`;
                const strokeDashoffset = data.pieChartData.slice(0, index).reduce((sum, d) => sum + d.value, 0) / total * circumference;
                
                const colors = {
                  'Center': '#f87171',
                  'Donut': '#fb923c', 
                  'Scratch': '#34d399',
                  'Edge-Ring': '#fbbf24'
                };
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={colors[item.name as keyof typeof colors]}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={-strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                );
              })}
            </svg>
            
            {/* 중앙 텍스트 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">100%</div>
                <div className="text-sm text-gray-600">총 불량</div>
                <div className="text-xs text-gray-500 mt-1">
                  {Object.values(data.defectTypes).reduce((a, b) => a + b, 0)}개
                </div>
              </div>
            </div>
          </div>
          
          {/* 범례 */}
          <div className="space-y-3">
            {data.pieChartData.map((item, index) => {
              const colors = {
                'Center': 'bg-rose-300',
                'Donut': 'bg-orange-300', 
                'Scratch': 'bg-emerald-300',
                'Edge-Ring': 'bg-amber-300'
              };
              
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full ${colors[item.name as keyof typeof colors]}`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-700">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.value}%</div>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">
                    {Math.round((item.value / 100) * Object.values(data.defectTypes).reduce((a, b) => a + b, 0))}개
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
