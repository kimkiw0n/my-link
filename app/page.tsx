"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { LinkItem } from "@/data/links";
import { AddLinkDialog } from "@/components/add-link-dialog";
import { LinkCard } from "@/components/link-card";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";

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

  const handleUpdateLink = async (id: string, title: string, url: string) => {
    try {
      const urlObject = new URL(url);
      const domain = urlObject.hostname;
      
      const linkRef = doc(db, "users/anonymous/links", id);
      await updateDoc(linkRef, {
        title,
        url,
        icon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
      });
      console.log("Firebase 링크가 성공적으로 수정되었습니다.");
      await fetchLinks();
    } catch (e) {
      console.error("Error updating link:", e);
      throw e;
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      const linkRef = doc(db, "users/anonymous/links", id);
      await deleteDoc(linkRef);
      console.log("Firebase 링크가 성공적으로 삭제되었습니다.");
      await fetchLinks();
    } catch (e) {
      console.error("Error deleting link:", e);
      throw e;
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
            <LinkCard 
              key={link.id} 
              link={link} 
              onUpdate={handleUpdateLink}
              onDelete={handleDeleteLink}
            />
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
