import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Classes
import { Cancion } from '../classes/Cancion';
import { Disco } from '../classes/Disco';
import { Grupo } from '../classes/Grupo';
import { Preferences } from '../classes/Preferences';
import { MusicFile } from '../classes/musicFile';
import { MediaPlayer } from '../classes/mediaPlayer';

//Providers
import { FileBrowserProvider } from '../providers/fileBrowserProvider';
import { MediaProvider } from '../providers/mediaProvider';
import { DAOProvider } from '../providers/DAOProvider';
import { UtilProvider } from '../providers/utilProvider';

//Native
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { Storage } from '@ionic/storage';
import { MediaPlugin } from '@ionic-native/media';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Preferences,
    Cancion,
    Grupo,
    Disco,
    MusicFile,
    MediaPlayer,
    FileBrowserProvider,
    MediaProvider,
    DAOProvider,
    UtilProvider,
    File,
    FileChooser,
    Storage,
    MediaPlugin,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
