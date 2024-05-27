const { gql } = require('apollo-server-express');

const API_URL = 'https://rickandmortyapi.com/graphql';

// Definir el esquema GraphQL
const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    status: String!
    species: String!
    type: String
    gender: String!
    origin: Origin!
    location: Location!
    image: String!
    created: String!
  }

  type Origin {
    name: String!
    url: String!
  }

  type Location {
    name: String!
    url: String!
  }

  type Query {
    characters: [Character]
    character(id: ID!): Character
  }
`;

// Función para hacer peticiones a la API GraphQL
const fetchGraphQL = async (query, variables = {}) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    const data = await response.json();
    return data.data;
  };

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
