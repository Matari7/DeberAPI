const { gql } = require('apollo-server-express');

const API_URL = 'https://rickandmortyapi.com/graphql';

// Definir el esquema GraphQL
const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    status: String
    species: String
    gender: String
    image: String
  }

  type Query {
    characters(page: Int): [Character]
    character(id: ID!): Character
  }
`;

// Resolvers para las consultas
const resolvers = {
  Query: {
    characters: async (_, { page = 1 }) => {
      const query = `
        query ($page: Int) {
          characters(page: $page) {
            results {
              id
              name
              status
              species
              gender
              image
            }
          }
        }
      `;
      try {
        const data = await fetchGraphQL(query, { page });
        return data.characters.results;
      } catch (error) {
        throw new Error('Error fetching characters');
      }
    },
    character: async (_, { id }) => {
      const query = `
        query ($id: ID!) {
          character(id: $id) {
            id
            name
            status
            species
            gender
            image
          }
        }
      `;
      try {
        const data = await fetchGraphQL(query, { id });
        return data.character;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          throw new Error('Character not found');
        } else {
          throw new Error('Error fetching character');
        }
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
