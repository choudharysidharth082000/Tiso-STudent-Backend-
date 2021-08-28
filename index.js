console.log('Hello Student Backend Developer');
const { ApolloServer, gql } = require('apollo-server');
const graphqlSchema = require('./graphql/Schema/Index');
const graphqlResolvers = require('./graphql/resolvers/index');


const mongoose = require('mongoose');

const resolvers = require('./graphql/resolvers/index')

//----------------------doteenv files and variables -----------------------
const dotenv = require('dotenv');
dotenv.config();
const DB = process.env.DB;

//--------------------------------------------------------------------------



//-----------------------------------Connecting the Database -----------------

mongoose.connect(DB, 
    ()=>
    {
        console.log("Database is connected successfully")
    })

//---------------------------------------------------------------------------------


//-------------------Datasets--------------------
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];


  //----------------------------------------------------


  //-----------------------------Schema-------------------------------------------------


// const typeDefs = gql`
  
//   type Query {
//     books: String
//   }
// `;

//-------------------------------------------------------------------------------------------


//-------------------resolvers -------------------------------------------
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
// const resolvers = {
//     Query: {
//       books: () => books,
//     },
//   };


  //-----------------------------------------------------------------------------



  //--------------------creating the instance to start the server ----------------------------

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
    typeDefs: [graphqlSchema]
    , 
    resolvers: graphqlResolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


//-----------------------------------------------------------------------------------------------



