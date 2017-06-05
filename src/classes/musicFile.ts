export class MusicFile
{
    private path: string;
    private fullPath: string;
    private name: string;
    private isDirectory : boolean = false;
    private isAudio : boolean = false;
    private isFavorite : boolean = false;
    
    constructor()
    {
     
    }
    
    getName()
    {   
       return this.name;
    }
    
    setName(name: string)
    {
        this.name = name;
    }

    getPath()
    {   
       return this.path;
    }
    
    setPath(path: string)
    {
        this.path = path;
    }
    
    getFullPath()
    {
       return this.fullPath;
    }
    
    setFullPath(fullPath: string)
    {
        this.fullPath = fullPath;
    }
    
    getIsDirectory()
    {   
       return this.isDirectory;
    }
    
    setIsDirectory(isDirectory: boolean)
    {
        this.isDirectory = isDirectory;
    }
    
    getIsAudio()
    {   
       return this.isAudio;
    }
    
    setIsAudio(isAudio: boolean)
    {
        this.isAudio = isAudio;
    }
    
    getIsFavorite()
    {   
       return this.isFavorite;
    }
    
    setIsFavorite(isFavorite: boolean)
    {
        if (this.isAudio)
            this.isFavorite = isFavorite;
        else
            this.isFavorite = false;
    }
    

}