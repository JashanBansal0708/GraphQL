## Query execute at https://graphql-demo.mead.io/

query {
  course
  courseInstructor
  me{
    id
    name
  }
  posts {
    id
    title
    published
  }
}

## Result

{
  "data": {
    "course": "GraphQL",
    "courseInstructor": "Andrew Mead",
    "me": {
      "id": "695db106-ea1a-4b76-8730-737e7b238675",
      "name": "Andrew"
    },
    "posts": [
      {
        "id": "19f3a6da-b37a-489c-884c-e61705e5b897",
        "title": "GraphQL 101",
        "published": true
      },
      {
        "id": "bc930f2f-717a-44e2-96cc-5ca230a60f8e",
        "title": "GraphQL 201",
        "published": false
      },
      {
        "id": "a72db40b-363f-4db9-b606-575d0a0599bd",
        "title": "Programming Music",
        "published": false
      }
    ]
  }
}
