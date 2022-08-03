
// for(intentos=1;intentos<=3;intentos++){
//     let contrasenia=prompt("Ingrese la Contraseña");
//     if(contrasenia==1987){
//         console.log("Bienvenido a la Tienda River");
//         break;
//     }else{
//         console.log("La contraseña es Incorrecta")
//     }
// }


// let total = 0;
// //let producto1 = 14500;
// //let producto2 = 12400;

// function comprar(producto1,porducto2){
//     total = producto1 + producto2
//     console.log("la suma de $ "+producto1+" + $"+porducto2+" es igual $"+ total);
    
// }
// comprar(producto1,producto2);

// function comprarConCuotas(producto1){
//     totalConCuotas= producto1/12;
//     console.log("La camiseta Titular de River Plate te queda en 12 cuotas de $"+totalConCuotas);
// }
// comprarConCuotas(producto1);




//array tienda

class producto{
    constructor (nombre, anio, precio, disponibilidad){
        this.nombre = nombre;
        this.anio = anio;
        this.precio = precio;
        this.disponibilidad = disponibilidad;
    }
    mostrarProducto(){
        console.log("nombre: "+this.nombre+"\nAño: "+this.anio+"\nPrecio: "+this.precio+"\nDisponibilidad "+this.disponibilidad);
    }
}
const producto1 = new producto ("Camiseta Titular", 2022, 14500, true);
const producto2 = new producto ("Camiseta Alternativa", 2022, 12400, true);
const producto3 = new producto ("Camiseta Arquero", 2022, 11000, true);
const producto4 = new producto ("Camiseta Titular", 2021, 14500, false);
console.log(producto1)
producto3.mostrarProducto();