import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';
import { FILE } from 'dns';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor( public _usuarioService: UsuarioService) {
    
    this.usuario = this._usuarioService.usuario;

   }

  ngOnInit() {
  }
  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
    this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario( this.usuario )
        .subscribe();

  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo Imágenes', 'El archivo no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    
    // Uso javascript puro para leer la imagen temporal.
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
    
  }

  subirImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir , this.usuario._id );
    this.imagenTemp = null;
  }

}
