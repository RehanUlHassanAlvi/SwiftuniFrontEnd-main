import React, { useState } from "react";
import {
  GoToContainer,
  GoToText,
  PageBtn,
  PageNumInput,
  PageNumberBtn,
  PaginationContainer,
  PreNextImg,
} from "./Style";
import PagePrev from "../../assets/images/pagePrev.svg";
import PageNext from "../../assets/images/pageNext.svg";
import Ellipsis from "../../assets/images/ellipsis•••.svg";
import { FlexDiv } from "../../assets/styles/style";

const Pagination = ({ page, totalPages, setPage }) => {
  const [inputPage, setInputPage] = useState("");
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePageClick = (page) => {
    setPage(page);
  };

  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleInputSubmit = (event) => {
    if (event.key === "Enter") {
      const pageNumber = parseInt(inputPage, 10);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
        setPage(pageNumber);
      }
      setInputPage("");
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, page - halfMaxPages);
    let endPage = Math.min(totalPages, page + halfMaxPages);

    if (page <= halfMaxPages) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else if (page + halfMaxPages >= totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(
        <PageNumberBtn
          key={1}
          onClick={() => handlePageClick(1)}
          active={1 === page}
        >
          1
        </PageNumberBtn>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis">
            <img src={Ellipsis} alt="Ellipsis" />
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageNumberBtn
          key={i}
          onClick={() => handlePageClick(i)}
          active={i === page}
        >
          {i}
        </PageNumberBtn>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis">
            {" "}
            <img src={Ellipsis} alt="Ellipsis" />
          </span>
        );
      }
      pages.push(
        <PageNumberBtn
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          active={totalPages === page}
        >
          {totalPages}
        </PageNumberBtn>
      );
    }

    return pages;
  };

  return (
    <PaginationContainer>
      <FlexDiv style={{ gap: "10px" }}>
        <PageBtn onClick={handlePrevious} disabled={page === 1}>
          <PreNextImg src={PagePrev} alt="Prev" />
        </PageBtn>
        {renderPageNumbers()}
        <PageBtn onClick={handleNext} disabled={page === totalPages}>
          <PreNextImg src={PageNext} alt="Next" />
        </PageBtn>
      </FlexDiv>

      <GoToContainer>
        <GoToText>Go to</GoToText>
        <PageNumInput
          value={inputPage}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
          min="1"
          max={totalPages}
        />
      </GoToContainer>
    </PaginationContainer>
  );
};

export default Pagination;
