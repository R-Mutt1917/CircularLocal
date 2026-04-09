import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { FormFilter } from "./components/form-filter/form-filter";
import { UserTable } from "./components/user-table/user-table";
import { User } from "../../../shared/models/user";
import { UserServices } from "../../../core/services/userServices/user";
import { adminService } from "../../../core/services/adminService/admin";


const PAGE_SIZE = 5;

export interface UserFilters {
  nombre: string;
  tipoActor: string;
}

@Component({
  selector: 'app-usuarios',
  imports: [FormFilter, UserTable],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit {
  private userServices = inject(adminService);

  private allUsers = signal<User[]>([]);
  private filters = signal<UserFilters>({ nombre: '', tipoActor: '' });


  ngOnInit(){
    this.userServices.obtenerUsuarios().subscribe((users) => {
      console.log(users);
      this.allUsers.set(users);
    });
  }

  currentPage = signal(1);

  filteredUsers = computed(() => {
    const { nombre, tipoActor } = this.filters();
    
    return this.allUsers().filter(u => {
      const matchesNombre =
        !nombre ||
        u.nombrePerfil.toLowerCase().includes(nombre.toLowerCase());
      const matchesTipo = !tipoActor || u.tipoActor === tipoActor;
      return matchesNombre && matchesTipo;
    });
  });


  pagedUsers = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filteredUsers().slice(start, start + PAGE_SIZE);
  });

 
  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredUsers().length / PAGE_SIZE))
  );


  onFiltersApplied(filters: UserFilters) {
    this.filters.set(filters); 
    this.currentPage.set(1);   
  }

  onBanUser(user: User) {
    this.userServices.banUser(user.id).subscribe(() => {
      this.allUsers.update(users => users.filter(u => u.id !== user.id));
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}
