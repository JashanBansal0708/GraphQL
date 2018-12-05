import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'


let users = [{
    id: '1',
    name: 'Jashan',
    email: 'jashan@example.com',
    age: 20
}, {
    id: '2',
    name: 'Romit',
    email: 'romit@example.com'
}, {
    id: '3',
    name: 'kansal',
    email: 'kansal@example.com'
}]

let posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '1'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2'
}]

let comments = [{
    id: '102',
    text: 'This worked well for me. Thanks!',
    author: '3',
    post: '10'
}, {
    id: '103',
    text: 'Glad you enjoyed it.',
    author: '1',
    post: '10'
}, {
    id: '104',
    text: 'This did not work.',
    author: '2',
    post: '11'
}, {
    id: '105',
    text: 'Nevermind. I got it to work.',
    author: '2',
    post: '12'
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation{
        createUser(user: createUserInput) : User!
        createPost(post: createPostInput!): Post!
        createComment(comment: createCommentInput): Comment!
        deleteUser(id: ID!): User!
        deletePost(id: ID!): Post!
        deleteComment(id: ID!) : Comment!
    }

    input createUserInput{
        name: String!
        email : String!
        age: Int
    }

    input createCommentInput{
        text: String!,
        author: String!,
        post: String!
    }

    input createPostInput{
        title: String!,
        body: String!,
        author: ID!,
        published: Boolean
    }


    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        comments(parent, args, ctx, info) {
            return comments
        },
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com'
            }
        },
        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false
            }
        }
    },
    
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },

    Mutation: {
        createUser(parent, args, ctx, info){
            const emailTaken = users.some((user) => user.email === args.user.email)

            if(emailTaken){
                throw new Error('Email Taken')
            }

            const user = {
                id: uuidv4(),
                ...args.user
            }
            users.push(user)

            return user
        },
        createPost(parent, args, ctx, info){
            const userExist = users.some((user) => user.id === args.post.author)

            if(!userExist){
                throw new Error('User not exist')
            }

            const post = {
                id: uuidv4(),
                ...args.post
            }

            posts.push(post)

            return post
        },
        createComment(parent, args, ctx, info){
            const userExists = users.some((user) => user.id === args.comment.author)
            const postExists = posts.some((post) => post.id === args.comment.post)
            if(!userExists || !postExists){
                throw new Error('Unable to find user and post')
            }
            const comment = {
                id : uuidv4(),
                ...args.comment
            }         
            comments.push(comment)
            
            return comment
        },
        
        deleteUser(parent, args, ctx, info){
            const userIndex = users.findIndex((user) => user.id === args.id)

            if(userIndex === -1){
                throw new Error('User not found')
            }

            const deletedUsers = users.splice(userIndex,1)

            posts = posts.filter((post) => {
                const match = post.author === args.id

                if(match){
                    comments = comments.filter((comment) => comment.post == post.id )
                }

                return !match
            })
            
            comments = comments.filter((comment) => comment.author !== args.id)

            return deletedUsers[0]
        },

        deletePost(parent, args, ctx, info){
            const postIndex = posts.findIndex((post) => post.id === args.id)

            if(postIndex === -1){
                throw new Error('Post not found')
            }

            comments = comments.filter(comment => comment.post !== args.id)
            const deletedPosts = posts.splice(postIndex,1)
            
            return deletedPosts[0]    

        },

        deleteComment(parent, args, ctx, info){
            const commentIndex = comments.findIndex((comment) => comment.id === args.id )
            
            if(commentIndex === -1){
                throw new error('Comment not found')
            }

            const deletedComments = comments.splice(commentIndex,1)
            
            return deletedComments[0] 
        }

    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})