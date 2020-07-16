const { GraphQLServer, MockList } = require('graphql-yoga');

const typeDefs = `
  type Item {
    name: String
    title: String
    url: String
  }
  type Query {
    menu: [Item]
  }
`;

const menu = [
  {
    name: 'We-Conect',
    title: 'We-Conect Home page',
    url: 'https://www.we-conect.com/',
  },
  {
    name: 'Google',
    title: 'Google Home page',
    url: 'https://www.google.de',
  },
];

const resolvers = {
  Query: {
    menu: (_, args) => menu,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log(`Server is running at http://localhost:4000`));
