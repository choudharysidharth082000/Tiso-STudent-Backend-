const mongoose = require('mongoose');

const {Schema} = mongoose;

const Students = new Schema(
    {
        firstName: {
            required: true,
            type: String,
            min:3
        },
        lastName: {
            required: true,
            type: String,
            min:3

        },
        email: 
        {
            required: true,
            type: String,
            min: 8
        },
        mobileNumber: 
        {
            required: true,
            type: String,
            min: 10,
            max:10
        },
        isActive: 
        {
            type: Boolean,
            default: true
        },
        password: 
        {
            type: String,
            required : true,
            min: 8
        },
        title: 
        {
            type: String,            
            default: "Mr"

        },
        salt : {
            type: String,
            required: true,
            

        }

    }
)

const Student = mongoose.model("Student", Students);

module.exports= Student;