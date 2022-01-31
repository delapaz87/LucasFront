import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../app.reducer';
import { Tag } from '../../../../shared/models/Company';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { saveTag } from '../../../../theme/layout/admin/store/actions/tag.actions';
import * as actions from '../../../../theme/layout/admin/store/actions';

@Component({
  selector: 'app-company-labels',
  templateUrl: './company-labels.component.html',
  styleUrls: ['./company-labels.component.css']
})
export class CompanyLabelsComponent implements OnInit {

  tag_company = [];
  tag: Tag[] = [];
  formTag: FormGroup ;

  constructor(
    private store: Store<AppStateWithCommerce>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanyLabelsComponent>,
  ) {
    this.formTag = this.fb.group({
      selecttag: new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
    this.store.select('commerce').subscribe( ({ tag }) => this.tag = tag.data);
    this.store.select('commerce').subscribe( ({company}) => {
      this.tag_company = company.data.company_tag;
      this.formTag = this.fb.group({
        selecttag: new FormControl( this.tag_company,[Validators.required])
      });
    })
    this.js()
  }

  addTag(input: any) {
    const objTag: any =  {
      tag:input
    }
    this.store.dispatch(saveTag({tag: objTag}));
  }

  saveTag() {
    this.store.dispatch(actions.updateCommerceTag({tag: this.formTag.controls['selecttag'].value}))
    this.dialogRef.close();
  }

  js() {
    $(function(){
      $(document).click(function () {
       $(".dropdown-list").fadeOut();
       $(".g-input--material input").each(function () {
         if ($(this).val() === "") {
           $(this).removeClass("focus");
           $(this).siblings(".main-input").removeClass("focus");
           $(this).next(".placeholder").removeClass("focus");
         }
       });
     });

     $(".g-input--material").on({
       click: function(e) {
         $(this).find(".placeholder, input, .main-input").addClass("focus");
         e.stopPropagation();
       },
     });

     $(this).find(".placeholder, input, .main-input").addClass("focus");
    });
  }

}
