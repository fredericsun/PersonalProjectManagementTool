import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Website Made by Yue Sun
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const classes = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(LoginRequest);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className={classes.root}>
        <Header />
        <Container component="main" maxWidth="xs">
          <LockOutlinedIcon />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="username"
              autoComplete="email"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username != null}
              autoFocus
            />
            <Typography variant="caption" color="error">
              {errors.username}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password != null}
            />
            <Typography variant="caption" color="error">
              {errors.password}
            </Typography>
            <br></br>
            <br></br>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <br></br>
            <br></br>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

Landing.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(mapStateToProps, { login })(Landing);
