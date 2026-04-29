"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="font-extrabold text-2xl tracking-tighter text-blue-600 dark:text-blue-500">
        MyLink
      </div>
      <div>
        {!loading && (
          user ? (
            <Button variant="outline" size="sm" onClick={signOut} className="font-medium text-xs">
              로그아웃
            </Button>
          ) : (
            <Button size="sm" onClick={signInWithGoogle} className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-md px-4">
              로그인
            </Button>
          )
        )}
      </div>
    </header>
  );
}
