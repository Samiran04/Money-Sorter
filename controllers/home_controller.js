const Trip = require('../models/trip');

module.exports.home = async function(req, res){
    try{

        let trips = await Trip.find({});

        return res.render('home', {
            trips: trips
        });
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error in home Code'
        });
    }
}