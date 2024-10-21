import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBlankComponent } from "../../components/nav-blank/nav-blank.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBlankComponent, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {

  goToUp():void {
    // window.scrollTo(0, 0);
    scrollTo(0, 0);
  }

}
