import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { DataService } from '../seriveces/data.service';
import { User } from '../models/model.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  filterForm!: FormGroup;
  allUsers: User[] = [];       // usuarios sin filtrar
  displayedUsers: User[] = []; // usuarios que se pintan en la plantilla

  constructor (private dataService: DataService, private router: Router, private formbuilder: FormBuilder) {
    this.initiateForm();
  }

  ngOnInit(): void {

    // 1) Cargo los usuarios una sola vez
    this.dataService.getUsers().subscribe({
      next: (response: HttpResponse<User[]>) => {
        this.allUsers = response.body ?? [];
        this.displayedUsers = [...this.allUsers];
      },
      error: () => {
        this.allUsers = [];
        this.displayedUsers = [];
      }
    });

    // Cuando utilizas el valueChanges te cambia la visualizacion de forma automatica sin
    // tener que clickar al boton de filtrar
    this.filterForm.valueChanges
      .pipe(debounceTime(200))   // para no disparar filtro en cada pulsación
      .subscribe(() => this.filterUser());

  }

  initiateForm() {
    this.filterForm = this.formbuilder.group({
      name: [''],
      bold: [''],
      ageMin: [null],
      ageMax: [null]
    })
  }

  filterUser(){

    const { name, bold, ageMin, ageMax } = this.filterForm.value;

    this.displayedUsers = this.allUsers.filter(user => {

        let matches = true;

        // Filtro para el nombre:
        if (name && name.trim() !== '') { // Compramos el nombre y el nombre sin espacios con el trim()
            matches = matches
            && user.name.toLowerCase()
            .includes(name.trim().toLowerCase());
        }
        
        // Filtro para el bold:
        if (bold && bold !== '') {
          matches = matches && String(user.bold) === String(bold);
        }

        // Filtro para la edad
        if (ageMin != null && ageMax != null) {
          matches = matches && user.age >= ageMin && user.age <= ageMax;
        }
        
        return matches;

    });
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
          this.displayedUsers = this.displayedUsers.filter(u => u.id !== user.id);
        },
        error: err => {
          Swal.fire('Error', 'No se pudo eliminar al usuario.', 'error');
          console.error(err);
        }
      })
    })

  }

}

