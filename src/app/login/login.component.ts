import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';


declare function init_plugins();
declare const gapi: any; // para implementar librería de Google sigIN


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  recuerdame: boolean = false;
  auth2: any; // google genera el token con esto.

  constructor( public router: Router,
               public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

// De la info técnica de Google.
  googleInit() {  
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '729898119684-osje07urhbe2nnt1u496ntthcfqhvtd0.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle( token )
      .subscribe( () => window.location.href = '#/dashboard' ); // Redirección manual para evitar el error de carga de la web.
      // console.log(token);
      // let profile = googleUser.getBasicProfile();
      // console.log( profile );

    });
  }

  ingresar( forma: NgForm) {

    console.log( forma.valid );
    console.log( forma.value );

    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password );
    this._usuarioService.login( usuario, forma.value.recuerdame )
    .subscribe( correcto => this.router.navigate( ['/dashboard'] ));
  }

}
