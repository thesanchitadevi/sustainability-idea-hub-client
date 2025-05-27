import AllIdeas from "@/components/pages/modules/Ideas/AllIdeas";
import IdeaFilterSection from "@/components/pages/modules/Ideas/IdeaFilterSection";
import { CardSkeletonGrid } from "@/components/pages/modules/Ideas/Skeleton";
import { Suspense } from "react";

interface AllIdeasProps {
  searchParams: Promise<Record<string, string> | null | undefined>;
}

export default async function IdeasPage({ searchParams }: AllIdeasProps) {
  const currentSearchParams = (await searchParams) || {};
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Ideas</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Explore innovative solutions proposed by our community
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <IdeaFilterSection />

        {/* No Ideas Message */}
        {/* 
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
        </Card> */}

        {/* Idea Cards Grid */}
        <Suspense fallback={<CardSkeletonGrid count={4} />}>
          <AllIdeas searchParams={currentSearchParams} />
        </Suspense>
      </div>
    </main>
  );
}
