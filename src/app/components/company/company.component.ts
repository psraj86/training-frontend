import { Company } from './../../models/company.model';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyFormComponent } from '../company-form/company-form.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor(private companyService: CompanyService, public dialog: MatDialog) { }
  companies: Company[] = [];
  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      companies => {
        this.companies = companies;
      },
      error => {
        console.log(error)
      })
  }
  openDialog(company?: Company) {
    const dialogRef = this.dialog.open(CompanyFormComponent, {
      data: {
        company: company
      },
      width: '500px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(company => {
      const data: Company = <Company>company;
      if (data?.id) {

        this.companyService.update(company).subscribe(
          () => {
            this.getCompanies();
          }
        )
      } else {
        this.companyService.add(data).subscribe(
          (data: Company) => {

            this.getCompanies();
          }

        )
      }
    })
  }

  delete(id: string) {
    this.companyService.delete(id).subscribe(
      (res) => {
        console.log(res);
        this.getCompanies()
      }
    );
  }
}
