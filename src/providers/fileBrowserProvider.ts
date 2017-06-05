import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';

//Classes
import { MusicFile } from '../classes/musicFile';

@Injectable()
export class FileBrowserProvider {
  
    private static ROOT_DIR : string = "file:///storage/extSdCard";
    private actualDir : string = "";
    private canGoBack : boolean = false;
    
    constructor(private fileCtrl: File) {}
  
    goToDir(dir: MusicFile)
    {    
        this.actualDir = dir.getPath();
        
        this.canGoBack = !(this.actualDir == null || this.actualDir == "" || this.actualDir == "Music");
     
        return <any> this.fileCtrl.listDir(FileBrowserProvider.ROOT_DIR, this.actualDir);
    }
    
    getPreviousPath()
    {
        if (!this.canGoBack)
            return;
        
        let pathTokens = this.actualDir.split("/");
        if (pathTokens.length > 0)
        {
            let dir = "";
            for (let i=0; i<pathTokens.length - 1; i++)
            {
                dir = dir + (dir != "" ? "/" : "") + pathTokens[i];
            }
            
            return dir;
        }
        
        return null;
    }
    
    getCanGoBack()
    {
       return this.canGoBack;
    }
}

