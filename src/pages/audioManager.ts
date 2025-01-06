// audioManager.ts
const audioInstances: HTMLAudioElement[] = [];

export const playAudio = (src: string) => {
  stopAllAudio(); // Oprește toate sunetele înainte de a reda unul nou
  const audio = new Audio(src);
  audioInstances.push(audio);
  audio.play();
};

export const stopAllAudio = () => {
  audioInstances.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0; // Resetează sunetul
  });
  audioInstances.length = 0; // Golește lista după ce toate sunetele sunt oprite
};
