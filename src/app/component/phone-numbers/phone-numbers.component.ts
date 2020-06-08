import { Component, OnInit, ViewChild } from '@angular/core';
import { PhoneApiService } from '../../service/phone-api.service';
import { FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-phone-numbers',
  templateUrl: './phone-numbers.component.html',
  styleUrls: ['./phone-numbers.component.css']
})
export class PhoneNumbersComponent implements OnInit {

  public telNum = new FormControl('');
  public submitNum: string;
  public numArr: string[] = [];
  public slicedNumArr: string[] = [];
  public totalCount: number;
  public startIndex: number;
  public isValidNumber = true;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private phoneapi: PhoneApiService) {
  }

  ngOnInit(): void {
  }

  public onPageChange(event: PageEvent): void {
    this.phoneapi.fetchPhoneNums(this.submitNum, this.paginator.pageIndex + 1).subscribe(data => {
      this.totalCount = data[0];
      this.numArr = data.slice(1);
      console.log(this.numArr);
    });
  }

  onSubmit() {
    if (this.telNum === null){
      this.isValidNumber = false;
    } else if (this.telNum.value.toString().length === 7 || this.telNum.value.toString().length === 10) {
        this.isValidNumber = true;
        this.paginator.pageIndex = 0;
        console.log('valid');
        this.phoneapi.fetchPhoneNums(this.telNum.value, this.paginator.pageIndex + 1).subscribe(data => {
        this.totalCount = data[0];
        this.numArr = data.slice(1);
        this.submitNum = this.telNum.value.toString();
        console.log(this.numArr);
      });
    }
    else {
      console.log('invalid');
      this.isValidNumber = false;
    }
  }

}
