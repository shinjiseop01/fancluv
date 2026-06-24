# FANCLUV MVP - GitHub 코드 푸시 가이드

**GitHub 저장소**: https://github.com/shinjiseop01/fancluv

---

## 📋 현재 상태

✅ **로컬 Git 저장소**: 준비 완료
- 브랜치: `main`
- 커밋: 3개
- 파일: 61개

✅ **GitHub 저장소**: 생성 완료
- URL: https://github.com/shinjiseop01/fancluv
- 초기 파일: README.md, .gitignore, LICENSE

⏳ **다음 단계**: 로컬 코드를 GitHub에 푸시

---

## 🚀 코드 푸시 단계 (로컬 컴퓨터에서 실행)

### 1단계: 원격 저장소 추가

로컬 컴퓨터의 터미널에서 다음 명령어 실행:

```bash
# 프로젝트 디렉토리로 이동
cd /path/to/fancluv-pages

# 원격 저장소 추가
git remote add origin https://github.com/shinjiseop01/fancluv.git

# 원격 저장소 확인
git remote -v
# 출력:
# origin  https://github.com/shinjiseop01/fancluv.git (fetch)
# origin  https://github.com/shinjiseop01/fancluv.git (push)
```

### 2단계: 브랜치 이름 확인

```bash
# 현재 브랜치 확인
git branch

# 출력 예:
# * main

# 또는 master인 경우 main으로 변경
git branch -M main
```

### 3단계: 코드 푸시

```bash
# 코드 푸시
git push -u origin main

# 또는 (처음 푸시하는 경우)
git push --set-upstream origin main
```

**첫 푸시 시 GitHub 인증 필요:**

- **HTTPS 방식**: 
  - GitHub 사용자명 입력
  - Personal Access Token 입력 (비밀번호 대신)
  - [Personal Access Token 생성하기](https://github.com/settings/tokens)

- **SSH 방식** (SSH 키 설정 필요):
  - SSH 키 자동 인증

### 4단계: 푸시 완료 확인

```bash
# 브랜치 추적 상태 확인
git branch -vv

# 출력:
# * main 8206035 [origin/main] Add: 빠른 배포 명령어 가이드
```

---

## 📊 푸시 예상 결과

### 로컬 커밋

```
8206035 Add: 빠른 배포 명령어 가이드
400a443 Add: 최종 배포 가이드 및 체크리스트
bdd5a7b Initial commit: FANCLUV MVP - K리그 팬 의견 수집 플랫폼
```

### GitHub에 푸시될 파일

```
61개 파일
- pages/ (9개 페이지)
- components/ (20+ 컴포넌트)
- lib/ (유틸리티)
- styles/ (스타일)
- types/ (타입)
- public/ (정적 자산)
- package.json
- next.config.js
- tsconfig.json
- README.md
- .gitignore
- LICENSE
- 배포 가이드 문서들
```

---

## ✅ 푸시 후 확인

### GitHub에서 확인

1. https://github.com/shinjiseop01/fancluv 방문
2. 다음 확인:
   - [x] 파일 목록 표시
   - [x] 커밋 이력 표시 (3개 커밋)
   - [x] 브랜치: main
   - [x] README.md 표시

### 확인 명령어

```bash
# 로컬에서 푸시 상태 확인
git log --oneline -5

# 원격 저장소 상태 확인
git branch -vv

# 푸시된 커밋 확인
git log origin/main --oneline -5
```

---

## 🔄 푸시 후 다음 단계

### 1단계: GitHub 확인 (2분)

```
https://github.com/shinjiseop01/fancluv
```

확인 사항:
- [x] 파일 목록 표시
- [x] 커밋 이력 표시
- [x] README.md 표시
- [x] LICENSE 표시

### 2단계: Vercel 배포 (5-10분)

```
1. https://vercel.com/login 방문
2. GitHub 계정으로 로그인
3. Vercel 대시보드 → Add New... → Project
4. Import Git Repository:
   - 검색: fancluv
   - 저장소 선택: shinjiseop01/fancluv
   - Import 클릭
5. 배포 설정:
   - Project Name: fancluv
   - Framework Preset: Next.js
   - Root Directory: ./
   - Deploy 클릭
6. 배포 완료 (약 2-5분)
```

### 3단계: 배포 URL 확인

```
✅ Deployment successful!
🎉 https://fancluv-xxx.vercel.app
```

---

## ⚠️ 주의사항

### GitHub 인증 (HTTPS 방식)

**2021년 8월부터 GitHub은 비밀번호 대신 Personal Access Token 필요:**

1. https://github.com/settings/tokens 방문
2. **Generate new token** 클릭
3. 권한 선택:
   - [x] repo (전체 제어)
   - [x] workflow
4. **Generate token** 클릭
5. 토큰 복사 (다시 볼 수 없음)
6. 푸시 시 비밀번호 대신 토큰 입력

### 파일 충돌 (GitHub에서 생성한 파일)

GitHub에서 생성한 파일들:
- README.md (기본 템플릿)
- .gitignore (Node 템플릿)
- LICENSE (MIT)

로컬의 더 상세한 버전이 덮어쓰기됩니다 (정상):

```bash
git push -u origin main
# GitHub에서 생성한 파일들이 로컬 버전으로 덮어씌워집니다
```

---

## 📝 푸시 명령어 요약

### 한 줄 명령어 (복사-붙여넣기)

```bash
cd /path/to/fancluv-pages && git remote add origin https://github.com/shinjiseop01/fancluv.git && git push -u origin main
```

### 단계별 명령어

```bash
# 1. 디렉토리 이동
cd /path/to/fancluv-pages

# 2. 원격 저장소 추가
git remote add origin https://github.com/shinjiseop01/fancluv.git

# 3. 코드 푸시
git push -u origin main
```

---

## 🎯 예상 시간

| 단계 | 소요 시간 |
|------|----------|
| 원격 저장소 추가 | 1분 |
| 코드 푸시 | 2-5분 |
| GitHub 확인 | 1분 |
| **총 소요 시간** | **약 5-10분** |

---

## 📞 문제 해결

### 문제 1: "fatal: remote origin already exists"

**원인**: 원격 저장소가 이미 추가됨

**해결책:**
```bash
# 기존 원격 저장소 제거
git remote remove origin

# 새 원격 저장소 추가
git remote add origin https://github.com/shinjiseop01/fancluv.git

# 푸시
git push -u origin main
```

### 문제 2: "fatal: Authentication failed"

**원인**: GitHub 인증 실패

**해결책:**
1. Personal Access Token 생성
2. 푸시 시 토큰 입력
3. 또는 SSH 키 설정

### 문제 3: "Everything up-to-date"

**원인**: 이미 푸시됨

**해결책:**
```bash
# 현재 상태 확인
git branch -vv

# 원격 저장소 상태 확인
git log origin/main --oneline
```

### 문제 4: "rejected (non-fast-forward)"

**원인**: 원격 저장소와 로컬 저장소 차이

**해결책:**
```bash
# 강제 푸시 (주의!)
git push -f origin main
```

---

## ✅ 최종 체크리스트

푸시 전:
- [x] 로컬 Git 저장소 준비
- [x] GitHub 저장소 생성
- [x] 커밋 완료

푸시 중:
- [ ] 원격 저장소 추가
- [ ] 코드 푸시
- [ ] GitHub 인증

푸시 후:
- [ ] GitHub에서 파일 확인
- [ ] 커밋 이력 확인
- [ ] Vercel 배포 준비

---

## 🚀 다음 단계

### 1단계: 코드 푸시 (5-10분)

```bash
cd /path/to/fancluv-pages
git remote add origin https://github.com/shinjiseop01/fancluv.git
git push -u origin main
```

### 2단계: GitHub 확인 (1분)

```
https://github.com/shinjiseop01/fancluv
```

### 3단계: Vercel 배포 (5-10분)

```
https://vercel.com/dashboard
→ Import Project
→ Select fancluv
→ Deploy
```

---

**FANCLUV MVP - GitHub 코드 푸시 가이드**

**상태**: 푸시 준비 완료

**저장소**: https://github.com/shinjiseop01/fancluv

**예상 소요 시간**: 약 5-10분

---

**준비 완료! 이제 로컬 컴퓨터에서 위의 명령어를 실행하세요! 🚀**
