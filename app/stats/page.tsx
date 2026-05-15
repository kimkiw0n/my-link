"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, TrendingUp, MousePointerClick, Link as LinkIcon, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLinksQuery } from "@/hooks/use-links";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function StatsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const { data: links = [], isLoading: linksLoading } = useLinksQuery(user?.uid);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const totalClicks = useMemo(() => {
    return links.reduce((acc, link) => acc + (link.clickCount || 0), 0);
  }, [links]);

  const mostPopularLink = useMemo(() => {
    if (links.length === 0) return null;
    return links.reduce((prev, current) => {
      return (prev.clickCount || 0) > (current.clickCount || 0) ? prev : current;
    });
  }, [links]);

  const chartData = useMemo(() => {
    return links.map((link) => ({
      title: link.title || "Unknown",
      clicks: link.clickCount || 0,
      url: link.url,
      icon: link.icon,
    })).sort((a, b) => b.clicks - a.clicks);
  }, [links]);

  if (authLoading || linksLoading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50/50 dark:bg-zinc-950">
        <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-73px)] flex-col items-center py-12 px-4 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <div className="w-full max-w-5xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <div>
            <Button 
              variant="ghost" 
              className="mb-4 -ml-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              통계 및 분석
            </h1>
            <p className="text-[15px] text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
              모든 링크의 성과를 한눈에 파악하세요.
            </p>
          </div>
        </div>

        {/* Top 3 Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg shadow-zinc-200/20 dark:shadow-black/20 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-semibold text-zinc-600 dark:text-zinc-300">
                총 클릭 수
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <MousePointerClick className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-zinc-900 dark:text-white">
                {totalClicks.toLocaleString()}
              </div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">
                모든 링크의 클릭 합산
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg shadow-zinc-200/20 dark:shadow-black/20 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-semibold text-zinc-600 dark:text-zinc-300">
                가장 인기있는 링크
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white truncate">
                {mostPopularLink?.title || "-"}
              </div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-2">
                {mostPopularLink?.clickCount ? `${mostPopularLink.clickCount.toLocaleString()} 클릭` : '클릭 없음'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg shadow-zinc-200/20 dark:shadow-black/20 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-semibold text-zinc-600 dark:text-zinc-300">
                활성 링크
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-zinc-900 dark:text-white">
                {links.length}
              </div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">
                등록된 전체 링크 개수
              </p>
            </CardContent>
          </Card>
        </div>

        {links.length > 0 ? (
          <>
            {/* Bar Chart Section */}
            <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl shadow-zinc-200/30 dark:shadow-black/30 rounded-3xl overflow-hidden">
              <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 pb-6">
                <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white">클릭 수 분석</CardTitle>
                <CardDescription className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  각 링크별 상세 클릭 현황을 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 pb-4 px-2 sm:px-6">
                <ChartContainer 
                  config={{
                    clicks: {
                      label: "클릭 수",
                      color: "#2563eb",
                      icon: MousePointerClick,
                    },
                  }}
                  className="min-h-[350px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                      <CartesianGrid vertical={false} strokeDasharray="4 4" className="stroke-zinc-200 dark:stroke-zinc-800" />
                      <XAxis 
                        dataKey="title" 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={16} 
                        fontSize={13}
                        className="fill-zinc-600 dark:fill-zinc-400 font-medium"
                        tickFormatter={(value) => value.length > 12 ? `${value.substring(0, 12)}...` : value}
                      />
                      <YAxis 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={16} 
                        fontSize={13}
                        className="fill-zinc-600 dark:fill-zinc-400 font-medium"
                        allowDecimals={false}
                      />
                      <ChartTooltip 
                        cursor={{ fill: 'var(--color-clicks)', opacity: 0.1 }}
                        isAnimationActive={false}
                        content={<ChartTooltipContent className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl font-medium" />} 
                      />
                      <Bar 
                        dataKey="clicks" 
                        fill="var(--color-clicks)" 
                        radius={[6, 6, 0, 0]} 
                        maxBarSize={60}
                        animationDuration={1000}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Detailed List Section */}
            <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl shadow-zinc-200/30 dark:shadow-black/30 rounded-3xl overflow-hidden">
              <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 pb-6">
                <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white">상세 링크 목록</CardTitle>
                <CardDescription className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  전체 링크의 세부 정보와 클릭 수를 리스트 형태로 확인합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800/50">
                  {chartData.map((link, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors group"
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm overflow-hidden">
                          {link.icon ? (
                            <img src={link.icon} alt="icon" className="w-6 h-6" />
                          ) : (
                            <LinkIcon className="w-5 h-5 text-zinc-400" />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="font-bold text-[15px] text-zinc-900 dark:text-white truncate">
                            {link.title}
                          </h3>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 truncate flex items-center gap-1 mt-0.5 transition-colors"
                          >
                            {link.url}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </div>
                      </div>
                      <div className="shrink-0 flex flex-col items-end pl-4">
                        <span className="text-lg font-bold text-zinc-900 dark:text-white">
                          {link.clicks.toLocaleString()}
                        </span>
                        <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                          Clicks
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center py-24 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-xl">
            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <LinkIcon className="w-8 h-8 text-zinc-400" />
            </div>
            <p className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              아직 추가된 링크가 없습니다
            </p>
            <p className="text-[15px] text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto">
              첫 번째 링크를 추가하고 클릭 통계를 확인해 보세요.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 shadow-lg shadow-blue-600/20 hover:scale-105 transition-all"
              onClick={() => router.push("/")}
            >
              링크 추가하러 가기
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
