import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _isOpen = signal(false);

  public readonly isOpen = this._isOpen.asReadonly();

  open() {
    this._isOpen.set(true);
  }

  close() {
    this._isOpen.set(false);
  }

  toggle() {
    this._isOpen.update(open => !open);
  }
}
