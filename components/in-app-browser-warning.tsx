"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Globe, Compass, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface InAppBrowserWarningProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAndroid: boolean;
  isIOS: boolean;
  onOpenBrowser: () => void;
}

export function InAppBrowserWarning({
  open,
  onOpenChange,
  isAndroid,
  isIOS,
  onOpenBrowser,
}: InAppBrowserWarningProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        showCloseButton={false}
        className="max-w-[320px] sm:max-w-[380px] rounded-[32px] p-0 overflow-hidden border-none bg-white dark:bg-zinc-900 shadow-2xl animate-in fade-in zoom-in-95 duration-300"
      >
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center mb-6 shadow-sm border border-yellow-100 dark:border-yellow-800/30">
            <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
          </div>
          
          <DialogHeader className="space-y-3 mb-8 w-full">
            <DialogTitle className="text-2xl font-bold tracking-tight text-yellow-600 dark:text-yellow-500">
              인앱 브라우저 감지됨
            </DialogTitle>
            <DialogDescription className="text-[15px] font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed text-left">
              <span className="text-zinc-900 dark:text-zinc-100 font-bold block mb-1">이 브라우저에서는 구글 로그인이 불가능합니다.</span>
              안전한 로그인을 위해 일반 브라우저(크롬, 사파리 등)를 사용해 주세요.
            </DialogDescription>
          </DialogHeader>

          {isAndroid ? (
            <DialogFooter className="w-full flex flex-col gap-3 sm:flex-col sm:space-x-0">
              <Button 
                variant="default" 
                onClick={onOpenBrowser}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] border-none text-base flex items-center justify-center gap-2"
              >
                <Globe className="w-5 h-5" />
                크롬으로 열기
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => onOpenChange(false)}
                className="w-full h-10 rounded-xl font-bold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                닫기
              </Button>
            </DialogFooter>
          ) : (
            <div className="w-full space-y-4">
              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 text-sm text-zinc-600 dark:text-zinc-300 text-left border border-zinc-200/50 dark:border-zinc-700/50">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4" /> 사파리에서 여는 법
                </span>
                화면 우측 하단(또는 상단)의 <span className="font-bold">메뉴(⠇ 또는 ⋯)</span>를 눌러 <span className="font-bold text-blue-600 dark:text-blue-400">'다른 브라우저로 열기'</span>를 선택해 주세요.
              </div>
              
              <DialogFooter className="w-full flex flex-col gap-3 sm:flex-col sm:space-x-0">
                <Button 
                  variant="outline" 
                  onClick={handleCopyLink}
                  className="w-full h-12 rounded-2xl font-bold border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 gap-2 flex items-center justify-center transition-all active:scale-[0.98]"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-green-600 dark:text-green-500">링크가 복사되었습니다!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      링크 복사하기
                    </>
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => onOpenChange(false)}
                  className="w-full h-10 rounded-xl font-bold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  닫기
                </Button>
              </DialogFooter>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
