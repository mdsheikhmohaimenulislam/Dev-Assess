"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface PaginationProps {
  meta: PaginationMeta;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isFetching?: boolean;
}

export default function Pagination({
  meta,
  page,
  setPage,
  isFetching = false,
}: PaginationProps) {
  // Dynamic page numbers
  const getPageNumbers = (): (number | "...")[] => {
    const totalPages = meta.totalPages;

    if (totalPages <= 0) {
      return [];
    }

    // 1 - 5 pages
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    // Current page near beginning
    if (page <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    // Current page near end
    if (page >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Current page in middle
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  // Don't show pagination for one page
  if (meta.totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Info */}
      <p className="text-sm text-muted-foreground">
        Showing page {meta.page} of {meta.totalPages}
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1 || isFetching}
          onClick={() => setPage((currentPage) => currentPage - 1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNumber) => {
            if (pageNumber === "...") {
              return (
                <span
                  key={`ellipsis-${pageNumber}`}
                  className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
                >
                  ...
                </span>
              );
            }

            return (
              <Button
                key={pageNumber}
                variant={pageNumber === page ? "default" : "outline"}
                size="sm"
                className="h-9 w-9"
                disabled={isFetching}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          disabled={page >= meta.totalPages || isFetching}
          onClick={() => setPage((currentPage) => currentPage + 1)}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
