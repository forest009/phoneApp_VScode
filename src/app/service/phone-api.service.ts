import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhoneApiService {

  baseUrl: string;
  path: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/';
    this.path = 'getPhone/';
  }

  fetchPhoneNums(phoneNum: string, pageNum: number): any {
    return this.httpClient.get(this.baseUrl + this.path + phoneNum + '/' + pageNum);
  }
}
