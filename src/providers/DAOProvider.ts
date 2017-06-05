import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

//Classes
import { MusicFile } from '../classes/musicFile';
import { UtilProvider } from '../providers/utilProvider';

@Injectable()
export class DAOProvider {
  
    private favorites : MusicFile[];
    
    constructor(private storage: NativeStorage, private util: UtilProvider) {}
  
    public getFavorites()
    {    
        this.storage.getItem('favorites').then(
            (favorites) => {
                let data = <Array<MusicFile>>JSON.parse(favorites);
                this.favorites = data != null ? data : new Array<MusicFile>();
                return this.favorites;
            },
            (error) => {
                let toast : any = this.util.getToast("Oops! Favorites couldn't be loaded");
                toast.present();
                return null;
            }
          );
    }
    
    public saveFavorite(musicFile : MusicFile)
    {        
        this.storage.setItem("favorites", JSON.stringify(this.favorites)).then(
            () => {
                musicFile.setIsFavorite(true);
                this.favorites.push(musicFile);
                let toast : any = this.util.getToast(musicFile.getName() + " has been added to favorites!");
                toast.present();
            },
            (error) => {
                let toast : any = this.util.getToast("Oops! Something went wrong, please try again");
                toast.present();
            }
          );
    }
    
    public removeFavorite(musicFile : MusicFile)
    {
        let index = this.favorites.indexOf(musicFile);
        
        if (index != -1){
            let favoritesAux = this.favorites;
            this.storage.setItem("favorites", JSON.stringify(favoritesAux)).then(
                () => {
                    musicFile.setIsFavorite(false);
                    this.favorites.splice(index, 1);
                },
                (error) => {
                    let toast : any = this.util.getToast("Oops! Something went wrong, please try again");
                    toast.present();
                }
              );
        }
    }
}
