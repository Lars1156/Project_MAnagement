const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    projectReason: {
        type: String,
        required: true,
        enum: ['ForBusiness', 'ForPersonal', 'ForDealership', 'ForTransport'],
        default: 'ForBusiness'
    },
    projectType: {
        type: String,
        required: true,
        enum: ['Internal', 'Development', 'Research', 'Marketing'],
        default: 'Internal'
    },
    projectDivision: {
        type: String,
        required: true,
    },
    projectCategory: {
        type: String,
        required: true,
        enum: ['Category A', 'Category B', 'Category C'],
        default: 'Category A'
    },
    projectPriority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    projectDepartment: {
        type: String,
        required: true,
        enum: ['Management', 'Strategy', 'Software', 'E-Commerce', 'Health Care'],
        default: 'Strategy'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= this.startDate;
            },
            message: 'End date cannot be earlier than start date.'
        }
    },
    projectStatus: {
        type: String,
        enum: ['Registered', 'Running', 'Cancelled', 'Completed'],
        default: 'Registered'
    },
    location: {
        type: String,
        required: true,
        trim: true
    }
});

// Unique compound index to prevent duplicate projects
projectSchema.index({ projectName: 1, startDate: 1, location: 1 }, { unique: true });

// Pre-save hook to ensure unique project name per location and start date
projectSchema.pre('save', async function(next) {
    const project = await mongoose.models.Project.findOne({
        projectName: this.projectName,
        startDate: this.startDate,
        location: this.location
    });
    if (project) {
        throw new Error('A project with the same name, start date, and location already exists.');
    }
    next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
