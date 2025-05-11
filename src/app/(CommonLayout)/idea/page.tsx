"use client";

import { IdeaCard } from "@/components/pages/modules/Ideas/IdeaCard";
import { getAllIdeas } from "@/lib/api/ideas/action";
import { getCurrentUser } from "@/service/auth";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IIdea } from "@/types";
import { Card } from "@/components/ui/card";
import { CardSkeletonGrid } from "@/components/pages/modules/Ideas/Skeleton";

const IdeasPage = () => {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<IIdea[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize state from URL params
  const [searchTerm, setSearchTerm] = useState(
    urlSearchParams.get("search") || ""
  );
  const [sortOption, setSortOption] = useState(
    urlSearchParams.get("sort") || "newest"
  );
  const [categoryFilter, setCategoryFilter] = useState(
    urlSearchParams.get("category") || "all"
  );
  const [isPaidFilter, setIsPaidFilter] = useState(
    urlSearchParams.get("isPaid") || "all"
  );

  // Fetch user and ideas with filters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        const params = {
          searchTerm: searchTerm || undefined,
          category: categoryFilter !== "all" ? categoryFilter : undefined,
          isPaid: isPaidFilter !== "all" ? isPaidFilter : undefined,
          sort: sortOption !== "newest" ? sortOption : undefined,
        };

        const ideasData = await getAllIdeas(currentUser?.id, params);
        setIdeas(ideasData);
        setFilteredIdeas(ideasData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm, sortOption, categoryFilter, isPaidFilter]);

  useEffect(() => {
    let result = [...ideas];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (idea) =>
          idea.title.toLowerCase().includes(term) ||
          idea.problem_statement?.toLowerCase()?.includes(term) ||
          false ||
          idea.proposed_solution?.toLowerCase()?.includes(term) ||
          false ||
          idea.category.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((idea) => idea.category === categoryFilter);
    }

    // Apply isPaid filter
    if (isPaidFilter !== "all") {
      const paidStatus = isPaidFilter === "paid";
      result = result.filter((idea) => idea.isPaid === paidStatus);
    }

    // Apply sorting
    if (sortOption === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortOption === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    setFilteredIdeas(result);
  }, [ideas, searchTerm, sortOption, categoryFilter, isPaidFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams();
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSortOption("newest");
    setCategoryFilter("all");
    setIsPaidFilter("all");
    router.push("/ideas");
  };

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (categoryFilter !== "all") params.set("category", categoryFilter);
    if (isPaidFilter !== "all") params.set("isPaid", isPaidFilter);
    if (sortOption !== "newest") params.set("sort", sortOption);
    router.push(`?${params.toString()}`);
  };

  return (
    <main className="min-h-screen">
      <section className="relative py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Ideas</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Explore innovative solutions proposed by our community
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Card className="p-4 mb-6 border-none shadow-sm">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row gap-3 items-end">
              {/* Search Input */}
              <div className="w-full relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search ideas..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="w-full ">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="ENERGY">Energy</SelectItem>
                    <SelectItem value="WASTE">Waste</SelectItem>
                    <SelectItem value="TRANSPORTATION">
                      Transportation
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Paid Status Filter */}
              <div className="w-full md:w-48">
                <Select value={isPaidFilter} onValueChange={setIsPaidFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pricing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ideas</SelectItem>
                    <SelectItem value="paid">Premium</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div className="w-full md:w-48">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetFilters}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Loading State */}
        {loading && <CardSkeletonGrid count={4} />}

        {/* No Ideas Message */}
        {!loading && filteredIdeas.length === 0 && (
          <Card className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              No ideas match your search criteria
            </p>
            <Button
              variant="link"
              onClick={resetFilters}
              className="text-green-600"
            >
              Clear all filters
            </Button>
          </Card>
        )}

        {/* Idea Cards Grid */}
        {!loading && filteredIdeas.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                isAuthenticated={user !== null}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default IdeasPage;
