import { Injectable, signal } from '@angular/core';
import { POKEMON_LIST } from '../pokemon-list';

@Injectable()
export class PokemonService {
  constructor() {}

  private readonly pokemonList = signal(POKEMON_LIST);
  getPokemonList() {
    return this.pokemonList();
  }
}
