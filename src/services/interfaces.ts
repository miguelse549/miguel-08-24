export interface PokemonInterface {
  id: number;
  name: string;
  image?: string;
  description?: string;
  height: number;
  weight: number;
  types?: TypeInterface[];
  stats?: StatInterface[];
  cries?: { [key: string]: string };
}

export interface TypeInterface {
  type: {
    name: string;
  };
}

export interface StatInterface {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface EvolutionChainInterface {
  name: string;
  url: string;
  evolves_to?: EvolutionChainInterface[];
}
