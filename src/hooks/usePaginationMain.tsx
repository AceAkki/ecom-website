import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/*
Only basic dependecies
resusable and clean

*/

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
    let targetPage = currentPage;
    if (pageCount > 0 && targetPage > pageCount) {
      targetPage = pageCount;
    } else if (targetPage < 1) {
      targetPage = 1;
    }
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
    }

    // needs to be improved - created race condition right now
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
    // needs to be improved - not fine with the ux
    const start = Math.max(1, currentPage - Math.floor(pageBtnSize / 2));
    const end = Math.min(pageCount, start + pageBtnSize - 1);
    let btnArray: number[] = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i,
    );
    return btnArray;
    // return getPageArr().slice(currentPage - 1, currentPage + pageBtnSize - 1);
  };

  // handles btn click of navigation buttons - takes user to that page
  const handlePageBtnClick = (pageNum: number) => {
    if (currentPage === pageNum) return;
    returntoTop(100);
    setCurrentPage(pageNum);
    if (!enableParams) return;
    setSearchParams([[param, pageNum.toString()]], { replace: true });
  };

  // handles arrow btn click - next or previous
  const handleArrowBtnClick = (isAdd: boolean) => {
    // React state updates are async, so this logic can desync the URL.
    let targetNum: number = isAdd ? currentPage + 1 : currentPage - 1;
    returntoTop(100);
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

  const isDisabled = (isAdd: boolean) => {
    return isAdd ? getPageBtnLastIndex() <= currentPage : currentPage <= 1;
  };

  const returntoTop = (param: number) => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, param);
  };

  return {
    getCurrentData,
    getCurrentBtns,
    getPageBtnClassName,
    handlePageBtnClick,
    previousDisabled: () => isDisabled(false),
    previousBtn: () => handleArrowBtnClick(false),
    nextDisabled: () => isDisabled(true),
    nextBtn: () => handleArrowBtnClick(true),
  };
};

export default usePaginationMain;
