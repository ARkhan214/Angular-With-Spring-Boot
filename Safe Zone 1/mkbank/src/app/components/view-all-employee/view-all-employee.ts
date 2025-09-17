import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../service/employee-service';

@Component({
  selector: 'app-view-all-employee',
  standalone: false,
  templateUrl: './view-all-employee.html',
  styleUrl: './view-all-employee.css'
})
export class ViewAllEmployee implements OnInit {

  employee: Employee[] = [];
  filteredAccount: Employee[] = [];


  //For Search----Start
  searchById: string = '';
  searchByNid: string = '';
  searchByPhone: string = '';
  // searchByAccountType: string = '';
  //For Search----End

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.employeeService.getAllAccount().subscribe(emp => {
      this.employee = emp;
      console.log("Accounts from API: ", this.employee);
      this.filteredAccount = [...emp];
      this.cdr.markForCheck();
    });
  }



  filterById(): void {
    if (!this.searchById) {
      this.filteredAccount = [...this.employee];
    } else {
      const search = this.searchById.toLowerCase();
      this.filteredAccount = this.employee.filter(a =>
        a.id?.toString() === search
      );
    }
    this.cdr.markForCheck();
  }

  filterByNid(): void {
    if (!this.searchByNid) {
      this.filteredAccount = [...this.employee];
    } else {
      const search = this.searchByNid.toLowerCase();
      this.filteredAccount = this.employee.filter(a =>
        a.nid?.toLowerCase().includes(search)
      );
    }
    this.cdr.markForCheck();
  }

  filterByPhone(): void {
    if (!this.searchByPhone) {
      this.filteredAccount = [...this.employee];
    } else {
      const search = this.searchByPhone.toLowerCase();
      this.filteredAccount = this.employee.filter(a =>
        a.phoneNumber?.toLowerCase().includes(search)
      );
    }
    this.cdr.markForCheck();
  }


}
