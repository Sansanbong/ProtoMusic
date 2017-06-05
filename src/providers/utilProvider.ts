import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class UtilProvider {
    
    private static ROOT_DIR : string = "file:///storage/extSdCard";
    
    constructor(public toastCtrl:ToastController, public loadingCtrl: LoadingController) {
        
    }
    
    getProgressBar(text: string) {
        let loading:any = this.loadingCtrl.create({
            content: text
        });
        
        return loading;
    }

    getToast(message: string) {
        let toast:any = this.toastCtrl.create({
            message: message,
            duration: 3000
            
        });
        return toast;
    }
    
    public deleteUnvalidFiles(list : any)
    {
        var notValid = [];
    
        for (var i=0; i<list.length; i++)
        {
            if (!list[i].isDirectory && !list[i].name.endsWith(".mp3"))
            {
                notValid.push(i);
            }
        }
        
        for (var i=0; i<notValid.length; i++)
        {
            list.splice(notValid[i] - i, 1);
        }
        
        return list;
    }
    
    public sortFiles(list)
    {
        var len = list.length;
        
        //Bubble sorting names
        for (var i = len-1; i>=0; i--){
            for(var j = 1; j<=i; j++){
                
                    if (list[j-1].name > list[j].name){
                        var temp = list[j-1];
                        list[j-1] = list[j];
                        list[j] = temp;    
                    }
            }
        }
        
        //Bubble sorting files
        for (var i = len-1; i>=0; i--){
            for(var j = 1; j<=i; j++){
                if (!list[j-1].isDirectory && list[j].isDirectory){
                    var temp = list[j-1];
                    list[j-1] = list[j];
                    list[j] = temp;    
                }
            }
        }
        
        return list;
    }
    
    public parseFileName(name: string)
    {
        return name.split(".mp3")[0];
    }
    
    public parseFilePath(path: string)
    {
        return path.split("storage/extSdCard/")[1];
    }
}