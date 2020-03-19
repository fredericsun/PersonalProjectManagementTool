import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ProjectTaskItem from "./projectTasks/ProjectTaskItem";
import Typography from "@material-ui/core/Typography";

class Backlog extends Component {
  render() {
    const { project_tasks, onOpenUpdate } = this.props;
    const tasks = project_tasks.map(project_task => (
      <ProjectTaskItem
        key={project_task.id}
        project_task={project_task}
        onOpenUpdate={onOpenUpdate}
      />
    ));

    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].props.project_task.status === "TO_DO") {
        todoItems.push(tasks[i]);
      }
      if (tasks[i].props.project_task.status === "IN_PROGRESS") {
        inProgressItems.push(tasks[i]);
      }
      if (tasks[i].props.project_task.status === "DONE") {
        doneItems.push(tasks[i]);
      }
    }

    return (
      <Grid container spacing={3}>
        <Grid item md={4}>
          <Paper elevation={0}>
            <Box bgcolor="text.secondary" color="background.paper" p={2}>
              <Typography>TO DO</Typography>
            </Box>
            <br />
            {todoItems}
            {}
          </Paper>
        </Grid>

        <Grid item md={4}>
          <Paper elevation={0}>
            <Box
              bgcolor="info.main"
              color="info.contrastText"
              fontWeight="fontWeightBold"
              p={2}
            >
              <Typography>IN PROGRESS</Typography>
            </Box>
            <br />
            {inProgressItems}
            {}
          </Paper>
        </Grid>

        <Grid item md={4}>
          <Paper elevation={0}>
            <Box
              bgcolor="success.main"
              color="success.contrastText"
              fontWeight="fontWeightBold"
              p={2}
            >
              <Typography>COMPLETED</Typography>
            </Box>
            <br />
            {doneItems}
            {}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Backlog;
