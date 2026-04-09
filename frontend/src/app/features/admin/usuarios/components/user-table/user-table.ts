import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../shared/models/user';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTable {
  users = input.required<User[]>();
  totalUsers = input<number>(0);
  currentPage = input<number>(1);
  totalPages = input<number>(1);

  banUser = output<User>();
  pageChange = output<number>();

  get pages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const start = Math.max(1, current - 1);
    const end = Math.min(total, start + 2);
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }
 
  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
 
  


  onBan(user: User) {
    console.log("Se hizo click usuario",user);
    if(confirm('¿Estas seguro de banear este usuario?')){
      this.banUser.emit(user);
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  }
}
