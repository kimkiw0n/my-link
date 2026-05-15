export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string; // 구글 파비콘 API URL 저장용
  clickCount: number; // PRD 2.4: 링크 클릭 집계용
  updatedAt?: string;
  createdAtMillis?: number;
  updatedAtMillis?: number;
}
