import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProject, createProject } from "../../actions/projectActions";
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

class UpdateProject extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
      errors: {}
    };

    this.startDateChange = this.startDateChange.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProject(this.props.targetId, this.props.history);
  }

  // life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    } = nextProps.project;
    this.setState({
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    });
  }

  startDateChange = date => {
    this.setState({ start_date: date });
  };

  endDateChange = date => {
    this.setState({ end_date: date });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const updateProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };
    // history props only exists in component who is routered
    // this.props.createProject(newProject, this.props.history);
    this.props.createProject(
      updateProject,
      this.props.onCloseDialog,
      this.props.history
    );
  };

  render() {
    const { errors } = this.state;
    // var target;
    // this.props.projects.map(project => {
    //   if (project.id === this.props.targetId) {
    //     target = project;
    //   }
    // });
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
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
                    value={this.state.projectIdentifier}
                    onChange={this.onChange}
                    name="projectIdentifier"
                    id="projectIdentifier"
                    label="Project ID"
                    autoComplete="id"
                    disabled
                  />
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
                    name="start_date"
                    id="start_date"
                    label="Start Time"
                    value={this.state.start_date}
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
                    name="end_date"
                    id="end_date"
                    label="End Time"
                    value={this.state.end_date}
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
                UPDATE PROJECT
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
UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project.project,
  errors: state.errors
});

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
