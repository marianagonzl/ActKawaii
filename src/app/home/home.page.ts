import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService, Item } from '../item.service'; 
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'; // Importa el servicio de autenticación
import { Router } from '@angular/router'; // Importa el enrutador
import { environment } from '../../environments/environment';  // Configuración de Firebase


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  marketItem = '';  // Definir marketItem
  itemText = ''; 
  items$: Observable<Item[]> = new Observable(); // Cambiar a Observable para Firestore
  editingItemId: string | null = null; 

  constructor(private itemService: ItemService, private router: Router, private authService: AuthService) {} 

  ngOnInit() {
    this.items$ = this.itemService.getItems(); // Obtener tareas desde Firestore
  }

  addItem() {
    if (this.marketItem.trim()) {  // Usamos marketItem aquí
      const newItem: Item = { title: this.marketItem, done: false }; // Usamos marketItem

      if (this.editingItemId) {
        this.itemService.updateItem(this.editingItemId, { title: this.marketItem }).then(() => {
          this.editingItemId = null; 
          this.marketItem = '';  // Limpiar el campo después de editar
        });
      } else {
        this.itemService.addItem(newItem).then(() => {
          this.marketItem = '';  // Limpiar el campo después de agregar
        });
      }
    }
  }

  editItem(item: Item) {
    this.marketItem = item.title;  // Rellenamos marketItem con el valor a editar
    this.editingItemId = item.id || null;
  }

  deleteItem(itemId: string) {
    this.itemService.deleteItem(itemId);  // Elimina el item basado en su ID
  }

  logout() {
    this.authService.logout(); // Llama al método de cierre de sesión en el servicio de autenticación
    this.router.navigate(['/login']); // Navega a la página de inicio de sesión
  }
}
