import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { User } from '../models/model.interface';
import { CommonModule } from '@angular/common';
import { DataService } from '../seriveces/data.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  standalone: true,
  selector: 'app-create-post',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})

export class CreateUserComponent {

  constructor(private dataService: DataService, private route: Router) { }

  @ViewChild('f') form!: NgForm;

  formObj: User = {
    id: null!,
    name: '',
    lastName: '',
    age: null!,
    bold: false,
  };

  dataForm(): void {

    if (this.form.invalid) {
      // Marcar todos como tocados para que muestren errores
      this.form.control.markAllAsTouched();
      return;
    }

    this.dataService.addUser(this.formObj)
      .subscribe({
        next: (res: HttpResponse<User>) => {
          console.log(`Status Code: ${res.status}`);
          console.log(`Response Body: ${res.body}`);

          Swal.fire({
            toast: true,
            position: 'bottom',
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 2500
          });

          setTimeout(() => {
            this.route.navigate(['/listUsers']);
          }, 300);

        },
        error: err => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Error al crear usuario',
            text: err.message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }
      })
  }

}
