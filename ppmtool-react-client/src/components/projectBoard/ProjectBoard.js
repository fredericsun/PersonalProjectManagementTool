import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../layout/Header";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";
import AddProjectTask from "./projectTasks/AddProjectTask";
import UpdateProjectTask from "./projectTasks/UpdateProjectTask";
import Backlog from "./Backlog";
import Alert from "@material-ui/lab/Alert";

const classes = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4)
  }
}));

class ProjectBoard extends Component {
  constructor() {
    super();

    this.state = {
      openCreate: false,
      openUpdate: false,
      updateId: "",
      errors: {}
    };

    this.handleCreateOpen = this.handleCreateOpen.bind(this);
    this.handleCreateClose = this.handleCreateClose.bind(this);
    this.handleUpdateOpen = this.handleUpdateOpen.bind(this);
    this.handleUpdateClose = this.handleUpdateClose.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleCreateOpen = () => {
    this.setState({ openCreate: true });
  };

  handleCreateClose = () => {
    this.setState({ openCreate: false });
  };

  handleUpdateOpen = id => {
    this.setState({ updateId: id });
    this.setState({ openUpdate: true });
  };

  handleUpdateClose = () => {
    this.setState({ openUpdate: false });
  };

  render() {
    const { id } = this.props.match.params;
    const { project_tasks } = this.props.backlog;
    const { errors } = this.state;

    let BoardContent;

    const boardAlgorithm = (errors, project_tasks) => {
      if (project_tasks.length < 1) {
        if (errors.projectNotFound) {
          return (
            <Alert variant="filled" severity="error">
              {errors.projectNotFound}
            </Alert>
          );
        } else {
          return (
            <Container maxWidth="lg" className={classes.container}>
              <Grid justify="space-between" container spacing={3}>
                <Box
                  component="div"
                  display="inline"
                  p={5}
                  m={0}
                  bgcolor="background.paper"
                >
                  <Typography variant="h4">Project Tasks</Typography>
                </Box>
                <Box
                  component="div"
                  display="inline"
                  p={5}
                  m={0}
                  bgcolor="background.paper"
                >
                  <Fab
                    color="primary"
                    aria-label="add"
                    onClick={this.handleCreateOpen}
                  >
                    <AddIcon />
                  </Fab>
                </Box>
              </Grid>
              <br />
              <Alert variant="filled" severity="info">
                No Project Tasks on this board
              </Alert>
              <br />
              <Backlog
                project_tasks={project_tasks}
                onOpenUpdate={this.handleUpdateOpen}
              />
            </Container>
          );
        }
      } else {
        return (
          <Container maxWidth="lg" className={classes.container}>
            <Grid justify="space-between" container spacing={3}>
              <Box
                component="div"
                display="inline"
                p={5}
                m={0}
                bgcolor="background.paper"
              >
                <Typography variant="h4">Project Tasks</Typography>
              </Box>
              <Box
                component="div"
                display="inline"
                p={5}
                m={0}
                bgcolor="background.paper"
              >
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={this.handleCreateOpen}
                >
                  <AddIcon />
                </Fab>
              </Box>
            </Grid>
            <Backlog
              project_tasks={project_tasks}
              onOpenUpdate={this.handleUpdateOpen}
            />
          </Container>
        );
      }
    };

    BoardContent = boardAlgorithm(errors, project_tasks);
    return (
      <div className={classes.root}>
        <Header title="Project Board" />
        {BoardContent}
        <Dialog
          open={this.state.openCreate}
          onClose={this.handleCreateClose}
          aria-labelledby="create-task"
        >
          <DialogTitle id="create-task">Create a New Task</DialogTitle>
          <DialogContent>
            <AddProjectTask
              onCloseDialog={this.handleCreateClose}
              history={this.props.history}
              projectIdentifier={id}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.openUpdate}
          onClose={this.handleUpdateClose}
          aria-labelledby="update-task"
        >
          <DialogTitle id="update-task">Edit/Update a Project</DialogTitle>
          <DialogContent>
            <UpdateProjectTask
              onCloseDialog={this.handleUpdateClose}
              history={this.props.history}
              projectIdentifier={id}
              targetId={this.state.updateId}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
