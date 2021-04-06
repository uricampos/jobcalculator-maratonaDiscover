//biblioteca para criar o servidor
const express =  require('express');

//parte do express que vai criar rotas
const routes = express.Router();

//importando profileController para este arquivo
const profileController = require('./controllers/ProfileController');

//importando JobController para este arquivo
const JobController = require('./controllers/JobController');

//importando DashboardController para este arquivo
const DashboardController = require('./controllers/DashboardController');

routes.get('/', DashboardController.index);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);
routes.get('/profile', profileController.index);
routes.post('/profile', profileController.update);


module.exports = routes;