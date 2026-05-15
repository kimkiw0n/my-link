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
import { AlertTriangle, Copy, CheckCircle2 } from "lucide-react";
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
        className="max-w-[320px] sm:max-w-[360px] rounded-[24px] p-6 overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-xl animate-in fade-in zoom-in-95 duration-300"
      >
        <div className="flex flex-col text-left">
          <DialogHeader className="space-y-3 mb-6">
            <DialogTitle className="text-[17px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-zinc-400 dark:text-zinc-300" />
              로그인 제한 안내
            </DialogTitle>
            <DialogDescription className="text-[14px] font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
              <span className="text-zinc-800 dark:text-zinc-200 block mb-2">현재 브라우저는 인 앱 브라우저이므로 구글 정책에 따라 로그인이 제한됩니다.</span>
              로그인을 원하신다면 버튼을 눌러 시스템 브라우저로 이동해주세요.
            </DialogDescription>
          </DialogHeader>

          {isAndroid ? (
            <DialogFooter className="w-full flex flex-col gap-2 sm:flex-col sm:space-x-0">
              <Button 
                variant="default" 
                onClick={onOpenBrowser}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] border-none text-[15px]"
              >
                시스템 브라우저로 이동
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => onOpenChange(false)}
                className="w-full h-10 rounded-xl font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-[14px]"
              >
                닫기
              </Button>
            </DialogFooter>
          ) : (
            <div className="w-full">
              <DialogFooter className="w-full flex flex-col gap-2 sm:flex-col sm:space-x-0">
                <Button 
                  variant="default" 
                  onClick={handleCopyLink}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] border-none text-[15px] gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      링크 복사됨
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      링크 복사하기
                    </>
                  )}
                </Button>
                <div className="text-[13px] text-center text-zinc-500 dark:text-zinc-400 font-medium py-1">
                  복사한 링크를 Safari 등에 붙여넣어주세요.
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => onOpenChange(false)}
                  className="w-full h-10 rounded-xl font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-[14px] mt-1"
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
