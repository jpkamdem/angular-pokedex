import { Injectable, signal } from '@angular/core';
import { POKEMON_LIST } from '../pokemon-list';

@Injectable()
export class PokemonService {
  constructor() {}

  private readonly pokemonList = signal(POKEMON_LIST);
  getPokemonList() {
    return this.pokemonList();
  }

  private readonly typeList = signal([
    'Plante',
    'Poison',
    'Feu',
    'Eau',
    'Insect',
    'Vol',
    'Normal',
    'Electrik',
    'Fée',
  ]);

  getTypeList() {
    return this.typeList();
  }

  getTypeColor(
    types: [string, string?, string?],
    initialColor: string
  ): string {
    let color = initialColor;

    for (const type of types) {
      if (type && this.typeList().includes(type)) {
        switch (type) {
          case 'Plante':
            return '#0fa232';
          case 'Poison':
            return '#760949';
          case 'Feu':
            return '#df0d0d';
          case 'Eau':
            return '#0d3ddf';
          case 'Insect':
            return '#9be641';
          case 'Vol':
            return '#41e6b4';
          case 'Normal':
            return '#afafaf';
          case 'Electrik':
            return '#e9e90a';
          case 'Fée':
            return '#fb8cfc';
        }
      }
    }

    return color;
  }
}
