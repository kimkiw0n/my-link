import { dummyLinks } from "@/data/links";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center py-16 px-6 bg-background">
      {/* 프로필 헤더 (임시) */}
      <div className="w-full max-w-md flex flex-col items-center mb-8 gap-3">
        <div className="w-20 h-20 rounded-full bg-muted border animate-pulse" />
        <h1 className="text-xl font-semibold tracking-tight">@displayName</h1>
        <p className="text-sm text-muted-foreground text-center">
          개발자 포트폴리오 및 운영 채널 링크
        </p>
      </div>

      {/* 링크 목록 리스트 */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {dummyLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block transition-transform hover:scale-[1.01]"
          >
            <Card className="hover:bg-muted/50 transition-colors shadow-sm">
              <CardContent className="flex items-center p-4">
                {/* 파비콘 아이콘 렌더링 */}
                {link.icon ? (
                  <div className="w-10 h-10 flex-shrink-0 mr-4 rounded-full overflow-hidden border bg-white flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={link.icon}
                      alt={`${link.title} icon`}
                      className="w-5 h-5 object-contain"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 flex-shrink-0 mr-4 rounded-full border bg-muted" />
                )}
                
                {/* 텍스트 타이틀 */}
                <div className="flex-1 text-center font-medium px-4">
                  {link.title}
                </div>
                
                {/* 우측 공백 (아이콘 크기만큼 간격을 맞춰 중앙 정렬 보정) */}
                <div className="w-10 flex-shrink-0 ml-4 pointer-events-none opacity-0" />
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </main>
  );
}
