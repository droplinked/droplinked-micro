import AppContainer from "components/legacy-components/container/AppContainer";
import ContentArea from "./components/ContentArea";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import useIsMobile from "hooks/useIsMobile";

interface Props {
    filters: {
        visibility: "visible" | "hidden";
    };
    searchBar: {
        visibility: "visible" | "hidden";
    };
    sort: {
        visibility: "visible" | "hidden";
    };
    top: number;
    bottom: number;
}

function ProductGridList({ filters, searchBar, sort, top, bottom }: Props) {
    const isMobile = useIsMobile()
    const paddingTop = isMobile ? "32px" : `${top}px`;
    const paddingBottom = isMobile ? "32px" : `${bottom}px`;
    const isFilterVisible = filters.visibility === "visible";
    const isSearchBarVisible = searchBar.visibility === "visible";
    const isSortVisible = sort.visibility === "visible";

    return (
        <div className="flex justify-center" style={{ paddingTop, paddingBottom }}>
            <AppContainer props={{ alignItems: "start", gap: 6 }}>
                {isFilterVisible && <FilterPanel />}
                <ContentArea isSearchBarVisible={isSearchBarVisible} isSortVisible={isSortVisible} isFilterVisible={isFilterVisible} />
            </AppContainer>
        </div>
    )
}

export default ProductGridList