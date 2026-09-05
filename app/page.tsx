import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Code2,
  FileText,
  Play,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050912] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute right-[-200px] top-[500px] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[130px]" />
      </div>

      {/* NAVBAR */}
      <header className="border-b border-white/[0.06] bg-[#070d18]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20">
              <span className="text-lg font-bold">&gt;_</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">
                HirePrep
              </span>

              <span className="rounded-md border border-blue-400/20 bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-bold text-blue-400">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#practice"
              className="transition hover:text-white"
            >
              Practice
            </a>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:text-white sm:block"
            >
              Log in
            </Link>

            <Link
              href="/login"
              className="group flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold transition hover:bg-blue-400"
            >
              Get Started
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2 text-sm text-blue-300">
              <Sparkles size={15} />
              AI-powered interview preparation
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Prepare smarter.
              <br />
              <span className="text-slate-400">
                Crack your next interview.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Practice coding problems, simulate real interviews,
              and use AI to understand exactly what you need to
              improve.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-7 py-3.5 font-semibold shadow-xl shadow-blue-500/20 transition hover:bg-blue-400 sm:w-auto"
              >
                Start Practicing
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#features"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white sm:w-auto"
              >
                Explore Features
              </a>
            </div>

            {/* Small trust line */}
            <div className="mt-7 flex items-center justify-center gap-2 text-sm text-slate-500">
              <CheckCircle2 size={15} className="text-blue-400" />
              Built for serious software engineering
              preparation
            </div>
          </div>

          {/* PRODUCT PREVIEW */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            {/* Glow */}
            <div className="absolute inset-x-20 top-10 h-40 rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c121e] shadow-2xl shadow-black/40">
              {/* Browser top */}
              <div className="flex h-11 items-center border-b border-white/[0.06] bg-[#0a101a] px-4">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                </div>

                <div className="mx-auto rounded-md border border-white/[0.05] bg-white/[0.02] px-20 py-1 text-[10px] text-slate-600">
                  app.hireprep.dev
                </div>

                <div className="w-12" />
              </div>

              {/* Fake dashboard */}
              <div className="grid min-h-[350px] grid-cols-12">
                {/* Sidebar */}
                <div className="hidden border-r border-white/[0.06] bg-[#0a111d] p-5 sm:block sm:col-span-3">
                  <div className="mb-8 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-blue-500" />
                    <span className="text-sm font-bold">
                      HirePrep
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400">
                      Dashboard
                    </div>

                    <div className="px-3 py-2 text-xs text-slate-500">
                      Problems
                    </div>

                    <div className="px-3 py-2 text-xs text-slate-500">
                      AI Interview
                    </div>
                  </div>
                </div>

                {/* Main */}
                <div className="col-span-12 p-6 sm:col-span-9">
                  <div className="mb-6">
                    <p className="text-xs text-slate-500">
                      YOUR PROGRESS
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Keep pushing forward.
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                      ["Problems Solved", "24"],
                      ["Current Streak", "7"],
                      ["Accuracy", "82%"],
                      ["Interviews", "5"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4"
                      >
                        <p className="text-[11px] text-slate-500">
                          {label}
                        </p>

                        <p className="mt-2 text-2xl font-bold">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3 lg:grid-cols-2">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">
                          Overall preparation
                        </p>

                        <span className="text-sm font-bold text-blue-400">
                          68%
                        </span>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full w-[68%] rounded-full bg-blue-500" />
                      </div>

                      <div className="mt-5 flex gap-2">
                        <div className="h-16 flex-1 rounded-lg bg-white/[0.03] p-3">
                          <p className="text-[10px] text-slate-500">
                            Easy
                          </p>
                          <p className="mt-1 font-bold">
                            18
                          </p>
                        </div>

                        <div className="h-16 flex-1 rounded-lg bg-white/[0.03] p-3">
                          <p className="text-[10px] text-slate-500">
                            Medium
                          </p>
                          <p className="mt-1 font-bold">
                            5
                          </p>
                        </div>

                        <div className="h-16 flex-1 rounded-lg bg-white/[0.03] p-3">
                          <p className="text-[10px] text-slate-500">
                            Hard
                          </p>
                          <p className="mt-1 font-bold">
                            1
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-5">
                      <p className="text-sm font-semibold">
                        Continue learning
                      </p>

                      <div className="mt-4 flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                        <div>
                          <p className="text-sm font-semibold">
                            Maximum Subarray
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Arrays · Medium
                          </p>
                        </div>

                        <ArrowRight
                          size={17}
                          className="text-slate-500"
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                        <div>
                          <p className="text-sm font-semibold">
                            Two Sum
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Arrays · Easy
                          </p>
                        </div>

                        <ArrowRight
                          size={17}
                          className="text-slate-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="border-y border-white/[0.06] bg-[#070d17]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Everything you need
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              One platform for your entire preparation.
            </h2>

            <p className="mt-4 text-slate-400">
              Stop jumping between random problem lists,
              interview platforms, and notes.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Code2 size={22} />}
              title="DSA Practice"
              description="Solve carefully selected coding problems across arrays, trees, graphs, DP, and more."
            />

            <FeatureCard
              icon={<Brain size={22} />}
              title="AI Mentor"
              description="Get intelligent hints, explanations, and feedback without immediately revealing the solution."
            />

            <FeatureCard
              icon={<Target size={22} />}
              title="Track Progress"
              description="Track solved problems, accuracy, streaks, weak topics, and overall preparation."
            />

            <FeatureCard
              icon={<Zap size={22} />}
              title="AI Code Review"
              description="Understand your code quality, complexity, mistakes, and possible improvements."
            />

            <FeatureCard
              icon={<Trophy size={22} />}
              title="Mock Interviews"
              description="Simulate technical interviews and practice solving problems under realistic conditions."
            />

            <FeatureCard
              icon={<FileText size={22} />}
              title="Resume & ATS"
              description="Analyze your resume and identify opportunities to improve your chances of getting shortlisted."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Simple process
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Turn preparation into a system.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-400">
                HirePrep is designed around the way strong
                candidates actually improve: practice, get
                feedback, identify weaknesses, and repeat.
              </p>

              <div className="mt-8">
                <Link
                  href="/login"
                  className="group inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 font-semibold transition hover:bg-blue-400"
                >
                  Build your preparation
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <Step
                number="01"
                title="Choose what to practice"
                description="Select problems based on difficulty, topic, and your current preparation."
              />

              <Step
                number="02"
                title="Solve and submit"
                description="Write your solution in the built-in coding environment and test it."
              />

              <Step
                number="03"
                title="Learn from feedback"
                description="Use AI-powered feedback to understand mistakes and improve your approach."
              />

              <Step
                number="04"
                title="Track your growth"
                description="Your progress is saved so you always know where you stand."
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE CTA */}
      <section id="practice" className="px-6 pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-blue-400/10 bg-[#0c1422]">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

          <div className="relative px-6 py-20 text-center sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <Play size={24} />
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Your next interview starts with your next problem.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Start building the skills and confidence you need
              to perform when the interview actually matters.
            </p>

            <div className="mt-8">
              <Link
                href="/login"
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-500 px-7 py-3.5 font-semibold shadow-xl shadow-blue-500/20 transition hover:bg-blue-400"
              >
                Start Practicing
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] bg-[#050a12]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-xs font-bold">
              &gt;_
            </div>

            <span className="font-semibold">HirePrep</span>

            <span className="text-xs text-slate-600">
              AI-powered interview preparation
            </span>
          </div>

          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} HirePrep. Built for
            ambitious engineers.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* --------------------------------
   Feature Card
-------------------------------- */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#0b121e] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-[#0d1522]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-500/15">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

/* --------------------------------
   Step
-------------------------------- */

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xs font-bold text-blue-400">
        {number}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}