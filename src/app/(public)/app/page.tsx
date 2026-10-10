
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  FileCheck2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
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
  {
    label: "Coding Problems",
    value: "500+",
    icon: Code2,
  },
  {
    label: "Assessments",
    value: "100+",
    icon: FileCheck2,
  },
  {
    label: "Companies",
    value: "50+",
    icon: BriefcaseBusiness,
  },
  {
    label: "Candidates",
    value: "1,000+",
    icon: Users,
  },
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
      "Review your attempts, check your results, and understand where you can improve.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Evaluation",
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
      "Check your assessment results and use your progress to prepare for the next challenge.",
  },
];

export default function HomeApp() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      {/* 1. Hero Section */}
      <section className="relative border-b">
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_60%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <Sparkles className="size-4 text-primary" />
              <span>Your journey to better skills starts here</span>
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Test Your Skills.
              <span className="block text-primary">Build Your Future.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Code Assess helps candidates practice coding, take online
              assessments, and track their progress. Discover opportunities to
              learn, improve, and showcase your skills.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">


              <Button size="lg" variant="outline">
                <Link href="/problems" className="flex justify-center items-center" >
                  Practice Coding
                  <Code2 className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
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

          {/* Hero Preview Card */}
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
                    <p className="text-slate-500">  Example</p>
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

            <div className="absolute -right-2 top-12 hidden items-center gap-2 rounded-xl border bg-background p-3 shadow-lg sm:flex sm:-right-5">
              <CheckCircle2 className="size-5 text-green-500" />
              <span className="text-sm font-medium">Keep improving!</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Platform Stats Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
          Sample statistics for the homepage. Replace these values with real
          platform data when your API is ready.
        </p>
      </section>

      {/* 3. Features Section */}
      {/* <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Grow
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A simple way to practice your skills, take assessments, and
              understand your progress.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="h-full border-border/70 bg-background transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
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
      </section> */}

      {/* 4. How It Works Section */}
      {/* <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
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
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                {index !== steps.length - 1 && (
                  <div className="absolute left-14 top-6 hidden h-px w-[calc(100%-2rem)] bg-border lg:block" />
                )}

                <div className="relative mb-5 flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-background text-primary shadow-sm">
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
      </section> */}


    </main>
  );
}
