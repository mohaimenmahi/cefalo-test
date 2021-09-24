import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Home = (props) => {
  return <StyledHome>This is home</StyledHome>;
};

const StyledHome = styled.div`
  margin-top: 25px;
  padding: 0 10%;
`;

export default Home;
