export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string; // 구글 파비콘 API URL 저장용
  clickCount: number; // PRD 2.4: 링크 클릭 집계용
}

export const dummyLinks: LinkItem[] = [
  {
    id: "1",
    title: "인스타그램",
    url: "https://www.instagram.com/",
    icon: "https://www.google.com/s2/favicons?domain=instagram.com&sz=64",
    clickCount: 120,
  },
  {
    id: "2",
    title: "유튜브",
    url: "https://www.youtube.com/",
    icon: "https://www.google.com/s2/favicons?domain=youtube.com&sz=64",
    clickCount: 85,
  },
  {
    id: "3",
    title: "블로그",
    url: "https://blog.naver.com/",
    icon: "https://www.google.com/s2/favicons?domain=blog.naver.com&sz=64",
    clickCount: 42,
  },
  {
    id: "4",
    title: "GitHub",
    url: "https://github.com/",
    icon: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
    clickCount: 200,
  },
  {
    id: "5",
    title: "포트폴리오",
    url: "https://your-portfolio.com/",
    icon: "https://www.google.com/s2/favicons?domain=your-portfolio.com&sz=64",
    clickCount: 15,
  },
];
