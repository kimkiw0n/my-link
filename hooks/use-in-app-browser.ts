"use client";

import { useState, useEffect } from "react";

export function useInAppBrowser() {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    // 모바일 OS 감지
    const android = /android/i.test(userAgent);
    const ios = /iphone|ipad|ipod/i.test(userAgent);
    
    setIsAndroid(android);
    setIsIOS(ios);

    // 인앱 브라우저 감지 (카카오톡, 인스타그램, 네이버, 페이스북, 라인 등)
    const inAppBrowserRules = [
      /kakaotalk/i,
      /instagram/i,
      /naver/i,
      /line/i,
      /fbav/i, // 페이스북
      /fban/i,
      /daum/i,
      /everytime/i,
      /snapchat/i,
    ];

    const isMatch = inAppBrowserRules.some((rule) => rule.test(userAgent));
    setIsInAppBrowser(isMatch);
  }, []);

  const openInBrowser = () => {
    if (typeof window === 'undefined') return;
    
    const targetUrl = window.location.href;
    
    if (isAndroid) {
      // 안드로이드: 인텐트 스킴을 사용하여 크롬으로 강제 전환 시도
      const urlHost = window.location.host;
      const urlPath = window.location.pathname;
      const urlSearch = window.location.search;
      window.location.href = `intent://${urlHost}${urlPath}${urlSearch}#Intent;scheme=https;package=com.android.chrome;end`;
    } else {
      // iOS 등은 클립보드에 복사해주는 등 다른 방식으로 처리할 수 있지만, 
      // UI 상에서 사파리로 여는 법을 안내하는 것이 더 자연스러움.
      navigator.clipboard.writeText(targetUrl).catch(() => {});
    }
  };

  return {
    isInAppBrowser,
    isAndroid,
    isIOS,
    openInBrowser
  };
}
