const { gql } = require('apollo-server-express');
const axios = require('axios');

const API_BASE_URL = 'https://rickandmortyapi.com/api';

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
    characters: [Character]
    character(id: ID!): Character
  }
`;

// Resolvers para las consultas
const resolvers = {
  Query: {
    characters: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/character`);
        return response.data.results;
      } catch (error) {
        throw new Error('Error fetching characters');
      }
    },
    character: async (_, { id }) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/character/${id}`);
        return response.data;
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
