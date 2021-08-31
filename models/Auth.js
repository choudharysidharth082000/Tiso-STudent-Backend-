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

    },{timestamps: true}
)

const Student = mongoose.model("Student", Students);

exports.Student = Student;

const userSessionSchema = new Schema({
    token : {
        type : String,
        minLength : 256,
    
        required : true
    },
    userID : {
        type: Schema.Types.ObjectId,
        ref: 'userModel' 
    },
    lastAccessedAt : {
        type : Date,
        default : new Date()
    },
    isActive : {
        type : Boolean,
        default : true
    },
    tokenCreationDetails : {
        ip : {
            type : String,
            default : ''
        },
        useragent : {
            type : String,
            default : ''
        },
        os : {
            type : String,
            default : ''
        }
    },
    sessionLogs : [
        {
            type : String
        }
    ]
}, {timestamps : true});
const UserSessionModel = mongoose.model("user-sessions", userSessionSchema);
exports.UserSessionModel = UserSessionModel;
