import { GraphQLServer } from 'graphql-yoga'

let users = [{
    id: '1',
    name: 'Jashan Bansal',
    email: 'jashanbansal7856"yahoo.com',
    age: 20
},{
    id: '2',
    name: 'Romit',
    age: 20,
    email : 'bansaljashan0001@gmail.com'
},{
    id: '3',
    name: 'Kansal',
    email : 'nanukansal07@gmail.com'
}]

// typeDefs
const typeDefs = `
    type Query{
       users(query : String): [User!]!
    }

    type User{
        id: ID!
        name : String!
        age : Int
        email: String!
    }
`

// Resolvers
const resolvers= {
    Query : {
        users(parent, args, ctx, info){
            if(!args.query){
                return users
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
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