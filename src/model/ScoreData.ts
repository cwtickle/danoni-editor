import { Timing } from "./Timing";
import { PageScore, DefaultPageScore } from "./PageScore";

export interface ScoreData {
  blankFrame: number;
  timings: Timing[];
  scoreNumber?: number;
  scores: PageScore[];
}

export class DefaultScoreData implements ScoreData {
  constructor(private keyNum: number) {}

  blankFrame = 200;

  timings: Timing[] = [
    {
      label: 1,
      startNum: 0,
      bpm: 140
    }
  ];

  scoreNumber = 1;

  scores: PageScore[] = [new DefaultPageScore(this.keyNum)];
}
