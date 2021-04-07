const Profile = require('../model/Profile.js')

module.exports = {
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() })
    },

    async update(req, res) {
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

        const profile = await Profile.get();
        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": value
        }) 
        return res.redirect('/profile');
    },
}