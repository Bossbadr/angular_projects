import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { User } from '../models/model.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../seriveces/data.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{

  @ViewChild('f') form!: NgForm;

  formObj!: User;
  private userId!: number;

  constructor (private dataservice: DataService, private router: Router) {

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
      // Marcar todos como tocados para que muestren errores
      this.form.control.markAllAsTouched();
      return;
    }

    this.userId = this.formObj.id;

    this.dataservice.updateUser(this.userId, this.formObj)
    .subscribe({
      next: (res: HttpResponse<User>) => {
          console.log(`Status Code: ${res.status}`);
          console.log(`Response Body: ${res.body}`);

          this.router.navigate(['/listUsers'])
      }, 
      error: err => {
        console.error(`Error al crear el post: ${err.message}`)
      }
    })

  }

}
