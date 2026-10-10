"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Search,
  Mail,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Company = {
  id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  createdAt: string;
};

const companies: Company[] = [
  {
    id: "1",
    name: "TechNova Solutions",
    email: "contact@technova.com",
    status: "ACTIVE",
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    name: "CodeCraft Technologies",
    email: "info@codecraft.com",
    status: "ACTIVE",
    createdAt: "2026-02-10",
  },
  {
    id: "3",
    name: "NextGen Software",
    email: "hello@nextgen.com",
    status: "INACTIVE",
    createdAt: "2026-03-05",
  },
  {
    id: "4",
    name: "PixelSoft Limited",
    email: "support@pixelsoft.com",
    status: "ACTIVE",
    createdAt: "2026-03-18",
  },
  {
    id: "5",
    name: "DevSphere Technologies",
    email: "contact@devsphere.com",
    status: "BLOCKED",
    createdAt: "2026-04-02",
  },
  {
    id: "6",
    name: "CloudBridge Systems",
    email: "info@cloudbridge.com",
    status: "ACTIVE",
    createdAt: "2026-04-20",
  },
  {
    id: "7",
    name: "InnovateX",
    email: "hello@innovatex.com",
    status: "ACTIVE",
    createdAt: "2026-05-12",
  },
  {
    id: "8",
    name: "ByteWave Solutions",
    email: "support@bytewave.com",
    status: "INACTIVE",
    createdAt: "2026-06-01",
  },
  {
    id: "9",
    name: "DigitalPeak",
    email: "contact@digitalpeak.com",
    status: "ACTIVE",
    createdAt: "2026-06-15",
  },
  {
    id: "10",
    name: "WebNest Technologies",
    email: "info@webnest.com",
    status: "ACTIVE",
    createdAt: "2026-07-08",
  },
  {
    id: "11",
    name: "SmartStack Limited",
    email: "hello@smartstack.com",
    status: "BLOCKED",
    createdAt: "2026-08-14",
  },
  {
    id: "12",
    name: "FutureCode Labs",
    email: "contact@futurecode.com",
    status: "ACTIVE",
    createdAt: "2026-09-02",
  },
];

function getStatusClass(status: Company["status"]): string {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "INACTIVE":
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    case "BLOCKED":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  }
}

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 9;

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return companies;

    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(query) ||
        company.email.toLowerCase().includes(query),
    );
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCompanies.length / limit),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const activeCompanies = companies.filter(
    (company) => company.status === "ACTIVE",
  ).length;

  return (
    <div className="min-h-screen space-y-6 bg-muted/20 p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="size-7 text-primary" />

            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Companies
            </h1>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Explore and manage registered companies on Code Assess.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => handleSearch("")}
        >
          Reset Search
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Companies
              </p>
              <p className="mt-2 text-3xl font-bold">
                {companies.length}
              </p>
            </div>

            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Building2 className="size-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Active Companies
              </p>
              <p className="mt-2 text-3xl font-bold">
                {activeCompanies}
              </p>
            </div>

            <div className="rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <Users className="size-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Search Results
              </p>
              <p className="mt-2 text-3xl font-bold">
                {filteredCompanies.length}
              </p>
            </div>

            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Search className="size-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Find a Company</CardTitle>
          <CardDescription>
            Search by company name or email address.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search companies..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Company Cards */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            Registered Companies
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredCompanies.length} companies found
          </p>
        </div>

        {paginatedCompanies.length === 0 ? (
          <Card>
            <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
              <Building2 className="size-10 text-muted-foreground" />

              <h3 className="mt-4 font-semibold">
                No companies found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try a different company name or email.
              </p>

              <Button
                className="mt-4"
                variant="outline"
                onClick={() => handleSearch("")}
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedCompanies.map((company) => (
              <Card
                key={company.id}
                className="group flex h-full flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border bg-primary/5 text-primary">
                      <Building2 className="size-7" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <CardTitle className="line-clamp-2 text-lg">
                        {company.name}
                      </CardTitle>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Company Account
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Mail className="mt-0.5 size-4 shrink-0" />

                    <span className="break-all">
                      {company.email}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-2 border-t pt-4">
                    <span className="text-sm text-muted-foreground">
                      Account Status
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(company.status)}`}
                    >
                      {company.status}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground">
                    Joined{" "}
                    {new Date(company.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {filteredCompanies.length > limit && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * limit + 1}–
            {Math.min(currentPage * limit, filteredCompanies.length)} of{" "}
            {filteredCompanies.length}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() =>
                setPage((current) => Math.max(1, current - 1))
              }
            >
              <ChevronLeft className="mr-1 size-4" />
              Previous
            </Button>

            <span className="px-2 text-sm">
              {currentPage} / {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() =>
                setPage((current) =>
                  Math.min(totalPages, current + 1),
                )
              }
            >
              Next
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}