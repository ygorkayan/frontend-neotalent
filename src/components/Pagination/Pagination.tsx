import { useState } from "react";
import styled from "styled-components";

interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

function Pagination({ totalPages, initialPage = 1, onPageChange }: Readonly<PaginationProps>) {
  const safeTotalPages = Math.max(1, totalPages);
  const [currentPage, setCurrentPage] = useState(Math.min(Math.max(initialPage, 1), safeTotalPages));

  function changePage(page: number) {
    const nextPage = Math.min(Math.max(page, 1), safeTotalPages);

    setCurrentPage(nextPage);
    onPageChange?.(nextPage);
  }

  const pages = Array.from({ length: safeTotalPages }, (_, index) => {
    const page = index + 1;

    return (
      <PageButton
        key={page}
        $active={page === currentPage}
        onClick={() => changePage(page)}
        aria-current={page === currentPage ? "page" : undefined}
      >
        {page}
      </PageButton>
    );
  });

  return (
    <PaginationContainer aria-label="Pagination">
      <PageButton disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
        <Chevron>‹</Chevron>
      </PageButton>

      {pages}

      <PageButton disabled={currentPage === safeTotalPages} onClick={() => changePage(currentPage + 1)}>
        <Chevron>›</Chevron>
      </PageButton>
    </PaginationContainer>
  );
}

const PaginationContainer = styled.nav`
  gap: 6px;
  display: flex;
  max-width: 100%;
  align-items: center;

  @media (max-width: 600px) {
    justify-content: center;
  }

  @media (max-width: 380px) {
    gap: 4px;
  }
`;

const PageButton = styled.button<{ $active?: boolean }>`
  width: 38px;
  height: 38px;
  display: flex;
  cursor: pointer;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  color: ${({ $active }) => ($active ? "var(--color-white)" : "#111216")};
  background: ${({ $active }) => ($active ? "#0875c9" : "var(--color-white)")};
  border: 1px solid ${({ $active }) => ($active ? "#0875c9" : "var(--border-color)")};

  @media (max-width: 380px) {
    width: 34px;
    height: 34px;
  }

  &:disabled {
    color: #a0a4a8;
    cursor: not-allowed;
    border-color: #d4d8dd;
    background: var(--color-gray);
  }
`;

const Chevron = styled.span`
  line-height: 1;
  font-size: 26px;
  transform: translateY(-1px);
`;

export default Pagination;
