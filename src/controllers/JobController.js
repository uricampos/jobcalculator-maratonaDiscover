//importando Job (model) para este arquivo
const Job = require('../model/Job');

//importando JobUtils para usar o antigo "services"
const JobUtils = require('../utils/jobUtils');

//importando Profile (model) para este arquivo
const Profile = require('../model/Profile');

module.exports = {

    create(req, res) {
        return res.render("job");
    },

    save(req, res) {

        const jobs = Job.get();


        //req.body = { name: 'sdfghjk', 'daily-hours': '3', 'total-hours': '3' }
        const lastId = jobs[jobs.length - 1]?.id || 0;
        
        jobs.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() //atribuindo data de hoje
        });
        return res.redirect('/');
    },

    show(req, res) {
        const jobId= req.params.id;
        const jobs = Job.get();
        const profile = Profile.get();

        const job = jobs.find(job => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send('job not found!');
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);
        
        return res.render("job-edit", { job });
    },

    update(req, res) {
        const jobId = req.params.id;
        const jobs = Job.get();

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        const newJobs = jobs.map(job => {
            
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob;
            }
            
            return job;
        })

        Job.update(newJobs);

        return res.redirect('/job/' + jobId);
    },

    delete(req, res) {
        const jobId = req.params.id;

        Job.delete(jobId);
        
        return res.redirect('/');
    }
}