import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {


  @HostListener('document:click', ['$event.target'])
  @HostListener('window:keydown.escape')
  hidd(elt:any) {
    console.log(elt)
    if (elt.classList.contains('nohidd')) {
      return
    }
    let tglbtns = document.querySelectorAll('.hid-container')
    tglbtns. forEach((btn) => {
      if (!btn.contains(elt)) {
        let hidwin = btn.querySelector('.hid-element');
        hidwin ? hidwin.classList.add('hidd') : console.log('pas de truc a cacher')
      } 
    } )
  }

}
