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

function almacenarGastos(){
  GASTOS_DB.forEach(gasto => {
    localStorage.setItem(gasto.id.toString(), JSON.stringify(gasto));
    let anio = gasto.date.getFullYear();

    if(gastoAnual[anio] !== undefined){
      gastoAnual[anio] += gasto.precioViaje;
    }
  });

  for (let anio in gastoAnual){
    sessionStorage.setItem(anio, gastoAnual[anio]);
  }
} 

function procesarGasto(jsonNuevoGasto){
  let dato = JSON.parse(jsonNuevoGasto);
  let nuevoGasto = new GastoCombustible(dato.id, dato.vehicleType, dato.date, dato.kilometers, dato.precioViaje);
  let anio = nuevoGasto.date.getFullYear();
  
  let gastoAnterior = parseFloat(sessionStorage.getItem(anio.toString())) || 0;
  let gastoActualizado = gastoAnterior + nuevoGasto.precioViaje;
  sessionStorage.setItem(anio.toString(), gastoActualizado);
}


export const GastoService = {
  almacenarGastos,
  procesarGasto   
};