import*as RootModule from'../root/root.js';RootModule.Runtime.cachedResources.set("object_ui/customPreviewComponent.css","/*\n * Copyright (c) 2015 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.custom-expandable-section {\n  display: inline-flex;\n  flex-direction: column;\n}\n\n.custom-expand-icon {\n  user-select: none;\n  opacity: 50%;\n  margin-right: 4px;\n  margin-bottom: -2px;\n  background: black;\n}\n\n.custom-expandable-section-standard-section {\n  display: inline-flex;\n}\n\n/*# sourceURL=object_ui/customPreviewComponent.css */");RootModule.Runtime.cachedResources.set("object_ui/objectPopover.css","/*\n * Copyright 2017 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.object-popover-content {\n  display: block;\n  position: relative;\n  overflow: hidden;\n  flex: 1 1 auto;\n}\n\n.object-popover-title {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  font-weight: bold;\n  padding-left: 18px;\n  padding-bottom: 2px;\n}\n\n.object-popover-tree {\n  border-top: 1px solid rgb(184 184 184);\n  overflow: auto;\n  width: 100%;\n  height: calc(100% - 13px);\n}\n\n.object-popover-container {\n  display: inline-block;\n}\n\n.function-popover-title {\n  border-bottom: 1px solid #aaa;\n  margin-bottom: 3px;\n  padding-bottom: 2px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.function-popover-title .function-name {\n  font-weight: bold;\n}\n\n.function-title-link-container {\n  display: flex;\n  align-items: center;\n  position: relative;\n  margin-left: 10px;\n}\n\n.function-title-link-container .devtools-link {\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n/*# sourceURL=object_ui/objectPopover.css */");RootModule.Runtime.cachedResources.set("object_ui/objectPropertiesSection.css","/*\n * Copyright 2015 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.object-properties-section-dimmed {\n  opacity: 60%;\n}\n\n.object-properties-section {\n  padding: 0 0 0 0;\n  color: rgb(33 33 33) !important;\n  display: flex;\n  flex-direction: column;\n}\n\n.object-properties-section li {\n  user-select: text;\n}\n\n.object-properties-section li::before {\n  top: -1px;\n}\n\n.object-properties-section li.editing-sub-part {\n  padding: 3px 12px 8px 6px;\n  margin: -1px -6px -8px -6px;\n  text-overflow: clip;\n}\n\n.object-properties-section li.editing {\n  margin-left: 10px;\n  text-overflow: clip;\n}\n\n.tree-outline ol.title-less-mode {\n  padding-left: 0;\n}\n\n.object-properties-section .synthetic-property {\n  font-style: italic;\n}\n\n.object-properties-section .private-property-hash {\n  color: #222;\n}\n\n.object-properties-section-root-element {\n  display: flex;\n  flex-direction: row;\n}\n\n.object-properties-section .editable-div {\n  overflow: hidden;\n}\n\n.name-and-value {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  line-height: 16px;\n}\n\n.editing-sub-part .name-and-value {\n  overflow: visible;\n  display: inline-flex;\n}\n\n.property-prompt {\n  margin-left: 4px;\n}\n\n.tree-outline.hide-selection-when-blurred .selected:focus-visible {\n  background: none;\n}\n\n.tree-outline.hide-selection-when-blurred .selected:focus-visible ::slotted(*),\n.tree-outline.hide-selection-when-blurred .selected:focus-visible .tree-element-title,\n.tree-outline.hide-selection-when-blurred .selected:focus-visible .name-and-value {\n  background: var(--focus-bg-color);\n  border-radius: 2px;\n  box-shadow: 0 0 0 2px var(--focus-bg-color);\n}\n\n@media (forced-colors: active) {\n  .object-properties-section-dimmed {\n    opacity: 100%;\n  }\n\n  .tree-outline.hide-selection-when-blurred .selected:focus-visible {\n    background: Highlight;\n  }\n\n  .tree-outline li:hover .tree-element-title,\n  .tree-outline li.selected .tree-element-title {\n    color: ButtonText;\n  }\n\n  .tree-outline.hide-selection-when-blurred .selected:focus-visible .tree-element-title,\n  .tree-outline.hide-selection-when-blurred .selected:focus-visible .name-and-value {\n    background: transparent;\n    box-shadow: none;\n  }\n\n  .tree-outline.hide-selection-when-blurred .selected:focus-visible span,\n  .tree-outline.hide-selection-when-blurred .selected:focus-visible .gray-info-message {\n    color: HighlightText;\n  }\n\n  .tree-outline-disclosure:hover li.parent::before {\n    background-color: ButtonText;\n  }\n}\n\n/*# sourceURL=object_ui/objectPropertiesSection.css */");RootModule.Runtime.cachedResources.set("object_ui/objectValue.css","/*\n * Copyright 2015 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.object-value-scientific-notation-exponent {\n  flex-shrink: 0;\n}\n\n.object-value-scientific-notation-mantissa {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex-shrink: 1;\n  min-width: 1ex;\n}\n\n.object-value-scientific-notation-number {\n  display: flex !important;\n}\n\n.value.object-value-node:hover {\n  background-color: var(--item-hover-color);\n}\n\n.object-value-function-prefix,\n.object-value-boolean {\n  color: rgb(13 34 170);\n}\n\n.object-value-function {\n  font-style: italic;\n}\n\n.object-value-function.linkified:hover {\n  background-color: rgb(0 0 0 / 10%);\n  cursor: pointer;\n}\n\n.object-value-number {\n  color: rgb(28 0 207);\n}\n\n.object-value-bigint {\n  color: rgb(0 93 0);\n}\n\n.object-value-string,\n.object-value-regexp,\n.object-value-symbol {\n  white-space: pre;\n  unicode-bidi: -webkit-isolate;\n  color: rgb(196 26 22);\n}\n\n.-theme-with-dark-background .object-value-string,\n:host-context(.-theme-with-dark-background) .object-value-string,\n.-theme-with-dark-background .object-value-regexp,\n:host-context(.-theme-with-dark-background) .object-value-regexp,\n.-theme-with-dark-background .object-value-symbol,\n:host-context(.-theme-with-dark-background) .object-value-symbol {\n  color: rgb(242 139 84);\n}\n\n.object-value-string-quote {\n  color: #222;\n}\n\n.object-value-node {\n  position: relative;\n  vertical-align: baseline;\n  color: rgb(48 57 66);\n  display: inline-block;\n}\n\n.object-value-null,\n.object-value-undefined {\n  color: rgb(94 94 94);\n}\n\n.-theme-with-dark-background .object-value-null,\n:host-context(.-theme-with-dark-background) .object-value-null,\n.-theme-with-dark-background .object-value-undefined,\n:host-context(.-theme-with-dark-background) .object-value-undefined {\n  color: rgb(161 161 161);\n}\n\n.object-value-calculate-value-button:hover {\n  text-decoration: underline;\n}\n\n.object-properties-section-custom-section {\n  display: inline-flex;\n  flex-direction: column;\n}\n\n.-theme-with-dark-background .object-value-number,\n:host-context(.-theme-with-dark-background) .object-value-number,\n.-theme-with-dark-background .object-value-boolean,\n:host-context(.-theme-with-dark-background) .object-value-boolean {\n  color: hsl(252deg 100% 75%);\n}\n\n.object-properties-section .object-description {\n  color: gray;\n}\n\n.value .object-properties-preview {\n  white-space: nowrap;\n}\n\n.name {\n  color: rgb(136 19 145);\n  flex-shrink: 0;\n}\n\n.object-properties-preview .name {\n  color: #565656;\n}\n\n@media (forced-colors: active) {\n  .object-value-calculate-value-button:hover {\n    forced-color-adjust: none;\n    color: Highlight;\n  }\n}\n\n/*# sourceURL=object_ui/objectValue.css */");