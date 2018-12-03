import { GraphQLServer } from 'graphql-yoga'

// typeDefs
const typeDefs = `
    type Query{
        grades : [Int!]!
        add(numbers : [Float]!) : Float!
    }

    
`

// Resolvers
const resolvers= {
    Query : {
        grades(parent, args, ctx, info){
            return [5,6,7]
        },

        add(parent, args, ctx, info){
            if(args.numbers.length === 0){
                return 0
            } 
            return args.numbers.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            })
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