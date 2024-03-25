import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalserviceService {
  isModalOpen = new Subject<boolean>();
  constructor() {}

  openModal() {
    this.isModalOpen.next(true);
  }

  closeModal() {
    const backdrop = document.querySelector('.backdrop');
    if (backdrop) {
      backdrop.remove();
      this.isModalOpen.next(false);
    }

    const modal = document.querySelector('.modal-box');
    if (modal) {
      modal.remove();
      this.isModalOpen.next(false);
    }
  }
}
