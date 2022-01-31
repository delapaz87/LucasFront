import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket/ticket.component';
import { CodeInputModule } from 'angular-code-input';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { HtmlPipe } from '../pipe/html.pipe';
import { CustomPipeModule } from '../pipe/custom-pipe.module';
import { ImagenUploadModalComponent } from './imagen-upload-modal/imagen-upload-modal.component';
import { ImageCropperModule } from 'ngx-img-cropper';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TicketComponent,
    AlertModalComponent,
    ImagenUploadModalComponent,
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    ReactiveFormsModule,
    CustomPipeModule,
  ],
  exports:[
    TicketComponent,
    AlertModalComponent
  ]
})
export class SharedModule { }
