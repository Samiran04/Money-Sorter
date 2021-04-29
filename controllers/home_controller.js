module.exports.home = async function(req, res){
    try{
        return res.render('home');
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error in home Code'
        });
    }
}