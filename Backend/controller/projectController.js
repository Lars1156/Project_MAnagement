const projectServices = require ('../services/projectServices');
// creating project for new
exports.createProjects = async(req,res)=>{
    try {
        const project = await projectServices.createProject(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
