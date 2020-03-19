import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./layout/Header";
import ProjectItem from "./project/ProjectItem";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddProject from "./project/AddProject";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";
import UpdateProject from "./project/UpdateProjects";

const classes = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4)
  }
}));

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      openCreate: false,
      openUpdate: false,
      updateId: ""
    };

    this.handleCreateOpen = this.handleCreateOpen.bind(this);
    this.handleCreateClose = this.handleCreateClose.bind(this);
    this.handleUpdateOpen = this.handleUpdateOpen.bind(this);
    this.handleUpdateClose = this.handleUpdateClose.bind(this);
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

  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects } = this.props.project;
    return (
      <div>
        <Header title="Dashboard" />
        <Container maxWidth="md" className={classes.container}>
          <Grid justify="space-between" container spacing={3}>
            <Box
              component="div"
              display="inline"
              p={5}
              m={0}
              bgcolor="background.paper"
            >
              <Typography variant="h4">Project Overview</Typography>
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
            {projects.map(project => (
              <Grid item xs={12}>
                <ProjectItem
                  key={project.id}
                  project={project}
                  onOpenUpdate={this.handleUpdateOpen}
                />
                <br />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Dialog
          open={this.state.openCreate}
          onClose={this.handleCreateClose}
          aria-labelledby="create-project"
        >
          <DialogTitle id="create-project">Create a New Project</DialogTitle>
          <DialogContent>
            <AddProject
              onCloseDialog={this.handleCreateClose}
              history={this.props.history}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.openUpdate}
          onClose={this.handleUpdateClose}
          aria-labelledby="update-project"
        >
          <DialogTitle id="update-project">Edit/Update a Project</DialogTitle>
          <DialogContent>
            <UpdateProject
              onCloseDialog={this.handleUpdateClose}
              history={this.props.history}
              targetId={this.state.updateId}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
