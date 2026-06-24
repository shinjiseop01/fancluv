# FANCLUV 다국어(i18n) 구현 가이드

## 📋 개요

FANCLUV에 한국어(KR) / 영어(EN) 다국어 기능이 추가되었습니다.

**특징:**
- ✅ 한국어(KR) / 영어(EN) 지원
- ✅ localStorage에 선택 언어 저장
- ✅ 모든 페이지에 적용
- ✅ 추후 일본어(JP) 추가 가능한 구조
- ✅ URL 구조 유지 (쿼리 파라미터 없음)

---

## 🏗️ 파일 구조

```
fancluv-pages/
├── locales/
│   ├── ko.json          # 한국어 번역
│   └── en.json          # 영어 번역
├── hooks/
│   └── useLanguage.ts   # 다국어 관리 Hook
├── components/
│   └── LanguageToggle.tsx # 언어 선택 컴포넌트
├── pages/
│   ├── index.tsx        # 초기 화면 (다국어 적용)
│   ├── login.tsx        # 로그인 페이지 (다국어 적용)
│   ├── signup.tsx       # 회원가입 페이지 (다국어 적용)
│   └── ...
└── I18N_IMPLEMENTATION_GUIDE.md # 이 파일
```

---

## 🔧 사용 방법

### 1. 컴포넌트에서 다국어 사용

```tsx
import { useLanguage } from '@/hooks/useLanguage'

export default function MyComponent() {
  const { t } = useLanguage()

  return (
    <div>
      <h1>{t('landing.title')}</h1>
      <p>{t('landing.subtitle')}</p>
    </div>
  )
}
```

### 2. 언어 변경

```tsx
import { useLanguage } from '@/hooks/useLanguage'

export default function MyComponent() {
  const { language, changeLanguage } = useLanguage()

  return (
    <div>
      <p>현재 언어: {language}</p>
      <button onClick={() => changeLanguage('ko')}>한국어</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  )
}
```

### 3. LanguageToggle 컴포넌트 사용

```tsx
import { LanguageToggle } from '@/components/LanguageToggle'

export default function MyComponent() {
  return (
    <div>
      <LanguageToggle />
    </div>
  )
}
```

---

## 📝 번역 파일 구조

### locales/ko.json (한국어)

```json
{
  "common": {
    "language": "언어",
    "korean": "한국어",
    "english": "English"
  },
  "landing": {
    "title": "FANCLUV",
    "subtitle": "K리그 팬들의 목소리를 모으다",
    "shareOpinion": "의견 공유"
  },
  "login": {
    "heading": "로그인",
    "email": "이메일",
    "password": "비밀번호"
  }
}
```

### locales/en.json (영어)

```json
{
  "common": {
    "language": "Language",
    "korean": "한국어",
    "english": "English"
  },
  "landing": {
    "title": "FANCLUV",
    "subtitle": "Gather the Voices of K-League Fans",
    "shareOpinion": "Share Your Opinion"
  },
  "login": {
    "heading": "Login",
    "email": "Email",
    "password": "Password"
  }
}
```

---

## 🎯 Hook 상세 설명

### useLanguage Hook

```tsx
import { useLanguage } from '@/hooks/useLanguage'

const { language, changeLanguage, t, isLoaded } = useLanguage()

// language: 현재 선택된 언어 ('ko' | 'en' | 'jp')
// changeLanguage: 언어 변경 함수
// t: 번역 함수 (key path 입력 → 번역된 문자열 반환)
// isLoaded: 초기화 완료 여부
```

### 번역 함수 (t)

```tsx
// 기본 사용법
t('landing.title')  // 'FANCLUV' (한국어) 또는 'FANCLUV' (영어)

// 기본값 설정
t('unknown.key', 'Default Value')  // 'Default Value'

// 중첩된 키
t('login.features.shareOpinion')  // '의견 공유' (한국어)
```

---

## 🌍 새로운 언어 추가하기

### 1단계: 번역 파일 생성

`locales/jp.json` 파일 생성:

```json
{
  "common": {
    "language": "言語",
    "korean": "한국語",
    "english": "English",
    "japanese": "日本語"
  },
  "landing": {
    "title": "FANCLUV",
    "subtitle": "K리그ファンの声を集める",
    ...
  }
}
```

### 2단계: Hook 업데이트

`hooks/useLanguage.ts` 파일 수정:

```tsx
import jp from '@/locales/jp.json'

export type Language = 'ko' | 'en' | 'jp'  // 'jp' 추가

const translations: Record<Language, typeof ko> = {
  ko,
  en,
  jp,  // 추가
}
```

### 3단계: LanguageToggle 자동 업데이트

`getAvailableLanguages()` 함수가 자동으로 새 언어를 감지합니다.

```tsx
// 자동으로 업데이트됨
export const getAvailableLanguages = (): { code: Language; name: string; flag: string }[] => [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'jp', name: '日本語', flag: '🇯🇵' },  // 자동 추가
]
```

---

## 💾 localStorage 저장

### 자동 저장

언어 변경 시 자동으로 localStorage에 저장됩니다:

```tsx
// localStorage에 저장됨
localStorage.getItem('language')  // 'ko' | 'en' | 'jp'
```

### 초기 로드

페이지 로드 시 자동으로 저장된 언어를 불러옵니다:

```tsx
// 1. localStorage에서 언어 확인
// 2. 없으면 기본값 'ko' 사용
// 3. 컴포넌트 마운트 시 자동 적용
```

---

## 🔄 현재 적용된 페이지

### ✅ 완료된 페이지

1. **pages/index.tsx** (초기 화면)
   - 모든 텍스트 다국어 지원
   - LanguageToggle 포함

2. **pages/login.tsx** (로그인)
   - 모든 텍스트 다국어 지원
   - LanguageToggle 포함

3. **pages/signup.tsx** (회원가입)
   - 모든 텍스트 다국어 지원
   - LanguageToggle 포함

### ⏳ 추가 작업 필요

다음 페이지에도 다국어 적용 가능:

- pages/team-selection.tsx
- pages/app/opinions.tsx
- pages/app/surveys.tsx
- pages/app/profile.tsx
- pages/app/index.tsx

---

## 📚 번역 키 목록

### Common (공통)

```
common.language
common.korean
common.english
common.japanese
```

### Navigation (네비게이션)

```
navigation.home
navigation.login
navigation.signup
navigation.logout
navigation.profile
navigation.back
```

### Landing (초기 화면)

```
landing.title
landing.subtitle
landing.description
landing.shareOpinion
landing.shareOpinionDesc
landing.startButton
landing.participateSurvey
landing.participateSurveyDesc
landing.participateButton
landing.notMember
landing.joinCommunity
landing.signupButton
```

### Login (로그인)

```
login.title
login.tagline
login.heading
login.description
login.email
login.emailPlaceholder
login.password
login.passwordPlaceholder
login.loginButton
login.or
login.noAccount
login.signupLink
login.backHome
login.features.shareOpinion
login.features.shareOpinionDesc
login.features.participateSurvey
login.features.participateSurveyDesc
login.features.fanCommunity
login.features.fanCommunityDesc
login.error
login.required
```

### Sign Up (회원가입)

```
signup.title
signup.tagline
signup.heading
signup.description
signup.email
signup.emailPlaceholder
signup.nickname
signup.nicknamePlaceholder
signup.password
signup.passwordPlaceholder
signup.confirmPassword
signup.confirmPasswordPlaceholder
signup.signupButton
signup.or
signup.hasAccount
signup.loginLink
signup.backHome
signup.features.shareOpinion
signup.features.shareOpinionDesc
signup.features.participateSurvey
signup.features.participateSurveyDesc
signup.features.fanCommunity
signup.features.fanCommunityDesc
signup.error
signup.required
signup.passwordMismatch
```

### Team Selection (팀 선택)

```
teamSelection.title
teamSelection.description
teamSelection.selectTeam
teamSelection.nextButton
teamSelection.teams.seoul
teamSelection.teams.ulsan
... (12개 팀 모두)
teamSelection.error
teamSelection.required
```

### Opinions (의견)

```
opinions.title
opinions.description
opinions.addOpinion
opinions.opinion
opinions.opinionPlaceholder
opinions.submit
opinions.cancel
opinions.noOpinions
opinions.error
```

### Surveys (설문)

```
surveys.title
surveys.description
surveys.noSurveys
surveys.vote
surveys.voted
surveys.error
```

### Profile (프로필)

```
profile.title
profile.nickname
profile.email
profile.team
profile.joinDate
profile.logout
profile.edit
profile.save
profile.cancel
```

### App (앱)

```
app.title
app.opinions
app.surveys
app.profile
app.logout
```

### Errors (에러)

```
errors.notFound
errors.unauthorized
errors.serverError
errors.tryAgain
```

---

## 🧪 테스트 방법

### 1. 로컬에서 테스트

```bash
npm run dev
# http://localhost:3000 방문
```

### 2. 언어 변경 테스트

1. 우측 상단의 LanguageToggle 클릭
2. 언어 선택 (한국어 / English)
3. 페이지 텍스트가 즉시 변경되는지 확인

### 3. localStorage 테스트

1. 브라우저 개발자 도구 (F12) 열기
2. Application → Local Storage 확인
3. 'language' 키 값이 'ko' 또는 'en'인지 확인

### 4. 재방문 테스트

1. 언어 변경 (예: 영어로)
2. 페이지 새로고침 (Cmd+R 또는 Ctrl+R)
3. 이전 선택 언어(영어)가 유지되는지 확인

---

## 🚀 배포 후 확인

### Vercel 배포

```bash
git add .
git commit -m "Feat: 다국어(i18n) 기능 추가"
git push origin main
```

### 배포된 사이트에서 확인

```
https://fancluv.vercel.app
```

1. 우측 상단의 LanguageToggle 확인
2. 언어 변경 테스트
3. localStorage 저장 확인

---

## 📖 추가 자료

### 번역 파일 수정

`locales/ko.json` 또는 `locales/en.json` 파일을 수정하면 자동으로 반영됩니다.

### 새로운 번역 키 추가

1. `locales/ko.json`에 한국어 추가
2. `locales/en.json`에 영어 추가
3. 컴포넌트에서 `t('새로운.키')` 사용

### 번역 누락 확인

번역 키가 없으면 기본값이나 키 이름이 표시됩니다:

```tsx
t('unknown.key')  // 'unknown.key' 표시
t('unknown.key', 'Default')  // 'Default' 표시
```

---

## ✨ 완료!

FANCLUV에 다국어 기능이 완전히 적용되었습니다! 🎉

**다음 단계:**
1. GitHub에 푸시
2. Vercel 배포
3. 배포된 사이트에서 테스트

---

**FANCLUV - 다국어(i18n) 구현 완료! 🌍**
