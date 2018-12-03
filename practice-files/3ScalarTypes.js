import { GraphQLServer } from "graphql-yoga"

const typeDefs = `
    type Query {
        id : ID!
        name : String!
        age : String!
        employed: Boolean!
        gpa: Float
    }

`
// Resolvers
const resolvers = {
    Query : {
        id(){
            return 'abc123'
        },
        name(){
            return 'Jashan Bansal'
        },
        age(){
            return 20
        },
        employed(){
            return false    
        },
        gpa(){
            return null
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