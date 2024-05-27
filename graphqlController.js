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
      characters: async () => {
        // Aquí realizarías una llamada a la API de Rick and Morty para obtener los personajes
        // Por ahora, simularemos algunos datos de ejemplo
        return [
          { id: '1', name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male' },
          { id: '2', name: 'Morty Smith', status: 'Alive', species: 'Human', gender: 'Male' }
        ];
      },
      character: async (_, { id }) => {
        // Aquí también realizarías una llamada a la API de Rick and Morty para obtener un personaje específico
        // Por ahora, simularemos datos de ejemplo
        return { id, name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male' };
      }
    }
  };

module.exports = { typeDefs, resolvers };
