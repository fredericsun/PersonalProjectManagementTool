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
import Header from "../layout/Header";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.createNewUser(newUser, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Header />
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <LockOutlinedIcon />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <br></br>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="fullName"
                    variant="outlined"
                    fullWidth
                    label="Full Name"
                    autoFocus
                    value={this.state.fullName}
                    onChange={this.onChange}
                    error={errors.fullName != null}
                  />
                  <Typography variant="caption" color="error">
                    {errors.fullName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                    name="username"
                    autoComplete="email"
                    value={this.state.username}
                    onChange={this.onChange}
                    error={errors.username != null}
                  />
                  <Typography variant="caption" color="error">
                    {errors.username}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                    error={errors.confirmPassword != null}
                  />
                  <Typography variant="caption" color="error">
                    {errors.confirmPassword}
                  </Typography>
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <br></br>
              <br></br>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}
Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(mapStateToProps, { createNewUser })(Register);
