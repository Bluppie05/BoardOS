import{UIString as e,EventTarget as t,Revealer as i}from"../common/common.js";import{Diff as s}from"../diff/diff.js";import{Widget as n,TreeOutline as o,ARIAUtils as r,Icon as a,SplitWidget as d,EmptyWidget as l,Toolbar as c,ViewManager as h}from"../ui/ui.js";import{WorkspaceDiff as u}from"../workspace_diff/workspace_diff.js";import{ScriptSnippetFileSystem as f}from"../snippets/snippets.js";import{UISourceCode as p}from"../workspace/workspace.js";import{CodeMirrorTextEditor as _}from"../text_editor/text_editor.js";class m extends n.Widget{constructor(e){super(),this._treeoutline=new o.TreeOutlineInShadow,this._treeoutline.setFocusable(!1),this._treeoutline.registerRequiredCSS("changes/changesSidebar.css",{enableLegacyPatching:!0}),this._treeoutline.setComparator((e,t)=>e.titleAsText().compareTo(t.titleAsText())),this._treeoutline.addEventListener(o.Events.ElementSelected,this._selectionChanged,this),r.markAsTablist(this._treeoutline.contentElement),this.element.appendChild(this._treeoutline.element),this._treeElements=new Map,this._workspaceDiff=e,this._workspaceDiff.modifiedUISourceCodes().forEach(this._addUISourceCode.bind(this)),this._workspaceDiff.addEventListener(u.Events.ModifiedStatusChanged,this._uiSourceCodeMofiedStatusChanged,this)}selectUISourceCode(e,t){const i=this._treeElements.get(e);i&&i.select(t)}selectedUISourceCode(){return this._treeoutline.selectedTreeElement?this._treeoutline.selectedTreeElement.uiSourceCode:null}_selectionChanged(){this.dispatchEventToListeners(g.SelectedUISourceCodeChanged)}_uiSourceCodeMofiedStatusChanged(e){e.data.isModified?this._addUISourceCode(e.data.uiSourceCode):this._removeUISourceCode(e.data.uiSourceCode)}_removeUISourceCode(e){const t=this._treeElements.get(e);if(this._treeElements.delete(e),this._treeoutline.selectedTreeElement===t){const e=t.previousSibling||t.nextSibling;e?e.select(!0):(t.deselect(),this._selectionChanged())}t&&(this._treeoutline.removeChild(t),t.dispose()),0===this._treeoutline.rootElement().childCount()&&this._treeoutline.setFocusable(!1)}_addUISourceCode(e){const t=new S(e);this._treeElements.set(e,t),this._treeoutline.setFocusable(!0),this._treeoutline.appendChild(t),this._treeoutline.selectedTreeElement||t.select(!0)}}const g={SelectedUISourceCodeChanged:Symbol("SelectedUISourceCodeChanged")};class S extends o.TreeElement{constructor(e){super(),this.uiSourceCode=e,this.listItemElement.classList.add("navigator-"+e.contentType().name()+"-tree-item"),r.markAsTab(this.listItemElement);let t="largeicon-navigator-file";f.isSnippetsUISourceCode(this.uiSourceCode)&&(t="largeicon-navigator-snippet");const i=a.Icon.create(t,"icon");this.setLeadingIcons([i]),this._eventListeners=[e.addEventListener(p.Events.TitleChanged,this._updateTitle,this),e.addEventListener(p.Events.WorkingCopyChanged,this._updateTitle,this),e.addEventListener(p.Events.WorkingCopyCommitted,this._updateTitle,this)],this._updateTitle()}_updateTitle(){let t=this.uiSourceCode.displayName();this.uiSourceCode.isDirty()&&(t="*"+t),this.title=t;let i=this.uiSourceCode.url();this.uiSourceCode.contentType().isFromSourceMap()&&(i=e.UIString("%s (from source map)",this.uiSourceCode.displayName())),this.tooltip=i}dispose(){t.EventTarget.removeEventListeners(this._eventListeners)}}var b=Object.freeze({__proto__:null,ChangesSidebar:m,Events:g,UISourceCodeTreeElement:S});class C extends _.CodeMirrorTextEditor{constructor(e){e.inputStyle="devToolsAccessibleDiffTextArea",super(e),this.codeMirror().setOption("gutters",["CodeMirror-linenumbers","changes-diff-gutter"]),this.codeMirror().setOption("extraKeys",{Enter:!1,Space:!1,Left:function(e){const t=e.getScrollInfo();t.left>0&&e.scrollTo(t.left-Math.round(t.clientWidth/6),null)},Right:function(e){const t=e.getScrollInfo();e.scrollTo(t.left+Math.round(t.clientWidth/6),null)}})}updateDiffGutter(e){this.codeMirror().eachLine(t=>{const i=this.codeMirror().getLineNumber(t),s=e[i];let n;s.type===T.Deletion?(n=document.createElement("div"),n.classList.add("deletion"),n.classList.add("changes-diff-gutter-marker"),n.textContent="-"):s.type===T.Addition&&(n=document.createElement("div"),n.classList.add("addition"),n.classList.add("changes-diff-gutter-marker"),n.textContent="+"),n&&this.codeMirror().setGutterMarker(t,"changes-diff-gutter",n)})}}class y extends CodeMirror.inputStyles.devToolsAccessibleTextArea{reset(e){if(super.reset(e),this.textAreaBusy(!!e)||"object"!=typeof this.cm.doc.modeOption)return;const t=this.cm.doc.modeOption.diffRows[this.cm.getCursor().line].type;t===T.Deletion&&(this.textarea.value=ls`Deletion:${this.textarea.value}`),t===T.Addition&&(this.textarea.value=ls`Addition:${this.textarea.value}`),this.prevInput=this.textarea.value}}CodeMirror.inputStyles.devToolsAccessibleDiffTextArea=y;var x=Object.freeze({__proto__:null,ChangesTextEditor:C,DevToolsAccessibleDiffTextArea:y});let w;class v extends n.VBox{constructor(){super(!0),this.registerRequiredCSS("changes/changesView.css",{enableLegacyPatching:!0});const e=new d.SplitWidget(!0,!1),t=new n.Widget;e.setMainWidget(t),e.show(this.contentElement),this._emptyWidget=new l.EmptyWidget(""),this._emptyWidget.show(t.element),this._workspaceDiff=u.workspaceDiff(),this._changesSidebar=new m(this._workspaceDiff),this._changesSidebar.addEventListener(g.SelectedUISourceCodeChanged,this._selectedUISourceCodeChanged,this),e.setSidebarWidget(this._changesSidebar),this._selectedUISourceCode=null,this._diffRows=[],this._maxLineDigits=1,this._editor=new C({bracketMatchingSetting:void 0,devtoolsAccessibleName:ls`Changes diff viewer`,lineNumbers:!0,lineWrapping:!1,mimeType:void 0,autoHeight:void 0,padBottom:void 0,maxHighlightLength:1/0,placeholder:void 0,lineWiseCopyCut:void 0}),this._editor.setReadOnly(!0);const i=t.element.createChild("div","editor-container");r.markAsTabpanel(i),this._editor.show(i),this._editor.hideWidget(),self.onInvokeElement(this._editor.element,this._click.bind(this)),this._toolbar=new c.Toolbar("changes-toolbar",t.element);const s=new c.ToolbarButton(ls`Revert all changes to current file`,"largeicon-undo");s.addEventListener(c.ToolbarButton.Events.Click,this._revert.bind(this)),this._toolbar.appendToolbarItem(s),this._diffStats=new c.ToolbarText(""),this._toolbar.appendToolbarItem(this._diffStats),this._toolbar.setEnabled(!1),this._hideDiff(ls`No changes`),this._selectedUISourceCodeChanged()}static instance(e={forceNew:null}){const{forceNew:t}=e;return w&&!t||(w=new v),w}_selectedUISourceCodeChanged(){this._revealUISourceCode(this._changesSidebar.selectedUISourceCode())}_revert(){const e=this._selectedUISourceCode;e&&this._workspaceDiff.revertToOriginal(e)}_click(e){const t=this._editor.selection();if(!t.isEmpty()||!this._selectedUISourceCode)return;const s=this._diffRows[t.startLine];i.reveal(this._selectedUISourceCode.uiLocation(s.currentLineNumber-1,t.startColumn),!1),e.consume(!0)}_revealUISourceCode(e){this._selectedUISourceCode!==e&&(this._selectedUISourceCode&&this._workspaceDiff.unsubscribeFromDiffChange(this._selectedUISourceCode,this._refreshDiff,this),e&&this.isShowing()&&this._workspaceDiff.subscribeToDiffChange(e,this._refreshDiff,this),this._selectedUISourceCode=e,this._refreshDiff())}wasShown(){this._refreshDiff()}_refreshDiff(){if(!this.isShowing())return;if(!this._selectedUISourceCode)return void this._renderDiffRows(null);const e=this._selectedUISourceCode;e.contentType().isTextType()?this._workspaceDiff.requestDiff(e).then(t=>{this._selectedUISourceCode===e&&this._renderDiffRows(t)}):this._hideDiff(ls`Binary data`)}_hideDiff(e){this._diffStats.setText(""),this._toolbar.setEnabled(!1),this._editor.hideWidget(),this._emptyWidget.text=e,this._emptyWidget.showWidget()}_renderDiffRows(t){if(this._diffRows=[],!t||1===t.length&&t[0][0]===s.Operation.Equal)return void this._hideDiff(ls`No changes`);let i=0,n=0,o=0,r=0;const a=[],d=[];for(let e=0;e<t.length;++e){const o=t[e];switch(o[0]){case s.Operation.Equal:this._diffRows.push(...h(o[1],0===e,e===t.length-1)),a.push(...o[1]),d.push(...o[1]);break;case s.Operation.Insert:for(const e of o[1])this._diffRows.push(f(e,T.Addition));i+=o[1].length,d.push(...o[1]);break;case s.Operation.Delete:if(n+=o[1].length,a.push(...o[1]),t[e+1]&&t[e+1][0]===s.Operation.Insert)e++,this._diffRows.push(...u(o[1].join("\n"),t[e][1].join("\n"))),i+=t[e][1].length,d.push(...t[e][1]);else for(const e of o[1])this._diffRows.push(f(e,T.Deletion))}}this._maxLineDigits=Math.ceil(Math.log10(Math.max(o,r)));let l="";l=1===i?ls`${i} insertion (+),`:ls`${i} insertions (+),`;let c="";function h(t,i,s){const n=[];if(!i){for(let e=0;e<3&&e<t.length;e++)n.push(f(t[e],T.Equal));t.length>7&&!s&&n.push(f(e.UIString("( … Skipping %d matching lines … )",t.length-6),T.Spacer))}if(!s){const e=Math.max(t.length-3-1,i?0:3);let s=t.length-3-1;i||(s-=3),s>0&&(r+=s,o+=s);for(let i=e;i<t.length;i++)n.push(f(t[i],T.Equal))}return n}function u(e,t){const i=s.DiffWrapper.charDiff(e,t,!0),n=[f("",T.Deletion)],o=[f("",T.Addition)];for(const e of i){const t=e[1],i=e[0],r=i===s.Operation.Equal?"":"inner-diff",a=t.split("\n");for(let e=0;e<a.length;e++)e>0&&i!==s.Operation.Insert&&n.push(f("",T.Deletion)),e>0&&i!==s.Operation.Delete&&o.push(f("",T.Addition)),a[e]&&(i!==s.Operation.Insert&&n[n.length-1].tokens.push({text:a[e],className:r}),i!==s.Operation.Delete&&o[o.length-1].tokens.push({text:a[e],className:r}))}return n.concat(o)}function f(e,t){return t===T.Addition&&o++,t===T.Deletion&&r++,t===T.Equal&&(r++,o++),{baselineLineNumber:r,currentLineNumber:o,tokens:e?[{text:e,className:"inner-diff"}]:[],type:t}}c=1===n?ls`${n} deletion (-)`:ls`${n} deletions (-)`,this._diffStats.setText(`${l} ${c}`),this._toolbar.setEnabled(!0),this._emptyWidget.hideWidget(),this._editor.operation(()=>{this._editor.showWidget(),this._editor.setHighlightMode({name:"devtools-diff",diffRows:this._diffRows,mimeType:this._selectedUISourceCode.mimeType(),baselineLines:a,currentLines:d}),this._editor.setText(this._diffRows.map(e=>e.tokens.map(e=>e.text).join("")).join("\n")),this._editor.setLineNumberFormatter(this._lineFormatter.bind(this)),this._editor.updateDiffGutter(this._diffRows)})}_lineFormatter(e){const t=this._diffRows[e-1];let i=t.type===T.Deletion,s=t.type===T.Addition;t.type===T.Equal&&(i=!0,s=!0);return(i?String(t.baselineLineNumber):"").padStart(this._maxLineDigits," ")+" "+(s?String(t.currentLineNumber):"").padStart(this._maxLineDigits," ")}}const T={Deletion:"deletion",Addition:"addition",Equal:"equal",Spacer:"spacer"};var L=Object.freeze({__proto__:null,ChangesView:v,RowType:T,DiffUILocationRevealer:class{async reveal(e,t){if(!(e instanceof u.DiffUILocation))throw new Error("Internal error: not a diff ui location");await h.ViewManager.instance().showView("changes.changes"),v.instance()._changesSidebar.selectUISourceCode(e.uiSourceCode,t)}},Row:void 0});function I(e,t){const i=t.diffRows,s=t.baselineLines,n=t.currentLines,o=CodeMirror.getMode({},t.mimeType);function r(e,t,i,s){let n=t;for(;n<i&&n<s.length;){const t=new CodeMirror.StringStream(s[n]);for(t.eol()&&o.blankLine&&o.blankLine(e);!t.eol();)o.token(t,e),t.start=t.pos;n++}}return{startState:function(){return{rowNumber:0,diffTokenIndex:0,currentLineNumber:0,baselineLineNumber:0,currentSyntaxState:CodeMirror.startState(o),baselineSyntaxState:CodeMirror.startState(o),syntaxPosition:0,diffPosition:0,syntaxStyle:"",diffStyle:""}},token:function(e,t){const a=i[t.rowNumber];if(!a)return e.next(),"";!function(e,t,i){t>e.baselineLineNumber&&(r(e.baselineSyntaxState,e.baselineLineNumber,t,s),e.baselineLineNumber=t),i>e.currentLineNumber&&(r(e.currentSyntaxState,e.currentLineNumber,i,n),e.currentLineNumber=i)}(t,a.baselineLineNumber-1,a.currentLineNumber-1);let d="";0===e.pos&&(d+=" line-background-"+a.type+" line-"+a.type);const l=t.diffPosition>=t.syntaxPosition;return t.diffPosition<=t.syntaxPosition&&(t.diffPosition+=a.tokens[t.diffTokenIndex].text.length,t.diffStyle=a.tokens[t.diffTokenIndex].className,t.diffTokenIndex++),l&&(a.type===T.Deletion||a.type===T.Addition||a.type===T.Equal?(t.syntaxStyle=o.token(e,a.type===T.Deletion?t.baselineSyntaxState:t.currentSyntaxState),t.syntaxPosition=e.pos):(t.syntaxStyle="",t.syntaxPosition=1/0)),e.pos=Math.min(t.syntaxPosition,t.diffPosition),d+=" "+t.syntaxStyle,d+=" "+t.diffStyle,e.eol()&&(t.rowNumber++,a.type===T.Deletion?t.baselineLineNumber++:t.currentLineNumber++,t.diffPosition=0,t.syntaxPosition=0,t.diffTokenIndex=0),d},blankLine:function(e){const t=i[e.rowNumber];if(e.rowNumber++,e.syntaxPosition=0,e.diffPosition=0,e.diffTokenIndex=0,!t)return"";let s="";return o.blankLine&&(t.type===T.Equal||t.type===T.Addition?(s=o.blankLine(e.currentSyntaxState),e.currentLineNumber++):t.type===T.Deletion&&(s=o.blankLine(e.baselineSyntaxState),e.baselineLineNumber++)),s+" line-background-"+t.type+" line-"+t.type},copyState:function(e){const t=Object.assign({},e);return t.currentSyntaxState=CodeMirror.copyState(o,e.currentSyntaxState),t.baselineSyntaxState=CodeMirror.copyState(o,e.baselineSyntaxState),t}}}CodeMirror.defineMode("devtools-diff",I);var E=Object.freeze({__proto__:null,ChangesHighlighter:I,DiffState:void 0});export{E as ChangesHighlighter,b as ChangesSidebar,x as ChangesTextEditor,L as ChangesView};
