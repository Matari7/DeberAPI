const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_BASE_URL = 'https://rickandmortyapi.com/api';

// Obtener todos los personajes
router.get('/characters', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/character`);
        res.json(response.data.results);
    } catch (error) {
        res.status(500).send('Error al obtener los personajes');
    }
});

// Obtener un solo personaje por ID
router.get('/characters/:id', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/character/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).send('El personaje no fue encontrado');
        } else {
            res.status(500).send('Error al obtener el personaje');
        }
    }
});


module.exports = router;
