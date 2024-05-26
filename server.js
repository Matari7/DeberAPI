const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const path = require('path');
const { typeDefs, resolvers } = require('./graphqlController');
const restController = require('./restController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

async function startServer() {
    // Configurar Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    // Ruta para servir el archivo index.html
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    // Ruta para servir el archivo rest.html
    app.get('/restTest', (req, res) => {
        res.sendFile(path.join(__dirname, 'restTest.html'));
    });

    // Ruta para servir el archivo graphql.html
    app.get('/graphqlTest', (req, res) => {
        res.sendFile(path.join(__dirname, 'graphqlTest.html'));
    });

    // Usar el enrutador de restController
    app.use('/api', restController);

    // Manejar rutas no encontradas
    app.use((req, res, next) => {
        res.status(404).send('La ruta no fue encontrada');
    });

    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
}

startServer().catch((error) => {
    console.error('Error starting the server:', error);
});
