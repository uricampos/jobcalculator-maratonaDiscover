const Profile = require('../model/Profile.js')

module.exports = {
    index(req, res) {
        return res.render("profile", { profile: Profile.get() })
    },

    update(req, res) {
        //req.body para pegar os dados
        const data = req.body;

        //definir quantas semanas tem no ano: 52
        const weeksPerYear = 52;

        //remover as semanas de ferias do ano
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"] ) / 12;

        //quantas horas por semana estou trabalhando
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

        //horas trabalhadas no mes
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;

        //qual sera o valor da minha hora
        const value = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": value
        }) 
        return res.redirect('/profile');
    },
}