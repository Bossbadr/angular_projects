import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { DataService } from '../seriveces/data.service';
import { User } from '../models/model.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {

  arrayUsers: User[] = []; 

  constructor (private dataService: DataService, private router: Router) {}

  ngOnInit(): void {

    this.dataService.getUsers()
    .subscribe({
      next: (response: HttpResponse<User[]>) => {
        console.log(`Status Code: ${response.status}`);
        this.arrayUsers = response.body ?? [];
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Error recibido en el componente: ${error}`);
        this.arrayUsers = [];
      }
    })
  }

  ngOnDestroy(): void {

  }

  editUser(user: User): void {
    console.log(`Editar este post ${user.id}`)

    this.router.navigate(['/editUser'], { state: { user } });

  }

  deleteUser(user: User): void {

    console.log(`Eliminar este post ${user}`)

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar al usuario "${user.name}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      
      if (!result.isConfirmed) return;

      this.dataService.deleteUser(user.id)
      .subscribe({
        next: (res: HttpResponse<void>) => {

          console.log(`Status Code: ${res.status}`);
          console.log(`Response Body: ${res.body}`);

          Swal.fire('¡Eliminado!', 'El usuario ha sido borrado.', 'success');

          // Genera una nueva array solo si la funcion que se le pasa deveulve un true
          // En este caso es que el id del usuario no sea igual al que se acaba de eliminar
          this.arrayUsers = this.arrayUsers.filter(u => u.id !== user.id);
        },
        error: err => {
          Swal.fire('Error', 'No se pudo eliminar al usuario.', 'error');
          console.error(err);
        }
      })
    })

  }

}
