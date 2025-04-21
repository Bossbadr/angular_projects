import { Component, ModelFunction } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { User } from '../models/model.interface';
import { CommonModule } from '@angular/common';
import { DataService } from '../seriveces/data.service';
import { Router, RouterLink } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-create-post',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

  constructor (private dataService: DataService, private route: Router) {}

  formObj: User = {
    id: null!,
    name: '',
    lastName: '',
    age: null!,
    bold: false,
  };

  dataForm(): void {
    this.dataService.addUser(this.formObj)
      .subscribe({
        next: (res: HttpResponse<User>) => {
          console.log(`Status Code: ${res.status}`);
          console.log(`Response Body: ${res.body}`);

          this.route.navigate(['/listUsers']);
        },
        error: err => {
          console.error(`Error al crear el post: ${err.message}`)
        }
      })
  }

}
