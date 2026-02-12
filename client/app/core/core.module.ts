import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {CoreRoutingModule} from './core-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DeviceService} from './services/device.service';
import {ApiService} from './services/api.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTrash, faDove, faPaperclip, faUserSecret, faLaptopCode, faTv, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faMeh, faEnvelope, faEnvelopeOpen, faTrashAlt, faClock, faPaperPlane, faFile,
  faFileArchive, faFileAudio, faFileCode, faFileExcel, faFileImage, faFilePdf, faFilePowerpoint,
  faFileVideo, faFileWord } from '@fortawesome/free-regular-svg-icons';
import {SharedModule} from '../shared/shared.module';
import {HomeModule} from '../home/home.module';
import {ConfigService} from './services/config.service';
import {MomentModule} from 'ngx-moment';
import {TokenInterceptor} from './services/token-interceptor';
import { SeoService } from './services/seo.service';
import {Angulartics2Module} from 'angulartics2';

export function initializeApp(ahemProperties: ConfigService) {
  return () => ahemProperties.load();
}


library.add(faMeh, faEnvelope, faEnvelopeOpen, faBars, faTrash, faTrashAlt, faClock, faPaperPlane, faDove, faPaperclip, faFile,
  faFileArchive, faFileAudio, faFileCode, faFileExcel, faFileImage, faFilePdf, faFilePowerpoint,
  faFileVideo, faFileWord, faUserSecret, faLaptopCode, faTv, faMobileAlt);

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MatToolbarModule,
    HttpClientModule,
    MomentModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    HomeModule,
    SharedModule,
    Angulartics2Module.forRoot(),
    CoreRoutingModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    RouterModule,
    SharedModule
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ApiService,
    SeoService,
    MatIconRegistry,
    DeviceService],
})
export class CoreModule { }

