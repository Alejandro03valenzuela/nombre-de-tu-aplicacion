// Cargar el catálogo desde JSON
async function cargarCatalogo() {
    const response = await fetch('catalogo.json');
    const productos = await response.json();
    mostrarCatalogo(productos);
}

function mostrarCatalogo(productos) {
    const catalogoLista = document.getElementById('catalogo-lista');
    catalogoLista.innerHTML = '';

    productos.forEach(producto => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('catalogo-item');
        itemDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="mostrarDetalles(${producto.id})">Ver Detalles</button>
        `;
        catalogoLista.appendChild(itemDiv);
    });
}

function mostrarDetalles(id) {
    fetch('catalogo.json')
        .then(response => response.json())
        .then(productos => {
            const producto = productos.find(p => p.id === id);
            document.getElementById('modalTitulo').innerText = producto.nombre;
            document.getElementById('modalDescripcion').innerText = producto.descripcion;
            document.getElementById('modalPrecio').innerText = `Precio: $${producto.precio}`;
            document.getElementById('modal').style.display = 'block';
        });
}

function filtrarCatalogo() {
    const categoria = document.getElementById('categoria').value;
    const orden = document.getElementById('orden').value;

    fetch('catalogo.json')
        .then(response => response.json())
        .then(productos => {
            let productosFiltrados = productos;

            if (categoria) {
                productosFiltrados = productosFiltrados.filter(p => p.categoria === categoria);
            }

            if (orden === 'asc') {
                productosFiltrados.sort((a, b) => a.precio - b.precio);
            } else if (orden === 'desc') {
                productosFiltrados.sort((a, b) => b.precio - a.precio);
            }

            mostrarCatalogo(productosFiltrados);
        });
}

// Envío del formulario
document.getElementById('contact-form').onsubmit = function(event) {
    event.preventDefault();
    alert('Formulario enviado. Gracias por contactarnos.');
};

// Cerrar el modal
document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

window.onload = cargarCatalogo;
