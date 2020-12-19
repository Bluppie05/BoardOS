const t=function(t){const e=new g;for(const r of t.keys()){const n=t.get(r);e.set(n,r)}return e};var e=Object.freeze({__proto__:null,inverse:t});const r=(t,e)=>{let r=!1;for(let n=0;n<e.length;++n)if(-1!==t.indexOf(e.charAt(n))){r=!0;break}if(!r)return String(t);let n="";for(let r=0;r<t.length;++r)-1!==e.indexOf(t.charAt(r))&&(n+="\\"),n+=t.charAt(r);return n},n="string",o="specifier";const i=function(t,e){const r=[];function i(t){t&&(r.length&&r[r.length-1].type===n?r[r.length-1].value+=t:r.push({type:n,value:t,specifier:void 0,precision:void 0,substitutionIndex:void 0}))}function s(t,e,n){r.push({type:o,specifier:t,precision:e,substitutionIndex:n,value:void 0})}function u(t){const e=["black","red","green","yellow","blue","magenta","cyan","lightGray","","default"],n=["darkGray","lightRed","lightGreen","lightYellow","lightBlue","lightMagenta","lightCyan","white",""],i={color:e,colorLight:n,bgColor:e,bgColorLight:n},s={3:"color",9:"colorLight",4:"bgColor",10:"bgColorLight"}[Math.floor(t/10)];if(!s)return;const u=i[s][t%10];u&&r.push({type:o,specifier:"c",value:{description:(s.startsWith("bg")?"background : ":"color: ")+u},precision:void 0,substitutionIndex:void 0})}let a=0,l=0;const c=new RegExp(`%%|%(?:(\\d+)\\$)?(?:\\.(\\d*))?([${Object.keys(e).join("")}])|\\u001b\\[(\\d+)m`,"g");for(let e=c.exec(t);e;e=c.exec(t)){const r=e.index;if(r>a&&i(t.substring(a,r)),"%%"===e[0])i("%");else if(e[0].startsWith("%")){const[t,r,n,o]=e;r&&Number(r)>0&&(l=Number(r)-1);s(o,n?Number(n):-1,l),++l}else{u(Number(e[4]))}a=r+e[0].length}return i(t.substring(a)),r},s=function(t,e,r,s,u,a){if(!t||(!e||!e.length)&&-1===t.search(/\u001b\[(\d+)m/))return{formattedResult:u(s,t),unusedSubstitutions:e};function l(){return'String.format("'+t+'", "'+Array.prototype.join.call(e,'", "')+'")'}function c(t){console.error(l()+": "+t)}let f=s;const p=a||i(t,r),h={},g=e||[];for(let t=0;t<p.length;++t){const e=p[t];e.type!==n?e.type===o?!e.value&&void 0!==e.substitutionIndex&&e.substitutionIndex>=g.length?(c("not enough substitution arguments. Had "+g.length+" but needed "+(e.substitutionIndex+1)+", so substitution was skipped."),f=u(f,"%"+(void 0!==e.precision&&e.precision>-1?e.precision:"")+e.specifier)):(e.value||void 0===e.substitutionIndex||(h[e.substitutionIndex]=!0),void 0!==e.specifier&&e.specifier in r?f=u(f,r[e.specifier](e.value||void 0!==e.substitutionIndex&&g[e.substitutionIndex],e)):(d="unsupported format character “"+e.specifier+"”. Treating as a string.",console.warn(l()+": "+d),f=u(f,e.value||void 0===e.substitutionIndex?"":g[e.substitutionIndex]))):c('Unknown token type "'+e.type+'" found.'):f=u(f,e.value)}var d;const y=[];for(let t=0;t<g.length;++t)t in h||y.push(g[t]);return{formattedResult:f,unusedSubstitutions:y}},u={d:function(t){return isNaN(t)?0:t},f:function(t,e){t&&void 0!==e.precision&&e.precision>-1&&(t=t.toFixed(e.precision));const r=void 0!==e.precision&&e.precision>-1?Number(0).toFixed(e.precision):0;return isNaN(t)?r:t},s:function(t){return t}},a=function(t,e){return s(t,e,u,"",(function(t,e){return t+e})).formattedResult},l=function(t,e){return a(t,Array.prototype.slice.call(arguments,1))},c=(t,e)=>{const r=[];let n=t.indexOf(e);for(;-1!==n;)r.push(n),n=t.indexOf(e,n+e.length);return r},f=function(){return"^[]{}()\\.^$*+?|-,"},p=function(t,e){return(t=t.toUpperCase())===(e=e.toUpperCase())?0:t>e?1:-1};var h=Object.freeze({__proto__:null,escapeCharacters:r,FORMATTER_TOKEN:void 0,tokenizeFormatString:i,format:s,standardFormatters:u,vsprintf:a,sprintf:l,toBase64:t=>{function e(t){return t<26?t+65:t<52?t+71:t<62?t-4:62===t?43:63===t?47:65}const r=(new TextEncoder).encode(t.toString()),n=r.length;let o,i="";if(0===n)return i;let s=0;for(let t=0;t<n;t++)o=t%3,s|=r[t]<<(16>>>o&24),2===o&&(i+=String.fromCharCode(e(s>>>18&63),e(s>>>12&63),e(s>>>6&63),e(63&s)),s=0);return 0===o?i+=String.fromCharCode(e(s>>>18&63),e(s>>>12&63),61,61):1===o&&(i+=String.fromCharCode(e(s>>>18&63),e(s>>>12&63),e(s>>>6&63),61)),i},findIndexesOfSubString:c,findLineEndingIndexes:t=>{const e=c(t,"\n");return e.push(t.length),e},isWhitespace:t=>/^\s*$/.test(t),trimURL:(t,e)=>{let r=t.replace(/^(https|http|file):\/\//i,"");return e&&r.toLowerCase().startsWith(e.toLowerCase())&&(r=r.substr(e.length)),r},collapseWhitespace:t=>t.replace(/[\s\xA0]+/g," "),reverse:t=>t.split("").reverse().join(""),replaceControlCharacters:t=>t.replace(/[\0-\x08\x0B\f\x0E-\x1F\x80-\x9F]/g,"�"),countWtf8Bytes:t=>{let e=0;for(let r=0;r<t.length;r++){const n=t.charCodeAt(r);if(n<=127)e++;else if(n<=2047)e+=2;else if(n<55296||57343<n)e+=3;else{if(n<=56319&&r+1<t.length){const n=t.charCodeAt(r+1);if(56320<=n&&n<=57343){e+=4,r++;continue}}e+=3}}return e},stripLineBreaks:t=>t.replace(/(\r)?\n/g,""),toTitleCase:t=>t.substring(0,1).toUpperCase()+t.substring(1),removeURLFragment:t=>{const e=new URL(t);return e.hash="",e.toString()},regexSpecialCharacters:f,filterRegex:function(t){const e="^[]{}()\\.^$*+?|-,";let r="";for(let n=0;n<t.length;++n){let o=t.charAt(n);-1!==e.indexOf(o)&&(o="\\"+o),n&&(r+="[^\\0"+o+"]*"),r+=o}return new RegExp(r,"i")},createSearchRegex:function(t,e,r){const n=e?"g":"gi";let o;if(r)try{o=new RegExp(t,n)}catch(t){}return o||(o=self.createPlainTextSearchRegex(t,n)),o},caseInsensetiveComparator:p});String.sprintf=l,String.regexSpecialCharacters=f,String.caseInsensetiveComparator=p,String.prototype.escapeForRegExp=function(){return r(this,"^[]{}()\\.^$*+?|-,")},String.prototype.trimMiddle=function(t){if(this.length<=t)return String(this);let e=t>>1,r=t-e-1;return this.codePointAt(this.length-r-1)>=65536&&(--r,++e),e>0&&this.codePointAt(e-1)>=65536&&--e,this.substr(0,e)+"…"+this.substr(this.length-r,r)},String.prototype.trimEndWithMaxLength=function(t){return this.length<=t?String(this):this.substr(0,t-1)+"…"},String.prototype.compareTo=function(t){return this>t?1:this<t?-1:0},String.hashCode=function(t){if(!t)return 0;const e=4294967291;let r=0,n=1;for(let o=0;o<t.length;o++){r=(r+n*(1506996573*t.charCodeAt(o)))%e,n=1345575271*n%e}return r=(r+n*(e-1))%e,Math.abs(0|r)},String.naturalOrderComparator=function(t,e){const r=/^\d+|^\D+/;let n,o,i,s;for(;;){if(!t)return e?-1:0;if(!e)return 1;if(n=t.match(r)[0],o=e.match(r)[0],i=!isNaN(n),s=!isNaN(o),i&&!s)return-1;if(s&&!i)return 1;if(i&&s){const t=n-o;if(t)return t;if(n.length!==o.length)return+n||+o?o.length-n.length:n.length-o.length}else if(n!==o)return n<o?-1:1;t=t.substring(n.length),e=e.substring(o.length)}},Number.toFixedIfFloating=function(t){if(!t||isNaN(t))return t;const e=Number(t);return e%1?e.toFixed(3):String(e)},function(){const t={value:function(t,e,r,n){function o(t,e,r){const n=t[e];t[e]=t[r],t[r]=n}const i=this[n];o(this,r,n);let s=e;for(let n=e;n<r;++n)t(this[n],i)<0&&(o(this,s,n),++s);return o(this,r,s),s},configurable:!0};Object.defineProperty(Array.prototype,"partition",t),Object.defineProperty(Uint32Array.prototype,"partition",t);const e={value:function(t,e,r,n,o){return 0===e&&r===this.length-1&&0===n&&o>=r?this.sort(t):function t(e,r,n,o,i,s){if(o<=n)return;const u=Math.floor(Math.random()*(o-n))+n,a=e.partition(r,n,o,u);i<a&&t(e,r,n,a-1,i,s),a<s&&t(e,r,a+1,o,i,s)}(this,t,e,r,n,o),this},configurable:!0};Object.defineProperty(Array.prototype,"sortRange",e),Object.defineProperty(Uint32Array.prototype,"sortRange",e)}(),Object.defineProperty(Array.prototype,"lowerBound",{value:function(t,e,r,n){e=e||function(t,e){return t<e?-1:t>e?1:0};let o=r||0,i=void 0!==n?n:this.length;for(;o<i;){const r=o+i>>1;e(t,this[r])>0?o=r+1:i=r}return i},configurable:!0}),Object.defineProperty(Array.prototype,"upperBound",{value:function(t,e,r,n){e=e||function(t,e){return t<e?-1:t>e?1:0};let o=r||0,i=void 0!==n?n:this.length;for(;o<i;){const r=o+i>>1;e(t,this[r])>=0?o=r+1:i=r}return i},configurable:!0}),Object.defineProperty(Uint32Array.prototype,"lowerBound",{value:Array.prototype.lowerBound,configurable:!0}),Object.defineProperty(Uint32Array.prototype,"upperBound",{value:Array.prototype.upperBound,configurable:!0}),Object.defineProperty(Int32Array.prototype,"lowerBound",{value:Array.prototype.lowerBound,configurable:!0}),Object.defineProperty(Int32Array.prototype,"upperBound",{value:Array.prototype.upperBound,configurable:!0}),Object.defineProperty(Float64Array.prototype,"lowerBound",{value:Array.prototype.lowerBound,configurable:!0}),Object.defineProperty(Array.prototype,"binaryIndexOf",{value:function(t,e){const r=this.lowerBound(t,e);return r<this.length&&0===e(t,this[r])?r:-1},configurable:!0}),Object.defineProperty(Array.prototype,"peekLast",{value:function(){return this[this.length-1]},configurable:!0}),function(){function t(t,e,r,n){const o=[];let i=0,s=0;for(;i<t.length&&s<e.length;){const u=r(t[i],e[s]);!n&&u||o.push(u<=0?t[i]:e[s]),u<=0&&i++,u>=0&&s++}if(n){for(;i<t.length;)o.push(t[i++]);for(;s<e.length;)o.push(e[s++])}return o}Object.defineProperty(Array.prototype,"intersectOrdered",{value:function(e,r){return t(this,e,r,!1)},configurable:!0}),Object.defineProperty(Array.prototype,"mergeOrdered",{value:function(e,r){return t(this,e,r,!0)},configurable:!0})}(),self.createPlainTextSearchRegex=function(t,e){let r="";for(let e=0;e<t.length;++e){const n=t.charAt(e);-1!=="^[]{}()\\.^$*+?|-,".indexOf(n)&&(r+="\\"),r+=n}return new RegExp(r,e||"")},Set.prototype.firstValue=function(){return this.size?this.values().next().value:null},Map.prototype.inverse=function(){return t(this)};class g{constructor(){this._map=new Map}set(t,e){let r=this._map.get(t);r||(r=new Set,this._map.set(t,r)),r.add(e)}get(t){return this._map.get(t)||new Set}has(t){return this._map.has(t)}hasValue(t,e){const r=this._map.get(t);return!!r&&r.has(e)}get size(){return this._map.size}delete(t,e){const r=this.get(t);if(!r)return!1;const n=r.delete(e);return r.size||this._map.delete(t),n}deleteAll(t){this._map.delete(t)}keysArray(){return[...this._map.keys()]}valuesArray(){const t=[];for(const e of this._map.values())t.push(...e.values());return t}clear(){this._map.clear()}}function d(t){"complete"===document.readyState||"interactive"===document.readyState?t():window.addEventListener("DOMContentLoaded",(function e(){window.removeEventListener("DOMContentLoaded",e,!1),t()}),!1)}self.suppressUnused=function(t){},self.setImmediate=function(t){const e=[...arguments].slice(1);return Promise.resolve().then(()=>t(...e)),0};const y=Symbol("singleton");self.singleton=function(t){if(y in t)return t[y];const e=new t;return t[y]=e,e},self.base64ToSize=function(t){if(!t)return 0;let e=3*t.length/4;return"="===t[t.length-1]&&e--,t.length>1&&"="===t[t.length-2]&&e--,e},self.unescapeCssString=function(t){return t.replace(/(?<!\\)\\(?:([a-fA-F0-9]{1,6})|(.))[\n\t\x20]?/gs,(t,e,r)=>{if(r)return r;const n=parseInt(e,16);return 55296<=n&&n<=57343||0===n||n>1114111?"�":String.fromCodePoint(n)})},self.Platform=self.Platform||{},Platform=Platform||{},Platform.Multimap=g;var b=Object.freeze({__proto__:null,removeElement:(t,e,r)=>{let n=t.indexOf(e);if(-1===n)return!1;if(r)return t.splice(n,1),!0;for(let r=n+1,o=t.length;r<o;++r)t[r]!==e&&(t[n++]=t[r]);return t.length=n,!0}});var m=Object.freeze({__proto__:null,isValid:t=>!isNaN(t.getTime()),toISO8601Compact:t=>{function e(t){return(t>9?"":"0")+t}return t.getFullYear()+e(t.getMonth()+1)+e(t.getDate())+"T"+e(t.getHours())+e(t.getMinutes())+e(t.getSeconds())}});function v(t,...e){return a(t,Array.prototype.slice.call(arguments,1))}function x(t){return t}class S{constructor(t){this._localizedFormat=t,this._tokenizedFormat=i(this._localizedFormat,u)}static _append(t,e){return t+e}format(t){return s(this._localizedFormat,arguments,u,"",S._append,this._tokenizedFormat).formattedResult}}const _=new WeakMap;var O=Object.freeze({__proto__:null,UIString:v,serializeUIString:function(t,e=[]){const r={messageParts:[t],values:e};return JSON.stringify(r)},deserializeUIString:function(t){return t?JSON.parse(t):{}},localize:x,UIStringFormat:S,ls:function(t,...e){if("string"==typeof t)return t;let r=_.get(t);return r||(r=t.join("%s"),_.set(t,r)),v(r,...e)}});var A=Object.freeze({__proto__:null,clamp:(t,e,r)=>{let n=t;return t<e?n=e:t>r&&(n=r),n},mod:(t,e)=>(t%e+e)%e,bytesToString:t=>{if(t<1e3)return v("%.0f B",t);const e=t/1e3;if(e<100)return v("%.1f kB",e);if(e<1e3)return v("%.0f kB",e);const r=e/1e3;return v(r<100?"%.1f MB":"%.0f MB",r)}});var C=Object.freeze({__proto__:null,addAll:function(t,e){for(const r of e)t.add(r)}});const{ls:w}=O;export{b as ArrayUtilities,m as DateUtilities,e as MapUtilities,g as Multimap,A as NumberUtilities,C as SetUtilities,h as StringUtilities,O as UIString,w as ls,d as runOnWindowLoad};
