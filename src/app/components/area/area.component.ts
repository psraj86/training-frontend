import { MatDialog } from '@angular/material/dialog';
import { Area } from './../../models/area.model';
import { AreaService } from './../../services/area.service';
import { Component, OnInit } from '@angular/core';
import { AreaFormComponent } from './area-form/area-form.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  areas: Area[] = [];

  constructor(private areaService: AreaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAreaList();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AreaFormComponent, {
      width: '500px',
    })

    dialogRef.afterClosed().subscribe(
      (area) => {
        this.areaService.add(area).subscribe(
          (area) => this.getAreaList()
        );
      }
    )
  }

  getAreaList() {
    this.areaService.getList().subscribe({
      next: (areas) => this.areas = areas,
    })
  }

}
