import { createContext, useContext } from "react";

export const SearchContext = createContext<number>(0);

export const useSearchContext = () => {
  return useContext(SearchContext);
};
