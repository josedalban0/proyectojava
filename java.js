// Lista de productos disponibles
const hamburguesas = [
    { id: 1, nombre: "Hamburguesa Clásica", precio: 800 },
    { id: 2, nombre: "Hamburguesa Doble", precio: 1200 },
    { id: 3, nombre: "Hamburguesa Veggie", precio: 1000 }
];

const bebidas = [
    { id: 1, nombre: "Coca Cola", precio: 300 },
    { id: 2, nombre: "Sprite", precio: 300 },
    { id: 3, nombre: "Agua", precio: 200 }
];

let pedido = [];
let total = 0;

function iniciarPedido() {
    seleccionarHamburguesa();
    let agregarBebida = confirm("¿Deseas agregar una bebida a tu pedido?");
    if (agregarBebida) {
        seleccionarBebida();
    }
    finalizarPedido();
}

// seleccionar una hamburguesa
function seleccionarHamburguesa() {
    let mensaje = "Selecciona tu hamburguesa:\n";
    hamburguesas.forEach(hamburguesa => {
        mensaje += `${hamburguesa.id}: ${hamburguesa.nombre} - $${hamburguesa.precio}\n`;
    });

    let seleccion = parseInt(prompt(mensaje));
    let hamburguesaSeleccionada = hamburguesas.find(hamburguesa => hamburguesa.id === seleccion);

    if (hamburguesaSeleccionada) {
        pedido.push(hamburguesaSeleccionada);
        total += hamburguesaSeleccionada.precio;
        alert(`Añadiste ${hamburguesaSeleccionada.nombre} a tu pedido. Precio: $${hamburguesaSeleccionada.precio}`);
    } else {
        alert("Selección inválida. Intenta nuevamente.");
        seleccionarHamburguesa(); // Reiniciar la selección en caso de elegir mal
    }
}

// seleccionar una bebida
function seleccionarBebida() {
    let mensaje = "Selecciona tu bebida:\n";
    bebidas.forEach(bebida => {
        mensaje += `${bebida.id}: ${bebida.nombre} - $${bebida.precio}\n`;
    });

    let seleccion = parseInt(prompt(mensaje));
    let bebidaSeleccionada = bebidas.find(bebida => bebida.id === seleccion);

    if (bebidaSeleccionada) {
        pedido.push(bebidaSeleccionada);
        total += bebidaSeleccionada.precio;
        alert(`Añadiste ${bebidaSeleccionada.nombre} a tu pedido. Precio: $${bebidaSeleccionada.precio}`);
    } else {
        alert("Selección inválida. Intenta nuevamente.");
        seleccionarBebida();
    }
}

// finalizar el pedido
function finalizarPedido() {
    if (pedido.length > 0) {
        let resumen = "Resumen de tu pedido:\n";
        pedido.forEach(item => {
            resumen += `${item.nombre} - $${item.precio}\n`;
        });
        resumen += `Total a pagar: $${total}`;
        alert(resumen);
        console.log("Pedido final:", pedido);
    } else {
        alert("No realizaste ningún pedido.");
    }
}
