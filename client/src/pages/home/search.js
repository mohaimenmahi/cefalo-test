import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { useLocation } from "react-router-dom";

import { searchResult } from "../../redux/actions/home";
import { isExist } from "../../helpers/globalFunc";

import Menubar from "../../components/Menubar";

import "../../assets/styles/home.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = (props) => {
  let { searchResult, loading, searchData, wishlist } = props;

  let query = useQuery();

  let text = query.get("text");

  useEffect(() => {
    let newText = text.trim();
    let checkText = /\S/.test(newText);
    if (checkText) {
      let data = {
        key: newText,
      };
      searchResult(data);
    }
  }, [text]);

  let products = searchData ? searchData : [];

  return (
    <>
      <Menubar text={text} />
      <div className="main">
        {loading ? (
          <div className="heading">Loading...</div>
        ) : products.length ? (
          <>
            <h4 className="heading">Search Result of {text}</h4>
            <div className="product-list">
              {products.map((item) => {
                let isListed = isExist(wishlist, item._id);
                return (
                  <div className="card-single">
                    <ProductCard product={item} isListed={isListed} />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <h4 className="heading">No products found for {text}</h4>
        )}
      </div>
    </>
  );
};

let stateToProps = (state) => {
  return {
    searchData: state.homeReducer.searchResult,
    loading: state.homeReducer.searchLoading,
    wishlist: state.wishlistReducer.wishlist,
  };
};

let dispatchToProps = (dispatch) => {
  return {
    searchResult: (data) => dispatch(searchResult(data)),
  };
};

export default connect(stateToProps, dispatchToProps)(Search);
