async function getProducts() {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();
    const productCards = document.getElementById('product-cards');
    productCards.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>${product.price}</p>
        <button onclick="editProduct(${product.id})">Editar</button>
        <button onclick="deleteProduct(${product.id})">Eliminar</button>
      `;
      productCards.appendChild(card);
    });
  }
  
  async function createProduct(name, description, price) {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price }),
    });
    await response.json();
    getProducts();
    hideProductForm();
  }
  
  async function updateProduct(id, name, description, price) {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price }),
    });
    await response.json();
    getProducts();
    hideProductForm();
  }
  
  async function deleteProduct(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    });
    await response.json();
    getProducts();
  }
  
  function showNewProductForm() {
    const modal = document.getElementById('product-form-modal');
    const form = document.getElementById('product-form');
    form.onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('product-name').value;
      const description = document.getElementById('product-description').value;
      const price = document.getElementById('product-price').value;
      await createProduct(name, description, price);
    };
    modal.style.display = 'flex';
  }
  
  function editProduct(id) {
    const modal = document.getElementById('product-form-modal');
    const form = document.getElementById('product-form');
    form.onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('product-name').value;
      const description = document.getElementById('product-description').value;
      const price = document.getElementById('product-price').value;
      await updateProduct(id, name, description, price);
    };
    modal.style.display = 'flex';
  }
  
  function hideProductForm() {
    const modal = document.getElementById('product-form-modal');
    modal.style.display = 'none';
  }
  
  getProducts();
  