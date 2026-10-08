// Clase para representar un gasto de combustible
export class GastoCombustible {

    // Constructor de la clase GastoCombustible
    constructor(id, vehicleType, date, kilometers, precioViaje) {
        // Convertimos los valores a los tipos de datos adecuados
        this.id = parseInt(id);
        this.vehicleType = vehicleType;
        this.date = new Date(date);
        this.kilometers = parseInt(kilometers);
        this.precioViaje = parseFloat(precioViaje)  ;
    }
}