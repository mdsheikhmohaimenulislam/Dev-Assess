import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";

const quickLinks = [

  { name: "Problems", href: "/problems" },
  { name: "Companies", href: "/companies" },
  { name: "About Us", href: "/about" },
];

const supportLinks = [
  { name: "Help Center", href: "/help-center" },
  { name: "FAQ", href: "/faq" },

];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.06),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.06),transparent_35%)]" />

      <div className="container relative mx-auto px-5 py-16">
        {/* Top Grid */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                <Code2 className="h-5 w-5" />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Code Assess
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              A modern coding assessment platform designed to help companies
              evaluate technical skills and help candidates demonstrate their
              coding abilities.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                <FaGithub className="h-4 w-4" />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </Link>

              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                <FaFacebookF className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Support
            </h3>

            <ul className="mt-5 space-y-3">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Get in Touch
            </h3>

            <div className="mt-5 space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <span>support@codeassess.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>Bangladesh</span>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                <span>Secure & Reliable Assessments</span>
              </div>
            </div>

            {/* CTA Card */}
            <div className="mt-6 rounded-2xl border bg-gradient-to-br from-primary/5 to-primary/10 p-5">
              <h4 className="font-semibold text-foreground">
                Ready to Get Started?
              </h4>

              <p className="mt-2 text-sm leading-5 text-muted-foreground">
                Explore coding assessments and showcase your technical skills.
              </p>

              <Link
                href="/problems"
                className="group mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:shadow-lg"
              >
                Explore Problem
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-border" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Code Assess. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/help-center"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Help
            </Link>

            <Link
              href="/faq"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}