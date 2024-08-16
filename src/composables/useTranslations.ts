// Composable para manejar traducciones
export function useTranslations() {
  const cryTranslations = {
    latest: "Último",
    legacy: "Legado",
  };

  const statTranslations = {
    hp: "Salud",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "Ataque Especial",
    "special-defense": "Defensa Especial",
    speed: "Velocidad",
  };

  const translateCryKey = (cryKey) => {
    return cryTranslations[cryKey] || cryKey;
  };

  const translateStatKey = (statKey) => {
    return statTranslations[statKey] || statKey;
  };

  return {
    translateCryKey,
    translateStatKey,
  };
}
