const studentDB = require('../../../models/Auth');
const studentValidator = require('../../../Validators/studentValidator');
const hashPassword = require('../../../utils/passwordHash');

module.exports = 
{

    signupstudent : async(parent, args , context, info) =>
        {
            const {studentData} = args;
            

            const resultFromJoi =  studentValidator('firstName lastName email password mobileNumber title', studentData);
           
            if(!resultFromJoi)
            {
                throw new Error('You have entered Wrong Credentials');
            }
            

            const {generateSalt, generateHash} =await hashPassword(studentData.password);
            
            

            if(!generateHash)
            {
                throw new Error('Internal Password Error in hashing');
            }

            studentData.password = generateHash;

            studentData.salt = generateSalt;
            

            try{
                const studentEmail = await studentDB.findOne({email : studentData.email});
                

                if(studentEmail)
                {
                    throw new Error('User already Exists');
                }

            }
            catch(err)
            {
                throw new Error(`${err}`);
            }


            try 
            {
                const student = await  new studentDB(studentData);

                if(!student)
                {
                    throw new Error(`Something went Wrong`);
                }

                else 
                {
                    student.save();

                    return {
                        status: true,
                        message: "Used Signed up Successfully",
                        student: student
                    }
                }

                
            }
            catch(err)
            {
                throw new Error(`${err}`)
            }
    
            
        }
    
    
}