import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { DataService } from '../seriveces/data.service';
import { User } from '../models/model.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-post-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {

  arrayUsers: User[] = []; 
  isLoading = true;


  constructor (private dataService: DataService) {}

  ngOnInit(): void {

    this.dataService.getUsers().pipe(
      finalize(()  => this.isLoading = false)
    ).subscribe({
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

  createUser(): void {
    console.log("Aqui es donde se debera crear un nuevo registro")
    
  }

  editUser(user: User): void {
    console.log(`Editar este post ${user.id}`)
  }

  deleteUser(user: User): void {

    console.log(`Eliminar este post ${user}`)
  }

}
