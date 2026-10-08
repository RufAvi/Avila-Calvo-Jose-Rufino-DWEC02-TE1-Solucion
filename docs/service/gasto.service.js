import { GASTOS_DB } from "../data/gasto.data.js";
import { GastoCombustible } from "../model/gastos.model.js";


var gastoAnual = {
  2020 : 0,
  2019 : 0,
  2018 : 0,
  2017 : 0,
  2016 : 0,
  2015 : 0
};
// Función para almacenar los gastos en localStorage y calcular el gasto anual
function almacenarGastos(){
  GASTOS_DB.forEach(gasto => {
    localStorage.setItem(gasto.id.toString(), JSON.stringify(gasto));
    let anio = gasto.date.getFullYear();

    if(gastoAnual[anio] !== undefined){
      gastoAnual[anio] += gasto.precioViaje;
    }
  });
  // Guardamos el gasto anual en sessionStorage
  for (let anio in gastoAnual){
    sessionStorage.setItem(anio, gastoAnual[anio]);
  }
} 

// Función para procesar un nuevo gasto y actualizar el gasto anual en sessionStorage
function procesarGasto(jsonNuevoGasto){
  let dato = JSON.parse(jsonNuevoGasto);

  // Creamos un nuevo objeto GastoCombustible a partir de los datos del JSON
  let nuevoGasto = new GastoCombustible(dato.id, dato.vehicleType, dato.date, dato.kilometers, dato.precioViaje);
  let anio = nuevoGasto.date.getFullYear();
  // Actualizamos el gasto anual en sessionStorage
  let gastoAnterior = parseFloat(sessionStorage.getItem(anio.toString())) || 0;
  let gastoActualizado = gastoAnterior + nuevoGasto.precioViaje;
  // Guardamos el gasto actualizado en sessionStorage
  sessionStorage.setItem(anio.toString(), gastoActualizado);
}

// Exportamos las funciones para que puedan ser utilizadas en otros módulos
export const GastoService = {
  almacenarGastos,
  procesarGasto   
};