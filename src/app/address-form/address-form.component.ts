import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})

export class AddressFormComponent implements OnInit{

  user!: SocialUser;
  port_number:number = 9090;
  // get_address_api:string = `http://localhost:${this.port_number}/api/address/getAddress/${this.user.id}`
  /*
  Below we include the different form fields that are needed for display, and HTTP method purposes (Post, put,...)
   */

  // userData is in this format because I need to add user info into this userData and send this object to HTTP Methods
  // without the {[index: string]:any} i can't really index or add anything to the object
  userData: {[index: string]:any} = {};
  userID?:string;
  addressid?:string;
  recipient_name?:string;
  street?:string;
  street2?:string;
  city?:string;
  state?:string;
  zip?:string;


  // the form builder making the different fields with a generic validator for now
  addressForm = this.fb.group
  (
    {
      // addressid and userid are included in the form code, BUT!! not presented to the user, as they don't need to
      // know their ids, these 2 fields are just kept for ease of coding(sending the PUT/Post/Patch... requests)
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

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: SocialAuthService)
  {
  }

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(`THIS IS THE LOGIN LOG FROM ADDRESS FORM COMPONENT\n\n `,user);
    });

    // after user logs in, GET their info from the DB, and assign the result to various vars specified for storage
    // and HTTP methods
    console.log(`The SSO provided user is: ${this.user.email}\n\n\n`);
    this.http.get(`http://localhost:${this.port_number}/api/address/getAddress/${1}`)
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
      // once all the required fields of the FORMBUILDER is valid, then add the userID and addressID to the FB,
      // and send for PUT request.
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
    console.log(`http://localhost:${this.port_number}/api/address/deleteAddress/1`)
    this.http.delete
    (
      `http://localhost:${this.port_number}/api/address/deleteAddress/1`
    ).subscribe(() => console.log("Deleted"));
    this.userID =  '';
    this.addressid =  '';
    this.recipient_name =  '';
    this.street = '';
    this.street2 =  '';
    this.state = '';
    this.zip =  '';
    this.city = '';
  }

  userLog(): void
  {
    // STUB
  }
}


