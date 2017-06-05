import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Preferences } from '../../classes/Preferences';

import { FileChooser } from '@ionic-native/file-chooser';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  
    dir: any;
    tipos_repr: string[];
    tipoRepr: any;
    mostrarImgs: any;
    
    constructor(public navCtrl: NavController, private fileChooser: FileChooser, private prefs: Preferences) 
    {
        this.prefs.getDirDefault().then(
            (res) => {
                this.dir = res; 
            }
        );
     
        this.tipos_repr = Preferences.TIPOS_REPR;
        
        this.prefs.getTipoReproduccion().then(
            (res) => {
                this.tipoRepr = res;
            }
        );
        
        this.prefs.getMostrarImgs().then(
            (res) => {
                this.mostrarImgs = res;
            }
        );
    } 
    
    openFileChooser() {
        this.fileChooser.open().then(
            (uri) => {
                window.FilePath.resolveNativePath(uri, 
                    (resultPath) => {    
                        this.prefs.setDirDefault(resultPath);
                        this.dir = resultPath;
                    }, (err) => {
                        //TODO Toast utils -> error
                    })
            }).catch(
                //TODO Toast again 
            );  
    }   
   
    onTipoReprChange(tipoRepr)
    {
         this.prefs.setTipoReproduccion(tipoRepr);
    }
    
    onMostrarImgsChange()
    {
        this.prefs.setMostrarImgs(this.mostrarImgs);
    }
    
    
}

declare let window: any;
