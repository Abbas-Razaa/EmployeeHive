import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, IApiResponse } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  createNewEmployee(obj:Employee){
    return this.http.post<Employee>(
      "https://projectapi.gerasim.in/api/EmployeeManagement/CreateEmployee",obj)
    }

  updateEmployee(obj:Employee){
    return this.http.put<Employee>("https://projectapi.gerasim.in/api/EmployeeManagement/GetAllEmployees"+obj.employeeId,obj)
  }
  getEmployee() {
    return this.http.get<Employee[]>(
      "https://projectapi.gerasim.in/api/EmployeeManagement/GetAllEmployees"
    )
  }
  deleteEmpById(id: number) {
    return this.http.delete<Employee>(
      "https://projectapi.gerasim.in/api/EmployeeManagement/DeleteEmployee"+id
    )
  }
}
