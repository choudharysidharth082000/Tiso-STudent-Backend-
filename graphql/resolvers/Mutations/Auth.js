const {Student,UserSessionModel} = require('../../../models/Auth');
const studentValidator = require('../../../Validators/studentValidator');
const hashPassword = require('../../../utils/passwordHash');
const generateJWT = require('../../../utils/generateJWT');
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

            const newJWT = generateJWT(studentData);
            

            try{
                const studentEmail = await Student.findOne({email : studentData.email});
                

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
                const student = await  new Student(studentData);

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
                        student: student,
                        accessToken: newJWT
                    }
                }

                
            }
            catch(err)
            {
                throw new Error(`${err}`)
            }
    
            
        }, 
        logout: async (parent , args , context , info) =>
        {
            if(!context.isLoggedIN) {
				throw new Error('User Not Logged In');
			}
			let {_id} = context.user;
            console.log(_id);
            const {acessToken} =args;
            


            
            try{
                const user = await UserSessionModel.findOne({userID: _id });

                if(!user)

                {
                            try 
                    {
                        const newuser = await new UserSessionModel({userID: _id,token:acessToken, lastAccessedAt: new Date(), isActive: false,sessionLogs: `User Logged Out at ${new Date()}`});
                        try{

                            const saving = await newuser.save();

                        }
                        catch(err)
                        {
                            console.log(err);
                        }

                    
                    }
                    catch(err)
                    {
                        console.log(err);
                    }


                 }


                 await UserSessionModel.findOneAndUpdate({userID : _id},{$set:{isActive : false, lastAccessedAt : new Date() },
				$push: {sessionLogs: `User Logged Out at ${new Date()}` } });


                return {
                    status: true,
                    message: "Logout Successful"
                }



            }
            catch(err)
            {
                console.log(err);
            }



			

           			
		
           
        }
    
    
}