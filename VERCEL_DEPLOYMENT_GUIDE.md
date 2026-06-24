# FANCLUV MVP - Vercel 배포 가이드

**목표:** FANCLUV Mock MVP를 Vercel에 배포하여 첫 1,000개의 K리그 팬 의견 수집 시작

---

## 🚀 배포 전 체크리스트

- [ ] 로컬에서 `npm run dev` 정상 작동 확인

- [ ] 모든 페이지 접근 가능 확인

- [ ] 사용자 플로우 테스트 완료

- [ ] 반응형 레이아웃 확인

- [ ] Git 커밋 완료 (선택사항)

---

## 📋 배포 단계

### 1단계: Vercel 계정 생성 (처음 배포하는 경우)

1. [https://vercel.com](https://vercel.com) 방문

1. GitHub, GitLab, Bitbucket 계정으로 로그인

1. 또는 이메일로 회원가입

### 2단계: Vercel CLI 설치

```bash
npm i -g vercel
```

또는 yarn 사용 중인 경우:

```bash
yarn global add vercel
```

### 3단계: 프로젝트 디렉토리에서 배포

```bash
cd /home/ubuntu/fancluv-pages
vercel
```

### 4단계: 배포 설정 확인

배포 중 다음 질문에 답변:

```
? Set up and deploy "~/fancluv-pages"? [Y/n] Y
? Which scope do you want to deploy to? (your-username )
? Link to existing project? [y/N] N
? What's your project's name? fancluv
? In which directory is your code located? ./
? Want to modify these settings before proceeding? [y/N] N
```

### 5단계: 배포 완료

Vercel이 자동으로:

1. 프로젝트 빌드

1. 배포 실행

1. 배포 URL 제공

**배포 URL 예:**

```
https://fancluv.vercel.app
```

---

## 🔧 배포 후 설정

### 환경 변수 설정 (선택사항 )

**현재 상태 (Mock):**

- 환경 변수 불필요

- 모든 데이터 Mock fallback으로 제공

**Supabase 연동 시:**

1. Vercel 대시보드 → 프로젝트 선택

1. Settings → Environment Variables

1. 다음 변수 추가:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

1. Redeploy 클릭

### 커스텀 도메인 설정 (선택사항)

1. Vercel 대시보드 → Settings → Domains

1. Add Domain 클릭

1. 도메인 입력

1. DNS 설정 완료

---

## ✅ 배포 후 검증

배포 후 다음을 확인하세요:

### 1. 기본 페이지 접근

```
https://your-domain.vercel.app/
```

- Landing 페이지 정상 표시 확인

### 2. 회원가입 페이지

```
https://your-domain.vercel.app/signup
```

- 회원가입 폼 표시 확인

### 3. 로그인 페이지

```
https://your-domain.vercel.app/login
```

- 로그인 폼 표시 확인

### 4. 팀 선택 페이지

```
https://your-domain.vercel.app/team-selection
```

- 12개 팀 목록 표시 확인

### 5. 구단 페이지

```
https://your-domain.vercel.app/app
```

- 의견 피드 표시 확인

- 의견 작성 CTA 버튼 확인

### 6. 모바일 확인

- 브라우저 개발자 도구 (F12 )

- Device Toolbar 클릭

- iPhone 또는 Android 선택

- 모든 페이지 반응형 확인

---

## 🔄 배포 후 업데이트

### 코드 변경 후 배포

**GitHub 연동 사용 (권장):**

1. GitHub에 코드 푸시

1. Vercel이 자동으로 감지

1. 자동 배포

**CLI로 수동 배포:**

```bash
cd /home/ubuntu/fancluv-pages
vercel --prod
```

---

## 🐛 배포 문제 해결

### 문제 1: 배포 후 "404 Not Found"

**원인:** 페이지가 정적 생성되지 않음**해결책:** 이미 해결됨 (`output: 'standalone'` 설정)

### 문제 2: API 응답 없음

**원인:** 환경 변수 누락**해결책:**

1. Vercel 대시보드 확인

1. 환경 변수 설정 확인

1. Redeploy 클릭

### 문제 3: 모바일에서 화면 깨짐

**원인:** 반응형 CSS 문제**해결책:**

1. 로컬에서 `npm run dev` 실행

1. 브라우저 개발자 도구에서 반응형 테스트

1. CSS 수정 후 재배포

### 문제 4: 느린 로딩 속도

**원인:** 개발 모드 서버 사용**해결책:** 정상 (Mock MVP 상태)**개선:** Supabase 연동 후 개선됨

---

## 📊 배포 모니터링

### Vercel 대시보드 확인

1. [https://vercel.com/dashboard](https://vercel.com/dashboard) 방문

1. 프로젝트 선택

1. 다음 항목 확인:
  - **Deployments:** 배포 이력
  - **Analytics:** 방문자 수, 성능
  - **Logs:** 에러 로그
  - **Settings:** 환경 변수, 도메인

### 성능 모니터링

Vercel Analytics 확인:

- 페이지 로드 시간

- 방문자 수

- 지역별 트래픽

---

## 🎯 배포 후 다음 단계

### 즉시 가능

- ✅ Mock 데이터로 팬 의견 수집 시작

- ✅ 사용자 피드백 수집

- ✅ UI/UX 개선

### 1주일 내

- [ ] Supabase 프로젝트 생성

- [ ] 실제 데이터베이스 연동

- [ ] 사용자 데이터 저장 시작

### 1개월 내

- [ ] 첫 100개 의견 수집

- [ ] 사용자 피드백 분석

- [ ] 기능 개선

### 3개월 내

- [ ] 첫 1,000개 의견 수집

- [ ] 구단별 의견 분석

- [ ] 관리자 대시보드 추가

---

## 💡 팁

### 1. 배포 전 최종 테스트

```bash
npm run dev
# 모든 페이지 확인
```

### 2. 배포 후 공유

```
배포 URL을 팬들과 공유하여 의견 수집 시작
```

### 3. 성능 최적화

- 이미지 최적화 (추후 )

- 캐싱 설정 (추후)

- CDN 활용 (자동)

### 4. 보안

- HTTPS 자동 적용 ✅

- 환경 변수 보호 ✅

- DDoS 방어 (Vercel 제공) ✅

---

## 📞 지원

### Vercel 문서

- [https://vercel.com/docs](https://vercel.com/docs)

### 일반적인 오류

- [https://vercel.com/docs/errors](https://vercel.com/docs/errors)

### 커뮤니티

- [https://github.com/vercel/next.js/discussions](https://github.com/vercel/next.js/discussions)

---

## ✅ 최종 확인

배포 전 마지막 체크:

- [ ] `npm run dev` 정상 작동

- [ ] 모든 페이지 접근 가능

- [ ] 모바일 반응형 확인

- [ ] API 응답 정상

- [ ] Mock 데이터 표시

- [ ] 사용자 플로우 테스트 완료

**모두 확인되었다면 배포 준비 완료!** 🚀

---

**FANCLUV MVP 배포 가이드****작성일:** 2026년 6월 18일**상태:** 배포 준비 완료 ✅

