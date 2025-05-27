import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { createSearchParamsLink } from "@/lib/utils";

type IdeaPaginationProps = {
  currentPage: number;
  total: number;
  limit: number;
  searchParams: Record<string, string>;
};

const IdeaPagination = ({
  searchParams,
  currentPage,
  total,
  limit,
}: IdeaPaginationProps) => {
  const totalPage = Math.ceil(total / limit);

  const nextSearchParams = createSearchParamsLink(searchParams, {
    page: currentPage + 1,
  });
  const prevSearchParams = createSearchParamsLink(searchParams, {
    page: currentPage - 1,
  });
  const pageSearchParams = (page: number) =>
    createSearchParamsLink(searchParams, {
      page: page,
    });

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? `/idea${prevSearchParams}` : "#"}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`/idea${pageSearchParams(page)}`}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPage ? `/idea${nextSearchParams}` : "#"}
            aria-disabled={currentPage >= totalPage}
            className={
              currentPage >= totalPage ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default IdeaPagination;
