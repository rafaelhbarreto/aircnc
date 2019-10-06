// database password. jeef2zPFeeMJzJ4

const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');

mongoose.connect(`mongodb://omnistack:jeef2zPFeeMJzJ4@omnistack-shard-00-00-fhpg4.mongodb.net:27017,omnistack-shard-00-01-fhpg4.mongodb.net:27017,omnistack-shard-00-02-fhpg4.mongodb.net:27017/test?ssl=true&replicaSet=OmniStack-shard-0&authSource=admin&retryWrites=true&w=majority
`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333); 