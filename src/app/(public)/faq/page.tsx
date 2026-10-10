"use client";

import {
  HelpCircle,
  Search,
  MessageCircle,
  Code2,
  Users,
  CreditCard,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type FAQ = {
  question: string;
  answer: string;
};

type FAQCategory = {
  title: string;
  description: string;
  icon: typeof HelpCircle;
  questions: FAQ[];
};

const faqCategories: FAQCategory[] = [
  {
    title: "General",
    description: "Learn about Code Assess",
    icon: HelpCircle,
    questions: [
      {
        question: "What is Code Assess?",
        answer:
          "Code Assess is a developer assessment platform designed to help candidates practice technical skills and help companies evaluate candidates through structured assessments.",
      },
      {
        question: "Who can use Code Assess?",
        answer:
          "Code Assess is designed for candidates who want to improve their technical skills, companies that want to evaluate talent, and administrators who manage the platform.",
      },
      {
        question: "Is Code Assess suitable for beginners?",
        answer:
          "Yes. Developers at different skill levels can use coding problems and assessments to practice, learn, and track their progress.",
      },
      {
        question: "Do I need programming experience to join?",
        answer:
          "Some assessments may require programming knowledge. You can choose problems and assessments that match your current skill level.",
      },
    ],
  },
  {
    title: "Assessments",
    description: "Questions about tests and coding",
    icon: Code2,
    questions: [
      {
        question: "How do I start an assessment?",
        answer:
          "Sign in to your candidate account, browse the available assessments, open one that interests you, and follow its instructions to begin.",
      },
      {
        question: "Can I practice coding problems?",
        answer:
          "Yes. Browse the Problems section to explore available coding challenges and practice your programming skills.",
      },
      {
        question: "Can I review my assessment results?",
        answer:
          "Your available results and attempt history can be viewed from your candidate dashboard after the relevant assessment has been evaluated.",
      },
      {
        question: "Can I retake an assessment?",
        answer:
          "Retakes depend on the assessment settings and platform rules. Check the assessment details or contact the responsible company for clarification.",
      },
      {
        question: "What happens if I leave an assessment?",
        answer:
          "Your attempt may remain in progress or be affected by the assessment's time limit and rules. Read the instructions before starting and avoid leaving the assessment unnecessarily.",
      },
    ],
  },
  {
    title: "Companies",
    description: "For employers and organizations",
    icon: Users,
    questions: [
      {
        question: "How can a company use Code Assess?",
        answer:
          "Companies can use the platform's assessment features to evaluate technical skills and support their candidate evaluation process.",
      },
      {
        question: "Will more companies join Code Assess?",
        answer:
          "Yes, we aim to welcome more companies over time. Stay tuned for updates as the platform continues to grow.",
      },
      {
        question: "Can companies evaluate candidates' skills?",
        answer:
          "The platform is designed to support skill-based evaluation through assessments. Available features depend on the company's account permissions.",
      },
    ],
  },
  {
    title: "Payments",
    description: "Access and payment questions",
    icon: CreditCard,
    questions: [
      {
        question: "Are all assessments free?",
        answer:
          "Not necessarily. Some assessments or problems may be free, while others may require payment. Check the displayed price and access details before proceeding.",
      },
      {
        question: "How can I access paid content?",
        answer:
          "Open the relevant paid item and follow the available payment instructions. Access should be available according to the platform's payment and verification process.",
      },
      {
        question: "What should I do if my payment fails?",
        answer:
          "Check your payment status before trying again. If money was deducted but access was not granted, keep your transaction details and contact the platform support team.",
      },
    ],
  },
  {
    title: "Account & Security",
    description: "Account access and privacy",
    icon: ShieldCheck,
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "Open the registration page, enter the requested information, and follow the verification steps. You may also use Google sign-in if it is available.",
      },
      {
        question: "Can I sign in with Google?",
        answer:
          "Google sign-in is available when enabled on the platform. Choose the Google login option and follow the prompts.",
      },
      {
        question: "What if I forget my password?",
        answer:
          "Use the Forgot Password option on the login page, then follow the instructions sent to your registered email address.",
      },
      {
        question: "How do I keep my account secure?",
        answer:
          "Use a strong, unique password, keep your login information private, and always sign out when using a shared device.",
      },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...faqCategories.map((item) => item.title)];

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqCategories
      .filter(
        (category) =>
          activeCategory === "All" ||
          category.title === activeCategory,
      )
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query),
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [search, activeCategory]);

  const totalQuestions = faqCategories.reduce(
    (total, category) => total + category.questions.length,
    0,
  );

  const visibleQuestions = filteredCategories.reduce(
    (total, category) => total + category.questions.length,
    0,
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-muted/30">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 md:py-24">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <HelpCircle className="size-8" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Help Center
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently Asked
            <span className="block text-primary">Questions</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground sm:text-lg">
            Find answers to common questions about Code Assess,
            coding assessments, company accounts, payments, and security.
          </p>

          {/* <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search your question..."
              className="h-12 rounded-xl bg-background pl-12 shadow-sm"
            />
          </div> */}

          <p className="mt-4 text-sm text-muted-foreground">
            {visibleQuestions} of {totalQuestions} questions displayed
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Categories */}
        {filteredCategories.length === 0 ? (
          <Card>
            <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
              <Search className="size-10 text-muted-foreground" />

              <h2 className="mt-4 text-lg font-semibold">
                No questions found
              </h2>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Try another keyword or choose a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-sm font-semibold text-primary hover:underline"
              >
                Clear filters
              </button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-10">
            {filteredCategories.map((category) => {
              const Icon = category.icon;

              return (
                <div key={category.title} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">
                        {category.title}
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <Card className="overflow-hidden border-border/70 shadow-sm">
                    <CardContent className="p-4 sm:p-6">
                      <Accordion
       
                        className="w-full"
                      >
                        {category.questions.map((faq, index) => (
                          <AccordionItem
                            key={faq.question}
                            value={`${category.title}-${index}`}
                          >
                            <AccordionTrigger className="gap-4 py-5 text-left text-sm font-medium hover:no-underline sm:text-base">
                              {faq.question}
                            </AccordionTrigger>

                            <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-16">
          <Card className="overflow-hidden border-0 bg-primary text-primary-foreground shadow-lg">
            <CardContent className="flex flex-col items-center justify-between gap-6 p-8 text-center sm:p-10 md:flex-row md:text-left">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <MessageCircle className="size-7" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Still have questions?
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-primary-foreground/80">
                    We’re working to make your Code Assess experience
                    better. Check back for more helpful information.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 text-sm font-semibold">
                More updates coming soon
                <ChevronRight className="size-4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}