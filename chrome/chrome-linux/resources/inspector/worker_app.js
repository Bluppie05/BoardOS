Root.allDescriptors.push(...[{"extensions":[{"defaultValue":[],"type":"setting","settingName":"customNetworkConditions","settingType":"array"},{"category":"Network","tags":"device, throttling","title":"Go offline","className":"MobileThrottling.ThrottlingManager.ActionDelegate","actionId":"network-conditions.network-offline","type":"action"},{"category":"Network","tags":"device, throttling","title":"Enable slow 3G throttling","className":"MobileThrottling.ThrottlingManager.ActionDelegate","actionId":"network-conditions.network-low-end-mobile","type":"action"},{"category":"Network","tags":"device, throttling","title":"Enable fast 3G throttling","className":"MobileThrottling.ThrottlingManager.ActionDelegate","actionId":"network-conditions.network-mid-tier-mobile","type":"action"},{"category":"Network","tags":"device, throttling","title":"Go online","className":"MobileThrottling.ThrottlingManager.ActionDelegate","actionId":"network-conditions.network-online","type":"action"},{"title":"Throttling","settings":["customNetworkConditions"],"id":"throttling-conditions","className":"MobileThrottling.ThrottlingSettingsTab","location":"settings-view","type":"view","order":35}],"dependencies":["common","sdk","ui","protocol_client"],"modules":["mobile_throttling.js","mobile_throttling-legacy.js","ThrottlingPresets.js","MobileThrottlingSelector.js","NetworkPanelIndicator.js","NetworkThrottlingSelector.js","ThrottlingSettingsTab.js","ThrottlingManager.js"],"name":"mobile_throttling"},{"dependencies":["common","browser_sdk"],"modules":["har_importer.js","har_importer-legacy.js","HARFormat.js","HARImporter.js"],"name":"har_importer"},{"extensions":[{"title":"Elements","id":"elements","className":"Elements.ElementsPanel","location":"panel","type":"view","order":10},{"className":"Elements.ElementsPanel.ContextMenuProvider","contextTypes":["SDK.RemoteObject","SDK.DOMNode","SDK.DeferredDOMNode"],"type":"@UI.ContextMenu.Provider"},{"className":"Elements.ElementsTreeOutline.Renderer","contextTypes":["SDK.DOMNode","SDK.DeferredDOMNode"],"type":"@UI.Renderer"},{"className":"Elements.ElementsPanel.DOMNodeRevealer","contextTypes":["SDK.DOMNode","SDK.DeferredDOMNode","SDK.RemoteObject"],"destination":"Elements panel","type":"@Common.Revealer"},{"className":"Elements.DOMLinkifier.Linkifier","contextTypes":["SDK.DOMNode","SDK.DeferredDOMNode"],"type":"@Common.Linkifier"},{"className":"Elements.ElementsPanel.CSSPropertyRevealer","contextTypes":["SDK.CSSProperty"],"destination":"styles sidebar","type":"@Common.Revealer"},{"category":"Elements","title":"Show user agent shadow DOM","defaultValue":false,"settingName":"showUAShadowDOM","settingType":"boolean","type":"setting","order":1},{"category":"Elements","title":"Word wrap","defaultValue":true,"options":[{"value":true,"title":"Enable DOM word wrap"},{"value":false,"title":"Disable DOM word wrap"}],"settingName":"domWordWrap","settingType":"boolean","type":"setting","order":2},{"category":"Elements","title":"Show HTML comments","defaultValue":true,"options":[{"value":true,"title":"Show HTML comments"},{"value":false,"title":"Hide HTML comments"}],"settingName":"showHTMLComments","settingType":"boolean","type":"setting","order":3},{"category":"Elements","title":"Reveal DOM node on hover","defaultValue":true,"settingName":"highlightNodeOnHoverInOverlay","settingType":"boolean","type":"setting","order":4},{"category":"Elements","title":"Show detailed inspect tooltip","defaultValue":true,"settingName":"showDetailedInspectTooltip","settingType":"boolean","type":"setting","order":5},{"defaultValue":true,"type":"setting","settingName":"showEventListenersForAncestors","settingType":"boolean"},{"className":"Elements.ElementStatePaneWidget.ButtonProvider","type":"@UI.ToolbarItem.Provider","order":1,"location":"styles-sidebarpane-toolbar"},{"className":"Elements.ClassesPaneWidget.ButtonProvider","type":"@UI.ToolbarItem.Provider","order":2,"location":"styles-sidebarpane-toolbar"},{"className":"Elements.StylesSidebarPane.ButtonProvider","type":"@UI.ToolbarItem.Provider","order":100,"location":"styles-sidebarpane-toolbar"},{"category":"Elements","title":"Hide element","className":"Elements.ElementsActionDelegate","contextTypes":["Elements.ElementsPanel"],"actionId":"elements.hide-element","bindings":[{"shortcut":"H"}],"type":"action"},{"category":"Elements","title":"Edit as HTML","className":"Elements.ElementsActionDelegate","contextTypes":["Elements.ElementsPanel"],"actionId":"elements.edit-as-html","bindings":[{"shortcut":"F2"}],"type":"action"},{"category":"Elements","title":"Undo","className":"Elements.ElementsActionDelegate","contextTypes":["Elements.ElementsPanel"],"actionId":"elements.undo","bindings":[{"platform":"windows,linux","shortcut":"Ctrl+Z"},{"platform":"mac","shortcut":"Meta+Z"}],"type":"action"},{"category":"Elements","title":"Redo","className":"Elements.ElementsActionDelegate","contextTypes":["Elements.ElementsPanel"],"actionId":"elements.redo","bindings":[{"platform":"windows,linux","shortcut":"Ctrl+Y"},{"platform":"mac","shortcut":"Meta+Shift+Z"}],"type":"action"},{"className":"Elements.ElementsPanel.PseudoStateMarkerDecorator","marker":"pseudo-state-marker","type":"@Elements.MarkerDecorator"},{"marker":"hidden-marker","factoryName":"Elements.GenericDecorator","type":"@Elements.MarkerDecorator","color":"#555","title":"Element is hidden"},{"category":"Elements","iconClass":"largeicon-node-search","title":"Select an element in the page to inspect it","className":"Elements.InspectElementModeController.ToggleSearchActionDelegate","actionId":"elements.toggle-element-search","toggleable":true,"bindings":[{"platform":"windows,linux","shortcut":"Ctrl+Shift+C"},{"platform":"mac","shortcut":"Meta+Shift+C"}],"type":"action"},{"className":"Elements.InspectElementModeController.ToggleSearchActionDelegate","category":"Screenshot","type":"action","actionId":"elements.capture-area-screenshot","title":"Capture area screenshot"},{"order":0,"type":"@UI.ToolbarItem.Provider","actionId":"elements.toggle-element-search","location":"main-toolbar-left"},{"category":"Elements","className":"Elements.ElementsPanel","type":"@UI.ViewLocationResolver","name":"elements-sidebar"},{"title":"Event Listeners","id":"elements.eventListeners","className":"Elements.EventListenersWidget","location":"elements-sidebar","hasToolbar":true,"type":"view","order":5,"persistence":"permanent"},{"title":"Properties","id":"elements.domProperties","className":"Elements.PropertiesWidget","location":"elements-sidebar","type":"view","order":7,"persistence":"permanent"},{"title":"Stack Trace","id":"elements.domCreation","className":"Elements.NodeStackTraceWidget","experiment":"captureNodeCreationStacks","location":"elements-sidebar","type":"view","order":10,"persistence":"permanent"},{"title":"Layout","id":"elements.layout","className":"Elements.LayoutSidebarPane","experiment":"cssGridFeatures","location":"elements-sidebar","hasToolbar":false,"type":"view","order":4,"persistence":"permanent"}],"dependencies":["components","extensions","inline_editor","color_picker","event_listeners"],"modules":["elements_module.js","elements-legacy.js"],"name":"elements"},{"dependencies":["ui","host"],"extensions":[{"title":"What's New","id":"release-note","className":"Help.ReleaseNoteView","location":"drawer-view","type":"view","order":1,"persistence":"closeable"},{"category":"Appearance","title":"Show What's New after each update","defaultValue":true,"settingName":"help.show-release-note","settingType":"boolean","type":"setting","options":[{"value":true,"title":"Show What's New after each update"},{"value":false,"title":"Do not show What's New after each update"}]},{"category":"Help","className":"Help.ReleaseNotesActionDelegate","type":"action","actionId":"help.release-notes","title":"Release notes"},{"order":10,"type":"context-menu-item","location":"mainMenuHelp/default","actionId":"help.release-notes"},{"category":"Help","tags":"bug","title":"Report a DevTools issue","className":"Help.ReportIssueActionDelegate","actionId":"help.report-issue","type":"action"},{"order":11,"type":"context-menu-item","location":"mainMenuHelp/default","actionId":"help.report-issue"},{"className":"Help.HelpLateInitialization","type":"late-initialization"}],"name":"help","skip_compilation":["help-legacy.js"],"modules":["help_module.js","help-legacy.js"]},{"extensions":[{"title":"Performance","id":"timeline","className":"Timeline.TimelinePanel","location":"panel","type":"view","order":50},{"category":"Performance","title":"Hide chrome frame in Layers view","defaultValue":false,"settingName":"frameViewerHideChromeWindow","settingType":"boolean","type":"setting"},{"className":"Timeline.LoadTimelineHandler","type":"@Common.QueryParamHandler","name":"loadTimelineFromURL"},{"className":"Timeline.CLSLinkifier.Linkifier","contextTypes":["Timeline.CLSLinkifier.CLSRect"],"type":"@Common.Linkifier"},{"order":10,"type":"context-menu-item","location":"timelineMenu/open","actionId":"timeline.load-from-file"},{"order":15,"type":"context-menu-item","location":"timelineMenu/open","actionId":"timeline.save-to-file"},{"category":"Performance","iconClass":"largeicon-start-recording","toggledIconClass":"largeicon-stop-recording","className":"Timeline.TimelinePanel.ActionDelegate","toggleWithRedColor":true,"actionId":"timeline.toggle-recording","toggleable":true,"contextTypes":["Timeline.TimelinePanel"],"bindings":[{"platform":"windows,linux","shortcut":"Ctrl+E"},{"platform":"mac","shortcut":"Meta+E"}],"type":"action","options":[{"value":true,"title":"Record"},{"value":false,"title":"Stop"}]},{"iconClass":"largeicon-refresh","category":"Performance","title":"Start profiling and reload page","className":"Timeline.TimelinePanel.ActionDelegate","contextTypes":["Timeline.TimelinePanel"],"actionId":"timeline.record-reload","bindings":[{"platform":"windows,linux","shortcut":"Ctrl+Shift+E"},{"platform":"mac","shortcut":"Meta+Shift+E"}],"type":"action"},{"category":"Performance","title":"Save profile\u2026","className":"Timeline.TimelinePanel.ActionDelegate","contextTypes":["Timeline.TimelinePanel"],"actionId":"timeline.save-to-file","bindings":[{"platform":"windows,linux","shortcut":"Ctrl+S"},{"platform":"mac","shortcut":"Meta+S"}],"type":"action"},{"category":"Performance","title":"Load profile\u2026","className":"Timeline.TimelinePanel.ActionDelegate","contextTypes":["Timeline.TimelinePanel"],"actionId":"timeline.load-from-file","bindings":[{"platform":"windows,linux","shortcut":"Ctrl+O"},{"platform":"mac","shortcut":"Meta+O"}],"type":"action"},{"category":"Performance","title":"Previous frame","className":"Timeline.TimelinePanel.ActionDelegate","contextTypes":["Timeline.TimelinePanel"],"actionId":"timeline.jump-to-previous-frame","bindings":[{"shortcut":"["}],"type":"action"},{"category":"Performance","title":"Next frame","className":"Timeline.TimelinePanel.ActionDelegate","contextTypes":["Timeline.TimelinePanel"],"actionId":"timeline.jump-to-next-frame","bindings":[{"shortcut":"]"}],"type":"action"},{"category":"Performance","title":"Show recent timeline sessions","className":"Timeline.TimelinePanel.ActionDelegate","contextTypes":["Timeline.TimelinePanel"],"actionId":"timeline.show-history","bindings":[{"platform":"windows,linux","shortcut":"Ctrl+H"},{"platform":"mac","shortcut":"Meta+Y"}],"type":"action"},{"title":"JavaScript Profiler","id":"js_profiler","className":"Profiler.JSProfilerPanel","location":"panel","type":"view","order":65,"persistence":"closeable"},{"category":"Performance","title":"Previous recording","className":"Timeline.TimelinePanel.ActionDelegate","contextTypes":["Timeline.TimelinePanel"],"actionId":"timeline.previous-recording","bindings":[{"platform":"windows,linux","shortcut":"Alt+Left"},{"platform":"mac","shortcut":"Meta+Left"}],"type":"action"},{"category":"Performance","title":"Next recording","className":"Timeline.TimelinePanel.ActionDelegate","contextTypes":["Timeline.TimelinePanel"],"actionId":"timeline.next-recording","bindings":[{"platform":"windows,linux","shortcut":"Alt+Right"},{"platform":"mac","shortcut":"Meta+Right"}],"type":"action"}],"dependencies":["components","coverage","layer_viewer","timeline_model","perf_ui","extensions","data_grid","profiler","mobile_throttling"],"modules":["timeline_module.js","timeline-legacy.js"],"name":"timeline"},{"dependencies":["elements","sources","console"],"extensions":[{"title":"Event Listener Breakpoints","id":"sources.eventListenerBreakpoints","className":"BrowserDebugger.EventListenerBreakpointsSidebarPane","location":"sources.sidebar-bottom","type":"view","order":9,"persistence":"permanent"},{"className":"BrowserDebugger.XHRBreakpointsSidebarPane","contextTypes":["SDK.DebuggerPausedDetails"],"type":"@UI.ContextFlavorListener"},{"title":"XHR/fetch Breakpoints","id":"sources.xhrBreakpoints","className":"BrowserDebugger.XHRBreakpointsSidebarPane","location":"sources.sidebar-bottom","hasToolbar":true,"type":"view","order":5,"persistence":"permanent"},{"title":"DOM Breakpoints","id":"sources.domBreakpoints","className":"BrowserDebugger.DOMBreakpointsSidebarPane","location":"sources.sidebar-bottom","type":"view","order":7,"persistence":"permanent"},{"title":"DOM Breakpoints","id":"elements.domBreakpoints","className":"BrowserDebugger.DOMBreakpointsSidebarPane","location":"elements-sidebar","type":"view","order":6,"persistence":"permanent"},{"marker":"breakpoint-marker","factoryName":"Elements.GenericDecorator","type":"@Elements.MarkerDecorator","color":"rgb(105, 140, 254)","title":"DOM Breakpoint"},{"className":"BrowserDebugger.DOMBreakpointsSidebarPane.ContextMenuProvider","contextTypes":["SDK.DOMNode"],"type":"@UI.ContextMenu.Provider"},{"className":"BrowserDebugger.DOMBreakpointsSidebarPane","contextTypes":["SDK.DebuggerPausedDetails"],"type":"@UI.ContextFlavorListener"},{"title":"Global Listeners","id":"sources.globalListeners","className":"BrowserDebugger.ObjectEventListenersSidebarPane","location":"sources.sidebar-bottom","hasToolbar":true,"type":"view","order":8,"persistence":"permanent"},{"title":"Page","id":"navigator-network","className":"Sources.NetworkNavigatorView","location":"navigator-view","type":"view","order":2,"persistence":"permanent"},{"title":"Overrides","id":"navigator-overrides","className":"Sources.OverridesNavigatorView","location":"navigator-view","type":"view","order":4,"persistence":"permanent"},{"title":"Content scripts","id":"navigator-contentScripts","className":"Sources.ContentScriptsNavigatorView","location":"navigator-view","type":"view","order":5,"persistence":"permanent"},{"className":"Sources.OverridesNavigatorView","viewId":"navigator-overrides","type":"@Sources.NavigatorView"},{"className":"Sources.ContentScriptsNavigatorView","viewId":"navigator-contentScripts","type":"@Sources.NavigatorView"}],"name":"browser_debugger","skip_compilation":["browser_debugger-legacy.js"],"modules":["browser_debugger_module.js","browser_debugger-legacy.js"]},{"extensions":[{"category":"Layers","bindings":[{"shortcut":"0"}],"type":"action","actionId":"layers.reset-view","title":"Reset view"},{"category":"Layers","bindings":[{"shortcut":"x"}],"type":"action","actionId":"layers.pan-mode","title":"Switch to pan mode"},{"category":"Layers","bindings":[{"shortcut":"v"}],"type":"action","actionId":"layers.rotate-mode","title":"Switch to rotate mode"},{"category":"Layers","bindings":[{"shortcut":"Shift+Plus"},{"shortcut":"NumpadPlus"}],"type":"action","actionId":"layers.zoom-in","title":"Zoom in"},{"category":"Layers","bindings":[{"shortcut":"Shift+Minus"},{"shortcut":"NumpadMinus"}],"type":"action","actionId":"layers.zoom-out","title":"Zoom out"},{"category":"Layers","bindings":[{"shortcut":"Up"},{"shortcut":"w"}],"type":"action","actionId":"layers.up","title":"Pan or rotate up"},{"category":"Layers","bindings":[{"shortcut":"Down"},{"shortcut":"s"}],"type":"action","actionId":"layers.down","title":"Pan or rotate down"},{"category":"Layers","bindings":[{"shortcut":"Left"},{"shortcut":"a"}],"type":"action","actionId":"layers.left","title":"Pan or rotate left"},{"category":"Layers","bindings":[{"shortcut":"Right"},{"shortcut":"d"}],"type":"action","actionId":"layers.right","title":"Pan or rotate right"}],"dependencies":["components","sdk","timeline_model","ui","perf_ui"],"modules":["layer_viewer_module.js","layer_viewer-legacy.js"],"name":"layer_viewer"},{"dependencies":["common","platform","ui","host","components","sdk","marked","network","browser_sdk"],"extensions":[{"title":"Issues","id":"issues-pane","className":"Issues.IssuesPane","location":"drawer-view","type":"view","order":100,"persistence":"closeable"},{"className":"Issues.IssueRevealer","contextTypes":["SDK.Issue"],"destination":"Issues view","type":"@Common.Revealer"}],"name":"issues","skip_compilation":["issues-legacy.js"],"modules":["issues_module.js","issues-legacy.js"]},{"dependencies":["ui","sdk","data_grid"],"modules":["cookie_table_module.js","cookie_table-legacy.js"],"name":"cookie_table"},{"dependencies":["sdk"],"modules":["timeline_model.js","timeline_model-legacy.js","TimelineModelFilter.js","TracingLayerTree.js","TimelineModel.js","TimelineIRModel.js","TimelineJSProfile.js","TimelineFrameModel.js","TimelineProfileTree.js"],"name":"timeline_model"},{"dependencies":["common","platform","ui","host","components","sdk","network","browser_sdk"],"extensions":[{"title":"Developer Resources","id":"resource-loading-pane","className":"DeveloperResources.DeveloperResourcesView","experiment":"developerResourcesView","location":"drawer-view","type":"view","order":100,"persistence":"closeable"}],"name":"developer_resources","skip_compilation":["developer_resources-legacy.js"],"modules":["developer_resources_module.js","developer_resources-legacy.js"]},{"extensions":[{"className":"WorkerMain.WorkerMain","type":"early-initialization"}],"dependencies":["components","mobile_throttling"],"modules":["worker_main.js","worker_main-legacy.js","WorkerMain.js"],"name":"worker_main"},{"extensions":[{"title":"Application","tags":"pwa","id":"resources","className":"Resources.ResourcesPanel","location":"panel","type":"view","order":70},{"className":"Resources.ResourcesPanel.ResourceRevealer","contextTypes":["SDK.Resource"],"destination":"Application panel","type":"@Common.Revealer"},{"className":"Resources.ResourcesPanel.CookieReferenceRevealer","contextTypes":["SDK.CookieReference"],"destination":"Application panel","type":"@Common.Revealer"},{"category":"Resources","className":"Resources.ClearStorageView.ActionDelegate","type":"action","actionId":"resources.clear","title":"Clear site data"},{"iconClass":"largeicon-start-recording","toggledIconClass":"largeicon-stop-recording","className":"Resources.BackgroundServiceView.ActionDelegate","toggleWithRedColor":true,"actionId":"background-service.toggle-recording","toggleable":true,"contextTypes":["Resources.BackgroundServiceView"],"bindings":[{"platform":"windows,linux","shortcut":"Ctrl+E"},{"platform":"mac","shortcut":"Meta+E"}],"category":"Background Services","type":"action","options":[{"value":true,"title":"Start recording events"},{"value":false,"title":"Stop recording events"}]}],"dependencies":["source_frame","cookie_table","inline_editor","data_grid","components","object_ui","perf_ui","mobile_throttling","network","sources","browser_sdk","i18n"],"modules":["resources_module.js","resources-legacy.js"],"name":"resources"},{"extensions":[{"title":"Network","id":"network","className":"Network.NetworkPanel","location":"panel","type":"view","order":40},{"className":"Network.NetworkPanel.ContextMenuProvider","contextTypes":["SDK.NetworkRequest","SDK.Resource","Workspace.UISourceCode"],"type":"@UI.ContextMenu.Provider"},{"className":"Network.NetworkPanel.RequestRevealer","contextTypes":["SDK.NetworkRequest"],"destination":"Network panel","type":"@Common.Revealer"},{"className":"Network.NetworkPanel.RequestLocationRevealer","contextTypes":["Network.UIRequestLocation"],"type":"@Common.Revealer"},{"category":"Network","title":"Color-code resource types","defaultValue":false,"tags":"color code, resource type","settingName":"networkColorCodeResourceTypes","settingType":"boolean","type":"setting","options":[{"value":true,"title":"Color code by resource type"},{"value":false,"title":"Use default colors"}]},{"category":"Network","title":"Group network log by frame","defaultValue":false,"tags":"network, frame, group","settingName":"network.group-by-frame","settingType":"boolean","type":"setting","options":[{"value":true,"title":"Group network log items by frame"},{"value":false,"title":"Don't group network log items by frame"}]},{"category":"Network","iconClass":"largeicon-start-recording","toggledIconClass":"largeicon-stop-recording","className":"Network.NetworkPanel.ActionDelegate","toggleWithRedColor":true,"actionId":"network.toggle-recording","toggleable":true,"contextTypes":["Network.NetworkPanel"],"bindings":[{"platform":"windows,linux","shortcut":"Ctrl+E"},{"platform":"mac","shortcut":"Meta+E"}],"type":"action","options":[{"value":true,"title":"Record network log"},{"value":false,"title":"Stop recording network log"}]},{"category":"Network","title":"Hide request details","className":"Network.NetworkPanel.ActionDelegate","contextTypes":["Network.NetworkPanel"],"actionId":"network.hide-request-details","bindings":[{"shortcut":"Esc"}],"type":"action"},{"title":"Network request blocking","id":"network.blocked-urls","className":"Network.BlockedURLsPane","location":"drawer-view","type":"view","order":60,"persistence":"closeable"},{"title":"Network conditions","tags":"disk cache, network throttling, useragent, user agent, user-agent","id":"network.config","className":"Network.NetworkConfigView","location":"drawer-view","type":"view","order":40,"persistence":"closeable"},{"category":"Network","className":"Network.NetworkPanel","type":"@UI.ViewLocationResolver","name":"network-sidebar"},{"title":"Search","className":"Network.SearchNetworkView","location":"network-sidebar","type":"view","id":"network.search-network-tab","persistence":"permanent"},{"category":"Network","title":"Search","className":"Network.NetworkPanel.ActionDelegate","contextTypes":["Network.NetworkPanel"],"actionId":"network.search","bindings":[{"keybindSets":["devToolsDefault","vsCode"],"platform":"mac","shortcut":"Meta+F"},{"keybindSets":["devToolsDefault","vsCode"],"platform":"windows,linux","shortcut":"Ctrl+F"}],"type":"action"}],"dependencies":["browser_sdk","client_variations","common","components","cookie_table","data_grid","har_importer","host","mobile_throttling","object_ui","perf_ui","persistence","sdk","search","source_frame","ui"],"modules":["network_module.js","network-legacy.js"],"name":"network"}]);Root.applicationDescriptor.modules.push(...[{"type":"autostart","name":"mobile_throttling"},{"name":"har_importer"},{"name":"elements"},{"name":"help"},{"name":"timeline_model"},{"name":"timeline"},{"name":"browser_debugger"},{"name":"layer_viewer"},{"name":"cookie_table"},{"name":"resources"},{"name":"developer_resources"},{"type":"autostart","name":"worker_main"},{"name":"issues"},{"name":"network"}]);import*as RootModule from'./root/root.js';RootModule.Runtime.cachedResources.set("mobile_throttling/throttlingSettingsTab.css","/*\n * Copyright 2015 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n:host {\n  overflow: hidden;\n}\n\n.header {\n  padding: 0 0 6px;\n  border-bottom: 1px solid #eee;\n  font-size: 18px;\n  font-weight: normal;\n  flex: none;\n}\n\n.add-conditions-button {\n  flex: none;\n  margin: 10px 2px;\n  min-width: 140px;\n  align-self: flex-start;\n}\n\n.conditions-list {\n  max-width: 500px;\n  min-width: 340px;\n  flex: auto;\n}\n\n.conditions-list-item {\n  padding: 3px 5px 3px 5px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  flex: auto 1 1;\n}\n\n.conditions-list-text {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  flex: 0 0 70px;\n  user-select: none;\n  color: #222;\n  text-align: end;\n  position: relative;\n}\n\n.conditions-list-title {\n  text-align: start;\n  flex: auto;\n  display: flex;\n  align-items: flex-start;\n}\n\n.conditions-list-title-text {\n  overflow: hidden;\n  flex: auto;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n.conditions-list-separator {\n  flex: 0 0 1px;\n  background-color: rgb(231 231 231);\n  height: 30px;\n  margin: 0 4px;\n}\n\n.conditions-list-separator-invisible {\n  visibility: hidden;\n  height: 100% !important;\n}\n\n.conditions-edit-row {\n  flex: none;\n  display: flex;\n  flex-direction: row;\n  margin: 6px 5px;\n}\n\n.conditions-edit-row input {\n  width: 100%;\n  text-align: inherit;\n}\n\n.conditions-edit-optional {\n  position: absolute;\n  bottom: -20px;\n  right: 0;\n  color: rgb(128 128 128);\n}\n\n/*# sourceURL=mobile_throttling/throttlingSettingsTab.css */");import'./shell.js';import*as Startup from'./startup/startup.js';Startup.RuntimeInstantiator.startApplication('worker_app');