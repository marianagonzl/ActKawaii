import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item {
  id?: string;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemCollection = collection(this.firestore, 'items');

  constructor(private firestore: Firestore) { }

  getItems(): Observable<Item[]> {  
    return collectionData(this.itemCollection, { idField: 'id' }) as Observable<Item[]>;
  }

  addItem(item: Item){
    return addDoc(this.itemCollection, item);
  }

  updateItem(id: string, data: Partial<Item>){
    const itemDoc = doc(this.firestore, `items/${id}`);
    return updateDoc(itemDoc, data);
  }

  deleteItem(id: string){
    const itemDoc = doc(this.firestore, `items/${id}`);
    return deleteDoc(itemDoc);
  }


}