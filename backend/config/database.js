import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log("Conexão com o banco de daedos estabelecida com sucesso!");

//     } catch (error) {
//         console.log("Não foi possível conectar ao banco de dados:", error);
//     }
// }

// testConnection();

export default sequelize;