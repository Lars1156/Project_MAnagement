const Project = require('../model/projectModel');
// creating a new project  
exports.createProject = async(projectData)=>{
    try {
        const project = new Project(projectData);
        await project.save();
        return project;
    } catch (error) {
        throw new Error('Error creating project: ' + error.message);
    }
}