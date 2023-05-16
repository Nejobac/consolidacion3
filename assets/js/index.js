//1. Acceder a elementos del DOM
let btnCalcular = document.getElementById("btnCalcular");
let inputPresupuesto = document.getElementById("inputPresupuesto");
let presupuesto = document.getElementById("presupuesto");
let totalGastos = document.getElementById("totalGastos");
let saldo = document.getElementById("saldo");
let btnAnadir = document.getElementById("btnAnadir");

//2. Agrego funcion al btn calcular
btnCalcular.addEventListener('click', function() {
    presupuesto.innerHTML = inputPresupuesto.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    actualizarSaldo();
    presupuesto.innerHTML > 0 ? btnAnadir.removeAttribute("disabled") : btnAnadir.setAttribute("disable",true);
})

//2.1 funcion para actualizar el saldo
function actualizarSaldo(){
    let pptoResumen = presupuesto.innerHTML.replaceAll(".","");
    let gastosResumen = listaGastos.reduce((acumulador,valorActual) => acumulador + valorActual.monto,0);
    let nuevoSaldo = String(pptoResumen - gastosResumen);
    saldo.innerText = nuevoSaldo.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return nuevoSaldo;
}
//3. accedo al DOM
let inputNombreGasto = document.getElementById("inputNombreGasto");
let inputMontoGasto = document.getElementById("inputMontoGasto");
let bodyTabla = document.getElementById("bodyTabla");

//4. agrego funcion al btnAnadir
btnAnadir.addEventListener('click', function() {
    let nombre = inputNombreGasto.value;
    let monto = parseInt(inputMontoGasto.value);
    agregarGasto(nombre,monto);
    actualizarTabla();
})
//4.1 Crea constructor del objeto Gasto
function Gasto(nombre,monto){
    this.nombre = nombre;
    this.monto = monto;
};

//4.2 array de gastos
let listaGastos = [];

//4.3 funcion para agregar un gasto con los input y agregar al array
function agregarGasto(nombre,monto) {
    let gasto = new Gasto(nombre,monto);
    listaGastos.push(gasto);
    let computoSaldo = actualizarSaldo();
    if(computoSaldo < 0){
        listaGastos.pop();
        alert("No puedes agregar ese gasto, excedes de tu presupuesto")
    } else {
        let gastoActualizado = listaGastos.reduce((acumulador,valorActual) => acumulador + valorActual.monto, 0);
        totalGastos.innerHTML = String(gastoActualizado).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    actualizarSaldo();
}

//4.4 actualizar tabla, usando interpolacion
function actualizarTabla(){
    let html = "";
    listaGastos.forEach((gasto,index) => {
        html += `
        <tr>
            <td>${gasto.nombre}</td>
            <td>$${gasto.monto}</td>
            <td style="cursor: pointer;"><i class="fa-solid fa-trash" onclick="eliminar(${index})"></i></td>
        </tr>
        `
    })
    bodyTabla.innerHTML = html;
    actualizarSaldo();
}


//5. funcion icono eliminar
function eliminar(index){
    listaGastos = listaGastos.filter((gasto,indice) => indice != index);
    let gastoActualizado = listaGastos.reduce((acumulador,valorActual) => acumulador + valorActual.monto, 0);
    totalGastos.innerHTML = String(gastoActualizado).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    actualizarTabla();
}