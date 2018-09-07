import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products/products.component';
import { ProductsPipe } from './products/products.pipe';
import { RatingComponent } from './products/rating/rating.component';
import { HomeComponent } from './home/home/home.component';
import { DetailComponent } from './products/detail/detail.component';
import { LoginComponent } from './auth/login/login.component';
import { NavigationComponent } from './home/navigation/navigation.component';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard';
import { AuthinterceptorService } from './auth/authinterceptor.service';
import { TemplateComponent } from './forms/template/template.component';
import { ReactiveComponent } from './forms/reactive/reactive.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsPipe,
    RatingComponent,
    HomeComponent,
    DetailComponent,
    LoginComponent,
    NavigationComponent,
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'home',component:HomeComponent, canActivate: [AuthGuard]},
      {path:'products',component:ProductsComponent, canActivate: [AuthGuard]},
      {path:'template',component:TemplateComponent, canActivate: [AuthGuard]},
      {path:'reactive',component:ReactiveComponent, canActivate: [AuthGuard]},
      {path:'login',component:LoginComponent},
      {path:'details/:pId',component:DetailComponent,canActivate: [AuthGuard]},
      {path:"",redirectTo:"home", pathMatch:"full"},
      {path:"**",redirectTo:"home"}
    ])
  ],
  providers: [AuthService,CookieService, AuthGuard, 
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi:true
    }
  ],
  
  bootstrap: [AppComponent]
})


export class AppModule { }
