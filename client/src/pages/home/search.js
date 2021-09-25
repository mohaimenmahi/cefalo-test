import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { useLocation } from "react-router-dom";

import { searchResult } from "../../redux/actions/home";

import "../../assets/styles/home.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = (props) => {
  let { searchResult, loading, searchData } = props;

  let query = useQuery();

  let text = query.get("text");

  useEffect(() => {
    let data = {
      key: text,
    };
    searchResult(data);
  }, []);

  let products = searchData ? searchData : [];
  return (
    <div className="main">
      <h4 className="heading">Search Result of {text}</h4>
      {loading ? (
        <div className="heading">Loading...</div>
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
        <h4 className="heading">`No products found for ${text}`</h4>
      )}
    </div>
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
