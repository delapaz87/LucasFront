import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService
  ) { }

  showSuccess(message: string, title : string, obj: any = null) {
    this.toastr.success(message, title, obj );
  }

  showError(message: string, title : string, obj: any = null) {
      this.toastr.error(message, title, obj );
  }

  showInfo(message: string, title : string, obj: any = null) {
      this.toastr.info(message, title, obj);
  }

  showWarning(message: string, title : string, obj: any = null) {
      this.toastr.warning(message, title, obj);
  }

}
