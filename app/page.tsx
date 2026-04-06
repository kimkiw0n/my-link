import { dummyLinks } from "@/data/links";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 px-4 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <div className="w-full max-w-md space-y-10 my-auto">
        {/* 프로필 영역 */}
        <div className="flex flex-col items-center text-center space-y-5">
          <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center text-3xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
            ML
          </div>
          <div className="space-y-1.5">
            <h1 className="text-xl font-semibold tracking-tight">@displayName</h1>
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed font-medium">
              IT Professional & Security Expert
            </p>
          </div>
        </div>

        {/* 링크 목록 영역 */}
        <div className="flex flex-col gap-3">
          {dummyLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-0.5 block outline-none rounded-xl ring-offset-background focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
            >
              <Card className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300">
                <CardContent className="flex items-center p-2.5 sm:p-3">
                  
                  {/* 파비콘 아이콘 */}
                  {link.icon ? (
                    <div className="w-12 h-12 flex-shrink-0 mr-4 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-white flex items-center justify-center p-2.5 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={link.icon}
                        alt={`${link.title} icon`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 flex-shrink-0 mr-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-sm" />
                  )}
                  
                  {/* 타이틀 텍스트 */}
                  <div className="flex-1 font-medium text-[14px] sm:text-[15px] tracking-tight group-hover:text-zinc-900 dark:group-hover:text-zinc-50 text-zinc-700 dark:text-zinc-300 transition-colors">
                    {link.title}
                  </div>
                  
                  {/* 우측 아이콘 (선택 사항 - 화살표 등) */}
                  <div className="w-6 h-6 text-zinc-300 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center -translate-x-2 group-hover:translate-x-0 duration-300 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
      
      {/* 푸터 영역 */}
      <footer className="mt-16 pb-8 text-[12px] font-medium text-zinc-400 dark:text-zinc-600 tracking-wide uppercase">
        Powered by MyLink
      </footer>
    </main>
  );
}
