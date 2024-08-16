export function useStats() {
  const scaleStat = (statValue) => {
    return Math.round((statValue / 200) * 100);
  };

  return {
    scaleStat,
  };
}
