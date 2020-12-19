import*as RootModule from'../root/root.js';RootModule.Runtime.cachedResources.set("resources/appManifestView.css","/*\n * Copyright 2016 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n.report-field-name {\n  flex-basis: 152px;\n}\n\n/*# sourceURL=resources/appManifestView.css */");RootModule.Runtime.cachedResources.set("resources/backgroundServiceView.css",".background-service-toolbar {\n  background-color: var(--toolbar-bg-color);\n  border-bottom: var(--divider-border);\n}\n\n.data-grid {\n  flex: auto;\n  border: none;\n}\n\n.background-service-preview {\n  position: absolute;\n  background-color: white;\n  justify-content: center;\n  align-items: center;\n  overflow: auto;\n  font-size: 13px;\n  color: #777;\n}\n\n.background-service-preview > div {\n  max-width: 450px;\n  margin: 10px;\n  text-align: center;\n}\n\n.background-service-preview > div > p {\n  flex: none;\n  white-space: pre-line;\n}\n\n.background-service-shortcut {\n  color: hsl(0deg 0% 50% / 100%);\n}\n\n.background-service-metadata {\n  padding-left: 5px;\n  padding-top: 10px;\n}\n\n.background-service-metadata-entry {\n  padding-left: 10px;\n  padding-bottom: 5px;\n}\n\n.background-service-metadata-name {\n  color: rgb(33% 33% 33%);\n  display: inline-block;\n  margin-right: 0.25em;\n  font-weight: bold;\n}\n\n.background-service-metadata-value {\n  display: inline;\n  margin-right: 1em;\n  white-space: pre-wrap;\n  word-break: break-all;\n  user-select: text;\n}\n\n.background-service-empty-value {\n  color: #888;\n  font-style: italic;\n}\n\n.background-service-record-inline-button {\n  margin-bottom: 6px;\n}\n\n/*# sourceURL=resources/backgroundServiceView.css */");RootModule.Runtime.cachedResources.set("resources/clearStorageView.css","/*\n * Copyright 2016 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.report-row {\n  display: flex;\n  align-items: center;\n  white-space: normal;\n}\n\n.clear-storage-button .report-row {\n  margin: 0 0 0 17px;\n  display: flex;\n}\n\n.link {\n  margin-left: 10px;\n  display: none;\n}\n\n.report-row:hover .link {\n  display: inline;\n}\n\n.quota-override-editor-with-button {\n  align-items: baseline;\n  display: flex;\n}\n\n.quota-override-notification-editor {\n  border: solid 1px #d8d8d8;\n  display: flex;\n  flex: auto;\n  margin-right: 4px;\n  max-width: 200px;\n  min-width: 50px;\n  min-height: 24px;\n  padding-left: 4px;\n}\n\n.quota-override-notification-editor:focus {\n  border: solid 1px #4285f4;\n}\n\n.quota-override-error {\n  padding-top: 10px;\n  color: red;\n}\n\n.usage-breakdown-row {\n  min-width: fit-content;\n}\n\n.clear-storage-container {\n  overflow: auto;\n}\n\n.clear-storage-header {\n  min-width: 400px;\n}\n\n/*# sourceURL=resources/clearStorageView.css */");RootModule.Runtime.cachedResources.set("resources/indexedDBViews.css","/*\n * Copyright (C) 2012 Google Inc. All rights reserved.\n *\n * Redistribution and use in source and binary forms, with or without\n * modification, are permitted provided that the following conditions are\n * met:\n *\n *     * Redistributions of source code must retain the above copyright\n * notice, this list of conditions and the following disclaimer.\n *     * Redistributions in binary form must reproduce the above\n * copyright notice, this list of conditions and the following disclaimer\n * in the documentation and/or other materials provided with the\n * distribution.\n *     * Neither the name of Google Inc. nor the names of its\n * contributors may be used to endorse or promote products derived from\n * this software without specific prior written permission.\n *\n * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n * \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n.indexed-db-data-view .data-view-toolbar {\n  position: relative;\n  background-color: #eee;\n  border-bottom: 1px solid #ccc;\n}\n\n.indexed-db-data-view .data-grid {\n  flex: auto;\n}\n\n.indexed-db-data-view .data-grid .data-container tr:nth-last-child(1) {\n  background-color: white;\n}\n\n.indexed-db-data-view .data-grid .data-container tr:nth-last-child(1) td {\n  border: 0;\n}\n\n.indexed-db-data-view .data-grid .data-container tr:nth-last-child(2) td {\n  border-bottom: 1px solid #aaa;\n}\n\n.indexed-db-data-view .data-grid:focus .data-container tr.selected {\n  background-color: #cdddf5;\n  color: inherit;\n}\n\n.indexed-db-data-view .section,\n.indexed-db-data-view .section > .header,\n.indexed-db-data-view .section > .header .title {\n  margin: 0;\n  min-height: inherit;\n  line-height: inherit;\n}\n\n.indexed-db-data-view .data-grid .data-container td .section .header .title {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.indexed-db-key-path {\n  color: rgb(196 26 22);\n  white-space: pre-wrap;\n  unicode-bidi: -webkit-isolate;\n}\n\n.source-code.indexed-db-key-path {\n  font-size: unset !important;\n}\n\n.resources-toolbar {\n  padding-right: 10px;\n}\n\n.object-store-summary-bar {\n  flex: 0 0 27px;\n  line-height: 27px;\n  padding-left: 5px;\n  background-color: #eee;\n  border-top: 1px solid #ccc;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n/*# sourceURL=resources/indexedDBViews.css */");RootModule.Runtime.cachedResources.set("resources/resourcesPanel.css","/*\n * Copyright (C) 2006, 2007, 2008 Apple Inc.  All rights reserved.\n * Copyright (C) 2009 Anthony Ricaud <rik@webkit.org>\n *\n * Redistribution and use in source and binary forms, with or without\n * modification, are permitted provided that the following conditions\n * are met:\n *\n * 1.  Redistributions of source code must retain the above copyright\n *     notice, this list of conditions and the following disclaimer.\n * 2.  Redistributions in binary form must reproduce the above copyright\n *     notice, this list of conditions and the following disclaimer in the\n *     documentation and/or other materials provided with the distribution.\n * 3.  Neither the name of Apple Computer, Inc. (\"Apple\") nor the names of\n *     its contributors may be used to endorse or promote products derived\n *     from this software without specific prior written permission.\n *\n * THIS SOFTWARE IS PROVIDED BY APPLE AND ITS CONTRIBUTORS \"AS IS\" AND ANY\n * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED\n * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE\n * DISCLAIMED. IN NO EVENT SHALL APPLE OR ITS CONTRIBUTORS BE LIABLE FOR ANY\n * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES\n * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;\n * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND\n * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF\n * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n.resources-toolbar {\n  border-top: 1px solid #ccc;\n  background-color: var(--toolbar-bg-color);\n}\n\n.top-resources-toolbar {\n  border-bottom: 1px solid #ccc;\n  background-color: var(--toolbar-bg-color);\n}\n\n.resources.panel .status {\n  float: right;\n  height: 16px;\n  margin-top: 1px;\n  margin-left: 4px;\n  line-height: 1em;\n}\n\n.storage-view {\n  display: flex;\n  overflow: hidden;\n}\n\n.storage-view .data-grid:not(.inline) {\n  border: none;\n  flex: auto;\n}\n\n.storage-view .storage-table-error {\n  color: rgb(66% 33% 33%);\n  font-size: 24px;\n  font-weight: bold;\n  padding: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.storage-view.query {\n  padding: 2px 0;\n  overflow-y: overlay;\n  overflow-x: hidden;\n}\n\n.storage-view .filter-bar {\n  border-top: none;\n  border-bottom: var(--divider-border);\n}\n\n.database-query-group-messages {\n  overflow-y: auto;\n}\n\n.database-query-prompt-container {\n  position: relative;\n  padding: 1px 22px 1px 24px;\n  min-height: 16px;\n}\n\n.database-query-prompt {\n  white-space: pre-wrap;\n}\n\n.prompt-icon {\n  position: absolute;\n  display: block;\n  left: 7px;\n  top: 9px;\n  margin-top: -7px;\n  user-select: none;\n}\n\n.database-query-prompt-container .prompt-icon {\n  top: 10px;\n}\n\n.database-user-query {\n  position: relative;\n  border-bottom: 1px solid rgb(245 245 245);\n  padding: 1px 22px 1px 24px;\n  min-height: 16px;\n  flex-shrink: 0;\n}\n\n.database-user-query:focus-visible {\n  background-color: hsl(214deg 48% 95%);\n}\n\n.database-query-text {\n  color: rgb(0 128 255);\n  user-select: text;\n}\n\n.database-query-result {\n  position: relative;\n  padding: 1px 22px 1px 22px;\n  min-height: 16px;\n  margin-left: -22px;\n  padding-right: 0;\n}\n\n.database-query-result.error {\n  color: red;\n  user-select: text;\n}\n\n.resources-sidebar {\n  padding: 0;\n  overflow-x: auto;\n}\n\n/*# sourceURL=resources/resourcesPanel.css */");RootModule.Runtime.cachedResources.set("resources/resourcesSidebar.css","/*\n * Copyright 2016 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.tree-outline {\n  padding-left: 0;\n  color: rgb(90 90 90);\n}\n\n.tree-outline > ol {\n  padding-bottom: 10px;\n}\n\n.tree-outline li {\n  min-height: 20px;\n}\n\nli.storage-group-list-item {\n  padding: 10px 8px 6px 8px;\n}\n\nli.storage-group-list-item:not(:first-child) {\n  border-top: 1px solid rgb(230 230 230);\n}\n\nli.storage-group-list-item::before {\n  display: none;\n}\n\n.icons-container .red-icon {\n  background-color: rgb(235 57 65);\n}\n\n.navigator-file-tree-item {\n  background: linear-gradient(45deg, hsl(0deg 0% 50%), hsl(0deg 0% 70%));\n}\n\n.navigator-folder-tree-item {\n  background: linear-gradient(45deg, hsl(210deg 82% 65%), hsl(210deg 82% 80%));\n}\n\n.navigator-script-tree-item {\n  background: linear-gradient(45deg, hsl(48deg 70% 50%), hsl(48deg 70% 70%));\n}\n\n.navigator-stylesheet-tree-item {\n  background: linear-gradient(45deg, hsl(256deg 50% 50%), hsl(256deg 50% 70%));\n}\n\n.navigator-image-tree-item,\n.navigator-font-tree-item {\n  background: linear-gradient(45deg, hsl(109deg 33% 50%), hsl(109deg 33% 70%));\n}\n\n.resource-tree-item {\n  background: rgb(90 90 90 / 70%);\n}\n\n.window-closed .tree-element-title {\n  text-decoration: line-through;\n}\n\n/*# sourceURL=resources/resourcesSidebar.css */");RootModule.Runtime.cachedResources.set("resources/serviceWorkerCacheViews.css","/*\n * Copyright 2014 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.service-worker-cache-data-view .data-view-toolbar {\n  position: relative;\n  background-color: #eee;\n  border-bottom: 1px solid #ccc;\n  padding-right: 10px;\n}\n\n.service-worker-cache-data-view .data-grid {\n  flex: auto;\n}\n\n.service-worker-cache-data-view .data-grid .data-container tr:nth-last-child(1) td {\n  border: 0;\n}\n\n.service-worker-cache-data-view .data-grid .data-container tr:nth-last-child(2) td {\n  border-bottom: 1px solid #aaa;\n}\n\n.service-worker-cache-data-view .data-grid .data-container tr.selected {\n  background-color: rgb(212 212 212);\n  color: inherit;\n}\n\n.service-worker-cache-data-view .data-grid:focus .data-container tr.selected {\n  background-color: var(--selection-bg-color);\n  color: white;\n}\n\n.service-worker-cache-data-view .section,\n.service-worker-cache-data-view .section > .header,\n.service-worker-cache-data-view .section > .header .title {\n  margin: 0;\n  min-height: inherit;\n  line-height: inherit;\n}\n\n.service-worker-cache-data-view .data-grid .data-container td .section .header .title {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.cache-preview-panel-resizer {\n  background-color: #eee;\n  height: 4px;\n  border-bottom: 1px solid rgb(64% 64% 64%);\n}\n\n.cache-storage-summary-bar {\n  flex: 0 0 27px;\n  line-height: 27px;\n  padding-left: 5px;\n  background-color: #eee;\n  border-top: 1px solid #ccc;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n/*# sourceURL=resources/serviceWorkerCacheViews.css */");RootModule.Runtime.cachedResources.set("resources/serviceWorkersView.css","/*\n * Copyright 2015 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.service-worker-version {\n  display: flex;\n}\n\n.service-worker-version-stack {\n  position: relative;\n}\n\n.service-worker-version-stack-bar {\n  position: absolute;\n  top: 10px;\n  bottom: 20px;\n  left: 4px;\n  content: \"\";\n  border-left: 1px solid #888;\n  z-index: 0;\n}\n\n.service-worker-version:not(:last-child) {\n  margin-bottom: 7px;\n}\n\n.service-worker-version-string {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.service-worker-active-circle,\n.service-worker-redundant-circle,\n.service-worker-waiting-circle,\n.service-worker-installing-circle {\n  position: relative;\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  z-index: 10;\n  margin-right: 5px;\n  border-radius: 50%;\n  border: 1px solid #555;\n  align-self: center;\n}\n\n.service-worker-active-circle {\n  background-color: #50b04f;\n}\n\n.service-worker-waiting-circle {\n  background-color: #f38e24;\n}\n\n.service-worker-installing-circle {\n  background-color: white;\n}\n\n.service-worker-redundant-circle {\n  background-color: gray;\n}\n\n.service-worker-subtitle {\n  padding-left: 14px;\n  line-height: 14px;\n  color: #888;\n}\n\n.link {\n  margin-left: 7px;\n}\n\n.service-worker-editor-with-button {\n  align-items: baseline;\n  display: flex;\n}\n\n.service-worker-notification-editor {\n  border: solid 1px #d8d8d8;\n  display: flex;\n  flex: auto;\n  margin-right: 4px;\n  max-width: 400px;\n  min-width: 80px;\n}\n\n.report-field-value-filename,\n.service-worker-client-string {\n  max-width: 400px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.report-field-value-filename {\n  /* hack to prevent focus-ring from being cut off on the left */\n  padding-left: 2px;\n  margin-left: -2px;\n}\n\n.report-field-value-subtitle {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.service-worker-client {\n  display: flex;\n}\n\n.service-worker-client-focus-link {\n  flex: none;\n  margin-right: 2px;\n  align-self: center;\n}\n\n.service-worker-notification-editor.source-code {\n  /** Simulate CodeMirror that is shown above */\n  padding: 4px;\n}\n\n.service-worker-list {\n  background-color: #f9f9f9;\n  overflow: auto;\n}\n\n.service-workers-this-origin {\n  flex-shrink: 0;\n  flex-grow: 0;\n}\n\n.service-workers-this-origin,\n.service-workers-other-origin {\n  min-width: 400px;\n}\n\n.service-worker-has-current .service-workers-other-origin {\n  margin-top: 16px;\n  border-top: 1px solid rgb(230 230 230);\n}\n\n.devtools-link {\n  line-height: 14px;\n  align-self: center;\n  padding: 1px;\n}\n\nbutton.link {\n  padding: 1px;\n}\n\nbutton.link:focus-visible {\n  background-color: inherit;\n}\n\n/*# sourceURL=resources/serviceWorkersView.css */");RootModule.Runtime.cachedResources.set("resources/cookieItemsView.css","/*\n * Copyright 2019 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.cookie-value {\n  padding: 2px 6px;\n  overflow: auto;\n  user-select: text;\n  min-height: 100%;\n}\n\n/*# sourceURL=resources/cookieItemsView.css */");RootModule.Runtime.cachedResources.set("resources/frameDetailsReportView.css","/*\n * Copyright 2020 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.report-field-name {\n  flex: 0 0 200px;\n}\n\n.report-field-value {\n  user-select: text;\n  display: flex;\n}\n\n.report-field .inline-name {\n  color: #888;\n  padding-left: 2ex;\n  user-select: none;\n}\n\n.report-field .inline-name::after {\n  content: \":\\A0\";\n}\n\n.report-field .inline-comment {\n  color: #555;\n  padding-left: 1ex;\n}\n\n.report-field .inline-comment::before {\n  content: \"(\";\n}\n\n.report-field .inline-comment::after {\n  content: \")\";\n}\n\n.report-field .inline-span {\n  color: #555;\n  padding-left: 1ex;\n}\n\n.report-field-value-link {\n  display: inline-block;\n}\n\n.icon-link.devtools-link {\n  background-color: var(--link-color);\n  vertical-align: sub;\n}\n\n.frame-details-container {\n  overflow: auto;\n}\n\n.frame-details-report-container {\n  min-width: 550px;\n}\n\n.text-ellipsis {\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/*# sourceURL=resources/frameDetailsReportView.css */");