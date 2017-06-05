import { Disco } from '../classes/Disco';

export class Cancion
{
    private fileName: string;
    private disco: Disco;
    
    constructor()
    {
     
    }
    
    getFileName()
    {   
       return this.fileName;
    }
    
    setFileName(fileName: string)
    {
        this.fileName = fileName;
    }

    getDisco()
    {   
       return this.disco;
    }
    
    setDisco(disco: Disco)
    {
        this.disco = disco;
    }
    
}