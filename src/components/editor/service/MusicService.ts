export class MusicService {
  private context: AudioContext = new AudioContext();
  private gainNode: GainNode;
  private buffer!: AudioBuffer;
  private source: AudioBufferSourceNode;

  constructor(arrayBuffer: ArrayBuffer) {
    const gainNode = this.context.createGain();
    gainNode.connect(this.context.destination);
    this.gainNode = gainNode;
    this.context.decodeAudioData(
      arrayBuffer,
      (buffer) => (this.buffer = buffer),
      () => {
        throw "failed loading music.";
      }
    );
    this.source = this.context.createBufferSource();
  }

  /**
   *
   * @param startTime 開始秒
   * @param duration 再生する長さ(秒)
   * @param musicVolume 音量(0-1)
   * @param musicRate 速度(0.25-2)
   */
  play(startTime: number, duration: number, musicVolume: number, musicRate: number): void {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.gainNode.gain.value = musicVolume;
    this.source.playbackRate.value = musicRate;

    const musicDuration = this.buffer.duration;
    if (musicDuration > startTime) {
      if (startTime < 0) {
        // 再生開始のみ倍速の補正が必要
        this.source.start(-(startTime / musicRate), 0, duration + startTime);
      } else this.source.start(0, startTime, duration);
    }
  }

  pause(timer?: number) {
    this.source.stop(0);
    clearTimeout(timer);
  }
}
