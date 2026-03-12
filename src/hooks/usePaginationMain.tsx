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
  }, [searchParams, pageCount, param]);

  const getCurrentData = () => {
    const begin = (currentPage - 1) * pageSize;
    const end = begin + pageSize;
    return mainDataArr.slice(begin, end);
  };

  const getPageArr = () => {
    return Array(...new Array(pageCount)).map((_, i) => i + 1);
  };
  const getPageBtnLastIndex = () => {
    return getPageArr().at(-1) as number;
  };

  const handlePageBtnClick = (pageNum: number) => {
    setCurrentPage((prev) => {
      console.log(prev !== pageNum, pageNum, prev);
      return prev !== pageNum ? pageNum : prev;
    });
    if (!enableParams) return;
    setSearchParams([[param, pageNum.toString()]], { replace: true });
  };

  const handleArrowBtnClick = (isAdd: boolean) => {
    let targetNum: number = 1;
    isAdd
      ? setCurrentPage((prev) => {
          targetNum = prev + 1;
          return targetNum;
        })
      : setCurrentPage((prev) => {
          targetNum = prev - 1;
          console.log(prev, targetNum);
          return targetNum;
        });
    if (!enableParams) return;
    console.log(targetNum);
    setSearchParams([[param, targetNum.toString()]], { replace: true });
  };

  const getCurrentBtns = () => {
    return getPageArr().slice(currentPage - 1, currentPage + pageBtnSize);
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
