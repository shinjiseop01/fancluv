# FANCLUV MVP - GitHub 웹사이트에서 파일 업로드 가이드

GitHub 웹사이트의 **Add file** 기능을 사용하여 프로젝트 파일을 직접 업로드하는 방법입니다.

---

## 🚀 단계별 가이드

### 1단계: GitHub 저장소 방문

```
https://github.com/shinjiseop01/fancluv
```

### 2단계: "Add file" 버튼 클릭

저장소 페이지에서:
- **Add file** 버튼 클릭
- **Upload files** 선택

### 3단계: 파일 업로드

#### 방법 A: 드래그 & 드롭 (가장 간단)

```
1. 업로드 영역에 파일/폴더를 드래그 & 드롭
2. 자동으로 업로드 시작
```

#### 방법 B: 파일 선택 버튼

```
1. "choose your files" 클릭
2. 파일 선택
3. 열기 클릭
```

### 4단계: 커밋 메시지 입력

```
Commit message:
"Add: FANCLUV MVP - 전체 프로젝트 코드"

Extended description (선택사항):
- Pages Router 구조 (9개 페이지)
- 8개 API 라우트 (Mock 데이터)
- 반응형 디자인 (모바일/데스크톱)
- Tailwind CSS + Lucide React
- Supabase 준비 완료
- Vercel 배포 준비 완료
```

### 5단계: "Commit changes" 클릭

업로드 완료!

---

## 📁 업로드할 파일 목록

### 필수 파일

```
pages/                      # 9개 페이지
├── index.tsx              # 랜딩
├── login.tsx              # 로그인
├── signup.tsx             # 회원가입
├── team-selection.tsx     # 팀 선택
├── app/
│   ├── index.tsx          # 구단 페이지
│   ├── create.tsx         # 의견 작성
│   ├── profile.tsx        # 프로필
│   ├── surveys.tsx        # 설문
│   └── opinion/
│       └── [id].tsx       # 의견 상세
├── api/                   # 8개 API
│   ├── auth/
│   │   ├── signin.ts
│   │   └── signup.ts
│   ├── opinions/
│   │   ├── index.ts
│   │   └── [id].ts
│   ├── surveys/
│   │   ├── index.ts
│   │   └── [id].ts
│   ├── clubs/
│   │   └── index.ts
│   ├── users/
│   │   └── profile.ts
│   ├── hello.ts
│   └── fonts/
├── _app.tsx
├── _document.tsx
└── _error.tsx

components/                 # 20+ 컴포넌트
├── ui/                    # UI 컴포넌트
├── AppLayout.tsx
├── Header.tsx
└── BottomNav.tsx

lib/                       # 유틸리티
├── cn.ts
├── mock-data.ts
└── supabase.ts

styles/                    # 스타일
└── globals.css

types/                     # 타입
└── index.ts

public/                    # 정적 자산
└── favicon.ico

supabase/                  # Supabase 설정
└── schema.sql

package.json
next.config.js
tsconfig.json
tailwind.config.ts
postcss.config.mjs

.gitignore
.env.example
LICENSE

README.md
GITHUB_VERCEL_DEPLOYMENT.md
DEPLOYMENT_INSTRUCTIONS.md
QUICK_DEPLOY_COMMANDS.md
PUSH_INSTRUCTIONS.md
PUSH_COMMANDS_SIMPLE.txt
```

### 제외할 파일

```
node_modules/              # 의존성 (npm install로 설치)
.next/                     # 빌드 결과 (npm run build로 생성)
.git/                      # Git 히스토리
*.log                      # 로그 파일
```

---

## 💡 팁

### 1. 폴더 구조 유지

GitHub 웹사이트에서 파일을 업로드할 때, 폴더 구조를 유지하려면:

```
pages/index.tsx            # 자동으로 pages 폴더 생성
pages/api/opinions/index.ts # 자동으로 폴더 구조 생성
```

### 2. 여러 파일 동시 업로드

```
1. "Add file" → "Upload files"
2. 여러 파일을 한 번에 선택
3. 모두 업로드됨
```

### 3. 폴더 업로드

```
1. ZIP 파일을 압축 해제
2. 폴더 전체를 드래그 & 드롭
3. GitHub이 자동으로 폴더 구조 생성
```

---

## ⚠️ 주의사항

### 1. 파일 크기 제한

- 개별 파일: 100 MB 이상은 업로드 불가
- FANCLUV MVP: 모든 파일이 100 MB 이하 ✅

### 2. 폴더 구조

GitHub 웹사이트에서 업로드할 때:

```
✅ 올바른 방법:
pages/index.tsx
pages/api/opinions/index.ts
components/ui/Button.tsx

❌ 잘못된 방법:
fancluv-pages/pages/index.tsx  # 불필요한 최상위 폴더
```

### 3. .gitignore 파일

```
node_modules/를 업로드하지 않도록 주의
.next/를 업로드하지 않도록 주의
```

---

## 🔄 대안: ZIP 파일 업로드

### 방법 1: ZIP 파일 업로드 후 수동 정리

```
1. ZIP 파일을 GitHub에 업로드
2. GitHub에서 ZIP 파일 삭제
3. 개별 파일로 재업로드
```

### 방법 2: 로컬에서 ZIP 압축 해제 후 업로드

```
1. fancluv-pages.zip 다운로드
2. 로컬에서 압축 해제
3. 폴더 전체를 GitHub에 드래그 & 드롭
```

---

## 📊 예상 업로드 시간

| 방법 | 소요 시간 |
|------|----------|
| 드래그 & 드롭 (폴더) | 2-5분 |
| 파일 선택 (개별) | 5-10분 |
| ZIP 파일 업로드 | 1-2분 |

---

## ✅ 업로드 후 확인

### GitHub에서 확인

1. https://github.com/shinjiseop01/fancluv 방문
2. 다음 확인:
   - [x] 파일 목록 표시
   - [x] 폴더 구조 정확함
   - [x] README.md 표시
   - [x] LICENSE 표시
   - [x] package.json 표시

### 커밋 확인

```
1 commit
- Add: FANCLUV MVP - 전체 프로젝트 코드
```

---

## 🚀 다음 단계

### 1단계: GitHub에 파일 업로드 ✅

```
https://github.com/shinjiseop01/fancluv
→ Add file → Upload files
→ 파일 선택/드래그 & 드롭
→ Commit changes
```

### 2단계: GitHub에서 확인

```
https://github.com/shinjiseop01/fancluv
→ 파일 목록 확인
→ README.md 확인
```

### 3단계: Vercel 배포

```
https://vercel.com/dashboard
→ Add New... → Project
→ Import Git Repository
→ Select fancluv
→ Deploy
```

---

## 📝 업로드 체크리스트

준비:
- [x] ZIP 파일 생성 (237 KB, 80개 파일)
- [x] 배포 가이드 작성
- [x] 모든 파일 준비

업로드:
- [ ] GitHub 저장소 방문
- [ ] Add file → Upload files 클릭
- [ ] 파일 선택/드래그 & 드롭
- [ ] 커밋 메시지 입력
- [ ] Commit changes 클릭

확인:
- [ ] GitHub에서 파일 목록 확인
- [ ] 폴더 구조 확인
- [ ] README.md 표시 확인

---

## 💡 추가 팁

### 1. 로컬에서 먼저 테스트

```bash
# 로컬에서 구조 확인
ls -R fancluv-pages/

# 불필요한 파일 제거
rm -rf fancluv-pages/node_modules
rm -rf fancluv-pages/.next
```

### 2. GitHub 웹 에디터 사용

```
1. GitHub 저장소에서 "." 키 누르기
2. GitHub Codespaces 열기
3. 파일 편집 및 커밋
```

### 3. GitHub Desktop 사용

```
1. GitHub Desktop 설치
2. 저장소 클론
3. 파일 추가
4. 커밋 및 푸시
```

---

## 🎯 최종 단계

### 가장 간단한 방법

```
1. ZIP 파일 다운로드: /home/ubuntu/fancluv-pages.zip
2. 로컬에서 압축 해제
3. GitHub 웹사이트에서 폴더 드래그 & 드롭
4. Commit changes 클릭
5. Vercel에서 배포
```

---

**FANCLUV MVP - GitHub 웹사이트 업로드 가이드**

**상태**: 업로드 준비 완료

**저장소**: https://github.com/shinjiseop01/fancluv

**예상 소요 시간**: 약 5-10분

---

**준비 완료! GitHub 웹사이트에서 파일을 업로드하세요! 🚀**
