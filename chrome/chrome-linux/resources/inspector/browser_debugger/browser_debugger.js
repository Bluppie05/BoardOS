import{UIString as e,Linkifier as t,Revealer as i}from"../common/common.js";import{SDKModel as s,DOMDebuggerModel as n,DebuggerModel as o,RuntimeModel as a}from"../sdk/sdk.js";import{DebuggerPausedMessage as r}from"../sources/sources.js";import{Widget as d,ListModel as l,ListControl as c,ARIAUtils as h,UIUtils as p,ContextMenu as m,Context as k,ViewManager as b,TreeOutline as u,Toolbar as g,InplaceEditor as _}from"../ui/ui.js";import{EventListenersView as f}from"../event_listeners/event_listeners.js";class E extends d.VBox{constructor(){super(!0),this.registerRequiredCSS("browser_debugger/domBreakpointsSidebarPane.css",{enableLegacyPatching:!0}),this.elementToCheckboxes=new WeakMap,this._emptyElement=this.contentElement.createChild("div","gray-info-message"),this._emptyElement.textContent=e.UIString("No breakpoints"),this._breakpoints=new l.ListModel,this._list=new c.ListControl(this._breakpoints,this,c.ListMode.NonViewport),this.contentElement.appendChild(this._list.element),this._list.element.classList.add("breakpoint-list","hidden"),h.markAsList(this._list.element),h.setAccessibleName(this._list.element,ls`DOM Breakpoints list`),this._emptyElement.tabIndex=-1,s.TargetManager.instance().addModelListener(n.DOMDebuggerModel,n.Events.DOMBreakpointAdded,this._breakpointAdded,this),s.TargetManager.instance().addModelListener(n.DOMDebuggerModel,n.Events.DOMBreakpointToggled,this._breakpointToggled,this),s.TargetManager.instance().addModelListener(n.DOMDebuggerModel,n.Events.DOMBreakpointsRemoved,this._breakpointsRemoved,this);for(const e of s.TargetManager.instance().models(n.DOMDebuggerModel)){e.retrieveDOMBreakpoints();for(const t of e.domBreakpoints())this._addBreakpoint(t)}this._highlightedBreakpoint=null,this._update()}createElementForItem(e){const i=document.createElement("div");i.classList.add("breakpoint-entry"),i.addEventListener("contextmenu",this._contextMenu.bind(this,e),!0),h.markAsListitem(i),i.tabIndex=-1;const s=p.CheckboxLabel.create(void 0,e.enabled),n=s.checkboxElement;n.addEventListener("click",this._checkboxClicked.bind(this,e),!1),n.tabIndex=this._list.selectedItem()===e?0:-1,this.elementToCheckboxes.set(i,n),i.appendChild(s);const o=document.createElement("div");o.classList.add("dom-breakpoint"),i.appendChild(o);const a=document.createElement("div"),r=x.get(e.type);a.textContent=r||null,h.setAccessibleName(n,ls`${r}`);const d=document.createElement("monospace");d.style.display="block",o.appendChild(d),t.Linkifier.linkify(e.node,{preventKeyboardFocus:!0,tooltip:void 0}).then(e=>{d.appendChild(e),h.setAccessibleName(n,ls`${r}: ${e.deepTextContent()}`)}),o.appendChild(a);const l=e.enabled?ls`checked`:ls`unchecked`;return e===this._highlightedBreakpoint?(i.classList.add("breakpoint-hit"),h.setDescription(i,ls`${l} breakpoint hit`),h.setDescription(n,ls`breakpoint hit`)):h.setDescription(i,l),this._emptyElement.classList.add("hidden"),this._list.element.classList.remove("hidden"),i}heightForItem(e){return 0}isItemSelectable(e){return!0}updateSelectedItemARIA(e,t){return!0}selectedItemChanged(e,t,i,s){if(i){const e=this.elementToCheckboxes.get(i);e&&(e.tabIndex=-1)}if(s){const e=this.elementToCheckboxes.get(s);if(!e)return;this.setDefaultFocusedElement(e),e.tabIndex=0,this.hasFocus()&&e.focus()}}_breakpointAdded(e){this._addBreakpoint(e.data)}_breakpointToggled(e){const t=this.hasFocus(),i=e.data;this._list.refreshItem(i),t&&this.focus()}_breakpointsRemoved(e){const t=this.hasFocus(),i=e.data;let s=-1;for(const e of i){const t=this._breakpoints.indexOf(e);t>=0&&(this._breakpoints.remove(t),s=t)}if(0===this._breakpoints.length)this._emptyElement.classList.remove("hidden"),this.setDefaultFocusedElement(this._emptyElement),this._list.element.classList.add("hidden");else if(s>=0){const e=this._breakpoints.at(s);e&&this._list.selectItem(e)}t&&this.focus()}_addBreakpoint(e){this._breakpoints.insertWithComparator(e,(e,t)=>e.type>t.type?-1:e.type<t.type?1:0),this.hasFocus()||this._list.selectItem(this._breakpoints.at(0))}_contextMenu(t,s){const n=new m.ContextMenu(s);n.defaultSection().appendItem(ls`Reveal DOM node in Elements panel`,()=>i.reveal(t.node)),n.defaultSection().appendItem(e.UIString("Remove breakpoint"),()=>{t.domDebuggerModel.removeDOMBreakpoint(t.node,t.type)}),n.defaultSection().appendItem(e.UIString("Remove all DOM breakpoints"),()=>{t.domDebuggerModel.removeAllDOMBreakpoints()}),n.show()}_checkboxClicked(e,t){e.domDebuggerModel.toggleDOMBreakpoint(e,!!t.target&&t.target.checked)}flavorChanged(e){this._update()}_update(){const e=k.Context.instance().flavor(o.DebuggerPausedDetails);if(this._highlightedBreakpoint){const e=this._highlightedBreakpoint;this._highlightedBreakpoint=null,this._list.refreshItem(e)}if(!e||!e.auxData||e.reason!==o.BreakReason.DOM)return;const t=e.debuggerModel.target().model(n.DOMDebuggerModel);if(!t)return;const i=t.resolveDOMBreakpointData(e.auxData);if(i){for(const e of this._breakpoints)e.node===i.node&&e.type===i.type&&(this._highlightedBreakpoint=e);this._highlightedBreakpoint&&this._list.refreshItem(this._highlightedBreakpoint),b.ViewManager.instance().showView("sources.domBreakpoints")}}}const x=new Map([[Protocol.DOMDebugger.DOMBreakpointType.SubtreeModified,e.UIString("Subtree modified")],[Protocol.DOMDebugger.DOMBreakpointType.AttributeModified,e.UIString("Attribute modified")],[Protocol.DOMDebugger.DOMBreakpointType.NodeRemoved,e.UIString("Node removed")]]);var v=Object.freeze({__proto__:null,DOMBreakpointsSidebarPane:E,BreakpointTypeLabels:x,ContextMenuProvider:class{appendApplicableItems(t,i,s){const o=s;if(o.pseudoType())return;const a=o.domModel().target().model(n.DOMDebuggerModel);if(!a)return;function d(e){a&&(a.hasDOMBreakpoint(o,e)?a.removeDOMBreakpoint(o,e):a.setDOMBreakpoint(o,e))}const l=i.debugSection().appendSubMenuItem(e.UIString("Break on"));for(const e of Object.values(Protocol.DOMDebugger.DOMBreakpointType)){const t=r.BreakpointTypeNouns.get(e);t&&l.defaultSection().appendCheckboxItem(t,d.bind(null,e),a.hasDOMBreakpoint(o,e))}}}});class C extends d.VBox{constructor(){super(!0),this._categoriesTreeOutline=new u.TreeOutlineInShadow,this._categoriesTreeOutline.registerRequiredCSS("browser_debugger/eventListenerBreakpoints.css",{enableLegacyPatching:!0}),this._categoriesTreeOutline.setShowSelectionOnKeyboardFocus(!0),this.contentElement.appendChild(this._categoriesTreeOutline.element),this._categories=new Map;const e=n.DOMDebuggerManager.instance().eventListenerBreakpoints().map(e=>e.category());e.sort();for(const t of e)this._categories.has(t)||this._createCategory(t);if(e.length>0){const t=this._categories.get(e[0]);t&&t.element.select()}this._breakpoints=new Map;for(const e of n.DOMDebuggerManager.instance().eventListenerBreakpoints())this._createBreakpoint(e);s.TargetManager.instance().addModelListener(o.DebuggerModel,o.Events.DebuggerPaused,this._update,this),s.TargetManager.instance().addModelListener(o.DebuggerModel,o.Events.DebuggerResumed,this._update,this),k.Context.instance().addFlavorChangeListener(s.Target,this._update,this)}focus(){this._categoriesTreeOutline.forceSelect()}_createCategory(e){const t=p.CheckboxLabel.create(e);t.checkboxElement.addEventListener("click",this._categoryCheckboxClicked.bind(this,e),!0),t.checkboxElement.tabIndex=-1;const i=new u.TreeElement(t);i.listItemElement.addEventListener("keydown",t=>{if(" "===t.key){const i=this._categories.get(e);i&&i.checkbox.click(),t.consume(!0)}}),t.checkboxElement.addEventListener("focus",()=>i.listItemElement.focus()),h.setChecked(i.listItemElement,!1),this._categoriesTreeOutline.appendChild(i),this._categories.set(e,{element:i,checkbox:t.checkboxElement})}_createBreakpoint(e){const t=p.CheckboxLabel.create(e.title());t.classList.add("source-code"),t.checkboxElement.addEventListener("click",this._breakpointCheckboxClicked.bind(this,e),!0),t.checkboxElement.tabIndex=-1;const i=new u.TreeElement(t);i.listItemElement.addEventListener("keydown",t=>{if(" "===t.key){const i=this._breakpoints.get(e);i&&i.checkbox.click(),t.consume(!0)}}),t.checkboxElement.addEventListener("focus",()=>i.listItemElement.focus()),h.setChecked(i.listItemElement,!1),i.listItemElement.createChild("div","breakpoint-hit-marker");const s=this._categories.get(e.category());s&&s.element.appendChild(i),this._breakpoints.set(e,{element:i,checkbox:t.checkboxElement})}_update(){const e=k.Context.instance().flavor(s.Target),t=e?e.model(o.DebuggerModel):null,i=t?t.debuggerPausedDetails():null;if(!i||i.reason!==o.BreakReason.EventListener||!i.auxData)return void(this._highlightedElement&&(h.setDescription(this._highlightedElement,""),this._highlightedElement.classList.remove("breakpoint-hit"),delete this._highlightedElement));const a=n.DOMDebuggerManager.instance().resolveEventListenerBreakpoint(i.auxData);if(!a)return;b.ViewManager.instance().showView("sources.eventListenerBreakpoints");const r=this._categories.get(a.category());r&&r.element.expand();const d=this._breakpoints.get(a);d&&(this._highlightedElement=d.element.listItemElement,h.setDescription(this._highlightedElement,ls`breakpoint hit`),this._highlightedElement.classList.add("breakpoint-hit"))}_categoryCheckboxClicked(e){const t=this._categories.get(e);if(!t)return;const i=t.checkbox.checked;h.setChecked(t.element.listItemElement,i);for(const t of this._breakpoints.keys())if(t.category()===e){t.setEnabled(i);const e=this._breakpoints.get(t);e&&(e.checkbox.checked=i)}}_breakpointCheckboxClicked(e){const t=this._breakpoints.get(e);if(!t)return;e.setEnabled(t.checkbox.checked),h.setChecked(t.element.listItemElement,t.checkbox.checked);let i=!1,s=!1;for(const t of this._breakpoints.keys())t.category()===e.category()&&(t.enabled()?i=!0:s=!0);const n=this._categories.get(e.category());n&&(n.checkbox.checked=i,n.checkbox.indeterminate=i&&s,n.checkbox.indeterminate?h.setCheckboxAsIndeterminate(n.element.listItemElement):h.setChecked(n.element.listItemElement,i))}}var M=Object.freeze({__proto__:null,EventListenerBreakpointsSidebarPane:C,Item:void 0});class B extends d.VBox{constructor(){super(),this._refreshButton=new g.ToolbarButton(ls`Refresh global listeners`,"largeicon-refresh"),this._refreshButton.addEventListener(g.ToolbarButton.Events.Click,this._refreshClick,this),this._refreshButton.setEnabled(!1),this._eventListenersView=new f.EventListenersView(this.update.bind(this),!0),this._eventListenersView.show(this.element),this.setDefaultFocusedChild(this._eventListenersView)}toolbarItems(){return[this._refreshButton]}update(){this._lastRequestedContext&&(this._lastRequestedContext.runtimeModel.releaseObjectGroup(D),delete this._lastRequestedContext);const e=k.Context.instance().flavor(a.ExecutionContext);if(!e)return this._eventListenersView.reset(),void this._eventListenersView.addEmptyHolderIfNeeded();this._lastRequestedContext=e,Promise.all([this._windowObjectInContext(e)]).then(this._eventListenersView.addObjects.bind(this._eventListenersView))}wasShown(){super.wasShown(),k.Context.instance().addFlavorChangeListener(a.ExecutionContext,this.update,this),this._refreshButton.setEnabled(!0),this.update()}willHide(){super.willHide(),k.Context.instance().removeFlavorChangeListener(a.ExecutionContext,this.update,this),this._refreshButton.setEnabled(!1)}_windowObjectInContext(e){return e.evaluate({expression:"self",objectGroup:D,includeCommandLineAPI:!1,silent:!0,returnByValue:!1,generatePreview:!1,timeout:void 0,throwOnSideEffect:void 0,disableBreaks:void 0,replMode:void 0,allowUnsafeEvalBlockedByCSP:void 0},!1,!1).then(e=>"error"in e||e.exceptionDetails?null:e.object)}_refreshClick(e){e.data.consume(),this.update()}}const D="object-event-listeners-sidebar-pane";var L=Object.freeze({__proto__:null,ObjectEventListenersSidebarPane:B,objectGroupName:D});const I=new WeakMap,w=new WeakMap;class y extends d.VBox{constructor(){super(!0),this.registerRequiredCSS("browser_debugger/xhrBreakpointsSidebarPane.css",{enableLegacyPatching:!0}),this._breakpoints=new l.ListModel,this._list=new c.ListControl(this._breakpoints,this,c.ListMode.NonViewport),this.contentElement.appendChild(this._list.element),this._list.element.classList.add("breakpoint-list","hidden"),h.markAsList(this._list.element),h.setAccessibleName(this._list.element,ls`XHR/fetch Breakpoints`),this._emptyElement=this.contentElement.createChild("div","gray-info-message"),this._emptyElement.textContent=e.UIString("No breakpoints"),this._breakpointElements=new Map,this._addButton=new g.ToolbarButton(ls`Add XHR/fetch breakpoint`,"largeicon-add"),this._addButton.addEventListener(g.ToolbarButton.Events.Click,e=>{this._addButtonClicked()}),this._emptyElement.addEventListener("contextmenu",this._emptyElementContextMenu.bind(this),!0),this._emptyElement.tabIndex=-1,this._restoreBreakpoints(),this._update()}toolbarItems(){return[this._addButton]}_emptyElementContextMenu(t){const i=new m.ContextMenu(t);i.defaultSection().appendItem(e.UIString("Add breakpoint"),this._addButtonClicked.bind(this)),i.show()}async _addButtonClicked(){await b.ViewManager.instance().showView("sources.xhrBreakpoints");const t=document.createElement("p");t.classList.add("breakpoint-condition"),t.textContent=e.UIString("Break when URL contains:");const i=t.createChild("span","breakpoint-condition-input");function s(e,i,s){this._removeListElement(t),e&&(n.DOMDebuggerManager.instance().addXHRBreakpoint(s,!0),this._setBreakpoint(s)),this._update()}h.setAccessibleName(i,ls`URL Breakpoint`),this._addListElement(t,this._list.element.firstChild);const o=new _.Config(s.bind(this,!0),s.bind(this,!1));_.InplaceEditor.startEditing(i,o)}heightForItem(e){return 0}isItemSelectable(e){return!0}_setBreakpoint(e){-1!==this._breakpoints.indexOf(e)?this._list.refreshItem(e):this._breakpoints.insertWithComparator(e,(e,t)=>e>t?1:e<t?-1:0),this._list.selectedItem()&&this.hasFocus()||this._list.selectItem(this._breakpoints.at(0))}createElementForItem(t){const i=document.createElement("div");h.markAsListitem(i);const s=i.createChild("div","breakpoint-entry");I.set(i,s);const o=n.DOMDebuggerManager.instance().xhrBreakpoints().get(t)||!1;h.markAsCheckbox(s),h.setChecked(s,o),s.addEventListener("contextmenu",this._contextMenu.bind(this,t),!0);const a=t?e.UIString('URL contains "%s"',t):e.UIString("Any XHR or fetch"),r=p.CheckboxLabel.create(a,o);return h.markAsHidden(r),h.setAccessibleName(s,a),s.appendChild(r),r.checkboxElement.addEventListener("click",this._checkboxClicked.bind(this,t,o),!1),s.addEventListener("click",e=>{e.target===s&&this._checkboxClicked(t,o)},!1),w.set(s,r.checkboxElement),r.checkboxElement.tabIndex=-1,s.tabIndex=-1,t===this._list.selectedItem()&&(s.tabIndex=0,this.setDefaultFocusedElement(s)),s.addEventListener("keydown",e=>{let i=!1;" "===e.key?(this._checkboxClicked(t,o),i=!0):isEnterKey(e)&&(this._labelClicked(t),i=!0),i&&e.consume(!0)}),t===this._hitBreakpoint&&(s.classList.add("breakpoint-hit"),h.setDescription(s,ls`breakpoint hit`)),r.classList.add("cursor-auto"),r.textElement.addEventListener("dblclick",this._labelClicked.bind(this,t),!1),this._breakpointElements.set(t,i),i}selectedItemChanged(e,t,i,s){if(i){const e=I.get(i);if(!e)throw new Error("Expected breakpoint entry to be found for an element");e.tabIndex=-1}if(s){const e=I.get(s);if(!e)throw new Error("Expected breakpoint entry to be found for an element");this.setDefaultFocusedElement(e),e.tabIndex=0,this.hasFocus()&&e.focus()}}updateSelectedItemARIA(e,t){return!0}_removeBreakpoint(e){const t=this._breakpoints.indexOf(e);t>=0&&this._breakpoints.remove(t),this._breakpointElements.delete(e),this._update()}_addListElement(e,t){this._list.element.insertBefore(e,t),this._emptyElement.classList.add("hidden"),this._list.element.classList.remove("hidden")}_removeListElement(e){this._list.element.removeChild(e),this._list.element.firstElementChild||(this._emptyElement.classList.remove("hidden"),this._list.element.classList.add("hidden"))}_contextMenu(t,i){const s=new m.ContextMenu(i);const o=e.UIString("Remove all breakpoints");s.defaultSection().appendItem(e.UIString("Add breakpoint"),this._addButtonClicked.bind(this)),s.defaultSection().appendItem(e.UIString("Remove breakpoint"),function(){n.DOMDebuggerManager.instance().removeXHRBreakpoint(t),this._removeBreakpoint(t)}.bind(this)),s.defaultSection().appendItem(o,function(){for(const e of this._breakpointElements.keys())n.DOMDebuggerManager.instance().removeXHRBreakpoint(e),this._removeBreakpoint(e);this._update()}.bind(this)),s.show()}_checkboxClicked(e,t){const i=this.hasFocus();n.DOMDebuggerManager.instance().toggleXHRBreakpoint(e,!t),this._list.refreshItem(e),this._list.selectItem(e),i&&this.focus()}_labelClicked(e){const t=this._breakpointElements.get(e),i=document.createElement("span");function s(s,o,a){if(this._removeListElement(i),s){n.DOMDebuggerManager.instance().removeXHRBreakpoint(e),this._removeBreakpoint(e);let i=!0;if(t){const e=I.get(t),s=e?w.get(e):void 0;s&&(i=s.checked)}n.DOMDebuggerManager.instance().addXHRBreakpoint(a,i),this._setBreakpoint(a),this._list.selectItem(a)}else t&&t.classList.remove("hidden");this.focus()}i.classList.add("breakpoint-condition"),i.textContent=e,t&&(this._list.element.insertBefore(i,t),t.classList.add("hidden"));const o=new _.Config(s.bind(this,!0),s.bind(this,!1));_.InplaceEditor.startEditing(i,o)}flavorChanged(e){this._update()}_update(){const e=0===this._breakpoints.length;this._list.element.classList.toggle("hidden",e),this._emptyElement.classList.toggle("hidden",!e);const t=k.Context.instance().flavor(o.DebuggerPausedDetails);if(!t||t.reason!==o.BreakReason.XHR){if(this._hitBreakpoint){const e=this._hitBreakpoint;delete this._hitBreakpoint,this._breakpoints.indexOf(e)>=0&&this._list.refreshItem(e)}return}const i=t.auxData&&t.auxData.breakpointURL;this._hitBreakpoint=i,this._breakpoints.indexOf(i)<0||(this._list.refreshItem(i),b.ViewManager.instance().showView("sources.xhrBreakpoints"))}_restoreBreakpoints(){const e=n.DOMDebuggerManager.instance().xhrBreakpoints();for(const t of e.keys())this._setBreakpoint(t)}}var O=Object.freeze({__proto__:null,XHRBreakpointsSidebarPane:y});export{v as DOMBreakpointsSidebarPane,M as EventListenerBreakpointsSidebarPane,L as ObjectEventListenersSidebarPane,O as XHRBreakpointsSidebarPane};
