import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface usePaginationMainProps {
  mainDataArr: any[];
  pageSize?: number;
  enableParams?: boolean;
  param?: string;
  pageBtnClassName?: string;
  pageBtnSize?: number;
}

type getNewPageIndexProps = {
  pageParam: string;
  pageCount: number;
};

const usePaginationMain = ({
  mainDataArr,
  pageSize = 10,
  enableParams = false,
  param = "page",
  pageBtnClassName = "page-btn",
  pageBtnSize = 4,
}: usePaginationMainProps) => {
  // page for navigation
  const [currentPage, setCurrentPage] = useState<number>(1);
  // params for url - better for SEO
  let [searchParams, setSearchParams] = useSearchParams();
  // page count
  let pageCount = Math.ceil(mainDataArr.length / pageSize);

  useEffect(() => {
    if (!enableParams) return;
    const pageParam = searchParams.get(param);
    if (!pageParam) return;
    const getNewPageIndex = ({
      pageParam: pageParam,
      pageCount: pageCount,
    }: getNewPageIndexProps) => {
      let currentPageNum = parseInt(pageParam);
      return currentPageNum > 0 && currentPageNum <= pageCount
        ? currentPageNum
        : currentPageNum >= pageCount
          ? pageCount
          : 1;
    };
    setCurrentPage(
      getNewPageIndex({ pageParam: pageParam, pageCount: pageCount }),
    );
  }, [searchParams, pageCount, param, enableParams]);

  // returns slice of the current data
  const getCurrentData = () => {
    const begin = (currentPage - 1) * pageSize;
    const end = begin + pageSize;
    return mainDataArr.slice(begin, end);
  };

  // created array based on the overall page count
  const getPageArr = () => {
    return Array(...new Array(pageCount)).map((_, i) => i + 1);
  };
  // gets last index of pages
  const getPageBtnLastIndex = () => {
    return getPageArr().at(-1) as number;
  };

  // returns slice of the current page btns
  const getCurrentBtns = () => {
    const start = Math.max(1, currentPage - Math.floor(pageBtnSize / 2));
    const end = Math.min(pageCount, start + pageBtnSize - 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    // return getPageArr().slice(currentPage - 1, currentPage + pageBtnSize - 1);
  };

  // handles btn click of navigation buttons - takes user to that page
  const handlePageBtnClick = (pageNum: number) => {
    if (currentPage === pageNum) return;
    setCurrentPage(pageNum);
    if (!enableParams) return;
    setSearchParams([[param, pageNum.toString()]], { replace: true });
  };

  // handles arrow btn click - next or previous
  const handleArrowBtnClick = (isAdd: boolean) => {
    // React state updates are async, so this logic can desync the URL.
    let targetNum: number = isAdd ? currentPage + 1 : currentPage - 1;
    setCurrentPage(targetNum);
    console.log(targetNum);
    if (!enableParams) return;
    setSearchParams([[param, targetNum.toString()]], { replace: true });
  };

  const getPageBtnClassName = (pageNum: number) => {
    return pageNum === currentPage
      ? `${pageBtnClassName} active`
      : pageBtnClassName;
  };

  {
    /* 

    // returns UI
    const pageBtnArr = getCurrentBtns().map((pageNum) => {
      return (
        <button
          key={pageNum + pageNum}
          className={getPageBtnClassName(pageNum)}
          onClick={() => handlePageBtnClick(pageNum)}
        >
          {pageNum}
        </button>
      );
    });
  pageBtnArr.unshift(
    <button
      key={`prev-${currentPage}`}
      className={pageBtnClassName}
      disabled={currentPage <= 1}
      onClick={() => {
        handleArrowBtnClick(false);
        console.log(currentPage);
      }}
    >
      Previous
    </button>,
  );

  pageBtnArr.push(
    <button
      key={`next-${currentPage}`}
      className={pageBtnClassName}
      disabled={(getPageArr().at(-1) as number) <= currentPage}
      onClick={() => {
        handleArrowBtnClick(true);
        console.log(currentPage);
      }}
    >
      Next
    </button>,
  );
  */
  }

  const ArrowBtn = ({ type, isAdd }: { type: string; isAdd: boolean }) => {
    return (
      <button
        key={`${type}-${currentPage}`}
        className={pageBtnClassName}
        disabled={
          isAdd ? getPageBtnLastIndex() <= currentPage : currentPage <= 1
        }
        onClick={() => {
          handleArrowBtnClick(isAdd);
          console.log(currentPage);
        }}
      >
        {type}
      </button>
    );
  };

  return {
    getCurrentData,
    getCurrentBtns,
    getPageBtnClassName,
    handlePageBtnClick,
    ArrowBtn,
  };
};

export default usePaginationMain;
