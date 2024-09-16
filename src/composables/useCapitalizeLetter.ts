export function useCapitalizeFirstLetter() {
  const words = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return { words };
}
