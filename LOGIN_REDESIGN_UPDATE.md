# FANCLUV MVP - 로그인/회원가입 페이지 Redesign

## 🎨 Design Overview

### 새로운 레이아웃: Split Screen Design

**전체 구조:**
- **왼쪽 (50%)**: K리그 경기장·팬 이미지 + FANCLUV 브랜딩 + 기능 설명
- **오른쪽 (50%)**: 로그인/회원가입 폼 + 입력 필드 + 링크

**반응형 디자인:**
- 데스크톱 (lg 이상): 양쪽 분할 레이아웃
- 태블릿/모바일: 단일 컬럼 (폼만 표시, 이미지 숨김)

---

## 📋 변경 사항 상세

### 1. 로그인 페이지 (pages/login.tsx)

#### 레이아웃 구조

```
┌─────────────────────────────────────────────────────────┐
│  Left Section (50%)  │  Right Section (50%)              │
│                      │                                   │
│  [Hero Image]        │  FANCLUV Logo (Mobile Only)      │
│  K리그 경기장        │  로그인                          │
│  팬들의 함성         │  ┌─────────────────────────┐     │
│                      │  │ Email Input             │     │
│  FANCLUV Logo        │  │ Password Input          │     │
│  K리그 팬들의        │  │ Login Button            │     │
│  목소리를 모으다     │  └─────────────────────────┘     │
│                      │  또는                            │
│  Features:           │  회원가입 링크                   │
│  ⚡ 의견 공유       │  홈으로 돌아가기                 │
│  📊 설문 참여       │                                   │
│  👥 팬 커뮤니티     │                                   │
└─────────────────────────────────────────────────────────┘
```

#### 주요 개선 사항

1. **비주얼 강화**
   - K리그 경기장 이미지 배경 (고품질, 1440p)
   - 그라디언트 오버레이 (primary-900 → transparent)
   - 프리미엄한 분위기 연출

2. **브랜딩 개선**
   - 큰 FANCLUV 로고 (텍스트)
   - 슬로건: "K리그 팬들의 목소리를 모으다"
   - 아이콘과 함께 기능 설명

3. **폼 개선**
   - 더 큰 입력 필드 (h-11)
   - 명확한 라벨 (font-semibold)
   - 더 나은 시각적 계층 구조

4. **사용자 경험**
   - 모바일에서 이미지 숨김 (hidden lg:flex)
   - 모바일에서 로고 표시 (lg:hidden)
   - "홈으로 돌아가기" 버튼 추가
   - 명확한 구분선 (divider)

### 2. 회원가입 페이지 (pages/signup.tsx)

#### 동일한 레이아웃 적용

로그인 페이지와 동일한 분할 레이아웃 적용:
- 왼쪽: K리그 경기장 이미지 + 브랜딩
- 오른쪽: 회원가입 폼

#### 회원가입 폼 필드

```
1. 이메일
2. 닉네임
3. 비밀번호
4. 비밀번호 확인
5. 회원가입 버튼
```

---

## 🎯 Design Details

### 색상 팔레트

| 요소 | 색상 | 용도 |
|------|------|------|
| Primary | #1e40af (blue-800) | 버튼, 링크, 강조 |
| Primary Dark | #1e3a8a (blue-900) | 배경 그라디언트 |
| Primary Light | #dbeafe (blue-100) | 배경 하이라이트 |
| Gray | #6b7280 | 텍스트, 보조 정보 |
| White | #ffffff | 배경, 폼 |

### 타이포그래피

| 요소 | 스타일 | 크기 |
|------|--------|------|
| FANCLUV Logo | Bold | 3xl (48px) |
| 슬로건 | Light | xl (20px) |
| 페이지 제목 | Bold | 3xl (30px) |
| 페이지 설명 | Regular | base (16px) |
| 라벨 | Semibold | sm (14px) |
| 입력 필드 | Regular | base (16px) |

### 레이아웃 브레이크포인트

| 화면 크기 | 레이아웃 | 이미지 |
|----------|---------|--------|
| Mobile (< 768px) | 단일 컬럼 | 숨김 |
| Tablet (768px - 1024px) | 단일 컬럼 | 숨김 |
| Desktop (> 1024px) | 양쪽 분할 | 표시 |

---

## 🖼️ 이미지 자산

### 배경 이미지

**파일명**: `kleague-stadium-fans.jpg`

**사양:**
- 해상도: 2560x1440px (16:9)
- 크기: ~500KB
- 포맷: WebP (압축), PNG (원본)
- 위치: `/home/ubuntu/webdev-static-assets/`

**URL:**
```
원본: https://d2xsxph8kpxj0f.cloudfront.net/310519663766023039/6feq7sSR5cPzhnk9XQd9fb/kleague-stadium-fans-Z7d4w7toMDXZKfuSChpF9d.png
압축: https://d2xsxph8kpxj0f.cloudfront.net/310519663766023039/6feq7sSR5cPzhnk9XQd9fb/kleague-stadium-fans-jxdcWbreWUGgwVdrXQVX5U.webp
```

**콘텐츠:**
- K리그 경기장 전경
- 열정적인 팬들
- 팀 깃발과 배너
- 밝은 경기장 조명
- 역동적인 분위기

---

## 🔧 기술 구현

### 1. 레이아웃 구조

```tsx
<div className="min-h-screen flex bg-white">
  {/* Left Section */}
  <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
    {/* Background Image */}
    <img src="..." className="absolute inset-0 w-full h-full object-cover opacity-70" />
    
    {/* Overlay Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent"></div>
    
    {/* Content */}
    <div className="relative z-10 flex flex-col justify-between p-12 w-full">
      {/* Logo & Tagline */}
      {/* Features List */}
    </div>
  </div>

  {/* Right Section */}
  <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12">
    <div className="w-full max-w-md">
      {/* Mobile Logo */}
      {/* Form Title */}
      {/* Form */}
      {/* Links */}
    </div>
  </div>
</div>
```

### 2. 이미지 처리

```tsx
<img
  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663766023039/6feq7sSR5cPzhnk9XQd9fb/kleague-stadium-fans-jxdcWbreWUGgwVdrXQVX5U.webp"
  alt="K리그 경기장"
  className="absolute inset-0 w-full h-full object-cover opacity-70"
/>
```

### 3. 반응형 디자인

```tsx
{/* Desktop Only */}
<div className="hidden lg:flex lg:w-1/2">...</div>

{/* Mobile Only */}
<div className="lg:hidden mb-8 text-center">...</div>

{/* Full Width */}
<div className="w-full lg:w-1/2">...</div>
```

### 4. 그라디언트 오버레이

```tsx
<div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent"></div>
```

---

## 📱 반응형 동작

### 데스크톱 (lg: 1024px+)

```
┌──────────────────────────────────────────┐
│ Image (50%) │ Form (50%)                 │
│             │                            │
│ [Hero]      │ Title                      │
│ Logo        │ Email Input                │
│ Features    │ Password Input             │
│             │ Login Button               │
│             │ Sign Up Link               │
└──────────────────────────────────────────┘
```

### 태블릿 (md: 768px - 1023px)

```
┌──────────────────────┐
│ Form (Full Width)    │
│                      │
│ Logo (Mobile)        │
│ Title                │
│ Email Input          │
│ Password Input       │
│ Login Button         │
│ Sign Up Link         │
└──────────────────────┘
```

### 모바일 (< 768px)

```
┌──────────────┐
│ Form (Full)  │
│              │
│ Logo         │
│ Title        │
│ Email Input  │
│ Password     │
│ Login Button │
│ Sign Up Link │
└──────────────┘
```

---

## ✅ 테스트 항목

### 로컬 테스트 (npm run dev)

- [ ] 로그인 페이지 로드
- [ ] 데스크톱에서 양쪽 분할 레이아웃 확인
- [ ] 왼쪽 이미지 표시 확인
- [ ] 오른쪽 폼 표시 확인
- [ ] 모바일에서 이미지 숨김 확인
- [ ] 모바일에서 로고 표시 확인
- [ ] 폼 입력 동작 확인
- [ ] 로그인 버튼 동작 확인
- [ ] 회원가입 링크 동작 확인
- [ ] 홈으로 돌아가기 버튼 동작 확인
- [ ] 회원가입 페이지 동일한 레이아웃 확인
- [ ] 회원가입 폼 동작 확인

### 배포 후 테스트 (https://fancluv.vercel.app)

- [ ] 로그인 페이지 로드
- [ ] 데스크톱 레이아웃 확인
- [ ] 모바일 레이아웃 확인
- [ ] 이미지 로드 확인
- [ ] 폼 동작 확인
- [ ] 링크 동작 확인
- [ ] 회원가입 페이지 확인

### 브라우저 호환성

- [ ] Chrome (최신)
- [ ] Firefox (최신)
- [ ] Safari (최신)
- [ ] Edge (최신)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 🚀 배포 방법

### 1단계: 로컬에서 테스트

```bash
cd ~/fancluv-pages
npm run dev

# 브라우저에서 http://localhost:3000/login 접속
# 데스크톱, 태블릿, 모바일에서 테스트
```

### 2단계: GitHub에 푸시

```bash
cd ~/fancluv-pages

# 변경 사항 확인
git status

# 파일 스테이징
git add pages/login.tsx pages/signup.tsx

# 커밋
git commit -m "Design: 로그인/회원가입 페이지 Redesign

- Split screen 레이아웃 적용 (왼쪽 이미지, 오른쪽 폼)
- K리그 경기장 이미지 배경 추가
- FANCLUV 브랜딩 강화
- 반응형 디자인 개선
- 모바일 최적화"

# GitHub에 푸시
git push origin main
```

### 3단계: Vercel 배포 확인

```
https://vercel.com/dashboard
→ fancluv 프로젝트 선택
→ Deployments 탭 확인
→ 배포 완료 대기 (약 2-5분)
```

### 4단계: 배포된 사이트에서 테스트

```
https://fancluv.vercel.app/login
→ 양쪽 분할 레이아웃 확인
→ 이미지 로드 확인
→ 폼 동작 확인
→ 반응형 디자인 확인
```

---

## 📊 변경 파일 목록

| 파일 | 변경 사항 | 라인 수 |
|------|---------|--------|
| `pages/login.tsx` | Split layout, 이미지 추가, UI 개선 | 230줄 |
| `pages/signup.tsx` | Split layout, 이미지 추가, UI 개선 | 250줄 |

---

## 🎨 디자인 하이라이트

### 1. 비주얼 임팩트

- **K리그 경기장 이미지**: 열정적인 팬들의 분위기 전달
- **그라디언트 오버레이**: 이미지 위에 텍스트 가독성 확보
- **프리미엄 느낌**: 고급스러운 분할 레이아웃

### 2. 사용자 경험

- **명확한 구조**: 왼쪽 이미지, 오른쪽 폼
- **반응형 디자인**: 모든 기기에서 최적화
- **직관적 네비게이션**: 로그인/회원가입/홈 링크

### 3. 브랜딩

- **FANCLUV 로고**: 큰 텍스트로 브랜드 강조
- **슬로건**: "K리그 팬들의 목소리를 모으다"
- **기능 설명**: 아이콘과 함께 주요 기능 소개

---

## 💡 추가 개선 사항

### 향후 개선 가능 항목

1. **애니메이션**
   - 페이지 로드 애니메이션
   - 폼 입력 애니메이션
   - 버튼 호버 효과

2. **다크 모드**
   - 다크 모드 지원
   - 자동 테마 선택

3. **소셜 로그인**
   - Google 로그인
   - Naver 로그인
   - Kakao 로그인

4. **추가 기능**
   - 비밀번호 찾기
   - 이메일 인증
   - 2단계 인증

---

## ✨ 완료!

**로그인/회원가입 페이지 Redesign이 완료되었습니다!**

**변경 파일:**
- ✅ `pages/login.tsx` - Split layout 적용
- ✅ `pages/signup.tsx` - Split layout 적용

**이미지 자산:**
- ✅ `kleague-stadium-fans.jpg` - K리그 경기장 이미지

**다음 단계:**
1. 로컬에서 테스트
2. GitHub에 푸시
3. Vercel 배포 확인
4. 배포된 사이트에서 테스트

---

**FANCLUV MVP - 로그인/회원가입 페이지 Redesign 완료! 🎉**
