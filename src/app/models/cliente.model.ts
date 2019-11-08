
export class Cliente {

  constructor(
      public nombre: string,
      public apellido: string,
      public genero?: string,
      public telefono?: string,
      public email?: string,
      public nacionalidad?: string,
      // public procedencia?: string,
      public edad?: string,
      public documento?: string,
      public tipoDocumento?: string,
      public estadoCivil?: string,
      public profesion?: string,
      public direccion?: string,
      // public motivoViaje?: string,
      // public tieneEquipaje?: string,
      public observaciones?: string,

      public _id?: string
  ) { }

}

