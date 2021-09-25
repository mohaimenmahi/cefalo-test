import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useHistory, Link } from "react-router-dom";

import { fetchProducts, searchResult } from "../redux/actions/home";
import { getWishlist, clearLogout } from "../redux/actions/wishlist";
import { openModal, logOut } from "../redux/actions/auth";

import { connect } from "react-redux";

import "../assets/styles/menubar.css";

const MenuBar = (props) => {
  let {
    token,
    fetchProducts,
    searchResult,
    getWishlist,
    authData,
    openModal,
    logOut,
    clearLogout,
  } = props;

  let history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  let [searchText, setSearchText] = useState("");

  let handleLogin = () => {
    handleMobileMenuClose();
    openModal("login");
  };

  let handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  let handleSearch = (e) => {
    e.preventDefault();
    let data = {
      key: searchText,
    };
    searchResult(data);
    history.push("/search?text=" + searchText);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  let handleLogout = () => {
    logOut();
    clearLogout();
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <p>Products</p>
      </MenuItem>
      {token ? (
        <MenuItem>
          <p>Wishlist</p>
        </MenuItem>
      ) : null}
      {token ? (
        authData ? (
          <MenuItem onClick={handleProfileMenuOpen}>
            <p>{authData.name}</p>
          </MenuItem>
        ) : null
      ) : (
        <MenuItem onClick={handleLogin}>
          <p>Login</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box className="main-box">
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              E-COMMERCE
            </Typography>
          </Link>
          <form onSubmit={handleSearch}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onChange={handleSearchText}
                value={searchText}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <button type="submit" style={{ display: "none" }} />
          </form>
          <Box sx={{ flexGrow: 1 }} />
          <Box className="nav">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <IconButton
                size="small"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <h4 className="nav-text">Products</h4>
              </IconButton>
            </Link>

            {token ? (
              <IconButton size="small" color="inherit">
                <Badge badgeContent={2} color="error">
                  <h4 className="nav-text">Wishlist</h4>
                </Badge>
              </IconButton>
            ) : null}

            {token ? (
              authData ? (
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <h4 className="nav-text">{authData.name}</h4>
                </IconButton>
              ) : null
            ) : (
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleLogin}
                color="inherit"
              >
                <h4 className="nav-text">Login</h4>
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="small"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
  },
}));

let mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    authData: state.authReducer.authData,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    getWishlist: () => dispatch(getWishlist()),
    searchResult: (data) => dispatch(searchResult(data)),
    openModal: (data) => dispatch(openModal(data)),
    logOut: () => dispatch(logOut()),
    clearLogout: () => dispatch(clearLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
