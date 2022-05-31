import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  ngOnInit(): void {

  }

  @HostListener('document:click', ['$event.target'])
  @HostListener('window:keydown.escape')
  hidd(elt:any) {
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
