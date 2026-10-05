"use client";

import { Building2 } from "lucide-react";

import { useGetAllCompanies } from "@/components/hooks/company.hook";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DeleteCompany from "./DeleteCompany";

interface CompanyListProps {
  basePath: "/admin" | "/company";
}

export default function CompanyList({ basePath }: CompanyListProps) {
  const { data, isLoading, isError } = useGetAllCompanies();

  if (isLoading) {
    return (
      <div className="rounded-xl border">
        <div className="p-6 text-center text-sm text-muted-foreground">
          Loading companies...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-sm text-destructive">
          Failed to load companies.
        </p>
      </div>
    );
  }

  const companies = data?.data ?? [];

  if (companies.length === 0) {
    return (
      <div className="rounded-xl border bg-muted/30 p-10 text-center">
        <Building2 className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

        <h3 className="text-lg font-semibold">No companies found</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          There are no registered companies available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                {/* Logo */}
                <TableCell>
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={`${company.companyName} logo`}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </TableCell>

                {/* Company Name */}
                <TableCell>
                  <div>
                    <p className="font-medium">{company.companyName}</p>

                    <p className="text-xs text-muted-foreground">
                      ID: {company.id.slice(0, 8)}
                    </p>
                  </div>
                </TableCell>

                {/* Description */}
                <TableCell>
                  <p className="max-w-xs truncate text-sm text-muted-foreground">
                    {company.description || "N/A"}
                  </p>
                </TableCell>

                {/* Website */}
                <TableCell>
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-40 truncate text-sm text-primary hover:underline"
                    >
                      Visit Website
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      N/A
                    </span>
                  )}
                </TableCell>

                {/* User ID */}
                <TableCell>
                  <span className="font-mono text-xs">
                    {company.userId.slice(0, 8)}
                  </span>
                </TableCell>

                {/* Created At */}
                <TableCell>
                  <span className="text-sm">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>

                {/* Updated At */}
                <TableCell>
                  <span className="text-sm">
                    {new Date(company.updatedAt).toLocaleDateString()}
                  </span>
                </TableCell>

                {/* Delete */}
                <TableCell className="text-right">
                  {basePath === "/admin" && (
                    <DeleteCompany id={company.id} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}