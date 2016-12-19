'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { 
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on Egghead.io',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the video.'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video.'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video.'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Wether or not the viewer has watched the video.'
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    video: {
      type: videoType,
      resolve: () => new Promise((resolve) => {
        resolve({
          id: 'a',
          title: 'GraphQL',
          duration: 180,
          watched: false
        });
      }) 
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

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

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
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
  video {
    id
    title
    duration
    watched
  }
}
*/
// Press on the Play button on the top of the page
// and see on the right panel the result
/*
{
  "data": {
    "video": {
      "id": "a",
      "title": "GraphQL",
      "duration": 180,
      "watched": false
    }
  }
}
*/
 