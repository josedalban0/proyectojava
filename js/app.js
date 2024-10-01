// Clase Producto para crear nuevos productos
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Lista predefinida de productos
const productosDisponibles = [
    new Producto('Coca Cola', 150),
    new Producto('Pepsi', 140),
    new Producto('Fanta', 130),
    new Producto('Sprite', 120),
    new Producto('Hamburguesa Clásica', 400),
    new Producto('Hamburguesa Doble', 600),
    new Producto('Hamburguesa Veggie', 450),
    new Producto('Agua Mineral', 100),
    new Producto('Cerveza', 200),
];

// Array para almacenar los productos en el carrito
let carrito = [];

// Función para mostrar el carrito en el DOM
function mostrarCarrito() {
    let carritoHTML = document.getElementById('carrito');
    carritoHTML.innerHTML = '';
    
    carrito.forEach((producto, index) => {
        carritoHTML.innerHTML += `<li>${producto.nombre} - $${producto.precio} <button onclick="eliminarProducto(${index})">Eliminar</button></li>`;
    });

    guardarEnLocalStorage(); // Guardar en LocalStorage cada vez que actualizamos el carrito
}

// Función para mostrar todos los productos disponibles y filtrarlos en tiempo real
function mostrarProductosDisponibles(filtro = '') {
    let listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';

    productosDisponibles
        .filter(producto => producto.nombre.toLowerCase().includes(filtro.toLowerCase()))
        .forEach((producto) => {
            let itemProducto = document.createElement('div');
            itemProducto.textContent = `${producto.nombre} - $${producto.precio}`;
            itemProducto.classList.add('producto');
            itemProducto.addEventListener('click', () => agregarProductoAlCarrito(producto));
            listaProductos.appendChild(itemProducto);
        });
}

// Función para agregar el producto seleccionado al carrito
function agregarProductoAlCarrito(producto) {
    carrito.push(producto);
    mostrarCarrito();
    mostrarMensaje(`Producto ${producto.nombre} agregado al carrito`);

    // Limpiar campo de búsqueda
    document.getElementById('nombreProducto').value = '';
    mostrarProductosDisponibles(); // Mostrar todos los productos nuevamente
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);  // Eliminar producto por índice
    mostrarCarrito();
    mostrarMensaje('Producto eliminado');
}

// Función para mostrar mensajes temporales
function mostrarMensaje(mensaje) {
    let mensajeHTML = document.getElementById('mensaje');
    mensajeHTML.textContent = mensaje;
    setTimeout(() => {
        mensajeHTML.textContent = '';
    }, 3000);
}

// Guardar carrito en LocalStorage
function guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Cargar carrito desde LocalStorage al cargar la página
function cargarDesdeLocalStorage() {
    let datosGuardados = localStorage.getItem('carrito');
    if (datosGuardados) {
        carrito = JSON.parse(datosGuardados);
        mostrarCarrito();
    }
}

// Cargar los datos del carrito cuando la página se cargue
document.addEventListener('DOMContentLoaded', () => {
    cargarDesdeLocalStorage();
    mostrarProductosDisponibles(); // Mostrar todos los productos disponibles cuando la página se cargue
});

// Función para filtrar productos al escribir en el campo de búsqueda
document.getElementById('nombreProducto').addEventListener('input', (event) => {
    let busqueda = event.target.value;
    mostrarProductosDisponibles(busqueda); // Filtrar productos a medida que el usuario escribe
});

// Función para finalizar la compra
document.getElementById('finalizarCompra').addEventListener('click', () => {
    if (carrito.length === 0) {
        mostrarMensaje('El carrito está vacío.');
        return;
    }

    carrito = [];  // Vaciar el carrito
    mostrarCarrito();  // Actualizar el DOM
    localStorage.removeItem('carrito');  // Eliminar los datos del carrito en LocalStorage

    mostrarMensaje('¡Compra realizada con éxito!');
});
