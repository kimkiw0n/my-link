"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { LinkItem } from "@/data/links";
import { AddLinkDialog } from "@/components/add-link-dialog";
import { LinkCard } from "@/components/link-card";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { InlineEdit } from "@/components/inline-edit";
import { useLinksQuery, useAddLinkMutation, useUpdateLinkMutation, useDeleteLinkMutation } from "@/hooks/use-links";
import { useProfileQuery, useUpdateProfileMutation, useUpdateDisplayNameMutation } from "@/hooks/use-profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Page() {
  const { user, loading: authLoading, isAuthenticating, signInWithGoogle } = useAuth();
  const [displayNameError, setDisplayNameError] = useState<string | null>(null);
  const [isDuplicateAlertOpen, setIsDuplicateAlertOpen] = useState(false);

  // TanStack Query Hooks
  const { data: profile } = useProfileQuery(user?.uid);
  const { data: links = [], isLoading } = useLinksQuery(user?.uid);
  const { mutateAsync: addLink } = useAddLinkMutation(user?.uid);
  const { mutateAsync: updateLink } = useUpdateLinkMutation(user?.uid);
  const { mutateAsync: deleteLink } = useDeleteLinkMutation(user?.uid);
  const { mutateAsync: updateProfile } = useUpdateProfileMutation();
  const { mutateAsync: updateDisplayName } = useUpdateDisplayNameMutation(setDisplayNameError);

  const handleUpdateProfile = (field: "username" | "bio", value: string) => {
    updateProfile({ field, value });
  };

  const handleUpdateDisplayName = async (newName: string) => {
    const result = await updateDisplayName(newName);
    if (result === "duplicate") {
      setIsDuplicateAlertOpen(true);
      // InlineEdit이 닫히는 것을 방지하기 위해 에러를 던지지만, 
      // 이미 팝업이 떴으므로 사용자는 팝업을 보고 대응하게 됩니다.
      throw new Error("duplicate-silent"); 
    }
  };

  const handleAddLink = async (title: string, url: string) => {
    try {
      await addLink({ title, url });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateLink = async (id: string, title: string, url: string) => {
    await updateLink({ id, title, url });
  };

  const handleDeleteLink = async (id: string) => {
    await deleteLink(id);
  };

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50/50 dark:bg-zinc-950">
        <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-73px)] flex-col items-center py-20 px-4 bg-white dark:bg-zinc-950 overflow-hidden relative">
        <div className="w-full max-w-4xl text-center space-y-8 relative z-10 mt-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Portfolio in <br/><span className="text-blue-600">One Link.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
            GitHub, 블로그, 포트폴리오까지<br/>
            모든 링크를 한 페이지에 담아보세요.
          </p>
          
          <div className="pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
            <button 
              onClick={signInWithGoogle}
              disabled={isAuthenticating}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:hover:translate-y-0 text-white font-semibold py-4 px-10 rounded-xl shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mx-auto text-lg w-full max-w-sm"
            >
              {isAuthenticating ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google로 시작하기
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Mockup Graphic */}
        <div className="mt-20 relative w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both z-0">
          <div className="absolute inset-0 bg-blue-400/20 dark:bg-blue-600/20 blur-3xl rounded-[100%] transform -translate-y-1/4 scale-150"></div>
          <div 
            className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl shadow-2xl p-8 transition-transform duration-700 ease-out cursor-default"
            style={{ transform: "perspective(1200px) rotateX(15deg) rotateY(-5deg) rotateZ(2deg)", transformStyle: "preserve-3d" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "perspective(1200px) rotateX(15deg) rotateY(-5deg) rotateZ(2deg)"}
          >
            {/* Header Mock */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 animate-pulse"></div>
              <div className="space-y-3">
                <div className="w-32 h-5 rounded-md bg-zinc-200/80 dark:bg-zinc-800/80 animate-pulse"></div>
                <div className="w-48 h-3.5 rounded-md bg-zinc-100/80 dark:bg-zinc-800/50 animate-pulse"></div>
              </div>
            </div>
            
            {/* List Mock */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 w-full bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl border border-blue-100/50 dark:border-blue-900/50 flex items-center px-5 hover:bg-blue-100/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-800/80 mr-4"></div>
                  <div className="w-1/2 h-5 rounded-md bg-zinc-200/80 dark:bg-zinc-700/80"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-73px)] flex-col items-center py-12 px-4 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <div className="w-full max-w-md space-y-10 my-auto">
        {/* 프로필 영역 */}
        <div className="flex flex-col items-center text-center space-y-5">
          {profile?.photoURL ? (
            <img 
              src={profile.photoURL} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm object-cover" 
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center text-3xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
              {profile?.username ? profile.username.charAt(0).toUpperCase() : (profile?.displayName ? profile.displayName.charAt(0).toUpperCase() : "U")}
            </div>
          )}
          <div className="space-y-1 w-full max-w-[280px]">
            <InlineEdit
              value={profile?.username || ""}
              onSave={(val) => handleUpdateProfile("username", val)}
              textClassName="text-2xl font-bold tracking-tight"
              inputClassName="text-xl font-bold h-10"
              placeholder="이름을 입력하세요"
            />
            <InlineEdit
              value={profile?.displayName || ""}
              onSave={handleUpdateDisplayName}
              textClassName="text-[15px] font-medium text-zinc-600 dark:text-zinc-300"
              inputClassName="text-sm h-8"
              prefix="@"
              placeholder="아이디를 입력하세요"
              error={displayNameError}
              hideErrorText={true}
            />
            <InlineEdit
              value={profile?.bio || ""}
              onSave={(val) => handleUpdateProfile("bio", val)}
              textClassName="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1"
              inputClassName="text-xs h-8 mt-1"
              placeholder="짧은 소개글을 입력해주세요"
            />
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
          ) : links.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 dark:text-zinc-400 text-sm">
              아직 추가된 링크가 없습니다.<br/>새로운 링크를 추가해 보세요!
            </div>
          ) : (
            links.map((link) => (
              <LinkCard 
                key={link.id} 
                link={link} 
                onUpdate={handleUpdateLink}
                onDelete={handleDeleteLink}
              />
            ))
          )}
        </div>
      </div>
      
      {/* 푸터 영역 */}
      <footer className="mt-16 pb-8 text-[12px] font-medium text-zinc-400 dark:text-zinc-600 tracking-wide uppercase">
        Powered by MyLink
      </footer>

      {/* 중복 아이디 경고 팝업 */}
      <Dialog open={isDuplicateAlertOpen} onOpenChange={setIsDuplicateAlertOpen}>
        <DialogContent 
          showCloseButton={false}
          className="max-w-[320px] sm:max-w-[380px] rounded-[32px] p-0 overflow-hidden border-none bg-white dark:bg-zinc-900 shadow-2xl animate-in fade-in zoom-in-95 duration-300"
        >
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6 shadow-sm border border-red-100 dark:border-red-800/30">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-500" />
            </div>
            
            <DialogHeader className="space-y-3 mb-8">
              <DialogTitle className="text-2xl font-bold tracking-tight text-red-600 dark:text-red-500">
                아이디 중복 에러
              </DialogTitle>
              <DialogDescription className="text-[15px] font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
                <span className="text-zinc-900 dark:text-zinc-100 font-bold block mb-1">이미 사용 중인 아이디입니다.</span>
                다른 아이디를 입력해 주세요.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="w-full">
              <Button 
                variant="default" 
                onClick={() => setIsDuplicateAlertOpen(false)}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] border-none text-base"
              >
                확인
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
