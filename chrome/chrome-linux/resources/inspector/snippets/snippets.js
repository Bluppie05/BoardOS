import{Settings as e,ResourceType as t,Console as n,UIString as s}from"../common/common.js";import{PlatformFileSystem as i,FileSystemWorkspaceBinding as r}from"../persistence/persistence.js";import{RuntimeModel as p,ConsoleModel as o}from"../sdk/sdk.js";import{Context as c}from"../ui/ui.js";import{Workspace as a}from"../workspace/workspace.js";import{FilteredListWidget as u}from"../quick_open/quick_open.js";function l(e){return escape(e)}function g(e){return unescape(e)}class m extends i.PlatformFileSystem{constructor(){super("snippet://","snippets"),this._lastSnippetIdentifierSetting=e.Settings.instance().createSetting("scriptSnippets_lastIdentifier",0),this._snippetsSetting=e.Settings.instance().createSetting("scriptSnippets",[])}initialFilePaths(){return this._snippetsSetting.get().map(e=>l(e.name))}async createFile(e,t){const n=this._lastSnippetIdentifierSetting.get()+1;this._lastSnippetIdentifierSetting.set(n);const s=ls`Script snippet #${n}`,i=this._snippetsSetting.get();return i.push({name:s,content:""}),this._snippetsSetting.set(i),l(s)}async deleteFile(e){const t=g(e.substring(1)),n=this._snippetsSetting.get(),s=n.filter(e=>e.name!==t);return n.length!==s.length&&(this._snippetsSetting.set(s),!0)}async requestFileContent(e){const t=g(e.substring(1)),n=this._snippetsSetting.get().find(e=>e.name===t);return n?{content:n.content,isEncoded:!1}:{content:null,isEncoded:!1,error:`A snippet with name '${t}' was not found`}}async setFileContent(e,t,n){const s=g(e.substring(1)),i=this._snippetsSetting.get(),r=i.find(e=>e.name===s);return!!r&&(r.content=t,this._snippetsSetting.set(i),!0)}renameFile(e,t,n){const s=g(e.substring(1)),i=this._snippetsSetting.get(),r=i.find(e=>e.name===s);t=t.trim(),r&&0!==t.length&&!i.find(e=>e.name===t)?(r.name=t,this._snippetsSetting.set(i),n(!0,t)):n(!1)}async searchInPath(e,t){const n=new RegExp(e.escapeForRegExp(),"i");return this._snippetsSetting.get().filter(e=>e.content.match(n)).map(e=>"snippet:///"+l(e.name))}mimeFromPath(e){return"text/javascript"}contentType(e){return t.resourceTypes.Script}tooltipForURL(e){return ls`Linked to ${g(e.substring(this.path().length))}`}supportsAutomapping(){return!0}}async function d(e){if(!e.url().startsWith("snippet://"))return;const t=c.Context.instance().flavor(p.ExecutionContext);if(!t)return;const s=t.runtimeModel;await e.requestContent(),e.commitWorkingCopy();const i=e.workingCopy();n.Console.instance().show();const r=e.url(),a=await t.evaluate({expression:`${i}\n//# sourceURL=${r}`,objectGroup:"console",silent:!1,includeCommandLineAPI:!0,returnByValue:!1,generatePreview:!0,replMode:!0},!1,!0);if("exceptionDetails"in a&&a.exceptionDetails)return void o.ConsoleModel.instance().addMessage(o.ConsoleMessage.fromException(s,a.exceptionDetails,void 0,void 0,r));if(!("object"in a)||!a.object)return;const u=t.debuggerModel.scriptsForSourceURL(r);if(u.length<1)return;const l=u[u.length-1].scriptId;o.ConsoleModel.instance().addMessage(new o.ConsoleMessage(s,o.MessageSource.JS,o.MessageLevel.Info,"",o.MessageType.Result,r,void 0,void 0,[a.object],void 0,void 0,t.id,l))}function S(){const e=a.WorkspaceImpl.instance().projectsForType(a.projectTypes.FileSystem).find(e=>"snippets"===r.FileSystemWorkspaceBinding.fileSystemType(e));if(!e)throw new Error("Unable to find workspace project for the snippets file system");return e}var h=Object.freeze({__proto__:null,SnippetFileSystem:m,evaluateScriptSnippet:d,isSnippetsUISourceCode:function(e){return e.url().startsWith("snippet://")},isSnippetsProject:function(e){return e.type()===a.projectTypes.FileSystem&&"snippets"===r.FileSystemWorkspaceBinding.fileSystemType(e)},findSnippetsProject:S,Snippet:void 0});class f extends u.Provider{constructor(){super(),this._snippets=[]}selectItem(e,t){null!==e&&d(this._snippets[e])}notFoundText(e){return s.UIString("No snippets found.")}attach(){this._snippets=S().uiSourceCodes()}detach(){this._snippets=[]}itemCount(){return this._snippets.length}itemKeyAt(e){return this._snippets[e].name()}renderItem(e,t,n,s){n.textContent=unescape(this._snippets[e].name()),n.classList.add("monospace"),u.FilteredListWidget.highlightRanges(n,t,!0)}}var _=Object.freeze({__proto__:null,SnippetsQuickOpen:f});export{h as ScriptSnippetFileSystem,_ as SnippetsQuickOpen};