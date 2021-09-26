import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";

import "../../../assets/styles/home.css";

const WishItemCard = (props) => {
  let { item, remove } = props;

  let handleRemove = () => {
    let data = {
      id: item.id,
    };

    remove(data);
  };
  return (
    <Card
      sx={{
        maxWidth: { md: "50%", xs: "100%" },
        marginBottom: "16px !important",
      }}
    >
      <CardContent className="wishlist-card">
        <img src={item.image} className="item-image" />
        <div className="card-right">
          <div className="wishlist-card-item">
            <div className="title">{item.name}</div>
            <div className="desc">{item.description}</div>
            <IconButton
              sx={{ display: { xs: "block", sm: "none" } }}
              onClick={handleRemove}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <IconButton
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={handleRemove}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishItemCard;
