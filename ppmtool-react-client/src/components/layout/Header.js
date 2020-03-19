import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../actions/securityActions";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";

class Header extends Component {
  logout() {
    this.props.logout();
    window.location.fref = "/";
  }
  render() {
    const { validToken, user } = this.props.security;

    let headerLinks;

    if (validToken && user) {
      const initials = user.fullName.split(" ");
      headerLinks = (
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              component={Link}
              to={"/dashboard"}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" align="left" style={{ flex: 1 }}>
              {this.props.title}
            </Typography>
            <Button href="/dashboard" color="inherit">
              <Avatar>{initials[0].charAt(0) + initials[1].charAt(0)}</Avatar>
            </Button>
            <Button href="/" color="inherit" onClick={this.logout.bind(this)}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      );
    } else {
      headerLinks = (
        <div>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton component={Link} to={"/"} color="inherit">
                <DoneAllIcon fontSize="large" />
              </IconButton>
              <Typography variant="h5" align="left">
                MyPlanner
              </Typography>
            </Toolbar>
          </AppBar>
          <br></br>
          <br></br>
          <br></br>
        </div>
      );
    }

    return <div>{headerLinks}</div>;
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps, { logout })(Header);
