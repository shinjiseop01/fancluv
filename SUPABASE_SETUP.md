# Supabase Setup Guide for FANCLUV

## 1. Supabase 프로젝트 생성

### 1.1 Supabase 계정 생성
1. https://supabase.com 방문
2. "Start your project" 클릭
3. GitHub 또는 이메일로 회원가입

### 1.2 새 프로젝트 생성
1. "New project" 클릭
2. 프로젝트명: `fancluv`
3. 데이터베이스 비밀번호 설정 (안전하게 보관)
4. 리전 선택 (한국: Seoul)
5. "Create new project" 클릭

### 1.3 프로젝트 URL 및 키 확인
1. 프로젝트 대시보드 접속
2. "Settings" → "API" 메뉴
3. 다음 정보 복사:
   - Project URL: `NEXT_PUBLIC_SUPABASE_URL`
   - Anon key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service Role key: `SUPABASE_SERVICE_ROLE_KEY`

## 2. 데이터베이스 스키마 설정

### 2.1 SQL 스크립트 실행
1. Supabase 대시보드 → "SQL Editor"
2. "New query" 클릭
3. `supabase/schema.sql` 파일 내용 복사
4. 쿼리 실행

### 2.2 테이블 확인
1. "Table Editor" 메뉴 확인
2. 다음 테이블 생성 확인:
   - `users`
   - `clubs`
   - `opinions`
   - `comments`
   - `likes`
   - `surveys`
   - `survey_responses`

## 3. 인증 설정

### 3.1 Supabase Auth 활성화
1. "Authentication" → "Providers" 메뉴
2. "Email" 활성화 확인
3. "Settings" → "Email Templates" 확인

### 3.2 리다이렉트 URL 설정
1. "Authentication" → "URL Configuration"
2. "Redirect URLs" 추가:
   - 로컬: `http://localhost:3000`
   - 프로덕션: `https://fancluv.vercel.app`

## 4. 초기 데이터 삽입

### 4.1 클럽 데이터 삽입
```sql
INSERT INTO clubs (name, logo_url, city) VALUES
('FC서울', '⚽', '서울'),
('울산 현대', '⚽', '울산'),
('수원 삼성', '⚽', '수원'),
('인천 유나이티드', '⚽', '인천'),
('전북 현대', '⚽', '전주'),
('대구 FC', '⚽', '대구'),
('대전 시티즌', '⚽', '대전'),
('포항 스틸러스', '⚽', '포항'),
('강원 FC', '⚽', '강원'),
('제주 유나이티드', '⚽', '제주'),
('광주 FC', '⚽', '광주'),
('성남 FC', '⚽', '성남');
```

### 4.2 설문 데이터 삽입
```sql
INSERT INTO surveys (club_id, title, description, options) VALUES
((SELECT id FROM clubs LIMIT 1), 
 '다음 시즌 감독 선택', 
 '우리 팀의 다음 시즌 감독으로 누구를 원하시나요?',
 '["현 감독 유지", "국내 감독 영입", "해외 감독 영입"]'::jsonb),
((SELECT id FROM clubs LIMIT 1), 
 '주전 공격수 영입 필요성', 
 '현재 공격력이 충분하다고 생각하시나요?',
 '["충분하다", "보강이 필요하다", "잘 모르겠다"]'::jsonb);
```

## 5. 환경 변수 설정

### 5.1 .env.local 파일 생성
```bash
cd /home/ubuntu/fancluv-pages
cp .env.example .env.local
```

### 5.2 .env.local 수정
```
NEXT_PUBLIC_SUPABASE_URL=<프로젝트 URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Anon Key>
SUPABASE_SERVICE_ROLE_KEY=<Service Role Key>
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=FANCLUV
```

## 6. 로컬 테스트

### 6.1 Supabase 클라이언트 설치
```bash
npm install @supabase/supabase-js
```

### 6.2 개발 서버 시작
```bash
npm run dev
```

### 6.3 기능 테스트
1. 회원가입 테스트
2. 로그인 테스트
3. 의견 작성 테스트
4. 데이터 저장 확인

## 7. Vercel 배포 시 환경 변수 설정

### 7.1 Vercel 프로젝트 설정
1. Vercel 대시보드 접속
2. 프로젝트 선택
3. "Settings" → "Environment Variables"
4. 다음 변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_APP_NAME`

### 7.2 배포 후 확인
1. 배포 완료 대기
2. 프로덕션 URL 접속
3. 모든 기능 테스트

## 8. 보안 설정

### 8.1 Row Level Security (RLS)
- 모든 테이블에 RLS 활성화됨
- 사용자는 자신의 데이터만 수정 가능
- 공개 데이터는 모두 조회 가능

### 8.2 API 키 관리
- Anon Key: 클라이언트 사이드에서 사용
- Service Role Key: 서버 사이드에서만 사용
- 절대 공개하지 않기

## 9. 트러블슈팅

### 인증 오류
- 리다이렉트 URL 설정 확인
- 환경 변수 설정 확인

### 데이터 저장 오류
- RLS 정책 확인
- 사용자 권한 확인

### 성능 문제
- 인덱스 생성 확인
- 쿼리 최적화 필요

## 10. 모니터링

### Supabase 대시보드
- "Database" → "Logs" 메뉴에서 쿼리 로그 확인
- "Auth" → "Users" 메뉴에서 사용자 관리
- "Realtime" 메뉴에서 실시간 활동 확인
