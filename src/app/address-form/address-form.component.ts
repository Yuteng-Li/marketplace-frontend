import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl} from '@angular/forms'
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})

export class AddressFormComponent implements OnInit{

  // addressForm?:FormGroup;
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

  constructor(private fb: FormBuilder)
  {
  }

  ngOnInit(): void {


  }


  onSubmit(): void
  {
    console.log('You entered value: ');
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
