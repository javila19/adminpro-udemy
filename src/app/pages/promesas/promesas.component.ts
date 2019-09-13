import { Component, OnInit } from '@angular/core';
import { setInterval, clearInterval } from 'timers';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      () => console.log('Termino!')
    )
    .catch( error => console.error('Error en la promesa', error));

  }


  ngOnInit() {
  }

  contarTres(): Promise<boolean> {


    // Ejemplo promesa
    return new Promise( (resolve, reject)  => {

      let contador = 0;
      // tslint:disable-next-line: prefer-const
      let intervalo = setInterval( () => {


      contador += 1;
      console.log( contador );


      if ( contador === 3 ) {
        resolve();
        clearInterval(intervalo);

      }

    }, 1000 );
    });
  }

}
