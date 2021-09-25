import React, { useEffect } from "react";
import WishItemCard from "./view/listItemCard";
import Button from "@mui/material/Button";

import { connect } from "react-redux";

import {
  removeWishlist,
  clearWishlist,
  getWishlist,
} from "../../redux/actions/wishlist";

import "../../assets/styles/home.css";

const Wishlist = (props) => {
  let { removeItem, clearWishlist, wishlist, loading, getWishlist } = props;

  useEffect(() => {
    getWishlist();
  }, []);

  let listItems = wishlist.map((item) => {
    let obj = {
      id: item._id,
      name: item.productId.name,
      image: item.productId.image,
      description: item.productId.description,
    };

    return obj;
  });

  return (
    <div className="main">
      <div className="title-section">
        <h4>{wishlist.length ? wishlist.length : "No"} items in wishlist</h4>
        <Button variant="contained" onClick={clearWishlist}>
          Clear All
        </Button>
      </div>
      <div className="wishlist">
        {listItems.map((item) => (
          <WishItemCard item={item} remove={removeItem} />
        ))}
      </div>
    </div>
  );
};

let stateToProps = (state) => {
  return {
    wishlist: state.wishlistReducer.wishlist,
    loading: state.wishlistReducer.wishlistLoading,
  };
};

let dispatchToProps = (dispatch) => {
  return {
    removeItem: (data) => dispatch(removeWishlist(data)),
    clearWishlist: (data) => dispatch(clearWishlist(data)),
    getWishlist: (data) => dispatchToProps(getWishlist()),
  };
};

export default connect(stateToProps, dispatchToProps)(Wishlist);
