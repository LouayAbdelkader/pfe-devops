const KUBE_NODE_IP = "192.168.1.13"; // Remplace par l'IP de ton nœud worker 


const authSection = document.getElementById('authSection');
const productSection = document.getElementById('productSection');
const authForm = document.getElementById('authForm');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Vérifie si un token existe au chargement
if (localStorage.getItem('token')) {
  showProducts();
}

// Soumission du formulaire (login)
authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signIn(email, password);
});

// Bouton signup
signupBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signUp(email, password);
});

// Bouton logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token'); // Supprime le token
  productSection.classList.add('d-none'); // Cache les produits
  authSection.classList.remove('d-none'); // Réaffiche le formulaire
  document.getElementById('products').innerHTML = ''; // Vide la liste des produits
});

async function signUp(email, password) {
  try {
    const response = await fetch(`http://${KUBE_NODE_IP}:30081/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Erreur inscription');
    alert('Inscription réussie, connectez-vous !');
    document.getElementById('email').value = ''; // Vide les champs
    document.getElementById('password').value = '';
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur : ' + error.message);
  }
}

async function signIn(email, password) {
  try {
    const response = await fetch(`http://${KUBE_NODE_IP}:30081/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    localStorage.setItem('token', data.token);
    showProducts();
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur : ' + error.message);
  }
}

async function fetchProducts() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://${KUBE_NODE_IP}:30082/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Erreur réseau');
    const products = await response.json();
    const productDiv = document.getElementById('products');
    productDiv.innerHTML = '';
    products.forEach(product => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="card product-card">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price}€</p>
            <button type="submit" class="btn btn-primary">Order now</buttton>
          </div>
        </div>
      `;
      productDiv.appendChild(col);
    });
  } catch (error) {
    console.error('Erreur:', error);
    localStorage.removeItem('token');
    productSection.classList.add('d-none');
    authSection.classList.remove('d-none');
  }
}

function showProducts() {
  authSection.classList.add('d-none');
  productSection.classList.remove('d-none');
  fetchProducts();
}


