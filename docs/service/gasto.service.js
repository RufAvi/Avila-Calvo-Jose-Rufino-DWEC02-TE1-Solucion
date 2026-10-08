import { GASTOS_DB } from "../data/gasto.data.js";


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

}


export const GastoService = {
  almacenarGastos,   
};