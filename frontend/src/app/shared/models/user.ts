export interface User{
  id: number;
  username: string;
  rol: string;
  fecha_registro: string;
  perfilId: number;
  nombrePerfil: string;
  imagen: string;
  email: string;
  tipoActor: 'Emprendedor' | 'Reciclador' | 'Cooperativa';
}