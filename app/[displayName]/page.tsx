import { notFound } from "next/navigation";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { PublicLinkCard } from "@/components/public-link-card";

// 60초마다 페이지 재생성 (ISR 적용)
export const revalidate = 60;

interface PageProps {
  params: Promise<{ displayName: string }>;
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { displayName } = await params;

  // 1. 유저 조회 (displayName 필드 기준)
  const userQuery = query(
    collection(db, "users"),
    where("displayName", "==", displayName)
  );
  const userSnapshot = await getDocs(userQuery);

  if (userSnapshot.empty) {
    notFound();
  }

  const userDoc = userSnapshot.docs[0];
  const userData = userDoc.data();
  const userId = userDoc.id;

  // username이 없으면 404 처리 (유저 요청사항)
  if (!userData.username) {
    notFound();
  }

  // 2. 링크 목록 조회
  const linksQuery = query(
    collection(db, `users/${userId}/links`),
    orderBy("createdAt", "desc")
  );
  const linksSnapshot = await getDocs(linksQuery);
  const links = linksSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <main className="flex min-h-screen flex-col items-center py-20 px-4 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      <div className="w-full max-w-md space-y-10">
        {/* 프로필 섹션 */}
        <div className="flex flex-col items-center text-center space-y-5">
          {userData.photoURL ? (
            <Image
              src={userData.photoURL}
              alt="Profile"
              width={96}
              height={96}
              priority
              className="w-24 h-24 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center text-3xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
              {userData.username.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight">
              {userData.username}
            </h1>
            <p className="text-[15px] font-medium text-zinc-600 dark:text-zinc-400">
              @{userData.displayName}
            </p>
            {userData.bio && (
              <p className="text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[280px] pt-1">
                {userData.bio}
              </p>
            )}
          </div>
        </div>

        {/* 링크 목록 섹션 */}
        <div className="flex flex-col gap-4">
          {links.length === 0 ? (
            <p className="text-center text-zinc-400 text-sm py-10">
              등록된 링크가 없습니다.
            </p>
          ) : (
            links.map((link: any) => (
              <PublicLinkCard 
                key={link.id} 
                link={{
                  id: link.id,
                  title: link.title,
                  url: link.url,
                  icon: link.icon
                }} 
                userId={userId} 
              />
            ))
          )}
        </div>
      </div>

      <footer className="mt-auto pt-16 pb-8 text-[12px] font-medium text-zinc-400 dark:text-zinc-600 tracking-wide uppercase">
        Powered by MyLink
      </footer>
    </main>
  );
}
