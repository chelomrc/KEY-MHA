export class Registro {

  constructor(
      public nombre: string,
      public apellido: string,
      public reserva?: string,
      public checkIn?: string,
      public horaIn?: string,
      public checkOut?: string,
      public horaOut?: string,
      public nacionalidad?: string,
      public profesion?: string,
      public procedencia?: string,
      public edad?: string,
      public estadoCivil?: string,
      public direccion?: string,
      public motivoViaje?: string,
      public tieneEquipaje?: string,
      public tarifa?: string,
      public tipoHabitacion?: string,
      public habitacion?: string,
      public observaciones?: string,
      public _id?: string
  ) { }
}
