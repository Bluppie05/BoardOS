import*as RootModule from'../root/root.js';RootModule.Runtime.cachedResources.set("perf_ui/chartViewport.css","/*\n * Copyright 2017 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.chart-viewport-v-scroll {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  overflow-x: hidden;\n  z-index: 200;\n  padding-left: 1px;\n}\n\n.chart-viewport-v-scroll.always-show-scrollbar {\n  overflow-y: scroll;\n}\n\n/* force non overlay scrollbars for Mac */\n\n:host-context(.platform-mac) .chart-viewport-v-scroll {\n  right: 2px;\n  top: 3px;\n  bottom: 3px;\n}\n\n:host-context(.platform-mac) ::-webkit-scrollbar {\n  width: 8px;\n}\n\n:host-context(.platform-mac) ::-webkit-scrollbar-thumb {\n  background-color: hsl(0deg 0% 56% / 60%);\n  border-radius: 50px;\n}\n\n:host-context(.platform-mac) .chart-viewport-v-scroll:hover::-webkit-scrollbar-thumb {\n  background-color: hsl(0deg 0% 25% / 60%);\n}\n\n/* force non overlay scrollbars for Aura Overlay Scrollbar enabled */\n\n:host-context(.overlay-scrollbar-enabled) ::-webkit-scrollbar {\n  width: 10px;\n}\n\n:host-context(.overlay-scrollbar-enabled) ::-webkit-scrollbar-thumb {\n  background-color: hsl(0deg 0% 0% / 50%);\n}\n\n:host-context(.overlay-scrollbar-enabled) .chart-viewport-v-scroll:hover::-webkit-scrollbar-thumb {\n  background-color: hsl(0deg 0% 0% / 70%);\n}\n\n.chart-viewport-selection-overlay {\n  position: absolute;\n  z-index: 100;\n  background-color: rgb(56 121 217 / 30%);\n  border-color: rgb(16 81 177);\n  border-width: 0 1px;\n  border-style: solid;\n  pointer-events: none;\n  top: 0;\n  bottom: 0;\n  text-align: center;\n}\n\n.chart-viewport-selection-overlay .time-span {\n  white-space: nowrap;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n/*# sourceURL=perf_ui/chartViewport.css */");RootModule.Runtime.cachedResources.set("perf_ui/filmStripView.css","/*\n * Copyright (c) 2015 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.film-strip-view {\n  overflow-x: auto;\n  overflow-y: hidden;\n  align-content: flex-start;\n  min-height: 81px;\n}\n\n.film-strip-view .frame .time {\n  font-size: 10px;\n  margin-top: 2px;\n}\n\n.film-strip-view.time-based .frame .time {\n  display: none;\n}\n\n.film-strip-view .label {\n  margin: auto;\n  font-size: 18px;\n  color: #999;\n}\n\n.film-strip-view .frame {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 4px;\n  flex: none;\n  cursor: pointer;\n}\n\n.film-strip-view .frame .thumbnail {\n  min-width: 24px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  pointer-events: none;\n  margin: 4px 0 2px;\n  border: 2px solid transparent;\n}\n\n.film-strip-view .frame:hover .thumbnail,\n.film-strip-view .frame:focus .thumbnail {\n  border-color: #fbca46;\n}\n\n.film-strip-view .frame .thumbnail img {\n  height: auto;\n  width: auto;\n  max-width: 80px;\n  max-height: 50px;\n  pointer-events: none;\n  box-shadow: 0 0 3px #bbb;\n  flex: 0 0 auto;\n}\n\n.film-strip-view .frame:hover .thumbnail img,\n.film-strip-view .frame:focus .thumbnail img {\n  box-shadow: none;\n}\n\n/*# sourceURL=perf_ui/filmStripView.css */");RootModule.Runtime.cachedResources.set("perf_ui/flameChart.css","/*\n * Copyright 2017 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.flame-chart-main-pane {\n  overflow: hidden;\n}\n\n.flame-chart-marker-highlight-element {\n  position: absolute;\n  top: 1px;\n  height: 18px;\n  width: 6px;\n  margin: 0 -3px;\n  content: \"\";\n  display: block;\n}\n\n.flame-chart-canvas:focus-visible {\n  border-top: 1px solid var(--accent-color);\n  border-bottom: 1px solid var(--accent-color);\n}\n\n.flame-chart-highlight-element {\n  position: absolute;\n  pointer-events: none;\n  background-color: rgb(56 121 217 / 10%);\n}\n\n.flame-chart-selected-element {\n  position: absolute;\n  pointer-events: none;\n  outline: 2px solid var(--selection-bg-color);\n  background-color: rgb(56 121 217 / 10%);\n}\n\n.flame-chart-unfocused-selected-element {\n  outline: 2px solid rgb(123 123 123 / 100%);\n}\n\n.chart-cursor-element {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 100;\n  width: 2px;\n  background-color: var(--selection-bg-color);\n  pointer-events: none;\n}\n\n.flame-chart-entry-info:not(:empty) {\n  z-index: 2000;\n  position: absolute;\n  background-color: white;\n  pointer-events: none;\n  padding: 4px 8px;\n  white-space: nowrap;\n  max-width: 80%;\n  box-shadow: var(--drop-shadow);\n}\n\n.flame-chart-entry-info table tr td:empty {\n  padding: 0;\n}\n\n.flame-chart-entry-info table tr td:not(:empty) {\n  padding: 0 5px;\n  white-space: nowrap;\n}\n\n.flame-chart-entry-info table tr td:first-child {\n  font-weight: bold;\n}\n\n.flame-chart-entry-info table tr td span {\n  margin-right: 5px;\n}\n\n/*# sourceURL=perf_ui/flameChart.css */");RootModule.Runtime.cachedResources.set("perf_ui/overviewGrid.css","/*\n * Copyright (c) 2014 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.overview-grid-window-selector {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  background-color: rgb(125 173 217 / 50%);\n  z-index: 250;\n  pointer-events: none;\n}\n\n.overview-grid-window-resizer {\n  position: absolute;\n  top: -1px;\n  height: 20px;\n  width: 6px;\n  margin-left: -3px;\n  background-color: rgb(153 153 153);\n  border: 1px solid white;\n  z-index: 500;\n}\n\n.overview-grid-window-resizer:focus-visible {\n  background-color: var(--active-control-bg-color);\n}\n\n.overview-grid-cursor-area {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 20px;\n  bottom: 0;\n  z-index: 500;\n  cursor: text;\n}\n\n.overview-grid-cursor-position {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 2px;\n  background-color: hsl(220deg 95% 50% / 70%);\n  z-index: 500;\n  pointer-events: none;\n  visibility: hidden;\n  overflow: hidden;\n}\n\n.window-curtain-left,\n.window-curtain-right {\n  background-color: hsl(0deg 0% 80% / 50%);\n  position: absolute;\n  top: 0;\n  height: 100%;\n  z-index: 300;\n  pointer-events: none;\n  border: 1px none hsl(0deg 0% 70% / 50%);\n}\n\n.window-curtain-left {\n  left: 0;\n  border-right-style: solid;\n}\n\n.window-curtain-right {\n  right: 0;\n  border-left-style: solid;\n}\n\n@media (forced-colors: active) {\n  .overview-grid-cursor-position {\n    forced-color-adjust: none;\n    background-color: Highlight;\n  }\n\n  .window-curtain-left,\n  .window-curtain-right {\n    background-color: transparent;\n    border-color: ButtonText;\n  }\n\n  .overview-grid-window-resizer {\n    background-color: ButtonText;\n  }\n\n  .overview-grid-window-resizer:hover,\n  .overview-grid-window-resizer:active,\n  .overview-grid-window-resizer:focus-visible {\n    forced-color-adjust: none;\n    background-color: Highlight;\n  }\n}\n\n/*# sourceURL=perf_ui/overviewGrid.css */");RootModule.Runtime.cachedResources.set("perf_ui/timelineGrid.css","/*\n * Copyright (c) 2015 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.resources-dividers {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  z-index: -100;\n  bottom: 0;\n}\n\n.resources-event-dividers {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 100%;\n  top: 0;\n  z-index: 300;\n  pointer-events: none;\n}\n\n.resources-dividers-label-bar {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  background-color: rgb(255 255 255 / 85%);\n  background-clip: padding-box;\n  height: 20px;\n  z-index: 200;\n  pointer-events: none;\n  overflow: hidden;\n}\n\n.resources-divider {\n  position: absolute;\n  width: 1px;\n  top: 0;\n  bottom: 0;\n  background-color: rgb(0 0 0 / 10%);\n}\n\n.resources-event-divider {\n  position: absolute;\n  width: 1px;\n  top: 0;\n  bottom: 0;\n  z-index: 300;\n}\n\n.resources-divider-label {\n  position: absolute;\n  top: 4px;\n  right: 3px;\n  font-size: 80%;\n  white-space: nowrap;\n  pointer-events: none;\n}\n\n.timeline-grid-header {\n  height: 20px;\n  pointer-events: none;\n}\n\n/*# sourceURL=perf_ui/timelineGrid.css */");RootModule.Runtime.cachedResources.set("perf_ui/timelineOverviewInfo.css","/*\n * Copyright 2017 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.overview-info:not(:empty) {\n  display: flex;\n  background: white;\n  box-shadow: var(--drop-shadow);\n  padding: 3px;\n}\n\n.overview-info .frame .time {\n  display: none;\n}\n\n.overview-info .frame .thumbnail img {\n  max-width: 50vw;\n  max-height: 50vh;\n}\n\n/*# sourceURL=perf_ui/timelineOverviewInfo.css */");