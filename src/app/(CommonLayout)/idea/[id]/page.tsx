// import { IdeaDetailsCard } from "@/components/pages/modules/Ideas/IdeaDetailsCard";
// import { getIdeaById } from "@/lib/api/ideas/action";



// export default async function IdeaDetailsPage({
//   params,
// }: {params: {id:string}}
// ) {
//   const idea = await getIdeaById(params.id);

//   return (
//     <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//       <IdeaDetailsCard idea={idea} />
//     </section>
//   );
// }

import { IdeaDetailsCard } from "@/components/pages/modules/Ideas/IdeaDetailsCard";
import { getIdeaById } from "@/lib/api/ideas/action";

type PageProps = {
  params: Promise<{ id: string }>;  // Ensure params is a Promise
};

export default async function IdeaDetailsPage({
  params,
}: PageProps) {
  const idea = await getIdeaById((await params).id);

  if (!idea) {
    return <p>Idea not found!</p>;  
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <IdeaDetailsCard idea={idea} />
    </section>
  );
}


