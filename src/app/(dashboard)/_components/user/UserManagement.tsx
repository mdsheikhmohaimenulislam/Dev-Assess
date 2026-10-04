
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useGetAllUsers } from "@/components/hooks/user.hook";
import type { UserRole } from "@/components/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "BLOCKED"
  | "DELETED";

interface UserManagementProps {
  basePath: "/admin" | "/company";
}

export default function UserManagement({
  basePath,
}: UserManagementProps) {
  const router = useRouter();

  const [page, setPage] = useState(1);

  // Search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Filters
  const [role, setRole] = useState<UserRole | undefined>();
  const [status, setStatus] = useState<UserStatus | undefined>();

  const limit = 10;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // Fetch users
  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useGetAllUsers({
    page,
    limit,
    search: debouncedSearch || undefined,
    role,
    status,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const users = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const getStatusVariant = (
    userStatus: UserStatus,
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (userStatus) {
      case "ACTIVE":
        return "default";

      case "BLOCKED":
      case "DELETED":
        return "destructive";

      case "INACTIVE":
        return "secondary";

      default:
        return "outline";
    }
  };

  // Loading
  if (isLoading) {
    return (
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            User Management
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage all registered users.
          </p>
        </div>

        <Card>
          <CardContent className="flex min-h-40 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading users...
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  // Error
  if (isError) {
    return (
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            User Management
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage all registered users.
          </p>
        </div>

        <Card>
          <CardContent className="flex min-h-40 flex-col items-center justify-center">
            <p className="font-medium text-destructive">
              Failed to load users.
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Please try again later.
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          User Management
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage all registered users.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row">
            {/* Search */}
            <div className="relative md:max-w-sm">
              <Input
                type="search"
                placeholder="Search by name or email..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                className="w-full"
              />

              {isFetching && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  Searching...
                </span>
              )}
            </div>

            {/* Role Filter */}
            <Select
              value={role ?? "ALL"}
              onValueChange={(value) => {
                setRole(
                  value === "ALL"
                    ? undefined
                    : (value as UserRole),
                );

                setPage(1);
              }}
            >
              <SelectTrigger className="md:w-45">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">
                  All Roles
                </SelectItem>

                <SelectItem value="ADMIN">
                  Admin
                </SelectItem>

                <SelectItem value="COMPANY">
                  Company
                </SelectItem>

                <SelectItem value="CANDIDATE">
                  Candidate
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={status ?? "ALL"}
              onValueChange={(value) => {
                setStatus(
                  value === "ALL"
                    ? undefined
                    : (value as UserStatus),
                );

                setPage(1);
              }}
            >
              <SelectTrigger className="md:w-45">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">
                  All Status
                </SelectItem>

                <SelectItem value="ACTIVE">
                  Active
                </SelectItem>

                <SelectItem value="INACTIVE">
                  Inactive
                </SelectItem>

                <SelectItem value="BLOCKED">
                  Blocked
                </SelectItem>

                <SelectItem value="DELETED">
                  Deleted
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* User Table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">
                        {user.role}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={getStatusVariant(
                          user.status,
                        )}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {new Date(
                        user.createdAt,
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(
                            `${basePath}/users/${user.id}`,
                          )
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {users.length === 0 && (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No users found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPage}
          </p>

          <div className="flex gap-2">
            {/* Previous */}
            <Button
              type="button"
              variant="outline"
              disabled={page === 1 || isFetching}
              onClick={() =>
                setPage(
                  (currentPage) => currentPage - 1,
                )
              }
            >
              Previous
            </Button>

            {/* Next */}
            <Button
              type="button"
              variant="outline"
              disabled={
                page >= meta.totalPage || isFetching
              }
              onClick={() =>
                setPage(
                  (currentPage) => currentPage + 1,
                )
              }
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
