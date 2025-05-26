"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSearchParamsLink } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const HomeSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("ALL");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const filters: Record<string, string | undefined> = {
      searchTerm: searchTerm.trim() || undefined,
      category: category !== "ALL" ? category : undefined,
    };

    const searchParams = createSearchParamsLink("", filters);
    router.push(`/idea${searchParams}`);
  };

  return (
    <form className="mt-10 w-full max-w-2xl mx-auto" onSubmit={handleSearch}>
      <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-lg bg-white/90 backdrop-blur-md shadow-lg">
        <div className="relative flex-1">
          <div className="flex w-full items-center">
            <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search ideas..."
              className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[180px] border-0 focus:ring-0">
            <SelectValue placeholder="ALL CATEGORIES" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">ALL CATEGORIES</SelectItem>
            <SelectItem value="ENERGY">ENERGY</SelectItem>
            <SelectItem value="WASTE">WASTE</SelectItem>
            <SelectItem value="TRANSPORTATION">TRANSPORTATION</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default HomeSearchBar;
