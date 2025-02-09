import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, IApiResponse } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiURL = 'https://projectapi.gerasim.in/api/EmployeeManagement';

  constructor(private http: HttpClient) { }

  createNewEmployee(obj:Employee){
    return this.http.post<Employee>(
      this.apiURL+"CreateEmployee",obj)
    }

  updateEmployee(obj:Employee){
    return this.http.put<Employee>(this.apiURL+"UpdateEmployees/"+obj.employeeId,obj)
  }
  getEmployee() {
    return this.http.get<Employee[]>(
      this.apiURL+"GetAllEmployees"
    )
  }
  deleteEmpById(id: number) {
    return this.http.delete<Employee>(
      this.apiURL+"DeleteEmployee"+id
    )
  }
  createNewProject(obj: Employee) {
    return this.http.post<Employee>(this.apiURL+
      "CreateProject",obj
    )
  }
}
