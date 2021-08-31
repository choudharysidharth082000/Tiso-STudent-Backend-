const {Student} = require('../../../models/Auth');
const studentValidator = require('../../../Validators/studentValidator');
const verifyPass = require('../../../utils/verifyPassword');
const generateJWT = require('../../../utils/generateJWT')
module.exports = 
{

    books: () =>
    {
        return "Hello There"
    },
    login: async (parent , args , context , info)=>
    {

        const {email , password} = args;
        

        const data ={email, password};
        

        const resultFromJoi = studentValidator('email password', data);


        if(!resultFromJoi)
        {
            throw new Error('User Has Entered Invalid Credentials');
        }


        try 
        {
            const user = await Student.findOne({email: email});

            if(!user){
                throw new Error('Entered Wrong Credentials');
            }


            



            const verifier = await verifyPass(password, user.password);
            

           

            if(!verifier)
            {
                throw new Error('Entered Wrong Username or Password');
            }


            const userAccess = generateJWT(user);



            return {
                status: true,
                message : "Login Successful",
                student: user,
                accessToken : userAccess
            }
            

            
            
        }
        catch(err)
        {
            throw new Error(`${err}`);
        }

        

        

    }
    
}