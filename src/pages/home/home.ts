import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Providers
import { FileBrowserProvider } from '../../providers/fileBrowserProvider';
import { UtilProvider } from '../../providers/utilProvider';
import { MediaProvider } from '../../providers/mediaProvider';
import { DAOProvider } from '../../providers/DAOProvider';

//Classes
import { MusicFile } from '../../classes/musicFile';
import { Preferences } from '../../classes/Preferences';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    private musicFiles: MusicFile[];
    private mostrarImgs : boolean;
    private favorites : MusicFile[];
    
    constructor(public navCtrl: NavController, private fileBrowser: FileBrowserProvider, private util: UtilProvider, private media : MediaProvider, private prefs : Preferences, private daoProvider : DAOProvider) {
        
        this.navCtrl.viewDidEnter.subscribe((view) => {
            this.prefs.getMostrarImgs().then(
                (mostrarImgs) => {
                    this.mostrarImgs = <boolean>mostrarImgs;
                }
            );
            
            this.daoProvider.getFavorites();
        });
        
        this.musicFiles = new Array<MusicFile>();
        let musicFile = new MusicFile();
        musicFile.setName("Music");
        musicFile.setPath("Music");
        musicFile.setIsDirectory(true);
        
        this.goToDir(musicFile);
        

        
    }
  
    private goToDir(dir: MusicFile)
    {          
        if (dir != null && dir.getIsDirectory())
        {
            let pBar : any = this.util.getProgressBar("Loading");
            
            pBar.present();
            
            this.fileBrowser.goToDir(dir).then(
                (listFiles) => {
                    this.loadList(listFiles);
                    pBar.dismiss();
                }
            );
        }
        else
        {
            this.media.setPlayList(this.musicFiles);
            this.media.playFile(dir);
        }
    }
    
    private canGoBack()
    {
        return this.fileBrowser.getCanGoBack();
    }
    
    private goBack()
    {
        if (this.fileBrowser.getCanGoBack)
        {
            let musicFile = new MusicFile();
            musicFile.setPath(this.fileBrowser.getPreviousPath());
            musicFile.setIsDirectory(true);
            
            this.goToDir(musicFile);
        }
    }
    
    private loadList(list: any)
    {
        list = this.util.deleteUnvalidFiles(list);
        list = this.util.sortFiles(list);
        this.musicFiles = new Array();
        
        for (let i=0; i<list.length; i++)
        {
            let musicFile = new MusicFile();
            
            musicFile.setName(this.util.parseFileName(list[i].name));
            musicFile.setPath(this.util.parseFilePath(list[i].fullPath));
            musicFile.setFullPath(list[i].fullPath.substring(1, list[i].fullPath.length));
            musicFile.setIsDirectory(list[i].isDirectory);
            musicFile.setIsAudio(!list[i].isDirectory);
            let index = this.favorites.indexOf(musicFile);
            if (index != -1)
                musicFile.setIsFavorite(true);
            
            this.musicFiles[i] = musicFile;
        }
    }
    
    private showIcon(musicFile: MusicFile, type : boolean)
    {
        if (this.mostrarImgs && musicFile.getIsDirectory() == type)
            return true;
        return false;
        
    }
    
    private isFavorite(musicFile : MusicFile)
    {
        let index = this.favorites.indexOf(musicFile);
        if (index != -1)
            return true;
        
        return false;
    }
    
    private saveFavorite(musicFile : MusicFile)
    {
        window.event.cancelBubble = true;
        this.daoProvider.saveFavorite(musicFile);
        
    }
    
    private removeFavorite(musicFile : MusicFile)
    {
        window.event.cancelBubble = true;
        this.daoProvider.removeFavorite(musicFile);        
        
    }
}