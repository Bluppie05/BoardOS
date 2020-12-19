import{render as t,html as e,Directives as o}from"../../third_party/lit-html/lit-html.js";const s=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);function r(t,e){const o=t.cells.find(t=>t.columnId===e);if(void 0===o)throw new Error(`Found a row that was missing an entry for column ${e}.`);return o}const i=t=>{const{columns:e,rows:o}=t,s=e.some(t=>!0===t.sortable)?0:o.findIndex(t=>!t.hidden)+1;return[e.findIndex(t=>!t.hidden),s]};class n extends Event{constructor(t,e){super("columnHeaderClick"),this.data={column:t,columnIndex:e}}}const l=new Set([" ","Enter"]);class a extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.columns=[],this.rows=[],this.sortState=null,this.focusableCell=[0,1],this.hasRenderedAtLeastOnce=!1}get data(){return{columns:this.columns,rows:this.rows,activeSort:this.sortState}}set data(t){if(this.columns=t.columns,this.rows=t.rows,this.sortState=t.activeSort,this.hasRenderedAtLeastOnce||(this.focusableCell=i({columns:this.columns,rows:this.rows})),this.hasRenderedAtLeastOnce){const[t,e]=this.focusableCell,o=t>this.columns.length,s=e>this.rows.length;this.focusableCell=o||s?[o?this.columns.length:t,s?this.rows.length:e]:i({columns:this.columns,rows:this.rows})}this.render()}scrollToBottomIfRequired(){if(!1===this.hasRenderedAtLeastOnce)return;const t=this.getCurrentlyFocusableCell();if(t&&t===this.shadow.activeElement)return;const e=this.shadow.querySelector("tbody tr:not(.hidden):last-child");e&&e.scrollIntoView()}getCurrentlyFocusableCell(){const[t,e]=this.focusableCell;return this.shadow.querySelector(`[data-row-index="${e}"][data-col-index="${t}"]`)}focusCell([t,e]){const[o,s]=this.focusableCell;o===t&&s===e||(this.focusableCell=[t,e],this.render());const r=this.getCurrentlyFocusableCell();if(!r)throw new Error("Unexpected error: could not find cell marked as focusable");r!==this.shadow.activeElement&&r.focus()}onTableKeyDown(t){const e=t.key;if(l.has(e)){const t=this.getCurrentlyFocusableCell(),[e,o]=this.focusableCell,s=this.columns[e];t&&0===o&&s&&s.sortable&&this.onColumnHeaderClick(s,e)}if(!function(t){return s.has(t)}(e))return;const o=function(t){const{key:e,currentFocusedCell:o,columns:s,rows:r}=t,[i,n]=o;switch(e){case"ArrowLeft":{if(i===s.findIndex(t=>!t.hidden))return[i,n];let t=i;for(let e=t-1;e>=0;e--){if(!s[e].hidden){t=e;break}}return[t,n]}case"ArrowRight":{let t=i;for(let e=t+1;e<s.length;e++){if(!s[e].hidden){t=e;break}}return[t,n]}case"ArrowUp":{const t=s.some(t=>!0===t.sortable)?0:1;if(n===t)return[i,n];let e=n;for(let o=n-1;o>=t;o--){if(0===o){e=0;break}if(!r[o-1].hidden){e=o;break}}return[i,e]}case"ArrowDown":{if(0===n){const t=r.findIndex(t=>!t.hidden);return t>-1?[i,t+1]:[i,n]}let t=n;for(let e=t+1;e<r.length+1;e++){if(!r[e-1].hidden){t=e;break}}return[i,t]}}}({key:e,currentFocusedCell:this.focusableCell,columns:this.columns,rows:this.rows});this.focusCell(o)}onColumnHeaderClick(t,e){this.dispatchEvent(new n(t,e))}ariaSortForHeader(t){return!t.sortable||this.sortState&&this.sortState.columnId===t.id?this.sortState&&this.sortState.columnId===t.id?"ASC"===this.sortState.direction?"ascending":"descending":void 0:"none"}render(){const s=this.columns.findIndex(t=>!t.hidden),i=this.columns.some(t=>!0===t.sortable);t(e`
    <style>
      :host {
        --table-divider-color: #aaa;
        --toolbar-bg-color: #f3f3f3;
        --selected-row-color: rgb(212, 212, 212);
        --selection-bg-color: #1a73e8;

        height: 100%;
        display: block;
      }
      /* Ensure that vertically we don't overflow */
      .wrapping-container {
        overflow-y: scroll;
        /* Use max-height instead of height to ensure that the
           table does not use more space than necessary. */
        height: 100%;
        position: relative;
      }

      table {
        border-spacing: 0;
        width: 100%;
        /* To make sure that we properly hide overflowing text
           when horizontal space is too narrow. */
        table-layout: fixed;
      }

      tr {
        outline: none;
      }


      tbody tr.selected {
        background-color: var(--selected-row-color);
      }

      table:focus tr.selected {
        background-color: var(--selection-bg-color)
      }

      td, th {
        padding: 1px 4px;
        /* Divider between each cell, except the first one (see below) */
        border-left: 1px solid var(--table-divider-color);
        line-height: 18px;
        height: 18px;
        user-select: text;
        /* Ensure that text properly cuts off if horizontal space is too narrow */
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      /* There is no divider before the first cell */
      td.firstVisibleColumn, th.firstVisibleColumn {
        border-left: none;
      }

      th {
        font-weight: normal;
        text-align: left;
        border-bottom: 1px solid var(--table-divider-color);
        position: sticky;
        top: 0;
        z-index: 2;
        background-color: var(--toolbar-bg-color);
      }

      .hidden {
        display: none;
      }

      [aria-sort]:hover {
        cursor: pointer;
      }

      [aria-sort="descending"]::after {
        content: " ";
        border-left: 0.3em solid transparent;
        border-right: 0.3em solid transparent;
        border-top: 0.3em solid black;
        position: absolute;
        right: 0.5em;
        top: 0.6em;
      }
      [aria-sort="ascending"]::after {
        content: " ";
        border-bottom: 0.3em solid black;
        border-left: 0.3em solid transparent;
        border-right: 0.3em solid transparent;
        position: absolute;
        right: 0.5em;
        top: 0.6em;
      }
    </style>
    <div class="wrapping-container">
      <table
        aria-rowcount=${this.rows.length}
        aria-colcount=${this.columns.length}
        @keydown=${this.onTableKeyDown}
      >
        <colgroup>
          ${this.columns.filter(t=>!t.hidden).map(t=>{const o=function(t,e){const o=t.filter(t=>!t.hidden).reduce((t,e)=>t+e.widthWeighting,0),s=t.find(t=>t.id===e);if(!s)throw new Error("Could not find column with ID "+e);if(s.widthWeighting<1)throw new Error(`Error with column ${e}: width weightings must be >= 1.`);return s.hidden?0:Math.round(s.widthWeighting/o*100)}(this.columns,t.id);return e`<col style=${`width: ${o}%`}>`})}
        </colgroup>
        <thead>
          <tr>
            ${this.columns.map((t,r)=>{const n=o.classMap({hidden:!0===t.hidden,firstVisibleColumn:r===s}),l=i&&r===this.focusableCell[0]&&0===this.focusableCell[1];return e`<th class=${n}
                data-grid-header-cell=${t.id}
                @click=${()=>{this.focusCell([r,0]),this.onColumnHeaderClick(t,r)}}
                aria-sort=${o.ifDefined(this.ariaSortForHeader(t))}
                aria-colindex=${r+1}
                data-row-index='0'
                data-col-index=${r}
                tabindex=${o.ifDefined(i?l?"0":"-1":void 0)}
              >${t.title}</th>`})}
          </tr>
        </thead>
        <tbody>
          ${this.rows.map((t,i)=>{const n=this.getCurrentlyFocusableCell(),[,l]=this.focusableCell,a=i+1,d=!!n&&(n===document.activeElement&&a===l),c=o.classMap({selected:d,hidden:!0===t.hidden});return e`
              <tr
                aria-rowindex=${i+1}
                class=${c}
              >${this.columns.map((i,n)=>{const l=r(t,i.id),d=o.classMap({hidden:!0===i.hidden,firstVisibleColumn:n===s}),c=n===this.focusableCell[0]&&a===this.focusableCell[1];return e`<td
                  class=${d}
                  tabindex=${c?"0":"-1"}
                  aria-colindex=${n+1}
                  data-row-index=${a}
                  data-col-index=${n}
                  data-grid-value-cell-for-column=${i.id}
                  @click=${()=>{this.focusCell([n,a])}}
                >${l.value}</td>`})}
            `})}
        </tbody>
      </table>
    </div>
    `,this.shadow,{eventContext:this}),this.scrollToBottomIfRequired(),this.hasRenderedAtLeastOnce=!0}}customElements.define("devtools-data-grid",a);var d=Object.freeze({__proto__:null,ColumnHeaderClickEvent:n,DataGrid:a});class c extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.columns=[],this.rows=[],this.originalColumns=[],this.originalRows=[],this.sortState=null}get data(){return{columns:this.originalColumns,rows:this.originalRows,filterText:this.filterText}}set data(t){this.originalColumns=t.columns,this.originalRows=t.rows,this.filterText=t.filterText,this.columns=[...this.originalColumns],this.rows=this.cloneAndFilterRows(t.rows,this.filterText),this.render()}cloneAndFilterRows(t,e){return e?t.map(t=>{const o=t.cells.some(t=>t.value.toLowerCase().includes(e.toLowerCase()));return{...t,hidden:!o}}):[...t]}sortRows(t){const{columnId:e,direction:o}=t;this.rows.sort((t,s)=>{const i=r(t,e),n=r(s,e),l=i.value.toUpperCase(),a=n.value.toUpperCase();return l<a?"ASC"===o?-1:1:l>a?"ASC"===o?1:-1:0}),this.render()}onColumnHeaderClick(t){const{column:e}=t.data;if(this.sortState&&this.sortState.columnId===e.id){const{columnId:t,direction:e}=this.sortState;this.sortState="DESC"===e?null:{columnId:t,direction:"DESC"}}else this.sortState={columnId:e.id,direction:"ASC"};this.sortState?this.sortRows(this.sortState):(this.rows=[...this.originalRows],this.render())}render(){t(e`
      <style>
        :host {
          display: block;
          height: 100%;
          overflow: hidden;
        }
      </style>
      <devtools-data-grid .data=${{columns:this.columns,rows:this.rows,activeSort:this.sortState}}
        @columnHeaderClick=${this.onColumnHeaderClick}
      ></devtools-data-grid>
    `,this.shadow,{eventContext:this})}}customElements.define("devtools-data-grid-controller",c);var h=Object.freeze({__proto__:null,DataGridController:c});export{d as DataGrid,h as DataGridController};
