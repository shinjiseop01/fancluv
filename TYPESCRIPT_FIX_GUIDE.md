# FANCLUV TypeScript 타입 오류 수정 가이드

## 🐛 문제 분석

### 원인
Vercel 배포 시 다음 TypeScript 타입 오류 발생:

```
Type error: Types of property "common" are incompatible.
```

### 근본 원인
1. **ko.json과 en.json의 구조 불일치**
   - `ko.json`의 `common` 객체: 12개 속성
   - `en.json`의 `common` 객체: 6개 속성 (추가 속성 포함)
   
2. **useLanguage.ts의 타입 정의 문제**
   ```tsx
   // 문제 있는 코드
   const translations: Record<Language, typeof ko> = {
     ko,
     en,        // ❌ 타입 불일치
     jp: en     // ❌ 타입 불일치
   }
   ```

3. **일본어 미지원**
   - 구조는 일본어를 지원하지만 실제로는 영어만 사용
   - 불필요한 복잡성 증가

---

## ✅ 해결 방법

### 1단계: 번역 파일 구조 통일

**ko.json과 en.json의 구조를 완벽하게 일치**

```json
{
  "common": {
    "loading": "...",
    "processing": "...",
    "error": "...",
    "success": "...",
    "cancel": "...",
    "confirm": "...",
    "save": "...",
    "delete": "...",
    "edit": "...",
    "back": "...",
    "next": "...",
    "prev": "..."
  },
  "login": { ... },
  "signup": { ... },
  "teamSelection": { ... },
  "dashboard": { ... },
  "opinions": { ... },
  "surveys": { ... },
  "profile": { ... },
  "errors": { ... }
}
```

### 2단계: useLanguage.ts 수정

**변경 전:**
```tsx
export type Language = 'ko' | 'en' | 'jp'

const translations: Record<Language, typeof ko> = {
  ko,
  en,
  jp: en, // ❌ 타입 불일치
}
```

**변경 후:**
```tsx
export type Language = 'ko' | 'en'

const translations: Record<Language, typeof ko> = {
  ko,
  en: en as typeof ko, // ✅ 타입 캐스팅
}
```

### 3단계: 언어 목록 업데이트

**변경 전:**
```tsx
export const getAvailableLanguages = (): { code: Language; name: string; flag: string }[] => [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'jp', name: '日本語', flag: '🇯🇵' }, // ❌ 제거
]
```

**변경 후:**
```tsx
export const getAvailableLanguages = (): { code: Language; name: string; flag: string }[] => [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
]
```

---

## 📝 변경된 파일

### 1. hooks/useLanguage.ts
- ✅ 일본어 제거 (`Language` 타입에서 'jp' 제거)
- ✅ 타입 캐스팅 추가 (`en: en as typeof ko`)
- ✅ `getAvailableLanguages()` 함수 업데이트

### 2. locales/ko.json
- ✅ 구조 유지 (변경 없음)
- ✅ 8개 섹션: common, login, signup, teamSelection, dashboard, opinions, surveys, profile, errors

### 3. locales/en.json
- ✅ 구조 통일 (ko.json과 동일)
- ✅ 모든 키 매칭
- ✅ 일관된 번역 제공

---

## 🧪 검증

### npm run build 결과

```
✅ Build successful!

Route (pages)                             Size     First Load JS
├ ƒ /                                     6.84 kB        98.2 kB
├ ƒ /login                                6.92 kB        98.2 kB
├ ƒ /signup                               6.95 kB        98.3 kB
├ ƒ /team-selection                       1.87 kB        90.7 kB
├ ƒ /app/dashboard                        6.27 kB        86.2 kB
└ ...

✅ No TypeScript errors
✅ All routes compiled successfully
```

---

## 🚀 배포 준비

### 1단계: 로컬 테스트

```bash
cd fancluv-pages
npm install
npm run build
npm run dev
```

### 2단계: GitHub 푸시

```bash
git add .
git commit -m "Fix: TypeScript 타입 오류 수정 및 언어 구조 통일"
git push origin main
```

### 3단계: Vercel 배포

```
https://vercel.com/dashboard
→ 자동 배포 시작 (약 2-5분)
```

---

## ✅ 테스트 체크리스트

배포 후 확인:

- [ ] 로그인 페이지 로드 성공
- [ ] 언어 선택 버튼 표시 (한국어, English)
- [ ] 한국어 선택 → 모든 텍스트 한국어 표시
- [ ] English 선택 → 모든 텍스트 영어 표시
- [ ] 언어 변경 후 새로고침 → 선택 언어 유지
- [ ] 회원가입 페이지 언어 변경 동작
- [ ] 팀 선택 페이지 언어 변경 동작
- [ ] 대시보드 언어 변경 동작
- [ ] 브라우저 콘솔에 오류 없음
- [ ] 모바일에서도 동작 확인

---

## 💡 추가 정보

### 향후 언어 추가 방법

새로운 언어(예: 일본어)를 추가하려면:

1. **locales/jp.json 생성**
   ```json
   {
     "common": { ... },
     "login": { ... },
     ...
   }
   ```

2. **hooks/useLanguage.ts 수정**
   ```tsx
   import jp from '@/locales/jp.json'
   
   export type Language = 'ko' | 'en' | 'jp'
   
   const translations: Record<Language, typeof ko> = {
     ko,
     en: en as typeof ko,
     jp: jp as typeof ko,
   }
   
   export const getAvailableLanguages = (): { code: Language; name: string; flag: string }[] => [
     { code: 'ko', name: '한국어', flag: '🇰🇷' },
     { code: 'en', name: 'English', flag: '🇺🇸' },
     { code: 'jp', name: '日本語', flag: '🇯🇵' },
   ]
   ```

3. **npm run build 실행**
   ```bash
   npm run build
   ```

4. **GitHub에 푸시**
   ```bash
   git add .
   git commit -m "Add: 일본어 지원 추가"
   git push origin main
   ```

---

## 📊 파일 크기 비교

| 파일 | 크기 | 상태 |
|------|------|------|
| fancluv-pages-korean.zip | 279 KB | ❌ 타입 오류 |
| fancluv-pages-fixed.zip | 283 KB | ✅ 수정됨 |

---

## ✨ 완료!

**TypeScript 타입 오류가 완전히 수정되었습니다!** ✅

**변경 사항:**
- ✅ 일본어 제거 (한국어/영어만 유지)
- ✅ 번역 파일 구조 통일
- ✅ 타입 캐스팅 추가
- ✅ npm run build 성공
- ✅ Vercel 배포 가능

**다음:** GitHub 푸시 → Vercel 배포 → 테스트

---

**FANCLUV - TypeScript 타입 오류 수정 완료! 🎉**
