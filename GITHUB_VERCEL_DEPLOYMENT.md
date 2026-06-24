# FANCLUV MVP - GitHub & Vercel 배포 완벽 가이드

이 가이드는 FANCLUV MVP를 GitHub에 올리고 Vercel에 배포하는 단계별 절차를 설명합니다.

---

## 📋 목차

1. [사전 준비](#사전-준비)
2. [로컬 Git 설정](#로컬-git-설정)
3. [GitHub 저장소 생성](#github-저장소-생성)
4. [코드 푸시](#코드-푸시)
5. [Vercel 배포](#vercel-배포)
6. [배포 후 검증](#배포-후-검증)
7. [문제 해결](#문제-해결)

---

## 사전 준비

### 필수 설치 항목

1. **Git** 설치 확인
```bash
git --version
# git version 2.x.x 이상
```

2. **Node.js** 설치 확인
```bash
node --version
npm --version
# Node.js 18.17 이상, npm 9.x 이상
```

3. **GitHub 계정** 생성
   - https://github.com 방문
   - 회원가입 또는 로그인

4. **Vercel 계정** 생성
   - https://vercel.com 방문
   - GitHub 계정으로 로그인

### 프로젝트 준비

```bash
# 프로젝트 디렉토리로 이동
cd /home/ubuntu/fancluv-pages

# 프로덕션 빌드 테스트
npm run build

# 빌드 성공 확인
npm start
# http://localhost:3000 에서 정상 작동 확인
```

---

## 로컬 Git 설정

### 1단계: Git 초기화

```bash
cd /home/ubuntu/fancluv-pages

# Git 저장소 초기화
git init

# Git 사용자 정보 설정 (처음 사용하는 경우)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 전역 설정 (모든 저장소에 적용)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2단계: 파일 추가 및 커밋

```bash
# 모든 파일 스테이징
git add .

# 커밋
git commit -m "Initial commit: FANCLUV MVP - K리그 팬 의견 수집 플랫폼"

# 커밋 확인
git log --oneline
# 출력: abc1234 Initial commit: FANCLUV MVP - K리그 팬 의견 수집 플랫폼
```

### 3단계: 브랜치 이름 변경 (선택사항)

```bash
# main 브랜치로 변경
git branch -M main

# 현재 브랜치 확인
git branch
# 출력: * main
```

---

## GitHub 저장소 생성

### 1단계: GitHub에서 저장소 생성

1. https://github.com/new 방문
2. 저장소 정보 입력:
   - **Repository name**: `fancluv` (또는 원하는 이름)
   - **Description**: `FANCLUV MVP - K리그 팬 의견 수집 플랫폼`
   - **Visibility**: `Public` (또는 `Private`)
   - **Initialize this repository with**: 체크 해제 (로컬에서 이미 초기화)
3. **Create repository** 클릭

### 2단계: 저장소 URL 확인

생성된 저장소 페이지에서:
- HTTPS URL: `https://github.com/your-username/fancluv.git`
- SSH URL: `git@github.com:your-username/fancluv.git`

---

## 코드 푸시

### 1단계: 원격 저장소 추가

```bash
cd /home/ubuntu/fancluv-pages

# HTTPS 방식 (권장)
git remote add origin https://github.com/your-username/fancluv.git

# 또는 SSH 방식 (SSH 키 설정 필요)
# git remote add origin git@github.com:your-username/fancluv.git

# 원격 저장소 확인
git remote -v
# 출력:
# origin  https://github.com/your-username/fancluv.git (fetch)
# origin  https://github.com/your-username/fancluv.git (push)
```

### 2단계: 코드 푸시

```bash
# main 브랜치로 푸시
git push -u origin main

# 또는 (처음 푸시하는 경우)
git push --set-upstream origin main

# 푸시 완료 확인
git branch -vv
# 출력: * main abc1234 [origin/main] Initial commit: FANCLUV MVP
```

### 3단계: GitHub 확인

1. https://github.com/your-username/fancluv 방문
2. 파일 목록 확인
3. 커밋 히스토리 확인

---

## Vercel 배포

### 1단계: Vercel 로그인

1. https://vercel.com/login 방문
2. GitHub 계정으로 로그인 (또는 이메일)

### 2단계: 프로젝트 Import

1. Vercel 대시보드 방문: https://vercel.com/dashboard
2. **Add New...** 클릭 → **Project** 선택
3. **Import Git Repository** 섹션에서:
   - GitHub 저장소 검색: `fancluv`
   - 저장소 선택
   - **Import** 클릭

### 3단계: 배포 설정

**Project Name**
- 기본값: `fancluv` (변경 가능)

**Framework Preset**
- 자동 감지: `Next.js`

**Root Directory**
- 기본값: `./` (변경 불필요)

**Environment Variables** (선택사항)
- 현재는 Mock 데이터 사용하므로 불필요
- Supabase 연동 시 추가:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  ```

### 4단계: 배포 실행

1. **Deploy** 클릭
2. 배포 진행 상황 확인 (약 2-5분)
3. 배포 완료 메시지 확인

### 5단계: 배포 URL 확인

배포 완료 후:
- **Deployment URL**: `https://fancluv-xxx.vercel.app`
- 또는 **Domains**: `https://your-custom-domain.com` (커스텀 도메인 설정 시)

---

## 배포 후 검증

### 1단계: 기본 페이지 확인

```
배포 URL: https://fancluv-xxx.vercel.app
```

각 페이지 접근 확인:

| 페이지 | URL | 확인 사항 |
|--------|-----|----------|
| 랜딩 | `/` | 제목, 설명, CTA 버튼 |
| 회원가입 | `/signup` | 입력 폼, 제출 버튼 |
| 로그인 | `/login` | 입력 폼, 제출 버튼 |
| 팀 선택 | `/team-selection` | 12개 팀 목록 |
| 구단 | `/app` | 의견 피드, 작성 버튼 |
| 의견 작성 | `/opinion/create` | 입력 폼 |
| 설문 | `/survey` | 설문 문항 |
| 프로필 | `/profile` | 사용자 정보 |

### 2단계: 사용자 플로우 테스트

1. **회원가입 → 로그인 → 팀 선택 → 의견 작성 → 설문 응답**
2. 각 단계에서 데이터 저장 확인 (Mock 데이터 사용)
3. 오류 메시지 없음 확인

### 3단계: 반응형 디자인 확인

**데스크톱 (1920x1080)**
- 모든 요소 정상 표시
- 텍스트 가독성 확인

**태블릿 (768x1024)**
- 레이아웃 재정렬 확인
- 버튼 크기 적절 확인

**모바일 (375x667)**
- 모든 요소 축소 표시
- 터치 버튼 크기 적절 확인
- 스크롤 정상 작동

**브라우저 개발자 도구에서 확인:**
```
F12 → Device Toolbar (Ctrl+Shift+M) → 다양한 기기 선택
```

### 4단계: 성능 확인

Vercel 대시보드에서:
1. 프로젝트 선택
2. **Analytics** 탭 확인
3. 페이지 로드 시간 확인
4. 방문자 수 확인

---

## 문제 해결

### 문제 1: 배포 후 "404 Not Found" 오류

**원인**: 페이지를 찾을 수 없음

**해결책**:
1. URL 확인 (오타 없음)
2. 페이지 파일이 `pages/` 디렉토리에 있는지 확인
3. Vercel 대시보드에서 Redeploy 클릭
4. 빌드 로그 확인

```bash
# 로컬에서 빌드 테스트
npm run build
npm start
```

### 문제 2: 빌드 실패

**원인**: 코드 오류, 의존성 문제

**해결책**:
1. Vercel 대시보드에서 빌드 로그 확인
2. 오류 메시지 읽기
3. 로컬에서 같은 오류 재현
4. 코드 수정 후 푸시

```bash
# 로컬에서 빌드 테스트
npm run build

# 오류 확인 및 수정
npm install  # 의존성 재설치
npm run build
```

### 문제 3: 환경 변수 오류

**원인**: 환경 변수 누락 또는 잘못된 값

**해결책**:
1. Vercel 대시보드 → Settings → Environment Variables 확인
2. 필요한 변수 추가
3. Redeploy 클릭

```bash
# .env.example 확인
cat .env.example

# Vercel에 추가할 변수 확인
```

### 문제 4: 느린 로딩 속도

**원인**: 이미지 최적화 부족, 번들 크기 증가

**해결책**:
1. 이미지 최적화 (Next.js Image 컴포넌트 사용)
2. 번들 크기 분석
3. 불필요한 의존성 제거

```bash
# 번들 크기 분석
npm install --save-dev @next/bundle-analyzer

# next.config.js에 추가
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})

# 분석 실행
ANALYZE=true npm run build
```

### 문제 5: 모바일에서 화면 깨짐

**원인**: 반응형 CSS 문제

**해결책**:
1. 로컬에서 반응형 테스트
2. Tailwind CSS 클래스 확인
3. 미디어 쿼리 수정

```bash
# 로컬에서 개발
npm run dev

# 브라우저 개발자 도구 (F12)
# Device Toolbar 클릭 (Ctrl+Shift+M)
# 다양한 기기 선택하여 테스트
```

---

## 🔄 지속적 배포 (CI/CD)

### GitHub 푸시 시 자동 배포

Vercel은 GitHub 저장소와 자동으로 연동됩니다:

1. **코드 푸시**
```bash
git add .
git commit -m "Fix: 오류 수정"
git push origin main
```

2. **자동 배포**
   - Vercel이 GitHub 푸시 감지
   - 자동으로 빌드 및 배포
   - 배포 완료 후 GitHub에 상태 표시

3. **배포 상태 확인**
   - Vercel 대시보드: https://vercel.com/dashboard
   - GitHub 저장소: Commits 탭에서 배포 상태 확인

---

## 📊 배포 후 모니터링

### Vercel 대시보드

1. **Deployments**: 배포 이력 확인
2. **Analytics**: 방문자 수, 성능 지표
3. **Logs**: 에러 로그, 요청 로그
4. **Settings**: 환경 변수, 도메인 설정

### 커스텀 도메인 설정 (선택사항)

1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **Domains**
3. **Add Domain** 클릭
4. 도메인 입력
5. DNS 설정 완료

---

## 📝 유용한 명령어

### Git 명령어

```bash
# 상태 확인
git status

# 변경 사항 확인
git diff

# 커밋 히스토리 확인
git log --oneline

# 마지막 커밋 수정
git commit --amend

# 커밋 취소
git revert HEAD

# 브랜치 생성
git branch feature/new-feature

# 브랜치 전환
git checkout feature/new-feature

# 브랜치 병합
git merge feature/new-feature

# 원격 저장소 업데이트
git pull origin main

# 강제 푸시 (주의!)
git push -f origin main
```

### Vercel CLI 명령어 (선택사항)

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod

# 로그 확인
vercel logs

# 환경 변수 관리
vercel env
```

---

## ✅ 최종 체크리스트

배포 전 확인:

- [ ] 로컬에서 `npm run build` 성공
- [ ] 로컬에서 `npm start` 정상 작동
- [ ] 모든 페이지 접근 가능
- [ ] 모바일 반응형 확인
- [ ] API 응답 정상
- [ ] Git 커밋 완료
- [ ] GitHub 저장소에 푸시 완료

배포 후 확인:

- [ ] Vercel 배포 완료
- [ ] 배포 URL 접근 가능
- [ ] 모든 페이지 정상 표시
- [ ] 사용자 플로우 테스트 완료
- [ ] 모바일/데스크톱 반응형 확인
- [ ] 오류 로그 없음

---

## 🎯 다음 단계

### 즉시 가능

- ✅ Vercel 배포 완료
- ✅ Mock 데이터로 팬 의견 수집 시작
- ✅ 사용자 피드백 수집

### 1주일 내

- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 스키마 설정
- [ ] 실제 데이터 저장 시작

### 1개월 내

- [ ] 첫 100개 의견 수집
- [ ] 사용자 피드백 분석
- [ ] 기능 개선

### 3개월 내

- [ ] 첫 1,000개 의견 수집
- [ ] 구단별 의견 분석
- [ ] 관리자 대시보드 추가

---

## 📞 지원

문제 발생 시:

1. **GitHub Issues**: https://github.com/your-username/fancluv/issues
2. **Vercel 문서**: https://vercel.com/docs
3. **Next.js 문서**: https://nextjs.org/docs

---

**FANCLUV MVP - GitHub & Vercel 배포 완벽 가이드**

**최종 업데이트**: 2026년 6월 18일
