module.exports.getMin = async function(arr)
{
    try{
        let val = 1, index, curr = 0;

        for(var user of arr)
        {
            if(user.money < val)
            {
                val = user.money;
                index = curr;
            }

            curr++;
        }

        let res = {
            index: index
        };

        return res;
    }catch(err)
    {
        console.log(err);
        return res.json(500, {
            message: 'Error in calculations'
        });
    }
}

module.exports.getMax = async function(arr)
{
    try{
        let val = -1, index, curr = 0;

        for(var user of arr)
        {
            if(user.money > val)
            {
                val = user.money;
                index = curr;
            }

            curr++;
        }

        let res = {
            index: index
        };

        return res;
    }catch(err)
    {
        console.log(err);
        return res.json(500, {
            message: 'Error in calculations'
        });
    }
}