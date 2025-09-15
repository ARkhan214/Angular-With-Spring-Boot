import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../service/employee-service';

@Component({
  selector: 'app-view-all-employee',
  standalone: false,
  templateUrl: './view-all-employee.html',
  styleUrl: './view-all-employee.css'
})
export class ViewAllEmployee  implements OnInit{

  employee:Employee[]=[];

  constructor(
    private employeeService:EmployeeService,
      private cdr: ChangeDetectorRef
  ){}

ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
  this.employeeService.getAllAccount().subscribe(emp => {
    this.employee = emp;           
    console.log("Accounts from API: ", this.employee);
    this.cdr.markForCheck();            
  });
}


}
