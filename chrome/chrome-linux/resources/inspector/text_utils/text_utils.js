import{StringUtilities as t}from"../platform/platform.js";class e{constructor(t,e){this.lineNumber=t,this.lineContent=e}}var n=Object.freeze({__proto__:null,ContentProvider:class{contentURL(){throw new Error("not implemented")}contentType(){throw new Error("not implemented")}contentEncoded(){throw new Error("not implemented")}requestContent(){throw new Error("not implemented")}searchInContent(t,e,n){throw new Error("not implemented")}},SearchMatch:e,contentAsDataURL:function(t,e,n,s){return null==t||t.length>1048576?null:"data:"+e+(s?";charset="+s:"")+(n?";base64":"")+","+t},DeferredContent:void 0});class s{constructor(t){this._lineEndings=t,this._offset=0,this._lineNumber=0,this._columnNumber=0}advance(t){for(this._offset=t;this._lineNumber<this._lineEndings.length&&this._lineEndings[this._lineNumber]<this._offset;)++this._lineNumber;this._columnNumber=this._lineNumber?this._offset-this._lineEndings[this._lineNumber-1]-1:this._offset}offset(){return this._offset}resetTo(t){this._offset=t,this._lineNumber=this._lineEndings.lowerBound(t),this._columnNumber=this._lineNumber?this._offset-this._lineEndings[this._lineNumber-1]-1:this._offset}lineNumber(){return this._lineNumber}columnNumber(){return this._columnNumber}}var i=Object.freeze({__proto__:null,TextCursor:s});class r{constructor(t,e,n,s){this.startLine=t,this.startColumn=e,this.endLine=n,this.endColumn=s}static createFromLocation(t,e){return new r(t,e,t,e)}static fromObject(t){return new r(t.startLine,t.startColumn,t.endLine,t.endColumn)}static comparator(t,e){return t.compareTo(e)}static fromEdit(e,n){let s=e.startLine,i=e.startColumn+n.length;const o=t.findLineEndingIndexes(n);if(o.length>1){s=e.startLine+o.length-1;const t=o.length;i=o[t-1]-o[t-2]-1}return new r(e.startLine,e.startColumn,s,i)}isEmpty(){return this.startLine===this.endLine&&this.startColumn===this.endColumn}immediatelyPrecedes(t){return!!t&&(this.endLine===t.startLine&&this.endColumn===t.startColumn)}immediatelyFollows(t){return!!t&&t.immediatelyPrecedes(this)}follows(t){return t.endLine===this.startLine&&t.endColumn<=this.startColumn||t.endLine<this.startLine}get linesCount(){return this.endLine-this.startLine}collapseToEnd(){return new r(this.endLine,this.endColumn,this.endLine,this.endColumn)}collapseToStart(){return new r(this.startLine,this.startColumn,this.startLine,this.startColumn)}normalize(){return this.startLine>this.endLine||this.startLine===this.endLine&&this.startColumn>this.endColumn?new r(this.endLine,this.endColumn,this.startLine,this.startColumn):this.clone()}clone(){return new r(this.startLine,this.startColumn,this.endLine,this.endColumn)}serializeToObject(){const t={};return t.startLine=this.startLine,t.startColumn=this.startColumn,t.endLine=this.endLine,t.endColumn=this.endColumn,t}compareTo(t){return this.startLine>t.startLine?1:this.startLine<t.startLine?-1:this.startColumn>t.startColumn?1:this.startColumn<t.startColumn?-1:0}compareToPosition(t,e){return t<this.startLine||t===this.startLine&&e<this.startColumn?-1:t>this.endLine||t===this.endLine&&e>this.endColumn?1:0}equal(t){return this.startLine===t.startLine&&this.endLine===t.endLine&&this.startColumn===t.startColumn&&this.endColumn===t.endColumn}relativeTo(t,e){const n=this.clone();return this.startLine===t&&(n.startColumn-=e),this.endLine===t&&(n.endColumn-=e),n.startLine-=t,n.endLine-=t,n}relativeFrom(t,e){const n=this.clone();return 0===this.startLine&&(n.startColumn+=e),0===this.endLine&&(n.endColumn+=e),n.startLine+=t,n.endLine+=t,n}rebaseAfterTextEdit(t,e){console.assert(t.startLine===e.startLine),console.assert(t.startColumn===e.startColumn);const n=this.clone();if(!this.follows(t))return n;const s=e.endLine-t.endLine,i=e.endColumn-t.endColumn;return n.startLine+=s,n.endLine+=s,n.startLine===e.endLine&&(n.startColumn+=i),n.endLine===e.endLine&&(n.endColumn+=i),n}toString(){return JSON.stringify(this)}containsLocation(t,e){return this.startLine===this.endLine?this.startLine===t&&this.startColumn<=e&&e<=this.endColumn:this.startLine===t?this.startColumn<=e:this.endLine===t?e<=this.endColumn:this.startLine<t&&t<this.endLine}}class o{constructor(t,e){this.offset=t,this.length=e}}var l=Object.freeze({__proto__:null,TextRange:r,SourceRange:o,SourceEdit:class{constructor(t,e,n){this.sourceURL=t,this.oldRange=e,this.newText=n}static comparator(t,e){return r.comparator(t.oldRange,e.oldRange)}newRange(){return r.fromEdit(this.oldRange,this.newText)}}});class a{constructor(t){this._value=t}lineEndings(){return this._lineEndings||(this._lineEndings=t.findLineEndingIndexes(this._value)),this._lineEndings}value(){return this._value}lineCount(){return this.lineEndings().length}offsetFromPosition(t,e){return(t?this.lineEndings()[t-1]+1:0)+e}positionFromOffset(t){const e=this.lineEndings(),n=e.lowerBound(t);return{lineNumber:n,columnNumber:t-(n&&e[n-1]+1)}}lineAt(t){const e=this.lineEndings(),n=t>0?e[t-1]+1:0,s=e[t];let i=this._value.substring(n,s);return i.length>0&&"\r"===i.charAt(i.length-1)&&(i=i.substring(0,i.length-1)),i}toSourceRange(t){const e=this.offsetFromPosition(t.startLine,t.startColumn),n=this.offsetFromPosition(t.endLine,t.endColumn);return new o(e,n-e)}toTextRange(t){const e=new s(this.lineEndings()),n=r.createFromLocation(0,0);return e.resetTo(t.offset),n.startLine=e.lineNumber(),n.startColumn=e.columnNumber(),e.advance(t.offset+t.length),n.endLine=e.lineNumber(),n.endColumn=e.columnNumber(),n}replaceRange(t,e){const n=this.toSourceRange(t);return this._value.substring(0,n.offset)+e+this._value.substring(n.offset+n.length)}extract(t){const e=this.toSourceRange(t);return this._value.substr(e.offset,e.length)}}var u=Object.freeze({__proto__:null,Text:a,Position:void 0});const h={get _keyValueFilterRegex(){return/(?:^|\s)(\-)?([\w\-]+):([^\s]+)/},get _regexFilterRegex(){return/(?:^|\s)(\-)?\/([^\s]+)\//},get _textFilterRegex(){return/(?:^|\s)(\-)?([^\s]+)/},get _SpaceCharRegex(){return/\s/},get Indent(){return{TwoSpaces:"  ",FourSpaces:"    ",EightSpaces:"        ",TabCharacter:"\t"}},isStopChar:function(t){return t>" "&&t<"0"||t>"9"&&t<"A"||t>"Z"&&t<"_"||t>"_"&&t<"a"||t>"z"&&t<="~"},isWordChar:function(t){return!h.isStopChar(t)&&!h.isSpaceChar(t)},isSpaceChar:function(t){return h._SpaceCharRegex.test(t)},isWord:function(t){for(let e=0;e<t.length;++e)if(!h.isWordChar(t.charAt(e)))return!1;return!0},isOpeningBraceChar:function(t){return"("===t||"{"===t},isClosingBraceChar:function(t){return")"===t||"}"===t},isBraceChar:function(t){return h.isOpeningBraceChar(t)||h.isClosingBraceChar(t)},textToWords:function(t,e,n){let s=-1;for(let i=0;i<t.length;++i)e(t.charAt(i))?-1===s&&(s=i):(-1!==s&&n(t.substring(s,i)),s=-1);-1!==s&&n(t.substring(s))},lineIndent:function(t){let e=0;for(;e<t.length&&h.isSpaceChar(t.charAt(e));)++e;return t.substr(0,e)},isUpperCase:function(t){return t===t.toUpperCase()},isLowerCase:function(t){return t===t.toLowerCase()},splitStringByRegexes(t,e){const n=[],s=[];for(let t=0;t<e.length;t++){const n=e[t];n.global?s.push(n):s.push(new RegExp(n.source,n.flags?n.flags+"g":"g"))}return function t(e,i,r){if(i>=s.length)return void n.push({value:e,position:r,regexIndex:-1,captureGroups:[]});const o=s[i];let l,a=0;o.lastIndex=0;for(;null!==(l=o.exec(e));){const s=e.substring(a,l.index);s&&t(s,i+1,r+a);const o=l[0];n.push({value:o,position:r+l.index,regexIndex:i,captureGroups:l.slice(1)}),a=l.index+o.length}const u=e.substring(a);u&&t(u,i+1,r+a)}(t,0,0),n}};const c=function(n,s,i,r){const o=t.createSearchRegex(s,i,r),l=new a(n),u=[];for(let t=0;t<l.lineCount();++t){const n=l.lineAt(t);o.lastIndex=0,o.exec(n)&&u.push(new e(t,n))}return u};var d=Object.freeze({__proto__:null,Utils:h,FilterParser:class{constructor(t){this._keys=t}static cloneFilter(t){return{key:t.key,text:t.text,regex:t.regex,negative:t.negative}}parse(t){const e=h.splitStringByRegexes(t,[h._keyValueFilterRegex,h._regexFilterRegex,h._textFilterRegex]),n=[];for(let t=0;t<e.length;t++){const s=e[t].regexIndex;if(-1===s)continue;const i=e[t].captureGroups;if(0===s)-1!==this._keys.indexOf(i[1])?n.push({key:i[1],regex:void 0,text:i[2],negative:!!i[0]}):n.push({key:void 0,regex:void 0,text:i[1]+":"+i[2],negative:!!i[0]});else if(1===s)try{n.push({key:void 0,regex:new RegExp(i[1],"i"),text:void 0,negative:!!i[0]})}catch(t){n.push({key:void 0,regex:void 0,text:"/"+i[1]+"/",negative:!!i[0]})}else 2===s&&n.push({key:void 0,regex:void 0,text:i[1],negative:!!i[0]})}return n}},BalancedJSONTokenizer:class{constructor(t,e){this._callback=t,this._index=0,this._balance=0,this._buffer="",this._findMultiple=e||!1,this._closingDoubleQuoteRegex=/[^\\](?:\\\\)*"/g}write(t){this._buffer+=t;const e=this._buffer.length,n=this._buffer;let s;for(s=this._index;s<e;++s){const t=n[s];if('"'===t){if(this._closingDoubleQuoteRegex.lastIndex=s,!this._closingDoubleQuoteRegex.test(n))break;s=this._closingDoubleQuoteRegex.lastIndex-1}else if("{"===t)++this._balance;else if("}"===t){if(--this._balance,this._balance<0)return this._reportBalanced(),!1;if(!this._balance&&(this._lastBalancedIndex=s+1,!this._findMultiple))break}else if("]"===t&&!this._balance)return this._reportBalanced(),!1}return this._index=s,this._reportBalanced(),!0}_reportBalanced(){this._lastBalancedIndex&&(this._callback(this._buffer.slice(0,this._lastBalancedIndex)),this._buffer=this._buffer.slice(this._lastBalancedIndex),this._index-=this._lastBalancedIndex,this._lastBalancedIndex=0)}remainder(){return this._buffer}},TokenizerFactory:class{createTokenizer(t){throw new Error("not implemented")}},isMinified:function(t){let e=10,n=0;do{let e=t.indexOf("\n",n);if(e<0&&(e=t.length),e-n>500&&"//#"!==t.substr(n,3))return!0;n=e+1}while(--e>=0&&n<t.length);e=10,n=t.length;do{let e=t.lastIndexOf("\n",n);if(e<0&&(e=0),n-e>500&&"//#"!==t.substr(n,3))return!0;n=e-1}while(--e>=0&&n>0);return!1},performSearchInContent:c,ParsedFilter:void 0});class m{constructor(t,e,n){this._contentURL=t,this._contentType=e,this._lazyContent=n}static fromString(t,e,n){return new m(t,e,()=>Promise.resolve({content:n,isEncoded:!1}))}contentURL(){return this._contentURL}contentType(){return this._contentType}contentEncoded(){return Promise.resolve(!1)}requestContent(){return this._lazyContent()}async searchInContent(t,e,n){const{content:s}=await this._lazyContent();return s?c(s,t,e,n):[]}}var f=Object.freeze({__proto__:null,StaticContentProvider:m});export{n as ContentProvider,f as StaticContentProvider,u as Text,i as TextCursor,l as TextRange,d as TextUtils};