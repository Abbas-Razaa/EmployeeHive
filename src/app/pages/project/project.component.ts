import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Observable } from 'rxjs';
import { Employee, Project, ProjectEmployee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-project',
  imports: [NgIf,ReactiveFormsModule,NgFor,AsyncPipe,DatePipe,FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  @ViewChild('myModal') employeeModal: ElementRef | undefined;
  currentView: string = "List";
  projectForm: FormGroup = new FormGroup({});
  projectEmployee: ProjectEmployee = new ProjectEmployee();

  employeSrv = inject(EmployeeService);
  projectList: Project[] = [];

  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();

  constructor(){
    this.initializeForm();
    this.employeeData$ = this.employeSrv.getEmployee();
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  onAddEmployees(id: number){ 
    if(this.employeeModal){
      this.employeeModal.nativeElement.style.display = "block";
    }
  }

  closeModal(){ 
    if(this.employeeModal){
      this.employeeModal.nativeElement.style.display = "none";
    }
  }

  onEdit(projectData: Project){
    this.initializeForm(projectData);
  }

  initializeForm(project?: Project){
    this.projectForm = new FormGroup({
      projectId: new FormControl(project ? project.projectId : 0),
      projectName: new FormControl(project ? project.projectName : ''),
      clientName: new FormControl(project ? project.clientName : ''),
      startDate: new FormControl(project ? project.startDate : ''),
      leadByEmpId: new FormControl(project ? project.leadByEmpId : 0),
      contactNo: new FormControl(project ? project.contactNo : ''),
      emailId: new FormControl(project ? project.emailId : ''),
    });
    this.currentView = "Create";
  }

  onAddEmp(){
    this.employeSrv.addNewProjectEmployee(this.projectEmployee).subscribe((res:ProjectEmployee)=>{
      debugger;
      alert('Employee Added to Project');
    }, errors=>{

    })

  }

  onSaveProject(){
    const formValue = this.projectForm.value;
    if(formValue.projectId == 0){

      this.employeSrv.createNewProject(formValue).subscribe((res:Project)=>{
        debugger;
        alert("Project Created Successfully");
        this.getAllProjects();
  
      },error=>{
        debugger;
        alert("Error while creating project");
  
      })

    } else {
      this.employeSrv.updateProject(formValue).subscribe((res:Project)=>{
        debugger;
        alert('Project Updated Success')
        this.getAllProjects();
      },error=>{

      })

    }
  }

  getAllProjects(){
    this.employeSrv.getProjects().subscribe((res:Project[])=>{
      debugger;
      this.projectList = res;

    },error=>{
      debugger;
      alert("Error while fetching projects");
    })
  }
}
