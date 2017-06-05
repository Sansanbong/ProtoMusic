
import { Cancion } from '../classes/Cancion';
import { Grupo } from '../classes/Grupo';

export class Disco
{
    private dirName: string;
    private canciones: Cancion[];
    private grupo: Grupo;
    
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

    getCanciones()
    {   
       return this.canciones;
    }
    
    setCanciones(canciones: Cancion[])
    {
        this.canciones = canciones;
    }
    
    getGrupo()
    {   
       return this.grupo;
    }
    
    setGrupo(grupo: Grupo)
    {
        this.grupo = grupo;
    }
}