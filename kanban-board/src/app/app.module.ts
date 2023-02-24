import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { TaskComponent } from './task/task.component';
import { MatCardModule} from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { KananBoard } from './kanan-board/kanan-board.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    RegisterComponent,
    LoginComponent,
    KananBoard,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    AppRoutingModule
  ],
  providers: [AuthService,AuthGuard,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi:true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
