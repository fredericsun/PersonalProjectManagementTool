import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { deleteProjectTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withConfirm from "material-ui-confirm";

const classes = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

class ProjectTaskItem extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  onDeleteClick(backlog_id, pt_id) {
    this.props.deleteProjectTask(backlog_id, pt_id);
  }

  render() {
    const { project_task } = this.props;
    let priorityString = "";
    let headerColor = "";
    if (project_task.priority === 1) {
      priorityString = "High";
      headerColor = "red";
    } else if (project_task.priority === 2) {
      priorityString = "Medium";
      headerColor = "orange";
    } else {
      priorityString = "Low";
      headerColor = "green";
    }

    const styles = {
      cardHeader: {
        background: headerColor,
        color: "white"
      }
    };
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            title={"ID: " + project_task.projectSequence}
            style={styles.cardHeader}
            titleTypographyProps={{ variant: "subtitle2", color: "inherit" }}
            subheader={"Priority: " + priorityString}
            subheaderTypographyProps={{
              variant: "subtitle2",
              color: "inherit"
            }}
          />
          <CardContent>
            <Typography variant="h6" inline="true" align="left">
              {project_task.summary}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              inline="true"
              align="left"
            >
              {project_task.acceptanceCriteria}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <CreateIcon
                onClick={() =>
                  this.props.onOpenUpdate(project_task.projectSequence)
                }
              />
            </IconButton>
            <IconButton aria-label="share">
              <DeleteForeverIcon
                onClick={this.props.confirm(
                  this.onDeleteClick.bind(
                    this,
                    project_task.projectIdentifier,
                    project_task.projectSequence
                  ),
                  {
                    description: `Project Task "${project_task.projectSequence}" will be permanently deleted.`
                  }
                )}
              />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        <br />
      </div>
    );
  }
}

ProjectTaskItem.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired
};
export default withConfirm(
  connect(null, { deleteProjectTask })(ProjectTaskItem)
);
