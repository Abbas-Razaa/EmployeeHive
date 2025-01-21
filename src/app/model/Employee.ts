export class Employee {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;
  createDate: Date;

  constructor() {
    this.employeeId = 0;
    this.employeeName = '';
    this.contactNo = '';
    this.emailId = '';
    this.deptId = 0;
    this.gender = '';
    this.password = '';
    this.role = '';
    this.createDate = new Date();
  }
}

export interface IParentDept {
  departmentId: number;
  departmentName: string;
  departmentLogo: string;
} 

export interface IChildDept {
  chidDeptId: number;
  parentDeptId: number;
  departmentName: string;
}

export interface IApiResponse {
  message: string;
  result: boolean;
  data: any;
}