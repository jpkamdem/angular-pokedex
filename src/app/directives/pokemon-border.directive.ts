import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../types/pokemon';

@Directive({
  selector: '[appPokemonBorder]',
})
export class PokemonBorderDirective {
  private pokemonService = inject(PokemonService);
  private initialColor: string;
  private hostElement: HTMLElement;
  @Input() pokemonBorder!: Pokemon;

  constructor(private el: ElementRef) {
    this.hostElement = this.el.nativeElement as HTMLElement;
    this.initialColor = this.hostElement.style.borderColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    const color = this.pokemonService.getTypeColor(
      this.pokemonBorder.types,
      this.initialColor
    );
    this.setBorder(color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    const color = this.initialColor;
    this.setBorder(color);
  }

  private setBorder(color: string) {
    this.hostElement.style.borderColor = color;
  }
}
