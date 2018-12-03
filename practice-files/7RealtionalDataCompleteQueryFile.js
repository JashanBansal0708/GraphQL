import { GraphQLServer } from 'graphql-yoga'

let users = [{
    id: 'u1',
    name: 'Jashan Bansal',
    email: 'jashanbansal7856@yahoo.com',
    age: 20
},{
    id: 'u2',
    name: 'Romit',
    age: 20,
    email : 'romitgoyal0001@gmail.com'
},{
    id: 'u3',
    name: 'Kansal',
    email : 'nanukansal07@gmail.com'
}]

let posts = [{
    id : 'p1',
    title: 'Intro to GraphQL',
    body : 'Course to the GraphQL introduction',
    published : true, 
    author : 'u1'
},
{
    id :'p2',
    title: 'Intro to Node.js',
    body : 'Course to the Angular introduction',
    published : true,
    author : 'u2' 
},
{
    id :'p3',
    title: 'Intro to Angular',
    body : 'Course to the Angular introduction',
    published : false,
    author : 'u1'
}]

let comments = [{
    id : 'c1',
    text : 'This is a cool course of GraphQL',
    post : 'p1',
    author: 'u1'
},
{
    id : 'c2',
    text : 'This is a GraphQl fantastic course',
    post : 'p1',
    author: 'u2'
},
{
    id : 'c3',
    text : 'This is a cool course of node.js',
    post : 'p2',
    author: 'u3'
},{
    id : 'c4',
    text : 'This is a fantastic node course',
    post : 'p2',
    author: 'u2'
},{
    id : 'c5',
    text : 'This is a Angular course',
    post : 'p3',
    author: 'u1'
}]

// typeDefs
const typeDefs = `
    type Query{
       users(query : String): [User!]!
       posts(query : String): [Post!]!
       me: User!,
       post: Post!
    }

    type User{
        id: ID!
        name : String!
        age : Int
        email: String!
        posts: [Post!]!
        comments : [Comment!]!
    }
    
    type Post{
        id: ID!,
        title: String!,
        body: String!,
        published: Boolean!,
        author : User!
    }
    
    type Comment{
        id : ID!,
        text: String!,
        post : Post!,
        author : User!
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
        },

        posts(parent, args, ctx, info ){
            if(!args.query){
                return posts
            }
            return posts.filter((post) => {
                isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
                return isTitleMatch || isBodyMatch
            })
        },

        me(parent, args, ctx, info){
            return {
                id: 'M1',
                name: 'Jashan',
                age: 20,
                email: 'jashanbansal7856@yahoo.com'
            }
        },

        post(parent, args, ctx, info){
            return {
                id: 'P1',
                title: 'This is is java course',
                published: true,
                body: 'Java course in the great detail'
            }
        },
    },

    Post : {
        author(parent, args, ctx, info){
            return users.find((user) => {
                return user.id == parent.author
            })
        }
    },

    Comment: {
        post(parent, args, ctx, info){
            return posts.find((post)=> {
                return comment.id == parent.post
            })
        },
        author(parent, args, ctx, info){
            return users.find((user)=> {
                return user.id == parent.author
            })
        }
    },

    User: {
        posts(parent, args, ctx, info){
            return posts.filter((post) => {
                return post.author == parent.id
            })
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment)=>{
                return comment.author == parent.id
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