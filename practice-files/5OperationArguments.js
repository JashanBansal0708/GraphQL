import {GraphQLServer} from 'graphql-yoga';

const typeDefs = `
    type Query {
        greeting(name: String, position : String) : String!
        add(a: Float!, b: Float!) : Float!
    }
`

const resolvers = {
    Query: {
        greeting(parent, args, ctx, info){
            if(args.name && args.position){
                return `Hello ${args.name}. You are at position ${args.position}`
            }
            else{
                return 'Hello'
            }
        },
        add(parent, args, ctx, info){
            return args.a + args.b 
        }
    }

}

const server= new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is Up!')
} )