"use client";


import { ColumnDef } from "@tanstack/react-table";



import { Button } from "@/components/ui/button";
import { toast }     from "sonner";
import { IdeaHubTable } from "@/components/Common/IdeaHubTable";
import Pagination from "@/components/Common/Pagination";
import { IAllUser } from "@/types";
import { blockUnblockUser, changeUserRole } from "@/service/auth";


const UserLists = ({ userData, page }: { userData: IAllUser[], page:number }) => {
 

  const handleBlockUnblock = async (id: string, isBlock: string) => {
    // console.log(id, isBlock)
    try {
      const res = await blockUnblockUser(id, isBlock);
      
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleChangeRole = async (id: string, role: string) => {
   
    const newRoleData = { role: role };
    try {
      const res = await changeUserRole(id, newRoleData);
      // console.log(res)
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  const columns: ColumnDef<IAllUser>[] = [
    {
      accessorKey: "name",
      header: () => <div>Name</div>,
      cell: ({ row }) => <div className="">{row.original.name}</div>,
    },
    {
      accessorKey: "email",
      header: () => <div>Email</div>,
      cell: ({ row }) => <div className="">{row.original.email}</div>,
    },
    {
      accessorKey: "role",
      header: () => <div>Role</div>,
      cell: ({ row }) => <div className="">{row.original.role}</div>,
    },
    {
      accessorKey: "isActive",
      header: () => <div>User Status</div>,
      cell: ({ row }) => (
        <div>
          {row.original.status === 'ACTIVE' ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              Active
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-20 text-center px-1 rounded">
              Blocked
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        
        <div>
          
          {row.original.status === 'ACTIVE' ? (
            <Button
              onClick={() => handleBlockUnblock(row.original.id, "BLOCKED")}
              className="cursor-pointer h-7"
              variant={"outline"}
            >
              Block
            </Button>
          ) : (
            <Button
              onClick={() => handleBlockUnblock(row.original.id, "ACTIVE")}
              className="cursor-pointer h-7"
              variant={"outline"}
            >
              Unblock
            </Button>
          )}
        </div>
      ),
    },
    
    {
      accessorKey: "changeRole",
      header: () => <div>Change Role</div>,
      cell: ({ row }) => (
        <div>
          {row.original.role === "ADMIN" ? (
            <Button
              onClick={() => handleChangeRole(row.original.id, "MEMBERS")}
              className="cursor-pointer h-7"
              variant={"outline"}
            >
              MEMBERS
            </Button>
          ) : (
            <Button
              onClick={() => handleChangeRole(row.original.id, "ADMIN")}
              className="cursor-pointer h-7"
              variant={"outline"}
            >
              ADMIN
            </Button>
          )}
        </div>
      ),
    },
    
  ];

  return (
    <div>
      <IdeaHubTable
        columns={columns}
        data={userData || []}
      ></IdeaHubTable>
      
      <Pagination totalPage={page}></Pagination>
    </div>
  );
};

export default UserLists;
