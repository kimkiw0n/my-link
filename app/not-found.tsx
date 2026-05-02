"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useProfileQuery } from "@/hooks/use-profile";

export default function NotFound() {
  const { user } = useAuth();
  const { data: profile } = useProfileQuery(user?.uid);

  // 로그인 상태에 따른 이동 경로 및 텍스트 설정
  const targetHref = profile?.displayName ? `/${profile.displayName}` : "/";
  const buttonText = profile?.displayName ? "내 페이지로 돌아가기" : "홈으로 돌아가기";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 overflow-hidden relative">
      {/* 배경 장식 효과 (불투명도 추가 상향) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 메인 블루 그라데이션 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-blue-500/35 dark:bg-blue-600/25 blur-[100px] md:blur-[160px] rounded-full animate-pulse duration-[10s]"></div>
        {/* 보조 퍼플 그라데이션 */}
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-indigo-500/30 dark:bg-indigo-700/20 blur-[80px] rounded-full"></div>
      </div>

      <div className="relative z-10 text-center space-y-10 animate-in fade-in zoom-in duration-700">
        <div className="space-y-2">
          {/* 404 텍스트 (더 선명하게 조정) */}
          <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-zinc-100/80 dark:text-zinc-900 select-none">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-[-40px] md:mt-[-60px] relative text-zinc-900 dark:text-zinc-100">
            페이지를 찾을 수 없습니다
          </h2>
        </div>
        
        <p className="text-zinc-500 dark:text-zinc-400 max-w-[340px] mx-auto text-[15px] md:text-[16px] leading-relaxed font-medium">
          요청하신 페이지가 존재하지 않거나,<br/>
          주소가 변경되었을 수 있습니다.
        </p>

        <div className="pt-2">
          <Link 
            href={targetHref} 
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl px-10 shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-1.5 flex items-center gap-3 h-14 text-md"
            )}
          >
            {profile?.displayName ? <ArrowLeft className="w-5 h-5" /> : <Home className="w-5 h-5" />}
            {buttonText}
          </Link>
        </div>
      </div>
      
      <footer className="absolute bottom-10 text-[12px] font-bold text-zinc-400/50 dark:text-zinc-600/50 tracking-[0.2em] uppercase">
        MyLink Service Recovery
      </footer>
    </main>
  );
}
