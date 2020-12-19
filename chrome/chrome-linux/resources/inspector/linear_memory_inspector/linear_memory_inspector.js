import"../elements/Icon.js";import*as e from"../third_party/lit-html/lit-html.js";import{Directives as t}from"../third_party/lit-html/lit-html.js";import{SimpleHistoryManager as s}from"../common/common.js";function r(e,t){return e.toString(16).padStart(t,"0").toUpperCase()}const{render:i,html:n}=e;class o extends Event{constructor(e){super("pageNavigation",{}),this.data=e}}class a extends Event{constructor(e){super("historyNavigation",{}),this.data=e}}class d extends Event{constructor(){super("refresh",{})}}class l extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.address=0}set data(e){this.address=e.address,this.render()}render(){i(n`
      <style>
        .navigator {
          min-height: 24px;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          overflow: hidden;
          align-items: center;
        }

        input {
          text-align: center;
        }

        .navigator-button {
          background: transparent;
          overflow: hidden;
          vertical-align: middle;
          border: none;
          padding: 0px;
        }
      </style>
      <div class="navigator">
        <div>
          ${this.createButton("ic_undo_16x16_icon",new a("Backward"))}
          ${this.createButton("ic_redo_16x16_icon",new a("Forward"))}
        </div>
        <div>
          ${this.createButton("ic_page_prev_16x16_icon",new o("Backward"))}
          <input data-input="true" contenteditable="true" value="0x${r(this.address,8)}"/>
          ${this.createButton("ic_page_next_16x16_icon",new o("Forward"))}
        </div>
        ${this.createButton("refresh_12x12_icon",new d)}
      </div>
      `,this.shadow,{eventContext:this})}createButton(e,t){return n`
      <button class="navigator-button" data-button=${t.type} @click=${this.dispatchEvent.bind(this,t)}>
        <devtools-icon .data=${{iconName:e,color:"rgb(110 110 110)",width:"16px"}}>
        </devtools-icon>
      </button>`}}customElements.define("devtools-linear-memory-inspector-navigator",l);var c,h,p;function u(e,t){switch(t){case p.Decimal:return e.toFixed(2).toString();case p.Scientific:return e.toExponential(2).toString();default:throw new Error(`Unknown mode for floats: ${t}.`)}}function m(e,t){switch(t){case p.Decimal:return e.toString();case p.Hexadecimal:return e.toString(16);case p.Octal:return e.toString(8);default:throw new Error(`Unknown mode for integers: ${t}.`)}}!function(e){e.Int8="Integer 8-bit",e.Int16="Integer 16-bit",e.Int32="Integer 32-bit",e.Int64="Integer 64-bit",e.Float32="Float 32-bit",e.Float64="Float 64-bit",e.Boolean="Boolean",e.String="String"}(c||(c={})),function(e){e.Little="Little Endian",e.Big="Big Endian"}(h||(h={})),function(e){e.Decimal="dec",e.Hexadecimal="hex",e.Octal="oct",e.Scientific="sci",e.None="none"}(p||(p={}));const{render:g,html:v}=e,y=new Map([[c.Int8,p.Decimal],[c.Int16,p.Decimal],[c.Int32,p.Decimal],[c.Int64,p.Decimal],[c.Float32,p.Decimal],[c.Float64,p.Decimal],[c.Boolean,p.None],[c.String,p.None]]);class w extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.endianness=h.Little,this.buffer=new ArrayBuffer(0),this.valueTypes=[],this.valueTypeModeConfig=y}set data(e){this.buffer=e.buffer,this.valueTypes=e.valueTypes,this.valueTypeModeConfig=y,e.valueTypeModes&&e.valueTypeModes.forEach((e,t)=>{(function(e,t){switch(e){case c.Int8:case c.Int16:case c.Int32:case c.Int64:return t===p.Decimal||t===p.Hexadecimal||t===p.Octal;case c.Float32:case c.Float64:return t===p.Scientific||t===p.Decimal;case c.Boolean:case c.String:return t===p.None}})(t,e)&&this.valueTypeModeConfig.set(t,e)}),this.render()}render(){g(v`
      <style>
        :host {
          flex: auto;
          display: flex;
        }

        .mode-type {
          color: var(--text-highlight-color);
        }

        .value-types {
          display: grid;
          overflow: hidden;
          grid-template-columns: minmax(90px, 1fr) minmax(25px, 0.5fr) minmax(100px, 2fr) minmax(100px, 2fr);
          grid-column-gap: 10px;
          padding-left: 12px;
          padding-right: 12px;
        }

        .value-type-cell {
          height: 21px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          display: flex;
        }

      </style>
        <div class="value-types">
          ${this.valueTypes.map(e=>this.showValue(e))}
        </div>
      </div>
    `,this.shadow,{eventContext:this})}showValue(e){return v`
      <span class="value-type-cell">${e}</span>
      ${function(e){switch(e){case c.Int8:case c.Int16:case c.Int32:case c.Int64:case c.Float32:case c.Float64:return!0;default:return!1}}(e)?v`<span class="mode-type value-type-cell">${this.valueTypeModeConfig.get(e)}</span>`:v`<span/>`}
      ${function(e){switch(e){case c.Int8:case c.Int16:case c.Int32:case c.Int64:return!0;default:return!1}}(e)?v`
        <span class="value-type-cell" data-value="true">+ ${this.parse({type:e,signed:!1})}</span>
        <span class="value-type-cell" data-value="true">± ${this.parse({type:e,signed:!0})}</span>`:v`<span class="value-type-cell" data-value="true">${this.parse({type:e})}</span>`}
    `}parse(e){const t=this.valueTypeModeConfig.get(e.type);if(!t)throw new Error("No known way of showing value for "+e.type);return function(e){const t=new DataView(e.buffer),s=e.endianness===h.Little;let r;switch(e.type){case c.Int8:return r=e.signed?t.getInt8(0):t.getUint8(0),m(r,e.mode);case c.Int16:return r=e.signed?t.getInt16(0,s):t.getUint16(0,s),m(r,e.mode);case c.Int32:return r=e.signed?t.getInt32(0,s):t.getUint32(0,s),m(r,e.mode);case c.Int64:return r=e.signed?t.getBigInt64(0,s):t.getBigUint64(0,s),m(r,e.mode);case c.Float32:return r=t.getFloat32(0,s),u(r,e.mode);case c.Float64:return r=t.getFloat64(0,s),u(r,e.mode);case c.Boolean:return""+!!(1&t.getInt8(0));case c.String:throw new Error(`Type ${e.type} is not yet implemented`)}}({buffer:this.buffer,type:e.type,endianness:this.endianness,signed:e.signed||!1,mode:t})}}customElements.define("devtools-linear-memory-inspector-interpreter-display",w);const{render:f,html:x}=e;class b extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.endianness=h.Little,this.buffer=new ArrayBuffer(0),this.valueTypes=[],this.valueTypeModeConfig=new Map}set data(e){this.endianness=e.endianness,this.buffer=e.value,this.valueTypes=e.valueTypes,this.valueTypeModeConfig=e.valueTypeModes||new Map,this.render()}render(){f(x`
      <style>
        :host {
          flex: auto;
          display: flex;
        }

        .value-interpreter {
          border: var(--divider-border, 1px solid #d0d0d0);
          background-color: var(--toolbar-bg-color, #f3f3f3);
          overflow: hidden;
          --text-highlight-color: #80868b;
        }

        .settings-toolbar {
          min-height: 26px;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          padding-left: 12px;
          padding-right: 12px
        }

        .settings-item {
          line-height: 26px;
        }

        .divider {
          display: block;
          height: 1px;
          margin-bottom: 12px;
          background-color: var(--divider-color,  #d0d0d0);
        }
      </style>
      <div class="value-interpreter">
        <div class="settings-toolbar">
          <div class="settings-item">
            <span>${this.endianness}</span>
            <devtools-icon
              .data=${{iconName:"dropdown_7x6_icon",color:"rgb(110 110 110)",width:"7px"}}>
            </devtools-icon>
          </div>
          <div class="settings-item">
            <devtools-icon
              .data=${{iconName:"settings_14x14_icon",color:"rgb(110 110 110)",width:"14px"}}>
            </devtools-icon>
          </div>
        </div>
        <span class="divider"></span>
        <devtools-linear-memory-inspector-interpreter-display
          .data=${{buffer:this.buffer,valueTypes:this.valueTypes,endianness:this.endianness,valueTypeModes:this.valueTypeModeConfig}}>
        </devtools-linear-memory-inspector-interpreter-display>
      </div>
    `,this.shadow,{eventContext:this})}}customElements.define("devtools-linear-memory-inspector-interpreter",b);const{render:I,html:B}=e;class R extends Event{constructor(e){super("byteSelected"),this.data=e}}class ${constructor(e){this.numRows=e.numRows,this.numBytesPerRow=e.numBytesPerRow,this.selectedAddress=e.address;const t=this.getNumBytesPerPage(),s=Math.floor(this.selectedAddress/t);this.pageStartAddress=s*this.getNumBytesPerPage();const r=this.getOffsetFromPageStart(this.selectedAddress);this.selectedRow=Math.floor(r/this.numBytesPerRow)}getRowIndexRange(e){const t=this.pageStartAddress+e*this.numBytesPerRow;return{startIndex:t,endIndex:t+this.numBytesPerRow}}getNumBytesPerPage(){return this.numBytesPerRow*this.numRows}getOffsetFromPageStart(e){return Math.max(e-this.pageStartAddress,0)}}class S extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.resizeObserver=new ResizeObserver(()=>this.update()),this.isObservingResize=!1,this.memory=new Uint8Array,this.address=0,this.byteGroupSize=4,this.pageView=new $({address:this.address,numRows:1,numBytesPerRow:this.byteGroupSize})}set data(e){this.memory=e.memory,this.address=e.address,this.update()}disconnectedCallback(){this.isObservingResize=!1,this.resizeObserver.disconnect()}getNumBytesPerPage(){return this.pageView.getNumBytesPerPage()}update(){this.updatePageView(),this.render(),this.engageResizeObserver()}updatePageView(){const e=new $({address:this.address,numRows:1,numBytesPerRow:this.byteGroupSize});if(0===this.clientWidth||0===this.clientHeight||!this.shadowRoot)return void(this.pageView=e);const t=this.shadowRoot.querySelector(".byte-cell"),s=this.shadowRoot.querySelector(".text-cell"),r=this.shadowRoot.querySelector(".divider"),i=this.shadowRoot.querySelector(".row");if(!(t&&s&&r&&i))return void(this.pageView=e);const n=t.getBoundingClientRect().width,o=s.getBoundingClientRect().width,a=this.byteGroupSize*(n+o)+S.BYTE_GROUP_MARGIN,d=r.getBoundingClientRect().width,l=this.clientWidth-t.getBoundingClientRect().left-d;if(l<a)return void(this.pageView=e);const c=Math.floor(l/a)*this.byteGroupSize,h=Math.ceil(this.memory.length/c),p=Math.min(Math.floor(this.clientHeight/i.getBoundingClientRect().height),h);this.pageView=new $({address:this.address,numRows:p,numBytesPerRow:c})}engageResizeObserver(){this.resizeObserver&&!this.isObservingResize&&(this.resizeObserver.observe(this),this.isObservingResize=!0)}render(){I(B`
      <style>
        :host {
          flex: auto;
          display: flex;
        }

        .view {
          overflow: hidden;
          text-overflow: ellipsis;
          box-sizing: border-box;
          --selected-cell-color: #1a1aa6;
        }

        .row {
          display: flex;
          height: 20px;
        }

        .cell {
          text-align: center;
          border: 1px solid transparent;
          border-radius: 2px;
        }

        .cell.selected {
          border-color: var(--selected-cell-color);
          color: var(--selected-cell-color);
          background-color: #cfe8fc;
        }

        .byte-cell {
          min-width: 21px;
        }

        .byte-group-margin {
          margin-left: ${S.BYTE_GROUP_MARGIN}px;
        }

        .text-cell {
          min-width: 14px;
          color: var(--selected-cell-color);
        }

        .address {
          font-size: 11px;
          color: #9aa0a6;
        }

        .address.selected {
          font-weight: bold;
          color: #333333;
        }

        .divider {
          width: 1px;
          background-color: rgb(204, 204, 204);
          margin: 0px 4px 0px 4px;
        }
      </style>
      <div class="view">
          ${this.renderView()}
      </div>
      `,this.shadow,{eventContext:this})}renderView(){const e=[];for(let t=0;t<this.pageView.numRows;++t)e.push(this.renderRow(t));return B`${e}`}renderRow(e){const{startIndex:s,endIndex:i}=this.pageView.getRowIndexRange(e),n={address:!0,selected:this.pageView.selectedRow===e};return B`
    <div class="row">
      <span class="${t.classMap(n)}">${r(s,8)}</span>
      <span class="divider"></span>
      ${this.renderByteValues(s,i)}
      <span class="divider"></span>
      ${this.renderCharacterValues(s,i)}
    </div>
    `}renderByteValues(e,s){const i=[];for(let n=e;n<s;++n){const s={cell:!0,"byte-cell":!0,"byte-group-margin":n!==e&&(n-e)%this.byteGroupSize==0,selected:n===this.address},o=n<this.memory.length?B`${r(this.memory[n],2)}`:"";i.push(B`
        <span class="${t.classMap(s)}" @click=${this.onSelectedByte(n)}>
          ${o}
        </span>`)}return B`${i}`}renderCharacterValues(e,s){const r=[];for(let i=e;i<s;++i){const e={cell:!0,"text-cell":!0,selected:this.address===i},s=i<this.memory.length?B`${this.toAscii(this.memory[i])}`:"";r.push(B`<span class="${t.classMap(e)}">${s}</span>`)}return B`${r}`}toAscii(e){return e>=20&&e<=127?String.fromCharCode(e):"."}onSelectedByte(e){return()=>{this.dispatchEvent(new R(e))}}}S.BYTE_GROUP_MARGIN=8,customElements.define("devtools-linear-memory-inspector-viewer",S);const{render:M,html:T}=e;class P{constructor(e,t){if(this.address=0,e<0)throw new Error("Address should be a greater or equal to zero");this.address=e,this.callback=t}valid(){return!0}reveal(){this.callback(this.address)}}class _ extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.history=new s.SimpleHistoryManager(10),this.memory=new Uint8Array,this.address=0}set data(e){this.memory=e.memory,this.address=e.address,this.render()}render(){M(T`
      <style>
        :host {
          flex: auto;
          display: flex;
        }

        .memory-inspector {
          width: 100%;
          display: flex;
          flex: auto;
          flex-direction: column;
          font-family: monospace;
          padding: 9px 12px 9px 7px;
        }

        devtools-linear-memory-inspector-navigator + devtools-linear-memory-inspector-viewer {
          margin-top: 12px;
        }
      </style>
      <div class="memory-inspector">
        <devtools-linear-memory-inspector-navigator
          .data=${{address:this.address}}
          @pageNavigation=${this.navigatePage}
          @historyNavigation=${this.navigateHistory}></devtools-linear-memory-inspector-navigator>
        <devtools-linear-memory-inspector-viewer
          .data=${{memory:this.memory,address:this.address}}
          @byteSelected=${e=>this.jumpToAddress(e.data)}></devtools-linear-memory-inspector-viewer>
      </div>
        <devtools-linear-memory-inspector-interpreter .data=${{value:this.memory.slice(this.address,this.address+8).buffer,valueTypes:[c.Int8,c.Int16,c.Int64],endianness:h.Little}}>
        </devtools-linear-memory-inspector-interpreter/>
      `,this.shadow,{eventContext:this})}navigateHistory(e){return"Forward"===e.data?this.history.rollover():this.history.rollback()}navigatePage(e){const t=this.shadow.querySelector("devtools-linear-memory-inspector-viewer");if(!t)return;const s="Forward"===e.data?Math.min(this.address+t.getNumBytesPerPage(),this.memory.length-1):Math.max(this.address-t.getNumBytesPerPage(),0);this.jumpToAddress(s)}jumpToAddress(e){const t=new P(e,e=>this.jumpToAddress(e));this.history.push(t),this.address=e,this.render()}}customElements.define("devtools-linear-memory-inspector-inspector",_);class E extends HTMLElement{set data(e){}}var C=Object.freeze({__proto__:null,LinearMemoryInspectorData:void 0,LinearMemoryInspectorClosureInterface:E,createLinearMemoryInspector:function(){return document.createElement("devtools-linear-memory-inspector-inspector")}});export{C as LinearMemoryInspector};
