import React from "react";
import { connect } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { isExist } from "../../helpers/globalFunc";

import "../../assets/styles/home.css";

const Home = (props) => {
  let { allProducts, loading, wishlist } = props;
  let products = allProducts ? allProducts : [];

  console.log("Wishlist", wishlist);

  return (
    <div className="main">
      {loading ? (
        "Loading..."
      ) : (
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
      )}
    </div>
  );
};

let stateToProps = (state) => {
  return {
    allProducts: state.homeReducer.allProducts,
    loading: state.homeReducer.allProductLoading,
    wishlist: state.wishlistReducer.wishlist,
  };
};

export default connect(stateToProps)(Home);
