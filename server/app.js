const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');  // Importez le package cors
const router = require('./src/routes/api');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend React
    methods: ['GET', 'POST', 'PUT','DELETE'], // Permet les requêtes GET, POST et DELETE
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());
  
  // Proxy pour éviter les erreurs CORS lors de l'appel à `ipapi.co`
  app.get('/ipapi', (req, res) => {
    axios
      .get('https://ipapi.co/json/')
      .then((response) => res.json(response.data))
      .catch((error) => res.status(500).json({ error: 'Erreur de récupération des données' }));
  });

app.use(bodyParser.json());

const URL = "mongodb://127.0.0.1:27017/MyData";
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/uploads', express.static('storage/images'));

// Point de terminaison proxy pour l'API ipapi.co


app.use("/api/v1", router);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            err_code: err.code,
            err_message: err.message,
        });
    } else {
        return res.status(500).json({
            err_code: 500,
            err_message: "Something went wrong",
        });
    }
});


module.exports = app;
