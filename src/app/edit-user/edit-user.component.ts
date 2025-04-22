import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { User } from '../models/model.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{

  @ViewChild('f') form!: NgForm;

  formObj!: User;

  constructor (private router: Router) {
    const navigator = this.router.getCurrentNavigation();

    if (navigator?.extras.state?.['user']) {
      this.formObj = navigator.extras.state['user'];
    } else {
      console.error(`No se ha podido pasar la informacion ${navigator}`)
    }
  }

  ngOnInit(): void {
    console.log(this.formObj)
  }

  dataForm(): void {
    if (this.form.invalid) {
      // this.form.form es el FormGroup subyacente
      Object.values(this.form.form.controls)
        .filter(control => control.invalid)
        .forEach(control => control.markAsTouched());
      return;
    }
  }

}
