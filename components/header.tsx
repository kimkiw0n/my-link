"use client";
import { useAuth } from "@/hooks/use-auth";
import { useProfileQuery } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Eye, LogOut } from "lucide-react";
import { toast } from "sonner";

export function Header() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const { data: profile } = useProfileQuery(user?.uid);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 복사되었습니다.");
    } catch (e) {
      toast.error("링크 복사에 실패했습니다.");
      console.error(e);
    }
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="font-extrabold text-2xl tracking-tighter text-blue-600 dark:text-blue-500">
        MyLink
      </div>
      <div>
        {!loading && (
          user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition-all hover:ring-2 hover:ring-blue-500/50">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-semibold">{profile?.username?.charAt(0) || profile?.displayName?.charAt(0) || "U"}</span>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-1">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal py-3">
                    <div className="flex flex-col space-y-1.5">
                      <p className="text-sm font-semibold leading-none text-zinc-900 dark:text-zinc-100">{profile?.username || profile?.displayName}</p>
                      <p className="text-xs leading-none text-zinc-500 dark:text-zinc-400">
                        @{profile?.displayName}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
                  <Eye className="w-4 h-4 text-zinc-500" />
                  <span className="font-medium">내 페이지 미리보기</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer gap-3 py-2.5">
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span className="font-medium">링크 복사</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer gap-3 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-950/50 dark:focus:text-red-400">
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">로그아웃</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
