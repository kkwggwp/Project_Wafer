## **반도체 웨이퍼 불량 예측 모델 및 웹 대시보드: 개발 명세서**

### 1\. 프로젝트 개요

  * **프로젝트 명**: 반도체 웨이퍼 불량 패턴 예측 모델 및 웹 대시보드 페이지 개발
  * **목표**: 웨이퍼맵 데이터를 사용하여 불량 패턴을 분류 및 예측하고, 새로운 유형의 불량을 탐지하는 머신러닝 모델을 개발한다. 최종 결과물은 사용자가 데이터를 직관적으로 탐색하고 분석할 수 있는 인터랙티브 웹 대시보드 형태로 구현한다.

### 2\. 핵심 기술 스택

  * **전체 구조**: 모노레포 (Monorepo) 방식 채택
  * **백엔드 (Backend)**
      * Framework: **FastAPI**
      * Web Server: **Uvicorn** (ASGI)
      * ORM: **SQLAlchemy**
  * **프론트엔드 (Frontend)**
      * Framework: **Next.js** (App Router 기반)
      * Language: **TypeScript**
      * State Management: **Zustand**
      * Data Fetching: **TanStack Query (React Query)**
  * **데이터베이스 (Database)**
      * **MySQL**

### 3\. 시스템 아키텍처

본 프로젝트는 클라이언트(프론트엔드)와 서버(백엔드)가 명확히 분리된 구조를 따릅니다.

  * **통신 방식**: 프론트엔드와 백엔드는 **RESTful API**를 통해 JSON 형식으로 데이터를 교환합니다.
  * **실행 흐름**:
    1.  사용자가 웹 대시보드(Next.js)에서 기간 선택 후 '조회' 버튼을 클릭합니다.
    2.  프론트엔드는 TanStack Query를 통해 백엔드(FastAPI)의 해당 API 엔드포인트로 데이터를 요청합니다.
    3.  백엔드는 요청을 받아 SQLAlchemy를 통해 MySQL 데이터베이스에서 데이터를 조회합니다.
    4.  필요시, 로드된 ML 모델을 사용하여 예측/분석 결과를 생성합니다.
    5.  백엔드는 조회된 데이터와 분석 결과를 JSON 형태로 프론트엔드에 응답합니다.
    6.  프론트엔드는 응답받은 데이터를 화면에 렌더링하여 사용자에게 보여줍니다.

### 4\. 프로젝트 폴더 구조

하나의 Git 저장소 내에서 백엔드와 프론트엔드를 함께 관리하는 모노레포 구조를 사용합니다.

```
/Project_Wafer
├── /backend/              # FastAPI 백엔드
│   ├── /app/
│   │   ├── /api/
│   │   │   └── /v1/         # API 엔드포인트
│   │   │       ├── wafers.py
│   │   │       └── statistics.py
│   │   ├── /crud/         # DB 데이터 처리 로직
│   │   ├── /db/           # DB 세션 및 설정
│   │   ├── /models/       # SQLAlchemy 테이블 모델
│   │   ├── /schemas/      # Pydantic 데이터 형태 정의
│   │   ├── /services/     # ML 모델 추론 등 비즈니스 로직
│   │   └── main.py        # FastAPI 앱 초기화
│   └── requirements.txt
├── /frontend/             # Next.js 프론트엔드
│   ├── /app/
│   │   ├── /(dashboard)/
│   │   │   ├── /wafer-map/
│   │   │   └── /statistics/
│   │   └── layout.tsx
│   ├── /components/
│   │   ├── /feature/      # 기능별 컴포넌트 묶음
│   │   └── /ui/           # 재사용 UI 컴포넌트
│   ├── /services/         # API 요청 함수
│   └── /store/            # 전역 상태 관리
└── README.md
```

### 5\. 백엔드 API 명세 (FastAPI)

#### 5.1. 모델 정의 (models & schemas)

  * **Wafer Model**: `wafer_id`, `lot_id`, `yield`, `defect_type`, `image_path`, `timestamp` 등의 컬럼을 포함.
  * **Lot Model**: `lot_id`, `process_id`, `timestamp` 등의 컬럼을 포함.
  * 각 모델에 대응하는 Pydantic `Schema`를 정의하여 API 입출력 데이터의 유효성을 검증.

#### 5.2. API 엔드포인트 (api/v1/)

  * **`GET /api/v1/wafers`**: 특정 조건(기간, Lot ID, 최근 25개 등)에 맞는 웨이퍼 목록을 조회. (기능 명세 1.1, 2.1)
      * 쿼리 파라미터: `start_date`, `end_date`, `lot_id`, `latest={n}`
  * **`GET /api/v1/wafers/{wafer_id}`**: 단일 웨이퍼의 상세 정보(고해상도 이미지 경로, 수율 등)를 조회. (기능 명세 2.3)
  * **`GET /api/v1/lots`**: 특정 기간 내의 Lot 목록을 조회. (기능 명세 2.1)
      * 쿼리 파라미터: `start_date`, `end_date`
  * **`GET /api/v1/statistics/summary`**: 기간 내 통계 요약 지표(전체/불량 웨이퍼 수, 불량률, 전일 대비)를 조회. (기능 명세 3.1)
      * 쿼리 파라미터: `start_date`, `end_date`
  * **`GET /api/v1/statistics/defect-types`**: 기간 내 불량 유형별 통계 데이터(빈도, 비중, 상위 5개)를 조회. (기능 명세 3.2, 3.4, 3.5)
      * 쿼리 파라미터: `start_date`, `end_date`
  * **`GET /api/v1/statistics/trend`**: 기간별 불량률 추이 데이터를 조회. (기능 명세 3.3)
      * 쿼리 파라미터: `start_date`, `end_date`

### 6\. 프론트엔드 기능 명세 (Next.js)

#### 6.1. 페이지 및 라우팅 (`app/`)

  * **`app/(dashboard)/layout.tsx`**: 좌측 공통 메뉴 (기간 선택, 조회 버튼)를 포함하는 공통 레이아웃. (기능 명세 1)
  * **`app/(dashboard)/wafer-map/page.tsx`**: 웨이퍼 맵 조회 화면. (기능 명세 2)
  * **`app/(dashboard)/statistics/page.tsx`**: 통계 분석 화면. (기능 명세 3)

#### 6.2. 핵심 컴포넌트 (`components/`)

  * **`/ui` (범용 UI)**
      * `Button.tsx`: TODAY, 조회 등 모든 버튼.
      * `Calendar.tsx`: Time Range 선택을 위한 달력.
      * `Card.tsx`: 웨이퍼 썸네일, 요약 지표 등을 감싸는 카드.
  * **`/feature/common`**
      * `TimeRangeFilter.tsx`: 좌측 메뉴의 기간 필터 그룹. (기능 명세 1.1)
      * `LotWaferSelector.tsx`: Lot/Wafer 리스트 컴포넌트. (기능 명세 2.1)
  * **`/feature/wafer-map`**
      * `WaferGalleryView.tsx`: Lot 선택 시 표시되는 웨이퍼 썸네일 그리드. (기능 명세 2.2)
      * `WaferDetailView.tsx`: 단일 웨이퍼 선택 시 표시되는 상세 뷰. (기능 명세 2.3)
  * **`/feature/statistics`**
      * `SummaryMetrics.tsx`: 요약 지표 카드 그룹. (기능 명세 3.1)
      * `DefectFrequencyChart.tsx`: 불량 유형별 빈도 막대 차트. (기능 명세 3.2)
      * `DefectTrendChart.tsx`: 기간별 불량률 추이 꺾은선 그래프. (기능 명세 3.3)
      * `TopDefectsTable.tsx`: 불량 상위 5개 유형 테이블. (기능 명세 3.4)
      * `DefectProportionChart.tsx`: 불량 유형별 비중 파이 차트. (기능 명세 3.5)

#### 6.3. 상태 및 데이터 관리

  * **전역 상태 (`store/filterStore.ts`)**: Zustand를 사용하여 사용자가 선택한 **조회 기간**, **선택된 Lot ID**, **선택된 Wafer ID**를 전역으로 관리.
  * **서버 데이터 (`services/`)**: `axios` 또는 `fetch`를 사용하여 API 요청 함수들을 `lotService.ts`, `waferService.ts` 등으로 분리하여 관리. TanStack Query를 통해 이 함수들을 호출하여 서버 데이터의 캐싱, 로딩 및 에러 상태를 자동으로 처리.
