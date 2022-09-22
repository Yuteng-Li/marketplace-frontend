import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})

export class AddressFormComponent implements OnInit{

  // addressForm?:FormGroup;
  userData: {[index: string]:any} = {};
  userID?:string;
  recipient_name?:string;
  street?:string;
  street2?:string;
  city?:string;
  state?:string;
  zip?:string;


  addressForm = this.fb.group
  (
    {
      _recipientName: ['', Validators.required],
      _street: ['', Validators.required],
      _street2: [''],
      _city: ['', Validators.required],
      _state: ['', Validators.required],
      _zip: ['', Validators.required],
      _isShipping: [''],
      _isBilling: [''],
    }
  );

  constructor(private fb: FormBuilder, private http: HttpClient)
  {
  }

  ngOnInit(): void {
    this.http.get("http://localhost:9090/api/address/getAddress/1")
      .subscribe
      (data =>
        {
          // console.log(data);
          this.userData = data;

        }
      );

  }


  onSubmit(): void
  {
    console.log('You entered value: ', this.addressForm.value);
  }

  userLog(): void
  {
    this.http.get("http://localhost:9090/api/address/getAddress/1")
      .subscribe
      (data =>
        {
          // console.log(data);
          this.userData = data;

        }
      );
    console.log(this.userData);
    this.userID = this.userData['userID']
    this.recipient_name = this.userData['recipientName'];
    this.street = this.userData['street'];
    this.street2 = this.userData['street2'];
    this.state = this.userData['state'];
    this.zip = this.userData['zip'];
    this.city = this.userData['city'];

  }
}


// export class AddressFormComponent implements OnInit {
//
//   addressForm:FormGroup = new FormGroup
//     (
//       {
//       _recipientName: new FormControl(''),
//       _street: new FormControl(''),
//       _street2: new FormControl(''),
//       _city: new FormControl(''),
//       _state: new FormControl(''),
//       _zip: new FormControl(''),
//       _isShipping: new FormControl(''),
//       _isBilling: new FormControl(''),
//       }
//     );
//
//   constructor(fb: FormBuilder)
//   {
//     // this.myForm = fb.group
//     // (
//     //   {
//     //     recipientName : ['James']
//     //   }
//     // );
//   }
//
//   ngOnInit(): void {
//   }
//
//
//   onSubmit(): void
//   {
//     console.log('You entered value: ', this.addressForm.value);
//   }
//
// }
