import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: 'localhost', 
  username: 'root', 
  password: 'senharoot', 
  database: 'findschool', 
});
export default sequelize;