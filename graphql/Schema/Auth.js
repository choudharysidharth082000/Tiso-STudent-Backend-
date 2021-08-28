const { ApolloServer, gql } = require('apollo-server');
module.exports= gql`


type student 
{
    firstName: String!
    lastName: String!
    mobileNumber : String!
    email: String
    title: Stack
    password: String
    isAcive : Boolean


}
input studentInput 
{
    firstName: String!
    lastName: String!
    mobileNumber : String!
    email: String
    title: Stack
    password: String
    isAcive : Boolean
    salt: String

}
enum Stack

{
    Mr
    Mrs
    Ms
}
type Response 
{
    status : Boolean 
    message: String 
    student: student
}


  
  type Query {
    books: String
    viewStudent : student

  }
  type Mutation
  {
      signupstudent(studentData : studentInput) : Response
      
  }
  `

