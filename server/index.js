// NOTE the server side of the app will use common JS modules
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// express can inject environment variables
const PORT = process.env.PORT || 5000
app.listen(PORT);
