const Trip = require('../models/trip');

module.exports.create = async function(req, res){
    try{

        let trip = await Trip.findOne({name: req.body.name});

        if(!trip){
            trip = await Trip.create({name: req.body.name});
        }

        return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error in Trip Code'
        });
    }
}

module.exports.destroy = async function(req, res){
    try{

        await Trip.findByIdAndRemove(req.query.id);

        return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error in Trip Code'
        });
    }
}