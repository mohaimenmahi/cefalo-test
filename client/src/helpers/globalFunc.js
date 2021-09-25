export const isExist = (wishlist, id) => {
  let found = wishlist.find((item) => item.productId._id === id);

  if (found) return true;
  else return false;
};
