import { Timing } from "@/model/Timing";
import {
  positionToFrame,
  positionToSeconds,
  secondsToTimeStr
} from "@/components/editor/helper/Calculator";

describe("Calculator", () => {
  const timing: Timing = {
    label: 1,
    startNum: 200,
    bpm: 180
  };

  it("position -> frameへの変換が出来る", () => {
    expect(positionToFrame(timing, 1, 0, 100)).toBe(300);
    expect(positionToFrame(timing, 2, 0, 0)).toBe(360);
    expect(positionToFrame(timing, 2, 192, 40)).toBe(480);
  });

  it("position -> secondsへの変換が出来る", () => {
    expect(positionToSeconds(timing, 1, 0, 100)).toBe(5);
    expect(positionToSeconds(timing, 2, 0)).toBe(6);
    expect(positionToSeconds(timing, 2, 192, 40)).toBe(8);
  });

  it("seconds -> mm:ssへの変換が出来る", () => {
    expect(secondsToTimeStr(40)).toBe("0:40");
    expect(secondsToTimeStr(64)).toBe("1:04");
    expect(secondsToTimeStr(604)).toBe("10:04");
  });
});
