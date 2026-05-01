import { Component, inject, OnInit } from '@angular/core';
import { MensajeService } from '../../../core/services/mensajesService/mensaje';
import { Conversacion, Mensaje } from '../../../shared/models/mensajes';
import { Perfil } from '../../../core/services/perfilServices/perfil';

@Component({
  selector: 'app-mensajes',
  imports: [],
  templateUrl: './mensajes.html',
  styleUrl: './mensajes.scss',
})
export class Mensajes implements OnInit {
  mensajeService = inject(MensajeService);
  profileService = inject(Perfil)

  conversaciones: Conversacion[] = [];
  mensajes: Mensaje[] = [];

  ngOnInit(): void {
    this.mensajeService.obtenerConversaciones().subscribe((data) => {
      this.conversaciones = data;
      console.log(this.conversaciones);
    });
  }


  verMensajes(id: number) {
    this.mensajeService.obtenerMensajes(id).subscribe((data) => {
      this.mensajes = data;
      console.log(this.mensajes);
    });
  }
}
