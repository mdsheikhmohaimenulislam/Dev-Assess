"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssessmentFiltersProps {
  search: string;
  status: string;
  accessType: string;

  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
  setAccessType: (value: string) => void;
}

export default function AssessmentFilters({
  search,
  status,
  accessType,
  setSearch,
  setStatus,
  setAccessType,
}: AssessmentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search assessments..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full md:w-45">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>
          <SelectItem value="DRAFT">Draft</SelectItem>
          <SelectItem value="PUBLISHED">Published</SelectItem>
          <SelectItem value="ONGOING">Ongoing</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Select value={accessType} onValueChange={setAccessType}>
        <SelectTrigger className="w-full md:w-45">
          <SelectValue placeholder="Access" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Access</SelectItem>
          <SelectItem value="FREE">Free</SelectItem>
          <SelectItem value="PAID">Paid</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}