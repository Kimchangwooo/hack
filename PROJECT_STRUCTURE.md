# Career AI - 프로젝트 구조

## 📁 프로젝트 개요

Career AI는 세종대학교 졸업생 데이터를 기반으로 한 AI 이력서 분석 및 취업 성공 서비스입니다.

## 🏗️ 아키텍처

```
Career AI
├── 📱 Frontend (React + TypeScript + Tailwind CSS)
├── 🤖 AI 분석 엔진 (모의 구현)
├── 📊 데이터 레이어 (세종대 졸업생 데이터)
└── 🔄 상태 관리 (Custom Hooks)
```

## 📂 폴더 구조

```
├── App.tsx                           # 애플리케이션 진입점
├── components/                       # React 컴포넌트
│   ├── AppRouter.tsx                 # 라우팅 로직 분리
│   ├── pages/                        # 페이지 컴포넌트
│   │   └── HomePage.tsx             # 홈페이지 컴포넌트
│   ├── ai-prediction/               # AI 예측 관련 컴포넌트
│   ├── resume-sections/             # 이력서 섹션 컴포넌트
│   ├── resume-steps/                # 단계별 빌더 컴포넌트
│   ├── sections/                    # 페이지 섹션 컴포넌트
│   ├── figma/                       # Figma 관련 유틸리티
│   └── ui/                          # Shadcn/ui 컴포넌트
├── hooks/                           # 커스텀 훅
├── types/                           # TypeScript 타입 정의
├── constants/                       # 상수 정의
├── utils/                           # 유틸리티 함수
└── styles/                          # 스타일 파일
```

## 🚀 주요 기능

### 1. 이력서 관리
- **새 이력서 작성**: 단계별 가이드 제공
- **파일 업로드**: PDF, DOCX 파일 지원
- **이력서 편집**: 실시간 미리보기
- **템플릿 제공**: 다양한 이력서 템플릿

### 2. AI 분석 시스템
- **실시간 분석**: 업로드 즉시 AI 분석 시작
- **세부 분석**: 섹션별 점수 및 피드백
- **개선 제안**: 구체적인 개선 방안 제시
- **합격률 예측**: 기업별 합격 가능성 예측

### 3. 기업 추천
- **맞춤형 추천**: 개인 프로필 기반 기업 매칭
- **세종대 우대기업**: 세종대 출신 우대 기업 정보
- **합격률 표시**: 실제 데이터 기반 합격 확률
- **상세 정보**: 기업 정보, 연봉, 복지 등

### 4. 세종대 특화 서비스
- **동문 네트워크**: 선배 조언 및 성공 사례
- **학교별 비교**: 동기 대비 경쟁력 분석
- **우대기업 정보**: 세종대 출신 선호 기업 목록
- **취업 통계**: 학과별, 연도별 취업 현황

## 🛠️ 기술 스택

### Frontend
- **React 18**: 컴포넌트 기반 UI 프레임워크
- **TypeScript**: 타입 안전성 및 개발 생산성
- **Tailwind CSS v4**: 유틸리티 퍼스트 CSS 프레임워크
- **Shadcn/ui**: 재사용 가능한 UI 컴포넌트 라이브러리

### 상태 관리
- **Custom Hooks**: 로컬 상태 관리
- **useAppState**: 전역 애플리케이션 상태
- **useResumeData**: 이력서 데이터 관리
- **useStepNavigation**: 단계별 네비게이션

### 유틸리티
- **PDF Generation**: PDF 다운로드 기능
- **File Upload**: 드래그앤드롭 파일 업로드
- **Responsive Design**: 모바일 우선 반응형 디자인

## 📱 페이지 구조

### 1. 홈페이지 (`/`)
```
Header
├── 네비게이션
└── 프로필 버튼

Hero Banner
├── 메인 메시지
├── CTA 버튼
└── 스크롤 가이드

Resume List
├── 새 이력서 작성
├── 파일 업로드
└── 기존 이력서 목록

Footer
└── 회사 정보
```

### 2. 이력서 작성 (`/resume-builder`)
```
Progress Sidebar (50%)    |    Resume Preview (50%)
├── 단계별 진행률         |    ├── 실시간 미리보기
├── 현재 단계 표시        |    ├── 섹션별 내용
└── 네비게이션 버튼       |    └── 다운로드 버튼
```

### 3. AI 분석 페이지 (`/ai-analysis`)
```
Analysis Header
├── 파일 정보
└── 분석 상태

Tab Navigation
├── 상세 분석
├── 개선 제안
├── 등급 비교
├── 세종대 특화
└── 기업 추천

Results Content
├── 점수 및 차트
├── 강점/약점 분석
└── 액션 플랜
```

## 🔄 사용자 플로우

### 신규 사용자
```
홈페이지 → 이력서 작성 → AI 분석 → 기업 추천 → 지원
```

### 기존 사용자
```
홈페이지 → 이력서 선택 → AI 재분석 → 업데이트된 추천
```

### 파일 업로드 사용자
```
홈페이지 → 파일 업로드 → 자동 분석 → 결과 확인 → 개선 실행
```

## 📊 데이터 모델

### 이력서 데이터
```typescript
interface ResumeData {
  personal: PersonalInfo;
  employment: WorkExperience[];
  education: Education[];
  skills: string[];
  summary: string;
}
```

### AI 분석 결과
```typescript
interface AnalysisResult {
  overallScore: number;
  sectionScores: SectionScores;
  strengths: Strength[];
  improvements: Improvement[];
  companyRecommendations: Company[];
}
```

### 회사 정보
```typescript
interface Company {
  id: number;
  name: string;
  successRate: number;
  position: string;
  requirements: string[];
  benefits: string[];
  whyRecommended: string;
}
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Blue (#3B82F6) - 신뢰성, 전문성
- **Secondary**: Purple (#8B5CF6) - 혁신성, AI
- **Success**: Green (#10B981) - 성공, 합격
- **Warning**: Orange (#F59E0B) - 주의, 개선 필요
- **Error**: Red (#EF4444) - 오류, 위험

### 타이포그래피
- **Heading**: Medium weight, 충분한 여백
- **Body**: Normal weight, 1.5 line-height
- **Label**: Medium weight, 명확한 구분

### 컴포넌트
- **Cards**: 그림자와 hover 효과
- **Buttons**: 그라데이션 및 애니메이션
- **Progress**: 시각적 진행률 표시
- **Badges**: 상태 및 카테고리 표시

## 🔧 개발 가이드

### 컴포넌트 작성 규칙
1. **단일 책임 원칙**: 하나의 기능만 담당
2. **Props 타입 정의**: TypeScript 인터페이스 필수
3. **재사용성 고려**: 범용적인 컴포넌트 설계
4. **접근성 준수**: ARIA 속성 및 키보드 네비게이션

### 상태 관리 패턴
1. **Local State**: useState for 컴포넌트 내부 상태
2. **Shared State**: Custom hooks for 공유 상태
3. **Global State**: useAppState for 애플리케이션 전역 상태

### 파일 명명 규칙
- **Components**: PascalCase (e.g., `HeroBanner.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAppState.ts`)
- **Types**: PascalCase (e.g., `ResumeData.ts`)
- **Utils**: camelCase (e.g., `pdfGenerator.ts`)

## 🚀 배포 및 최적화

### 성능 최적화
- **Code Splitting**: 페이지별 lazy loading
- **Image Optimization**: WebP 형식 및 적절한 크기
- **Bundle Optimization**: Tree shaking 및 minification

### SEO 최적화
- **Meta Tags**: 각 페이지별 적절한 메타 정보
- **Structured Data**: JSON-LD 스키마 마크업
- **Sitemap**: XML 사이트맵 생성

### 접근성
- **WCAG 2.1 AA**: 웹 접근성 가이드라인 준수
- **Keyboard Navigation**: 키보드만으로 모든 기능 사용 가능
- **Screen Reader**: 스크린 리더 최적화

## 📈 향후 개발 계획

### Phase 1 (완료)
- ✅ 기본 이력서 작성 기능
- ✅ AI 분석 시스템
- ✅ 기업 추천 기능
- ✅ 세종대 특화 서비스

### Phase 2 (진행 중)
- 🔄 실제 AI 모델 연동
- 🔄 데이터베이스 연동
- 🔄 사용자 인증 시스템
- 🔄 성능 최적화

### Phase 3 (계획)
- 📋 다중 이력서 관리
- 📋 취업 일정 관리
- 📋 면접 연습 기능
- 📋 네트워킹 기능

## 🤝 기여 가이드

### 개발 환경 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 타입 체크
npm run type-check
```

### 커밋 메시지 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 설정 등 기타 변경
```

---

> 📝 **마지막 업데이트**: 2025년 6월 25일
> 🔗 **관련 문서**: [README.md](./README.md) | [Attributions.md](./Attributions.md)