import { GraphQLServer } from "graphql-yoga"

// Type definitions (schema)
const typeDefs = `
    type Query {
        name : String!
        location : String!
        bio : String!
    }

`
// Resolvers
const resolvers = {
    Query : {
        
        name(){
            return 'Jashan Bansal'
        },

        location(){
            return 'Mansa'
        },

        bio(){
            return 'I am passionate for coding'    
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})
 server.start(() => {
     console.log('The server is UP!');
 })