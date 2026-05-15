import { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "MyLink - Portfolio in One Link",
  description: "모든 활동을 한 페이지에 담아 나만의 포트폴리오를 완성하세요. GitHub, 블로그, 수상 이력까지 나만의 커스텀 링크 페이지를 30초 만에 만들어보세요.",
  openGraph: {
    title: "MyLink - Portfolio in One Link",
    description: "모든 활동을 한 페이지에 담아 나만의 포트폴리오를 완성하세요.",
    url: "https://my-link-kiwon.vercel.app",
  },
};

export default function Page() {
  return <HomeClient />;
}
