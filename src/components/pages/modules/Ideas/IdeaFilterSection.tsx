"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSearchParamsLink } from "@/lib/utils";
import { ArrowUpDown, Filter, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const IdeaFilterSection = () => {
  const serchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOption, setSortOption] = useState("desc");
  console.log("select", selectedCategory);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchQuery = new FormData(form).get("search") as string;
    const newSearchParams = createSearchParamsLink(serchParams, {
      searchTerm: searchQuery,
    });
    router.push(`/idea${newSearchParams}`);
    form.reset();
    // Handle search logic here, e.g., update state or make API cal
    console.log("Search Query:", searchQuery);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    const newSearchParams = createSearchParamsLink(serchParams, {
      category: value === "All" ? undefined : value,
    });
    router.push(`/idea${newSearchParams}`);
    console.log("Selected Category:", value);
  };
  const handleSortOrder = (value: string) => {
    setSortOption(value);
    const newSearchParams = createSearchParamsLink(serchParams, {
      sortOrder: value === "asc" ? "asc" : undefined,
    });
    router.push(`/idea${newSearchParams}`);
    console.log("Selected Category:", value);
  };
  const handlePriceFilter = (value: string) => {
    setPriceFilter(value);
    const newSearchParams = createSearchParamsLink(serchParams, {
      isPaid: value === "all" ? undefined : value,
    });
    router.push(`/idea${newSearchParams}`);
    console.log("Selected Category:", value);
  };

  return (
    <Card className="p-4 mb-6 border-none shadow-sm">
      <div className="flex flex-col md:flex-row gap-3 items-end">
        {/* Search Input */}
        <form
          onSubmit={handleSearch}
          className="w-full relative flex items-center gap-2"
        >
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input name="search" placeholder="Search ideas..." className="pl-9" />
          <Button type="submit">Search</Button>
        </form>

        {/* Category Filter */}
        <div className="w-full ">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="ENERGY">Energy</SelectItem>
              <SelectItem value="WASTE">Waste</SelectItem>
              <SelectItem value="TRANSPORTATION">Transportation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Paid Status Filter */}
        <div className="w-full md:w-48">
          <Select value={priceFilter} onValueChange={handlePriceFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Pricing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ideas</SelectItem>
              <SelectItem value="true">Premium</SelectItem>
              <SelectItem value="false">Free</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Options */}
        <div className="w-full md:w-48">
          <Select value={sortOption} onValueChange={handleSortOrder}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" asChild>
            <Link href="/idea" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Reset
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default IdeaFilterSection;
