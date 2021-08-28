const bcrypt = require('bcrypt');
const saltRound = process.env.SALTROUND;


module.exports =(password) => 
{

    if(!password)
    {
        throw new Error('Password is not loaded in the hasher');
    }

    const salts = bcrypt.genSalt(saltRound);
    console.log(salts);

}