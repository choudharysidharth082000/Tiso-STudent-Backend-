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
    accessToken: String
}
type logoutResponse
{
    status: Boolean
    message: String
}


  
  type Query {
    books: String
    login(email: String! ,password: String!): Response

  }
  type Mutation
  {
      signupstudent(studentData : studentInput) : Response

      logout(acessToken : String) : Response
      
  }
  `

