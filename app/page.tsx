"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { dummyLinks, LinkItem } from "@/data/links";
import { Card, CardContent } from "@/components/ui/card";
import { AddLinkDialog } from "@/components/add-link-dialog";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";

export default function Page() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLinks = useCallback(async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "users/anonymous/links"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedLinks: LinkItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedLinks.push({
          id: doc.id,
          title: data.title,
          url: data.url,
          icon: data.icon,
          clickCount: data.clickCount || 0,
        });
      });
      setLinks(fetchedLinks);
    } catch (e) {
      console.error("Error fetching links:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleAddLink = async (title: string, url: string) => {
    try {
      const urlObject = new URL(url);
      const domain = urlObject.hostname;
      
      // 사용자 화면(UI)에는 바로 띄우지 않고, Firebase(DB)에만 등록
      await addDoc(collection(db, "users/anonymous/links"), {
        title,
        url,
        icon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        clickCount: 0,
        createdAt: serverTimestamp(),
      });
      
      console.log("Firebase에 링크가 성공적으로 저장되었습니다.");
      await fetchLinks();
    } catch (e) {
      console.error("Invalid URL or Firestore Error:", e);
    }
  };

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

        {/* 새 링크 추가 기능 */}
        <AddLinkDialog onAddLink={handleAddLink} />

        {/* 링크 목록 영역 */}
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-8 h-8 text-zinc-400 dark:text-zinc-600 animate-spin" />
            </div>
          ) : links.map((link) => (
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
