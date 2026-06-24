# FANCLUV MVP - 팀 선택 페이지 업데이트

## 📋 변경 사항 요약

### 1. K리그 12개 구단으로 업데이트

**파일**: `pages/api/clubs/index.ts`

#### 변경 전 (12개 팀, 일부 오류):
```
1. FC서울
2. 울산 현대 → 울산HD
3. 수원 삼성 (제외)
4. 인천 유나이티드
5. 전북 현대 → 전북현대
6. 대구 FC (제외)
7. 대전 시티즌 → 대전하나시티즌
8. 포항 스틸러스 → 포항스틸러스
9. 강원 FC → 강원FC
10. 제주 유나이티드 → 제주유나이티드
11. 광주 FC
12. 성남 FC (제외)
```

#### 변경 후 (정확한 K리그 12개 팀):
```
1. FC서울
2. 울산HD
3. 전북현대
4. 강원FC
5. 포항스틸러스
6. 인천유나이티드
7. FC안양
8. 제주유나이티드
9. 부천FC1995
10. 대전하나시티즌
11. 김천상무
12. 광주FC
```

### 2. 팀 선택 페이지 개선

**파일**: `pages/team-selection.tsx`

#### 개선 사항:

1. **클릭 이벤트 개선**
   - `<button>` 태그에서 `<div>` 태그로 변경
   - `onClick` 핸들러 추가: `handleTeamSelect()`
   - 제출 중일 때 클릭 비활성화

2. **UI/UX 개선**
   - 선택된 팀에 체크마크 (✓) 표시
   - 도시명 추가 표시
   - 호버 효과 추가
   - 그림자 효과 추가
   - 텍스트 중앙 정렬

3. **라우팅 개선**
   - localStorage에 팀 선택 저장
   - 서버 저장 실패 시에도 로컬 저장으로 진행
   - 에러 처리 개선
   - 페이지 이동 안정성 향상

4. **상태 관리 개선**
   - `handleTeamSelect()` 함수 추가
   - `handleContinue()` 함수 개선
   - 에러 처리 강화

---

## 🔧 기술적 변경 사항

### pages/api/clubs/index.ts

```typescript
// 변경 전
const MOCK_CLUBS = [
  { id: '1', name: 'FC서울', logo_url: '⚽', city: '서울' },
  { id: '2', name: '울산 현대', logo_url: '⚽', city: '울산' },
  // ... 기타
]

// 변경 후
const MOCK_CLUBS = [
  { id: '1', name: 'FC서울', logo_url: '⚽', city: '서울' },
  { id: '2', name: '울산HD', logo_url: '⚽', city: '울산' },
  // ... 정확한 12개 팀
]
```

### pages/team-selection.tsx

#### 1. 새로운 함수 추가:
```typescript
const handleTeamSelect = (teamId: string) => {
  if (!submitting) {
    setSelectedTeam(teamId)
  }
}
```

#### 2. 클릭 이벤트 처리 개선:
```typescript
// 변경 전
<button
  onClick={() => setSelectedTeam(club.id)}
  disabled={submitting}
>

// 변경 후
<div
  onClick={() => handleTeamSelect(club.id)}
  className={`... cursor-pointer ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
>
```

#### 3. 선택 표시 추가:
```typescript
{selectedTeam === club.id && (
  <div className="text-center mt-2 text-primary-600 text-xs font-bold">✓ 선택됨</div>
)}
```

#### 4. 라우팅 로직 개선:
```typescript
const handleContinue = async () => {
  // localStorage에 팀 선택 저장
  localStorage.setItem('selectedTeamId', selectedTeam)
  
  // 서버 저장 시도 (실패해도 진행)
  try {
    // API 호출
  } catch (apiErr) {
    // 실패해도 계속 진행
  }
  
  // 페이지 이동
  router.push('/app')
}
```

---

## ✅ 테스트 항목

### 로컬 테스트 (npm run dev)

- [ ] 팀 선택 페이지 로드
- [ ] 12개 팀 모두 표시 확인
- [ ] 팀 카드 클릭 시 선택 상태 변경
- [ ] 선택된 팀에 체크마크 표시
- [ ] "계속하기" 버튼 활성화
- [ ] "계속하기" 클릭 시 `/app` 페이지로 이동
- [ ] localStorage에 팀 선택 저장 확인

### 배포 후 테스트 (https://fancluv.vercel.app)

- [ ] 팀 선택 페이지 로드
- [ ] 12개 팀 모두 표시 확인
- [ ] 팀 카드 클릭 시 선택 상태 변경
- [ ] 선택된 팀에 체크마크 표시
- [ ] "계속하기" 버튼 활성화
- [ ] "계속하기" 클릭 시 `/app` 페이지로 이동

---

## 📊 변경 파일 목록

| 파일 | 변경 사항 | 라인 수 |
|------|---------|--------|
| `pages/api/clubs/index.ts` | K리그 12개 팀 업데이트 | 16줄 |
| `pages/team-selection.tsx` | 클릭 이벤트 및 UI 개선 | 130줄 |

---

## 🚀 배포 방법

### 1단계: 로컬에서 테스트

```bash
cd ~/fancluv-pages
npm run dev

# 브라우저에서 http://localhost:3000/team-selection 접속
# 팀 선택 테스트
```

### 2단계: GitHub에 푸시

```bash
cd ~/fancluv-pages

# 변경 사항 확인
git status

# 파일 스테이징
git add pages/api/clubs/index.ts pages/team-selection.tsx

# 커밋
git commit -m "Feat: K리그 12개 구단 업데이트 및 팀 선택 페이지 개선

- K리그 12개 구단으로 정확히 업데이트
- 팀 선택 클릭 이벤트 개선
- UI/UX 개선 (체크마크, 도시명, 호버 효과)
- 라우팅 안정성 향상
- localStorage에 팀 선택 저장"

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
https://fancluv.vercel.app/team-selection
→ 12개 팀 모두 표시 확인
→ 팀 클릭 테스트
→ "계속하기" 버튼 테스트
```

---

## 📝 K리그 12개 구단 목록

| ID | 팀명 | 도시 | 로고 |
|----|------|------|------|
| 1 | FC서울 | 서울 | ⚽ |
| 2 | 울산HD | 울산 | ⚽ |
| 3 | 전북현대 | 전주 | ⚽ |
| 4 | 강원FC | 강원 | ⚽ |
| 5 | 포항스틸러스 | 포항 | ⚽ |
| 6 | 인천유나이티드 | 인천 | ⚽ |
| 7 | FC안양 | 안양 | ⚽ |
| 8 | 제주유나이티드 | 제주 | ⚽ |
| 9 | 부천FC1995 | 부천 | ⚽ |
| 10 | 대전하나시티즌 | 대전 | ⚽ |
| 11 | 김천상무 | 김천 | ⚽ |
| 12 | 광주FC | 광주 | ⚽ |

---

## 💡 추가 개선 사항

### 향후 개선 가능 항목

1. **팀 로고 이미지**
   - 현재: 이모지 (⚽)
   - 향후: 각 팀의 실제 로고 이미지

2. **팀 정보**
   - 팀 설립년도
   - 팀 홈 경기장
   - 팀 색상

3. **UI 개선**
   - 팀 로고 이미지 표시
   - 팀 색상 배경
   - 애니메이션 효과

4. **데이터 저장**
   - Supabase 연동
   - 사용자별 팀 선택 저장
   - 팀별 의견 통계

---

## ✨ 완료!

**팀 선택 페이지 업데이트가 완료되었습니다!**

**변경 파일:**
- `pages/api/clubs/index.ts` - K리그 12개 팀 업데이트
- `pages/team-selection.tsx` - 클릭 이벤트 및 UI 개선

**다음 단계:**
1. 로컬에서 테스트
2. GitHub에 푸시
3. Vercel 배포 확인
4. 배포된 사이트에서 테스트

---

**FANCLUV MVP - 팀 선택 페이지 업데이트 완료! 🎉**
