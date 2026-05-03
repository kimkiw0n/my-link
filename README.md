# MyLink

개발자 및 크리에이터를 위한 심플하고 전문적인 멀티 링크 프로필 서비스입니다. 직관적인 사용성과 깔끔한 디자인을 통해 자신만의 링크들을 간편하게 관리하고 공유할 수 있습니다.

## 주요 기능 (Key Features)

- **Google 소셜 로그인**: Firebase Authentication을 이용한 간편한 회원가입 및 로그인 지원
- **링크 관리 (CRUD)**: 자유로운 링크 추가, 수정, 삭제 기능 제공
- **직관적인 인라인 편집 (Inline Editing)**: 텍스트를 클릭하면 즉시 입력창으로 변환되어 빠르고 자연스러운 수정 가능
- **실시간 데이터 동기화**: Firebase Firestore 기반으로 모든 변경 사항이 실시간으로 반영
- **안전한 삭제 기능**: 링크 삭제 시 5초간 유지되는 **실행 취소(Undo)** 토스트 알림을 통해 실수 방지
- **자동 아이콘 생성**: 구글 Favicon API를 연동하여 입력한 링크의 아이콘을 자동으로 추출 및 표시
- **편리한 프로필 관리**: 헤더의 드롭다운 메뉴를 통해 방문자 페이지 미리보기 및 고유 링크 복사 가능
- **모바일 최우선 반응형 디자인**: 모바일 환경에서도 아름답게 동작하는 미니멀리즘 디자인

## 유용한 팁 (Tips & Hidden Features)

- **테마 전환 단축키**: 키보드의 `d` 키를 누르면 라이트 모드와 다크 모드를 즉시 전환할 수 있습니다. (입력창 제외)
- **간편한 인라인 수정**: 수정 버튼을 찾을 필요 없이, 대시보드에서 수정하고 싶은 텍스트(이름, 바이오, 링크 제목, URL)를 클릭하면 즉시 편집 모드로 전환됩니다.
- **실수 방지 Undo**: 링크를 삭제했을 때 하단에 나타나는 토스트 메시지의 `Undo` 버튼을 클릭하면 5초 이내에 복구가 가능합니다.
- **자동 아이콘**: URL만 입력하면 MyLink가 해당 서비스의 파비콘을 자동으로 추출하여 표시합니다.

## 사용 방법 (How to Use)

1. **로그인**: 우측 상단의 `Sign in with Google` 버튼을 클릭하여 로그인합니다. 처음 로그인 시 본인의 고유 링크가 자동으로 생성됩니다.
2. **프로필 설정**: 대시보드 상단의 이름과 바이오를 클릭하여 정보를 수정합니다.
3. **링크 추가**: `Add New Link` 버튼을 눌러 공유하고 싶은 서비스의 제목과 URL을 입력합니다.
4. **링크 관리**: 
   - 제목이나 URL을 수정하려면 해당 텍스트를 클릭하세요.
   - 각 링크의 클릭 수는 실시간으로 카운트되어 대시보드에서 확인할 수 있습니다.
5. **공유 및 확인**: 
   - 헤더의 프로필 아이콘을 클릭한 후 `Copy Link`를 눌러 본인의 페이지 주소를 복사하여 공유할 수 있습니다.
   - `Preview`를 눌러 방문자에게 표시되는 최종 화면을 미리 확인할 수 있습니다.

## 기술 스택 (Tech Stack)

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React

### Backend & BaaS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication

## 시작하기 (Getting Started)

### 1. 저장소 클론 및 패키지 설치
```bash
git clone https://github.com/kimkiw0n/my-link.git
cd my-link
npm install
```

### 2. 환경 변수 설정
루트 디렉토리에 `.env.local` 파일을 생성하고, 아래의 Firebase 설정값들을 입력합니다.
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. 개발 서버 실행
```bash
npm run dev
```
이후 브라우저에서 `http://localhost:3000`으로 접속하여 확인합니다.

## 폴더 구조 (Project Structure)

- `@app/`: Next.js App Router (페이지 라우팅 및 레이아웃 관리)
- `@components/`: 재사용 가능한 UI 컴포넌트 (`@ui/` 폴더 내 shadcn/ui 컴포넌트 포함)
- `@lib/`: 유틸리티 함수 및 설정 파일 (Firebase 설정 파일 등)
- `@hooks/`: 커스텀 React Hooks

---
> 본 프로젝트는 개발자의 편의를 고려한 깔끔한 코드베이스와 최신 기술 스택을 활용하여 제작되었습니다.
