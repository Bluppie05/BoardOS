const t={};(function(){var t=this||self;function r(r,i){r=r.split(".");var e,a=t;r[0]in a||void 0===a.execScript||a.execScript("var "+r[0]);for(;r.length&&(e=r.shift());)r.length||void 0===i?a=a[e]&&a[e]!==Object.prototype[e]?a[e]:a[e]={}:a[e]=i}function i(t,r){function i(){}i.prototype=r.prototype,t.prototype=new i,t.prototype.constructor=t,t.base=function(t,i,e){for(var a=Array(arguments.length-2),n=2;n<arguments.length;n++)a[n-2]=arguments[n];return r.prototype[i].apply(t,a)}}function e(t){if(Error.captureStackTrace)Error.captureStackTrace(this,e);else{const t=Error().stack;t&&(this.stack=t)}t&&(this.message=String(t))}function a(t,r){for(var i="",a=(t=t.split("%s")).length-1,n=0;n<a;n++)i+=t[n]+(n<r.length?r[n]:"%s");e.call(this,i+t[a])}function n(t,r){throw new a("Failure"+(t?": "+t:""),Array.prototype.slice.call(arguments,1))}i(e,Error),e.prototype.name="CustomError",i(a,e),a.prototype.name="AssertionError";var o=null;function s(t){var r=t.length,i=3*r/4;i%3?i=Math.floor(i):-1!="=.".indexOf(t[r-1])&&(i=-1!="=.".indexOf(t[r-2])?i-2:i-1);var e=new Uint8Array(i),a=0;return function(t,r){function i(r){for(;e<t.length;){var i=t.charAt(e++),a=o[i];if(null!=a)return a;if(!/^[\s\xa0]*$/.test(i))throw Error("Unknown base64 encoding at char: "+i)}return r}!function(){if(!o){o={};for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),r=["+/=","+/","-_=","-_.","-_"],i=0;5>i;i++)for(var e=t.concat(r[i].split("")),a=0;a<e.length;a++){var n=e[a];void 0===o[n]&&(o[n]=a)}}}();for(var e=0;;){var a=i(-1),n=i(0),s=i(64),c=i(64);if(64===c&&-1===a)break;r(a<<2|n>>4),64!=s&&(r(n<<4&240|s>>2),64!=c&&r(s<<6&192|c))}}(t,(function(t){e[a++]=t})),e.subarray(0,a)}function c(t){this.b=null,this.a=this.c=this.g=0,t&&h(this,t)}var f=[];function h(t,r){t.b=function(t){return t.constructor===Uint8Array?t:t.constructor===ArrayBuffer||"undefined"!=typeof Buffer&&t.constructor===Buffer||t.constructor===Array?new Uint8Array(t):t.constructor===String?s(t):(n("Type not convertible to Uint8Array."),new Uint8Array(0))}(r),t.g=0,t.c=t.b.length,t.a=t.g}function u(t){if(f.length){var r=f.pop();t&&h(r,t),t=r}else t=new c(t);this.a=t,this.g=this.a.a,this.b=this.c=-1,this.f=!1}function l(t){var r=t.a;if(r.a==r.c)return!1;if((r=t.f)||(r=0>(r=t.a).a||r.a>r.c),r)return n("Decoder hit an error"),!1;t.g=t.a.a;var i=t.a.f();return r=i>>>3,0!=(i&=7)&&5!=i&&1!=i&&2!=i&&3!=i&&4!=i?(n("Invalid wire type: %s (at position %s)",i,t.g),t.f=!0,!1):(t.c=r,t.b=i,!0)}function p(t){switch(t.b){case 0:if(0!=t.b)n("Invalid wire type for skipVarintField"),p(t);else{for(t=t.a;128&t.b[t.a];)t.a++;t.a++}break;case 1:1!=t.b?(n("Invalid wire type for skipFixed64Field"),p(t)):(t=t.a).a+=8;break;case 2:if(2!=t.b)n("Invalid wire type for skipDelimitedField"),p(t);else{var r=t.a.f();(t=t.a).a+=r}break;case 5:5!=t.b?(n("Invalid wire type for skipFixed32Field"),p(t)):(t=t.a).a+=4;break;case 3:for(r=t.c;;){if(!l(t)){n("Unmatched start-group tag: stream EOF"),t.f=!0;break}if(4==t.b){t.c!=r&&(n("Unmatched end-group tag"),t.f=!0);break}p(t)}break;default:n("Invalid wire encoding for field.")}}function b(){}c.prototype.reset=function(){this.a=this.g},c.prototype.f=function(){var t=this.b,r=t[this.a],i=127&r;return 128>r?(this.a+=1,i):(i|=(127&(r=t[this.a+1]))<<7,128>r?(this.a+=2,i):(i|=(127&(r=t[this.a+2]))<<14,128>r?(this.a+=3,i):(i|=(127&(r=t[this.a+3]))<<21,128>r?(this.a+=4,i):(i|=(15&(r=t[this.a+4]))<<28,128>r?(this.a+=5,i>>>0):(this.a+=5,128<=t[this.a++]&&128<=t[this.a++]&&128<=t[this.a++]&&128<=t[this.a++]&&this.a++,i)))))},c.prototype.h=c.prototype.f,u.prototype.reset=function(){this.a.reset(),this.b=this.c=-1};var v="function"==typeof Uint8Array,y=Object.freeze?Object.freeze([]):[];function d(t,r){if(r<t.c){r+=t.f;var i=t.a[r];return i===y?t.a[r]=[]:i}if(t.b)return(i=t.b[r])===y?t.b[r]=[]:i}function g(t){var r=t;t=k,r||(r=[]),this.f=-1,this.a=r;t:{if(r=this.a.length){--r;var i=this.a[r];if(!(null===i||"object"!=typeof i||"array"==function(t){var r=typeof t;if("object"==r){if(!t)return"null";if(t instanceof Array)return"array";if(t instanceof Object)return r;var i=Object.prototype.toString.call(t);if("[object Window]"==i)return"object";if("[object Array]"==i||"number"==typeof t.length&&void 0!==t.splice&&void 0!==t.propertyIsEnumerable&&!t.propertyIsEnumerable("splice"))return"array";if("[object Function]"==i||void 0!==t.call&&void 0!==t.propertyIsEnumerable&&!t.propertyIsEnumerable("call"))return"function"}else if("function"==r&&void 0===t.call)return"object";return r}(i)||v&&i instanceof Uint8Array)){this.c=r- -1,this.b=i;break t}}this.c=Number.MAX_VALUE}if(t)for(r=0;r<t.length;r++)if((i=t[r])<this.c)i+=-1,this.a[i]=this.a[i]||y;else{var e=this.c+-1;this.a[e]||(this.b=this.a[e]={}),this.b[i]=this.b[i]||y}}b.prototype.toString=function(){return this.a.toString()},i(g,b);var k=[1,3];r("parseClientVariations",(function(t){var r="";try{r=atob(t)}catch(t){}t=[];for(var i=0;i<r.length;i++)t.push(r.charCodeAt(i));for(r=new u(t),t=new g;l(r)&&4!=r.b;)switch(r.c){case 1:i=r.a.h(),d(t,1).push(i);break;case 3:i=r.a.h(),d(t,3).push(i);break;default:p(r)}return{variationIds:d(t,1),triggerVariationIds:d(t,3)}})),r("formatClientVariations",(function(t,r="Active client experiment variation IDs.",i="Active client experiment variation IDs that trigger server-side behavior."){const e=t.variationIds;t=t.triggerVariationIds;const a=["message ClientVariations {"];return e.length&&a.push("  // "+r,`  repeated int32 variation_id = [${e.join(", ")}];`),t.length&&a.push("  // "+i,`  repeated int32 trigger_variation_id = [${t.join(", ")}];`),a.push("}"),a.join("\n")}))}).call(t);const r=function(r){return t.parseClientVariations(r)},i=function(r){return t.formatClientVariations(r)};export{i as formatClientVariations,r as parseClientVariations};