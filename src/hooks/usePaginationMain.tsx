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
  const [currentPage, setCurrentPage] = useState<number>(1);
  let [searchParams, setSearchParams] = useSearchParams();
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
      return currentPageNum > 0
        ? currentPageNum
        : currentPageNum > pageCount
          ? pageCount
          : currentPageNum < 0
            ? 1
            : 1;
    };

    console.log(
      getNewPageIndex({ pageParam: pageParam, pageCount: pageCount }),
    );
    setCurrentPage(
      getNewPageIndex({ pageParam: pageParam, pageCount: pageCount }),
    );
  }, [searchParams]);

  const getCurrentData = () => {
    const begin = (currentPage - 1) * pageSize;
    const end = begin + pageSize;
    console.log(currentPage, pageSize, begin, end);
    return mainDataArr.slice(begin, end);
  };

  const getPageArr = () => {
    return Array(...new Array(pageCount)).map((_, i) => i + 1);
  };

  const handlePageBtnClick = (pageNum: number) => {
    setCurrentPage(pageNum);
    if (!enableParams) return;
    setSearchParams([[param, pageNum.toString()]], { replace: true });
  };

  const handleArrowBtnClick = (isAdd: boolean) => {
    let targetNum: number = 1;
    isAdd
      ? setCurrentPage((prev) => {
          targetNum = prev + pageBtnSize;
          return targetNum;
        })
      : setCurrentPage((prev) => {
          targetNum = prev - pageBtnSize;
          return targetNum;
        });
    if (!enableParams) return;
    setSearchParams([[param, targetNum.toString()]], { replace: true });
  };

  const getCurrentBtns = () => {
    return getPageArr().slice(currentPage - 1, currentPage + pageBtnSize);
  };

  const pageBtnArr = getCurrentBtns().map((pageNum) => {
    return (
      <button
        className={pageBtnClassName}
        key={pageNum}
        onClick={() => handlePageBtnClick(pageNum)}
      >
        {pageNum}
      </button>
    );
  });
  pageBtnArr.push(
    <button
      className={pageBtnClassName}
      onClick={() => {
        handleArrowBtnClick(true);
        console.log(currentPage);
      }}
    >
      Next
    </button>,
  );

  return {
    pageBtnArr,
    getCurrentData,
  };
};

export default usePaginationMain;
