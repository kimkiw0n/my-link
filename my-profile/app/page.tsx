

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-20 font-sans text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[60%] w-64 h-64 rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />

      <main className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Profile Header */}
        <section className="mb-12 flex flex-col items-center transition-all">
          <div className="group mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-950 overflow-hidden">
                <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-zinc-100 to-zinc-400 group-hover:from-white group-hover:to-white transition-colors">YC</span>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">윤창식</h1>
          <p className="mt-3 text-xl font-medium text-purple-300">Caesiumy</p>
          <p className="mt-6 text-lg leading-relaxed text-zinc-300 max-w-[90%] sm:max-w-full">
            AI와 함께 걷는 <span className="font-semibold text-white">AI-Native 프론트엔드 엔지니어</span>입니다.<br />
            복잡한 아키텍처를 단순하게 풀어나가며, 기술의 가치를 전달하는 교육자이자 역자로 활동하고 있습니다.
          </p>
        </section>

        {/* Roles & Achievements */}
        <section className="mb-12 grid w-full gap-4 sm:grid-cols-3">
          {[
            { title: "Engineer", desc: "Frontend & AI Agent" },
            { title: "Instructor", desc: "Hanyang Univ & OZ" },
            { title: "Translator", desc: "Design Patterns Book" },
          ].map((item, i) => (
            <div key={item.title} 
                 className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                 style={{ animationDelay: `${i * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <h3 className="relative z-10 text-xs font-bold uppercase tracking-widest text-purple-400">{item.title}</h3>
              <p className="relative z-10 mt-2 font-medium text-zinc-100">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Tech Stack */}
        <section className="mb-14 w-full">
          <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-white/90">Technical Focus</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["React", "Next.js", "TypeScript", "AI Agent Pipeline", "FSD Architecture", "Turborepo", "Node.js"].map((tech) => (
              <span key={tech} className="rounded-full border border-white/10 bg-zinc-900/50 px-5 py-2 text-sm font-medium text-zinc-200 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-16 w-full max-w-lg mx-auto">
          <h2 className="mb-10 text-center text-xl font-bold tracking-tight text-white/90">Experience</h2>
          <div className="space-y-10 text-left">
            {[
              { period: "2026.01 - Present", title: "한양대학교 AI 프로그래밍 외래교수", desc: "AI 활용 프로그래밍 정규 교과목 강의" },
              { period: "2024.05 - 2026.01", title: "한국 기술 마켓 (Kotech Market)", desc: "프론트엔드 모노레포 구축 및 FSD 아키텍처 도입" },
              { period: "Translator", title: "『자바스크립트 + 리액트 디자인 패턴』", desc: "한빛미디어 기술 서적 번역 출판" },
            ].map((exp, idx) => (
              <div key={idx} className="relative flex flex-col gap-2 pl-8 group">
                <div className="absolute left-0 top-1.5 h-full w-[2px] bg-gradient-to-b from-purple-500/50 to-transparent group-last:from-purple-500/20 group-last:to-transparent"></div>
                <div className="absolute left-[-4px] top-1.5 h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] transition-transform duration-300 group-hover:scale-150"></div>
                <span className="text-sm font-semibold text-purple-300/80 tracking-wide">{exp.period}</span>
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-purple-100">{exp.title}</h3>
                <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Links */}
        <footer className="flex w-full justify-center gap-8 border-t border-white/10 pt-10">
          <a href="https://caesiumy.dev" className="text-sm font-medium text-zinc-500 transition-all hover:text-purple-400 hover:-translate-y-0.5">Website</a>
          <a href="https://github.com/caesiumy" className="text-sm font-medium text-zinc-500 transition-all hover:text-purple-400 hover:-translate-y-0.5">GitHub</a>
          <a href="#" className="text-sm font-medium text-zinc-500 transition-all hover:text-purple-400 hover:-translate-y-0.5">LinkedIn</a>
        </footer>
      </main>
    </div>
  );
}
