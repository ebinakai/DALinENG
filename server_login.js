const express = require('express');
const cors = require('cors');
const app = express();

const users = {
  'root': {
    userId: 1,
    token: '1234567890abcdef'
  }
};

app.use(cors({
  origin: "*", // source url
  credentials: true,
  optionsSuccessStatus: 200
}))

app.post('/', (req, res) => {
  res.send(users['root']);
});

app.delete('/', (req, res) => {
  res.send('Deleted.')
});

app.listen(3002, () => console.log('Listening on port 3002'));