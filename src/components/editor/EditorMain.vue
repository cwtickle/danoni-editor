<template>
  <div id="editor-main">
    <div
      id="canvas"
      ref="canvas"
      tabindex="-1"
      @keydown.prevent="keydownAction"
      @wheel.prevent="wheelAction"
      @mouseup.prevent="clickAction"
      @mousedown.middle.prevent=""
      @touchstart.prevent="touchStartAction"
      @touchend.prevent="touchEndAction"
      @focus="canvasFocusOrBlur(true)"
      @blur="canvasFocusOrBlur(false)"
    ></div>
    <speed-piece
      v-for="(speed, index) in scoreData.scores[page - 1]?.speeds"
      :key="index"
      v-model:speedValue.number="speed.value"
      :position="speed.position"
      :type="speed.type"
      :is-reverse="isReverse"
    ></speed-piece>
    <div id="editor-mode-text">入力間隔: {{ mode }}分 ({{ moveIntervalFrame }}F)</div>
    <div id="editor-mode-input">
      {{ isKeyboard ? "[Key]" : "" }}{{ isClick ? "[Click]" : "" }}{{ isClick && !isWheelLock ? "[Wheel]" : "" }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Konva from "konva";
import { CustomKeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";
import { CustomKeyKind } from "@/model/KeyKind";
import { PageScore, DefaultPageScore } from "@/model/PageScore";
import {
  noteWidth,
  editorHeight,
  verticalSizeNum,
  quarterInterval,
  noteColors,
  laneColors,
  canvasMarginHorizontal,
  canvasMarginVertical,
  longTapThreshold,
} from "./EditorConstant";
import { Timing } from "../../model/Timing";
import { MusicService } from "./service/MusicService";
import { Operation } from "../../model/OperationQueue";
import { NoteService } from "./service/NoteService";
import { SpeedPieceService } from "./service/SpeedPieceService";
import { PageScoreService } from "./service/PageScoreService";
import { CurrentPositionService } from "./service/CurrentPositionService";
import SpeedPiece from "./SpeedPiece.vue";
import { positionToSeconds, positionToFrame } from "./helper/Calculator";
import { undo } from "./helper/undo";
import { createCustomKeyConfig } from "../common/createCustomKeyConfig";
import toPx from "./helper/toPx";

type DataType = {
  currentPosition: number;
  scoreData: ScoreData;
  divisor: number;
  keyNum: number;
  page: number;
  editorWidth: number;
  isReverse: boolean;
  isKeyboard: boolean;
  isClick: boolean;
  isWheelLock: boolean;
  musicTimer: number | null;
  musicService?: MusicService;
  copyScoreStore: PageScore;
  operationStack: Operation[];
  currentPositionService: CurrentPositionService;
  noteService?: NoteService;
  speedPieceService?: SpeedPieceService;
  pageScoreService?: PageScoreService;
  stage?: Konva.Stage;
  baseLayer?: Konva.Layer;
  notesLayer?: Konva.Layer;
  currentPositionLayer?: Konva.Layer;
  previousPosition: number;
  previousPage: number;
  previousDate: Date;
  orderGroups: number[][];
  orderGroupNo: number;
  keysFull: string[][];
  charsFull: string[][];
  alternativeKeysFull: string[][];
  orderKeyTypes: number[];
  hasCanvasFocus: boolean;
  longTouchList: { [name: number]: { timer: number; touch: Touch } };
};

export default defineComponent({
  name: "EditorMain",
  components: { SpeedPiece },
  props: {
    pageNum: { type: Number, required: true },
    loadScoreData: { type: Object as PropType<ScoreData>, required: true },
    loadMusicUrl: { type: String, required: true },
    keyConfig: { type: Object as PropType<CustomKeyConfig>, required: true },
    keyKind: { type: String as PropType<CustomKeyKind>, required: true },
    timing: { type: Object as PropType<Timing>, required: true },
    propScoreNumber: { type: Number, required: true },
    propScorePrefix: { type: String, required: true },
    musicVolume: { type: Number, required: true },
    musicRate: { type: Number, required: true },
  },
  emits: ["changeScoreData", "page-jump", "page-minus", "page-plus"],
  data(): DataType {
    const scoreData = this.loadScoreData;
    const keyConfig = createCustomKeyConfig();
    const keyKind = this.keyKind;
    const keyNum = keyConfig[keyKind].num;
    const isReverseStr: string = localStorage.getItem("isReverse") ?? "false";
    const isReverse: boolean = JSON.parse(isReverseStr);
    const isKeyboard: boolean = JSON.parse(localStorage.getItem("isKeyboard") ?? "true");
    const isClick: boolean = JSON.parse(localStorage.getItem("isClick") ?? "false");
    const operationStack: Operation[] = [];
    const defaultOrder: number[][] = [[...Array(keyNum)].map((_, idx: number) => idx)]; // [[0], [1], ...[keyNum - 1]]
    const orderGroups: number[][] = defaultOrder.concat(keyConfig[keyKind]?.orderGroups ?? []).filter((val) => val.length > 0);
    const orderGroupMap = JSON.parse(localStorage.getItem("orderGroupMap") ?? "{}");
    const orderGroupNo: number =
      parseInt(orderGroupMap[keyKind] ?? 0) >= orderGroups.length ? 0 : parseInt(orderGroupMap[keyKind] ?? 0);

    // 対応キーの全パターンを取得
    const keysFull: string[][] = [keyConfig[keyKind].keys]
      .concat(keyConfig[keyKind]?.keysEtc ?? [])
      .filter((val) => val.length > 0);
    const alternativeKeysFull: string[][] = [keyConfig[keyKind].alternativeKeys]
      .concat(keyConfig[keyKind]?.alternativeKeysEtc ?? [])
      .filter((val) => val.length > 0);

    // 画面に表示するキーの全パターンを取得
    let charsFull: string[][] = [[]];
    const chars = keyConfig[keyKind].chars ?? [];
    const charsEtc = keyConfig[keyKind]?.charsEtc ?? [];
    if (chars.length > 0) charsFull = [chars];
    if (charsEtc.length > 0) charsFull.push(...charsEtc);

    const orderKeyTypes: number[] =
      keyConfig[keyKind]?.orderKeyTypes !== undefined ? [0].concat(keyConfig[keyKind]?.orderKeyTypes ?? []) : [0];

    return {
      currentPosition: 0,
      scoreData,
      divisor: 24,
      page: 1,
      keyNum,
      isReverse,
      isKeyboard,
      isClick,
      isWheelLock: false,
      editorWidth: noteWidth * keyConfig[keyKind].num,
      musicTimer: null,
      operationStack,
      copyScoreStore: new DefaultPageScore(keyNum),
      currentPositionService: undefined as unknown as CurrentPositionService,
      previousPosition: 0,
      previousPage: 1,
      previousDate: new Date(0),
      orderGroups,
      orderGroupNo,
      keysFull,
      charsFull,
      alternativeKeysFull,
      orderKeyTypes,
      hasCanvasFocus: false,
      longTouchList: {},
    };
  },

  computed: {
    mode(): number {
      return (quarterInterval / this.divisor) * 4;
    },

    moveIntervalFrame(): number {
      return (
        Math.round((positionToFrame(this.timing, this.page, this.divisor) - positionToFrame(this.timing, this.page, 0)) * 100) /
        100
      );
    },
  },

  watch: {
    pageNum(newPage: number): void {
      this.pageMove(newPage);
    },

    scoreData(scoreData: ScoreData): void {
      this.$emit("changeScoreData", scoreData);
    },

    propScoreNumber(scoreNumber: number) {
      this.scoreData.scoreNumber = scoreNumber;
    },

    propScorePrefix(scorePrefix: string) {
      this.scoreData.scorePrefix = scorePrefix;
    },

    musicVolume(musicVolume: number) {
      if (this.musicService) {
        this.musicService.changeVolume(musicVolume);
      }
    },

    musicRate() {
      if (this.musicService && this.musicTimer) {
        this.stopMusicLoop(this.musicTimer);
        this.playMusicLoop(this.timing);
      }
    },
  },

  async mounted() {
    const stage = new Konva.Stage({
      x: canvasMarginHorizontal,
      y: canvasMarginVertical,
      container: "canvas",
      width: this.editorWidth + canvasMarginHorizontal * 2,
      height: editorHeight + canvasMarginVertical * 2,
    });
    const baseLayer = new Konva.Layer({
      container: "baseLayer",
    });
    const currentPositionLayer = new Konva.Layer({
      container: "currentPositionLayer",
    });
    const notesLayer = new Konva.Layer({
      container: "notesLayer",
    });

    this.stage = stage;
    this.baseLayer = baseLayer;
    this.currentPositionLayer = currentPositionLayer;
    this.notesLayer = notesLayer;

    if (this.loadMusicUrl) {
      fetch(this.loadMusicUrl)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          this.musicService = new MusicService(buffer);
        });
    }

    this.noteService = new NoteService(
      this.scoreData,
      this.keyConfig,
      this.keyKind,
      this.isReverse,
      stage,
      notesLayer,
      this.operationStack
    );

    this.speedPieceService = new SpeedPieceService(this.scoreData, this.editorWidth, this.isReverse, stage, notesLayer);

    this.pageScoreService = new PageScoreService(
      this.scoreData,
      this.copyScoreStore,
      this.keyNum,
      this.displayPageScore,
      this.operationStack
    );

    this.currentPositionService = new CurrentPositionService(
      this.scoreData,
      this.editorWidth,
      this.isReverse,
      stage,
      currentPositionLayer,
      (position) => (this.currentPosition = position)
    );

    this.baseLayerDraw();
    this.currentPositionService.draw(0, 1, this.timing);
    this.pageMove(1);
    this.displayPageScore(1);

    // オートフォーカス
    if (this.$refs.canvas instanceof HTMLElement) this.$refs.canvas.focus();
  },

  beforeUnmount(): void {
    // 画面終了時に音楽を止める
    if (this.musicTimer) this.stopMusicLoop(this.musicTimer);
    this.clearLongTouchList();
  },
  methods: {
    // ベースレイヤーの描画
    baseLayerDraw(): void {
      const divisor = this.divisor;
      const keyNum = this.keyNum;
      const editorWidth = this.editorWidth;
      const pageBlockNum = this.timing.pageBlockNum || 8;

      const stage = this.stage as Konva.Stage;
      const baseLayer = this.baseLayer as Konva.Layer;
      const notesLayer = this.notesLayer as Konva.Layer;
      const currentPositionLayer = this.currentPositionLayer as Konva.Layer;

      baseLayer.destroyChildren();

      // 縦罫線の描画
      const orderGroup: number[] = this.orderGroups[this.orderGroupNo];
      const orderKeyType: number = this.orderKeyTypes[this.orderGroupNo] ?? 0;
      for (let lane = 0; lane < keyNum; lane++) {
        const convLane = orderGroup[lane];
        const xPos = (lane + 1) * noteWidth;

        const colorGroup = this.keyConfig[this.keyKind].colorGroup;
        const color = laneColors[colorGroup[convLane]];

        const filler = new Konva.Rect({
          x: xPos - noteWidth,
          width: noteWidth,
          height: editorHeight,
          fill: color,
          strokeWidth: 0,
        });
        baseLayer.add(filler);

        const line = new Konva.Line({
          points: [xPos, 0, xPos, editorHeight],
          stroke: "#969696",
          strokeWidth: 0.5,
        });
        baseLayer.add(line);
      }

      // 横罫線の描画
      for (let i = 0; i < verticalSizeNum(pageBlockNum) / divisor; i++) {
        const yPos = toPx((i + 1) * divisor, this.isReverse);
        const line = new Konva.Line({
          points: [0, yPos, editorWidth, yPos],
          stroke: "#969696",
          strokeWidth: (divisor * (i + 1)) % quarterInterval == 0 ? 1 : 0.5,
        });
        baseLayer.add(line);
      }

      // 不使用部分の背景色変更
      if (pageBlockNum != 8) {
        const mask = new Konva.Rect({
          x: 0,
          y: this.isReverse ? verticalSizeNum(pageBlockNum) : 0,
          width: editorWidth,
          height: editorHeight - verticalSizeNum(pageBlockNum),
          fill: "#D8D8D8",
          strokeWidth: 0,
        });
        baseLayer.add(mask);

        const ypos = toPx(verticalSizeNum(pageBlockNum), this.isReverse);
        const maxLine = new Konva.Line({
          points: [0, ypos, editorWidth, ypos],
          stroke: "black",
          strokeWidth: 1,
        });
        baseLayer.add(maxLine);
      }

      // 枠線の描画
      const rect = new Konva.Rect({
        width: editorWidth,
        height: editorHeight,
        stroke: this.hasCanvasFocus ? "#333333" : "#cccccc",
        strokeWidth: 1,
        fill: this.hasCanvasFocus ? "#00000000" : "#cccccc33",
      });
      baseLayer.add(rect);

      // 入力キーの表示
      for (let lane = 0; lane < keyNum; lane++) {
        const convLane = orderGroup[lane];
        const xPos = (lane + 1) * noteWidth;

        const keyConfig = this.keyConfig[this.keyKind];
        const colorGroup = keyConfig.colorGroup;
        const color = noteColors[colorGroup[convLane]];

        const chars = this.charsFull[orderKeyType];

        if (chars) {
          const charStr = chars[convLane];

          const keyText = new Konva.Text({
            x: xPos - noteWidth,
            y: editorHeight + 5,
            width: noteWidth,
            align: "center",
            verticalAlign: "middle",
            text: charStr,
            fontSize: 11,
            fill: color,
          });
          baseLayer.add(keyText);
        }
      }

      stage.add(baseLayer);
      stage.add(notesLayer);
      stage.add(currentPositionLayer);
    },

    // 音楽再生処理
    playMusicLoop(timing: Timing) {
      if (!this.musicService || !this.musicService.canPlay) return;

      const pageBlockNum = this.timing.pageBlockNum || 8;

      const startPosition = -quarterInterval * 2;
      const endPosition = verticalSizeNum(pageBlockNum);
      const startTime = positionToSeconds(timing, this.page, startPosition);
      const endTime = positionToSeconds(timing, this.page, endPosition);

      const loop = (startTime: number, endTime: number) => {
        const playDuration = ((endTime - startTime) * 1000) / this.musicRate;
        if (!this.musicService) return;
        this.musicService.play(startTime, endTime - startTime, this.musicVolume, this.musicRate);
        this.currentPositionService.musicAnimate(playDuration, pageBlockNum);
        if (this.musicTimer) {
          const timer: number = window.setTimeout(() => {
            if (this.musicService) this.musicService.pause();
            loop(startTime, endTime);
          }, playDuration);
          this.musicTimer = timer;
        }
      };

      this.musicTimer = 1;
      loop(startTime, endTime);
    },

    // 音楽停止処理
    stopMusicLoop(timer: number) {
      const stage = this.stage as Konva.Stage;
      const currentPositionLayer = this.currentPositionLayer as Konva.Layer;
      const node = currentPositionLayer.findOne("#musicPosition");
      node?.destroy();
      stage.add(currentPositionLayer);

      if (this.musicService) this.musicService.pause(timer);
      this.musicTimer = null;
    },

    // 譜面データのページ反映
    displayPageScore(page: number): void {
      const stage = this.stage as Konva.Stage;
      const notesLayer = this.notesLayer as Konva.Layer;
      const noteService = this.noteService as NoteService;
      const speedPieceService = this.speedPieceService as SpeedPieceService;

      const pageScore = this.scoreData.scores[page - 1];

      notesLayer.destroyChildren();
      stage.add(notesLayer);

      this.baseLayerDraw();

      const orderGroup: number[] = this.orderGroups[this.orderGroupNo];

      pageScore.notes.forEach((laneArr, lane) => {
        const orgLane = orderGroup.indexOf(lane);
        laneArr.forEach((position) => {
          noteService.draw(lane, position, false, orgLane);
        });
      });
      pageScore.freezes.forEach((laneArr, lane) => {
        const orgLane = orderGroup.indexOf(lane);
        laneArr.forEach((position) => {
          noteService.draw(lane, position, true, orgLane);
        });
        noteService.fillFreeze(this.page, lane, orgLane, this.timing.pageBlockNum || 8);
      });
      pageScore.speeds.forEach((speed) => {
        speedPieceService.draw(speed.position, speed.type);
      });
    },

    // ページ遷移
    pageMove(page: number): void {
      this.page = page;
      this.$emit("page-jump", page);

      // 今いるページ + 1までの範囲でemptyのページを初期化する
      if (!this.scoreData.scores[page]) this.scoreData.scores.length = page + 1;
      this.scoreData.scores = [...this.scoreData.scores].map((pageScore) => {
        if (!pageScore) return new DefaultPageScore(this.keyNum);
        else return pageScore;
      });
      this.displayPageScore(page);

      // 音楽再生時に移動すると再生位置を変更する
      if (this.musicTimer) {
        this.stopMusicLoop(this.musicTimer);
        this.playMusicLoop(this.timing);
      }
      this.clearLongTouchList();
      this.currentPositionService.draw(this.currentPosition, page, this.timing);
    },
    pageMinus(n: number, position = 0): void {
      this.$emit("page-minus", n);
      this.clearLongTouchList();
      this.currentPositionService.move(position, this.page, this.timing);
    },
    pagePlus(n: number): void {
      this.$emit("page-plus", n);
      this.clearLongTouchList();
      this.currentPositionService.move(0, this.page, this.timing);
    },

    // 移動間隔変更
    changeDivisor(divisor: number) {
      this.divisor = divisor;
      if (this.currentPosition % divisor !== 0) {
        this.currentPositionService.move(Math.floor(this.currentPosition / divisor) * divisor, this.page, this.timing);
      }
      this.baseLayerDraw();
    },

    // 現在位置の上下移動
    currentPositionIncrease(withThreshold: boolean) {
      const threshold: number = JSON.parse(localStorage.getItem("simultaneousThreshold") ?? "30");
      const pageBlockNum = this.timing.pageBlockNum || 8;
      if (this.currentPosition + this.divisor >= verticalSizeNum(pageBlockNum)) {
        if (withThreshold) window.setTimeout(() => this.pagePlus(1), threshold);
        else this.pagePlus(1);
      } else {
        this.currentPositionService.move(this.currentPosition + this.divisor, this.page, this.timing);
      }
    },

    currentPositionDecrease() {
      const pageBlockNum = this.timing.pageBlockNum || 8;
      this.currentPosition -= this.divisor;
      if (this.currentPosition < 0) {
        if (this.page === 1) this.currentPosition = 0;
        else this.pageMinus(1, this.currentPosition + verticalSizeNum(pageBlockNum));
      } else this.currentPositionService.move(this.currentPosition, this.page, this.timing);
    },

    // 音楽の再生/停止
    togglePlay(): void {
      if (!this.musicTimer) {
        const timing = this.timing;
        this.playMusicLoop(timing);
      } else {
        const timer = this.musicTimer;
        this.stopMusicLoop(timer);
      }
    },

    // 表示切替
    switchView(multi: number = 1): void {
      this.orderGroupNo = (this.orderGroupNo + this.orderGroups.length + multi) % this.orderGroups.length;
      const orderGroupMap = JSON.parse(localStorage.getItem("orderGroupMap") ?? "{}");
      orderGroupMap[this.keyKind] = this.orderGroupNo.toString();
      localStorage.setItem("orderGroupMap", JSON.stringify(orderGroupMap));
      this.baseLayerDraw();
      this.pageMove(this.page);
      this.displayPageScore(this.page);
    },

    // キーを押したときの挙動
    keydownAction(e: KeyboardEvent): void {
      const noteService = this.noteService as NoteService;
      const speedPieceService = this.speedPieceService as SpeedPieceService;
      const pageScoreService = this.pageScoreService as PageScoreService;

      const page = this.page;
      const currentPosition = this.currentPosition;
      const divisor = this.divisor;
      const pageBlockNum = this.timing.pageBlockNum || 8;

      const positionLineMove = (isRaise: boolean) => {
        return isRaise === this.isReverse ? this.currentPositionDecrease : () => this.currentPositionIncrease(false);
      };

      const mustCtrlAction = (e: KeyboardEvent) => {
        switch (e.code) {
          case "KeyX":
            if (e.shiftKey) pageScoreService.delete(page);
            else pageScoreService.cut(page);
            break;
          case "KeyC":
            pageScoreService.copy(page);
            break;
          case "KeyV":
            if (e.shiftKey) pageScoreService.add(page);
            else pageScoreService.paste(page);
            break;
          case "KeyZ": {
            const { undoPage, undoPosition } = undo(this.operationStack, noteService, pageScoreService);
            const targetPage = undoPage != undefined ? undoPage : page;
            const targetPosition = undoPosition != undefined ? undoPosition : currentPosition;
            this.pageMove(targetPage);
            this.currentPositionService.move(targetPosition, targetPage, this.timing);
            this.displayPageScore(targetPage);
            break;
          }
          case "ArrowUp": {
            const delta = this.isReverse ? -divisor : divisor;
            noteService.shift(page, currentPosition, delta, pageBlockNum);
            positionLineMove(true)();
            this.displayPageScore(this.page);
            break;
          }
          case "ArrowDown": {
            const delta = this.isReverse ? divisor : -divisor;
            noteService.shift(page, currentPosition, delta, pageBlockNum);
            positionLineMove(false)();
            this.displayPageScore(this.page);
            break;
          }
          case "KeyQ": {
            this.switchView();
            break;
          }
          case "Comma": {
            this.isKeyboard = !this.isKeyboard;
            localStorage.setItem("isKeyboard", JSON.stringify(this.isKeyboard));
            break;
          }
          case "Period": {
            this.isClick = !this.isClick;
            localStorage.setItem("isClick", JSON.stringify(this.isClick));
            break;
          }
          case "Slash": {
            this.isWheelLock = !this.isWheelLock;
            break;
          }
        }
      };

      const withCtrlAction = (e: KeyboardEvent) => {
        if (e.code == "Digit1" || e.code == "Numpad1") this.changeDivisor(quarterInterval);
        else if (e.code == "Digit2" || e.code == "Numpad2") this.changeDivisor(quarterInterval / 2);
        else if (e.code == "Digit3" || e.code == "Numpad3") this.changeDivisor(quarterInterval / 4);
        else if (e.code == "Digit4" || e.code == "Numpad4") this.changeDivisor(quarterInterval / 3);
        else if (e.code == "Digit5" || e.code == "Numpad5") this.changeDivisor(quarterInterval / 6);
        else if (e.code == "Digit6" || e.code == "Numpad6") this.changeDivisor(quarterInterval / 12);
        else if (e.code == "Digit7" || e.code == "Numpad7") this.changeDivisor(quarterInterval / 8);
      };

      if (e.ctrlKey) {
        mustCtrlAction(e);
        withCtrlAction(e);
      } else {
        switch (e.code) {
          case "Enter":
            this.togglePlay();
            break;
          case "Backspace":
            noteService.removeOnPosition(this.page, this.currentPosition);
            this.displayPageScore(this.page);
            break;
          case "Space": // 通常、リバースともに正方向に進む
            this.currentPositionIncrease(false);
            break;
          case "ArrowUp":
            positionLineMove(true)();
            break;
          case "KeyB": // 通常、リバースともに負方向に進む
            this.currentPositionDecrease();
            break;
          case "ArrowDown":
            positionLineMove(false)();
            break;
          case "ArrowLeft":
            if (e.shiftKey) this.pageMinus(5);
            else this.pageMinus(1);
            break;
          case "ArrowRight":
            if (e.shiftKey) this.pagePlus(5);
            else this.pagePlus(1);
            break;
          case "Quote":
            speedPieceService.switchOne(this.page, this.currentPosition, e.shiftKey);
            break;
          case "":
            break; // 右シフトキーでcodeが""となり、ノーツが入力される問題の対策

          default: {
            const orderKeyType: number = this.orderKeyTypes[this.orderGroupNo] ?? 0;
            const possiblyLane = Math.max(
              this.keysFull[orderKeyType].indexOf(e.code),
              this.alternativeKeysFull[orderKeyType].indexOf(e.code)
            );
            const isFreeze = e.shiftKey;

            let page = this.page;
            let position = this.currentPosition;
            let isSimultaneous = false;

            const orderGroup: number[] = this.orderGroups[this.orderGroupNo];
            const orgLane: number = orderGroup.indexOf(possiblyLane);
            if (possiblyLane >= 0 && this.isKeyboard) {
              // 一定時間内に押されたときは直前の位置にノートを追加/削除する
              const now = new Date();
              const threshold: number = JSON.parse(localStorage.getItem("simultaneousThreshold") ?? "30");

              if (now.getTime() - this.previousDate.getTime() <= threshold) {
                page = this.previousPage;
                position = this.previousPosition;
                isSimultaneous = true;
              } else {
                this.previousDate = now;
              }

              // ノートの追加/削除
              noteService.switchOne(page, this.page, possiblyLane, position, isFreeze, orgLane, pageBlockNum);

              // 同時押しのときはカーソルを進めない
              if (!isSimultaneous) {
                this.currentPositionIncrease(false);
                this.previousPage = page;
                this.previousPosition = position;
              }
            } else {
              withCtrlAction(e);
            }
            break;
          }
        }
      }
    },

    // フォーカス時の処理（枠線変更）
    canvasFocusOrBlur(focusFlg: boolean = false): void {
      window.setTimeout(() => {
        this.hasCanvasFocus = focusFlg;
        this.baseLayerDraw();
      }, 100);
    },

    // タッチ開始時
    touchStartAction(e: TouchEvent): void {
      if (!this.isClick) return;
      Array.from(e.changedTouches).forEach((touch) => {
        // 一定時間後に長押しとして処理する
        const timer: number = window.setTimeout(() => {
          this.tapAction(touch, true);
          delete this.longTouchList[touch.identifier];
        }, longTapThreshold);
        this.longTouchList[touch.identifier] = { touch, timer };
      });
    },

    // タッチ終了時
    touchEndAction(e: TouchEvent): void {
      if (!this.isClick) return;
      Array.from(e.changedTouches).forEach((touch) => {
        // リストに残っている(長押しとして処理されていない)ものは通常タップとして処理
        const start = this.longTouchList[touch.identifier];
        if (start) {
          window.clearTimeout(start.timer);
          this.tapAction(start.touch, false);
          delete this.longTouchList[touch.identifier];
        }
      });
    },

    // 長押しリストとタイマーのクリア
    clearLongTouchList(): void {
      Object.values(this.longTouchList).forEach((value) => {
        window.clearTimeout(value.timer);
      });
      this.longTouchList = {};
    },

    // タップ時の処理
    // TouchEventはoffsetX,Yが無いためclientX,Yから計算
    tapAction(touch: Touch, longTap: boolean): void {
      if (touch.target === null) return;
      const target = touch.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const offsetX: number = touch.clientX - rect.x;
      const offsetY: number = touch.clientY - rect.y;
      this.clickTapAction(offsetX, offsetY, longTap);
    },

    // クリック時の処理（左クリックでノート、ホイールボタンでフリーズノート）
    clickAction(e: MouseEvent): void {
      if (!this.isClick || e.button >= 2) return;
      if (this.hasCanvasFocus) {
        this.clickTapAction(e.offsetX, e.offsetY, e.shiftKey || e.button === 1);
      }
    },

    // マウスホイール移動時の処理
    wheelAction(e: WheelEvent): void {
      if (!this.isClick || this.isWheelLock) return;
      const positionLineMove = (isRaise: boolean) => {
        return isRaise === this.isReverse ? this.currentPositionDecrease : () => this.currentPositionIncrease(false);
      };
      if (e.deltaY > 0) positionLineMove(false)();
      else if (e.deltaY < 0) positionLineMove(true)();
    },

    // クリック/タップ時の処理
    clickTapAction(offsetX: number, offsetY: number, shiftKey: boolean): void {
      const possiblyLane: number = (offsetX - canvasMarginHorizontal) / noteWidth;
      const lane: number = Math.floor(possiblyLane);
      const orderGroup: number[] = this.orderGroups[this.orderGroupNo];
      const convLane: number = orderGroup[lane];
      const y: number = this.isReverse ? offsetY - canvasMarginVertical : editorHeight - (offsetY - canvasMarginVertical);
      const position: number = Math.floor((y * verticalSizeNum()) / editorHeight / this.divisor + 0.5) * this.divisor;
      const pageBlockNum = this.timing.pageBlockNum || 8;

      if (position >= 0 && position < verticalSizeNum()) {
        if (possiblyLane >= 0 && possiblyLane < this.keyNum) {
          // ノートの追加/削除
          this.noteService?.switchOne(this.page, this.page, convLane, position, shiftKey, lane, pageBlockNum);
        } else if (possiblyLane >= this.keyNum && possiblyLane < this.keyNum + 0.75) {
          // 速度変化の追加/削除
          this.speedPieceService?.switchOne(this.page, position, shiftKey);
        }
        // カーソルの移動
        if (possiblyLane < this.keyNum + 0.75) {
          this.currentPosition = position;
          this.currentPositionService.move(this.currentPosition, this.page, this.timing);
        }
      }
    },
  },
});
</script>
