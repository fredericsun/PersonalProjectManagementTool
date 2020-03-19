import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const classes = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

class AddProject extends Component {
  constructor() {
    super();

    this.state = {
      projectName: "",
      projectId: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      errors: {}
    };

    this.startDateChange = this.startDateChange.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  startDateChange = date => {
    this.setState({ startDate: date });
  };

  endDateChange = date => {
    this.setState({ endDate: date });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectId,
      description: this.state.description,
      start_date: this.state.startDate,
      end_date: this.state.endDate
    };
    // history props only exists in component who is routered
    // this.props.createProject(newProject, this.props.history);
    this.props.createProject(
      newProject,
      this.props.onCloseDialog,
      this.props.history
    );
  };

  render() {
    const { errors } = this.state;
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Box component="div" display="inline" p={1} m={1}>
            <Typography variant="h5" gutterBottom pt={5}>
              Create a New Project
            </Typography>
          </Box> */}
          <form className={classes.form} onSubmit={this.onSubmit}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={this.state.projectName}
                    onChange={this.onChange}
                    name="projectName"
                    id="projectName"
                    label="Project Name"
                    autoFocus
                    autoComplete="pname"
                    error={errors.projectName != null}
                  />
                  <Typography variant="caption" color="error">
                    {errors.projectName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={this.state.projectId}
                    onChange={this.onChange}
                    name="projectId"
                    id="projectId"
                    label="Project ID"
                    autoComplete="id"
                    error={errors.projectIdentifier != null}
                  />
                  <Typography variant="caption" color="error">
                    {errors.projectIdentifier}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows="4"
                    value={this.state.description}
                    onChange={this.onChange}
                    name="description"
                    id="description"
                    label="Project Description"
                    autoComplete="description"
                    error={errors.description != null}
                  />
                  <Typography variant="caption" color="error">
                    {errors.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <KeyboardDatePicker
                    variant="outlined"
                    required
                    format="MM/dd/yyyy"
                    margin="normal"
                    name="startDate"
                    id="startDate"
                    label="Start Date"
                    value={this.state.startDate}
                    onChange={this.startDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <KeyboardDatePicker
                    variant="outlined"
                    required
                    format="MM/dd/yyyy"
                    margin="normal"
                    name="endDate"
                    id="endDate"
                    label="Estimated End Date"
                    value={this.state.endDate}
                    onChange={this.endDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </Grid>
              </Grid>
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                justify="flex-end"
                className={classes.submit}
              >
                CREATE PROJECT
              </Button>
              <br />
              <br />
            </MuiPickersUtilsProvider>
          </form>
        </div>
      </Container>
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStoreToProps = state => ({
  errors: state.errors
});

export default connect(mapStoreToProps, { createProject })(AddProject);
