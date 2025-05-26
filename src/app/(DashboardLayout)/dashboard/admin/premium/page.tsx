import PremiumIdeas from "@/components/shared/Dashboard/AdminDashboard/PremiumIdeas";
import {  getAllPrimiumIdeas } from "@/service/adminIdeaControll";

type TSearchParams = Promise<{[key:string] : string | undefined}> 

const page = async({searchParams} : {searchParams? : TSearchParams}) => {
    const query = await searchParams;
        
       
        const page = query?.page;
        // console.log(query)
        // const page = Array.isArray(query?.page) ? query.page[0] : query?.page;
        
       
        const pageNumber = page ? parseInt(page, 10) : 1;
        const limit = 10;
        // console.log("page no = ",pageNumber)
        const res = await getAllPrimiumIdeas(pageNumber, limit);
        // console.log(res);
        const ideaData = res?.data?.data || [];
        // console.log("idea = ",ideaData)
        let totalpage = res?.meta?.total || 1 ;
        totalpage = Math.ceil(totalpage/limit)
    return (
        <div>
            <PremiumIdeas userData={ideaData} page={totalpage}></PremiumIdeas>
        </div>
    );
};

export default page;