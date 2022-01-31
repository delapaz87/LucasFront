import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ODialogHours } from '../../../../shared/models/Auth';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../app.reducer';
import * as actions from '../../../../theme/layout/admin/store/actions/stores.action';

@Component({
  selector: 'app-modal-hours',
  templateUrl: './modal-hours.component.html',
  styleUrls: ['./modal-hours.component.css']
})
export class ModalHoursComponent implements OnInit {

  weekday = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"];
  formHours: FormGroup | any;

  constructor(
    private store: Store<AppStateWithCommerce>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalHoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ODialogHours,
  ) {

  }

  ngOnInit(): void {

    this.formHours = this.fb.group({
      store_id    : new FormControl(this.data?.store_id),
      weekday     : this.fb.array([]),
      start_time  : new FormControl('',[Validators.required]),
      end_time    : new FormControl('',[Validators.required]),
      all_store : new FormControl(false),
    });
    this.weekday.forEach( (e:any) => {
      this.addWeekday();
    });
  }

  get hours(): FormArray {
    return this.formHours.get('weekday') as FormArray;
  }

  addWeekday() {
    const weekday = this.fb.group({
        btncheck    : new FormControl(false),
        week        : new FormControl(this.hours.length)
    });
    this.hours.push(weekday);
  }

  submitHours() {
    if (this.formHours.invalid) { return; }
    this.store.dispatch(actions.updateStoresHours({hours: this.formHours.value}))
    this.dialogRef.close();
  }

}
