import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import {forkJoin, map, mergeMap, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {UserService} from "../user.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})

export class AddressFormComponent implements OnInit{

  user!: SocialUser;
  port_number:number = 8080;
  // get_address_api:string = `http://localhost:${this.port_number}/api/address/getAddress/${this.user.id}`
  /*
  Below we include the different form fields that are needed for display, and HTTP method purposes (Post, put,...)
   */

  // user_data is in this format because I need to add user info into this user_data and send this object to HTTP Methods
  // without the {[index: string]:any} i can't really index or add anything to the object
  user_data: {[index: string]:any} = {};
  user_id?:string;
  address_id?:string;
  recipient_name:string='';
  street?:string;
  street2?:string;
  city?:string;
  state?:string;
  zip?:string;


  // validation patterns for address form
  state_pattern:string = '^[a-zA-Z][a-zA-Z]$';
  recipient_pattern:string = '^[A-Za-z ,.\'\\-]*$';
  city_pattern:string = '^[A-Za-z ,.\'\\-]{1,30}$';
  zip_pattern:string = '^[0-9]{5}$';




  // the form builder making the different fields with a generic validator for now
  addressForm = this.fb.group
  (
    {
      // address_id and user_id are included in the form code, BUT!! not presented to the user, as they don't need to
      // know their ids, these 2 fields are just kept for ease of coding(sending the PUT/Post/Patch... requests)
      address_id: [''],
      user_id: [''],
      recipient_name: ['', [Validators.required, Validators.pattern(this.recipient_pattern), Validators.maxLength(50)] ],
      street: ['', [Validators.required, Validators.maxLength(30) ] ],
      street2: ['', Validators.maxLength(30)],
      city: ['', [Validators.required, Validators.pattern(this.city_pattern)] ],
      state: ['', [  Validators.required, Validators.pattern(this.state_pattern)  ]],
      zip: ['', [Validators.required, Validators.pattern(this.zip_pattern)]  ],
      is_shipping: ['false'],
      is_billing: ['false'],
    }
  );

  constructor(private fb: FormBuilder, private userService: UserService,
              private router: Router,
              private http: HttpClient, private authService: SocialAuthService)
  {
  }



  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(`THIS IS THE LOGIN LOG FROM ADDRESS FORM COMPONENT\n\n `,user);
      this.http.get(`http://localhost:${this.port_number}/api/address/getAllAddresses`)
        .pipe
        (
          map
          (users =>
            {
              let found_flag = 0;
              let index:number = 0;
              console.log("\n\n in map");

              // @ts-ignore
              while (users[index] != undefined)
              {
                console.log("\nin the while loop \n");
                // @ts-ignore
                if (users[index].recipient_name === this.user.name)
                {
                  found_flag = 1;
                  break;
                }
                index+=1;
              }
              if (found_flag ===1)
              {
                console.log("Logged user above");
                // @ts-ignore
                const found_user = users[index]; // index will now point to the correct user.
                console.log(found_user.street);
                this.address_id = found_user.address_id;
                this.user_id = found_user.user_id;
                this.zip = found_user.zip;
                this.street = found_user.street;
                this.street2 = found_user.street2;
                this.state = found_user.state;
                this.city = found_user.city;
                return found_user;
              }
              else
              {
                // create the user.
              }

            }
          ),
          mergeMap
          (user =>
            this.http.get(`http://localhost:${this.port_number}/api/address/getAddress/${this.address_id}`)

          )
        ).subscribe(console.log);
    });

    // after user logs in, GET their info from the DB, and assign the result to various vars specified for storage
    // and HTTP methods

    this.recipient_name = this.user.name;
  }


  onSubmitUpdate(): void
  {

    if (this.addressForm.valid)
    {
      // once all the required fields of the FORMBUILDER is valid, then add the user_id and addressID to the FB,
      // and send for PUT request.
      this.addressForm.value.user_id = this.user_id;
      this.addressForm.value.address_id = this.address_id;
      console.log(this.addressForm.value);
      this.http.put(`http://localhost:${this.port_number}/api/address/updateAddress/${this.address_id}`, this.addressForm.value)
        .subscribe
          (resp=>
            {
              console.log(resp);
            }
          );
    }
    this.ngOnInit(); // call to update the "Current User Address" html form

  }


  onSubmitAdd(): void
  {
    // NOTE! if no address on file. THEN you can't add address (cold-start)
    // since user-id is needed.
    if (this.addressForm.valid)
    {
      // once all the required fields of the FORMBUILDER is valid, then add the user_id and addressID to the FB,
      // and send for PUT request.
      this.addressForm.value.user_id = this.user_id;
      delete this.addressForm.value.address_id;
      let new_user: {  [index: string]:any  } = {};
      console.log(this.addressForm.value);
      this.http.post(`http://localhost:${this.port_number}/api/address/createAddress`, this.addressForm.value)
        .subscribe
        (resp=>
          {
            new_user = resp;
            this.address_id = new_user['address_id'];
            console.log(resp);
          }
        );
    }
  }

  deleteAddress():void
  {
    console.log("Delete button clicked");
    console.log(`http://localhost:${this.port_number}/api/address/deleteAddress/${this.address_id}`)
    this.http.delete
    (
      `http://localhost:${this.port_number}/api/address/deleteAddress/${this.address_id}`
    ).subscribe(() => console.log("Deleted"));
    // this.user_id =  '';
    this.address_id =  '';
    this.recipient_name =  '';
    this.street = '';
    this.street2 =  '';
    this.state = '';
    this.zip =  '';
    this.city = '';
  }

}


