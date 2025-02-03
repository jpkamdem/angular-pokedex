import { Component, computed, inject, signal } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './types/pokemon';
import { PokemonBorderDirective } from './directives/pokemon-border.directive';
import { TechnosComponent } from './components/technos/technos.component';

@Component({
  selector: 'app-root',
  imports: [NavigationComponent, PokemonBorderDirective, TechnosComponent],
  providers: [PokemonService],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {}
  private readonly pokemonService = inject(PokemonService);
  pokemonList = signal(this.pokemonService.getPokemonList());
  pokemonFilteredList = computed(() =>
    this.pokemonList().filter((pokemon) =>
      pokemon.name
        .trim()
        .toLowerCase()
        .includes(this.searchInput().trim().toLowerCase())
    )
  );
  searchInput = signal('');

  size(life: number) {
    if (life > 20) {
      return 'Grand';
    }

    if (life < 10) {
      return 'Petit';
    }

    return 'Moyen';
  }

  plusLife(pokemon: Pokemon) {
    if (pokemon.life >= 45) {
      return;
    }

    pokemon.life = pokemon.life + 1;
  }

  minusLife(pokemon: Pokemon) {
    if (pokemon.life <= 5) {
      return;
    }

    pokemon.life = pokemon.life - 1;
  }
}
