import React, { Component } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";
import withConfirm from "material-ui-confirm";

const classes = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

class ProjectItem extends Component {
  onDeleteClick = id => {
    this.props.deleteProject(id);
  };

  render() {
    const { project, onOpenUpdate } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <Typography variant="caption" align="center">
                {project.projectIdentifier}
              </Typography>
            </Grid>
            <Grid item md>
              <Typography variant="h5" inline="true" align="left">
                {project.projectName}
              </Typography>
              <Typography variant="body2" inline="true" align="left">
                {project.description}
              </Typography>
            </Grid>
            <Grid item xs>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
              >
                <ListItem
                  button
                  component={Link}
                  to={`/projectBoard/${project.projectIdentifier}`}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Project Board" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => onOpenUpdate(project.projectIdentifier)}
                >
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Update Project" />
                </ListItem>
                <ListItem
                  button
                  onClick={this.props.confirm(
                    this.onDeleteClick.bind(this, project.projectIdentifier),
                    {
                      description: `Project "${project.projectName}" will be permanently deleted.`
                    }
                  )}
                >
                  <ListItemIcon>
                    <DeleteForeverIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete Project" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default withConfirm(connect(null, { deleteProject })(ProjectItem));
