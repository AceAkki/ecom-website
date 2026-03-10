import type { SetURLSearchParams } from "react-router-dom";
type mainArrayType = object[] | string[] | number[];
type itemComponentType = ({ data }: { data: any }) => JSX.Element;

class usePagination {
    mainArray: mainArrayType;
    itemComponent: itemComponentType;
    paginatedData: mainArrayType[];
    arrLength: number;
    pageSize: number;
    navigationArrays: number[];
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    enableSearchParams: boolean;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;

    constructor({
        mainElemsArray,
        ItemComponent,
        pageState,
        setPageState,
        maxPageSize,
        enableSearchParams,
        searchParams,
        setSearchParams,
    }: {
        mainElemsArray: mainArrayType;
        ItemComponent: itemComponentType;
        pageState: number;
        setPageState: React.Dispatch<React.SetStateAction<number>>;
        maxPageSize?: number;
        enableSearchParams: boolean;
        searchParams: URLSearchParams;
        setSearchParams: SetURLSearchParams;
    }) {
        this.mainArray = mainElemsArray;
        this.arrLength = mainElemsArray.length;
        this.pageSize = 20 | (maxPageSize as number);
        this.paginatedData = [];
        this.navigationArrays = [];
        this.currentPage = pageState;
        this.setCurrentPage = setPageState;
        this.itemComponent = ItemComponent;
        this.enableSearchParams = enableSearchParams;
        this.searchParams = searchParams;
        this.setSearchParams = setSearchParams;
    }

    initPagination() {
        let elemsArr = this.createPaginatedArray();
        let navArr = this.createNavigationArray();
        let currentParam = this.searchParams.get("page");
        let loadPage = currentParam
            ? parseInt(currentParam) - 1
            : this.currentPage;
        return [elemsArr[loadPage], navArr];
    }

    createPaginatedArray() {
        for (let i = 0; i < this.arrLength; i += this.pageSize) {
            this.paginatedData.push(this.mainArray.slice(i, i + this.pageSize));
        }
        return this.paginatedData.map((page) => {
            return page.map((item) => {
                return (
                    <this.itemComponent
                        data={item}
                        key={`${item}-${Math.random()}`}
                    />
                );
            });
        });
    }

    createNavigationArray() {
        for (let i = 0; i < this.paginatedData.length; i++) {
            this.navigationArrays.push(i);
        }
        return this.navigationArrays.map((navItem) => {
            let properNum = navItem + 1;
            return (
                <button
                    key={navItem}
                    onClick={() => {
                        this.setCurrentPage(navItem);
                        if (this.enableSearchParams)
                            this.updateSearchParams(properNum.toString());
                    }}
                >
                    {properNum}
                </button>
            );
        });
    }

    updateSearchParams(pageNum: string) {
        this.setSearchParams({ page: pageNum }, { replace: true });
    }
}

export default usePagination;
