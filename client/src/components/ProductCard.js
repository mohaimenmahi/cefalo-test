import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteFillIcon from "@mui/icons-material/FavoriteOutlined";

import { addWishlist } from "../redux/actions/wishlist";
import { openModal } from "../redux/actions/auth";

import { connect } from "react-redux";

const ProductCard = (props) => {
  let { product, token, openModal, addWishlist, isListed } = props;

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

  return (
    <Card sx={{ width: 340, height: "100%" }}>
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
        <IconButton aria-label="add to favorites" onClick={handleAdd}>
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
  };
};

export default connect(stateToProps, dispatchToProps)(ProductCard);
