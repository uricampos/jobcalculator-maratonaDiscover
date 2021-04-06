//importando Job para este arquivo
const Job = require('../model/Job');

//importando JobUtils para este arquivo
const JobUtils = require('../utils/jobUtils');

//importando Profile para este arquivo
const Profile = require('../model/Profile');

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    let statusCount = {
        progress: 0,
        done: 0,
        total: jobs.length
    }

    //total de horas por dia de cada Job em progress
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      //ajustes no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      //status = done
      //statusCount[done || progress] += 1
      //somando a quantidade de status
      statusCount[status] += 1;

      //total de horas por dia de cada Job em progress
      jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    // quantidade de horas que quero trabalhar/dia (PROFILE)
    // MENOS 
    // a quantidade de horas/dia de cada job em progress
    const freeHours = profile['hours-per-day'] - jobTotalHours;

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours });
  },
};
