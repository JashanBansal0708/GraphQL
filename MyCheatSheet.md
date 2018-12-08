# CheatSheet for GraphQL

>GraphQL is API just like Restful API
1. It is fast because it has only one end point, so less request for quering data.
2. It is Flexible because we can decide to query data at clients not at server(diff for mobile and laptops), so we can query any type of data as a query.Giving clients the full control to ask for data they need.
3. Easy to use at simple to maintain.

> Graph is all the data and relationship between them. (eg. USER, POST COMMENT)

> GraphQl querying is just like the postman extension in chrome.

> There are three types of request
1. Querying 
2. Mutation
3. Subscription

## Quering Data

> query return data in JSON format as a data property in the object
> By default all appl. are self documenting. API exposes a schema that describes exactly what operations could be performed on the API.
> type as String! represents it doesn't return null.

> NOTE: We have to specify all the fields we want, nothing more and less.

1. Querying simple types
2. Objects
3. Array of Objects 
(Use file queryExample.md)

## Install babel 
>npm install babel-cli babel-preset-env
Setup the .babelrc file as in graphql-basics

## ES6 import/export statements

> This is used to divide the code in multiple files, so code don't get messy.
> Named exports as many as needed, default only one as in code files.

## GraphQL API
> Create the API using graphql-yoga
> Live Reload the server using nodemon by script nodemon src/index.js --exec bable-node
> 5 scalar types
> Custom types using the type name{ }
> Operation arguments passing
> Scalar Types array return and pass as an argument
> Custom Types return type and pass as an argument
> Relational Data basics and relational data( all code in files)
> All mutations as update, delete, create are in the source files
> Subscriptions for real time data handling

> Babel spread operator transform plugin required to use spread operator

## ES6 operations used

> spread operator for create an object copy as obj = { ...obj }
> destructuring objects and arrays
> Enums as a new data type. Bound a particular number of constant values to their variables