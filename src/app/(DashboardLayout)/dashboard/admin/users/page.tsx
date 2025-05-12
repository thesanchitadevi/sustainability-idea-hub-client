
  
import UserLists from "@/components/shared/Dashboard/AdminDashboard/UsersLists";
import { getAllUsers} from "@/service/auth";

type TSearchParams = Promise<{[key:string] : string | undefined}> 

const AllUsers = async({searchParams} : {searchParams? : TSearchParams}) => {
    const query = await searchParams;
    
   
    const page = query?.page;
    // console.log(query)
    // const page = Array.isArray(query?.page) ? query.page[0] : query?.page;
    
   
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limit = 10;
    // console.log("page no = ",pageNumber)
    const res = await getAllUsers(pageNumber, limit);
    // console.log(res);
    const userData = res?.data || [];
    let totalpage = res?.meta?.total || 1 ;
    totalpage = Math.ceil(totalpage/limit)
    
    return (
        <div>
            <UserLists userData={userData} page={totalpage}></UserLists>
        </div>
    );
};

export default AllUsers;