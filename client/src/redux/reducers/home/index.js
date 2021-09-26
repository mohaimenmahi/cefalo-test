import { HOME } from "../../constants/home";

let initState = {
  allProducts: [],
  allProductLoading: false,
  allProductsErr: null,
  searchResult: [],
  searchLoading: false,
  searchErr: null,
};

export default function homeReducer(state = initState, action) {
  switch (action.type) {
    case HOME.FETCH_PRODUCTS.MAIN:
      return {
        ...state,
        allProductLoading: true,
        allProductsErr: null,
      };

    case HOME.FETCH_PRODUCTS.SUCCESS:
      return {
        ...state,
        allProducts: action.result,
        allProductLoading: false,
        allProductsErr: null,
      };

    case HOME.FETCH_PRODUCTS.FAILURE:
      return {
        ...state,
        allProductLoading: false,
        allProductsErr: action.result,
      };

    case HOME.SEARCH_PRODUCTS.MAIN:
      return {
        ...state,
        searchLoading: true,
        searchErr: null,
      };

    case HOME.SEARCH_PRODUCTS.SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchErr: null,
        searchResult: action.result,
      };

    case HOME.SEARCH_PRODUCTS.FAILURE:
      return {
        ...state,
        searchLoading: false,
        searchErr: action.result,
        searchResult: [],
      };

    default:
      return state;
  }
}
