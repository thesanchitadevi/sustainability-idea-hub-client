import { IdeaDetailsCard } from "@/components/pages/modules/Ideas/IdeaDetailsCard";
import { getIdeaById } from "@/lib/api/ideas/action";

export default async function IdeaDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const idea = await getIdeaById(params.id);

  if (!idea) return <div>Idea not found</div>;

  return (
    <main className="container py-8">
      <IdeaDetailsCard idea={idea} />
    </main>
  );
}
