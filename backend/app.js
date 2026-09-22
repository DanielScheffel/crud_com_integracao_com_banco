import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import sequelize from './config/database.js';
import Cars from './models/Cars.js';

import carsRoutes from './routes/cars.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cars', carsRoutes);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
        await sequelize.sync({ alter: true });
        console.log('Tabelas sincronizadas com sucesso!');
    } catch (error) {
        console.log("Não foi possível conectar ao banco de dados:", error);
    }
}

testConnection();

app.get("/", (req, res) => {
    res.send("Olá mundo!")
})

export default app;