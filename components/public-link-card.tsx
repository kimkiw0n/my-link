"use client";

import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { incrementClickCount } from "@/lib/actions/links";

interface PublicLinkCardProps {
  link: {
    id: string;
    title: string;
    url: string;
    icon?: string;
  };
  userId: string;
}

export function PublicLinkCard({ link, userId }: PublicLinkCardProps) {
  const handleClick = async () => {
    console.log("클릭 트래킹 시작...");
    const result = await incrementClickCount(userId, link.id);
    
    if (result.success) {
      console.log("✅ 클릭 카운트 증가 성공!");
    } else {
      console.error("❌ 클릭 카운트 증가 실패:", result.error);
      if (result.stack) console.error("상세 스택:", result.stack);
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="w-full transition-transform hover:scale-[1.01] active:scale-[0.99] group"
    >
      <Card className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300 py-0 gap-0 overflow-hidden">
        <div className="flex items-center p-3 sm:p-4 w-full">
          {/* 파비콘 아이콘 */}
          {link.icon ? (
            <div className="w-12 h-12 flex-shrink-0 mr-4 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-white flex items-center justify-center p-2.5 shadow-sm">
              <Image
                src={link.icon}
                alt=""
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-12 h-12 flex-shrink-0 mr-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-sm" />
          )}
          
          {/* 타이틀 텍스트 */}
          <span className="flex-1 font-medium text-[14px] sm:text-[15px] tracking-tight text-zinc-700 dark:text-zinc-300 truncate">
            {link.title}
          </span>
          
          <ExternalLink className="w-4 h-4 text-zinc-400 ml-2 opacity-40 group-hover:opacity-100 transition-opacity" />
        </div>
      </Card>
    </a>
  );
}
