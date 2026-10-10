"use client";

import {
  Target,
  Eye,
  Code2,
  Users,
  Trophy,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Braces,
  Lightbulb,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const features = [
  {
    icon: Code2,
    title: "Coding Assessments",
    description:
      "Practice coding problems and evaluate your programming skills through structured assessments.",
  },
  {
    icon: Users,
    title: "Company Connections",
    description:
      "Help companies discover talented developers through skill-based assessments.",
  },
  {
    icon: Trophy,
    title: "Track Your Progress",
    description:
      "Review your assessment results and identify areas where you can improve.",
  },
  {
    icon: ShieldCheck,
    title: "Fair Evaluation",
    description:
      "Support a transparent assessment process focused on skills and performance.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "We believe every assessment is an opportunity to learn, practice, and improve.",
  },
  {
    icon: Target,
    title: "Skill First",
    description:
      "We aim to help people demonstrate their abilities through practical assessments.",
  },
  {
    icon: Rocket,
    title: "Growth and Opportunity",
    description:
      "We want to make it easier for developers and companies to discover new opportunities.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-muted/30">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Braces className="size-8" />
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              About Code Assess
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Skills That Open
              <span className="block text-primary">
                New Opportunities
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Code Assess is a developer assessment platform designed
              to help candidates practice their skills and help
              companies evaluate technical abilities through
              structured assessments.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Who We Are
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Making Skill Assessment More Accessible
          </h2>

          <p className="mt-5 leading-7 text-muted-foreground">
            Code Assess aims to create a place where developers can
            demonstrate their technical skills and companies can
            evaluate candidates in a more organized way.
          </p>

          <p className="mt-4 leading-7 text-muted-foreground">
            Whether you are preparing for your next career opportunity
            or looking for skilled developers, our goal is to make
            the assessment journey easier to navigate.
          </p>

          <div className="mt-7 space-y-3">
            {[
              "Practice and improve technical skills",
              "Evaluate performance through assessments",
              "Connect technical ability with opportunities",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm sm:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="overflow-hidden border-0 bg-primary text-primary-foreground shadow-xl">
          <CardContent className="p-8 sm:p-10">
            <div className="flex size-14 items-center justify-center rounded-xl bg-white/15">
              <Code2 className="size-7" />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Built for Developers and Companies
            </h3>

            <p className="mt-4 leading-7 text-primary-foreground/80">
              We want to bring candidates and companies together through
              a structured assessment experience that values learning,
              technical ability, and continuous improvement.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                <Users className="size-6" />
                <p className="mt-3 font-semibold">Candidates</p>
                <p className="mt-1 text-sm text-primary-foreground/75">
                  Practice and grow
                </p>
              </div>

              <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                <ShieldCheck className="size-6" />
                <p className="mt-3 font-semibold">Companies</p>
                <p className="mt-1 text-sm text-primary-foreground/75">
                  Assess technical skills
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Mission and Vision */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <Card className="border-border/70 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-7 sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="size-6" />
              </div>

              <h3 className="mt-5 text-xl font-bold">Our Mission</h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                To provide an accessible platform where developers can
                demonstrate their abilities, improve their skills, and
                prepare for professional opportunities through
                structured assessments.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-7 sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Eye className="size-6" />
              </div>

              <h3 className="mt-5 text-xl font-bold">Our Vision</h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                To become a trusted platform for technical assessments,
                helping developers grow and enabling companies to
                identify talent based on skills and performance.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            What We Offer
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything Focused on Skills
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Tools and experiences designed to support technical
            assessment, learning, and professional growth.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group border-border/70 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Core Values */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Values
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              What Guides Us
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              The principles behind our approach to technical
              assessments and developer growth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border bg-background p-7 transition-shadow hover:shadow-md"
                >
                  <Icon className="size-8 text-primary" />

                  <h3 className="mt-5 text-lg font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <div className="absolute -right-10 -top-16 size-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-10 size-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative mx-auto max-w-2xl">
            <Rocket className="mx-auto size-10" />

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              We’re Just Getting Started
            </h2>

            <p className="mt-5 leading-7 text-primary-foreground/80">
              Code Assess is growing. We look forward to introducing
              more features, welcoming more companies, and creating
              new opportunities for developers.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
              <span className="size-2 rounded-full bg-green-400" />
              More opportunities coming soon
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}