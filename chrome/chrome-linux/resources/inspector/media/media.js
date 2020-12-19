import{DataGrid as e}from"../data_grid/data_grid.js";import{JSONView as t}from"../source_frame/source_frame.js";import{UIUtils as s,Widget as i,Utils as a,Toolbar as r,ListModel as n,SoftDropDown as o,TabbedPane as l,TreeOutline as d,Icon as h,ContextMenu as c,Panel as _}from"../ui/ui.js";import{SDKModel as m}from"../sdk/sdk.js";import{Color as u,Settings as p,ObjectWrapper as g,UIString as v}from"../common/common.js";import{Platform as y}from"../host/host.js";import{FlameChart as b}from"../perf_ui/perf_ui.js";import{ThemeSupport as E}from"../theme_support/theme_support.js";const w={Timestamp:"displayTimestamp",Event:"event",Value:"value"};class f extends e.DataGridNode{constructor(e){super(e,!1),this._expandableElement=null}createCell(e){const i=this.createTD(e),a=this.data[e];if(e===w.Value){const e=i.createChild("div","event-display-table-contents-json-wrapper");this._expandableElement=new t.JSONView(new t.ParsedJSON(a,"",""),!0),this._expandableElement.markAsRoot(),this._expandableElement.show(e)}else i.classList.add("event-display-table-basic-text-table-entry"),s.createTextChild(i,a);return i}}class T extends i.VBox{constructor(){super(),this.registerRequiredCSS("media/eventDisplayTable.css",{enableLegacyPatching:!0}),this.contentElement.classList.add("event-display-table-contents-table-container"),this._dataGrid=this._createDataGrid([{id:w.Timestamp,title:ls`Timestamp`,weight:1,sortable:!1},{id:w.Event,title:ls`Event name`,weight:2,sortable:!1},{id:w.Value,title:ls`Value`,weight:7,sortable:!1}]),this._firstEventTime=0,this._dataGrid.setStriped(!0),this._dataGrid.asWidget().show(this.contentElement)}_createDataGrid(t){const s=[];for(const e of t)s.push(T._convertToGridDescriptor(e));const i=new e.DataGridImpl({displayName:ls`Event display`,columns:s,deleteCallback:void 0,editCallback:void 0,refreshCallback:void 0});return i.asWidget().contentElement.classList.add("no-border-top-datagrid"),i}onEvent(e){0===this._firstEventTime&&"number"==typeof e.timestamp&&(this._firstEventTime=e.timestamp);const t=(e=this._subtractFirstEventTime(e)).value;try{const s=JSON.parse(t);e.event=s.event,delete s.event,e.value=s;const i=new f(e),a=this._dataGrid.scrollContainer,r=a.scrollTop===a.scrollHeight-a.offsetHeight;this._dataGrid.rootNode().appendChild(i),r&&(a.scrollTop=a.scrollHeight)}catch(e){}}_subtractFirstEventTime(e){return"number"==typeof e.timestamp&&(e.displayTimestamp=(e.timestamp-this._firstEventTime).toFixed(3)),e}static _convertToGridDescriptor(t){return{id:t.id,title:t.title,sortable:t.sortable,weight:t.weight||0,sort:e.Order.Ascending}}}var P=Object.freeze({__proto__:null,EventDisplayColumnConfig:void 0,MediaEventColumnKeys:w,EventNode:f,PlayerEventsView:T});const k={PlayerPropertiesChanged:Symbol("PlayerPropertiesChanged"),PlayerEventsAdded:Symbol("PlayerEventsAdded"),PlayerMessagesLogged:Symbol("PlayerMessagesLogged"),PlayerErrorsRaised:Symbol("PlayerErrorsRaised"),PlayersCreated:Symbol("PlayersCreated")};class S extends m.SDKModel{constructor(e){super(e),this._enabled=!1,this._agent=e.mediaAgent(),e.registerMediaDispatcher(this)}async resumeModel(){if(!this._enabled)return Promise.resolve();await this._agent.invoke_enable()}ensureEnabled(){this._agent.invoke_enable(),this._enabled=!0}playerPropertiesChanged(e){this.dispatchEventToListeners(k.PlayerPropertiesChanged,e)}playerEventsAdded(e){this.dispatchEventToListeners(k.PlayerEventsAdded,e)}playerMessagesLogged(e){this.dispatchEventToListeners(k.PlayerMessagesLogged,e)}playerErrorsRaised(e){this.dispatchEventToListeners(k.PlayerErrorsRaised,e)}playersCreated({players:e}){this.dispatchEventToListeners(k.PlayersCreated,e)}}m.SDKModel.register(S,m.Capability.DOM,!1);var M=Object.freeze({__proto__:null,PlayerEvent:void 0,ProtocolTriggers:k,MediaModel:S});function x(e,t){const s=Math.pow(10,3-t),i=Math.pow(10,Math.max(0,t));return Math.round(e/s)/i+" s"}class D{constructor(e,t,s,i){this._min=e,this._max=t,this._low=this._min,this._high=this._max,this._maxRange=s,this._minRange=i}get low(){return this._low}get high(){return this._high}get min(){return this._min}get max(){return this._max}get range(){return this._high-this._low}_reassertBounds(){let e=!0;for(;e;){if(e=!1,this.range<this._minRange){e=!0;const t=(this._minRange-this.range)/2;this._high+=t,this._low-=t}this._low<this._min&&(e=!0,this._low=this._min),this._high>this._max&&(e=!0,this._high=this._max)}}zoomOut(e,t){const s=this._high-this._low,i=s*Math.pow(1.1,e)-s,a=i*t,r=i-a;this._low-=a,this._high+=r,this._reassertBounds()}zoomIn(e,t){const s=this._high-this._low;if(this.range<=this._minRange)return;const i=s-s/Math.pow(1.1,e),a=i*t,r=i-a;this._low+=a,this._high-=r,this._reassertBounds()}addMax(e){const t=this._high-this._low,s=this._high===this._max,i=this._low===this._min||t>=this._maxRange;this._max+=e,s&&i&&(this._high=this._max),this._reassertBounds()}pushMaxAtLeastTo(e){return this._max<e&&(this.addMax(e-this._max),!0)}}var C=Object.freeze({__proto__:null,FormatMillisecondsToSeconds:x,Bounds:D});const L="11px "+y.fontFamily(),I=E.instance().patchColorText("#444",E.ColorUsage.Foreground),V={height:20,padding:2,collapsible:!1,font:L,color:I,backgroundColor:"rgba(100 0 0 / 10%)",nestingLevel:0,itemsHeight:20,shareHeaderLine:!1,useFirstLineForOverview:!1,useDecoratorsForOverview:!1},F=["#ffba08","#faa307","#f48c06","#e85d04","#dc2f02","#d00000","#9d0208"],N=["#7400b8","#6930c3","#5e60ce","#5390d9","#4ea8de","#48bfe3","#56cfe1","#64dfdf"];function B(e){const t=u.Color.parse(e);return t&&t.hsla()[2]<.5?"#eee":"#444"}class R{constructor(e,t,s={color:void 0,duration:void 0,hoverData:{},level:0,name:"",startTime:0}){this._timelineData=e,this._setLive=t.setLive,this._setComplete=t.setComplete,this._updateMaxTime=t.updateMaxTime,this._selfIndex=this._timelineData.entryLevels.length,this._live=!1;const i=void 0===s.duration?0:s.duration;this._timelineData.entryLevels.push(s.level||0),this._timelineData.entryStartTimes.push(s.startTime||0),this._timelineData.entryTotalTimes.push(i),-1===i&&(this.endTime=-1),this._title=s.name||"",this._color=s.color||F[0],this._fontColor=B(this._color),this._hoverData=s.hoverData||{}}decorate(e){e.createChild("span").textContent="Name: "+this._title,e.createChild("br");const t=x(this.startTime,2);if(this._live)e.createChild("span").textContent=`Duration: ${t} - LIVE!`;else if(isNaN(this.duration))e.createChild("span").textContent="Time: "+t;else{const s=x(this.duration+this.startTime,2);e.createChild("span").textContent=`Duration: ${t} - ${s}`}}set endTime(e){if(-1===e)this._timelineData.entryTotalTimes[this._selfIndex]=this._setLive(this._selfIndex),this._live=!0;else{this._live=!1;const t=e-this._timelineData.entryStartTimes[this._selfIndex];this._timelineData.entryTotalTimes[this._selfIndex]=t,this._setComplete(this._selfIndex),this._updateMaxTime(e)}}get id(){return this._selfIndex}set level(e){this._timelineData.entryLevels[this._selfIndex]=e}set title(e){this._title=e}get title(){return this._title}set color(e){this._color=e,this._fontColor=B(this._color)}get color(){return this._color}get fontColor(){return this._fontColor}get startTime(){return this._timelineData.entryStartTimes[this._selfIndex]}get duration(){return this._timelineData.entryTotalTimes[this._selfIndex]}get live(){return this._live}}class A extends i.VBox{constructor(){super(),this._intervalTimer=0,this._lastTimestamp=0,this._canTick=!0,this._ticking=!1,this._isShown=!1,this._bounds=new D(0,1e3,3e4,1e3),this._dataProvider=new U(this._bounds,this._updateMaxTime.bind(this)),this._delegate=new O,this._chartGroupExpansionSetting=p.Settings.instance().createSetting("mediaFlameChartGroupExpansion",{}),this._chart=new b.FlameChart(this._dataProvider,this._delegate,this._chartGroupExpansionSetting),this._chart.disableRangeSelection(),this._chart.bindCanvasEvent("wheel",e=>{this._onScroll(e)}),this._chart.show(this.contentElement)}addMarker(e){e.duration=NaN,this.startEvent(e)}startEvent(e){void 0===e.duration&&(e.duration=-1);const t=e.startTime||0,s=this._dataProvider.startEvent(e);return this._updateMaxTime(t),s}addGroup(e,t){this._dataProvider.addGroup(e,t)}_updateMaxTime(e){this._bounds.pushMaxAtLeastTo(e)&&this._updateRender()}_onScroll(e){const t=Math.round(e.deltaY/50),s=e.offsetX/e.srcElement.clientWidth;t>0?this._bounds.zoomOut(t,s):this._bounds.zoomIn(-t,s),this._updateRender()}willHide(){this._isShown=!1,this._ticking&&this._stop()}wasShown(){this._isShown=!0,this._canTick&&!this._ticking&&this._start()}set canTick(e){this._canTick=e,this._ticking&&!e&&this._stop(),!this._ticking&&this._isShown&&e&&this._start()}_start(){0===this._lastTimestamp&&(this._lastTimestamp=Date.now()),0!==this._intervalTimer||this._stoppedPermanently||(this._intervalTimer=window.setInterval(this._updateRender.bind(this),16),this._ticking=!0)}_stop(e=!1){window.clearInterval(this._intervalTimer),this._intervalTimer=0,e&&(this._stoppedPermanently=!0),this._ticking=!1}_updateRender(){if(this._ticking){const e=Date.now(),t=e-this._lastTimestamp;this._lastTimestamp=e,this._bounds.addMax(t)}this._dataProvider.updateMaxTime(this._bounds),this._chart.setWindowTimes(this._bounds.low,this._bounds.high,!0),this._chart.scheduleUpdate()}}class O{constructor(){}windowChanged(e,t,s){}updateRangeSelection(e,t){}updateSelectedGroup(e,t){}}class U{constructor(e,t){this._updateMaxTimeHandle=t,this._bounds=e,this._liveEvents=new Set,this._eventMap=new Map,this._timelineData=new b.TimelineData([],[],[],[]),this._maxLevel=0}addGroup(e,t){this._timelineData.groups&&this._timelineData.groups.push({name:e,startLevel:this._maxLevel,expanded:!0,selectable:!1,style:V}),this._maxLevel+=t}startEvent(e){if(e.level=e.level||0,e.level>this._maxLevel)throw`level ${e.level} is above the maximum allowed of ${this._maxLevel}`;const t=new R(this._timelineData,{setLive:this._setLive.bind(this),setComplete:this._setComplete.bind(this),updateMaxTime:this._updateMaxTimeHandle},e);return this._eventMap.set(t.id,t),t}_setLive(e){return this._liveEvents.add(e),this._bounds.max}_setComplete(e){this._liveEvents.delete(e)}updateMaxTime(e){this._bounds=e;for(const e of this._liveEvents.entries())this._eventMap.get(e[0]).endTime=-1}maxStackDepth(){return this._maxLevel+1}timelineData(){return this._timelineData}minimumBoundary(){return this._bounds.low}totalTime(){return this._bounds.high}entryColor(e){return this._eventMap.get(e).color}textColor(e){return this._eventMap.get(e).fontColor}entryTitle(e){return this._eventMap.get(e).title}entryFont(e){return L}decorateEntry(e,t,s,i,a,r,n,o,l){return!1}forceDecoration(e){return!1}prepareHighlightedEntryInfo(e){const t=document.createElement("div");return this._eventMap.get(e).decorate(t),t}formatValue(e,t){return e+=Math.round(this._bounds.low),this._bounds.range<2800?x(e,2):this._bounds.range<3e4?x(e,1):x(e,0)}canJumpToEntry(e){return!1}navStartTimes(){return new Map}}var G=Object.freeze({__proto__:null,HotColorScheme:F,ColdColorScheme:N,EventProperties:void 0,Event:R,TickingFlameChart:A});class H extends A{constructor(){super(),this._normalizedTimestamp=-1.5,this.addGroup("Playback Status",2),this.addGroup("Buffering Status",2),this._playbackStatusLastEvent=null,this._audioBufferingStateEvent=null,this._videoBufferingStateEvent=null}_ensureNoPreviousPlaybackEvent(e){null!==this._playbackStatusLastEvent&&(this._playbackStatusLastEvent.endTime=e,this._playbackStatusLastEvent=null)}_onPlaybackEvent(e,t){switch(e.event){case"kPlay":this.canTick=!0,this._ensureNoPreviousPlaybackEvent(t),this._playbackStatusLastEvent=this.startEvent({level:0,startTime:t,name:"Play"});break;case"kPause":this._ensureNoPreviousPlaybackEvent(t),this._playbackStatusLastEvent=this.startEvent({level:0,startTime:t,name:"Pause",color:F[1]});break;case"kWebMediaPlayerDestroyed":this.canTick=!1,this._ensureNoPreviousPlaybackEvent(t),this.addMarker({level:1,startTime:t,name:"Destroyed",color:F[4]});break;case"kSuspended":this.canTick=!1,this._ensureNoPreviousPlaybackEvent(t),this._playbackStatusLastEvent=this.startEvent({level:1,startTime:t,name:"Suspended",color:F[3]});break;case"kEnded":this._ensureNoPreviousPlaybackEvent(t),this._playbackStatusLastEvent=this.startEvent({level:1,startTime:t,name:"Ended",color:F[2]});break;default:throw"_onPlaybackEvent cant handle "+e.event}}_bufferedEnough(e){return"BUFFERING_HAVE_ENOUGH"===e.state}_onBufferingStatus(e,t){let s=null,i=null;switch(e.event){case"kBufferingStateChanged":s=e.value.audio_buffering_state,i=e.value.video_buffering_state,s&&(null!==this._audioBufferingStateEvent&&(this._audioBufferingStateEvent.endTime=t,this._audioBufferingStateEvent=null),this._bufferedEnough(s)||(this._audioBufferingStateEvent=this.startEvent({level:3,startTime:t,name:"Audio Buffering",color:N[1]}))),i&&(null!==this._videoBufferingStateEvent&&(this._videoBufferingStateEvent.endTime=t,this._videoBufferingStateEvent=null),this._bufferedEnough(i)||(this._videoBufferingStateEvent=this.startEvent({level:2,startTime:t,name:"Video Buffering",color:N[0]})));break;default:throw"_onPlaybackEvent cant handle "+e.event}}onEvent(e){-1.5===this._normalizedTimestamp&&(this._normalizedTimestamp=Number(e.timestamp));const t=1e3*(Number(e.timestamp)-this._normalizedTimestamp);switch(e.event){case"kPlay":case"kPause":case"kWebMediaPlayerDestroyed":case"kSuspended":case"kEnded":return this._onPlaybackEvent(e,t);case"kBufferingStateChanged":return this._onBufferingStatus(e,t)}}}const z=1,j=2,$=4,W=8,J=7,K=15;class q extends g.ObjectWrapper{constructor(e,t){super(),this._items=e,this._view=t,this._itemMap=new Map,this._hiddenLevels=[],this._bitFieldValue=J,this._savedBitFieldValue=J,this._defaultTitle=ls`Default`,this._customTitle=ls`Custom`,this._allTitle=ls`All`,this.elementsForItems=new WeakMap}defaultTitle(){return this._defaultTitle}setDefault(e){e.selectItem(this._items.at(0))}populate(){this._items.insert(this._items.length,{title:this._defaultTitle,overwrite:!0,stringValue:"",value:J,selectable:void 0}),this._items.insert(this._items.length,{title:this._allTitle,overwrite:!0,stringValue:"",value:K,selectable:void 0}),this._items.insert(this._items.length,{title:ls`Error`,overwrite:!1,stringValue:"error",value:z,selectable:void 0}),this._items.insert(this._items.length,{title:ls`Warning`,overwrite:!1,stringValue:"warning",value:j,selectable:void 0}),this._items.insert(this._items.length,{title:ls`Info`,overwrite:!1,stringValue:"info",value:$,selectable:void 0}),this._items.insert(this._items.length,{title:ls`Debug`,overwrite:!1,stringValue:"debug",value:W,selectable:void 0})}_updateCheckMarks(){this._hiddenLevels=[];for(const[e,t]of this._itemMap)if(!t.overwrite){const i=this.elementsForItems.get(t);i&&i.firstChild&&i.firstChild.remove(),i&&e&this._bitFieldValue?s.createTextChild(i.createChild("div"),"✓"):this._hiddenLevels.push(t.stringValue)}}titleFor(e){if(e.overwrite?this._bitFieldValue=e.value:this._bitFieldValue^=e.value,this._bitFieldValue===J)return this._defaultTitle;if(this._bitFieldValue===K)return this._allTitle;const t=this._itemMap.get(this._bitFieldValue);return t?t.title:this._customTitle}createElementForItem(e){const t=document.createElement("div"),i=a.createShadowRootWithCoreStyles(t,{cssFile:"media/playerMessagesView.css",enableLegacyPatching:!0,delegatesFocus:void 0}).createChild("div","media-messages-level-dropdown-element"),r=i.createChild("div","media-messages-level-dropdown-checkbox"),n=i.createChild("span","media-messages-level-dropdown-text");return s.createTextChild(n,e.title),this.elementsForItems.set(e,r),this._itemMap.set(e.value,e),this._updateCheckMarks(),this._view.regenerateMessageDisplayCss(this._hiddenLevels),t}isItemSelectable(e){return!0}itemSelected(e){this._updateCheckMarks(),this._view.regenerateMessageDisplayCss(this._hiddenLevels)}highlightedItemChanged(e,t,s,i){}}class Y extends i.VBox{constructor(){super(),this.registerRequiredCSS("media/playerMessagesView.css",{enableLegacyPatching:!0}),this._headerPanel=this.contentElement.createChild("div","media-messages-header"),this._bodyPanel=this.contentElement.createChild("div","media-messages-body"),this._buildToolbar()}_buildToolbar(){const e=new r.Toolbar("media-messages-toolbar",this._headerPanel);e.appendText(ls`Log level:`),e.appendToolbarItem(this._createDropdown()),e.appendSeparator(),e.appendToolbarItem(this._createFilterInput())}_createDropdown(){const e=new n.ListModel;this._messageLevelSelector=new q(e,this);const t=new o.SoftDropDown(e,this._messageLevelSelector);t.setRowHeight(18),this._messageLevelSelector.populate(),this._messageLevelSelector.setDefault(t);const s=new r.ToolbarItem(t.element);return s.element.classList.add("toolbar-has-dropdown"),s.setEnabled(!0),s.setTitle(this._messageLevelSelector.defaultTitle()),s}_createFilterInput(){const e=new r.ToolbarInput(ls`Filter log messages`);return e.addEventListener(r.ToolbarInput.Event.TextChanged,e=>{this._filterByString(e)},this),e}regenerateMessageDisplayCss(e){const t=this._bodyPanel.getElementsByClassName("media-messages-message-container");for(const s of t)this._matchesHiddenLevels(s,e)?s.classList.add("media-messages-message-unselected"):s.classList.remove("media-messages-message-unselected")}_matchesHiddenLevels(e,t){for(const s of t)if(e.classList.contains("media-message-"+s))return!0;return!1}_filterByString(e){const t=e.data,s=this._bodyPanel.getElementsByClassName("media-messages-message-container");for(const e of s)""===t||e.textContent&&e.textContent.includes(t)?e.classList.remove("media-messages-message-filtered"):e.classList.add("media-messages-message-filtered")}addMessage(e){const t=this._bodyPanel.createChild("div","media-messages-message-container media-message-"+e.level);s.createTextChild(t,e.message)}}const X={kResolution:"kResolution",kTotalBytes:"kTotalBytes",kBitrate:"kBitrate",kMaxDuration:"kMaxDuration",kStartTime:"kStartTime",kIsVideoEncrypted:"kIsVideoEncrypted",kIsStreaming:"kIsStreaming",kFrameUrl:"kFrameUrl",kFrameTitle:"kFrameTitle",kIsSingleOrigin:"kIsSingleOrigin",kIsRangeHeaderSupported:"kIsRangeHeaderSupported",kVideoDecoderName:"kVideoDecoderName",kAudioDecoderName:"kAudioDecoderName",kIsPlatformVideoDecoder:"kIsPlatformVideoDecoder",kIsPlatformAudioDecoder:"kIsPlatformAudioDecoder",kIsVideoDecryptingDemuxerStream:"kIsVideoDecryptingDemuxerStream",kIsAudioDecryptingDemuxerStream:"kIsAudioDecryptingDemuxerStream",kAudioTracks:"kAudioTracks",kTextTracks:"kTextTracks",kVideoTracks:"kVideoTracks",kFramerate:"kFramerate",kVideoPlaybackRoughness:"kVideoPlaybackRoughness"};class Q extends i.VBox{constructor(e){super(),this.contentElement.classList.add("media-property-renderer"),this._title=this.contentElement.createChild("span","media-property-renderer-title"),this._contents=this.contentElement.createChild("span","media-property-renderer-contents"),s.createTextChild(this._title,e),this._title=e,this._value=null,this._pseudo_color_protection_element=null,this.contentElement.classList.add("media-property-renderer-hidden")}updateData(e,t){if(""===t||null===t)return this._updateData(e,null);try{t=JSON.parse(t)}catch(e){}return this._updateData(e,t)}_updateData(e,t){if(null===t)this.changeContents(null);else{if(this._value===t)return;this._value=t,this.changeContents(t)}}changeContents(e){if(null===e)this.contentElement.classList.add("media-property-renderer-hidden"),null===this._pseudo_color_protection_element&&(this._pseudo_color_protection_element=document.createElement("div"),this._pseudo_color_protection_element.classList.add("media-property-renderer"),this._pseudo_color_protection_element.classList.add("media-property-renderer-hidden"),this.contentElement.parentNode.insertBefore(this._pseudo_color_protection_element,this.contentElement));else{null!==this._pseudo_color_protection_element&&(this._pseudo_color_protection_element.remove(),this._pseudo_color_protection_element=null),this.contentElement.classList.remove("media-property-renderer-hidden"),this._contents.removeChildren();const t=document.createElement("span");t.textContent=e,this._contents.appendChild(t)}}}class Z extends Q{constructor(e,t){super(v.UIString(e)),this._formatfunction=t}_updateData(e,t){null===t?this.changeContents(null):this.changeContents(this._formatfunction(t))}}class ee extends Q{constructor(e,t){super(v.UIString(e)),this.changeContents(t)}}class te extends i.VBox{constructor(e){super(),this.contentElement.classList.add("media-attributes-view");for(const t of e)t.show(this.contentElement)}}class se{constructor(e,t){this._type=t,this._view=e}updateData(e,t){const s=this._view.GetTabs(this._type),i=JSON.parse(t);let a=1;for(const e of i)this.addNewTab(s,e,a),a++}addNewTab(e,t,s){const i=[];for(const[e,s]of Object.entries(t))i.push(new ee(e,s));const a=new te(i);e.addNewTab(s,a)}}class ie extends se{constructor(e){super(e,"video")}}class ae extends se{constructor(e){super(e,"text")}}class re extends se{constructor(e){super(e,"audio")}}const ne={Video:v.UIString("Video"),Audio:v.UIString("Audio")};class oe extends l.TabbedPane{constructor(e,t=ls`Track`){super(),this._decoderName=e,this._trackName=t}addNewTab(e,t){const s=v.UIString("track");this.appendTab("Track"+e,`${this._trackName} #${e}`,t,`${this._decoderName} ${s} #${e}`)}}class le extends oe{constructor(e,t){super(e);const s=`${e} ${v.UIString("Decoder")}`,i=`${s} ${v.UIString("Properties")}`;this.appendTab("DecoderProperties",s,t,i)}}class de extends i.VBox{constructor(e,t){super(),this._isPlaceholder=!0,this._wrapping=e,this._wrapping.appendTab("_placeholder",t,new i.VBox,t),this._wrapping.show(this.contentElement)}addNewTab(e,t){this._isPlaceholder&&(this._wrapping.closeTab("_placeholder"),this._isPlaceholder=!1),this._wrapping.addNewTab(e,t)}}class he extends i.VBox{constructor(){super(),this.contentElement.classList.add("media-properties-frame"),this.registerRequiredCSS("media/playerPropertiesView.css",{enableLegacyPatching:!0}),this._mediaElements=[],this._videoDecoderElements=[],this._audioDecoderElements=[],this._textTrackElements=[],this._attributeMap=new Map,this.populateAttributesAndElements(),this._videoProperties=new te(this._mediaElements),this._videoDecoderProperties=new te(this._videoDecoderElements),this._audioDecoderProperties=new te(this._audioDecoderElements),this._videoProperties.show(this.contentElement),this._videoDecoderTabs=new le(ne.Video,this._videoDecoderProperties),this._videoDecoderTabs.show(this.contentElement),this._audioDecoderTabs=new le(ne.Audio,this._audioDecoderProperties),this._audioDecoderTabs.show(this.contentElement),this._textTrackTabs=null}_lazyCreateTrackTabs(){let e=this._textTrackTabs;if(null===e){const t=new oe(ls`Text track`);e=new de(t,ls`No text tracks`),e.show(this.contentElement),this._textTracksTabs=e}return e}GetTabs(e){if("audio"===e)return this._audioDecoderTabs;if("video"===e)return this._videoDecoderTabs;if("text"===e)return this._lazyCreateTrackTabs();throw new Error("Unreachable")}onProperty(e){const t=this._attributeMap.get(e.name);if(!t)throw new Error(`Player property "${e.name}" not supported.`);t.updateData(e.name,e.value)}formatKbps(e){if(""===e)return"0 kbps";return Math.floor(Number(e)/1e3)+" kbps"}formatTime(e){if(""===e)return"0:00";const t=new Date("");return t.setSeconds(Number(e)),t.toISOString().substr(11,8)}formatFileSize(e){if(""===e)return"0 bytes";const t=Number(e);if(t<1e3)return e+" bytes";const s=Math.floor(Math.log10(t)/3),i=["bytes","kB","MB","GB","TB"][s];return`${(t/Math.pow(1e3,s)).toFixed(2)} ${i}`}populateAttributesAndElements(){const e=new Q(ls`Resolution`);this._mediaElements.push(e),this._attributeMap.set(X.kResolution,e);const t=new Z(ls`File size`,this.formatFileSize);this._mediaElements.push(t),this._attributeMap.set(X.kTotalBytes,t);const s=new Z(ls`Bitrate`,this.formatKbps);this._mediaElements.push(s),this._attributeMap.set(X.kBitrate,s);const i=new Z(ls`Duration`,this.formatTime);this._mediaElements.push(i),this._attributeMap.set(X.kMaxDuration,i);const a=new Q(ls`Start time`);this._mediaElements.push(a),this._attributeMap.set(X.kStartTime,a);const r=new Q(ls`Streaming`);this._mediaElements.push(r),this._attributeMap.set(X.kIsStreaming,r);const n=new Q(ls`Playback frame URL`);this._mediaElements.push(n),this._attributeMap.set(X.kFrameUrl,n);const o=new Q(ls`Playback frame title`);this._mediaElements.push(o),this._attributeMap.set(X.kFrameTitle,o);const l=new Q(ls`Single-origin playback`);this._mediaElements.push(l),this._attributeMap.set(X.kIsSingleOrigin,l);const d=new Q(ls`Range header support`);this._mediaElements.push(d),this._attributeMap.set(X.kIsRangeHeaderSupported,d);const h=new Q(ls`Frame rate`);this._mediaElements.push(h),this._attributeMap.set(X.kFramerate,h);const c=new Q(ls`Video playback roughness`);this._mediaElements.push(c),this._attributeMap.set(X.kVideoPlaybackRoughness,c);const _=new ee(ls`Decoder name`,ls`No decoder`);this._videoDecoderElements.push(_),this._attributeMap.set(X.kVideoDecoderName,_);const m=new Q(ls`Hardware decoder`);this._videoDecoderElements.push(m),this._attributeMap.set(X.kIsPlatformVideoDecoder,m);const u=new Q(ls`Decrypting demuxer`);this._videoDecoderElements.push(u),this._attributeMap.set(X.kIsVideoDecryptingDemuxerStream,u);const p=new ie(this);this._attributeMap.set(X.kVideoTracks,p);const g=new ee(ls`Decoder name`,ls`No decoder`);this._audioDecoderElements.push(g),this._attributeMap.set(X.kAudioDecoderName,g);const v=new Q(ls`Hardware decoder`);this._audioDecoderElements.push(v),this._attributeMap.set(X.kIsPlatformAudioDecoder,v);const y=new Q(ls`Decrypting demuxer`);this._audioDecoderElements.push(y),this._attributeMap.set(X.kIsAudioDecryptingDemuxerStream,y);const b=new re(this);this._attributeMap.set(X.kAudioTracks,b);const E=new ae(this);this._attributeMap.set(X.kTextTracks,E)}}var ce=Object.freeze({__proto__:null,PlayerPropertyKeys:X,PropertyRenderer:Q,FormattedPropertyRenderer:Z,DefaultPropertyRenderer:ee,DimensionPropertyRenderer:class extends Q{constructor(e){super(v.UIString(e)),this._width=0,this._height=0}_updateData(e,t){let s=!1;"width"===e&&Number(t)!==this._width&&(this._width=Number(t),s=!0),"height"===e&&Number(t)!==this._height&&(this._height=Number(t),s=!0),0===this._width||0===this._height?this.changeContents(null):s&&this.changeContents(`${this._width}×${this._height}`)}},AttributesView:te,TrackManager:se,VideoTrackManager:ie,TextTrackManager:ae,AudioTrackManager:re,PlayerPropertiesView:he});const _e={Events:"events",Properties:"properties",Messages:"messages",Timeline:"timeline"};class me extends l.TabbedPane{constructor(){super(),this._eventView=new T,this._propertyView=new he,this._messageView=new Y,this._timelineView=new H,this.appendTab(_e.Properties,v.UIString("Properties"),this._propertyView,v.UIString("Player properties")),this.appendTab(_e.Events,v.UIString("Events"),this._eventView,v.UIString("Player events")),this.appendTab(_e.Messages,v.UIString("Messages"),this._messageView,v.UIString("Player messages")),this.appendTab(_e.Timeline,v.UIString("Timeline"),this._timelineView,v.UIString("Player timeline"))}onProperty(e){this._propertyView.onProperty(e)}onError(e){}onMessage(e){this._messageView.addMessage(e)}onEvent(e){this._eventView.onEvent(e),this._timelineView.onEvent(e)}}var ue=Object.freeze({__proto__:null,PlayerDetailViewTabs:_e,PlayerDetailView:me});class pe extends d.TreeElement{constructor(e,t,s){super(e.playerTitle,!1),this.titleFromUrl=!0,this._playerStatus=e,this._displayContainer=t,this.setLeadingIcons([h.Icon.create("smallicon-videoplayer-playing","media-player")]),this.listItemElement.classList.add("player-entry-tree-element"),this.listItemElement.addEventListener("contextmenu",this._rightClickContextMenu.bind(this,s),!1)}onselect(e){return this._displayContainer.renderMainPanel(this._playerStatus.playerID),!0}_rightClickContextMenu(e,t){const s=new c.ContextMenu(t);return s.headerSection().appendItem(ls`Hide player`,this._hidePlayer.bind(this,e)),s.headerSection().appendItem(ls`Hide all others`,this._hideOthers.bind(this,e)),s.headerSection().appendItem(ls`Save player info`,this._savePlayer.bind(this,e)),s.show(),!0}_hidePlayer(e){this._displayContainer.markPlayerForDeletion(e)}_savePlayer(e){this._displayContainer.exportPlayerData(e)}_hideOthers(e){this._displayContainer.markOtherPlayersForDeletion(e)}}class ge extends i.VBox{constructor(e){super(!0),this._playerStatuses=new Map,this._mainContainer=e,this._sidebarTree=new d.TreeOutlineInShadow,this.contentElement.appendChild(this._sidebarTree.element),this._sidebarTree.registerRequiredCSS("media/playerListView.css",{enableLegacyPatching:!0}),this._playerList=this._addListSection(v.UIString("Players")),this._playerList.listItemElement.classList.add("player-entry-header")}deletePlayer(e){this._playerList.removeChild(this._playerStatuses.get(e)),this._playerStatuses.delete(e)}_addListSection(e){const t=new d.TreeElement(e,!0);return t.listItemElement.classList.add("storage-group-list-item"),t.setCollapsible(!1),t.selectable=!1,this._sidebarTree.appendChild(t),t}addMediaElementItem(e){const t=new pe({playerTitle:e,playerID:e,exists:!0,playing:!1,titleEdited:!1},this._mainContainer,e);this._playerStatuses.set(e,t),this._playerList.appendChild(t)}setMediaElementPlayerTitle(e,t,s){if(this._playerStatuses.has(e)){const i=this._playerStatuses.get(e);s&&!i.titleFromUrl||(i.title=t,i.titleFromUrl=s)}}setMediaElementPlayerIcon(e,t){if(this._playerStatuses.has(e)){this._playerStatuses.get(e).setLeadingIcons([h.Icon.create("smallicon-videoplayer-"+t,"media-player")])}}onProperty(e,t){if(t.name===X.kFrameTitle&&t.value&&this.setMediaElementPlayerTitle(e,t.value,!1),t.name===X.kFrameUrl){const s=t.value.substring(t.value.lastIndexOf("/")+1);this.setMediaElementPlayerTitle(e,s,!0)}}onError(e,t){}onMessage(e,t){}onEvent(e,t){"PLAY"===t.value?this.setMediaElementPlayerIcon(e,"playing"):"PAUSE"===t.value?this.setMediaElementPlayerIcon(e,"paused"):"WEBMEDIAPLAYER_DESTROYED"===t.value&&this.setMediaElementPlayerIcon(e,"destroyed")}}var ve=Object.freeze({__proto__:null,PlayerStatus:void 0,PlayerStatusMapElement:void 0,PlayerEntryTreeElement:pe,PlayerListView:ge});class ye{constructor(){this._properties=new Map,this._messages=[],this._events=[],this._errors=[]}onProperty(e){this._properties.set(e.name,e.value)}onError(e){this._errors.push(e)}onMessage(e){this._messages.push(e)}onEvent(e){this._events.push(e)}export(){return{properties:this._properties,messages:this._messages,events:this._events,errors:this._errors}}}class be{constructor(){this._playerDataCollection=new Map}addPlayer(e){this._playerDataCollection.set(e,new ye)}onProperty(e,t){const s=this._playerDataCollection.get(e);s&&s.onProperty(t)}onError(e,t){const s=this._playerDataCollection.get(e);s&&s.onError(t)}onMessage(e,t){const s=this._playerDataCollection.get(e);s&&s.onMessage(t)}onEvent(e,t){const s=this._playerDataCollection.get(e);s&&s.onEvent(t)}exportPlayerData(e){const t=this._playerDataCollection.get(e);if(!t)throw new Error("Unable to find player");return t.export()}deletePlayer(e){this._playerDataCollection.delete(e)}}class Ee extends _.PanelWithSidebar{constructor(){super("Media"),this.registerRequiredCSS("media/mediaView.css",{enableLegacyPatching:!0}),this._detailPanels=new Map,this._deletedPlayers=new Set,this._downloadStore=new be,this._sidebar=new ge(this),this._sidebar.show(this.panelSidebarElement()),m.TargetManager.instance().observeModels(S,this)}renderMainPanel(e){if(!this._detailPanels.has(e))return;const t=this.splitWidget().mainWidget();t&&t.detachChildWidgets(),this._detailPanels.get(e).show(this.mainElement())}wasShown(){super.wasShown();for(const e of m.TargetManager.instance().models(S))this._addEventListeners(e)}willHide(){for(const e of m.TargetManager.instance().models(S))this._removeEventListeners(e)}modelAdded(e){this.isShowing()&&this._addEventListeners(e)}modelRemoved(e){this._removeEventListeners(e)}_addEventListeners(e){e.ensureEnabled(),e.addEventListener(k.PlayerPropertiesChanged,this._propertiesChanged,this),e.addEventListener(k.PlayerEventsAdded,this._eventsAdded,this),e.addEventListener(k.PlayerMessagesLogged,this._messagesLogged,this),e.addEventListener(k.PlayerErrorsRaised,this._errorsRaised,this),e.addEventListener(k.PlayersCreated,this._playersCreated,this)}_removeEventListeners(e){e.removeEventListener(k.PlayerPropertiesChanged,this._propertiesChanged,this),e.removeEventListener(k.PlayerEventsAdded,this._eventsAdded,this),e.removeEventListener(k.PlayerMessagesLogged,this._messagesLogged,this),e.removeEventListener(k.PlayerErrorsRaised,this._errorsRaised,this),e.removeEventListener(k.PlayersCreated,this._playersCreated,this)}_onPlayerCreated(e){this._sidebar.addMediaElementItem(e),this._detailPanels.set(e,new me),this._downloadStore.addPlayer(e)}_propertiesChanged(e){for(const t of e.data.properties)this.onProperty(e.data.playerId,t)}_eventsAdded(e){for(const t of e.data.events)this.onEvent(e.data.playerId,t)}_messagesLogged(e){for(const t of e.data.messages)this.onMessage(e.data.playerId,t)}_errorsRaised(e){for(const t of e.data.errors)this.onError(e.data.playerId,t)}_shouldPropagate(e){return!this._deletedPlayers.has(e)&&this._detailPanels.has(e)}onProperty(e,t){this._shouldPropagate(e)&&(this._sidebar.onProperty(e,t),this._downloadStore.onProperty(e,t),this._detailPanels.get(e).onProperty(t))}onError(e,t){this._shouldPropagate(e)&&(this._sidebar.onError(e,t),this._downloadStore.onError(e,t),this._detailPanels.get(e).onError(t))}onMessage(e,t){this._shouldPropagate(e)&&(this._sidebar.onMessage(e,t),this._downloadStore.onMessage(e,t),this._detailPanels.get(e).onMessage(t))}onEvent(e,t){this._shouldPropagate(e)&&(this._sidebar.onEvent(e,t),this._downloadStore.onEvent(e,t),this._detailPanels.get(e).onEvent(t))}_playersCreated(e){const t=e.data;for(const e of t)this._onPlayerCreated(e)}markPlayerForDeletion(e){this._deletedPlayers.add(e),this._detailPanels.delete(e),this._sidebar.deletePlayer(e),this._downloadStore.deletePlayer(e)}markOtherPlayersForDeletion(e){for(const t of this._detailPanels.keys())t!==e&&this.markPlayerForDeletion(t)}exportPlayerData(e){const t=this._downloadStore.exportPlayerData(e),s="data:application/octet-stream,"+encodeURIComponent(JSON.stringify(t,null,2)),i=document.createElement("a");i.href=s,i.download=e+".json",i.click()}}var we=Object.freeze({__proto__:null,TriggerHandler:class{onProperty(e){}onError(e){}onMessage(e){}onEvent(e){}},TriggerDispatcher:class{onProperty(e,t){}onError(e,t){}onMessage(e,t){}onEvent(e,t){}},MainView:Ee});export{we as MainView,M as MediaModel,ue as PlayerDetailView,P as PlayerEventsView,ve as PlayerListView,ce as PlayerPropertiesView,G as TickingFlameChart,C as TickingFlameChartHelpers};