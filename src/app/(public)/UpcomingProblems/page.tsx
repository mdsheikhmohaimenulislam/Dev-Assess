
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Code2,
  FileCheck2,
  GitBranch,
  Languages,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Trophy,
  Users,
  Zap,
  Database,
  GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  { label: "Coding Problems", value: "500+", icon: Code2 },
  { label: "Assessments", value: "100+", icon: FileCheck2 },
  { label: "Companies", value: "50+", icon: BriefcaseBusiness },
  { label: "Candidates", value: "1,000+", icon: Users },
];

const features = [
  {
    icon: Code2,
    title: "Coding Challenges",
    description:
      "Practice programming problems across multiple languages and difficulty levels.",
  },
  {
    icon: FileCheck2,
    title: "Online Assessments",
    description:
      "Take structured assessments to test your technical knowledge and coding skills.",
  },
  {
    icon: Zap,
    title: "Track Your Progress",
    description:
      "Review your attempts and results to understand where you can improve.",
  },
  {
    icon: ShieldCheck,
    title: "Structured Evaluation",
    description:
      "A structured assessment experience designed for candidates and hiring teams.",
  },
];

const steps = [
  {
    number: "01",
    icon: GraduationCap,
    title: "Create Your Account",
    description:
      "Sign in and set up your profile to get started with Code Assess.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Explore Assessments",
    description:
      "Browse available assessments and coding problems that match your interests.",
  },
  {
    number: "03",
    icon: Target,
    title: "Take the Challenge",
    description:
      "Complete your assessment and submit your answers within the given time.",
  },
  {
    number: "04",
    icon: Trophy,
    title: "Review Your Results",
    description:
      "Review your results and use your progress to prepare for future challenges.",
  },
];

const problems = [
  {
    title: "Find the Maximum Number",
    description: "Find the largest number in an array of integers.",
    difficulty: "EASY",
    language: "JavaScript",
    badge: "bg-green-500/10 text-green-600",
  },
  {
    title: "Reverse a String",
    description: "Reverse a string using your own logic.",
    difficulty: "MEDIUM",
    language: "TypeScript",
    badge: "bg-amber-500/10 text-amber-600",
  },
  {
    title: "Two Sum Problem",
    description: "Find two numbers whose sum matches a target.",
    difficulty: "HARD",
    language: "Python",
    badge: "bg-red-500/10 text-red-600",
  },
];

const assessments = [
  {
    title: "Frontend Development",
    description: "Test your HTML, CSS, JavaScript, and React knowledge.",
    duration: "45 minutes",
    questions: "20 questions",
    level: "Beginner",
    icon: Code2,
  },
  {
    title: "JavaScript Fundamentals",
    description: "Evaluate your JavaScript concepts and logical thinking.",
    duration: "30 minutes",
    questions: "15 questions",
    level: "Intermediate",
    icon: Zap,
  },
  {
    title: "Problem Solving",
    description: "Practice logical thinking and algorithmic skills.",
    duration: "60 minutes",
    questions: "25 questions",
    level: "Advanced",
    icon: Target,
  },
];

const companyBenefits = [
  "Evaluate technical skills with structured assessments",
  "Manage candidate assessment activities",
  "Review results to support hiring decisions",
];

const reasons = [
  {
    icon: Target,
    title: "Focused Practice",
    description:
      "Work through coding problems to build programming knowledge step by step.",
  },
  {
    icon: ShieldCheck,
    title: "Structured Evaluation",
    description:
      "Use organized assessments to evaluate technical knowledge consistently.",
  },
  {
    icon: Trophy,
    title: "Progress & Growth",
    description:
      "Review available results and use your experience to prepare for future challenges.",
  },
];

const upcomingTopics = [
  {
    icon: Code2,
    title: "Advanced Algorithms",
    description:
      "Practice sorting, searching, recursion, and algorithmic problem-solving.",
  },
  {
    icon: Database,
    title: "Database Challenges",
    description:
      "Explore SQL queries, data relationships, and database fundamentals.",
  },
  {
    icon: GitBranch,
    title: "Data Structures",
    description:
      "Learn to solve problems using arrays, stacks, queues, and trees.",
  },
];

export default function UpcomingProblems() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      {/* 1. HERO SECTION */}
      {/* <section className="relative border-b">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_60%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <Sparkles className="size-4 text-primary" />
              Your journey to better skills starts here
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Test Your Skills.
              <span className="block text-primary">
                Build Your Future.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Code Assess helps candidates practice coding, take online
              assessments, and track their progress. Discover opportunities
              to learn, improve, and showcase your skills.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" >
                <Link href="/assessments">
                  Explore Assessments
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" >
                <Link href="/problems">
                  Practice Coding
                  <Code2 className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Multiple programming languages
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Progress tracking
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />

            <Card className="overflow-hidden rounded-2xl shadow-xl">
              <div className="flex items-center justify-between border-b px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Code2 className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Coding Assessment</p>
                    <p className="text-xs text-muted-foreground">
                      Sample assessment preview
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                  Practice
                </span>
              </div>

              <CardContent className="space-y-5 p-5 sm:p-6">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">2 of 5 questions</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-2/5 rounded-full bg-primary" />
                  </div>
                </div>

                <div className="rounded-xl border bg-muted/30 p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Problem 02
                    </span>
                    <span className="rounded-md bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600">
                      Medium
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold">
                    Find the Maximum Number
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Given an array of numbers, find and return the largest
                    value in the array.
                  </p>

                  <div className="mt-5 space-y-2 rounded-lg bg-slate-950 p-4 font-mono text-sm text-slate-200">
                    <p className="text-slate-500">// Example</p>
                    <p>
                      Input: <span className="text-emerald-400">[3, 8, 2, 9]</span>
                    </p>
                    <p>
                      Output: <span className="text-emerald-400">9</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Award className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      Every challenge counts
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Learn, practice, and keep improving.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* 2. PLATFORM STATS */}
      {/* <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Platform
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything in One Place
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Explore coding challenges and assessments in one convenient
            platform.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.label}
                className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <p className="text-2xl font-bold sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Sample statistics. Replace these values with actual platform data.
        </p>
      </section> */}

      {/* 3. FEATURES */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Grow
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Practice your skills, take assessments, and understand your
              progress.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="h-full bg-background transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <CardTitle className="text-lg">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="leading-6">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Four Steps to Get Started
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Start learning with a clear process from account creation to
            reviewing your results.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl border bg-background text-primary shadow-sm">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-sm font-semibold tracking-widest text-primary">
                    STEP {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. POPULAR CODING PROBLEMS */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Practice & Improve
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Popular Coding Problems
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Improve your programming skills by solving coding challenges
                at different difficulty levels.
              </p>
            </div>
            <Button variant="outline" >
              <Link href="/problems" className="flex items-center">
                View All Problems
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <Card
                key={problem.title}
                className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Code2 className="size-5" />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${problem.badge}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <CardTitle className="pt-3 text-lg">
                    {problem.title}
                  </CardTitle>
                  <CardDescription className="min-h-12 leading-6">
                    {problem.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Languages className="size-4" />
                      {problem.language}
                    </span>
                    <Button variant="ghost" size="sm" >
                      <Link href="/problems" className="flex items-center">
                        Solve Problem
                        <ArrowUpRight className="ml-1 size-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            These are sample problems for the homepage. Connect your problems
            API to display actual data.
          </p>
        </div>
      </section>

      {/* 6. ASSESSMENT HIGHLIGHTS */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Test Your Skills
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Assessments
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Challenge yourself with structured assessments and track your
              learning progress.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assessments.map((assessment) => {
              const Icon = assessment.icon;

              return (
                <Card
                  key={assessment.title}
                  className="flex h-full flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-6" />
                      </div>
                      <span className="rounded-full border px-3 py-1 text-xs font-medium">
                        {assessment.level}
                      </span>
                    </div>
                    <CardTitle className="pt-3 text-xl">
                      {assessment.title}
                    </CardTitle>
                    <CardDescription className="leading-6">
                      {assessment.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="mt-auto">
                    <div className="flex flex-wrap gap-4 border-t py-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Clock3 className="size-4" />
                        {assessment.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <FileCheck2 className="size-4" />
                        {assessment.questions}
                      </span>
                    </div>
                    <Button className="w-full" >
                      <Link href="/assessments" className="flex items-center">
                        View Assessments
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Assessment details above are sample content, not live assessment data.
          </p>
        </div>
      </section>

      {/* 7. FOR COMPANIES */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BriefcaseBusiness className="size-7" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              For Companies
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Find the Right Talent with Code Assess
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              Make technical candidate evaluation more organized. Use
              assessments to understand candidates' coding knowledge and
              technical skills during your hiring process.
            </p>

            <div className="mt-7 space-y-4">
              {companyBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <p className="text-sm leading-6">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" >
                <Link href="/companies" className="flex items-center">
                  Explore Companies
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" >
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden rounded-2xl shadow-lg">
            <div className="border-b bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Candidate Evaluation</h3>
                  <p className="text-sm text-muted-foreground">
                    Sample hiring workflow
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="space-y-5 p-6">
              {[
                {
                  label: "Technical Knowledge",
                  value: "Assess relevant skills",
                  icon: BookOpen,
                },
                {
                  label: "Coding Ability",
                  value: "Review problem-solving",
                  icon: Code2,
                },
                {
                  label: "Assessment Results",
                  value: "Review submitted work",
                  icon: Trophy,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex items-center gap-4 rounded-xl border p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                    <CheckCircle2 className="ml-auto size-5 shrink-0 text-primary" />
                  </div>
                );
              })}
              <p className="text-xs leading-5 text-muted-foreground">
                Illustrative workflow. Actual features depend on your
                configured backend.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 8. WHY CHOOSE CODE ASSESS */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why Code Assess?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Your Skills Deserve to Grow
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A focused environment to practice coding, take assessments,
              and work toward your technical goals.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <Card
                  key={reason.title}
                  className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <CardTitle className="text-xl">
                      {reason.title}
                    </CardTitle>
                    <CardDescription className="leading-7">
                      {reason.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. UPCOMING PROBLEMS BANNER */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border bg-slate-950 text-white">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 size-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative grid items-center gap-10 p-7 sm:p-10 md:p-14 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
                <Sparkles className="size-4" />
                Upcoming Problems
              </div>

              <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Something Exciting Is Coming!
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-slate-300">
                We are preparing new coding challenges to help you improve
                your programming skills. Stay tuned for upcoming problems.
              </p>

              <div className="mt-8">
                <Button >
                  <Link href="/problems" className="flex items-center">
                    Explore Problems
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-yellow-400" />
                  <span className="size-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-slate-400">
                    upcoming-problem.js
                  </span>
                </div>

                <div className="space-y-4 py-6 font-mono text-sm">
                  <p className="text-slate-500">
                     New challenges are coming
                  </p>
                  <p>
                    <span className="text-purple-300">const</span>{" "}
                    <span className="text-cyan-300">future</span> ={" "}
                    <span className="text-amber-200">
                      &quot;Your next challenge&quot;
                    </span>
                    ;
                  </p>
                  <p>
                    <span className="text-purple-300">await</span>{" "}
                    <span className="text-green-300">newProblems</span>();
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-400/15 text-indigo-300">
                    <Terminal className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Coming Soon</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Learn. Practice. Improve.
                    </p>
                  </div>
                  <Code2 className="ml-auto size-5 text-cyan-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* 5. CTA Section */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-4 -top-12 size-48 rounded-full border border-white/10" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm">
                <Sparkles className="size-4" />
                Your next challenge awaits
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Take the Next Step?
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-primary-foreground/80">
                Explore coding problems, discover assessments, and take the
                next step in your learning journey with Code Assess.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
  

              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
          
              >
                <Link href="/problems">Browse Problems</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
