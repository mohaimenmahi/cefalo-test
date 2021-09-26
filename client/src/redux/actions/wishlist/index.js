import { WISHLIST } from "../../constants/wishlist";

export function getWishlist() {
  return {
    type: WISHLIST.FETCH_WISHLIST.MAIN,
  };
}

export function setClicked(data) {
  return {
    type: WISHLIST.SET_CLICKED,
    data,
  };
}

export function addWishlist(data) {
  return {
    type: WISHLIST.ADD_WISHLIST.MAIN,
    data,
  };
}

export function removeWishlist(data) {
  return {
    type: WISHLIST.REMOVE_WISHLIST.MAIN,
    data,
  };
}

export function clearWishlist() {
  return {
    type: WISHLIST.CLEAR_WISHLIST.MAIN,
  };
}

export function clearLogout() {
  return {
    type: WISHLIST.CLEAR_LOGOUT,
  };
}
