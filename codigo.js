
localStorage.clear();    //LIMPIAMOS EL LOCAL-STORAGE PARA EVITAR ACUMULACION DE DATOS INNECESARIOS (SE PUEDE DESACTIVAR SOLO COMENTANDO LA LINEA)
let lista=document.getElementById("contenedor-pagina");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosJSON = [];

// DOM
function crearProductos(){
    for(const producto of productosJSON) {
        lista.innerHTML+=(`<div class="contenedor-productos">
        <h3>${producto.nombre}</h3>
        <img src=${producto.foto} alt="">
        <h4>$${producto.precio}</h4>
        <button class="boton-add"id="btn${producto.id}">Comprar</button>
        </div>`);
    }
    productosJSON.forEach(producto => {
        document.getElementById(`btn${producto.id}`).onclick=function(){
            agregarAlCarrito(producto);
        }
    });
}


function agregarAlCarrito(productoNuevo){
    let encontrado = carrito.find(p => p.id == productoNuevo.id);
    console.log(encontrado);
    if (encontrado == undefined) {
        let prodACarrito = {
            ...productoNuevo,
            cantidad:1
        };
        carrito.push(prodACarrito);
        console.log(carrito);
        
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: productoNuevo.nombre + ' Agregado Correctamente',
            showConfirmButton: false,
            timer: 1000
        });
        document.getElementById("items").innerHTML+=(`
        <tr>
        <td id='fila${prodACarrito.id}'>${prodACarrito.id} </td>
        <td>${prodACarrito.nombre}</td>
        <td id='${prodACarrito.id}'> ${prodACarrito.cantidad}</td>
        <td>$${prodACarrito.precio}</td>
        <td><button onclick="eliminar(${prodACarrito.id})" class="delete" scope="row"><i class="bi bi-trash"></i></button></td>
        </tr> 
        `);
        
    }else {
        let posicion = carrito.findIndex(p => p.id == productoNuevo.id);
        console.log(posicion);
        carrito[posicion].cantidad += 1;
        document.getElementById(productoNuevo.id).innerHTML=carrito[posicion].cantidad;
        Swal.fire({
            position:'top-end',
            icon: 'success',
            title:productoNuevo.nombre + 'Agregado Correctamente',
            showConfirmButton: false,
            timer: 1000
        });
    }
    document.getElementById("gastoTotal").innerText=(`Total: $ ${calcularTotal()}`);
    localStorage.setItem("carrito",JSON.stringify(carrito));
}
// SUMAMOS EL PRECIO DE LOS PRODUCTOS POR LA CANTIDAD QUE QUEREMOS COMPRAR DE CADA UNO
function calcularTotal () {
    let suma = 0;
    for (const prodACarrito of carrito) {
        suma = suma + (prodACarrito.precio * prodACarrito.cantidad);
    }
    return suma;
}
// FUCION PARA BORRAR LOS PRODUCTOS DEL CARRO
function eliminar(id){
    let indice = carrito.findIndex(producto => producto.id==id);
    carrito.splice(indice,1);
    // console.log();
    let fila = document.getElementById(`fila${id}`).parentElement;
    document.getElementById("items").removeChild(fila);
    document.getElementById("gastoTotal").textContent = `Total: $ ${calcularTotal()}`;
    localStorage.setItem("carrito",JSON.stringify(carrito));
    Swal.fire("Producto Eliminado");
    if(carrito.length == 0) document.getElementById("gastoTotal").innerHTML = `<th scope="row"  colspan="5">--Carrito vacío--</th>`;
}
// traemos el JSON
async function traerJSON() {
    const URLJSON="productos.json"
    const respuesta=await fetch(URLJSON)
    const data=await respuesta.json()
    productosJSON = data;
    crearProductos();
}
traerJSON();

