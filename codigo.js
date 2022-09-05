// function ingresePassword(){
//     for(intentos=1;intentos<=3;intentos++){
//         let contrasenia=prompt("Ingrese la Contraseña");
//         if(contrasenia==1987){
//             console.log("Bienvenido a la Tienda River");
//             break;
//         }else{
//             console.log("La contraseña es Incorrecta")
//         }
//     }
// }
// ingresePassword();

// let total = 0;
// let camiseta1 = 14500;
// let camiseta2 = 12400;

// function comprar(camiseta1,camiseta2){
//     total = camiseta1 + camiseta2
//     console.log("la suma de $ "+camiseta1+" + $"+camiseta2+" es igual $"+ total);
    
// }
// comprar(camiseta1,camiseta2);

// function comprarConCuotas(camiseta1){
//     totalConCuotas= camiseta1/12;
//     console.log("La camiseta Titular de River Plate te queda en 12 cuotas de $"+totalConCuotas);
// }
// comprarConCuotas(camiseta1);


// // //array tienda

// class producto{
//     constructor (nombre, anio, precio, disponibilidad){
//         this.nombre = nombre;
//         this.anio = anio;
//         this.precio = precio;
//         this.disponibilidad = disponibilidad;
//     }
//     mostrarProducto(){
//         console.log("nombre: "+this.nombre+"\nAño: "+this.anio+"\nPrecio: "+this.precio+"\nDisponibilidad "+this.disponibilidad);
//     }
// }
// const producto1 = new producto ("Camiseta Titular", 2022, 14500, true);
// const producto2 = new producto ("Camiseta Alternativa", 2022, 12400, true);
// const producto3 = new producto ("Camiseta Arquero", 2022, 11000, true);
// const producto4 = new producto ("Camiseta Titular", 2021, 14500, false);
// const producto5 = new producto ("Musculosa", 2020, 8500, true);
// const producto6 = new producto ("Chomba", 2021, 7800, false);
// const producto7 = new producto ("Conjunto Invierno", 2021, 18900, true);


// const  productos = []
// productos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7);
// console.table(productos);

// console.log(producto7);
// producto7.mostrarProducto();

// //filter

// let disponibles = productos.filter(producto=> producto.disponibilidad==true);
// console.table(disponibles);

// let noDisponibles = productos.filter(producto=> producto.disponibilidad==false);
// console.table(noDisponibles);

// //find

// let porNombre = productos.find(producto=>producto.nombre=="Conjunto Invierno");
// console.log(porNombre);

// // uasuario agrega nuevo producto

// let nombreNuevo = prompt("Ingrese el Nombre del Producto Nuevo");
// let anioNuevo = Number(prompt("ingrese el Año del Producto Nuevo"));
// let precioNuevo = Number(prompt("Ingrese el Precio del Producto Nuevo"));
// let disponibilidadNuevo = confirm("El Nuevo Producto esta Disponible?");

// let productoNuevo = new producto(nombreNuevo, anioNuevo, precioNuevo, disponibilidadNuevo);

// productos.push(productoNuevo);

// console.table(productos);

// // array + iva con map

// const productoIva = productos.map(producto =>{
//     return{
//         nombre:producto.nombre,
//         anio:producto.anio,
//         precio:producto.precio * 1.21,
//         disponibilidad:producto.disponibilidad
//     }
// });

// console.table(productoIva);

// DOM

let lista=document.getElementById("contenedor-pagina");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosJSON = [];


function crearProductos(){
    for(const producto of productosJSON) {
        lista.innerHTML+=`<div class="contenedor-productos">
        <h3>${producto.nombre}</h3>
        <img src=${producto.foto} alt="">
        <h4>$${producto.precio}</h4>
        <button class="boton-add"id="btn${producto.id}">Comprar</button>
        </div>`;
    }
    productosJSON.forEach(producto => {
        document.getElementById(`btn${producto.id}`).addEventListener(`click`,function(){
            agregarAlCarrito(producto);
        })
    });
}

crearProductos();

function agregarAlCarrito(producto){

    carrito.push(producto);
    console.log(carrito);

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: producto.nombre+ ' Agregado Correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    document.getElementById("items").innerHTML+=`
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td><button onclick="borrar(${producto.id})" class="delete" scope="row"><i class="bi bi-trash"></i></button></td>
        </tr> 
    `;
    
    
    localStorage.setItem("carroCompras",JSON.stringify(carrito));
}

function eliminarProductoCarrito(productosAEliminar){
   const productosAMantener = carrito.filter(
        (elemento)=>elemento.producto.id != productosAEliminar.producto.id);
    carrito.length=0;
    productosAMantener.forEach((producto) => carrito.push(producto));
}

async function traerJSON() {
    const URLJSON="productos.json"
    const respuesta=await fetch(URLJSON)
    const data=await respuesta.json()
    productosJSON = data;
    crearProductos();
}
traerJSON();
