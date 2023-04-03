import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphQLModule, MaterialModule } from './modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ApolloClientService } from './services/apollo-client.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    GraphQLModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    GraphQLModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    LoaderComponent
  ],
  providers:[
    ApolloClientService,
    AlertService,
    AuthService,
    StorageService
  ]
})
export class SharedModule { 
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }
}
