"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  CircleHelp,
  Code2,
  CreditCard,
  LifeBuoy,
  LockKeyhole,
  Mail,
  MessageCircle,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    title: "Getting Started",
    description: "Learn how to use Code Assess.",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-600",
    href: "/about",
  },
  //   {
  //     title: "Account & Security",
  //     description: "Manage your account and sign-in.",
  //     icon: ShieldCheck,
  //     color: "bg-green-500/10 text-green-600",
  //     href: "/profile",
  //   },
  //   {
  //     title: "Assessments",
  //     description: "Understand assessments and attempts.",
  //     icon: FileText,
  //     color: "bg-purple-500/10 text-purple-600",
  //     href: "/assessments",
  //   },
  {
    title: "Coding Problems",
    description: "Get help with coding challenges.",
    icon: Code2,
    color: "bg-orange-500/10 text-orange-600",
    href: "/problems",
  },
  {
    title: "Payments",
    description: "Learn about paid content and payments.",
    icon: CreditCard,
    color: "bg-pink-500/10 text-pink-600",
    href: "/problems",
  },
  {
    title: "Privacy & Security",
    description: "Learn how to protect your account.",
    icon: LockKeyhole,
    color: "bg-cyan-500/10 text-cyan-600",
    href: "/about",
  },
];

const faqs = [
  {
    category: "Getting Started",
    question: "What is Code Assess?",
    answer:
      "Code Assess is a platform for exploring coding problems and technical assessments. Candidates can practice their skills and review available assessment results.",
  },
  {
    category: "Getting Started",
    question: "How do I get started?",
    answer:
      "Create an account or sign in, explore the available problems and assessments, and choose a challenge that matches your interests.",
  },
  {
    category: "Account & Security",
    question: "How can I access my account?",
    answer:
      "Use the Login page to sign in with your registered account or an available supported sign-in provider.",
  },
  {
    category: "Account & Security",
    question: "What should I do if I forget my password?",
    answer:
      "Open the Login page and use the password recovery option if it is enabled for your account.",
  },
  {
    category: "Assessments",
    question: "How do I start an assessment?",
    answer:
      "Open the Assessments page, select an available assessment, and follow the instructions shown on its details page.",
  },
  {
    category: "Assessments",
    question: "Can I review my assessment results?",
    answer:
      "If your account and assessment provide result access, you can review your attempts and available results from the relevant dashboard.",
  },
  {
    category: "Coding Problems",
    question: "How can I practice coding problems?",
    answer:
      "Visit the Problems page, select a problem, review its description, and solve it using the supported workflow and programming language options.",
  },
  {
    category: "Payments",
    question: "What if my payment fails?",
    answer:
      "Check your payment status before trying again. If money was deducted but access was not granted, contact support with your payment reference. Never share your password or payment PIN.",
  },
  {
    category: "Privacy & Security",
    question: "How can I keep my account secure?",
    answer:
      "Use a strong password, keep your sign-in information private, and never share authentication codes or payment PINs with anyone.",
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero and Search */}
      <section className="relative overflow-hidden border-b bg-muted/30">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-10 size-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LifeBuoy className="size-8" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Code Assess Support
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            How Can We Help You?
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">
            Find answers to common questions about your account, coding
            problems, assessments, and payments.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            Popular topics: assessments, account, payments, coding
          </p>
        </div>
      </section>

      {/* Help Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Browse Topics
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            What Do You Need Help With?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Choose a category to find the information you need.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                href={category.href}
                key={category.title}
                className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${category.color}`}
                    >
                      <Icon className="size-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{category.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {category.description}
                      </p>
                      <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                        Explore topic
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="help-faq" className="border-y bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CircleHelp className="size-6" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Help & Answers
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Browse common questions or search for a specific topic.
            </p>
          </div>

          {/* Category Filters */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {["All", ...categories.map((category) => category.title)].map(
              (category) => (
                <Button
                  key={category}
                  type="button"
                  size="sm"
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenFaq(null);
                  }}
                >
                  {category}
                </Button>
              ),
            )}
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const originalIndex = faqs.indexOf(faq);
              const isOpen = openFaq === originalIndex;

              return (
                <Card key={faq.question} className="overflow-hidden">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : originalIndex)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/50 sm:p-6"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-muted-foreground transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t px-5 py-5 sm:px-6">
                      <p className="text-sm leading-7 text-muted-foreground">
                        {faq.answer}
                      </p>
                      <p className="mt-3 text-xs font-medium text-primary">
                        {faq.category}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}

            {filteredFaqs.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center px-6 py-12 text-center">
                  <Search className="mb-4 size-10 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No Results Found</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    Try another search term or select a different category.
                  </p>
                  <Button
                    className="mt-5"
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                      setOpenFaq(0);
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="overflow-hidden rounded-2xl">
          <CardContent className="grid gap-8 p-6 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageCircle className="size-6" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Still Need Help?
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                Could not find your answer? Visit our contact page or send your
                question to the support team.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button>
                <Link href="/contact" className="flex items-center">
                  <Mail className="mr-2 size-4" />
                  Contact Support
                </Link>
              </Button>

              <Button variant="outline">
                <Link href="/faq" className="flex items-center">
                  <CircleHelp className="mr-2 size-4" />
                  Visit FAQ
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Bottom Help Links */}
      <section className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>Need more information? Explore these resources.</p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/about"
              className="transition-colors hover:text-primary"
            >
              About Us
            </Link>
            <Link href="/faq" className="transition-colors hover:text-primary">
              FAQ
            </Link>
            <Link
              href="/problems"
              className="transition-colors hover:text-primary"
            >
              Problems
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
