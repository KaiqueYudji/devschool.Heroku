import initdb from './models/init-models.js'

import Sequelize from 'sequelize';
const sequelize = new Sequelize(
'MATRICULAA',
'root',
'kaiquey2005', {
host: 'localhost',
dialect: 'mysql',
logging: false
});
const db = initdb(sequelize);
export default db;