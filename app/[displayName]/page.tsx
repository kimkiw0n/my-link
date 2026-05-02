import { notFound } from "next/navigation";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

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
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
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
