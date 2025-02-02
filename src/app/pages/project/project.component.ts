import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project',
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  currentView: string = "List";
  projectForm: FormGroup = new FormGroup({});

  constructor(){
    this.initializeForm();
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
}
