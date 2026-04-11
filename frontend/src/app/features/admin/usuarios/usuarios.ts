import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { FormFilter } from "../components/form-filter/form-filter";
import { UserTable } from "./components/user-table/user-table";
import { User } from "../../../shared/models/user";
import { adminService } from "../../../core/services/adminService/admin";



export interface UserFilters {
  nombre: string;
  tipo: string;
}

@Component({
  selector: 'app-usuarios',
  imports: [FormFilter, UserTable],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit {
  private adminServices = inject(adminService);
  private PAGE_SIZE = 5;

  private allUsers = signal<User[]>([]);
  private filters = signal<UserFilters>({ nombre: '', tipo: '' });


  ngOnInit(){
    this.adminServices.obtenerUsuarios().subscribe({
      next: (users) => {
        console.log("usuarios obtenidos",users);
        this.allUsers.set(users.users);
      },
      error: (err) => {
        console.log("error al obtener usuarios",err);
      },
    });
  }


  currentPage = signal(1);

  filteredUsers = computed(() => {
    const { nombre, tipo } = this.filters();
    
    return this.allUsers().filter(u => {
      const isNotAdmin = u.rol !== 'ADMIN';
      const matchesNombre =
        !nombre ||
        u.nombrePerfil.toLowerCase().includes(nombre.toLowerCase());
      const matchesTipo = !tipo || u.tipoActor === tipo;
      return matchesNombre && matchesTipo && isNotAdmin;
    });
  });


  pagedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.PAGE_SIZE;
    return this.filteredUsers().slice(start, start + this.PAGE_SIZE);
  });

 
  totalPages = computed(() =>
    Math.ceil(this.filteredUsers().length / this.PAGE_SIZE) || 1
  );


  onFiltersApplied(filters: UserFilters) {
    this.filters.set(filters); 
    this.currentPage.set(1);   
  }

  onBanUser(user: User) {
    this.adminServices.banUser(user.id).subscribe({
      next: () => {
        console.log("usuario baneado");
        this.allUsers.update(users => users.map(u => 
          u.id === user.id ? { ...u, activo: 0 } : u
        ));
      },
      error: (err) => {
        console.log("error al banear usuario",err);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}
