/**
 * Connect mongoose database
 */
const mongoose = require('mongoose');
const {user, password, connect, port, database} = require('../configs/database');

const auth = (user && password) ? `${user}:${password}@` : '';
  
mongoose.connect(`${connect}://${auth}${host}:${port}/${database}`);

 mongoose.connection.on('connected', () => {
    console.log('Connected to mongo server.')
});
/**
 * Event listener for "error" event.
 */
mongoose.connection.on('error', (error) => {
    throw error;
});

module.exports = mongoose;


