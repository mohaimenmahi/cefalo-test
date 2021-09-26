import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteFillIcon from "@mui/icons-material/FavoriteOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import {
  addWishlist,
  removeWishlist,
  setClicked,
} from "../redux/actions/wishlist";
import { openModal } from "../redux/actions/auth";

import { connect } from "react-redux";

import "../assets/styles/home.css";

const ProductCard = (props) => {
  let {
    product,
    token,
    openModal,
    addWishlist,
    isListed,
    removeWishlist,
    addLoading,
    removeLoading,
    isClicked,
    setClicked,
  } = props;

  let handleAdd = () => {
    if (token) {
      let data = {
        productId: product._id,
      };

      addWishlist(data);
    } else {
      openModal("login");
    }
  };

  let handleRemove = () => {
    if (isListed) {
      let data = {
        id: isListed._id,
      };

      removeWishlist(data);
    }
  };

  let handleClick = () => {
    setClicked(product._id);
    if (isListed) handleRemove();
    else handleAdd();
  };

  let loading = addLoading || removeLoading;

  return (
    <Card className="product-card">
      <CardActionArea sx={{ cursor: "alias" }}>
        <CardMedia
          component="img"
          sx={{ height: 300 }}
          image={product.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          onClick={handleClick}
          disabled={loading && isClicked === product._id}
        >
          {isListed ? <FavoriteFillIcon /> : <FavoriteIcon />}
        </IconButton>
        {loading && isClicked === product._id ? (
          <CircularProgress color="inherit" style={{ height: 14, width: 14 }} />
        ) : null}
      </CardActions>
    </Card>
  );
};

let stateToProps = (state) => {
  return {
    token: state.authReducer.token,
    addLoading: state.wishlistReducer.addLoading,
    removeLoading: state.wishlistReducer.removeLoading,
    isClicked: state.wishlistReducer.isClicked,
  };
};

let dispatchToProps = (dispatch) => {
  return {
    openModal: (data) => dispatch(openModal(data)),
    addWishlist: (data) => dispatch(addWishlist(data)),
    removeWishlist: (data) => dispatch(removeWishlist(data)),
    setClicked: (data) => dispatch(setClicked(data)),
  };
};

export default connect(stateToProps, dispatchToProps)(ProductCard);
