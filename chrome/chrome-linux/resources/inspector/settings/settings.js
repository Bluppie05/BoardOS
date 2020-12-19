import{Settings as t}from"../common/common.js";import{Reload as e}from"../components/components.js";import{userMetrics as s,InspectorFrontendHost as i,UserMetrics as n}from"../host/host.js";import{i18n as o}from"../i18n/i18n.js";import{Runtime as r}from"../root/root.js";import{Widget as a,Utils as c,ARIAUtils as d,ViewManager as h,Toolbar as l,TabbedPane as u,Dialog as b,GlassPane as m,UIUtils as g,SettingsUI as p,InspectorView as _,ListWidget as S,ListModel as f,ListControl as k,ShortcutRegistry as x,KeyboardShortcut as y,ActionRegistry as v,Icon as E}from"../ui/ui.js";const C={settings:"Settings",shortcuts:"Shortcuts",preferences:"Preferences",restoreDefaultsAndReload:"Restore defaults and reload",experiments:"Experiments",theseExperimentsCouldBeUnstable:"These experiments could be unstable or unreliable and may require you to restart DevTools.",theseExperimentsAreParticularly:"These experiments are particularly unstable. Enable at your own risk.",warning:"WARNING:",oneOrMoreSettingsHaveChanged:"One or more settings have changed which requires a reload to take effect."},I=o.registerUIStrings("settings/SettingsScreen.js",C),w=o.getLocalizedString.bind(void 0,I);let T;class L extends a.VBox{constructor(){super(!0),this.registerRequiredCSS("settings/settingsScreen.css",{enableLegacyPatching:!0}),this.contentElement.classList.add("settings-window-main"),this.contentElement.classList.add("vbox");const t=document.createElement("div"),e=c.createShadowRootWithCoreStyles(t,{cssFile:"settings/settingsScreen.css",enableLegacyPatching:!0,delegatesFocus:void 0}).createChild("div","settings-window-title");d.markAsHeading(e,1),e.textContent=w(C.settings),this._tabbedLocation=h.ViewManager.instance().createTabbedLocation(()=>L._revealSettingsScreen(),"settings-view");const s=this._tabbedLocation.tabbedPane();s.leftToolbar().appendToolbarItem(new l.ToolbarItem(t)),s.setShrinkableTabs(!1),s.makeVerticalTabLayout();const i=h.ViewManager.instance().view("keybinds");i&&i.widget().then(t=>{this._keybindsTab=t}),s.show(this.contentElement),s.selectTab("preferences"),s.addEventListener(u.Events.TabInvoked,this._tabInvoked,this),this._reportTabOnReveal=!1}static instance(t={forceNew:null}){const{forceNew:e}=t;return T&&!e||(T=new L),T}static _revealSettingsScreen(){const t=L.instance();if(t.isShowing())return t;t._reportTabOnReveal=!0;const e=new b.Dialog;return e.contentElement.tabIndex=-1,e.addCloseButton(),e.setOutsideClickCallback(()=>{}),e.setPointerEventsBehavior(m.PointerEventsBehavior.PierceGlassPane),e.setOutsideTabIndexBehavior(b.OutsideTabIndexBehavior.PreserveMainViewTabIndex),t.show(e.contentElement),e.setEscapeKeyCallback(t._onEscapeKeyPressed.bind(t)),e.show(),t}static async _showSettingsScreen(t={name:void 0,focusTabHeader:void 0}){const{name:e,focusTabHeader:s}=t,i=L._revealSettingsScreen();i._selectTab(e||"preferences");const n=i._tabbedLocation.tabbedPane();await n.waitForTabElementUpdate(),s?n.focusSelectedTabHeader():n.focus()}resolveLocation(t){return this._tabbedLocation}_selectTab(t){this._tabbedLocation.tabbedPane().selectTab(t,!0)}_tabInvoked(t){const e=t.data;if(!e.isUserGesture)return;const s=e.prevTabId,i=e.tabId;!this._reportTabOnReveal&&s&&s===i||(this._reportTabOnReveal=!1,this._reportSettingsPanelShown(i))}_reportSettingsPanelShown(t){t!==w(C.shortcuts)?s.settingsPanelShown(t):s.settingsPanelShown("shortcuts")}_onEscapeKeyPressed(t){"keybinds"===this._tabbedLocation.tabbedPane().selectedTabId&&this._keybindsTab&&this._keybindsTab.onEscapeKeyPressed(t)}}class A extends a.VBox{constructor(t,e){super(),this.element.classList.add("settings-tab-container"),e&&(this.element.id=e);const s=this.element.createChild("header");g.createTextChild(s.createChild("h1"),t),this.containerElement=this.element.createChild("div","settings-container-wrapper").createChild("div","settings-tab settings-content settings-container")}_appendSection(t){const e=this.containerElement.createChild("div","settings-block");if(t){d.markAsGroup(e);const s=e.createChild("div","settings-section-title");s.textContent=t,d.markAsHeading(s,2),d.setAccessibleName(e,t)}return e}}class R extends A{constructor(){super(w(C.preferences),"preferences-tab-content");const s=["","Appearance","Sources","Elements","Network","Performance","Console","Extensions","Persistence","Debugger","Global"];this._nameToSection=new Map;for(const t of s)this._createSectionElement(t);r.Runtime.instance().extensions("setting").forEach(this._addSetting.bind(this)),r.Runtime.instance().extensions(p.SettingUI).forEach(this._addSettingUI.bind(this)),this._appendSection().appendChild(g.createTextButton(w(C.restoreDefaultsAndReload),(function(){t.Settings.instance().clearAll(),e.reload()})))}static isSettingVisible(t){const e=t.descriptor();return"title"in e&&"category"in e}_addSetting(e){if(!R.isSettingVisible(e))return;const s=e.descriptor().category;if(!s)return;const i=this._sectionElement(s);if(!i)return;const n=t.Settings.instance().moduleSetting(e.descriptor().settingName),o=p.createControlForSetting(n);o&&i.appendChild(o)}_addSettingUI(t){const e=t.descriptor().category||"";t.instance().then(function(t){const s=t.settingElement();if(s){let t=this._sectionElement(e);t||(t=this._createSectionElement(e)),t.appendChild(s)}}.bind(this))}_createSectionElement(t){const e=t&&w(t),s=this._appendSection(e);return this._nameToSection.set(t,s),s}_sectionElement(t){return this._nameToSection.get(t)||null}}var B=Object.freeze({__proto__:null,UIStrings:C,SettingsScreen:L,GenericSettingsTab:R,ExperimentsSettingsTab:class extends A{constructor(){super(w(C.experiments),"experiments-tab-content");const t=r.experiments.allConfigurableExperiments().sort(),e=t.filter(t=>t.unstable),s=t.filter(t=>!t.unstable);if(s.length){const t=this._appendSection(),e=w(C.theseExperimentsCouldBeUnstable);t.appendChild(this._createExperimentsWarningSubsection(e));for(const e of s)t.appendChild(this._createExperimentCheckbox(e))}if(e.length){const t=this._appendSection(),s=w(C.theseExperimentsAreParticularly);t.appendChild(this._createExperimentsWarningSubsection(s));for(const s of e)t.appendChild(this._createExperimentCheckbox(s))}}_createExperimentsWarningSubsection(t){const e=document.createElement("div");e.createChild("span","settings-experiments-warning-subsection-warning").textContent=w(C.warning),g.createTextChild(e," ");return e.createChild("span","settings-experiments-warning-subsection-message").textContent=t,e}_createExperimentCheckbox(t){const e=g.CheckboxLabel.create(w(t.title),t.isEnabled()),i=e.checkboxElement;i.name=t.name,i.addEventListener("click",(function(){t.setEnabled(i.checked),s.experimentChanged(t.name,t.isEnabled()),_.InspectorView.instance().displayReloadRequiredWarning(w(C.oneOrMoreSettingsHaveChanged))}),!1);const n=document.createElement("p");return n.className=t.unstable&&!t.isEnabled()?"settings-experiment-unstable":"",n.appendChild(e),n}},ActionDelegate:class{handleAction(t,e){switch(e){case"settings.show":return L._showSettingsScreen({focusTabHeader:!0}),!0;case"settings.documentation":return i.InspectorFrontendHostInstance.openInNewTab(g.addReferrerToURL("https://developers.google.com/web/tools/chrome-devtools/")),!0;case"settings.shortcuts":return L._showSettingsScreen({name:"keybinds",focusTabHeader:!0}),!0}return!1}},Revealer:class{reveal(e){console.assert(e instanceof t.Setting);const s=e;let n=!1;r.Runtime.instance().extensions("setting").forEach((function(t){if(!R.isSettingVisible(t))return;t.descriptor().settingName===s.name&&(i.InspectorFrontendHostInstance.bringToFront(),L._showSettingsScreen(),n=!0)})),r.Runtime.instance().extensions(p.SettingUI).forEach((function(t){const e=t.descriptor().settings;e&&-1!==e.indexOf(s.name)&&(i.InspectorFrontendHostInstance.bringToFront(),L._showSettingsScreen(),n=!0)}));return[...r.Runtime.instance().extensions("view").map(t=>({location:t.descriptor().location,settings:t.descriptor().settings,id:t.descriptor().id})),...h.getRegisteredViewExtensions().map(t=>({location:t.location(),settings:t.settings(),id:t.viewId()}))].forEach((function(t){if(t.location!==h.ViewLocationValues.SETTINGS_VIEW)return;const e=t.settings;e&&-1!==e.indexOf(s.name)&&(i.InspectorFrontendHostInstance.bringToFront(),L._showSettingsScreen({name:t.id}),n=!0)})),n?Promise.resolve():Promise.reject()}},ShowSettingsScreenOptions:void 0});const P={frameworkBlackboxing:"Framework Blackboxing",debuggerWillSkipThroughThe:"Debugger will skip through the scripts and will not stop on exceptions thrown by them.",blackboxContentScripts:"Blackbox content scripts",blackboxContentScriptsExtension:"Blackbox content scripts (extension scripts in the page)",blackbox:"Blackbox",disabled:"Disabled",noBlackboxedPatterns:"No blackboxed patterns",addPattern:"Add pattern...",addFilenamePattern:"Add filename pattern",blackboxScriptsWhoseNamesMatchS:"Blackbox scripts whose names match '{PH1}'",pattern:"Pattern",behavior:"Behavior",patternCannotBeEmpty:"Pattern cannot be empty",patternAlreadyExists:"Pattern already exists",patternMustBeAValidRegular:"Pattern must be a valid regular expression"},F=o.registerUIStrings("settings/FrameworkBlackboxSettingsTab.js",P),D=o.getLocalizedString.bind(void 0,F);class M extends a.VBox{constructor(){super(!0),this.registerRequiredCSS("settings/frameworkBlackboxSettingsTab.css",{enableLegacyPatching:!0});const e=this.contentElement.createChild("div","header");e.textContent=D(P.frameworkBlackboxing),d.markAsHeading(e,1),this.contentElement.createChild("div","intro").textContent=D(P.debuggerWillSkipThroughThe);const s=this.contentElement.createChild("div","blackbox-content-scripts");s.appendChild(p.createSettingCheckbox(D(P.blackboxContentScripts),t.Settings.instance().moduleSetting("skipContentScripts"),!0)),s.title=D(P.blackboxContentScriptsExtension),this._blackboxLabel=D(P.blackbox),this._disabledLabel=D(P.disabled),this._list=new S.ListWidget(this),this._list.element.classList.add("blackbox-list"),this._list.registerRequiredCSS("settings/frameworkBlackboxSettingsTab.css",{enableLegacyPatching:!0});const i=document.createElement("div");i.classList.add("blackbox-list-empty"),i.textContent=D(P.noBlackboxedPatterns),this._list.setEmptyPlaceholder(i),this._list.show(this.contentElement);const n=g.createTextButton(D(P.addPattern),this._addButtonClicked.bind(this),"add-button");d.setAccessibleName(n,D(P.addFilenamePattern)),this.contentElement.appendChild(n),this._setting=t.Settings.instance().moduleSetting("skipStackFramesPattern"),this._setting.addChangeListener(this._settingUpdated,this),this.setDefaultFocusedElement(n)}wasShown(){super.wasShown(),this._settingUpdated()}_settingUpdated(){this._list.clear();const t=this._setting.getAsArray();for(let e=0;e<t.length;++e)this._list.appendItem(t[e],!0)}_addButtonClicked(){this._list.addNewItem(this._setting.getAsArray().length,{pattern:"",disabled:!1})}renderItem(t,e){const s=document.createElement("div");s.classList.add("blackbox-list-item");const i=s.createChild("div","blackbox-pattern");return i.textContent=t.pattern,i.title=D(P.blackboxScriptsWhoseNamesMatchS,{PH1:t.pattern}),s.createChild("div","blackbox-separator"),s.createChild("div","blackbox-behavior").textContent=t.disabled?this._disabledLabel:this._blackboxLabel,t.disabled&&s.classList.add("blackbox-disabled"),s}removeItemRequested(t,e){const s=this._setting.getAsArray();s.splice(e,1),this._setting.setAsArray(s)}commitEdit(t,e,s){t.pattern=e.control("pattern").value.trim(),t.disabled=e.control("behavior").value===this._disabledLabel;const i=this._setting.getAsArray();s&&i.push(t),this._setting.setAsArray(i)}beginEdit(t){const e=this._createEditor();return e.control("pattern").value=t.pattern,e.control("behavior").value=t.disabled?this._disabledLabel:this._blackboxLabel,e}_createEditor(){if(this._editor)return this._editor;const t=new S.Editor;this._editor=t;const e=t.contentElement(),s=e.createChild("div","blackbox-edit-row");s.createChild("div","blackbox-pattern").textContent=D(P.pattern),s.createChild("div","blackbox-separator blackbox-separator-invisible"),s.createChild("div","blackbox-behavior").textContent=D(P.behavior);const i=e.createChild("div","blackbox-edit-row"),n=t.createInput("pattern","text","/framework\\.js$",function(t,e,s){const i=s.value.trim(),n=this._setting.getAsArray();if(!i.length)return{valid:!1,errorMessage:D(P.patternCannotBeEmpty)};for(let t=0;t<n.length;++t)if(t!==e&&n[t].pattern===i)return{valid:!1,errorMessage:D(P.patternAlreadyExists)};let o;try{o=new RegExp(i)}catch(t){}if(!o)return{valid:!1,errorMessage:D(P.patternMustBeAValidRegular)};return{valid:!0,errorMessage:void 0}}.bind(this));d.setAccessibleName(n,D(P.pattern)),i.createChild("div","blackbox-pattern").appendChild(n),i.createChild("div","blackbox-separator blackbox-separator-invisible");const o=t.createSelect("behavior",[this._blackboxLabel,this._disabledLabel],(function(t,e,s){return{valid:!0,errorMessage:void 0}}));return d.setAccessibleName(o,D(P.behavior)),i.createChild("div","blackbox-behavior").appendChild(o),t}}var U=Object.freeze({__proto__:null,UIStrings:P,FrameworkBlackboxSettingsTab:M});const K={shortcuts:"Shortcuts",matchShortcutsFromPreset:"Match shortcuts from preset",keyboardShortcutsList:"Keyboard shortcuts list",shortcutModified:"Shortcut modified",noShortcutForAction:"No shortcut for action",addAShortcut:"Add a shortcut",confirmChanges:"Confirm changes",discardChanges:"Discard changes",removeShortcut:"Remove shortcut",editShortcut:"Edit shortcut",shortcutsCannotContainOnly:"Shortcuts cannot contain only modifier keys.",thisShortcutIsInUseByS:"This shortcut is in use by {PH1}.",RestoreDefaultShortcuts:"Restore default shortcuts",FullListOfDevtoolsKeyboard:"Full list of DevTools keyboard shortcuts and gestures",ResetShortcutsForAction:"Reset shortcuts for action"},N=o.registerUIStrings("settings/KeybindsSettingsTab.js",K),O=o.getLocalizedString.bind(void 0,N);class H extends a.VBox{constructor(){super(!0),this.registerRequiredCSS("settings/keybindsSettingsTab.css",{enableLegacyPatching:!0});this.contentElement.createChild("header").createChild("h1").textContent=O(K.shortcuts);const e=t.Settings.instance().moduleSetting("activeKeybindSet"),s=t.Settings.instance().moduleSetting("userShortcuts");s.addChangeListener(this.update,this),e.addChangeListener(this.update,this);const i=p.createControlForSetting(e,O(K.matchShortcutsFromPreset));i&&(i.classList.add("keybinds-set-select"),this.contentElement.appendChild(i)),this._items=new f.ListModel,this._list=new k.ListControl(this._items,this,k.ListMode.NonViewport),this._items.replaceAll(this._createListItems()),d.markAsList(this._list.element),this.registerRequiredCSS("settings/keybindsSettingsTab.css",{enableLegacyPatching:!0}),this.contentElement.appendChild(this._list.element),d.setAccessibleName(this._list.element,O(K.keyboardShortcutsList));const n=this.contentElement.createChild("div");n.classList.add("keybinds-footer");const o=g.createDocumentationLink("iterate/inspect-styles/shortcuts",O(K.FullListOfDevtoolsKeyboard));o.classList.add("docs-link"),n.appendChild(o),n.appendChild(g.createTextButton(O(K.RestoreDefaultShortcuts),()=>{s.set([]),e.set(x.DefaultShortcutSetting)})),this._editingItem=null,this._editingRow=null,this.update()}createElementForItem(t){let e=document.createElement("div");if("string"==typeof t)d.setLevel(e,1),e.classList.add("keybinds-category-header"),e.textContent=t;else{const s=new V(t,this,t===this._editingItem);e=s.element,d.setLevel(e,2),t===this._editingItem&&(this._editingRow=s)}return e.classList.add("keybinds-list-item"),d.markAsListitem(e),e.tabIndex=t===this._list.selectedItem()&&t!==this._editingItem?0:-1,e}commitChanges(t,e){for(const[t,i]of e)t.type!==y.Type.UnsetShortcut&&(x.ShortcutRegistry.instance().removeShortcut(t),i||s.actionTaken(n.Action.ShortcutRemoved)),i&&(x.ShortcutRegistry.instance().registerUserShortcut(t.changeKeys(i).changeType(y.Type.UserShortcut)),t.type===y.Type.UnsetShortcut?s.actionTaken(n.Action.UserShortcutAdded):s.actionTaken(n.Action.ShortcutModified));this.stopEditing(t)}heightForItem(t){return 0}isItemSelectable(t){return!0}selectedItemChanged(t,e,s,i){s&&(s.tabIndex=-1),i&&this._editingRow&&(e===this._editingItem?this._editingRow.focus():(i.tabIndex=0,this._list.element.hasFocus()&&i.focus()),this.setDefaultFocusedElement(i))}updateSelectedItemARIA(t,e){return!0}startEditing(t){this._editingItem&&this.stopEditing(this._editingItem),g.markBeingEdited(this._list.element,!0),this._editingItem=t,this._list.refreshItem(t)}stopEditing(t){g.markBeingEdited(this._list.element,!1),this._editingItem=null,this._editingRow=null,this._list.refreshItem(t),this.focus()}_createListItems(){const t=v.ActionRegistry.instance().actions().sort((t,e)=>t.category()<e.category()?-1:t.category()>e.category()?1:t.id()<e.id()?-1:t.id()>e.id()?1:0),e=[];let s;return t.forEach(t=>{s!==t.category()&&e.push(t.category()),e.push(t),s=t.category()}),e}onEscapeKeyPressed(t){const e=document.deepActiveElement();this._editingRow&&e&&"INPUT"===e.nodeName&&this._editingRow.onEscapeKeyPressed(t)}update(){this._editingItem&&this.stopEditing(this._editingItem),this._list.refreshAllItems(),this._list.selectedItem()||this._list.selectItem(this._items.at(0))}willHide(){this._editingItem&&this.stopEditing(this._editingItem)}}class V{constructor(t,e,s){this._isEditing=!!s,this._settingsTab=e,this._item=t,this.element=document.createElement("div"),this._editedShortcuts=new Map,this._shortcutInputs=new Map,this._shortcuts=x.ShortcutRegistry.instance().shortcutsForAction(t.id()),this._elementToFocus=null,this._confirmButton=null,this._addShortcutLinkContainer=null,this._errorMessageElement=null,this._update()}focus(){this._elementToFocus&&this._elementToFocus.focus()}_update(){this.element.removeChildren(),this._elementToFocus=null,this._shortcutInputs.clear(),this.element.classList.toggle("keybinds-editing",this._isEditing),this.element.createChild("div","keybinds-action-name keybinds-list-text").textContent=this._item.title(),this._shortcuts.forEach(this._createShortcutRow,this),0===this._shortcuts.length&&this._createEmptyInfo(),this._isEditing&&this._setupEditor()}_createEmptyInfo(){if(x.ShortcutRegistry.instance().actionHasDefaultShortcut(this._item.id())){const t=E.Icon.create("largeicon-shortcut-changed","keybinds-modified");d.setAccessibleName(t,O(K.shortcutModified)),this.element.appendChild(t)}if(!this._isEditing){const t=this.element.createChild("div","keybinds-shortcut keybinds-list-text");d.setAccessibleName(t,O(K.noShortcutForAction)),r.experiments.isEnabled("keyboardShortcutEditor")&&this.element.appendChild(this._createEditButton())}}_setupEditor(){this._addShortcutLinkContainer=this.element.createChild("div","keybinds-shortcut devtools-link");const t=this._addShortcutLinkContainer.createChild("span","devtools-link");t.textContent=O(K.addAShortcut),t.tabIndex=0,d.markAsLink(t),self.onInvokeElement(t,this._addShortcut.bind(this)),this._elementToFocus||(this._elementToFocus=t),this._errorMessageElement=this.element.createChild("div","keybinds-info keybinds-error hidden"),d.markAsAlert(this._errorMessageElement),this.element.appendChild(this._createIconButton(O(K.ResetShortcutsForAction),"largeicon-undo","",this._resetShortcutsToDefaults.bind(this))),this._confirmButton=this._createIconButton(O(K.confirmChanges),"largeicon-checkmark","keybinds-confirm-button",()=>this._settingsTab.commitChanges(this._item,this._editedShortcuts)),this.element.appendChild(this._confirmButton),this.element.appendChild(this._createIconButton(O(K.discardChanges),"largeicon-delete","keybinds-cancel-button",()=>this._settingsTab.stopEditing(this._item))),this.element.addEventListener("keydown",t=>{isEscKey(t)&&(this._settingsTab.stopEditing(this._item),t.consume(!0))})}_addShortcut(){const t=new y.KeyboardShortcut([],this._item.id(),y.Type.UnsetShortcut);this._shortcuts.push(t),this._update();const e=this._shortcutInputs.get(t);e&&e.focus()}_createShortcutRow(t,e){if(this._editedShortcuts.has(t)&&!this._editedShortcuts.get(t))return;let s;t.type===y.Type.UnsetShortcut||t.isDefault()||(s=E.Icon.create("largeicon-shortcut-changed","keybinds-modified"),d.setAccessibleName(s,O(K.shortcutModified)),this.element.appendChild(s));const i=this.element.createChild("div","keybinds-shortcut keybinds-list-text");if(this._isEditing){const e=i.createChild("input","harmony-input");e.spellcheck=!1,this._shortcutInputs.set(t,e),this._elementToFocus||(this._elementToFocus=e),e.value=t.title();const s=this._editedShortcuts.get(t);s&&(e.value=s.map(this._shortcutInputTextForDescriptor.bind(this)).join(" ")),e.addEventListener("keydown",this._onShortcutInputKeyDown.bind(this,t,e)),i.appendChild(this._createIconButton(O(K.removeShortcut),"largeicon-trash-bin","keybinds-delete-button",()=>{const e=this._shortcuts.indexOf(t);t.isDefault()||this._shortcuts.splice(e,1),this._editedShortcuts.set(t,null),this._update(),this.focus(),this._validateInputs()}))}else{t.descriptors.flatMap(t=>t.name.split(" + ")).forEach(t=>{i.createChild("span","keybinds-key").textContent=t}),r.experiments.isEnabled("keyboardShortcutEditor")&&0===e&&this.element.appendChild(this._createEditButton())}}_createEditButton(){return this._createIconButton(O(K.editShortcut),"largeicon-edit","keybinds-edit-button",()=>this._settingsTab.startEditing(this._item))}_createIconButton(t,e,s,i){const n=document.createElement("button");return n.appendChild(E.Icon.create(e)),n.addEventListener("click",i),d.setAccessibleName(n,t),s&&n.classList.add(s),n}_onShortcutInputKeyDown(t,e,s){if("Tab"!==s.key){const i=y.KeyboardShortcut.makeKeyFromEvent(s),n=y.KeyboardShortcut.keyCodeAndModifiersFromKey(i),o=y.KeyboardShortcut.makeDescriptor({code:i,name:s.key},n.modifiers);e.value=this._shortcutInputTextForDescriptor(o),this._editedShortcuts.set(t,[o]),this._validateInputs(),s.consume(!0)}}_shortcutInputTextForDescriptor(t){return y.KeyboardShortcut.isModifier(t.key)?t.name.slice(0,t.name.lastIndexOf("+")):t.name}_resetShortcutsToDefaults(){this._editedShortcuts.clear();for(const t of this._shortcuts)if(t.type===y.Type.UnsetShortcut){const e=this._shortcuts.indexOf(t);this._shortcuts.splice(e,1)}else t.type===y.Type.UserShortcut&&this._editedShortcuts.set(t,null);x.ShortcutRegistry.instance().disabledDefaultsForAction(this._item.id()).forEach(t=>{this._shortcuts.push(t),this._editedShortcuts.set(t,t.descriptors)}),this._update(),this.focus()}onEscapeKeyPressed(t){const e=document.deepActiveElement();for(const[s,i]of this._shortcutInputs.entries())e===i&&this._onShortcutInputKeyDown(s,i,t)}_validateInputs(){const t=this._confirmButton,e=this._errorMessageElement;t&&e&&(t.disabled=!1,e.classList.add("hidden"),this._shortcutInputs.forEach((s,i)=>{const n=this._editedShortcuts.get(i);if(!n)return;if(y.KeyboardShortcut.isModifier(n[0].key))return t.disabled=!0,s.classList.add("error-input"),d.setInvalid(s,!0),e.classList.remove("hidden"),void(e.textContent=O(K.shortcutsCannotContainOnly));const o=x.ShortcutRegistry.instance().actionsForDescriptors(n).filter(t=>t!==this._item.id());if(o.length){t.disabled=!0,s.classList.add("error-input"),d.setInvalid(s,!0),e.classList.remove("hidden");const i=v.ActionRegistry.instance().action(o[0]);if(!i)return;e.textContent=O(K.thisShortcutIsInUseByS,{PH1:i.title()})}else s.classList.remove("error-input"),d.setInvalid(s,!1)}))}}var j=Object.freeze({__proto__:null,UIStrings:K,KeybindsSettingsTab:H,ShortcutListItem:V,KeybindsItem:void 0});export{U as FrameworkBlackboxSettingsTab,j as KeybindsSettingsTab,B as SettingsScreen};
