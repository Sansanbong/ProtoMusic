import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class Preferences
{
    
    public static TIPOS_REPR = ['Normal', 'En bucle', 'Aleatoria'];
    
    private dirDefault: string;
    private tipoReproduccion: string;
    private mostrarImgs: boolean;
    
    constructor(private storage: Storage)
    {
        
    }
    
    setDirDefault(dirDefault: string)
    {
        this.dirDefault = dirDefault;
        this.storage.set("dirDefault", this.dirDefault);
    }
    
    getDirDefault()
    {   
       return this.storage.get('dirDefault').then(
            (dirDefault) => {
                this.dirDefault = dirDefault != null ? dirDefault : "/";
                return this.dirDefault;
            }
       ).catch(
            (error) => {
                //Handle error
            }
       );
    }

    setTipoReproduccion(tipoReproduccion: string)
    {
        this.tipoReproduccion = tipoReproduccion;
        this.storage.set("tipoReproduccion", this.tipoReproduccion);
    }
    
    getTipoReproduccion() 
    {
       return this.storage.get("tipoReproduccion").then(
           (tipoReproduccion) => {
               this.tipoReproduccion = tipoReproduccion == null ? Preferences.TIPOS_REPR[0] : tipoReproduccion;
               return this.tipoReproduccion;
            }
       ).catch(
            (error) => {
                this.setTipoReproduccion(Preferences.TIPOS_REPR[0]);
            }
       );
    }
    
    setMostrarImgs(mostrarImgs: boolean)
    {
        this.mostrarImgs = mostrarImgs;
        this.storage.set("mostrarImgs", this.mostrarImgs);
    }
    
    getMostrarImgs()
    {
       return this.storage.get("mostrarImgs").then(
           (mostrarImgs) => {
               this.mostrarImgs = mostrarImgs == null ? true : mostrarImgs ;
               return this.mostrarImgs;
           }
       ).catch(
            (error) => {
                this.setMostrarImgs(true);
            }
       );
    }
    
}