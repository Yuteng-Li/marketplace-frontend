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
  addressid?:string;
  recipient_name?:string;
  street?:string;
  street2?:string;
  city?:string;
  state?:string;
  zip?:string;


  addressForm = this.fb.group
  (
    {
      addressid: [''],
      userid: [''],
      recipient_name: ['', Validators.required],
      street: ['', Validators.required],
      street2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      is_shipping: ['true'],
      is_billing: ['true'],
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
          console.log(data);
          this.userData = data;
          this.userID = this.userData['userID'];
          this.addressid = this.userData['addressID'];
          this.recipient_name = this.userData['recipientName'];
          this.street = this.userData['street'];
          this.street2 = this.userData['street2'];
          this.state = this.userData['state'];
          this.zip = this.userData['zip'];
          this.city = this.userData['city'];
        }
      );



  }


  onSubmit(): void
  {
    if (this.addressForm.valid == true)
    {
      this.addressForm.value.userid = this.userID;
      this.addressForm.value.addressid = this.addressid;

      this.http.put(`http://localhost:9090/api/updateAddress/${this.addressid}`, this.addressForm.value)
        .subscribe
          (resp=>
            {
              console.log(resp);
            }
          );
    }
    // console.log('You entered value: ', this.addressForm.value);
  }

  deleteAddress():void
  {
    console.log("Delete button clicked");
    console.log(`http://localhost:9090/api/deleteAddress/${this.addressid}`)
    this.http.delete
    (
      `http://localhost:9090/api/deleteAddress/${this.addressid}`
    );
  }

  userLog(): void
  {
    // this.http.get("http://localhost:9090/api/address/getAddress/1")
    //   .subscribe
    //   (data =>
    //     {
    //       // console.log(data);
    //       this.userData = data;
    //
    //     }
    //   );

    // // console.log(this.userData);
    // this.userID = this.userData['userID'];
    // this.recipient_name = this.userData['recipientName'];
    // this.street = this.userData['street'];
    // this.street2 = this.userData['street2'];
    // this.state = this.userData['state'];
    // this.zip = this.userData['zip'];
    // this.city = this.userData['city'];

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
