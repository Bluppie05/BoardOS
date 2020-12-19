import{ObjectWrapper as e,EventTarget as s,Revealer as t}from"../common/common.js";import{SDKModel as r,IssuesModel as n,FrameManager as i,Issue as a,LogModel as o,ConsoleModel as d,RuntimeModel as u,NetworkLog as c,NetworkRequest as h,Cookie as l}from"../sdk/sdk.js";let g=null;class m extends e.ObjectWrapper{constructor(){super(),this._eventListeners=new WeakMap,r.TargetManager.instance().observeModels(n.IssuesModel,this),this._issues=new Map,this._filteredIssues=new Map,this._hasSeenTopFrameNavigated=!1,i.FrameManager.instance().addEventListener(i.Events.TopFrameNavigated,this._onTopFrameNavigated,this),i.FrameManager.instance().addEventListener(i.Events.FrameAddedToTarget,this._onFrameAddedToTarget,this),this._showThirdPartySettingsChangeListener=null}static instance({forceNew:e}={forceNew:!1}){return g&&!e||(g=new m),g}reloadForAccurateInformationRequired(){return!this._hasSeenTopFrameNavigated}_onTopFrameNavigated(e){const{frame:s}=e.data,t=new Map;for(const[e,r]of this._issues.entries())r.isAssociatedWithRequestId(s.loaderId)&&t.set(e,r);this._issues=t,this._hasSeenTopFrameNavigated=!0,this._updateFilteredIssues()}_onFrameAddedToTarget(e){const{frame:s}=e.data;s.isTopFrame()&&this._updateFilteredIssues()}modelAdded(e){const s=e.addEventListener(n.Events.IssueAdded,this._issueAdded,this);this._eventListeners.set(e,s)}modelRemoved(e){const t=this._eventListeners.get(e);t&&s.EventTarget.removeEventListeners([t])}_issueAdded(e){const{issuesModel:s,issue:t}=e.data;if(!t.getDescription())return;const r=t.primaryKey();this._issues.has(r)||(this._issues.set(r,t),this._issueFilter(t)&&(this._filteredIssues.set(r,t),this.dispatchEventToListeners(f.IssueAdded,{issuesModel:s,issue:t})),this.dispatchEventToListeners(f.IssuesCountUpdated))}issues(){return this._filteredIssues.values()}numberOfIssues(){return this._filteredIssues.size}numberOfAllStoredIssues(){return this._issues.size}_issueFilter(e){if(!this._showThirdPartySettingsChangeListener){const e=a.getShowThirdPartyIssuesSetting();this._showThirdPartySettingsChangeListener=e.addChangeListener(()=>{this._updateFilteredIssues()})}return a.getShowThirdPartyIssuesSetting().get()||!e.isCausedByThirdParty()}_updateFilteredIssues(){this._filteredIssues.clear(),this._issues.forEach((e,s)=>{this._issueFilter(e)&&this._filteredIssues.set(s,e)}),this.dispatchEventToListeners(f.FullUpdateRequired),this.dispatchEventToListeners(f.IssuesCountUpdated)}}const f={IssuesCountUpdated:Symbol("IssuesCountUpdated"),IssueAdded:Symbol("IssueAdded"),FullUpdateRequired:Symbol("FullUpdateRequired")};var _=Object.freeze({__proto__:null,IssuesManager:m,Events:f});const v=new WeakMap;class p{constructor(){r.TargetManager.instance().observeModels(o.LogModel,this)}modelAdded(e){const s=[];s.push(e.addEventListener(o.Events.EntryAdded,this._logEntryAdded,this)),v.set(e,s)}modelRemoved(e){const t=v.get(e);t&&s.EventTarget.removeEventListeners(t)}_logEntryAdded(e){const s=e.data,t=s.logModel.target(),n=new d.ConsoleMessage(t.model(u.RuntimeModel),s.entry.source,s.entry.level,s.entry.text,void 0,s.entry.url,s.entry.lineNumber,void 0,[s.entry.text,...s.entry.args||[]],s.entry.stackTrace,s.entry.timestamp,void 0,void 0,s.entry.workerId);if(s.entry.networkRequestId&&c.NetworkLog.instance().associateConsoleMessageWithRequest(n,s.entry.networkRequestId),n.source===d.MessageSource.Worker){const e=n.workerId||"";if(r.TargetManager.instance().targetById(e))return;setTimeout(()=>{r.TargetManager.instance().targetById(e)||d.ConsoleModel.instance().addMessage(n)},1e3)}else d.ConsoleModel.instance().addMessage(n)}}var I=Object.freeze({__proto__:null,LogManager:p});function y(e,s){if(s instanceof h.NetworkRequest)return function(e,s){return e.filter(e=>{for(const t of e.requests())if(t.requestId===s.requestId())return!0;return!1})}(e,s);if(s instanceof l.Cookie)return function(e,s,t,r){return e.filter(e=>{for(const n of e.cookies())if(n.domain===s&&n.name===t&&n.path===r)return!0;return!1})}(e,s.domain(),s.name(),s.path());throw new Error("issues can not be associated with "+JSON.stringify(s))}var T=Object.freeze({__proto__:null,IssuesAssociatable:void 0,issuesAssociatedWith:y,hasIssues:function(e){return y(Array.from(m.instance().issues()),e).length>0},hasIssueOfCategory:function(e,s){return y(Array.from(m.instance().issues()),e).some(e=>e.getCategory()===s)},reveal:async function(e,s){const r=y(Array.from(m.instance().issues()),e).filter(e=>!s||e.getCategory()===s);if(r.length>0)return t.reveal(r[0])}});const M=new p;m.instance();export{_ as IssuesManager,I as LogManager,T as RelatedIssue,M as logManager};