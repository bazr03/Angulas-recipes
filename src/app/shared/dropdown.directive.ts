import { Directive, Renderer2, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  private isOpen = false;
  @HostListener("click") toggleOpen() {
    let elem = this.elementRef.nativeElement.querySelector(".dropdown-menu");
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer.addClass(elem, "show");
    } else {
      this.renderer.removeClass(elem, "show");
    }
  }
}

// Cerrar dropdown desder cualquie parte, es necesario colocar el Listener en el document no en el dropdown
// export class DropdownDirective {
//     @HostBinding('class.open') isOpen = false;
//     @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
//       this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
//     }
//     constructor(private elRef: ElementRef) {}
//   }
