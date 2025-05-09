"use client"
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams  } from "next/navigation";
import { Button } from "../ui/button";



const Pagination = ({ totalPage }: { totalPage: number }) => {
 

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);


  useEffect(() =>{
   
    router.push(`${pathname}?page=${currentPage}`)
  }, [currentPage, , pathname, router])

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathname}?page=${currentPage - 1}`); // query params er jonno
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathname}?page=${currentPage + 1}`); // query params er jonno
    }
  };

  return (
    <div className="flex items-center gap-2 my-5">
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center"
      >
        <ArrowLeft />
      </Button>
      {[...Array(totalPage)].map((_, index) => (
        <Button
          onClick={() => {
            setCurrentPage(index + 1);
            router.push(`${pathname}?page=${index + 1}`); // current page er sathe query params hisebe page add kore dibo
          }}
          key={index}
          variant={currentPage === index + 1 ? "default" : "outline"}
          size="sm"
          className="w-8 h-8 rounded-full flex items-center justify-center"
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;