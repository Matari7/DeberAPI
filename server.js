const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const { typeDefs, resolvers } = require('./graphqlController');
const restController = require('./restController');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configurar Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });

// Usar el enrutador de restController
app.use('/api', restController);


// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send('La ruta no fue encontrada');
});

app.get('/index', (req, res)=>{
    res.render('index');
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
