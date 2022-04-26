import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

const data = [
  { id: 1, name: ' test1', phone: '123456789' },
  { id: 2, name: ' test2', phone: '321456789' },
  { id: 3, name: ' test3', phone: '432156789' },
  { id: 4, name: ' test4', phone: '543216789' },
];

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  showTableList: boolean = false;
  formPhone: FormGroup;
  colunas = ['id', 'name', 'phone'];
  id: number = 5;
  listPhones = new MatTableDataSource(data);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(formBuilder: FormBuilder, private _liveAnnouncer: LiveAnnouncer) {
    this.formPhone = formBuilder.group({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    console.log(this.listPhones);
  }
  ngAfterViewInit() {
    this.listPhones.sort = this.sort;
  }

  getInputs() {
    console.log(this.formPhone.getRawValue());
    data.push({
      id: this.id,
      name: this.formPhone.getRawValue().name,
      phone: this.formPhone.getRawValue().phone,
    });
    this.showTableList = true;
  }
  cleanFormPhone() {
    this.formPhone.patchValue({
      name: '',
      phone: '',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listPhones.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  removeData() {
    data.pop();
    this.listPhones = new MatTableDataSource(data);
    console.log(this.listPhones.data);
    this.table.renderRows();
  }
  return() {
    this.showTableList = false;
  }
}
