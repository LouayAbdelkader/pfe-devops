const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3002;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Schéma et modèle Product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });
const Product = mongoose.model('Product', productSchema);
const uri = '';

// Connexion MongoDB
mongoose.connect('mongodb://admin:pass123@mongodb-service:27017/ecommerce?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

// Route
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Démarrage
app.listen(port, () => {
  console.log(`Product-service running on port ${port}`);
});