import { MusicFile } from '../classes/musicFile';
import { MediaProvider } from '../providers/mediaProvider';

export class MediaPlayer
{
    private mediaProvider : MediaProvider;
    public isPlaying : boolean = false;
    private filePlaying : MusicFile;
    private playList : MusicFile[];
    
    constructor()
    {
        
    }
    
    setProvider(mediaProvider : MediaProvider)
    {
        this.mediaProvider = mediaProvider;
        
    }
    
    play()
    {
        this.isPlaying = true;
        if (this.mediaProvider != null)
            this.mediaProvider.play();
        
    }
    
    playFile(musicFile : MusicFile)
    {
        this.filePlaying = musicFile;
        if (this.isPlaying)
            //mediaProvider.stop();
            
        //mediaProvider.play();
        this.isPlaying = true;
    }
    
    pause()
    {
        
    }
    
    previous()
    {
        
    }
    
    next()
    {
        
    }
    
    isPlayingNow()
    {   
       return this.isPlaying;
    }
    
    setPlayList(playList : MusicFile[])
    {
        this.playList = playList;
    }
}