import { Company } from './../../models/company.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  companyForm!: FormGroup;
  btnText: string = 'Save';
  titleText: string = 'Add Company'
  company?: Company;
  constructor(public dialogRef: MatDialogRef<CompanyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.company = this.data?.company;
    this.btnText = this.company ? 'Update' : 'Save';
    this.titleText = this.company ? 'Update Company' : 'Add Company';
    this.companyForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      name: [this.company ? this.company.name : ''],
      maxUser: [this.company ? this.company.maxUser : ''],
      isDivisionExist: [this.company ? this.company.isDivisionExist : false],
      isDCRProgressive: [this.company ? this.company.isDCRProgressive : false]
    })
  }

  close() {
    const companyObject = {
      ...this.companyForm.value,
      id: this.company?.id
    }

    this.dialogRef.close(companyObject)
  }
}
