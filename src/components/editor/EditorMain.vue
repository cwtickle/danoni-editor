<template>
  <div id="canvas" ref="canvas" tabindex="-1" @keydown.prevent="keydownAction"></div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Konva from "konva";
import * as Editor from "./EditorConstant";
import { DefaultKeyConfig } from "../../model/KeyConfig";
import { ScoreData } from "../../model/ScoreData";
import { KeyKind } from "../../model/KeyKind";
import { PageScore } from "../../model/PageScore";

type DataType = {
  currentPosition: number;
  scoreData: ScoreData;
  divisor: number;
  keyKind: KeyKind;
  keyNum: number;
  page: number;
  editorWidth: number;
  stage?: Konva.Stage;
  baseLayer?: Konva.Layer;
  notesLayer?: Konva.Layer;
  currentPositionLayer?: Konva.Layer;
};

export default Vue.extend({
  name: "EditorMain",
  props: {
    pageNum: Number,
    loadScoreData: { type: Object as PropType<ScoreData> }
  },
  data(): DataType {
    return {
      currentPosition: 0,
      scoreData: this.loadScoreData,
      divisor: 24,
      keyKind: "7",
      page: 1,
      keyNum: DefaultKeyConfig["7"].num,
      editorWidth: Editor.noteWidth * DefaultKeyConfig["7"].num
    };
  },
  methods: {
    // ベースレイヤーの描画
    baseLayerDraw(): void {
      const divisor = this.divisor;
      const keyNum = this.keyNum;

      const noteWidth = Editor.noteWidth;
      const verticalSizeNum = Editor.verticalSizeNum;
      const editorWidth = this.editorWidth;
      const editorHeight = Editor.editorHeight;

      const stage = this.stage as Konva.Stage;
      const baseLayer = this.baseLayer as Konva.Layer;
      const notesLayer = this.notesLayer as Konva.Layer;
      const currentPositionLayer = this.currentPositionLayer as Konva.Layer;

      baseLayer.destroyChildren();

      // 縦罫線の描画
      for (let i = 0; i < keyNum; i++) {
        const xPos = (i + 1) * noteWidth;
        const line = new Konva.Line({
          points: [xPos, 0, xPos, editorHeight],
          stroke: "#969696",
          strokeWidth: 0.5
        });
        baseLayer.add(line);

        if (i % 2 == 1) {
          const filler = new Konva.Rect({
            x: xPos - noteWidth,
            width: noteWidth,
            height: editorHeight,
            fill: "#c3f3ff",
            strokeWidth: 0
          });
          baseLayer.add(filler);
        }
      }

      // 横罫線の描画
      for (let i = 0; i < verticalSizeNum / divisor; i++) {
        const yPos = (i + 1) * divisor;
        const line = new Konva.Line({
          points: [0, yPos, editorWidth, yPos],
          stroke: "#969696",
          strokeWidth:
            (divisor * (i + 1)) % Editor.quarterInterval == 0 ? 1 : 0.5
        });
        baseLayer.add(line);
      }

      // 枠線の描画
      const rect = new Konva.Rect({
        width: editorWidth,
        height: editorHeight,
        stroke: "black",
        strokeWidth: 1
      });
      baseLayer.add(rect);

      stage.add(baseLayer);
      stage.add(notesLayer);
      stage.add(currentPositionLayer);
    },

    // 現在位置の描画
    currentPositionDraw(): void {
      const stage = this.stage as Konva.Stage;
      const currentPositionLayer = this.currentPositionLayer as Konva.Layer;
      currentPositionLayer.destroyChildren();

      const currentPositionLine = new Konva.Line({
        y: Editor.editorHeight - this.currentPosition,
        points: [0, 0, this.editorWidth, 0],
        stroke: "#ffff00",
        strokeWidth: 1.5
      });
      currentPositionLayer.add(currentPositionLine);
      stage.add(currentPositionLayer);
    },

    // ノーツの有無の判定
    hasNote(page: number, lane: number, position: number): boolean {
      const pageScore = this.scoreData.scores[this.page - 1];
      return (
        pageScore.notes[lane].includes(position) ||
        pageScore.freezes[lane].includes(position)
      );
    },

    // ノーツの追加
    noteAdd(
      page: number,
      lane: number,
      position: number,
      isFreeze: boolean
    ): void {
      if (isFreeze)
        this.scoreData.scores[page - 1].freezes[lane].push(position);
      else this.scoreData.scores[page - 1].notes[lane].push(position);
    },

    // ノーツの削除
    noteRemove(page: number, lane: number, position: number): void {
      this.scoreData.scores[page - 1].freezes[lane] = this.scoreData.scores[
        page - 1
      ].freezes[lane].filter(pos => pos !== position);
      this.scoreData.scores[page - 1].notes[lane] = this.scoreData.scores[
        page - 1
      ].notes[lane].filter(pos => pos !== position);
    },

    // ノーツの描画
    noteDraw(lane: number, position: number, isFreeze: boolean): void {
      const stage = this.stage as Konva.Stage;
      const notesLayer = this.notesLayer as Konva.Layer;

      // Todo: 色設定作る
      const color = ((lane: number, isFreeze: boolean) => {
        if (isFreeze) {
          return lane % 2 == 0 ? "#ff4dd2" : "#00ffff";
        } else {
          return lane % 2 == 0 ? "red" : "blue";
        }
      })(lane, isFreeze);

      const note = new Konva.Rect({
        x: lane * Editor.noteWidth,
        y: Editor.editorHeight - position - Editor.noteHeight / 2,
        width: Editor.noteWidth,
        height: Editor.noteHeight,
        fill: color,
        id: `note-${lane}-${position}`
      });
      notesLayer.add(note);
      stage.add(notesLayer);
    },

    // ノーツのクリア
    noteClear(lane: number, position: number): void {
      const stage = this.stage as Konva.Stage;
      const notesLayer = this.notesLayer as Konva.Layer;

      const note = notesLayer.findOne(`#note-${lane}-${position}`);
      note.destroy();
      stage.add(notesLayer);
    },

    // 譜面データのページ反映
    displayPageScore(page: number): void {
      const stage = this.stage as Konva.Stage;
      const notesLayer = this.notesLayer as Konva.Layer;

      const pageScore = this.scoreData.scores[page - 1];

      notesLayer.destroyChildren();
      stage.add(notesLayer);

      pageScore.notes.forEach((laneArr, lane) => {
        laneArr.forEach(position => {
          this.noteDraw(lane, position, false);
        });
      });
      pageScore.freezes.forEach((laneArr, lane) => {
        laneArr.forEach(position => {
          this.noteDraw(lane, position, true);
        });
      });
    },

    // 現在位置移動
    currentPositionMove(position: number) {
      this.currentPosition = position;
      this.currentPositionDraw();
    },

    // ページ遷移
    pageMove(page: number): void {
      this.page = page;
      this.currentPositionMove(0);

      const pageScore: PageScore | undefined = this.scoreData.scores[page - 1];
      if (pageScore === undefined) {
        console.log(this.scoreData);
        this.scoreData.scores[page - 1] = {
          notes: new Array(this.keyNum).fill([]).map(() => []),
          freezes: new Array(this.keyNum).fill([]).map(() => [])
        };
      }
      this.displayPageScore(page);
    },
    pageMinus(n: number): void {
      this.$emit("page-minus", n);
      this.page < 1 + n ? (this.page = 1) : (this.page -= n);
      this.pageMove(this.page);
    },
    pagePlus(n: number): void {
      this.$emit("page-plus", n);
      this.page += n;
      this.pageMove(this.page);
    },

    // 移動間隔変更
    changeDivisor(divisor: number) {
      this.divisor = divisor;
      if (this.currentPosition % divisor !== 0) {
        this.currentPositionMove(
          Math.floor(this.currentPosition / divisor) * divisor
        );
      }
      this.baseLayerDraw();
    },

    // キーを押したときの挙動
    keydownAction(e: KeyboardEvent): void {
      console.log(e.code);

      if (e.ctrlKey) {
        switch (e.code) {
          case "Digit1":
            this.changeDivisor(Editor.quarterInterval);
            break;
          case "Digit2":
            this.changeDivisor(Editor.quarterInterval / 2);
            break;
          case "Digit3":
            this.changeDivisor(Editor.quarterInterval / 4);
            break;
          case "Digit4":
            this.changeDivisor(Editor.quarterInterval / 3);
            break;
          case "Digit5":
            this.changeDivisor(Editor.quarterInterval / 6);
            break;
          case "Digit6":
            this.changeDivisor(Editor.quarterInterval / 12);
            break;
          case "Digit7":
            this.changeDivisor(Editor.quarterInterval / 8);
            break;
        }
      } else {
        switch (e.code) {
          case "ArrowUp":
            this.currentPosition += this.divisor;
            if (this.currentPosition >= Editor.verticalSizeNum)
              this.pagePlus(1);
            else this.currentPositionMove(this.currentPosition);
            break;
          case "ArrowDown":
            this.currentPosition -= this.divisor;
            if (this.currentPosition < 0) {
              if (this.page === 1) this.currentPosition = 0;
              else this.pageMinus(1);
            } else this.currentPositionMove(this.currentPosition);
            break;
          case "ArrowLeft":
            if (e.shiftKey) this.pageMinus(5);
            else this.pageMinus(1);
            break;
          case "ArrowRight":
            if (e.shiftKey) this.pagePlus(5);
            else this.pagePlus(1);
            break;
          default: {
            const possiblyLane = DefaultKeyConfig[this.keyKind].keys.indexOf(
              e.code
            );
            const isFreeze = e.shiftKey;

            if (possiblyLane >= 0) {
              if (this.hasNote(this.page, possiblyLane, this.currentPosition)) {
                this.noteRemove(this.page, possiblyLane, this.currentPosition);
                this.noteClear(possiblyLane, this.currentPosition);
              } else {
                this.noteAdd(
                  this.page,
                  possiblyLane,
                  this.currentPosition,
                  isFreeze
                );
                this.noteDraw(possiblyLane, this.currentPosition, isFreeze);
              }

              this.currentPosition += this.divisor;
              if (this.currentPosition >= Editor.verticalSizeNum)
                this.pagePlus(1);
              else this.currentPositionMove(this.currentPosition);
              console.log(this.scoreData);
            }
            break;
          }
        }
      }
    }
  },

  mounted(): void {
    const editorHeight = Editor.editorHeight;
    const canvasMargin = Editor.canvasMargin;

    const stage = new Konva.Stage({
      x: canvasMargin,
      y: canvasMargin,
      container: "canvas",
      width: this.editorWidth + canvasMargin * 2,
      height: editorHeight + canvasMargin * 2
    });
    const baseLayer = new Konva.Layer({
      container: "baseLayer"
    });
    const currentPositionLayer = new Konva.Layer({
      container: "currentPositionLayer"
    });
    const notesLayer = new Konva.Layer({
      container: "notesLayer"
    });

    this.stage = stage;
    this.baseLayer = baseLayer;
    this.currentPositionLayer = currentPositionLayer;
    this.notesLayer = notesLayer;

    this.baseLayerDraw();
    this.currentPositionDraw();
  },

  watch: {
    pageNum(newPage: number): void {
      this.pageMove(newPage)
    },

  }
});
</script>