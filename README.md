# FANCLUV MVP - K리그 팬 의견 수집 플랫폼

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

**FANCLUV MVP**는 K리그 팬들의 의견을 수집하고 분석하는 플랫폼입니다. 팬들의 팀 선호도, 의견, 설문 응답을 통해 팬 행동 데이터를 수집합니다.

## 🎯 프로젝트 개요

### 주요 기능

- **팬 의견 수집**: K리그 팬들의 실시간 의견 수집
- **팀 선택**: 12개 K리그 팀 중 선호 팀 선택
- **의견 작성**: 팀에 대한 자유로운 의견 작성
- **설문 응답**: 구조화된 설문에 참여
- **반응형 디자인**: 모바일/데스크톱 완벽 지원
- **Mock 데이터**: 실제 배포 전 테스트용 Mock 데이터 제공

### 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS 3, Lucide React Icons
- **Backend**: Next.js API Routes
- **Database**: Supabase (준비 완료, 향후 연동)
- **Deployment**: Vercel

## 📋 프로젝트 구조

```
fancluv-pages/
├── pages/                    # Next.js Pages Router
│   ├── index.tsx            # 랜딩 페이지
│   ├── login.tsx            # 로그인 페이지
│   ├── signup.tsx           # 회원가입 페이지
│   ├── team-selection.tsx   # 팀 선택 페이지
│   ├── app.tsx              # 구단 페이지 (메인)
│   ├── opinion/
│   │   ├── create.tsx       # 의견 작성 페이지
│   │   └── [id].tsx         # 의견 상세 페이지
│   ├── survey.tsx           # 설문 페이지
│   ├── profile.tsx          # 프로필 페이지
│   ├── api/                 # API Routes
│   │   ├── opinions/        # 의견 API
│   │   ├── surveys/         # 설문 API
│   │   ├── teams/           # 팀 API
│   │   └── users/           # 사용자 API
│   └── _error.tsx           # 에러 페이지
├── components/              # React 컴포넌트
│   ├── ui/                  # UI 컴포넌트 (shadcn/ui)
│   └── [feature]/           # 기능별 컴포넌트
├── lib/                     # 유틸리티 함수
├── styles/                  # 전역 스타일
├── types/                   # TypeScript 타입
├── supabase/                # Supabase 설정 및 스키마
└── public/                  # 정적 자산
```

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18.17 이상
- npm 또는 yarn

### 로컬 설치

1. **저장소 클론**
```bash
git clone https://github.com/your-username/fancluv.git
cd fancluv
```

2. **의존성 설치**
```bash
npm install
# 또는
yarn install
```

3. **환경 변수 설정**
```bash
cp .env.example .env.local
```

`.env.local` 파일을 편집하여 필요한 환경 변수 설정:
```env
# Supabase Configuration (선택사항 - Mock 데이터 사용 시 불필요)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=FANCLUV
```

4. **개발 서버 실행**
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📱 페이지 가이드

### 1. 랜딩 페이지 (`/`)
- FANCLUV 소개
- 회원가입/로그인 CTA

### 2. 회원가입 (`/signup`)
- 이메일, 비밀번호 입력
- Mock: 모든 입력 수용

### 3. 로그인 (`/login`)
- 이메일, 비밀번호 입력
- Mock: 모든 입력 수용

### 4. 팀 선택 (`/team-selection`)
- 12개 K리그 팀 중 선택
- 선택 후 `/app`으로 이동

### 5. 구단 페이지 (`/app`)
- 선택한 팀의 의견 피드
- 의견 작성 버튼
- 의견 목록 표시

### 6. 의견 작성 (`/opinion/create`)
- 의견 제목, 내용 입력
- 작성 후 `/app`으로 이동

### 7. 의견 상세 (`/opinion/[id]`)
- 의견 상세 내용 표시
- 댓글 기능 (준비 중)

### 8. 설문 (`/survey`)
- 구조화된 설문 응답
- 5가지 문항 타입 지원

### 9. 프로필 (`/profile`)
- 사용자 정보 표시
- 작성한 의견 목록

## 🔧 API 엔드포인트

### 의견 API
- `GET /api/opinions` - 의견 목록 조회
- `POST /api/opinions` - 의견 작성
- `GET /api/opinions/[id]` - 의견 상세 조회

### 팀 API
- `GET /api/teams` - 팀 목록 조회

### 사용자 API
- `GET /api/users/me` - 현재 사용자 정보
- `POST /api/users/register` - 사용자 등록

### 설문 API
- `GET /api/surveys` - 설문 목록 조회
- `POST /api/surveys/responses` - 설문 응답 저장

## 📊 Mock 데이터

현재 모든 API는 Mock 데이터를 반환합니다:

- **12개 K리그 팀** 데이터
- **샘플 의견** 50개
- **샘플 설문** 10개

Supabase 연동 후 실제 데이터베이스에서 데이터를 가져옵니다.

## 🔐 보안

- 환경 변수는 `.env.local`에 저장 (Git 제외)
- `.gitignore`에 민감한 파일 제외
- HTTPS 자동 적용 (Vercel 배포 시)

## 📦 배포

### Vercel 배포 (권장)

1. **GitHub에 푸시**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Vercel 웹사이트에서 배포**
   - [https://vercel.com](https://vercel.com) 방문
   - "Import Project" 클릭
   - GitHub 저장소 선택
   - 배포 완료

3. **환경 변수 설정 (선택사항)**
   - Vercel 대시보드 → Settings → Environment Variables
   - Supabase 키 추가
   - Redeploy 클릭

### 배포 후 확인

배포 후 다음 URL에서 페이지 접근 확인:

- Landing: `https://your-domain.vercel.app/`
- Signup: `https://your-domain.vercel.app/signup`
- Login: `https://your-domain.vercel.app/login`
- Team Selection: `https://your-domain.vercel.app/team-selection`
- App: `https://your-domain.vercel.app/app`

## 🔄 개발 워크플로우

### 새 기능 추가

1. **페이지 생성** (`pages/` 디렉토리)
2. **컴포넌트 생성** (`components/` 디렉토리)
3. **API 라우트 생성** (`pages/api/` 디렉토리)
4. **로컬 테스트** (`npm run dev`)
5. **Git 커밋 및 푸시**
6. **Vercel 자동 배포**

### 스타일링

- Tailwind CSS 3 사용
- `styles/globals.css`에서 전역 스타일 정의
- 컴포넌트별 Tailwind 클래스 사용

## 🐛 문제 해결

### 빌드 오류
```bash
# 캐시 삭제 후 재빌드
rm -rf .next
npm run build
```

### 포트 충돌
```bash
# 다른 포트에서 실행
npm run dev -- -p 3001
```

### 모듈 찾을 수 없음
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

## 📝 라이선스

MIT License - 자유롭게 사용 가능

## 👥 기여

버그 리포트, 기능 제안, Pull Request를 환영합니다!

## 📞 지원

문제가 발생하면:

1. [GitHub Issues](https://github.com/your-username/fancluv/issues)에서 확인
2. 새 Issue 생성
3. 상세한 오류 메시지 포함

## 🎯 로드맵

### Phase 1: MVP (현재) ✅
- [x] 기본 페이지 구현
- [x] Mock 데이터 제공
- [x] Vercel 배포 준비

### Phase 2: Supabase 연동 (예정)
- [ ] Supabase 데이터베이스 연동
- [ ] 실제 데이터 저장
- [ ] 사용자 인증

### Phase 3: 고급 기능 (예정)
- [ ] 댓글 기능
- [ ] 좋아요 기능
- [ ] 관리자 대시보드
- [ ] 분석 기능

---

**FANCLUV MVP** - K리그 팬 의견 수집 플랫폼

**최종 업데이트**: 2026년 6월 18일
