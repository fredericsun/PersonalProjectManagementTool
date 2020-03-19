import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProjectTask } from "../../../actions/backlogActions";

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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

class AddProjectTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: "",
      acceptanceCriteria: "",
      priority: 0,
      status: "",
      dueDate: new Date(),
      projectIdentifier: this.props.projectIdentifier,
      errors: {}
    };

    this.dueDateChange = this.dueDateChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  dueDateChange = date => {
    this.setState({ dueDate: date });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newTask = {
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      priority: this.state.priority,
      status: this.state.status,
      dueDate: this.state.dueDate
    };
    this.props.addProjectTask(
      this.state.projectIdentifier,
      newTask,
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
          <form className={classes.form} onSubmit={this.onSubmit}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows="2"
                    value={this.state.summary}
                    onChange={this.onChange}
                    name="summary"
                    id="summary"
                    label="Project Task Summary"
                    error={errors.summary != null}
                  />
                  <Typography variant="caption" color="error">
                    {errors.summary}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows="4"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                    name="acceptanceCriteria"
                    id="acceptanceCriteria"
                    label="Acceptance Criteria"
                    error={errors.acceptanceCriteria != null}
                  />
                  <Typography variant="caption" color="error">
                    {errors.acceptanceCriteria}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink id="priority_label">
                      Priority
                    </InputLabel>
                    <Select
                      labelId="priority_label"
                      id="priority"
                      name="priority"
                      value={this.state.priority}
                      onChange={this.onChange}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem value={0}>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>High</MenuItem>
                      <MenuItem value={2}>Medium</MenuItem>
                      <MenuItem value={3}>Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink id="status_label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="status_label"
                      id="status"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="TO_DO">TO DO</MenuItem>
                      <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>
                      <MenuItem value="DONE">COMPLETED</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <KeyboardDatePicker
                    variant="outlined"
                    required
                    format="MM/dd/yyyy"
                    margin="normal"
                    name="dueDate"
                    id="dueDate"
                    label="Due Date"
                    value={this.state.dueDate}
                    onChange={this.dueDateChange}
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
                CREATE TASK
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

AddProjectTask.propTypes = {
  addProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);
