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

// Crear un nuevo personaje (simulado, ya que no se puede crear en la API real)
router.post('/characters', (req, res) => {
    const newCharacter = {
        id: Date.now(), // Usar una marca de tiempo como ID simulado
        name: req.body.name,
        status: req.body.status,
        species: req.body.species,
        gender: req.body.gender,
        image: req.body.image // Agregar la imagen del personaje desde el cuerpo de la solicitud
    };
    // En un caso real, deberíamos guardar esto en una base de datos
    res.status(201).json(newCharacter);
});

// Actualizar un personaje existente (simulado)
router.put('/characters/:id', (req, res) => {
    // En un caso real, deberíamos actualizar esto en una base de datos
    const updatedCharacter = {
        id: parseInt(req.params.id),
        name: req.body.name,
        status: req.body.status,
        species: req.body.species,
        gender: req.body.gender,
        image: req.body.image // Actualizar la imagen del personaje si se proporciona
    };
    res.json(updatedCharacter);
});

// Eliminar un personaje (simulado)
router.delete('/characters/:id', (req, res) => {
    // En un caso real, deberíamos eliminar esto de una base de datos
    res.json({ message: `El personaje con id ${req.params.id} ha sido eliminado (simulado)` });
});

module.exports = router;
