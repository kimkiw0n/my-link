import { Metadata } from "next";
import { StatsClient } from "./StatsClient";

export const metadata: Metadata = {
  title: "통계 및 분석 | MyLink",
  description: "내 링크들의 클릭 수와 성과를 실시간으로 확인하세요.",
};

export default function StatsPage() {
  return <StatsClient />;
}
