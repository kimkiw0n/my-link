import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-20 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <main className="flex w-full max-w-2xl flex-col items-center text-center">
        {/* Profile Header */}
        <section className="mb-12 flex flex-col items-center">
          <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-zinc-100 p-1 dark:bg-zinc-800">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-zinc-900 overflow-hidden">
                <span className="text-4xl font-bold text-zinc-300">YC</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">윤창식</h1>
          <p className="mt-2 text-xl font-medium text-zinc-500 dark:text-zinc-400">Caesiumy</p>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            AI와 함께 걷는 <span className="font-semibold text-zinc-900 dark:text-white">AI-Native 프론트엔드 엔지니어</span>입니다.<br />
            복잡한 아키텍처를 단순하게 풀어나가며, 기술의 가치를 전달하는 교육자이자 역자로 활동하고 있습니다.
          </p>
        </section>

        {/* Roles & Achievements */}
        <section className="mb-12 grid w-full gap-4 sm:grid-cols-3">
          {[
            { title: "Engineer", desc: "Frontend & AI Agent" },
            { title: "Instructor", desc: "Hanyang Univ & OZ" },
            { title: "Translator", desc: "Design Patterns Book" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">{item.title}</h3>
              <p className="mt-1 font-medium">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Tech Stack */}
        <section className="mb-12 w-full text-left">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">Technical Focus</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {["React", "Next.js", "TypeScript", "AI Agent Pipeline", "FSD Architecture", "Turborepo", "Node.js"].map((tech) => (
              <span key={tech} className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-16 w-full max-w-lg text-left">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">Experience</h2>
          <div className="space-y-8">
            <div className="flex flex-col gap-1 border-l-2 border-zinc-100 pl-6 dark:border-zinc-800">
              <span className="text-sm font-semibold text-zinc-400">2026.01 - Present</span>
              <h3 className="font-bold">한양대학교 AI 프로그래밍 외래교수</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">AI 활용 프로그래밍 정규 교과목 강의</p>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-zinc-100 pl-6 dark:border-zinc-800">
              <span className="text-sm font-semibold text-zinc-400">2024.05 - 2026.01</span>
              <h3 className="font-bold">한국 기술 마켓 (Kotech Market)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">프론트엔드 모노레포 구축 및 FSD 아키텍처 도입</p>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-zinc-100 pl-6 dark:border-zinc-800">
              <span className="text-sm font-semibold text-zinc-400">Translator</span>
              <h3 className="font-bold">『자바스크립트 + 리액트 디자인 패턴』</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">한빛미디어 기술 서적 번역 출판</p>
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <footer className="flex gap-6 border-t border-zinc-100 pt-10 dark:border-zinc-800">
          <a href="https://caesiumy.dev" className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white">Website</a>
          <a href="https://github.com/caesiumy" className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white">GitHub</a>
          <a href="#" className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white">LinkedIn</a>
        </footer>
      </main>
    </div>
  );
}
