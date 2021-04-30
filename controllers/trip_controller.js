const Trip = require('../models/trip');
const cal = require('../calculations/calculation');
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

module.exports.tripOpen = async function(req, res){
    try{
        let trip = await Trip.findById(req.query.id);

        return res.render('trip', {
            trip: trip
        });
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error in Trip Code'
        });
    }
}

module.exports.createUser = async function(req, res){
    try{
        let trip = await Trip.findById(req.body.id);
        
        let username = req.body.name;

        for(let user of trip.users)
        {
            if(user.name == username)
            {
                return res.redirect('back');
            }
        }

        let user = {
            name: username,
            money: 0
        }

        trip.users.push(user);
        trip.save();

        return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error in Trip Code'
        });
    }
}

module.exports.enterData = async function(req, res){
    try{
        let trip = await Trip.findById(req.body.id);

        for(var user of trip.users)
        {
            if(user.name == req.body.name)
            {
                user.money = req.body.money;
                break;
            }
        }

        trip.save();

        return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error in Trip Code'
        });
    }
}

module.exports.calcuate = async function(req, res){
    try{
        let trip = await Trip.findById(req.query.id);

        let total = 0, n = trip.users.length, temp = trip.users;

        for(var user of trip.users)
        {
            total += user.money;
        }

        let re = [], common = total/n;

        for(var user of temp)
        {
            user.money = user.money - common;
        }

        while(1)
        {
            let val1 = -1, Max = -1, curr = 0;

            for(var user of temp)
            {
                if(user.money > val1)
                {
                    val1 = user.money;
                    Max = curr;
                }

                curr++;
            }

            let val2 = 1, Min = -1;

            curr = 0;

            for(var user of temp)
            {
                if(user.money < val2)
                {
                    val2 = user.money;
                    Min = curr;
                }

                curr++;
            }

            if(temp[Max].money == 0 && temp[Min].money == 0)
                break;
            
            let name1 = temp[Max].name;
            let name2 = temp[Min].name;

            let b = -temp[Min].money;
            let a = temp[Max].money;

            let val;

            if(a > b)
                val = b;
            else
                val = a;

                console.log(a, b);

            temp[Min].money += val;
            temp[Max].money -= val;

            let string = name2 + ' pay ' + val + ' rupess to ' + name1;

            re.push(string);

        }

        console.log(re);

        return res.render('calculate', {
            re: re
        });

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error in Trip Code'
        });
    }
}