import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
// tslint:disable-next-line: import-blacklist


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy  {

  subscription: Subscription;

  constructor() {



    this.subscription = this.regresaObservable()
    .subscribe(
        numero => console.log( 'Subs ', numero ),
        error => console.error('Error en el obs', error),
        () => console.log('El observador termino!')
        
     );


  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('La página se va a cerrar');
  }

regresaObservable(): Observable<any> {

  return new Observable( (observer: Subscriber<any>) => {

  
    let contador = 0;
    
    const intervalo = setInterval( () => {
      
      contador++;

      const salida = {
        valor: contador
      };

      observer.next( salida ); // Cada vez que quiero notificar algo
      
      // if ( contador === 3 ) {
      //   clearInterval( intervalo );
      //   observer.complete();
      // }

      // if ( contador === 2 ) {
      //   // clearInterval( intervalo );
      //   observer.error('Auxilio!');
      // }

    }, 1000 );
  }).pipe(
    
    map( resp => resp.valor),
    filter( ( valor, index ) => {

      if ( ( valor % 2 ) === 1 ) {
      // Impar
      return true;
      } else {
        // Par
        return false;
      }

    })
    );
}

}
