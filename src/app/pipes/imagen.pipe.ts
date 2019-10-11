import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario' ): any {

  let url = URL_SERVICIOS + '/img';

  // Si no hay imagen.
  if ( !img ) {
    return url + '/usuarios/xxx';
  }
  // Si la imagen es de Google.

  if ( img.indexOf('https') >= 0) { // Me sirve para saber si hay un string que comience con https y de esa forma detecto que es de Google.
    return img;
  }

  // Hago un switch por el tipo de dato que se ingresa.

  switch ( tipo ) {
    case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
      default:
        console.log('Tipo de imagen no existe. Debe ser usuarios, médicos, hospitales');
        url += '/usuarios/xxx';
  }
  return url;
  }

}
