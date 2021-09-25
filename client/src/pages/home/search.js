import React from "react";
import { connect } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { useLocation } from "react-router-dom";

import "../../assets/styles/home.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = (props) => {
  let { searchResult, loading, wishlist } = props;

  let query = useQuery();

  let text = query.get("text");
  let products = searchResult ? searchResult : [];
  return (
    <div className="main">
      <h4 className="heading">Search Result of {text}</h4>
      {loading ? (
        "Loading..."
      ) : products.length ? (
        <div className="product-list">
          {products.map((item) => {
            return (
              <div className="card-single">
                <ProductCard product={item} />
              </div>
            );
          })}
        </div>
      ) : (
        `No products found for ${text}`
      )}
    </div>
  );
};

let stateToProps = (state) => {
  return {
    searchResult: state.homeReducer.searchResult,
    loading: state.homeReducer.searchLoading,
    wishlist: state.wishlistReducer.wishlist,
  };
};

export default connect(stateToProps)(Search);
