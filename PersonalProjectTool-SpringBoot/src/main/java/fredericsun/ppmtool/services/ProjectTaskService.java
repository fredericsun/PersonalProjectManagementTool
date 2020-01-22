package fredericsun.ppmtool.services;

import fredericsun.ppmtool.domain.Backlog;
import fredericsun.ppmtool.domain.Project;
import fredericsun.ppmtool.domain.ProjectTask;
import fredericsun.ppmtool.exceptions.ProjectNotFoundException;
import fredericsun.ppmtool.repositories.BacklogRepository;
import fredericsun.ppmtool.repositories.ProjectRepository;
import fredericsun.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class ProjectTaskService {
    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {
        try {
            Backlog backlog =  projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
            projectTask.setBacklog(backlog);
            Integer backLogSequence = backlog.getPTSequence();

            // update the backlog sequence
            backLogSequence++;
            backlog.setPTSequence(backLogSequence);

            // add sequence to project task
            projectTask.setProjectSequence(projectIdentifier + "-" + backLogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
                projectTask.setPriority(3);
            }

            if (projectTask.getStatus() == null || projectTask.getStatus().length() == 0) {
                projectTask.setStatus("TO_DO");
            }

            return projectTaskRepository.save(projectTask);
        }
        catch (Exception e) {
            throw new ProjectNotFoundException("Project Not Found");
        }
    }

    public Iterable<ProjectTask> findBacklogById(String id, String username) {
        Project project = projectRepository.findByProjectIdentifier(id);
        if (project == null) {
            throw new ProjectNotFoundException("Project with ID: '"+id+"' does not exist");
        }
        projectService.findProjectByIdentifier(id, username);
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id, String username) {
        projectService.findProjectByIdentifier(backlog_id, username);
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);

        if (projectTask == null)
            throw new ProjectNotFoundException("Project Task '"+pt_id+"' not found");

        if (!projectTask.getProjectIdentifier().equals(backlog_id))
            throw new ProjectNotFoundException("Project Task '"+pt_id+"' does not exist in project: '" + backlog_id + "'");

        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id, String pt_id, String username){
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id, username);

        projectTask = updatedTask;

        return projectTaskRepository.save(projectTask);
    }

    public void deletePTByProjectSequence(String backlog_id, String pt_id, String username){
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id, username);

        projectTaskRepository.delete(projectTask);
    }
}
