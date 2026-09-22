import express from 'express';
import Cars from '../models/Cars.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cars = await Cars.findAll();

        res.json(cars);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar os carros',
            error: error.message
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const { marca, modelo, ano } = req.body;

        const car = await Cars.create({
            marca,
            modelo,
            ano
        });

        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao criar o carro',
            error: error.message
        });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const car = await Cars.findByPk(id);
        
        if(!car) {
            return res.status(404).json({
                message: 'Carro não encontrado'
            });
        }

        res.json(car);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar o carro',
            error: error.message
        });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, modelo, ano } = req.body;

        const car = await Cars.findByPk(id);

        if (!car) {
            return res.status(404).json({ 
                message: 'Carro não encontrado' 
            });
        }

        await car.update({
            marca,
            modelo,
            ano
        });
        res.json(car);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar o carro',
            error: error.message
        });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const car = await Cars.findByPk(id);

        if (!car) {
            return res.status(404).json({
                message: 'Carro não encontrado'
            });
        }
        
        await car.destroy();

        res.json({
            message: 'Carro deletado com sucesso'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Erro ao deletar o carro',
            error: error.message
        });
        
    }
})

export default router;