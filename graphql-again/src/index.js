import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

// Dummy data for users 

const users = [{
    name: 'Jashan',
    id: '1',
    email: 'jashanbansal@yahoo.com',
    age: 21
}, {
    name: 'hatjs',
    id: '2',
    email: 'jashanbansal@yahoo.com',
    age: 21
},{
    name: 'JimmyChoo',
    id: '3',
    email: 'jashanbansal@yahoo.com',
    age: 21
}]

const posts = [{
    id : 'LLLLLLLLLLLLLLLLLLL',
    title: 'My first Post',
    body : 'JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJq',
    published: true,
    author: '1'
}, {
    id : 'post456',
    title: 'My second Postq',
    body : 'YYYYYYYYYYYYYYYYYYYYYYYYY',
    published: true,
    author: '2'
}, {
    id : 'Jashan789',
    title: 'My third Post',
    body : 'ZZZZZZZZZZZZZZZZZZZZZZZZZ',
    published: true,
    author: '1'
}]

// Type definitions (schema)

const typeDefs = `
    type Query{
        greeting(name: String): String!,
        grades: [Int!]!
        me: User!,
        post: Post!,
        add(numbers : [Float!]!): Float!,
        users(query: String): [User!]!,
        posts(query: String): [Post!]!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }
    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
    type Mutation{
        createUser(data: CreateUserInput): User!
    }

    input CreateUserInput{
        name: String!
        email: String!
        age: Int
    }
`


// Resolvers
const resolvers = {
    Query: {
        greeting(parent, args , ctx, info){
            if(args.name){
                return `Hello, ${args.name}`
            } else{
                return 'Hello!'
            }
        }, 
        me(){
            return {
                name: 'Jashan Bansal',
                id: 'jimmystar123',
                email: 'jashanbansal7856@yahoo.com'
            }
        },
        grades(){
            return [22,33,44] 
        },
        post(){
            return {
                id: 'post123',
                title : "This JIMMY",
                body: 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZ.',
                published: true
            } 
        },
        add(parent, args, ctx, info){
            if(args.numbers.length == 0){
                return 0;
            }
            else{
                return args.numbers.reduce((acc, curr) => {
                    return (acc + curr);
                })
            }
        },
        users(parent, args, ctx, info){
            if(!args.query){
                return users
            }
            return users.filter( (user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info){
            if(!args.query){
                return posts
            }
            return posts.filter( (post) => {
                const isTitleMatch =  post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch =  post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
        })
        }
    },
    User: {
        posts(parent, args, ctx, info){
            return posts.filter((post) => {
                return parent.id === post.author
            })
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.data.email)
            if (emailTaken) {
                throw new Error('Email taken')
            }
            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user)
            
            return user
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers 
})

server.start(() => {
    console.log("Server is Up Jimmy, see it in the browser")
})