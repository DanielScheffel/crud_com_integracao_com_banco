import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cars = sequelize.define('Cars', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'cars',
    timestamps: true
})

export default Cars;