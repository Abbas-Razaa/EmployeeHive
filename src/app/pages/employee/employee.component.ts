import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Employee, IApiResponse, IChildDept, IParentDept } from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  parentDeptList: IParentDept[] = [];
  childDeptList: IChildDept[] = [];
  deptId: number = 0;

  employeeObj: Employee = new Employee();
  employeeList: Employee[] = [];
  masterService = inject(MasterService);
  empService = inject(EmployeeService)
 
  ngOnInit(): void {
    this.getParentDeptList();
    this.getEmployees();
  }

  getEmployees() {
    this.empService.getEmployee().subscribe((res: Employee[]) => {
      this.employeeList = res;
    }); 
  }

  getParentDeptList() {
    this.masterService.getParentDept().subscribe((res: IApiResponse) => {
      this.parentDeptList = res.data;
    });
  }

  onDeptChange(){
    this.masterService.getChildDeptByParentId(this.deptId).subscribe((res: IApiResponse) => {
      this.childDeptList = res.data;
    })
  }

  onSaveEmp(){
    debugger;
    this.empService.createNewEmployee(this.employeeObj).subscribe((res: Employee)=>{
      debugger;
        alert("Employee Creation Success") 
    }, error=>{
      alert('Error From API')
    })
  }

  onDelete(id: number){
    const result = confirm('Are you surely want to Delete')
    if(result){
      this.empService.deleteEmpById(id).subscribe((res:Employee)=>{
        debugger;
        alert("Employee deletion Success")
        this.getEmployees();
      },error=>{
        alert('Error Form API')
      })
    }
  }
}