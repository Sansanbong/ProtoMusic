import { Injectable } from '@angular/core';
import { MusicFile } from '../classes/musicFile';
import { MediaPlugin, MediaObject } from '@ionic-native/media';
import { UtilProvider } from '../providers/utilProvider';
import { Preferences } from '../classes/Preferences';

@Injectable()
export class MediaProvider {

    private media : MediaPlugin;
    private mediaObject : MediaObject;
    private filePlaying : MusicFile;
    private playList : MusicFile[];
    private isPaused : boolean = false;
    public isPlaying : boolean = false;
    

    constructor(private util: UtilProvider, private prefs : Preferences){
        
    }
    
    playFile(musicFile : MusicFile, musicFiles? : MusicFile[])
    {
        if (this.isPaused || this.isPlaying)
        {
            this.stop();
        }
        
        if (musicFiles){
            this.playList = musicFiles;
        }
        
        this.createMediaObject(musicFile);
        
        if (this.mediaObject != null)
        {
            this.play();
            this.filePlaying = musicFile;
        }
    }
    
    createMediaObject(musicFile: MusicFile)
    {
        if (!this.media)
            this.media = new MediaPlugin();
        
        if (this.mediaObject != null)
            this.mediaObject.release();        
        
        this.mediaObject = this.media.create(musicFile.getFullPath(), (state) => {
            
            
            if (state == 1){
                let toast : any = this.util.getToast(this.filePlaying.getName());
                toast.present();
            }
            
            this.mediaObject.getCurrentPosition().then((current) => {
                //Si la canción ha terminado, la siguiente.
                if (state == 4 && current < 0){
                    this.prefs.getTipoReproduccion().then(
                    (tipoRepr) => {
                        this.next(<string>tipoRepr);
                    });
                }    
            })
            
            
        });
    }
    
    stop(){
        this.mediaObject.stop();
        this.isPaused = false;
        this.isPlaying = false;
    }
    
    play()
    {
        this.mediaObject.play();
        this.isPlaying = true;
        this.isPaused = false;
    }
    
    pause()
    {
        this.mediaObject.pause();
        this.isPaused = true;
        this.isPlaying = false;
    }
    
    previous()
    {
        let index = this.playList.indexOf(this.filePlaying);
        index--;

        if (index < 0)
            index = this.playList.length - 1;
        
        this.playFile(this.playList[index]);
    }
    
    next(tipoRepr? : string)
    {
        let index = this.playList.indexOf(this.filePlaying);
        index++;
        
        
        if (tipoRepr)
        {
            if (tipoRepr == Preferences.TIPOS_REPR[1])
            {
                if (index >= this.playList.length)
                    index = 0;    
            }
            else if (tipoRepr == Preferences.TIPOS_REPR[2])
            {
                let aux = index;
                while (aux == index)
                {
                    aux = Math.floor(Math.random() * this.playList.length - 1) + 0;
                }
                
                index = aux;
            } 
            else
            {
                if (index >= this.playList.length)
                {
                    this.isPlaying = false;
                    return;    
                }
            }
                
        }
        else
        {
            if (index >= this.playList.length)
            index = 0;
        }
        
        this.playFile(this.playList[index]);
    }
    
    isPlayingNow()
    {   
       return this.isPlaying  || this.isPaused;
    }
    
    isPausedNow()
    {   
       return this.isPaused;
    }
    
    setPlayList(playList : MusicFile[])
    {
        this.playList = playList;
    }
}