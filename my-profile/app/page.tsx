export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans text-black selection:bg-pink-400 selection:text-black pb-20 overflow-x-hidden">
      <main className="mx-auto max-w-5xl px-5 py-16 sm:px-10 lg:px-16 flex flex-col items-center">
        {/* Profile Header */}
        <section className="mb-24 flex flex-col items-center text-center w-full">
          <div className="mb-10 flex h-36 w-36 -rotate-3 items-center justify-center border-4 border-black bg-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-3 hover:scale-105 active:scale-95">
            <span className="text-7xl font-black uppercase tracking-tighter text-black">YC</span>
          </div>
          
          <h1 className="mb-6 text-6xl sm:text-8xl font-black uppercase tracking-tighter text-black">
            윤창식
          </h1>
          
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            <span className="border-4 border-black bg-cyan-300 px-4 py-1 flex items-center justify-center text-base sm:text-lg font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              AI-Native Frontend
            </span>
            <span className="border-4 border-black bg-pink-300 px-4 py-1 flex items-center justify-center text-base sm:text-lg font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Educator
            </span>
            <span className="border-4 border-black bg-lime-300 px-4 py-1 flex items-center justify-center text-base sm:text-lg font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Translator
            </span>
          </div>
          
          <div className="group relative max-w-3xl">
            <div className="absolute -inset-2 rounded-xl bg-orange-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1 transition-transform group-hover:-rotate-1"></div>
            <div className="relative border-4 border-black bg-white p-6 sm:p-10 text-lg sm:text-2xl font-bold leading-relaxed shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="bg-yellow-300 px-2 py-1 mx-1 border-2 border-black inline-block -rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">인문대(영문학과) 출신</span>에서
              <span className="bg-pink-300 px-2 py-1 mx-1 border-2 border-black inline-block rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">AI-Native 프론트엔드 엔지니어</span>로 성장했습니다.<br className="hidden sm:block" />
              <br className="sm:hidden" />
              복잡한 시스템과 아키텍처를 단순하게 풀어나가며,<br className="hidden sm:block" /> 
              기술의 가치를 선명하게 전달하는 멘토이자 역자로 활동합니다.
            </div>
          </div>
        </section>

        {/* Roles & Achievements */}
        <section className="mb-24 grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Engineer", desc: "Frontend & AI Agent", color: "bg-pink-400", rotation: "-rotate-2" },
            { title: "Instructor", desc: "React & AI Programming", color: "bg-cyan-400", rotation: "rotate-2" },
            { title: "Translator", desc: "Design Patterns Book", color: "bg-yellow-400", rotation: "-rotate-1" },
          ].map((item) => (
            <div key={item.title} 
                 className={`group relative flex flex-col justify-between border-4 border-black p-8 ${item.color} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-2 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-4 active:translate-x-4 active:shadow-none ${item.rotation}`}>
              <h3 className="mb-8 text-3xl font-black uppercase tracking-widest bg-white inline-block w-max px-3 py-1 border-2 border-black -ml-4 -mt-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {item.title}
              </h3>
              <p className="font-bold text-black text-xl sm:text-2xl leading-tight border-b-4 border-black pb-2 mr-4">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Tech Stack */}
        <section className="mb-24 w-full">
          <div className="relative border-4 border-black bg-white p-6 sm:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-10 text-4xl sm:text-5xl font-black uppercase tracking-tight inline-block bg-purple-300 px-4 py-2 border-4 border-black -mt-16 sm:-mt-20 ml-[-8px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-4">
              {[
                { name: "React", c: "bg-lime-300" }, { name: "Next.js", c: "bg-cyan-300" },
                { name: "TypeScript", c: "bg-yellow-300" }, { name: "Tailwind CSS", c: "bg-pink-300" },
                { name: "Claude Code", c: "bg-purple-300" }, { name: "AI-Native Workflow", c: "bg-orange-300" },
                { name: "AI Agent Pipeline", c: "bg-lime-300" }, { name: "FSD Architecture", c: "bg-cyan-300" },
                { name: "Turborepo", c: "bg-yellow-300" }, { name: "Node.js", c: "bg-pink-300" }
              ].map((tech) => (
                <span key={tech.name} 
                      className={`border-4 border-black px-4 sm:px-5 py-2 sm:py-3 text-base sm:text-lg font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-crosshair ${tech.c}`}>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-24 w-full">
          <h2 className="mb-10 text-4xl sm:text-5xl font-black uppercase tracking-tight text-center sm:text-left drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] border-b-8 border-black pb-4">
            Experience
          </h2>
          <div className="flex flex-col gap-10 sm:gap-14 mt-12 w-full max-w-4xl mx-auto">
            {[
              { period: "2026.01 - Present", title: "한양대학교 AI 프로그래밍 외래교수", desc: "초보자 및 비전공자를 위한 AI 활용 프로그래밍 정규 교과목 강의 설계 및 진행", color: "bg-pink-300" },
              { period: "2024.05 - 2026.01", title: "한국 기술 마켓 (Kotech Market)", desc: "프론트엔드 모노레포 구축 및 FSD(Feature-Sliced Design) 아키텍처 도입", color: "bg-cyan-300" },
              { period: "Frontend Engineer", title: "KC-MIC (머신 인텔리전스 센터)", desc: "반도체 기업 AI 연구 조직 프론트엔드 엔지니어 / AI 에이전트 파이프라인 설계 및 구축", color: "bg-yellow-300" },
              { period: "2023.12 - 2025.05", title: "팀스파르타 내일배움캠프 리액트 트랙 튜터", desc: "1년 6개월간 80회 이상의 실시간 라이브 강의 진행. 비전공자 및 주니어 대상 밀착 멘토링", color: "bg-lime-300" },
              { period: "Community & Books", title: "번역 및 커뮤니티 활동", desc: "한빛미디어 『자바스크립트 + 리액트 디자인 패턴』 역자 출판 / 파이콘 한국 2023 개발 지원 및 소문난 주니어 콘퍼런스 오거나이저", color: "bg-purple-300" },
            ].map((exp, idx) => (
              <div key={idx} className="relative w-full border-4 border-black bg-white p-8 sm:p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-rotate-1">
                <div className={`absolute -top-5 left-4 sm:left-6 border-4 border-black ${exp.color} px-4 py-2 text-sm sm:text-base font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 -rotate-2`}>
                  {exp.period}
                </div>
                <h3 className="mb-4 mt-2 text-2xl sm:text-3xl font-black leading-tight bg-yellow-100 inline-block px-2">
                  {exp.title}
                </h3>
                <p className="text-lg sm:text-xl font-bold text-black/90 mt-2">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Links */}
        <footer className="w-full mt-10">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {[
              { label: "Website", url: "https://caesiumy.dev", color: "bg-yellow-400" },
              { label: "GitHub", url: "https://github.com/caesiumy", color: "bg-cyan-400" },
              { label: "LinkedIn", url: "#", color: "bg-pink-400" },
            ].map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" 
                 className={`border-4 border-black ${link.color} px-10 py-5 text-xl font-black uppercase text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none -rotate-1 hover:rotate-0`}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-20 text-center font-bold text-black/60 uppercase tracking-widest text-sm">
            © 2026 Caesiumy (YC). Redesigned in Neobrutalism.
          </div>
        </footer>
      </main>
    </div>
  );
}
