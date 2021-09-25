import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Home = (props) => {
  let { allProducts, loading } = props;
  return (
    <StyledHome>
      {loading ? "Loading.." : `Total Products: ${allProducts.length}`}
    </StyledHome>
  );
};

const StyledHome = styled.div`
  margin-top: 25px;
  padding: 0 10%;
`;

let stateToProps = (state) => {
  return {
    allProducts: state.homeReducer.allProducts,
    loading: state.homeReducer.allProductLoading,
  };
};

export default connect(stateToProps)(Home);
