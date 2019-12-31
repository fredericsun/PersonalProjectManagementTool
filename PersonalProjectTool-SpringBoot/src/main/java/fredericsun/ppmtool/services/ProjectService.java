package fredericsun.ppmtool.services;

import fredericsun.ppmtool.domain.Project;
import fredericsun.ppmtool.exceptions.ProjectIdException;
import fredericsun.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        }
        catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
        }
    }

    public Project findProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null)
            throw new ProjectIdException("Project ID '" + projectId.toUpperCase() + "' does not exist");
        return projectRepository.findByProjectIdentifier(projectId.toUpperCase());
    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null)
            throw new ProjectIdException("Cannot delete the project. Project ID '" + projectId.toUpperCase() + "' does not exist");
        projectRepository.delete(project);
    }

}
