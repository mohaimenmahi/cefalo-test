import { WISHLIST } from "../../constants/wishlist";

let initState = {
  wishlist: [],
  wishlistLoading: false,
  wishlistErr: null,
};

export default function wishlistReducer(state = initState, action) {
  switch (action.type) {
    case WISHLIST.FETCH_WISHLIST.MAIN:
      return {
        ...state,
        wishlistLoading: true,
        wihslistErr: null,
      };

    case WISHLIST.FETCH_WISHLIST.SUCCESS:
      return {
        ...state,
        wishlist: action.result,
        wishlistLoading: false,
        wishlistErr: null,
      };

    case WISHLIST.FETCH_WISHLIST.FAILURE:
      return {
        ...state,
        wishlistLoading: false,
        wishlistErr: action.result,
      };
    default:
      return state;
  }
}
