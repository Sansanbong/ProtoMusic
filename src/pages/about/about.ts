import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UtilProvider } from '../../providers/utilProvider';
import { MediaProvider } from '../../providers/mediaProvider';
import { DAOProvider } from '../../providers/DAOProvider';

//Classes
import { MusicFile } from '../../classes/musicFile';
import { Preferences } from '../../classes/Preferences';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

    private mostrarImgs : boolean;
    private favorites : MusicFile[];
    
    constructor(public navCtrl: NavController, private util: UtilProvider, private media : MediaProvider, private prefs : Preferences, private daoProvider : DAOProvider) {
        
        this.navCtrl.viewDidEnter.subscribe(
            (view) => {
                this.prefs.getMostrarImgs().then(
                    (mostrarImgs) => {
                        this.mostrarImgs = <boolean>mostrarImgs;
                    }
            );
        });
        
        this.favorites = <any>this.daoProvider.getFavorites();
    }
    
    
    private play(fav: MusicFile)
    {
        this.media.setPlayList(this.favorites);
        this.media.playFile(fav);
    }

}
