import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {

  areaForm!: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AreaFormComponent>) { }

  ngOnInit(): void {
    this.areaForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      name: [null, Validators.required],
      status: [true, Validators.required],
      code: [null, Validators.required]
    })
  }

  closeDialog() {
    //console.log(this.areaForm.value);
    this.dialogRef.close(this.areaForm.value);
  }

}
