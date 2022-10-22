import {
  Directive,
  ElementRef,
  HostListener, Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[hiaHover]',
})
export class HoverDirective implements OnInit {
  @Input() hiaHover?: string ;
  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(element.nativeElement);
  }

  ngOnInit(): void {
    //this.element.nativeElement.style.backgroundColor = this.hiaHover;
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.hiaHover
    );
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'cyan'
    );
  }@HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'white'
    );
  }
}
