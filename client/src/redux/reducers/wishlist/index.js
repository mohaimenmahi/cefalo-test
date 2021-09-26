import { WISHLIST } from "../../constants/wishlist";

let initState = {
  wishlist: [],
  wishlistLoading: false,
  wishlistErr: null,
  addLoading: false,
  addErr: null,
  removeLoading: false,
  removeErr: null,
  clearLoading: false,
  clearErr: null,
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

    case WISHLIST.ADD_WISHLIST.MAIN:
      return {
        ...state,
        addLoading: true,
        addErr: null,
      };

    case WISHLIST.ADD_WISHLIST.SUCCESS:
      let newItem = action.result;
      // let newList = [...state.wishlist];

      // newList.push(newItem);

      return {
        ...state,
        wishlist: newItem,
        addLoading: false,
      };

    case WISHLIST.ADD_WISHLIST.FAILURE:
      return {
        ...state,
        addLoading: false,
        addErr: "Error from wishlist add",
      };

    case WISHLIST.REMOVE_WISHLIST.MAIN:
      return {
        ...state,
        removeLoading: true,
        removeErr: null,
      };

    case WISHLIST.REMOVE_WISHLIST.SUCCESS:
      let remove = action.result;

      // let removeList = state.wishlist.filter((item) => item._id !== remove.id);

      return {
        ...state,
        removeLoading: false,
        removeErr: null,
        wishlist: remove,
      };

    case WISHLIST.REMOVE_WISHLIST.FAILURE:
      return {
        ...state,
        removeLoading: false,
        removeErr: "Error from wishlist removing",
      };

    case WISHLIST.CLEAR_WISHLIST.MAIN:
      return {
        ...state,
        clearLoading: true,
        clearErr: null,
      };

    case WISHLIST.CLEAR_WISHLIST.SUCCESS:
      return {
        ...state,
        clearLoading: false,
        clearErr: null,
        wishlist: [],
      };

    case WISHLIST.CLEAR_WISHLIST.FAILURE:
      return {
        ...state,
        clearLoading: false,
        clearErr: "Error from wishlist clear",
      };

    case WISHLIST.CLEAR_LOGOUT:
      return {
        ...state,
        wishlist: [],
      };

    default:
      return state;
  }
}
