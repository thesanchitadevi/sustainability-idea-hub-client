import { getAllIdeaAction } from "@/lib/actions/idea.action";
import { IFilter, IIdea } from "@/types";
import IdeaPagination from "./Dashboard/IdeaPagination";
import { IdeaCard } from "./IdeaCard";

interface AllIdeasProps {
  searchParams: Record<string, string>;
}

const AllIdeas = async ({ searchParams }: AllIdeasProps) => {
  let filters: IFilter[] = [];

  const searchParamsArray = Object.entries(searchParams || {}).map(
    ([name, value]) =>
      ({
        name,
        value: String(value),
      } as IFilter)
  );

  if (searchParamsArray.length > 0) {
    filters = searchParamsArray;
  }

  const result = await getAllIdeaAction(filters);
  const ideas = result?.data?.data || [];
  const meta = result?.data?.meta || {};
  console.log("meta", meta);

  if (!ideas || ideas.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground mb-4">
          No ideas match your search criteria
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ideas.map((idea: IIdea) => (
          <IdeaCard key={idea.id} idea={idea} isAuthenticated={true} />
        ))}
      </div>
      <IdeaPagination
        limit={meta?.limit || 10}
        currentPage={meta?.page}
        total={meta?.total}
        searchParams={searchParams}
      />
    </>
  );
};

export default AllIdeas;
