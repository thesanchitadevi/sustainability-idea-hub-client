import IdeaLists from "@/components/shared/Dashboard/AdminDashboard/IdeaLists";
import { getAllMemberIdeas } from "@/service/adminIdeaControll";

type TSearchParams = Promise<{[key:string] : string | undefined}> 
const AllMemberIdea = async({searchParams} : {searchParams? : TSearchParams}) => {
     const query = await searchParams;
    
   
    const page = query?.page;
    // console.log(query)
    // const page = Array.isArray(query?.page) ? query.page[0] : query?.page;
    
   
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limit = 10;
    // console.log("page no = ",pageNumber)
    const res = await getAllMemberIdeas(pageNumber, limit);
    // console.log(res);
    const ideaData = res?.data?.data || [];
    // console.log("idea = ",ideaData)
    let totalpage = res?.meta?.total || 1 ;
    totalpage = Math.ceil(totalpage/limit)
    
    return (
        <div>
            <IdeaLists userData={ideaData} page={totalpage}></IdeaLists>
        </div>
    );
};

export default AllMemberIdea;



  



