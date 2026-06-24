# FANCLUV MVP - 버튼 클릭 문제 수정 가이드

## 🐛 문제 분석

### 증상
- 메인 페이지의 "시작하기", "참여하기", "회원가입" 버튼이 클릭되지 않음
- 마우스를 올리면 손가락 커서로 변경됨 (CSS 스타일은 적용됨)
- 하지만 클릭해도 페이지 이동이 되지 않음
- `/login`, `/signup` 직접 접속은 가능

### 원인

**Next.js 13+ 버전에서 Link와 Button 컴포넌트 중첩 문제**

#### 문제 있는 코드:
```tsx
<Link href="/login">
  <Button className="w-full">시작하기</Button>
</Link>
```

#### 왜 작동하지 않는가?
1. `Link` 컴포넌트는 자식 요소를 `<a>` 태그로 감싸야 함
2. `Button` 컴포넌트는 `<button>` 태그를 렌더링함
3. HTML 표준에서 `<a>` 태그 안에 `<button>` 태그를 중첩하는 것은 권장되지 않음
4. Next.js 13+에서는 이러한 구조에서 클릭 이벤트가 제대로 전파되지 않음

---

## ✅ 해결 방법

### 방법: useRouter를 사용한 onClick 핸들러

**수정된 코드:**
```tsx
import { useRouter } from 'next/router'

export default function Landing() {
  const router = useRouter()
  
  return (
    <>
      <Button 
        className="w-full" 
        onClick={() => router.push('/login')}
      >
        시작하기
      </Button>
    </>
  )
}
```

#### 장점:
✅ 클릭 이벤트가 정확하게 전파됨
✅ 라우팅이 즉시 작동함
✅ 더 명확한 코드 구조
✅ 추가 로직 추가 가능 (예: 분석 추적)

---

## 📝 수정된 파일

### pages/index.tsx

**변경 사항:**

1. **useRouter import 추가**
```tsx
import { useRouter } from 'next/router'
```

2. **컴포넌트 내부에서 router 초기화**
```tsx
export default function Landing() {
  const router = useRouter()
  // ...
}
```

3. **Link 제거 및 onClick 핸들러 추가**

#### Before (문제 있음):
```tsx
<Link href="/login">
  <Button className="w-full">시작하기</Button>
</Link>
```

#### After (수정됨):
```tsx
<Button 
  className="w-full" 
  onClick={() => router.push('/login')}
>
  시작하기
</Button>
```

4. **모든 버튼에 적용**
   - "시작하기" 버튼 → `/login`으로 이동
   - "참여하기" 버튼 → `/login`으로 이동
   - "회원가입" 버튼 → `/signup`으로 이동

---

## 🚀 로컬에서 수정 사항 적용하기

### 1단계: 변경 사항 확인

```bash
cd /path/to/fancluv-pages

# 변경된 파일 확인
git status

# 변경 내용 확인
git diff pages/index.tsx
```

### 2단계: 로컬에서 테스트

```bash
# 의존성 설치 (필요한 경우)
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 확인
# http://localhost:3000
```

**테스트 항목:**
- [ ] 메인 페이지 로드 확인
- [ ] "시작하기" 버튼 클릭 → `/login` 이동 확인
- [ ] "참여하기" 버튼 클릭 → `/login` 이동 확인
- [ ] "회원가입" 버튼 클릭 → `/signup` 이동 확인
- [ ] 로그인 페이지 정상 작동 확인
- [ ] 회원가입 페이지 정상 작동 확인

### 3단계: 변경 사항 커밋

```bash
# 파일 스테이징
git add pages/index.tsx

# 커밋
git commit -m "Fix: 메인 페이지 버튼 클릭 라우팅 문제 수정

- Link와 Button 중첩 구조 제거
- useRouter를 사용한 onClick 핸들러 추가
- 모든 버튼 클릭 시 정상 라우팅 작동"

# 또는 간단한 커밋
git commit -m "Fix: 버튼 클릭 라우팅 문제 수정"
```

### 4단계: GitHub에 푸시

```bash
# 푸시
git push origin main

# 또는 (처음 푸시하는 경우)
git push -u origin main
```

### 5단계: Vercel 자동 배포 확인

```
1. https://vercel.com/dashboard 방문
2. fancluv 프로젝트 선택
3. Deployments 탭 확인
4. 새 배포가 시작되었는지 확인 (자동)
5. 배포 완료 대기 (약 2-5분)
```

### 6단계: 배포된 사이트에서 테스트

```
https://fancluv.vercel.app

테스트 항목:
- [ ] 메인 페이지 로드 확인
- [ ] "시작하기" 버튼 클릭 → `/login` 이동 확인
- [ ] "참여하기" 버튼 클릭 → `/login` 이동 확인
- [ ] "회원가입" 버튼 클릭 → `/signup` 이동 확인
```

---

## 📋 전체 Git 명령어 (복사-붙여넣기)

### 한 줄 명령어

```bash
cd /path/to/fancluv-pages && git add pages/index.tsx && git commit -m "Fix: 버튼 클릭 라우팅 문제 수정" && git push origin main
```

### 단계별 명령어

```bash
# 1. 프로젝트 디렉토리로 이동
cd /path/to/fancluv-pages

# 2. 변경 사항 확인
git status

# 3. 파일 스테이징
git add pages/index.tsx

# 4. 커밋
git commit -m "Fix: 버튼 클릭 라우팅 문제 수정

- Link와 Button 중첩 구조 제거
- useRouter를 사용한 onClick 핸들러 추가
- 모든 버튼 클릭 시 정상 라우팅 작동"

# 5. 푸시
git push origin main

# 6. 푸시 상태 확인
git log --oneline -3
```

---

## 🔍 변경 사항 상세 분석

### pages/index.tsx 변경 전후

#### Before (문제 있음):
```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function Landing() {
  return (
    <>
      {/* 문제: Link 안에 Button이 중첩됨 */}
      <Link href="/login">
        <Button className="w-full">시작하기</Button>
      </Link>
    </>
  )
}
```

#### After (수정됨):
```tsx
import Link from 'next/link'
import { useRouter } from 'next/router'  // ← 추가
import { Button } from '@/components/ui/Button'

export default function Landing() {
  const router = useRouter()  // ← 추가
  
  return (
    <>
      {/* 해결: useRouter의 onClick 핸들러 사용 */}
      <Button 
        className="w-full" 
        onClick={() => router.push('/login')}  // ← 추가
      >
        시작하기
      </Button>
    </>
  )
}
```

---

## ✅ 검증 체크리스트

### 로컬 테스트
- [ ] `npm run dev` 실행 성공
- [ ] http://localhost:3000 접속 성공
- [ ] 메인 페이지 로드 확인
- [ ] "시작하기" 버튼 클릭 → `/login` 이동 확인
- [ ] "참여하기" 버튼 클릭 → `/login` 이동 확인
- [ ] "회원가입" 버튼 클릭 → `/signup` 이동 확인
- [ ] 로그인 페이지 정상 작동 확인
- [ ] 회원가입 페이지 정상 작동 확인

### GitHub 푸시
- [ ] `git add pages/index.tsx` 실행
- [ ] `git commit` 실행
- [ ] `git push origin main` 실행
- [ ] GitHub에서 커밋 확인

### Vercel 배포
- [ ] Vercel 대시보드에서 새 배포 확인
- [ ] 배포 완료 대기 (약 2-5분)
- [ ] https://fancluv.vercel.app 접속 확인
- [ ] 메인 페이지 버튼 클릭 테스트
- [ ] 모든 버튼이 정상 작동하는지 확인

---

## 📊 예상 시간

| 단계 | 소요 시간 |
|------|----------|
| 로컬 테스트 | 2-3분 |
| Git 커밋 & 푸시 | 1-2분 |
| Vercel 배포 | 2-5분 |
| 배포 후 테스트 | 1-2분 |
| **총 소요 시간** | **약 7-12분** |

---

## 🎯 다음 단계

### 1단계: 로컬에서 수정 사항 적용 ✅

```bash
cd /path/to/fancluv-pages
npm run dev
# 브라우저에서 테스트
```

### 2단계: GitHub에 푸시 ⏳

```bash
git add pages/index.tsx
git commit -m "Fix: 버튼 클릭 라우팅 문제 수정"
git push origin main
```

### 3단계: Vercel 배포 확인 ⏳

```
https://vercel.com/dashboard
→ fancluv 프로젝트 선택
→ 배포 완료 대기
→ https://fancluv.vercel.app 테스트
```

### 4단계: 배포된 사이트 테스트 ⏳

```
https://fancluv.vercel.app
→ 메인 페이지 버튼 클릭 테스트
→ 모든 버튼 정상 작동 확인
```

---

## 💡 추가 팁

### 1. 빠른 테스트를 위한 개발 서버 실행

```bash
npm run dev -- --open
# 자동으로 브라우저 열림
```

### 2. 특정 페이지만 테스트

```bash
# 로그인 페이지 직접 접속
http://localhost:3000/login

# 회원가입 페이지 직접 접속
http://localhost:3000/signup
```

### 3. 브라우저 개발자 도구에서 확인

```
F12 또는 우클릭 → 검사
→ Console 탭
→ 에러 메시지 확인
```

### 4. 변경 사항 되돌리기 (필요한 경우)

```bash
# 마지막 커밋 되돌리기
git revert HEAD

# 또는 변경 사항 무시
git checkout pages/index.tsx
```

---

## 📞 문제 해결

### 문제: "Cannot find module 'next/router'"

**해결책:**
```bash
npm install
npm run dev
```

### 문제: 버튼 클릭 후에도 페이지가 이동하지 않음

**확인 사항:**
1. 브라우저 콘솔에서 에러 확인 (F12)
2. 네트워크 탭에서 요청 확인
3. 로컬 개발 서버가 실행 중인지 확인

### 문제: Vercel 배포 후에도 여전히 작동하지 않음

**해결책:**
1. Vercel 캐시 삭제
   - Vercel 대시보드 → Settings → Deployments
   - "Clear Cache" 클릭
2. 강제 재배포
   - Vercel 대시보드 → Deployments
   - 최신 배포의 "Redeploy" 클릭

---

## ✨ 완료!

**수정 사항이 준비되었습니다!**

이제 로컬에서 위의 명령어를 실행하면 됩니다.

---

**FANCLUV MVP - 버튼 클릭 문제 수정 완료! 🎉**

**상태**: 수정 완료, GitHub 푸시 준비 완료

**다음 단계**: 로컬에서 git 명령어 실행 → Vercel 자동 배포 → 테스트
