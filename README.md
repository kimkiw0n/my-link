# MyLink

누구나 자신의 다양한 활동을 하나의 링크에 담아 매력적인 포트폴리오를 만들 수 있는 멀티 링크 프로필 서비스입니다. 직관적인 관리 시스템과 세련된 디자인으로 나만의 브랜딩을 30초 만에 완성해 보세요.

## 주요 기능 (Key Features)

- **Google 소셜 로그인**: Firebase Authentication을 이용한 간편한 회원가입 및 로그인 지원
- **드래그 앤 드롭 링크 관리**: `@dnd-kit`을 사용하여 직관적으로 링크 순서를 변경하고 관리 (모바일 터치 지원)
- **실시간 통계 및 분석**: 개별 링크의 클릭 수를 실시간으로 추적하고, `/stats` 페이지에서 시각화된 차트로 확인
- **직관적인 인라인 편집**: 텍스트를 클릭하면 즉시 입력창으로 변환되어 별도의 설정 페이지 없이 빠른 수정 가능
- **인앱 브라우저 최적화**: 카카오톡, 인스타그램 등 인앱 브라우저 환경에서 안정적인 로그인을 위한 외부 브라우저 실행 가이드 제공
- **자동 아이콘 생성**: Google Favicon API를 연동하여 입력한 URL의 서비스 아이콘을 자동으로 추출 및 표시
- **동적 SEO 및 OG 이미지**: 사용자 프로필별 맞춤형 메타데이터와 Open Graph 이미지를 실시간으로 생성하여 공유 시 가독성 극대화
- **모바일 최우선 디자인**: 모든 화면이 모바일 환경에서도 아름답고 쾌적하게 동작하는 미니멀리즘 디자인

## 유용한 팁 (Tips & Hidden Features)

- **테마 전환 단축키**: 키보드의 `d` 키를 누르면 라이트 모드와 다크 모드를 즉시 전환할 수 있습니다.
- **링크 순서 변경**: 각 링크 카드의 좌측 핸들 아이콘을 잡고 드래그하여 원하는 위치로 순서를 옮길 수 있습니다.
- **간편한 인라인 수정**: 대시보드에서 수정하고 싶은 텍스트(이름, 바이오, 링크 제목, URL)를 클릭하면 즉시 편집 모드로 전환됩니다.
- **검색 엔진 최적화(SEO)**: 사이트 배포 후 [Google Search Console](https://search.google.com/search-console/) 및 [Naver Search Advisor](https://searchadvisor.naver.com/)에 자신의 도메인을 등록해 보세요. 검색 결과에 더 빠르게 노출될 수 있습니다.

## 사용 방법 (How to Use)

1. **로그인**: 우측 상단의 `Sign in with Google` 버튼을 클릭하여 로그인합니다. 처음 로그인 시 본인의 고유 링크가 자동으로 생성됩니다.
2. **프로필 설정**: 대시보드 상단의 이름과 바이오를 클릭하여 정보를 수정합니다.
3. **링크 추가**: `Add New Link` 버튼을 눌러 공유하고 싶은 서비스의 제목과 URL을 입력합니다.
4. **통계 확인**: 헤더의 `Stats` 메뉴를 클릭하여 각 링크가 얼마나 클릭되었는지 차트로 확인합니다.
5. **공유 및 확인**: 
   - 헤더의 프로필 아이콘을 클릭한 후 `Copy Link`를 눌러 본인의 페이지 주소를 복사하여 공유할 수 있습니다.
   - `Preview`를 눌러 방문자에게 표시되는 최종 화면을 미리 확인할 수 있습니다.

## 기술 스택 (Tech Stack)

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query (v5)
- **Animation**: Framer Motion
- **Interaction**: @dnd-kit (Sortable)
- **UI Components**: shadcn/ui, Radix UI, Lucide React

### Backend & BaaS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Analytics**: Real-time Click Tracking

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

### 4. 배포 (Deployment)

이 프로젝트는 [Vercel](https://vercel.com/)을 사용하여 가장 쉽게 배포할 수 있습니다.

1. GitHub 저장소에 코드를 푸시합니다.
2. Vercel에서 새로운 프로젝트를 생성하고 해당 저장소를 연결합니다.
3. `.env.local`에 설정한 환경 변수들을 Vercel 프로젝트 설정(Environment Variables)에 동일하게 등록합니다.
4. 배포가 완료되면 생성된 URL을 통해 서비스를 이용할 수 있습니다.

또한, 직접 빌드하여 서버를 실행하려면 아래 명령어를 사용하세요:
```bash
npm run build
npm run start
```

## 폴더 구조 (Project Structure)

- `@app/`: Next.js App Router (페이지 라우팅 및 레이아웃 관리)
- `@components/`: 재사용 가능한 UI 컴포넌트 (`@ui/` 폴더 내 shadcn/ui 컴포넌트 포함)
- `@lib/`: 유틸리티 함수 및 설정 파일 (Firebase 설정 등)
- `@hooks/`: 커스텀 React Hooks
- `@docs/`: 프로젝트 관련 문서 및 가이드

---
> MyLink는 모든 사용자가 자신의 가치를 가장 쉽고 아름답게 증명할 수 있도록 돕습니다. 최신 기술 스택과 사용자 중심의 UX를 통해 최고의 경험을 제공합니다.
