import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Observable } from 'rxjs';
import { Employee, Project } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-project',
  imports: [NgIf,ReactiveFormsModule,NgFor,AsyncPipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  currentView: string = "List";
  projectForm: FormGroup = new FormGroup({});

  employeSrv = inject(EmployeeService);

  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();

  constructor(){
    this.initializeForm();
    this.employeeData$ = this.employeSrv.getEmployee();
  }

  initializeForm(){
    this.projectForm = new FormGroup({
      projectId: new FormControl(0),
      projectName: new FormControl(''),
      clientName: new FormControl(''),
      startDate: new FormControl(''),
      leadByEmpId: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl('')
    });
  }

  onSaveProject(){
    const formValue = this.projectForm.value;
    debugger;

    this.employeSrv.createNewProject(formValue).subscribe((res:Project)=>{
      debugger;
      alert("Project Created Successfully");

    },error=>{
      debugger;
      alert("Error while creating project");

    })
  }
}
