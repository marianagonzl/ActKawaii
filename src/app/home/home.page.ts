import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService, Item } from '../item.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  itemText = ''; 
  items$: Observable<Item[]> = new Observable(); // Cambiar a Observable para Firestore
  editingItemId: string | null = null; 

  constructor(private itemService: ItemService) {} 

  ngOnInit() {
    this.items$ = this.itemService.getItems(); // Obtener tareas desde Firestore
  }

  addItem() {
    if (this.itemText.trim()) {
      const newItem: Item = { title: this.itemText, done: false };

      if (this.editingItemId) {
        this.itemService.updateItem(this.editingItemId, { title: this.itemText }).then(() => {
          this.editingItemId = null; 
          this.itemText = '';
        });
      } else {
        this.itemService.addItem(newItem).then(() => {
          this.itemText = '';
        });
      }
    }
  }

  editItem(item: Item) {
    this.itemText = item.title;
    this.editingItemId = item.id || null;
  }

  deleteItem(itemId: string) {
    this.itemService.deleteItem(itemId);
  }
}