import { Injectable } from '@angular/core';
import { Disco } from '../classes/Disco';

@Injectable()
export class Grupo
{
    private dirName: string;
    private discos: Disco[];
    
    constructor()
    {
     
    }
    
    getDirName()
    {   
       return this.dirName;
    }
    
    setDirName(dirName: string)
    {
        this.dirName = dirName;
    }

    getDiscos()
    {   
       return this.discos;
    }
    
    setDiscos(discos: Disco[])
    {
        this.discos = discos;
    }
}