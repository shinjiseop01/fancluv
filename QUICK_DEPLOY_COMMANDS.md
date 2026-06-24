# FANCLUV MVP - 빠른 배포 명령어 가이드

이 문서는 **로컬 컴퓨터**에서 실행할 명령어를 제공합니다.

---

## 📋 사전 준비

### 필수 설치

```bash
# Git 설치 확인
git --version

# Node.js 설치 확인
node --version
npm --version
```

### 필수 계정

- GitHub 계정: https://github.com
- Vercel 계정: https://vercel.com (GitHub로 로그인)

---

## 🚀 배포 명령어 (로컬 컴퓨터에서 실행)

### 1단계: GitHub 저장소 생성 (웹사이트에서)

```
1. https://github.com/new 방문
2. Repository name: fancluv
3. Description: FANCLUV MVP - K리그 팬 의견 수집 플랫폼
4. Visibility: Public
5. Initialize this repository with: 체크 해제 ✓
6. Create repository 클릭
7. 저장소 URL 복사 (예: https://github.com/your-username/fancluv.git)
```

### 2단계: 로컬에서 코드 준비 및 푸시

**옵션 A: 샌드박스에서 다운로드한 코드가 있는 경우**

```bash
# 1. 프로젝트 디렉토리로 이동
cd /path/to/fancluv-pages

# 2. 원격 저장소 추가
git remote add origin https://github.com/your-username/fancluv.git

# 3. 브랜치 이름 확인
git branch
# 출력: * main (또는 master)

# 4. 브랜치 이름이 master인 경우 main으로 변경
git branch -M main

# 5. 코드 푸시
git push -u origin main

# 6. 푸시 완인
git branch -vv
# 출력: * main abc1234 [origin/main] Initial commit...
```

**옵션 B: 빈 GitHub 저장소에 클론 후 코드 추가**

```bash
# 1. 빈 저장소 클론
git clone https://github.com/your-username/fancluv.git
cd fancluv

# 2. 프로젝트 파일 복사 (샌드박스에서 다운로드한 파일들)
# → 모든 파일을 이 디렉토리에 복사

# 3. Git 설정
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 4. 파일 추가 및 커밋
git add .
git commit -m "Initial commit: FANCLUV MVP"

# 5. 코드 푸시
git push origin main
```

### 3단계: GitHub에서 확인

```bash
# 브라우저에서 확인
https://github.com/your-username/fancluv

# 확인 사항:
# ✓ pages/ 디렉토리
# ✓ components/ 디렉토리
# ✓ package.json
# ✓ README.md
# ✓ next.config.js
```

### 4단계: Vercel에서 배포 (웹사이트에서)

```
1. https://vercel.com/login 방문
2. GitHub 계정으로 로그인
3. Vercel 대시보드 → Add New... → Project
4. Import Git Repository 섹션:
   - 검색: fancluv
   - 저장소 선택
   - Import 클릭
5. 배포 설정:
   - Project Name: fancluv
   - Framework Preset: Next.js (자동 감지)
   - Root Directory: ./
   - Environment Variables: 추가 안 함
   - Deploy 클릭
6. 배포 진행 상황 확인 (약 2-5분)
7. 배포 완료 메시지 확인
```

### 5단계: 배포 URL 확인

```
✅ Deployment successful!
🎉 https://fancluv-xxx.vercel.app
```

---

## 📝 상세 명령어 설명

### Git 초기 설정 (처음 Git 사용하는 경우)

```bash
# 전역 사용자 설정
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 설정 확인
git config --global --list
```

### 저장소 URL 확인

```bash
# 현재 원격 저장소 확인
git remote -v

# 출력 예:
# origin  https://github.com/your-username/fancluv.git (fetch)
# origin  https://github.com/your-username/fancluv.git (push)
```

### 브랜치 관리

```bash
# 현재 브랜치 확인
git branch

# 모든 브랜치 확인
git branch -a

# 브랜치 이름 변경 (master → main)
git branch -M main

# 원격 브랜치 추적 확인
git branch -vv
```

### 코드 변경 및 푸시

```bash
# 변경 사항 확인
git status

# 모든 파일 스테이징
git add .

# 특정 파일만 스테이징
git add path/to/file

# 커밋
git commit -m "커밋 메시지"

# 푸시
git push origin main

# 강제 푸시 (주의!)
git push -f origin main
```

### 커밋 히스토리 확인

```bash
# 간단한 로그
git log --oneline

# 상세 로그
git log --oneline -n 10

# 그래프 형식
git log --oneline --graph --all
```

---

## 🔄 배포 후 코드 업데이트

### 로컬에서 코드 수정 후 재배포

```bash
# 1. 코드 수정 (예: pages/index.tsx)

# 2. 변경 사항 확인
git status

# 3. 변경 사항 스테이징
git add .

# 4. 커밋
git commit -m "Fix: 오류 수정"

# 5. GitHub에 푸시
git push origin main

# 6. Vercel이 자동으로 감지하여 배포
# → Vercel 대시보드에서 배포 진행 상황 확인
```

### 배포 자동화 확인

```bash
# Vercel 대시보드에서 확인
https://vercel.com/dashboard

# 확인 사항:
# ✓ 최신 배포 상태
# ✓ 배포 진행 상황
# ✓ 에러 로그 (있는 경우)
```

---

## 🐛 문제 해결 명령어

### 빌드 오류 해결

```bash
# 1. 로컬에서 빌드 테스트
npm run build

# 2. 오류 메시지 확인
# → 오류가 있으면 수정

# 3. 프로덕션 서버 테스트
npm start

# 4. http://localhost:3000 에서 확인

# 5. 캐시 삭제 후 재빌드
rm -rf .next
npm run build
```

### 의존성 문제 해결

```bash
# 1. 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 2. 빌드 테스트
npm run build

# 3. 개발 서버 테스트
npm run dev
```

### Git 문제 해결

```bash
# 1. 현재 상태 확인
git status

# 2. 변경 사항 확인
git diff

# 3. 스테이징 취소
git reset HEAD file-name

# 4. 마지막 커밋 수정
git commit --amend

# 5. 마지막 커밋 취소
git revert HEAD

# 6. 강제 푸시 (주의!)
git push -f origin main
```

---

## 📊 배포 상태 확인

### Vercel 대시보드 확인

```
1. https://vercel.com/dashboard 방문
2. 프로젝트 'fancluv' 선택
3. 다음 정보 확인:
   - Deployments: 배포 이력
   - Analytics: 트래픽 통계
   - Logs: 에러 로그
   - Settings: 환경 변수, 도메인
```

### 배포 URL 확인

```bash
# 배포된 사이트 접근
https://fancluv-xxx.vercel.app

# 또는 커스텀 도메인
https://your-custom-domain.com
```

---

## 📝 유용한 Git 명령어 모음

```bash
# 상태 확인
git status

# 변경 사항 확인
git diff

# 스테이징
git add .
git add path/to/file

# 커밋
git commit -m "메시지"

# 푸시
git push origin main

# 풀
git pull origin main

# 로그 확인
git log --oneline

# 브랜치 확인
git branch -a

# 브랜치 생성
git branch feature/new-feature

# 브랜치 전환
git checkout feature/new-feature

# 브랜치 병합
git merge feature/new-feature

# 브랜치 삭제
git branch -d feature/new-feature

# 원격 저장소 확인
git remote -v

# 원격 저장소 추가
git remote add origin https://github.com/user/repo.git

# 원격 저장소 제거
git remote remove origin

# 마지막 커밋 수정
git commit --amend

# 커밋 취소
git revert HEAD

# 변경 사항 취소
git checkout -- path/to/file

# 스테이징 취소
git reset HEAD path/to/file
```

---

## ✅ 배포 체크리스트

### 배포 전

- [ ] GitHub 계정 생성
- [ ] Vercel 계정 생성
- [ ] Git 설치 확인
- [ ] Node.js 설치 확인
- [ ] 로컬에서 `npm run build` 성공
- [ ] 로컬에서 `npm start` 정상 작동

### 배포 중

- [ ] GitHub 저장소 생성
- [ ] 로컬에서 코드 푸시
- [ ] GitHub에서 파일 확인
- [ ] Vercel에서 배포 시작
- [ ] 배포 진행 상황 확인

### 배포 후

- [ ] 배포 URL 확인
- [ ] 기본 페이지 접근 확인
- [ ] 모든 페이지 정상 표시
- [ ] 사용자 플로우 테스트
- [ ] 반응형 디자인 확인
- [ ] 성능 모니터링

---

## 📞 도움말

### 자주 묻는 질문

**Q: GitHub 저장소를 생성했는데 코드를 어떻게 올리나요?**
A: 위의 "2단계: 로컬에서 코드 준비 및 푸시"를 따르세요.

**Q: Vercel 배포가 실패했어요.**
A: Vercel 대시보드에서 빌드 로그를 확인하고, 로컬에서 `npm run build`를 테스트하세요.

**Q: 코드를 수정한 후 배포하려면 어떻게 하나요?**
A: 위의 "배포 후 코드 업데이트"를 따르세요.

**Q: 배포된 사이트 URL은 어디서 확인하나요?**
A: Vercel 대시보드에서 프로젝트를 선택하면 배포 URL을 확인할 수 있습니다.

### 추가 도움

- GitHub 문서: https://docs.github.com
- Vercel 문서: https://vercel.com/docs
- Next.js 문서: https://nextjs.org/docs

---

**FANCLUV MVP - 빠른 배포 명령어 가이드**

**상태**: ✅ 배포 준비 완료

**예상 소요 시간**: 약 15-20분

**다음 단계**:
1. GitHub 저장소 생성
2. 로컬에서 코드 푸시
3. Vercel에서 배포

---

**배포 성공을 기원합니다! 🚀**
