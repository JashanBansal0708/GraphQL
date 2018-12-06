const Mutation = {
    createUser(parent, args, { db }, info){
        const emailTaken = db.users.some((user) => user.email === args.user.email)

        if(emailTaken){
            throw new Error('Email Taken')
        }

        const user = {
            id: uuidv4(),
            ...args.user
        }
        db.users.push(user)

        return user
    },
    deleteUser(parent, args, { db }, info){
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if(userIndex === -1){
            throw new Error('User not found')
        }

        const deletedUsers = db.users.splice(userIndex,1)

        posts = db.posts.filter((post) => {
            const match = post.author === args.id

            if(match){
                comments = db.comments.filter((comment) => comment.post == post.id )
            }

            return !match
        })
        
        comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUsers[0]
    },
    
    updateUser(parent, {id, data}, { db }, info){
        const user = db.users.find((user) => user.id === id)

        if(!user){
            throw new Error('User hhhh')
        }
        
        if(typeof data.email === 'string' ){
            const emailTaken = db.users.some((user)=> user.email === data.email)
            if(emailTaken){
                throw new Error('Email was taken')
            }
            user.email = data.email
        }
        
        if(typeof data.name === 'string'){
            user.name = data.name
        }

        if(typeof data.age !== 'undefined'){
            user.age = data.age
        }

        return user
    },

    createPost(parent, args, { db }, info){
        const userExist = db.users.some((user) => user.id === args.post.author)

        if(!userExist){
            throw new Error('User not exist')
        }

        const post = {
            id: uuidv4(),
            ...args.post
        }

        db.posts.push(post)

        return post
    },
    deletePost(parent, args, { db }, info){
        const postIndex = db.posts.findIndex((post) => post.id === args.id)

        if(postIndex === -1){
            throw new Error('Post not found')
        }

        comments = db.comments.filter(comment => comment.post !== args.id)
        const deletedPosts = db.posts.splice(postIndex,1)
        
        return deletedPosts[0]    

    },
    updatePost(parent, {id, data}, { db }, info){
        //const { id, data } = args
        const post  = db.posts.find((post) => post.id === id)

        if(!post){
            throw new Error('Post not found')
        }
                
        if(typeof data.title === 'string'){
            post.title = data.title
        }

        if(typeof data.body === 'string'){
            post.body = data.body
        }
        if(typeof data.published === 'boolean'){
            post.body = data.body
        }

        return post
    },

    createComment(parent, args, { db }, info){
        const userExists = db.users.some((user) => user.id === args.comment.author)
        const postExists = db.posts.some((post) => post.id === args.comment.post)
        if(!userExists || !postExists){
            throw new Error('Unable to find user and post')
        }
        const comment = {
            id : uuidv4(),
            ...args.comment
        }         
        db.comments.push(comment)
        
        return comment
    },
    
    deleteComment(parent, args, { db }, info){
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id )
        
        if(commentIndex === -1){
            throw new error('Comment not found')
        }

        const deletedComments = db.comments.splice(commentIndex,1)
        
        return deletedComments[0] 
    },

    updateComment(parent, {id, data}, { db }, info) {
        const comment = db.comments.find((comment)=> comment.id === id)

        if(!comment){
            throw new Error('Comment not exists')
        }

        if(typeof data.text === 'string'){
            comment.text = data.text
        }
        return comment
    }

}

export { Mutation as default }