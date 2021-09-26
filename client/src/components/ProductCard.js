import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteFillIcon from "@mui/icons-material/FavoriteOutlined";

import { addWishlist, removeWishlist } from "../redux/actions/wishlist";
import { openModal } from "../redux/actions/auth";

import { connect } from "react-redux";

import "../assets/styles/home.css";

const ProductCard = (props) => {
  let { product, token, openModal, addWishlist, isListed, removeWishlist } =
    props;

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
    if (isListed) handleRemove();
    else handleAdd();
  };

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
        <IconButton aria-label="add to favorites" onClick={handleClick}>
          {isListed ? <FavoriteFillIcon /> : <FavoriteIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

let stateToProps = (state) => {
  return {
    token: state.authReducer.token,
  };
};

let dispatchToProps = (dispatch) => {
  return {
    openModal: (data) => dispatch(openModal(data)),
    addWishlist: (data) => dispatch(addWishlist(data)),
    removeWishlist: (data) => dispatch(removeWishlist(data)),
  };
};

export default connect(stateToProps, dispatchToProps)(ProductCard);
