(function(t){function e(e){for(var i,n,o=e[0],d=e[1],u=e[2],f=0,l=[];f<o.length;f++)n=o[f],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&l.push(r[n][0]),r[n]=0;for(i in d)Object.prototype.hasOwnProperty.call(d,i)&&(t[i]=d[i]);c&&c(e);while(l.length)l.shift()();return s.push.apply(s,u||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],i=!0,o=1;o<a.length;o++){var d=a[o];0!==r[d]&&(i=!1)}i&&(s.splice(e--,1),t=n(n.s=a[0]))}return t}var i={},r={app:0},s=[];function n(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=i,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(a,i,function(e){return t[e]}.bind(null,i));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],d=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var c=d;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},cd49:function(t,e,a){"use strict";a.r(e);var i=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("router-view")],1)},s=[],n=i["a"].extend({name:"App"}),o=n,d=a("2877"),u=Object(d["a"])(o,r,s,!1,null,null,null),c=u.exports,f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"editor"}},[a("editor-controller",{attrs:{"selected-key":t.selectedKey,"load-score-data-str":t.loadScoreDataStr,"load-music-url":t.loadMusicUrl}})],1)},l=[],p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"editor-controller"}},[a("editor-main",{attrs:{"page-num":t.pageNum,"load-score-data":t.scoreData,"load-music-url":t.loadMusicUrl,"selected-key":t.keyKind,timing:t.timing},on:{"page-minus":t.pageMinus,"page-plus":t.pagePlus}}),a("div",{attrs:{id:"editor-menu"}},[a("div",{staticClass:"menu-item-container",attrs:{id:"menu-page"}},[a("div",{staticClass:"menu-txt"},[t._v("Page")]),a("div",{staticClass:"menu-move-display"},[a("div",{staticClass:"menu-move-btn",on:{click:function(e){return t.pageMinus(5)}}},[t._v("◁")]),a("div",{staticClass:"menu-move-btn",on:{click:function(e){return t.pageMinus(1)}}},[t._v("◁")]),a("div",{staticClass:"menu-move-txt"},[t._v(t._s(t.pageNum))]),a("div",{staticClass:"menu-move-btn",on:{click:function(e){return t.pagePlus(1)}}},[t._v("▷")]),a("div",{staticClass:"menu-move-btn",on:{click:function(e){return t.pagePlus(5)}}},[t._v("▷")])])]),a("div",{staticClass:"menu-item-container",attrs:{id:"menu-label"}},[a("div",{attrs:{id:"menu-move-header"}},[a("div",{staticClass:"menu-txt"},[t._v("Label")]),a("input",{ref:"label-checkbox",staticClass:"uk-checkbox",attrs:{id:"menu-label-checkbox",type:"checkbox",disabled:1===t.pageNum},domProps:{checked:-1!==t.getLabelNumByPageNum(t.pageNum)},on:{click:t.callLabelOperation}})]),a("div",{staticClass:"menu-move-display"},[a("div",{staticClass:"menu-move-btn",on:{click:function(e){return t.labelMinus(5)}}},[t._v("◁")]),a("div",{staticClass:"menu-move-btn",on:{click:function(e){return t.labelMinus(1)}}},[t._v("◁")]),a("div",{staticClass:"menu-move-txt"},[t._v(t._s(t.labelNum))]),a("div",{staticClass:"menu-move-btn",on:{click:function(e){return t.labelPlus(1)}}},[t._v("▷")]),a("div",{staticClass:"menu-move-btn",on:{click:function(e){return t.labelPlus(5)}}},[t._v("▷")])])]),a("div",{staticClass:"menu-item-container",attrs:{id:"menu-fn"}},[a("div",{staticClass:"menu-txt"},[t._v("First Number")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.timing.firstNum,expression:"timing.firstNum"}],staticClass:"uk-input uk-form-small",attrs:{type:"number",step:"0.01"},domProps:{value:t.timing.firstNum},on:{input:function(e){e.target.composing||t.$set(t.timing,"firstNum",e.target.value)}}})]),a("div",{staticClass:"menu-item-container",attrs:{id:"menu-bpm"}},[a("div",{staticClass:"menu-txt"},[t._v("BPM")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.timing.bpm,expression:"timing.bpm"}],staticClass:"uk-input uk-form-small",attrs:{type:"number",step:"0.01"},domProps:{value:t.timing.bpm},on:{input:function(e){e.target.composing||t.$set(t.timing,"bpm",e.target.value)}}})]),a("div",{staticClass:"menu-item-container",attrs:{id:"menu-output"}},[a("div",{staticClass:"menu-output-btn btn-red",on:{click:t.convert}},[t._v("GO")]),a("div",{staticClass:"menu-output-btn btn-blue",on:{click:t.save}},[t._v("SAVE")])])])],1)},h=[],_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"editor-main"}},[a("div",{ref:"canvas",attrs:{id:"canvas",tabindex:"-1"},on:{keydown:function(e){return e.preventDefault(),t.keydownAction(e)}}}),t._l(t.scoreData.scores[t.page-1].speeds,(function(e,i){return a("speed-piece",{key:i,attrs:{position:e.position,type:e.type},model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"speed.value"}})}))],2)},y=[],m=a("9ab4"),g=a("362d"),v=a.n(g),K={5:{id:1,num:5,keys:["KeyJ","KeyK","KeyI","KeyL","KeyG"],alternativeKeys:["KeyS","KeyD","KeyE","KeyF","KeyH"],noteNames:["left_data","down_data","up_data","right_data","space_data"],freezeNames:["frzLeft_data","frzDown_data","frzUp_data","frzRight_data","frzSpace_data"],colorGroup:[0,0,0,0,2]},7:{id:2,num:7,keys:["KeyS","KeyD","KeyF","KeyG","KeyJ","KeyK","KeyL"],alternativeKeys:["","","","KeyH","","",""],noteNames:["left_data","leftdia_data","down_data","space_data","up_data","rightdia_data","right_data"],freezeNames:["frzLeft_data","frzLdia_data","frzDown_data","frzSpace_data","frzUp_data","frzRdia_data","frzRight_data"],colorGroup:[0,1,0,2,0,1,0]},"7i":{id:3,num:7,keys:["KeyS","KeyD","KeyF","KeyJ","KeyK","KeyI","KeyL"],alternativeKeys:["KeyZ","KeyX","KeyC","","","KeyO",""],noteNames:["left_data","leftdia_data","down_data","space_data","up_data","rightdia_data","right_data"],freezeNames:["frzLeft_data","frzLdia_data","frzDown_data","frzSpace_data","frzUp_data","frzRdia_data","frzRight_data"],colorGroup:[1,1,1,0,0,0,0]},8:{id:4,num:8,keys:["KeyS","KeyD","KeyF","KeyG","KeyJ","KeyK","KeyL","Semicolon"],alternativeKeys:["","","","KeyH","","","",""],noteNames:["left_data","leftdia_data","down_data","space_data","up_data","rightdia_data","right_data","sleft_data"],freezeNames:["frzLeft_data","frzLdia_data","frzDown_data","frzSpace_data","frzUp_data","frzRdia_data","frzRight_data","sfrzLeft_data"],colorGroup:[0,1,0,2,0,1,0,2]},"9A":{id:5,num:9,keys:["KeyS","KeyD","KeyE","KeyF","KeyG","KeyJ","KeyK","KeyI","KeyL"],alternativeKeys:["","","KeyR","","KeyH","","","KeyO",""],noteNames:["left_data","down_data","up_data","right_data","space_data","sleft_data","sdown_data","sup_data","sright_data"],freezeNames:["frzLeft_data","frzDown_data","frzUp_data","frzRight_data","frzSpace_data","sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data"],colorGroup:[0,0,0,0,2,1,1,1,1]},"9B":{id:6,num:9,keys:["KeyA","KeyS","KeyD","KeyF","KeyG","KeyJ","KeyK","KeyL","Semicolon"],alternativeKeys:["","","","","KeyH","","","",""],noteNames:["left_data","down_data","up_data","right_data","space_data","sleft_data","sdown_data","sup_data","sright_data"],freezeNames:["frzLeft_data","frzDown_data","frzUp_data","frzRight_data","frzSpace_data","sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data"],colorGroup:[1,0,1,0,2,0,1,0,1]},"9i":{id:7,num:9,keys:["KeyA","KeyS","KeyD","KeyF","KeyG","KeyJ","KeyK","KeyI","KeyL"],alternativeKeys:["","","","","KeyH","","","KeyO",""],noteNames:["left_data","down_data","up_data","right_data","space_data","sleft_data","sdown_data","sup_data","sright_data"],freezeNames:["frzLeft_data","frzDown_data","frzUp_data","frzRight_data","frzSpace_data","sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data"],colorGroup:[1,0,1,0,2,3,3,3,3]},11:{id:8,num:11,keys:["KeyS","KeyD","KeyF","KeyG","KeyJ","KeyK","KeyL","KeyU","KeyI","Digit8","KeyO"],alternativeKeys:["","","","KeyH","","","","","","Digit9",""],noteNames:["left_data","leftdia_data","down_data","space_data","up_data","rightdia_data","right_data","sleft_data","sdown_data","sup_data","sright_data"],freezeNames:["frzLeft_data","frzLdia_data","frzDown_data","frzSpace_data","frzUp_data","frzRdia_data","frzRight_data","sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data"],colorGroup:[0,1,0,2,0,1,0,3,3,3,3]},"11L":{id:9,num:11,keys:["KeyW","KeyE","Digit3","KeyR","KeyS","KeyD","KeyF","KeyG","KeyJ","KeyK","KeyL"],alternativeKeys:["","","Digit4","","","","","KeyH","","",""],noteNames:["sleft_data","sdown_data","sup_data","sright_data","left_data","leftdia_data","down_data","space_data","up_data","rightdia_data","right_data"],freezeNames:["sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data","frzLeft_data","frzLdia_data","frzDown_data","frzSpace_data","frzUp_data","frzRdia_data","frzRight_data"],colorGroup:[3,3,3,3,0,1,0,2,0,1,0]},"11W":{id:10,num:11,keys:["KeyS","KeyD","KeyF","KeyG","KeyJ","KeyK","KeyL","Digit2","KeyT","KeyY","Digit0"],alternativeKeys:["","","","KeyH","","","","Digit1","","","Minus"],noteNames:["left_data","leftdia_data","down_data","space_data","up_data","rightdia_data","right_data","sleft_data","sdown_data","sup_data","sright_data"],freezeNames:["frzLeft_data","frzLdia_data","frzDown_data","frzSpace_data","frzUp_data","frzRdia_data","frzRight_data","sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data"],colorGroup:[0,1,0,2,0,1,0,2,3,3,2]},"11i":{id:11,num:11,keys:["KeyS","KeyC","KeyD","KeyE","KeyF","KeyG","KeyJ","KeyM","KeyK","KeyI","KeyL"],alternativeKeys:["","KeyX","","KeyR","","KeyH","","Comma","","KeyO",""],noteNames:["left_data","down_data","gor_data","up_data","right_data","space_data","sleft_data","sdown_data","siyo_data","sup_data","sright_data"],freezeNames:["frzLeft_data","frzDown_data","frzGor_data","frzUp_data","frzRight_data","frzSpace_data","sfrzLeft_data","sfrzDown_data","sfrzIyo_data","sfrzUp_data","sfrzRight_data"],colorGroup:[0,0,2,0,0,2,1,1,2,1,1]},12:{id:12,num:12,keys:["KeyB","KeyN","KeyJ","KeyM","KeyK","Comma","KeyL","Period","KeyU","KeyI","Digit8","KeyO"],alternativeKeys:["","","","","","","","","","","Digit9",""],noteNames:["oni_data","left_data","leftdia_data","down_data","space_data","up_data","rightdia_data","right_data","sleft_data","sdown_data","sup_data","sright_data"],freezeNames:["foni_data","frzLeft_data","frzLdia_data","frzDown_data","frzSpace_data","frzUp_data","frzRdia_data","frzRight_data","sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data"],colorGroup:[2,0,1,0,1,0,1,0,3,3,3,3]},13:{id:13,num:13,keys:["KeyA","KeyS","KeyD","KeyF","KeyG","KeyJ","KeyK","KeyL","Semicolon","KeyU","KeyI","Digit8","KeyO"],alternativeKeys:["","","","","KeyH","","","","","","","Digit9",""],noteNames:["left_data","down_data","up_data","right_data","space_data","sleft_data","sdown_data","sup_data","sright_data","tleft_data","tdown_data","tup_data","tright_data"],freezeNames:["frzLeft_data","frzDown_data","frzUp_data","frzRight_data","frzSpace_data","sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data","tfrzLeft_data","tfrzDown_data","tfrzUp_data","tfrzRight_data"],colorGroup:[0,0,0,0,2,1,1,1,1,3,3,3,3]},14:{id:14,num:14,keys:["KeyB","KeyN","KeyJ","KeyM","KeyK","Comma","KeyL","Period","KeyY","KeyU","KeyI","Digit8","KeyO","KeyP"],alternativeKeys:["","","","","","","","","KeyT","","","Digit9","","BracketLeft"],noteNames:["oni_data","left_data","leftdia_data","down_data","space_data","up_data","rightdia_data","right_data","sleftdia_data","sleft_data","sdown_data","sup_data","sright_data","srightdia_data"],freezeNames:["foni_data","frzLeft_data","frzLdia_data","frzDown_data","frzSpace_data","frzUp_data","frzRdia_data","frzRight_data","sfrzLdia_data","sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data","sfrzRdia_data"],colorGroup:[2,0,1,0,1,0,1,0,2,3,3,3,3,2]},"14i":{id:15,num:14,keys:["KeyZ","KeyX","KeyC","KeyS","KeyD","KeyF","KeyG","KeyJ","KeyK","KeyL","KeyU","KeyI","Digit8","KeyO"],alternativeKeys:["","","","","","","KeyH","","","","","","Digit9",""],noteNames:["gor_data","space_data","iyo_data","sleft_data","sleftdia_data","sdown_data","sspace_data","sup_data","srightdia_data","sright_data","left_data","down_data","up_data","right_data"],freezeNames:["frzGor_data","frzSpace_data","frzIyo_data","sfrzLeft_data","sfrzLdia_data","sfrzDown_data","sfrzSpace_data","sfrzUp_data","sfrzRdia_data","sfrzRight_data","frzLeft_data","frzDown_data","frzUp_data","frzRight_data"],colorGroup:[2,2,2,0,1,0,2,0,1,0,3,3,3,3]},15:{id:16,num:15,keys:["KeyW","KeyE","Digit3","KeyR","KeyS","KeyD","KeyF","KeyG","KeyJ","KeyK","KeyL","KeyU","KeyI","Digit8","KeyO"],alternativeKeys:["","","Digit4","","","","","KeyH","","","","","","Digit9",""],noteNames:["sleft_data","sdown_data","sup_data","sright_data","left_data","leftdia_data","down_data","space_data","up_data","rightdia_data","right_data","tleft_data","tdown_data","tup_data","tright_data"],freezeNames:["sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data","frzLeft_data","frzLdia_data","frzDown_data","frzSpace_data","frzUp_data","frzRdia_data","frzRight_data","tfrzLeft_data","tfrzDown_data","tfrzUp_data","tfrzRight_data"],colorGroup:[3,3,3,3,0,1,0,2,0,1,0,3,3,3,3]},"16i":{id:17,num:16,keys:["KeyZ","KeyX","KeyC","KeyA","KeyS","KeyD","KeyF","KeyG","KeyJ","KeyK","KeyL","Semicolon","KeyU","KeyI","Digit8","KeyO"],alternativeKeys:["","","","","","","","KeyH","","","","","","","Digit9",""],noteNames:["gor_data","space_data","iyo_data","sleft_data","sdown_data","sup_data","sright_data","aspace_data","aleft_data","adown_data","aup_data","aright_data","left_data","down_data","up_data","right_data"],freezeNames:["frzGor_data","frzSpace_data","frzIyo_data","sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data","afrzSpace_data","afrzLeft_data","afrzDown_data","afrzUp_data","afrzRight_data","frzLeft_data","frzDown_data","frzUp_data","frzRight_data"],colorGroup:[2,2,2,1,0,1,0,2,0,1,0,1,3,3,3,3]},17:{id:18,num:17,keys:["KeyA","KeyZ","KeyS","KeyX","KeyD","KeyC","KeyF","KeyV","KeyG","KeyN","KeyJ","KeyM","KeyK","Comma","KeyL","Period"],alternativeKeys:["","","","","","","","","KeyH"],noteNames:["aleft_data","bleft_data","adown_data","bdown_data","aup_data","bup_data","aright_data","bright_data","space_data","cleft_data","dleft_data","cdown_data","ddown_data","cup_data","dup_data","cright_data","dright_data"],freezeNames:["afrzLeft_data","bfrzLeft_data","afrzDown_data","bfrzDown_data","afrzUp_data","bfrzUp_data","afrzRight_data","bfrzRight_data","frzSpace_data","cfrzLeft_data","dfrzLeft_data","cfrzDown_data","dfrzDown_data","cfrzUp_data","dfrzUp_data","cfrzRight_data","dfrzRight_data"],colorGroup:[0,1,0,1,0,1,0,1,2,1,0,1,0,1,0,1,0]}},z=function(){function t(t){this.keyNum=t,this.notes=new Array(this.keyNum).fill([]).map((function(){return[]})),this.freezes=new Array(this.keyNum).fill([]).map((function(){return[]})),this.speeds=[]}return t}(),b=30,D=5,w=384,k=w,N=w/8,P=60,S=20,L=30,R=["#ff0000","#0000ff","#00cc00","#ff9000"],C=["#ff4dd2","#00ffff","#ceff00","#c99b7d"],M=["#fff0ff","#f0f0ff","#f0fff0","#fff0dd"],O=function(){function t(t){this.audio=t,t.load()}return t.prototype.play=function(t){var e=this.audio.duration;e>t&&(this.audio.currentTime=t,this.audio.play())},t.prototype.pause=function(t){this.audio.pause(),clearTimeout(t)},t}(),U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("input",{directives:[{name:"model",rawName:"v-model",value:t.inputValue,expression:"inputValue"}],staticClass:"editor-speed-piece",style:{top:397-t.position+"px"},attrs:{type:"number",step:"0.01"},domProps:{value:t.inputValue},on:{input:function(e){e.target.composing||(t.inputValue=e.target.value)}}})},x=[],G=i["a"].extend({name:"SpeedPiece",model:{prop:"propValue",event:"changeSpeed"},props:{position:Number,propValue:Number,type:{type:String}},computed:{inputValue:{get:function(){return this.propValue},set:function(t){var e=Number(t);this.$emit("changeSpeed",e)}}}}),T=G,A=Object(d["a"])(T,U,x,!1,null,null,null),F=A.exports,E=i["a"].extend({name:"EditorMain",props:{pageNum:Number,loadScoreData:{type:Object},loadMusicUrl:String,selectedKey:String,timing:{type:Object}},components:{SpeedPiece:F},data:function(){var t=this.selectedKey,e=K,a=e[t].num,i=new Audio(this.loadMusicUrl);return{currentPosition:0,scoreData:this.loadScoreData,keyConfig:e,divisor:24,keyKind:t,page:1,keyNum:a,editorWidth:b*e[t].num,musicPlayer:new O(i),musicTimer:null,copyScoreStore:new z(a)}},methods:{baseLayerDraw:function(){var t=this.divisor,e=this.keyNum,a=this.editorWidth,i=this.stage,r=this.baseLayer,s=this.notesLayer,n=this.currentPositionLayer;r.destroyChildren();for(var o=0;o<e;o++){var d=(o+1)*b,u=this.keyConfig[this.keyKind].colorGroup,c=M[u[o]],f=new v.a.Rect({x:d-b,width:b,height:k,fill:c,strokeWidth:0});r.add(f);var l=new v.a.Line({points:[d,0,d,k],stroke:"#969696",strokeWidth:.5});r.add(l)}for(var p=0;p<w/t;p++){var h=(p+1)*t;l=new v.a.Line({points:[0,h,a,h],stroke:"#969696",strokeWidth:t*(p+1)%N==0?1:.5});r.add(l)}var _=new v.a.Rect({width:a,height:k,stroke:"black",strokeWidth:1});r.add(_),i.add(r),i.add(s),i.add(n)},currentPositionDraw:function(){var t=this.stage,e=this.currentPositionLayer,a=e.findOne("#currentPosition"),i=a instanceof v.a.Line?a.y(k-this.currentPosition):new v.a.Line({y:k-this.currentPosition,points:[0,0,this.editorWidth,0],stroke:"#d8d800",strokeWidth:1.75,id:"currentPosition"});e.add(i),t.add(e)},musicPositionAnimation:function(t){var e=this.stage,a=this.currentPositionLayer,i=a.findOne("#musicPosition"),r=i instanceof v.a.Line?i.y(k):new v.a.Line({y:k,points:[0,0,this.editorWidth,0],stroke:"#8000ff",strokeWidth:1.75,id:"musicPosition"});a.add(r),e.add(a);var s=new v.a.Tween({node:r,duration:4*t/5/1e3,x:0,y:0});setTimeout((function(){s.play()}),t/5)},playMusicLoop:function(t){var e=this,a=60/N/t.bpm*w,i=.25,r=1,s=t.firstNum/P+(this.pageNum-t.label)*a,n=s-i*a,o=s+r*a,d=function(t,a){var i=1e3*(a-t);if(e.musicPlayer.play(t),e.musicPositionAnimation(i),e.musicTimer){var r=setTimeout((function(){d(t,a)}),i);e.musicTimer=r}};this.musicTimer=1,d(n,o)},stopMusicLoop:function(t){var e=this.stage,a=this.currentPositionLayer,i=a.findOne("#musicPosition");i.destroy(),e.add(a),this.musicPlayer.pause(t),this.musicTimer=null},hasNote:function(t,e,a){var i=this.scoreData.scores[t-1],r=i.freezes[e].includes(a),s=i.notes[e].includes(a)||r;return{exists:s,isFreeze:r}},noteAdd:function(t,e,a,i){i?this.scoreData.scores[t-1].freezes[e].push(a):this.scoreData.scores[t-1].notes[e].push(a)},noteRemove:function(t,e,a){this.scoreData.scores[t-1].freezes[e]=this.scoreData.scores[t-1].freezes[e].filter((function(t){return t!==a})),this.scoreData.scores[t-1].notes[e]=this.scoreData.scores[t-1].notes[e].filter((function(t){return t!==a}))},noteDraw:function(t,e,a){var i=this.stage,r=this.notesLayer,s=this.keyConfig[this.keyKind].colorGroup,n=function(t,e){return e?C[s[t]]:R[s[t]]}(t,a),o=new v.a.Rect({x:t*b,y:k-e-D/2,width:b,height:D,fill:n,id:"note-"+t+"-"+e});r.add(o),i.add(r)},noteClear:function(t,e){var a=this.stage,i=this.notesLayer,r=i.findOne("#note-"+t+"-"+e);r.destroy(),a.add(i)},hasSpeedPiece:function(t,e){return this.scoreData.scores[t-1].speeds.some((function(t){return t.position===e}))},speedPieceAdd:function(t,e,a,i){void 0===i&&(i=1),this.scoreData.scores[t-1].speeds.push({position:e,value:i,type:a})},speedPieceRemove:function(t,e){this.scoreData.scores[t-1].speeds=this.scoreData.scores[t-1].speeds.filter((function(t){return t.position!==e}))},speedPieceDraw:function(t,e){var a=this.stage,i=this.notesLayer,r="speed"===e?"orange":"purple",s=6,n=new v.a.RegularPolygon({sides:3,radius:s,rotation:30,fill:r,x:this.editorWidth+s,y:k-t,id:"speed-"+t});i.add(n),a.add(i)},speedPieceClear:function(t){var e=this.stage,a=this.notesLayer,i=a.findOne("#speed-"+t);i.destroy(),e.add(a)},displayPageScore:function(t){var e=this,a=this.stage,i=this.notesLayer,r=this.scoreData.scores[t-1];i.destroyChildren(),a.add(i),r.notes.forEach((function(t,a){t.forEach((function(t){e.noteDraw(a,t,!1)}))})),r.freezes.forEach((function(t,a){t.forEach((function(t){e.noteDraw(a,t,!0)}))})),r.speeds.forEach((function(t){e.speedPieceDraw(t.position,t.type)}))},currentPositionMove:function(t){this.currentPosition=t,this.currentPositionDraw()},pageMove:function(t){var e=this;this.page=t,this.scoreData.scores[t]||(this.scoreData.scores.length=t+1),this.scoreData.scores=Object(m["a"])(this.scoreData.scores).map((function(t){return t||new z(e.keyNum)})),this.displayPageScore(t),this.musicTimer&&(this.stopMusicLoop(this.musicTimer),this.playMusicLoop(this.timing))},pageMinus:function(t,e){void 0===e&&(e=0),this.$emit("page-minus",t),this.currentPositionMove(e)},pagePlus:function(t){this.$emit("page-plus",t),this.currentPositionMove(0)},changeDivisor:function(t){this.divisor=t,this.currentPosition%t!==0&&this.currentPositionMove(Math.floor(this.currentPosition/t)*t),this.baseLayerDraw()},pageScoreCopy:function(){var t=this.page,e=JSON.parse(JSON.stringify(this.scoreData.scores[t-1]));this.copyScoreStore=e},pageScoreCut:function(){var t=this.page;this.pageScoreCopy(),this.scoreData.scores[t-1]=new z(this.keyNum),this.displayPageScore(t)},pageScorePaste:function(){var t=this.page,e=JSON.parse(JSON.stringify(this.copyScoreStore));this.scoreData.scores[t-1]=e,this.displayPageScore(t)},notesRemoveOnPosition:function(t,e){for(var a=this.keyNum,i=[],r=0;r<a;r++)this.hasNote(e,r,t).exists&&(this.noteRemove(e,r,t),i.push({lane:r,isFreeze:this.hasNote(e,r,t).isFreeze}));return this.displayPageScore(e),i},keydownAction:function(t){var e=this;if(t.ctrlKey)switch(t.code){case"Digit1":this.changeDivisor(N);break;case"Digit2":this.changeDivisor(N/2);break;case"Digit3":this.changeDivisor(N/4);break;case"Digit4":this.changeDivisor(N/3);break;case"Digit5":this.changeDivisor(N/6);break;case"Digit6":this.changeDivisor(N/12);break;case"Digit7":this.changeDivisor(N/8);break;case"KeyX":this.pageScoreCut();break;case"KeyC":this.pageScoreCopy();break;case"KeyV":this.pageScorePaste();break;case"ArrowUp":var a=this.page,i=this.notesRemoveOnPosition(this.currentPosition,a);this.currentPosition+=this.divisor,this.currentPosition>=w?(this.pagePlus(1),a++):this.currentPositionMove(this.currentPosition),this.notesRemoveOnPosition(this.currentPosition,a),i.forEach((function(t){return e.noteAdd(a,t.lane,e.currentPosition,t.isFreeze)})),this.displayPageScore(a);break;case"ArrowDown":var r=this.page;i=this.notesRemoveOnPosition(this.currentPosition,r);this.currentPosition-=this.divisor,this.currentPosition<0?1===this.page?this.currentPosition=0:(this.pageMinus(1,this.currentPosition+w),r--):this.currentPositionMove(this.currentPosition),this.notesRemoveOnPosition(this.currentPosition,r),i.forEach((function(t){return e.noteAdd(r,t.lane,e.currentPosition,t.isFreeze)})),this.displayPageScore(r);break}else switch(t.code){case"Enter":if(this.musicTimer){var s=this.musicTimer;this.stopMusicLoop(s)}else{var n=this.timing;this.playMusicLoop(n)}break;case"Backspace":this.notesRemoveOnPosition(this.currentPosition,this.page);break;case"Space":this.currentPosition+=this.divisor,this.currentPosition>=w?this.pagePlus(1):this.currentPositionMove(this.currentPosition);break;case"ArrowUp":this.currentPosition+=this.divisor,this.currentPosition>=w?this.pagePlus(1):this.currentPositionMove(this.currentPosition);break;case"ArrowDown":this.currentPosition-=this.divisor,this.currentPosition<0?1===this.page?this.currentPosition=0:this.pageMinus(1,this.currentPosition+w):this.currentPositionMove(this.currentPosition);break;case"ArrowLeft":t.shiftKey?this.pageMinus(5):this.pageMinus(1);break;case"ArrowRight":t.shiftKey?this.pagePlus(5):this.pagePlus(1);break;case"Quote":var o=t.shiftKey?"boost":"speed",d=this.page,u=this.currentPosition;this.hasSpeedPiece(d,u)?(this.speedPieceRemove(d,u),this.speedPieceClear(u)):(this.speedPieceAdd(d,u,o),this.speedPieceDraw(u,o));break;default:var c=Math.max(this.keyConfig[this.keyKind].keys.indexOf(t.code),this.keyConfig[this.keyKind].alternativeKeys.indexOf(t.code)),f=t.shiftKey;d=this.page,u=this.currentPosition;c>=0&&(this.hasNote(d,c,u).exists?(this.noteRemove(d,c,u),this.noteClear(c,u)):(this.noteAdd(d,c,u,f),this.noteDraw(c,u,f)),this.currentPosition+=this.divisor,this.currentPosition>=w?this.pagePlus(1):this.currentPositionMove(this.currentPosition));break}}},mounted:function(){var t=new v.a.Stage({x:S,y:S,container:"canvas",width:this.editorWidth+2*S+L,height:k+2*S}),e=new v.a.Layer({container:"baseLayer"}),a=new v.a.Layer({container:"currentPositionLayer"}),i=new v.a.Layer({container:"notesLayer"});this.stage=t,this.baseLayer=e,this.currentPositionLayer=a,this.notesLayer=i,this.baseLayerDraw(),this.currentPositionDraw(),this.displayPageScore(1)},watch:{pageNum:function(t){this.pageMove(t)},scoreData:function(t){this.$emit("changeScoreData",t)}}}),J=E,j=Object(d["a"])(J,_,y,!1,null,null,null),$=j.exports,H=function(){function t(t){this.keyNum=t,this.timings=[{label:1,firstNum:200,bpm:140}],this.scores=[new z(this.keyNum)]}return t}(),I=function(){function t(t,e){this.keyKind=t,this.keyConfig=e,this.keyNum=this.keyConfig[this.keyKind].num}return t.prototype.toFrameData=function(t){for(var e=new z(this.keyNum),a=t.timings.sort((function(t,e){return t.label-e.label})),i=t.scores,r=0,s=i.length+1,n=[],o=function(t){var s=i[t-1];if(void 0===s)n.push(e);else{a[r]&&t===a[r].label&&r++;var o=a[r-1],d=60*P/N/o.bpm,u=o.firstNum+(t-o.label)*w*d,c=function(t){return Math.round(u+t*d)},f=s.notes.map((function(t){return t.map(c)})),l=s.freezes.map((function(t){return t.map(c)})),p=s.speeds.map((function(t){var e=JSON.parse(JSON.stringify(t));return e.position=c(t.position),e}));n.push({notes:f,freezes:l,speeds:p})}},d=1;d<s;d++)o(d);return n},t.prototype.convert=function(t){var e=this,a=this.toFrameData(t),i={notes:new Array(this.keyNum).fill([]).map((function(){return[]})),freezes:new Array(this.keyNum).fill([]).map((function(){return[]})),speeds:[],boosts:[]},r=a.reduce((function(t,a){for(var i=0;i<e.keyNum;i++)t.notes[i]=t.notes[i].concat(a.notes[i]),t.freezes[i]=t.freezes[i].concat(a.freezes[i]);return t.speeds=t.speeds.concat(a.speeds.filter((function(t){return"speed"===t.type}))),t.boosts=t.boosts.concat(a.speeds.filter((function(t){return"boost"===t.type}))),t}),i);r.speeds.sort((function(t,e){return t.position-e.position})),r.boosts.sort((function(t,e){return t.position-e.position}));var s=r.notes.reduce((function(t,a,i){return t+e.keyConfig[e.keyKind].noteNames[i]+"="+a.join(",")+"|"}),"|"),n=r.freezes.reduce((function(t,a,i){return t+e.keyConfig[e.keyKind].freezeNames[i]+"="+a.join(",")+"|"}),""),o="speed_data="+r.speeds.map((function(t){return t.position+","+t.value})).join(",")+"|",d="boost_data="+r.boosts.map((function(t){return t.position+","+t.value})).join(",")+"|";return"\n"+(s+n)+"\n|"+(o+d)},t.prototype.save=function(t){return JSON.stringify(t)},t}(),W=i["a"].extend({name:"EditorController",components:{EditorMain:$},props:{selectedKey:String,loadScoreDataStr:String,loadMusicUrl:String},data:function(){var t,e=this.selectedKey,a=K[e].num;try{t=this.loadScoreDataStr?JSON.parse(this.loadScoreDataStr):new H(a)}catch(i){alert("不正な譜面データが与えられたため、正しく読み込めませんでした。"),t=new H(a)}return{pageNum:1,labelNum:1,timing:{label:1,firstNum:200,bpm:140},scoreData:t,keyKind:this.selectedKey,keyConfig:K}},methods:{pageMinus:function(t){this.pageNum=Math.max(1,this.pageNum-t)},pagePlus:function(t){this.pageNum+=t},labelMinus:function(t){this.labelNum=Math.max(1,this.labelNum-t),this.labelMove(this.labelNum),this.pageNum=this.scoreData.timings[this.labelNum-1].label},labelPlus:function(t){this.labelNum=Math.min(this.scoreData.timings.length,this.labelNum+t),this.labelMove(this.labelNum),this.pageNum=this.scoreData.timings[this.labelNum-1].label},labelMove:function(t){var e=this.scoreData.timings[t-1];this.labelNum=t,this.timing=e},changeScoreData:function(t){this.scoreData=t},convert:function(){var t=new I(this.keyKind,this.keyConfig),e=t.convert(this.scoreData);navigator.clipboard&&(navigator.clipboard.writeText(e),alert("セーブデータをクリップボードにコピーしました！"))},save:function(){var t=new I(this.keyKind,this.keyConfig),e=t.save(this.scoreData);navigator.clipboard&&(navigator.clipboard.writeText(e),alert("セーブデータをクリップボードにコピーしました！"))},getLabelNumByPageNum:function(t){var e=this.scoreData.timings.map((function(t){return t.label}));return e.indexOf(t)},getNearestLabelNumByPageNum:function(t){var e=this.scoreData.timings.map((function(t){return t.label})),a=e.reduce((function(e,a){return a<=t?e+1:e}),0);return a},labelOperation:function(t,e){if(e){var a=this.getLabelNumByPageNum(t);this.scoreData.timings.splice(a,1),this.labelNum--,this.timing=this.scoreData.timings[this.labelNum-1]}else{var i=this.timing,r=60*P/N/i.bpm,s=Math.round(100*(i.firstNum+(t-i.label)*w*r))/100,n={label:t,firstNum:s,bpm:i.bpm};this.scoreData.timings.splice(this.labelNum,0,n),this.timing=n,this.labelNum++}},callLabelOperation:function(){var t=this.pageNum,e=-1!==this.getLabelNumByPageNum(t);this.labelOperation(t,e),this.pageNum=t}},watch:{pageNum:function(t){var e=this.getNearestLabelNumByPageNum(t);this.labelNum=e,this.labelMove(e)}}}),B=W,V=Object(d["a"])(B,p,h,!1,null,null,null),X=V.exports,Z=i["a"].extend({name:"Editor",components:{EditorController:X},props:{loadScoreDataStr:String,loadMusicUrl:String,selectedKey:String}}),q=Z,Y=Object(d["a"])(q,f,l,!1,null,null,null),Q=Y.exports,tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"start"}},[a("start-main")],1)},et=[],at=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"start-container"}},[a("div",{attrs:{id:"start-title"}},[t._v("Dancing☆Onigiri Editor")]),a("div",{attrs:{id:"start-menu"}},[a("start-uploader",{attrs:{msg:t.musicTitle},on:{fileRecieve:t.onMusicFileRecieve}}),a("start-uploader",{attrs:{msg:t.scoreTitle},on:{fileRecieve:t.onScoreFileRecieve}}),a("div",{attrs:{id:"start-go-next"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedKey,expression:"selectedKey"}],staticClass:"uk-select uk-form-width-medium",attrs:{id:"start-key-selector"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.selectedKey=e.target.multiple?a:a[0]}}},t._l(t.keyConfig,(function(e,i){return a("option",{key:e.id},[t._v(t._s(i))])})),0),a("router-link",{staticClass:"start-go-btn btn-red",attrs:{to:{name:"editor",path:"editor",params:{scoreData:t.scoreDataStr,musicUrl:t.musicUrl},query:{key:t.selectedKey}}}},[t._v(" NEXT ")])],1),a("div",{attrs:{id:"start-version"}},[t._v("ver 2.0.0β created by SKB")])],1)])},it=[],rt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"start-music-select"},on:{dragover:function(e){return e.preventDefault(),t.ondragover(e)},drop:function(e){return e.preventDefault(),t.ondrop(e)}}},[a("div",{staticClass:"uk-placeholder uk-text-center uk-margin-remove-bottom",attrs:{"uk-form-custom":""}},[a("input",{ref:"input",attrs:{type:"file"},on:{change:t.loadFile}}),a("span",{attrs:{"uk-icon":"icon: upload"}}),a("span",{staticClass:"uk-text-middle"},[t._v(" "+t._s(t.msg)+" ")]),a("span",{staticClass:"uk-link"},[t._v("参照")])])])},st=[],nt=i["a"].extend({name:"StartUploader",props:{msg:String},data:function(){return{vue:this,file:null}},methods:{ondragover:function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="copy")},ondrop:function(t){if(t.dataTransfer){var e=t.dataTransfer.files[0]||null;this.file=e}else this.file=null},loadFile:function(t){if(t.target instanceof HTMLInputElement){var e=t.target.files?t.target.files[0]:null;this.file=e}else this.file=null}},watch:{file:function(t){null!==t?this.$emit("fileRecieve",t):alert("ファイルが見つかりませんでした。")}}}),ot=nt,dt=Object(d["a"])(ot,rt,st,!1,null,null,null),ut=dt.exports,ct=i["a"].extend({name:"StartMain",components:{StartUploader:ut},data:function(){return{keyConfig:K,musicTitle:"楽曲ファイルをドロップ",scoreTitle:"譜面ファイルをドロップ",selectedKey:"5",musicUrl:null,scoreDataStr:null}},methods:{onMusicFileRecieve:function(t){var e=this,a="audio.*";if(t.type.match(a)){var i=new FileReader;i.onload=function(){var a=i.result;"string"==typeof a&&(e.musicUrl=a,e.musicTitle=t.name)},i.readAsDataURL(t)}else alert("音楽ファイルではありません。")},onScoreFileRecieve:function(t){var e=this,a="(application/json|text/plain)";if(t.type.match(a)){var i=new FileReader;i.onload=function(){var a=i.result;"string"==typeof a&&(e.scoreDataStr=a,e.scoreTitle=t.name)},i.readAsText(t)}else alert("譜面ファイルではありません。")}}}),ft=ct,lt=Object(d["a"])(ft,at,it,!1,null,null,null),pt=lt.exports,ht=i["a"].extend({name:"Start",components:{StartMain:pt}}),_t=ht,yt=Object(d["a"])(_t,tt,et,!1,null,null,null),mt=yt.exports,gt=a("8c4f");i["a"].config.productionTip=!1,i["a"].use(gt["a"]);var vt=new gt["a"]({routes:[{path:"/",name:"Start",component:mt},{path:"/editor",name:"editor",component:Q,props:function(t){return{loadScoreDataStr:t.params.scoreData,loadMusicUrl:t.params.musicUrl,selectedKey:t.query.key||"7"}}}]}),Kt=a("8323"),zt=a.n(Kt),bt=a("263c"),Dt=a.n(bt);a("30b0"),a("d0e7");zt.a.use(Dt.a),i["a"].config.productionTip=!1,new i["a"]({router:vt,render:function(t){return t(c)}}).$mount("#app")}});
//# sourceMappingURL=app.7288f837.js.map