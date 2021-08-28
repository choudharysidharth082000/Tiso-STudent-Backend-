const studentDB = require('../../../models/Auth');
module.exports = 
{

    books: () =>
    {
        return "Hello There"
    },
    viewStudent: async (parent , args , context , info)=>
    {
        

        try 
        {
            const students = await studentDB.findOne({email: "choudharysidhardtth082000@gmail.com"});
            console.log(students);

            if(!students)
            {
                throw new Error ("Student with this username does not exists");
            }

            return {
                firstName: students.firstName,
                lastName: students.lastName,
                mobileNumber : students.mobileNumber,
                title: students.title,
                email: students.email,
                password: students.password
            }

        }
        catch(err)
        {
            console.log(`${err}`)
        }
    }
    
}