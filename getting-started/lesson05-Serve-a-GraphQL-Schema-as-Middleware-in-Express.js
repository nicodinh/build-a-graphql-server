'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();
const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }

  type Query {
    video: Video
    videos: [Video]
  }

  type Schema {
    query: Query
  }
`);

const videoA = {
  id: 'a',
  title: 'Title video A',
  duration: 120,
  watched: true
};

const videoB = {
  id: 'b',
  title: 'Title video B',
  duration: 60,
  watched: false
};

const videos = [videoA, videoB];

const resolvers = {
  video: () => ({
    id: () => '1',
    title: () => 'Foo',
    duration: () => 180,
    watched: () => true
  }),
  videos: () => videos
};

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: resolvers
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

// to try it:
// In the terminal type 
// `node index.js`
// And go http://localhost:3000/graphql (if PORT equal to 3000)
// type that on the left panel without comments
/*
{
  videos {
    title
    duration
  }
}
*/
// Press on the Play button on the top of the page
// and see on the right panel the result
/*
{
  "data": {
    "videos": [
      {
        "title": "Title video A",
        "duration": 120
      },
      {
        "title": "Title video B",
        "duration": 60
      }
    ]
  }
}
*/
