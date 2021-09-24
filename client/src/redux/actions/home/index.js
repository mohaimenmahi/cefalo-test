import { HOME } from "../../constants/home";

export function fetchProducts() {
  return {
    type: HOME.FETCH_PRODUCTS.MAIN,
  };
}

export function searchResult(data) {
  return {
    type: HOME.SEARCH_PRODUCTS.MAIN,
    data,
  };
}
