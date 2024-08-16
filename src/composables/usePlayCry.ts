export function usePlayCry() {
  const playCry = (cryUrl) => {
    try {
      const audio = new Audio(cryUrl);
      audio.play().catch((error) => {
        console.error("Error al reproducir el sonido:", error);
      });
    } catch (error) {
      console.error("No se pudo cargar el archivo de audio:", error);
    }
  };

  return {
    playCry,
  };
}
