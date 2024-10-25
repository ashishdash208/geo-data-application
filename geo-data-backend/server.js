const app = require('./app');
require('dotenv').config();
const db = require('./models');
const PORT = 5000;

// Sync the database
db.sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
