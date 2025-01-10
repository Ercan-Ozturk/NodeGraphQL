import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
    }
`;
const games = [
    { id: "1", title: "Zelda, Tears of the Kingdom", platform: ["Switch"] },
    { id: "2", title: "Final Fantasy 7 Remake", platform: ["PS5", "Xbox"] },
    { id: "3", title: "Elden Ring", platform: ["PS5", "Xbox", "PC"] },
    { id: "4", title: "Mario Kart", platform: ["Switch"] },
    { id: "5", title: "Pokemon Scarlet", platform: ["PS5", "Xbox", "PC"] },
];
const authors = [
    { id: "1", name: "mario", verified: true },
    { id: "2", name: "yoshi", verified: false },
    { id: "3", name: "peach", verified: true },
];
const reviews = [
    { id: "1", rating: 9, content: "lorem ipsum", author_id: "1", game_id: "2" },
    { id: "2", rating: 10, content: "lorem ipsum", author_id: "2", game_id: "1" },
    { id: "3", rating: 7, content: "lorem ipsum", author_id: "3", game_id: "3" },
    { id: "4", rating: 5, content: "lorem ipsum", author_id: "2", game_id: "4" },
    { id: "5", rating: 8, content: "lorem ipsum", author_id: "2", game_id: "5" },
    { id: "6", rating: 7, content: "lorem ipsum", author_id: "1", game_id: "2" },
    { id: "7", rating: 10, content: "lorem ipsum", author_id: "3", game_id: "1" },
];
// resolvers
const resolvers = {
    Query: {
        games() {
            return games;
        },
        game(_, args, context) {
            return games.find((game) => game.id === args.id);
        },
        authors() {
            return authors;
        },
        reviews() {
            return reviews;
        },
        review(_, args, context) {
            return reviews.find((review) => review.id === args.id);
        },
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
