(function(){'use strict';const style=new CSSStyleSheet();style.replaceSync("/*\n * Copyright 2019 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-size: 13px;\n  color: #222;\n}\n\nbody.platform-linux {\n  font-family: Roboto, Ubuntu, Arial, sans-serif;\n}\n\nbody.platform-mac {\n  color: rgb(48 57 66);\n  font-family: '.SFNSDisplay-Regular', 'Helvetica Neue', 'Lucida Grande', sans-serif;\n}\n\nbody.platform-windows {\n  font-family: 'Segoe UI', Tahoma, sans-serif;\n}\n\n.fill {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n#canvas {\n  pointer-events: none;\n}\n\n.hidden {\n  display: none !important;\n}\n");class Overlay{constructor(window,style=[]){this.viewportSize={width:800,height:600};this.deviceScaleFactor=1;this.emulationScaleFactor=1;this.pageScaleFactor=1;this.pageZoomFactor=1;this.scrollX=0;this.scrollY=0;this.canvasWidth=0;this.canvasHeight=0;this._installed=false;this._window=window;this._document=window.document;if(!Array.isArray(style)){style=[style];}
this.style=style;}
setCanvas(canvas){this.canvas=canvas;this._context=canvas.getContext('2d');}
install(){for(const style of this.style){adoptStyleSheet(style);}
this._installed=true;}
uninstall(){for(const style of this.style){document.adoptedStyleSheets=document.adoptedStyleSheets.filter(s=>s!==style);}
this._installed=false;}
reset(resetData){if(resetData){this.viewportSize=resetData.viewportSize;this.deviceScaleFactor=resetData.deviceScaleFactor;this.pageScaleFactor=resetData.pageScaleFactor;this.pageZoomFactor=resetData.pageZoomFactor;this.emulationScaleFactor=resetData.emulationScaleFactor;this.scrollX=Math.round(resetData.scrollX);this.scrollY=Math.round(resetData.scrollY);}
this.resetCanvas();}
resetCanvas(){if(!this.canvas||!this._context){return;}
this.canvas.width=this.deviceScaleFactor*this.viewportSize.width;this.canvas.height=this.deviceScaleFactor*this.viewportSize.height;this.canvas.style.width=this.viewportSize.width+'px';this.canvas.style.height=this.viewportSize.height+'px';this._context.scale(this.deviceScaleFactor,this.deviceScaleFactor);this.canvasWidth=this.viewportSize.width;this.canvasHeight=this.viewportSize.height;}
setPlatform(platform){this.platform=platform;this.document.body.classList.add('platform-'+platform);if(!this._installed){this.install();}}
dispatch(message){const functionName=message.shift();this[functionName].apply(this,message);}
eventHasCtrlOrMeta(event){return this.platform==='mac'?(event.metaKey&&!event.ctrlKey):(event.ctrlKey&&!event.metaKey);}
get context(){if(!this._context){throw new Error('Context object is missing');}
return this._context;}
get document(){if(!this._document){throw new Error('Document object is missing');}
return this._document;}
get window(){if(!this._window){throw new Error('Window object is missing');}
return this._window;}
get installed(){return this._installed;}}
function createChild(parent,tagName,className){const element=createElement(tagName,className);element.addEventListener('click',function(e){e.stopPropagation();},false);parent.appendChild(element);return element;}
function createTextChild(parent,text){const element=document.createTextNode(text);parent.appendChild(element);return element;}
function createElement(tagName,className){const element=document.createElement(tagName);if(className){element.className=className;}
return element;}
function ellipsify(str,maxLength){if(str.length<=maxLength){return String(str);}
return str.substr(0,maxLength-1)+'\u2026';}
function constrainNumber(num,min,max){if(num<min){num=min;}
else if(num>max){num=max;}
return num;}
function adoptStyleSheet(styleSheet){document.adoptedStyleSheets=[...document.adoptedStyleSheets,styleSheet];}
function buildPath(commands,bounds,emulationScaleFactor){let commandsIndex=0;function extractPoints(count){const points=[];for(let i=0;i<count;++i){const x=Math.round(commands[commandsIndex++]*emulationScaleFactor);bounds.maxX=Math.max(bounds.maxX,x);bounds.minX=Math.min(bounds.minX,x);const y=Math.round(commands[commandsIndex++]*emulationScaleFactor);bounds.maxY=Math.max(bounds.maxY,y);bounds.minY=Math.min(bounds.minY,y);bounds.leftmostXForY[y]=Math.min(bounds.leftmostXForY[y]||Number.MAX_VALUE,x);bounds.rightmostXForY[y]=Math.max(bounds.rightmostXForY[y]||Number.MIN_VALUE,x);bounds.topmostYForX[x]=Math.min(bounds.topmostYForX[x]||Number.MAX_VALUE,y);bounds.bottommostYForX[x]=Math.max(bounds.bottommostYForX[x]||Number.MIN_VALUE,y);bounds.allPoints.push({x,y});points.push(x,y);}
return points;}
const commandsLength=commands.length;const path=new Path2D();while(commandsIndex<commandsLength){switch(commands[commandsIndex++]){case'M':path.moveTo.apply(path,extractPoints(1));break;case'L':path.lineTo.apply(path,extractPoints(1));break;case'C':path.bezierCurveTo.apply(path,extractPoints(3));break;case'Q':path.quadraticCurveTo.apply(path,extractPoints(2));break;case'Z':path.closePath();break;}}
return path;}
function emptyBounds(){const bounds={minX:Number.MAX_VALUE,minY:Number.MAX_VALUE,maxX:Number.MIN_VALUE,maxY:Number.MIN_VALUE,leftmostXForY:{},rightmostXForY:{},topmostYForX:{},bottommostYForX:{},allPoints:[],};return bounds;}
function applyMatrixToPoint(point,matrix){let domPoint=new DOMPoint(point.x,point.y);domPoint=domPoint.matrixTransform(matrix);return{x:domPoint.x,y:domPoint.y};}
const GridArrowTypes={leftTop:'left-top',leftMid:'left-mid',leftBottom:'left-bottom',topLeft:'top-left',topMid:'top-mid',topRight:'top-right',rightTop:'right-top',rightMid:'right-mid',rightBottom:'right-bottom',bottomLeft:'bottom-left',bottomMid:'bottom-mid',bottomRight:'bottom-right',};const gridArrowWidth=3;const gridPageMargin=20;const gridLabelDistance=20;const maxLineNamesCount=3;const defaultLabelColor='#1A73E8';function drawGridLabels(config,gridBounds,areaBounds,canvasSize,labelState,writingModeMatrix=new DOMMatrix()){const labelContainerId=`grid-${labelState.gridLayerCounter++}-labels`;let labelContainerForNode=document.getElementById(labelContainerId);if(!labelContainerForNode){const mainLabelLayerContainer=document.getElementById('grid-label-container');if(!mainLabelLayerContainer){throw new Error('#grid-label-container is not found');}
labelContainerForNode=createChild(mainLabelLayerContainer,'div');labelContainerForNode.id=labelContainerId;labelContainerForNode.style.setProperty('--row-label-color',config.gridHighlightConfig&&config.gridHighlightConfig.rowLineColor?config.gridHighlightConfig.rowLineColor:defaultLabelColor);labelContainerForNode.style.setProperty('--column-label-color',config.gridHighlightConfig&&config.gridHighlightConfig.columnLineColor?config.gridHighlightConfig.columnLineColor:defaultLabelColor);}
labelContainerForNode.innerText='';const areaNameContainer=createChild(labelContainerForNode,'div','area-names');const lineNameContainer=createChild(labelContainerForNode,'div','line-names');const lineNumberContainer=createChild(labelContainerForNode,'div','line-numbers');const trackSizesContainer=createChild(labelContainerForNode,'div','track-sizes');const normalizedData=_normalizePositionData(config,gridBounds);if(config.gridHighlightConfig&&config.gridHighlightConfig.showLineNames){drawGridLineNames(lineNameContainer,normalizedData,canvasSize,writingModeMatrix,config.writingMode);}
else{drawGridLineNumbers(lineNumberContainer,normalizedData,canvasSize,writingModeMatrix,config.writingMode);}
drawGridAreaNames(areaNameContainer,areaBounds,writingModeMatrix,config.writingMode);if(config.columnTrackSizes){drawGridTrackSizes(trackSizesContainer,config.columnTrackSizes,'column',canvasSize,writingModeMatrix,config.writingMode);}
if(config.rowTrackSizes){drawGridTrackSizes(trackSizesContainer,config.rowTrackSizes,'row',canvasSize,writingModeMatrix,config.writingMode);}}
function*positionIterator(positions,axis){let lastEmittedPos=null;for(const[i,pos]of positions.entries()){const isFirst=i===0;const isLast=i===positions.length-1;const isFarEnoughFromPrevious=Math.abs(pos[axis]-(lastEmittedPos?lastEmittedPos[axis]:0))>gridLabelDistance;const isFarEnoughFromLast=!isLast&&Math.abs(positions[positions.length-1][axis]-pos[axis])>gridLabelDistance;if(isFirst||isLast||(isFarEnoughFromPrevious&&isFarEnoughFromLast)){yield[i,pos];lastEmittedPos=pos;}}}
const last=(array)=>array[array.length-1];const first=(array)=>array[0];function _normalizeNameData(namePositions){const positions=[];const names=[];for(const{name,x,y}of namePositions){const normalizedX=Math.round(x);const normalizedY=Math.round(y);const existingIndex=positions.findIndex(({x,y})=>x===normalizedX&&y===normalizedY);if(existingIndex>-1){names[existingIndex].push(name);}
else{positions.push({x:normalizedX,y:normalizedY});names.push([name]);}}
return{positions,names};}
function _normalizePositionData(config,bounds){const width=Math.round(bounds.maxX-bounds.minX);const height=Math.round(bounds.maxY-bounds.minY);const data={rows:{positive:{positions:[],hasFirst:false,hasLast:false},negative:{positions:[],hasFirst:false,hasLast:false},},columns:{positive:{positions:[],hasFirst:false,hasLast:false},negative:{positions:[],hasFirst:false,hasLast:false},},bounds:{minX:Math.round(bounds.minX),maxX:Math.round(bounds.maxX),minY:Math.round(bounds.minY),maxY:Math.round(bounds.maxY),allPoints:bounds.allPoints,width,height,},};if(config.gridHighlightConfig&&config.gridHighlightConfig.showLineNames){const rowData=_normalizeNameData(config.rowLineNameOffsets||[]);const positiveRows={positions:rowData.positions,names:rowData.names,hasFirst:rowData.positions.length?first(rowData.positions).y===data.bounds.minY:false,hasLast:rowData.positions.length?last(rowData.positions).y===data.bounds.maxY:false,};data.rows.positive=positiveRows;const columnData=_normalizeNameData(config.columnLineNameOffsets||[]);const positiveColumns={positions:columnData.positions,names:columnData.names,hasFirst:columnData.positions.length?first(columnData.positions).x===data.bounds.minX:false,hasLast:columnData.positions.length?last(columnData.positions).x===data.bounds.maxX:false,};data.columns.positive=positiveColumns;}
else{const normalizeXY=({x,y})=>({x:Math.round(x),y:Math.round(y)});if(config.positiveRowLineNumberPositions){data.rows.positive={positions:config.positiveRowLineNumberPositions.map(normalizeXY),hasFirst:Math.round(first(config.positiveRowLineNumberPositions).y)===data.bounds.minY,hasLast:Math.round(last(config.positiveRowLineNumberPositions).y)===data.bounds.maxY,};}
if(config.negativeRowLineNumberPositions){data.rows.negative={positions:config.negativeRowLineNumberPositions.map(normalizeXY),hasFirst:Math.round(first(config.negativeRowLineNumberPositions).y)===data.bounds.minY,hasLast:Math.round(last(config.negativeRowLineNumberPositions).y)===data.bounds.maxY,};}
if(config.positiveColumnLineNumberPositions){data.columns.positive={positions:config.positiveColumnLineNumberPositions.map(normalizeXY),hasFirst:Math.round(first(config.positiveColumnLineNumberPositions).x)===data.bounds.minX,hasLast:Math.round(last(config.positiveColumnLineNumberPositions).x)===data.bounds.maxX,};}
if(config.negativeColumnLineNumberPositions){data.columns.negative={positions:config.negativeColumnLineNumberPositions.map(normalizeXY),hasFirst:Math.round(first(config.negativeColumnLineNumberPositions).x)===data.bounds.minX,hasLast:Math.round(last(config.negativeColumnLineNumberPositions).x)===data.bounds.maxX,};}}
return data;}
function drawGridLineNumbers(container,data,canvasSize,writingModeMatrix=new DOMMatrix(),writingMode='horizontal-tb'){if(!data.columns.positive.names){for(const[i,pos]of positionIterator(data.columns.positive.positions,'x')){const element=_createLabelElement(container,(i+1).toString(),'column');_placePositiveColumnLabel(element,applyMatrixToPoint(pos,writingModeMatrix),data,writingMode,canvasSize);}}
if(!data.rows.positive.names){for(const[i,pos]of positionIterator(data.rows.positive.positions,'y')){const element=_createLabelElement(container,(i+1).toString(),'row');_placePositiveRowLabel(element,applyMatrixToPoint(pos,writingModeMatrix),data,writingMode,canvasSize);}}
for(const[i,pos]of positionIterator(data.columns.negative.positions,'x')){const element=_createLabelElement(container,(data.columns.negative.positions.length*-1+i).toString(),'column');_placeNegativeColumnLabel(element,applyMatrixToPoint(pos,writingModeMatrix),data,writingMode,canvasSize);}
for(const[i,pos]of positionIterator(data.rows.negative.positions,'y')){const element=_createLabelElement(container,(data.rows.negative.positions.length*-1+i).toString(),'row');_placeNegativeRowLabel(element,applyMatrixToPoint(pos,writingModeMatrix),data,writingMode,canvasSize);}}
function drawGridTrackSizes(container,trackSizes,direction,canvasSize,writingModeMatrix=new DOMMatrix(),writingMode='horizontal-tb'){const{main,cross}=_getAxes(writingMode);const{crossSize}=_getCanvasSizes(writingMode,canvasSize);for(const{x,y,computedSize,authoredSize}of trackSizes){const point=applyMatrixToPoint({x,y},writingModeMatrix);const size=computedSize.toFixed(2);const formattedComputed=`${size.endsWith('.00') ? size.slice(0, -3) : size}px`;const element=_createLabelElement(container,`${authoredSize ? authoredSize + '·' : ''}${formattedComputed}`,direction);const labelSize=_getLabelSize(element,writingMode);let flipIn=point[main]-labelSize.mainSize<gridPageMargin;if(direction==='column'){flipIn=writingMode==='vertical-rl'?crossSize-point[cross]-labelSize.crossSize<gridPageMargin:point[cross]-labelSize.crossSize<gridPageMargin;}
let arrowType=_adaptArrowTypeForWritingMode(direction==='column'?GridArrowTypes.bottomMid:GridArrowTypes.rightMid,writingMode);arrowType=_flipArrowTypeIfNeeded(arrowType,flipIn);_placeLineLabel(element,arrowType,point.x,point.y,labelSize);}}
function drawGridLineNames(container,data,canvasSize,writingModeMatrix=new DOMMatrix(),writingMode='horizontal-tb'){for(const[i,pos]of data.columns.positive.positions.entries()){const names=data.columns.positive.names[i];const element=_createLabelElement(container,_makeLineNameLabelContent(names),'column');_placePositiveColumnLabel(element,applyMatrixToPoint(pos,writingModeMatrix),data,writingMode,canvasSize);}
for(const[i,pos]of data.rows.positive.positions.entries()){const names=data.rows.positive.names[i];const element=_createLabelElement(container,_makeLineNameLabelContent(names),'row');_placePositiveRowLabel(element,applyMatrixToPoint(pos,writingModeMatrix),data,writingMode,canvasSize);}}
function _makeLineNameLabelContent(names){const content=document.createElement('ul');const namesToDisplay=names.slice(0,maxLineNamesCount);for(const name of namesToDisplay){createChild(content,'li','line-name').textContent=name;}
return content;}
function drawGridAreaNames(container,areaBounds,writingModeMatrix=new DOMMatrix(),writingMode='horizontal-tb'){for(const{name,bounds}of areaBounds){const element=_createLabelElement(container,name,'row');const{width,height}=_getLabelSize(element,writingMode);const point=writingMode==='vertical-rl'?bounds.allPoints[3]:bounds.allPoints[0];const corner=applyMatrixToPoint(point,writingModeMatrix);const flipX=bounds.allPoints[1].x<bounds.allPoints[0].x;const flipY=bounds.allPoints[3].y<bounds.allPoints[0].y;element.style.left=(corner.x-(flipX?width:0))+'px';element.style.top=(corner.y-(flipY?height:0))+'px';}}
function _createLabelElement(container,textContent,direction){const wrapper=createChild(container,'div');const element=createChild(wrapper,'div','grid-label-content');element.dataset.direction=direction;if(typeof textContent==='string'){element.textContent=textContent;}
else{element.appendChild(textContent);}
return element;}
function _getLabelSideEdgePoints(gridBounds,direction,side){const[p1,p2,p3,p4]=gridBounds.allPoints;if(direction==='row'){return side==='positive'?{start:p1,end:p4}:{start:p2,end:p3};}
return side==='positive'?{start:p1,end:p2}:{start:p4,end:p3};}
function _getAxes(writingMode){return writingMode.startsWith('vertical')?{main:'y',cross:'x'}:{main:'x',cross:'y'};}
function _getCanvasSizes(writingMode,canvasSize){return writingMode.startsWith('vertical')?{mainSize:canvasSize.canvasHeight,crossSize:canvasSize.canvasWidth}:{mainSize:canvasSize.canvasWidth,crossSize:canvasSize.canvasHeight};}
function _placePositiveRowLabel(element,pos,data,writingMode,canvasSize){const{start,end}=_getLabelSideEdgePoints(data.bounds,'row','positive');const{main,cross}=_getAxes(writingMode);const{crossSize}=_getCanvasSizes(writingMode,canvasSize);const labelSize=_getLabelSize(element,writingMode);const isAtSharedStartCorner=pos[cross]===start[cross]&&data.columns&&data.columns.positive.hasFirst;const isAtSharedEndCorner=pos[cross]===end[cross]&&data.columns&&data.columns.negative.hasFirst;const isTooCloseToViewportStart=pos[cross]<gridPageMargin;const isTooCloseToViewportEnd=crossSize-pos[cross]<gridPageMargin;const flipIn=pos[main]-labelSize.mainSize<gridPageMargin;if(flipIn&&(isAtSharedStartCorner||isAtSharedEndCorner)){element.classList.add('inner-shared-corner');}
let arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.rightMid,writingMode);if(isTooCloseToViewportStart||isAtSharedStartCorner){arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.rightTop,writingMode);}
else if(isTooCloseToViewportEnd||isAtSharedEndCorner){arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.rightBottom,writingMode);}
arrowType=_flipArrowTypeIfNeeded(arrowType,flipIn);_placeLineLabel(element,arrowType,pos.x,pos.y,labelSize);}
function _placeNegativeRowLabel(element,pos,data,writingMode,canvasSize){const{start,end}=_getLabelSideEdgePoints(data.bounds,'row','negative');const{main,cross}=_getAxes(writingMode);const{mainSize,crossSize}=_getCanvasSizes(writingMode,canvasSize);const labelSize=_getLabelSize(element,writingMode);const isAtSharedStartCorner=pos[cross]===start[cross]&&data.columns&&data.columns.positive.hasLast;const isAtSharedEndCorner=pos[cross]===end[cross]&&data.columns&&data.columns.negative.hasLast;const isTooCloseToViewportStart=pos[cross]<gridPageMargin;const isTooCloseToViewportEnd=crossSize-pos[cross]<gridPageMargin;const flipIn=mainSize-pos[main]-labelSize.mainSize<gridPageMargin;if(flipIn&&(isAtSharedStartCorner||isAtSharedEndCorner)){element.classList.add('inner-shared-corner');}
let arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.leftMid,writingMode);if(isTooCloseToViewportStart||isAtSharedStartCorner){arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.leftTop,writingMode);}
else if(isTooCloseToViewportEnd||isAtSharedEndCorner){arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.leftBottom,writingMode);}
arrowType=_flipArrowTypeIfNeeded(arrowType,flipIn);_placeLineLabel(element,arrowType,pos.x,pos.y,labelSize);}
function _placePositiveColumnLabel(element,pos,data,writingMode,canvasSize){const{start,end}=_getLabelSideEdgePoints(data.bounds,'column','positive');const{main,cross}=_getAxes(writingMode);const{mainSize,crossSize}=_getCanvasSizes(writingMode,canvasSize);const labelSize=_getLabelSize(element,writingMode);const isAtSharedStartCorner=pos[main]===start[main]&&data.rows&&data.rows.positive.hasFirst;const isAtSharedEndCorner=pos[main]===end[main]&&data.rows&&data.rows.negative.hasFirst;const isTooCloseToViewportStart=pos[main]<gridPageMargin;const isTooCloseToViewportEnd=mainSize-pos[main]<gridPageMargin;const flipIn=writingMode==='vertical-rl'?crossSize-pos[cross]-labelSize.crossSize<gridPageMargin:pos[cross]-labelSize.crossSize<gridPageMargin;if(flipIn&&(isAtSharedStartCorner||isAtSharedEndCorner)){element.classList.add('inner-shared-corner');}
let arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.bottomMid,writingMode);if(isTooCloseToViewportStart){arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.bottomLeft,writingMode);}
else if(isTooCloseToViewportEnd){arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.bottomRight,writingMode);}
arrowType=_flipArrowTypeIfNeeded(arrowType,flipIn);_placeLineLabel(element,arrowType,pos.x,pos.y,labelSize);}
function _placeNegativeColumnLabel(element,pos,data,writingMode,canvasSize){const{start,end}=_getLabelSideEdgePoints(data.bounds,'column','negative');const{main,cross}=_getAxes(writingMode);const{mainSize,crossSize}=_getCanvasSizes(writingMode,canvasSize);const labelSize=_getLabelSize(element,writingMode);const isAtSharedStartCorner=pos[main]===start[main]&&data.rows&&data.rows.positive.hasLast;const isAtSharedEndCorner=pos[main]===end[main]&&data.rows&&data.rows.negative.hasLast;const isTooCloseToViewportStart=pos[main]<gridPageMargin;const isTooCloseToViewportEnd=mainSize-pos[main]<gridPageMargin;const flipIn=writingMode==='vertical-rl'?pos[cross]-labelSize.crossSize<gridPageMargin:crossSize-pos[cross]-labelSize.crossSize<gridPageMargin;if(flipIn&&(isAtSharedStartCorner||isAtSharedEndCorner)){element.classList.add('inner-shared-corner');}
let arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.topMid,writingMode);if(isTooCloseToViewportStart){arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.topLeft,writingMode);}
else if(isTooCloseToViewportEnd){arrowType=_adaptArrowTypeForWritingMode(GridArrowTypes.topRight,writingMode);}
arrowType=_flipArrowTypeIfNeeded(arrowType,flipIn);_placeLineLabel(element,arrowType,pos.x,pos.y,labelSize);}
function _placeLineLabel(element,arrowType,x,y,labelSize){const{contentLeft,contentTop}=_getLabelPositionByArrowType(arrowType,x,y,labelSize.width,labelSize.height);element.classList.add(arrowType);element.style.left=contentLeft+'px';element.style.top=contentTop+'px';}
function _getLabelSize(element,writingMode){const width=_getAdjustedLabelWidth(element);const height=element.getBoundingClientRect().height;const mainSize=writingMode.startsWith('vertical')?height:width;const crossSize=writingMode.startsWith('vertical')?width:height;return{width,height,mainSize,crossSize};}
function _getAdjustedLabelWidth(element){let labelWidth=element.getBoundingClientRect().width;if(labelWidth%2===1){labelWidth+=1;element.style.width=labelWidth+'px';}
return labelWidth;}
function _flipArrowTypeIfNeeded(arrowType,flipIn){if(!flipIn){return arrowType;}
switch(arrowType){case GridArrowTypes.leftTop:return GridArrowTypes.rightTop;case GridArrowTypes.leftMid:return GridArrowTypes.rightMid;case GridArrowTypes.leftBottom:return GridArrowTypes.rightBottom;case GridArrowTypes.rightTop:return GridArrowTypes.leftTop;case GridArrowTypes.rightMid:return GridArrowTypes.leftMid;case GridArrowTypes.rightBottom:return GridArrowTypes.leftBottom;case GridArrowTypes.topLeft:return GridArrowTypes.bottomLeft;case GridArrowTypes.topMid:return GridArrowTypes.bottomMid;case GridArrowTypes.topRight:return GridArrowTypes.bottomRight;case GridArrowTypes.bottomLeft:return GridArrowTypes.topLeft;case GridArrowTypes.bottomMid:return GridArrowTypes.topMid;case GridArrowTypes.bottomRight:return GridArrowTypes.topRight;}
return arrowType;}
function _adaptArrowTypeForWritingMode(arrowType,writingMode){if(writingMode==='vertical-lr'){switch(arrowType){case GridArrowTypes.leftTop:return GridArrowTypes.topLeft;case GridArrowTypes.leftMid:return GridArrowTypes.topMid;case GridArrowTypes.leftBottom:return GridArrowTypes.topRight;case GridArrowTypes.topLeft:return GridArrowTypes.leftTop;case GridArrowTypes.topMid:return GridArrowTypes.leftMid;case GridArrowTypes.topRight:return GridArrowTypes.leftBottom;case GridArrowTypes.rightTop:return GridArrowTypes.bottomRight;case GridArrowTypes.rightMid:return GridArrowTypes.bottomMid;case GridArrowTypes.rightBottom:return GridArrowTypes.bottomLeft;case GridArrowTypes.bottomLeft:return GridArrowTypes.rightTop;case GridArrowTypes.bottomMid:return GridArrowTypes.rightMid;case GridArrowTypes.bottomRight:return GridArrowTypes.rightBottom;}}
if(writingMode==='vertical-rl'){switch(arrowType){case GridArrowTypes.leftTop:return GridArrowTypes.topRight;case GridArrowTypes.leftMid:return GridArrowTypes.topMid;case GridArrowTypes.leftBottom:return GridArrowTypes.topLeft;case GridArrowTypes.topLeft:return GridArrowTypes.rightTop;case GridArrowTypes.topMid:return GridArrowTypes.rightMid;case GridArrowTypes.topRight:return GridArrowTypes.rightBottom;case GridArrowTypes.rightTop:return GridArrowTypes.bottomRight;case GridArrowTypes.rightMid:return GridArrowTypes.bottomMid;case GridArrowTypes.rightBottom:return GridArrowTypes.bottomLeft;case GridArrowTypes.bottomLeft:return GridArrowTypes.leftTop;case GridArrowTypes.bottomMid:return GridArrowTypes.leftMid;case GridArrowTypes.bottomRight:return GridArrowTypes.leftBottom;}}
return arrowType;}
function _getLabelPositionByArrowType(arrowType,x,y,labelWidth,labelHeight){let contentTop=0;let contentLeft=0;switch(arrowType){case GridArrowTypes.leftTop:contentTop=y;contentLeft=x+gridArrowWidth;break;case GridArrowTypes.leftMid:contentTop=y-(labelHeight/2);contentLeft=x+gridArrowWidth;break;case GridArrowTypes.leftBottom:contentTop=y-labelHeight;contentLeft=x+gridArrowWidth;break;case GridArrowTypes.rightTop:contentTop=y;contentLeft=x-gridArrowWidth-labelWidth;break;case GridArrowTypes.rightMid:contentTop=y-(labelHeight/2);contentLeft=x-gridArrowWidth-labelWidth;break;case GridArrowTypes.rightBottom:contentTop=y-labelHeight;contentLeft=x-labelWidth-gridArrowWidth;break;case GridArrowTypes.topLeft:contentTop=y+gridArrowWidth;contentLeft=x;break;case GridArrowTypes.topMid:contentTop=y+gridArrowWidth;contentLeft=x-(labelWidth/2);break;case GridArrowTypes.topRight:contentTop=y+gridArrowWidth;contentLeft=x-labelWidth;break;case GridArrowTypes.bottomLeft:contentTop=y-gridArrowWidth-labelHeight;contentLeft=x;break;case GridArrowTypes.bottomMid:contentTop=y-gridArrowWidth-labelHeight;contentLeft=x-(labelWidth/2);break;case GridArrowTypes.bottomRight:contentTop=y-gridArrowWidth-labelHeight;contentLeft=x-labelWidth;break;}
return{contentTop,contentLeft,};}
const DEFAULT_EXTENDED_LINE_COLOR='rgba(128, 128, 128, 0.3)';const gridStyle=`
/* Grid row and column labels */
.grid-label-content {
  position: absolute;
  -webkit-user-select: none;
  padding: 2px;
  font-family: Menlo, monospace;
  font-size: 10px;
  min-width: 17px;
  min-height: 15px;
  border-radius: 2px;
  box-sizing: border-box;
  z-index: 1;
  background-clip: padding-box;
  pointer-events: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-label-content[data-direction=row] {
  background-color: var(--row-label-color, #1A73E8);
  color: #121212;
}

.grid-label-content[data-direction=column] {
  background-color: var(--column-label-color, #1A73E8);
  color: #121212;
}

.line-names ul,
.line-names .line-name {
  margin: 0;
  padding: 0;
  list-style: none;
}

.line-names .line-name {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-names .grid-label-content,
.line-numbers .grid-label-content,
.track-sizes .grid-label-content {
  border: 1px solid white;
  --inner-corner-avoid-distance: 15px;
}

.grid-label-content.top-left.inner-shared-corner,
.grid-label-content.top-right.inner-shared-corner {
  transform: translateY(var(--inner-corner-avoid-distance));
}

.grid-label-content.bottom-left.inner-shared-corner,
.grid-label-content.bottom-right.inner-shared-corner {
  transform: translateY(calc(var(--inner-corner-avoid-distance) * -1));
}

.grid-label-content.left-top.inner-shared-corner,
.grid-label-content.left-bottom.inner-shared-corner {
  transform: translateX(var(--inner-corner-avoid-distance));
}

.grid-label-content.right-top.inner-shared-corner,
.grid-label-content.right-bottom.inner-shared-corner {
  transform: translateX(calc(var(--inner-corner-avoid-distance) * -1));
}

.line-names .grid-label-content::before,
.line-numbers .grid-label-content::before,
.track-sizes .grid-label-content::before {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  content: "";
  width: 3px;
  height: 3px;
  border: 1px solid white;
  border-width: 0 1px 1px 0;
}

.line-names .grid-label-content[data-direction=row]::before,
.line-numbers .grid-label-content[data-direction=row]::before,
.track-sizes .grid-label-content[data-direction=row]::before {
  background: var(--row-label-color, #1A73E8);
}

.line-names .grid-label-content[data-direction=column]::before,
.line-numbers .grid-label-content[data-direction=column]::before,
.track-sizes .grid-label-content[data-direction=column]::before {
  background: var(--column-label-color, #1A73E8);
}

.grid-label-content.bottom-mid::before {
  transform: translateY(-1px) rotate(45deg);
  top: 100%;
}

.grid-label-content.top-mid::before {
  transform: translateY(-3px) rotate(-135deg);
  top: 0%;
}

.grid-label-content.left-mid::before {
  transform: translateX(-3px) rotate(135deg);
  left: 0%
}

.grid-label-content.right-mid::before {
  transform: translateX(3px) rotate(-45deg);
  right: 0%;
}

.grid-label-content.right-top::before {
  transform: translateX(3px) translateY(-1px) rotate(-90deg) skewY(30deg);
  right: 0%;
  top: 0%;
}

.grid-label-content.right-bottom::before {
  transform: translateX(3px) translateY(-3px) skewX(30deg);
  right: 0%;
  top: 100%;
}

.grid-label-content.bottom-right::before {
  transform:  translateX(1px) translateY(-1px) skewY(30deg);
  right: 0%;
  top: 100%;
}

.grid-label-content.bottom-left::before {
  transform:  translateX(-1px) translateY(-1px) rotate(90deg) skewX(30deg);
  left: 0%;
  top: 100%;
}

.grid-label-content.left-top::before {
  transform: translateX(-3px) translateY(-1px) rotate(180deg) skewX(30deg);
  left: 0%;
  top: 0%;
}

.grid-label-content.left-bottom::before {
  transform: translateX(-3px) translateY(-3px) rotate(90deg) skewY(30deg);
  left: 0%;
  top: 100%;
}

.grid-label-content.top-right::before {
  transform:  translateX(1px) translateY(-3px) rotate(-90deg) skewX(30deg);
  right: 0%;
  top: 0%;
}

.grid-label-content.top-left::before {
  transform:  translateX(-1px) translateY(-3px) rotate(180deg) skewY(30deg);
  left: 0%;
  top: 0%;
}

@media (forced-colors: active) {
  .grid-label-content {
      border-color: Highlight;
      background-color: Canvas;
      color: Text;
      forced-color-adjust: none;
  }
  .grid-label-content::before {
    background-color: Canvas;
    border-color: Highlight;
  }
}`;function drawLayoutGridHighlight(highlight,context,deviceScaleFactor,canvasWidth,canvasHeight,emulationScaleFactor,labelState){const gridBounds=emptyBounds();const gridPath=buildPath(highlight.gridBorder,gridBounds,emulationScaleFactor);context.save();_applyWritingModeTransformation(highlight.writingMode,gridBounds,context);if(highlight.gridHighlightConfig.gridBackgroundColor){context.fillStyle=highlight.gridHighlightConfig.gridBackgroundColor;context.fill(gridPath);}
if(highlight.gridHighlightConfig.gridBorderColor){context.save();context.translate(0.5,0.5);context.lineWidth=0;if(highlight.gridHighlightConfig.gridBorderDash){context.setLineDash([3,3]);}
context.strokeStyle=highlight.gridHighlightConfig.gridBorderColor;context.stroke(gridPath);context.restore();}
const rowBounds=_drawGridLines(context,highlight,'row',emulationScaleFactor);const columnBounds=_drawGridLines(context,highlight,'column',emulationScaleFactor);_drawGridGap(context,highlight.rowGaps,highlight.gridHighlightConfig.rowGapColor,highlight.gridHighlightConfig.rowHatchColor,highlight.rotationAngle,emulationScaleFactor,true);_drawGridGap(context,highlight.columnGaps,highlight.gridHighlightConfig.columnGapColor,highlight.gridHighlightConfig.columnHatchColor,highlight.rotationAngle,emulationScaleFactor,false);const areaBounds=_drawGridAreas(context,highlight.areaNames,highlight.gridHighlightConfig.areaBorderColor,emulationScaleFactor);const writingModeMatrix=context.getTransform();writingModeMatrix.scaleSelf(1/deviceScaleFactor);context.restore();if(highlight.gridHighlightConfig.showGridExtensionLines){if(rowBounds){_drawExtendedGridLines(context,rowBounds,highlight.gridHighlightConfig.rowLineDash,writingModeMatrix,canvasWidth,canvasHeight);}
if(columnBounds){_drawExtendedGridLines(context,columnBounds,highlight.gridHighlightConfig.columnLineDash,writingModeMatrix,canvasWidth,canvasHeight);}}
drawGridLabels(highlight,gridBounds,areaBounds,{canvasWidth,canvasHeight},labelState,writingModeMatrix);}
function _applyWritingModeTransformation(writingMode,gridBounds,context){if(writingMode!=='vertical-rl'&&writingMode!=='vertical-lr'){return;}
const topLeft=gridBounds.allPoints[0];const bottomLeft=gridBounds.allPoints[3];context.translate(topLeft.x,topLeft.y);if(writingMode==='vertical-rl'){context.rotate(90*Math.PI/180);context.translate(0,-1*(bottomLeft.y-topLeft.y));}
if(writingMode==='vertical-lr'){context.rotate(90*Math.PI/180);context.scale(1,-1);}
context.translate(topLeft.x*-1,topLeft.y*-1);}
function _drawGridLines(context,highlight,direction,emulationScaleFactor){const tracks=highlight[`${direction}s`];const color=highlight.gridHighlightConfig[`${direction}LineColor`];const dash=highlight.gridHighlightConfig[`${direction}LineDash`];if(!color){return null;}
const bounds=emptyBounds();const path=buildPath(tracks,bounds,emulationScaleFactor);context.save();context.translate(0.5,0.5);if(dash){context.setLineDash([3,3]);}
context.lineWidth=0;context.strokeStyle=color;context.save();context.stroke(path);context.restore();context.restore();return bounds;}
function _drawExtendedGridLines(context,bounds,dash,writingModeMatrix,canvasWidth,canvasHeight){context.save();context.strokeStyle=DEFAULT_EXTENDED_LINE_COLOR;context.lineWidth=1;context.translate(0.5,0.5);if(dash){context.setLineDash([3,3]);}
for(let i=0;i<bounds.allPoints.length;i+=2){let point1=applyMatrixToPoint(bounds.allPoints[i],writingModeMatrix);let point2=applyMatrixToPoint(bounds.allPoints[i+1],writingModeMatrix);let edgePoint1;let edgePoint2;if(point1.x===point2.x){edgePoint1={x:point1.x,y:0};edgePoint2={x:point1.x,y:canvasHeight};if(point2.y<point1.y){[point1,point2]=[point2,point1];}}
else if(point1.y===point2.y){edgePoint1={x:0,y:point1.y};edgePoint2={x:canvasWidth,y:point1.y};if(point2.x<point1.x){[point1,point2]=[point2,point1];}}
else{const a=(point2.y-point1.y)/(point2.x-point1.x);const b=(point1.y*point2.x-point2.y*point1.x)/(point2.x-point1.x);edgePoint1={x:0,y:b};edgePoint2={x:canvasWidth,y:(canvasWidth*a)+b};if(point2.x<point1.x){[point1,point2]=[point2,point1];}}
context.beginPath();context.moveTo(edgePoint1.x,edgePoint1.y);context.lineTo(point1.x,point1.y);context.moveTo(point2.x,point2.y);context.lineTo(edgePoint2.x,edgePoint2.y);context.stroke();}
context.restore();}
function _drawGridAreas(context,areas,borderColor,emulationScaleFactor){if(!areas||!Object.keys(areas).length){return[];}
context.save();if(borderColor){context.strokeStyle=borderColor;}
context.lineWidth=2;const areaBounds=[];for(const name in areas){const areaCommands=areas[name];const bounds=emptyBounds();const path=buildPath(areaCommands,bounds,emulationScaleFactor);context.stroke(path);areaBounds.push({name,bounds});}
context.restore();return areaBounds;}
function _drawGridGap(context,gapCommands,gapColor,hatchColor,rotationAngle,emulationScaleFactor,flipDirection){if(!gapColor&&!hatchColor){return;}
context.save();context.translate(0.5,0.5);context.lineWidth=0;const bounds=emptyBounds();const path=buildPath(gapCommands,bounds,emulationScaleFactor);if(gapColor){context.fillStyle=gapColor;context.fill(path);}
if(hatchColor){_hatchFillPath(context,path,bounds,10,hatchColor,rotationAngle,flipDirection);}
context.restore();}
function _hatchFillPath(context,path,bounds,delta,color,rotationAngle,flipDirection){const dx=bounds.maxX-bounds.minX;const dy=bounds.maxY-bounds.minY;context.rect(bounds.minX,bounds.minY,dx,dy);context.save();context.clip(path);context.setLineDash([5,3]);const majorAxis=Math.max(dx,dy);context.strokeStyle=color;const centerX=bounds.minX+dx/2;const centerY=bounds.minY+dy/2;context.translate(centerX,centerY);context.rotate(rotationAngle*Math.PI/180);context.translate(-centerX,-centerY);if(flipDirection){for(let i=-majorAxis;i<majorAxis;i+=delta){context.beginPath();context.moveTo(bounds.maxX-i,bounds.minY);context.lineTo(bounds.maxX-dy-i,bounds.maxY);context.stroke();}}
else{for(let i=-majorAxis;i<majorAxis;i+=delta){context.beginPath();context.moveTo(i+bounds.minX,bounds.minY);context.lineTo(dy+i+bounds.minX,bounds.maxY);context.stroke();}}
context.restore();}
class DistancesOverlay extends Overlay{drawDistances({distanceInfo}){if(!distanceInfo){return;}
const rect=quadToRect(getVisualQuad(distanceInfo));this.context.save();this.context.strokeStyle='#ccc';for(const box of distanceInfo.boxes){this.context.strokeRect(box[0],box[1],box[2],box[3]);}
this.context.strokeStyle='#f00';this.context.lineWidth=1;this.context.rect(rect.x-0.5,rect.y-0.5,rect.w+1,rect.h+1);this.context.stroke();this.context.restore();}
install(){this.document.body.classList.add('fill');const canvas=this.document.createElement('canvas');canvas.id='canvas';canvas.classList.add('fill');this.document.body.append(canvas);this.setCanvas(canvas);super.install();}
uninstall(){this.document.body.classList.remove('fill');this.document.body.innerHTML='';super.uninstall();}}
function getVisualQuad(data){const style=data['style'];if(shouldUseVisualBorder(style)){return data['border'];}
if(ShouldUseVisualPadding(style)){return data['padding'];}
return data['content'];function shouldUseVisualBorder(style){const sides=['top','right','bottom','left'];for(const side of sides){const border_width=style[`border-${side}-width`];const border_style=style[`border-${side}-style`];const border_color=style[`border-${side}-color`];if(border_width!=='0px'&&border_style!=='none'&&!border_color.endsWith('00')){return true;}}
const outline_width=style['outline-width'];const outline_style=style['outline-style'];const outline_color=style['outline-color'];if(outline_width!=='0px'&&outline_style!=='none'&&!outline_color.endsWith('00')){return true;}
const box_shadow=style['box-shadow'];if(box_shadow!=='none'){return true;}
return false;}
function ShouldUseVisualPadding(style){const bg_color=style['background-color'];const bg_image=style['background-image'];if(!bg_color.startsWith('#FFFFFF')&&!bg_color.endsWith('00')){return true;}
if(bg_image!=='none'){return true;}
return false;}}
function quadToRect(quad){return{x:quad[0],y:quad[1],w:quad[4]-quad[0],h:quad[5]-quad[1]};}
const style$1=new CSSStyleSheet();style$1.replaceSync("@media (forced-colors: active) {\n  :root,\n  body {\n    background-color: transparent;\n    forced-color-adjust: none;\n  }\n}\n");class HighlightGridOverlay extends Overlay{constructor(){super(...arguments);this.gridLabelState={gridLayerCounter:0,gridPainted:false,};}
reset(data){super.reset(data);this.gridLabelState.gridLayerCounter=0;}
renderGridMarkup(){const gridLabels=this.document.createElement('div');gridLabels.id='grid-label-container';this.document.body.append(gridLabels);this.gridLabels=gridLabels;}
install(){this.document.body.classList.add('fill');const canvas=this.document.createElement('canvas');canvas.id='canvas';canvas.classList.add('fill');this.document.body.append(canvas);this.renderGridMarkup();this.setCanvas(canvas);super.install();}
uninstall(){this.document.body.classList.remove('fill');this.document.body.innerHTML='';super.uninstall();}
drawGridHighlight(highlight){this.context.save();drawLayoutGridHighlight(highlight,this.context,this.deviceScaleFactor,this.canvasWidth,this.canvasHeight,this.emulationScaleFactor,this.gridLabelState);this.context.restore();}}
const style$2=new CSSStyleSheet();style$2.replaceSync("body {\n  --arrow-width: 15px;\n  --arrow-height: 8px;\n  --shadow-up: 5px;\n  --shadow-down: -5px;\n  --shadow-direction: var(--shadow-up);\n  --arrow-down: polygon(0 0, 100% 0, 50% 100%);\n  --arrow-up: polygon(50% 0, 0 100%, 100% 100%);\n}\n\n.px {\n  color: rgb(128 128 128);\n}\n\n#element-title {\n  position: absolute;\n  z-index: 10;\n}\n\n/* Material */\n\n.tooltip-content {\n  position: absolute;\n  user-select: none;\n  background-color: white;\n  padding: 5px 8px;\n  border: 1px solid white;\n  border-radius: 3px;\n  box-sizing: border-box;\n  min-width: 100px;\n  max-width: min(300px, 100% - 4px);\n  z-index: 2;\n  background-clip: padding-box;\n  will-change: transform;\n  text-rendering: optimizeLegibility;\n  pointer-events: none;\n  filter: drop-shadow(0 2px 4px rgb(0 0 0 / 35%));\n}\n\n.tooltip-content::after {\n  content: \"\";\n  background: white;\n  width: var(--arrow-width);\n  height: var(--arrow-height);\n  clip-path: var(--arrow);\n  position: absolute;\n  top: var(--arrow-top);\n  left: var(--arrow-left);\n  visibility: var(--arrow-visibility);\n}\n\n.element-info-section {\n  margin-top: 12px;\n  margin-bottom: 6px;\n}\n\n.section-name {\n  color: #333;\n  font-weight: 500;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  line-height: 12px;\n}\n\n.element-info {\n  display: flex;\n  flex-direction: column;\n}\n\n.element-info-header {\n  display: flex;\n  align-items: center;\n}\n\n.element-info-body {\n  display: flex;\n  flex-direction: column;\n  padding-top: 2px;\n  margin-top: 2px;\n}\n\n.element-info-row {\n  display: flex;\n  line-height: 19px;\n}\n\n.separator-container {\n  display: flex;\n  align-items: center;\n  flex: auto;\n  margin-left: 7px;\n}\n\n.separator {\n  border-top: 1px solid #ddd;\n  width: 100%;\n}\n\n.element-info-name {\n  flex-shrink: 0;\n  color: #666;\n}\n\n.element-info-gap {\n  flex: auto;\n}\n\n.element-info-value-color {\n  display: flex;\n  color: rgb(48 57 66);\n  margin-left: 10px;\n  align-items: baseline;\n}\n\n.a11y-icon {\n  width: 16px;\n  height: 16px;\n  background-repeat: no-repeat;\n  display: inline-block;\n}\n\n.element-info-value-contrast {\n  display: flex;\n  align-items: center;\n  text-align: right;\n  color: rgb(48 57 66);\n  margin-left: 10px;\n}\n\n.element-info-value-contrast .a11y-icon {\n  margin-left: 8px;\n}\n\n.element-info-value-icon {\n  display: flex;\n  align-items: center;\n}\n\n.element-info-value-text {\n  text-align: right;\n  color: rgb(48 57 66);\n  margin-left: 10px;\n  align-items: baseline;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.color-swatch {\n  display: flex;\n  margin-right: 2px;\n  width: 10px;\n  height: 10px;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);\n  line-height: 10px;\n}\n\n.color-swatch-inner {\n  flex: auto;\n  border: 1px solid rgb(128 128 128 / 60%);\n}\n\n.element-layout-type {\n  margin-right: 10px;\n  width: 16px;\n  height: 16px;\n}\n\n.element-layout-type.grid {\n  background-image: url('data:image/svg+xml,<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2.5\" y=\"2.5\" width=\"4\" height=\"4\" stroke=\"%231A73E8\"/><rect x=\"9.5\" y=\"2.5\" width=\"4\" height=\"4\" stroke=\"%231A73E8\"/><rect x=\"9.5\" y=\"9.5\" width=\"4\" height=\"4\" stroke=\"%231A73E8\"/><rect x=\"2.5\" y=\"9.5\" width=\"4\" height=\"4\" stroke=\"%231A73E8\"/></svg>');\n}\n\n.element-layout-type.flex {\n  background-image: url('data:image/svg+xml,<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2.5\" y=\"2.5\" width=\"5.5\" height=\"4\" stroke=\"%231A73E8\"/><rect x=\"11\" y=\"2.5\" width=\"2.5\" height=\"4\" stroke=\"%231A73E8\"/><rect x=\"8\" y=\"9.5\" width=\"5.5\" height=\"4\" stroke=\"%231A73E8\"/><rect x=\"2.5\" y=\"9.5\" width=\"2.5\" height=\"4\" stroke=\"%231A73E8\"/></svg>');\n}\n\n.element-description {\n  flex: 1 1;\n  font-weight: bold;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n\n.dimensions {\n  color: hsl(0deg 0% 45%);\n  text-align: right;\n  margin-left: 10px;\n}\n\n.material-node-width {\n  margin-right: 2px;\n}\n\n.material-node-height {\n  margin-left: 2px;\n}\n\n.material-tag-name {\n  /* Keep this in sync with inspectorSyntaxHighlight.css (--dom-tag-name-color) */\n  color: rgb(136 18 128);\n}\n\n.material-class-name,\n.material-node-id {\n  /* Keep this in sync with inspectorSyntaxHighlight.css (.webkit-html-attribute-value) */\n  color: rgb(26 26 166);\n}\n\n.contrast-text {\n  width: 16px;\n  height: 16px;\n  text-align: center;\n  line-height: 16px;\n  margin-right: 8px;\n  border: 1px solid rgb(0 0 0 / 10%);\n  padding: 0 1px;\n}\n\n.a11y-icon-not-ok {\n  background-image: url('data:image/svg+xml,<svg fill=\"none\" viewBox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m9 1.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm0 13.5c-3.315 0-6-2.685-6-6 0-1.3875.4725-2.6625 1.2675-3.675l8.4075 8.4075c-1.0125.795-2.2875 1.2675-3.675 1.2675zm4.7325-2.325-8.4075-8.4075c1.0125-.795 2.2875-1.2675 3.675-1.2675 3.315 0 6 2.685 6 6 0 1.3875-.4725 2.6625-1.2675 3.675z\" fill=\"%239e9e9e\"/></svg>');\n}\n\n.a11y-icon-warning {\n  background-image: url('data:image/svg+xml,<svg fill=\"none\" viewBox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m8.25 11.25h1.5v1.5h-1.5zm0-6h1.5v4.5h-1.5zm.7425-3.75c-4.14 0-7.4925 3.36-7.4925 7.5s3.3525 7.5 7.4925 7.5c4.1475 0 7.5075-3.36 7.5075-7.5s-3.36-7.5-7.5075-7.5zm.0075 13.5c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z\" fill=\"%23e37400\"/></svg>');\n}\n\n.a11y-icon-ok {\n  background-image: url('data:image/svg+xml,<svg fill=\"none\" viewBox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m9 1.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm0 13.5c-3.3075 0-6-2.6925-6-6s2.6925-6 6-6 6 2.6925 6 6-2.6925 6-6 6zm-1.5-4.35-1.95-1.95-1.05 1.05 3 3 6-6-1.05-1.05z\" fill=\"%230ca40c\"/></svg>');\n}\n\n@media (forced-colors: active) {\n  :root,\n  body {\n    background-color: transparent;\n    forced-color-adjust: none;\n  }\n\n  .tooltip-content {\n    border-color: Highlight;\n    background-color: canvas;\n    color: text;\n    forced-color-adjust: none;\n  }\n\n  .tooltip-content::after {\n    background-color: Highlight;\n  }\n\n  .color-swatch-inner,\n  .contrast-text,\n  .separator {\n    border-color: Highlight;\n  }\n\n  .section-name {\n    color: Highlight;\n  }\n\n  .dimensions,\n  .element-info-name,\n  .element-info-value-color,\n  .element-info-value-contrast,\n  .element-info-value-icon,\n  .element-info-value-text,\n  .material-tag-name,\n  .material-class-name,\n  .material-node-id {\n    color: canvastext;\n  }\n}\n");function blendColors(fgRGBA,bgRGBA){const alpha=fgRGBA[3];return[((1-alpha)*bgRGBA[0])+(alpha*fgRGBA[0]),((1-alpha)*bgRGBA[1])+(alpha*fgRGBA[1]),((1-alpha)*bgRGBA[2])+(alpha*fgRGBA[2]),alpha+(bgRGBA[3]*(1-alpha)),];}
function rgbaToHsla([r,g,b,a]){const max=Math.max(r,g,b);const min=Math.min(r,g,b);const diff=max-min;const sum=max+min;let h;if(min===max){h=0;}
else if(r===max){h=((1/6*(g-b)/diff)+1)%1;}
else if(g===max){h=(1/6*(b-r)/diff)+1/3;}
else{h=(1/6*(r-g)/diff)+2/3;}
const l=0.5*sum;let s;if(l===0){s=0;}
else if(l===1){s=0;}
else if(l<=0.5){s=diff/sum;}
else{s=diff/(2-sum);}
return[h,s,l,a];}
function luminance([rSRGB,gSRGB,bSRGB]){const r=rSRGB<=0.03928?rSRGB/12.92:Math.pow(((rSRGB+0.055)/1.055),2.4);const g=gSRGB<=0.03928?gSRGB/12.92:Math.pow(((gSRGB+0.055)/1.055),2.4);const b=bSRGB<=0.03928?bSRGB/12.92:Math.pow(((bSRGB+0.055)/1.055),2.4);return 0.2126*r+0.7152*g+0.0722*b;}
function contrastRatio(fgRGBA,bgRGBA){const blendedFg=blendColors(fgRGBA,bgRGBA);const fgLuminance=luminance(blendedFg);const bgLuminance=luminance(bgRGBA);const contrastRatio=(Math.max(fgLuminance,bgLuminance)+0.05)/(Math.min(fgLuminance,bgLuminance)+0.05);return contrastRatio;}
var LinePattern;(function(LinePattern){LinePattern[LinePattern["Solid"]=0]="Solid";LinePattern[LinePattern["Dotted"]=1]="Dotted";LinePattern[LinePattern["Dashed"]=2]="Dashed";})(LinePattern||(LinePattern={}));class HighlightOverlay extends Overlay{constructor(){super(...arguments);this.gridLabelState={gridLayerCounter:0,gridPainted:false};}
reset(resetData){super.reset(resetData);this.tooltip.innerHTML='';this.gridLabelState.gridLayerCounter=0;if(this.gridOverlay){this.gridOverlay.reset(resetData);}}
install(){this.document.body.classList.add('fill');const canvas=this.document.createElement('canvas');canvas.id='canvas';canvas.classList.add('fill');this.document.body.append(canvas);const tooltip=this.document.createElement('div');tooltip.id='tooltip-container';this.document.body.append(tooltip);this.tooltip=tooltip;this.gridOverlay=new HighlightGridOverlay(this.window);this.gridOverlay.renderGridMarkup();this.gridOverlay.setCanvas(canvas);this.setCanvas(canvas);super.install();}
uninstall(){this.document.body.classList.remove('fill');this.document.body.innerHTML='';super.uninstall();}
drawHighlight(highlight){this.context.save();const bounds=emptyBounds();for(let paths=highlight.paths.slice();paths.length;){const path=paths.pop();if(!path){continue;}
this.context.save();drawPath(this.context,path.path,path.fillColor,path.outlineColor,bounds,this.emulationScaleFactor);if(paths.length){this.context.globalCompositeOperation='destination-out';drawPath(this.context,paths[paths.length-1].path,'red',undefined,bounds,this.emulationScaleFactor);}
this.context.restore();}
this.context.restore();this.context.save();const rulerAtRight=!!(highlight.paths.length&&highlight.showRulers&&bounds.minX<20&&bounds.maxX+20<this.canvasWidth);const rulerAtBottom=!!(highlight.paths.length&&highlight.showRulers&&bounds.minY<20&&bounds.maxY+20<this.canvasHeight);if(highlight.showRulers){this._drawAxis(this.context,rulerAtRight,rulerAtBottom);}
if(highlight.paths.length){if(highlight.showExtensionLines){drawRulers(this.context,bounds,rulerAtRight,rulerAtBottom,undefined,false,this.canvasWidth,this.canvasHeight);}
if(highlight.elementInfo){_drawElementTitle(highlight.elementInfo,highlight.colorFormat,bounds,this.canvasWidth,this.canvasHeight);}}
if(highlight.gridInfo){for(const grid of highlight.gridInfo){drawLayoutGridHighlight(grid,this.context,this.deviceScaleFactor,this.canvasWidth,this.canvasHeight,this.emulationScaleFactor,this.gridLabelState);}}
if(highlight.flexInfo){for(const flex of highlight.flexInfo){drawLayoutFlexContainerHighlight(flex,this.context,this.deviceScaleFactor,this.canvasWidth,this.canvasHeight,this.emulationScaleFactor);}}
this.context.restore();return{bounds:bounds};}
drawGridHighlight(highlight){if(this.gridOverlay){this.gridOverlay.drawGridHighlight(highlight);}}
_drawAxis(context,rulerAtRight,rulerAtBottom){if(this.gridLabelState.gridPainted){return;}
this.gridLabelState.gridPainted=true;context.save();const pageFactor=this.pageZoomFactor*this.pageScaleFactor*this.emulationScaleFactor;const scrollX=this.scrollX*this.pageScaleFactor;const scrollY=this.scrollY*this.pageScaleFactor;function zoom(x){return Math.round(x*pageFactor);}
function unzoom(x){return Math.round(x/pageFactor);}
const width=this.canvasWidth/pageFactor;const height=this.canvasHeight/pageFactor;const gridSubStep=5;const gridStep=50;{context.save();context.fillStyle=gridBackgroundColor;if(rulerAtBottom){context.fillRect(0,zoom(height)-15,zoom(width),zoom(height));}
else{context.fillRect(0,0,zoom(width),15);}
context.globalCompositeOperation='destination-out';context.fillStyle='red';if(rulerAtRight){context.fillRect(zoom(width)-15,0,zoom(width),zoom(height));}
else{context.fillRect(0,0,15,zoom(height));}
context.restore();context.fillStyle=gridBackgroundColor;if(rulerAtRight){context.fillRect(zoom(width)-15,0,zoom(width),zoom(height));}
else{context.fillRect(0,0,15,zoom(height));}}
context.lineWidth=1;context.strokeStyle=darkGridColor;context.fillStyle=darkGridColor;{context.save();context.translate(-scrollX,0.5-scrollY);const maxY=height+unzoom(scrollY);for(let y=2*gridStep;y<maxY;y+=2*gridStep){context.save();context.translate(scrollX,zoom(y));context.rotate(-Math.PI/2);context.fillText(String(y),2,rulerAtRight?zoom(width)-7:13);context.restore();}
context.translate(0.5,-0.5);const maxX=width+unzoom(scrollX);for(let x=2*gridStep;x<maxX;x+=2*gridStep){context.save();context.fillText(String(x),zoom(x)+2,rulerAtBottom?scrollY+zoom(height)-7:scrollY+13);context.restore();}
context.restore();}
{context.save();if(rulerAtRight){context.translate(zoom(width),0);context.scale(-1,1);}
context.translate(-scrollX,0.5-scrollY);const maxY=height+unzoom(scrollY);for(let y=gridStep;y<maxY;y+=gridStep){context.beginPath();context.moveTo(scrollX,zoom(y));const markLength=(y%(gridStep*2))?5:8;context.lineTo(scrollX+markLength,zoom(y));context.stroke();}
context.strokeStyle=lightGridColor;for(let y=gridSubStep;y<maxY;y+=gridSubStep){if(!(y%gridStep)){continue;}
context.beginPath();context.moveTo(scrollX,zoom(y));context.lineTo(scrollX+gridSubStep,zoom(y));context.stroke();}
context.restore();}
{context.save();if(rulerAtBottom){context.translate(0,zoom(height));context.scale(1,-1);}
context.translate(0.5-scrollX,-scrollY);const maxX=width+unzoom(scrollX);for(let x=gridStep;x<maxX;x+=gridStep){context.beginPath();context.moveTo(zoom(x),scrollY);const markLength=(x%(gridStep*2))?5:8;context.lineTo(zoom(x),scrollY+markLength);context.stroke();}
context.strokeStyle=lightGridColor;for(let x=gridSubStep;x<maxX;x+=gridSubStep){if(!(x%gridStep)){continue;}
context.beginPath();context.moveTo(zoom(x),scrollY);context.lineTo(zoom(x),scrollY+gridSubStep);context.stroke();}
context.restore();}
context.restore();}}
const lightGridColor='rgba(0,0,0,0.2)';const darkGridColor='rgba(0,0,0,0.7)';const gridBackgroundColor='rgba(255, 255, 255, 0.8)';function parseHexa(hexa){return(hexa.match(/#(\w\w)(\w\w)(\w\w)(\w\w)/)||[]).slice(1).map(c=>parseInt(c,16)/255);}
function formatColor(hexa,colorFormat){if(colorFormat==='rgb'){const[r,g,b,a]=parseHexa(hexa);return`rgb(${(r * 255).toFixed()} ${(g * 255).toFixed()} ${(b * 255).toFixed()}${a === 1 ? '' : ' / ' + Math.round(a * 100) / 100})`;}
if(colorFormat==='hsl'){const[h,s,l,a]=rgbaToHsla(parseHexa(hexa));return`hsl(${Math.round(h * 360)}deg ${Math.round(s * 100)} ${Math.round(l * 100)}${a === 1 ? '' : ' / ' + Math.round(a * 100) / 100})`;}
if(hexa.endsWith('FF')){return hexa.substr(0,7);}
return hexa;}
function computeIsLargeFont(contrast){const boldWeights=new Set(['bold','bolder','600','700','800','900']);const fontSizePx=parseFloat(contrast.fontSize.replace('px',''));const isBold=boldWeights.has(contrast.fontWeight);const fontSizePt=fontSizePx*72/96;if(isBold){return fontSizePt>=14;}
return fontSizePt>=18;}
function _getElementLayoutType(elementInfo){if(elementInfo.layoutObjectName&&elementInfo.layoutObjectName.endsWith('Grid')){return'grid';}
if(elementInfo.layoutObjectName&&elementInfo.layoutObjectName==='LayoutNGFlexibleBox'){return'flex';}
return null;}
function _createElementDescription(elementInfo,colorFormat){const elementInfoElement=createElement('div','element-info');const elementInfoHeaderElement=createChild(elementInfoElement,'div','element-info-header');const layoutType=_getElementLayoutType(elementInfo);if(layoutType){createChild(elementInfoHeaderElement,'div',`element-layout-type ${layoutType}`);}
const descriptionElement=createChild(elementInfoHeaderElement,'div','element-description monospace');const tagNameElement=createChild(descriptionElement,'span','material-tag-name');tagNameElement.textContent=elementInfo.tagName;const nodeIdElement=createChild(descriptionElement,'span','material-node-id');const maxLength=80;nodeIdElement.textContent=elementInfo.idValue?'#'+ellipsify(elementInfo.idValue,maxLength):'';nodeIdElement.classList.toggle('hidden',!elementInfo.idValue);const classNameElement=createChild(descriptionElement,'span','material-class-name');if(nodeIdElement.textContent.length<maxLength){classNameElement.textContent=ellipsify(elementInfo.className||'',maxLength-nodeIdElement.textContent.length);}
classNameElement.classList.toggle('hidden',!elementInfo.className);const dimensionsElement=createChild(elementInfoHeaderElement,'div','dimensions');createChild(dimensionsElement,'span','material-node-width').textContent=String(Math.round(elementInfo.nodeWidth*100)/100);createTextChild(dimensionsElement,'\u00d7');createChild(dimensionsElement,'span','material-node-height').textContent=String(Math.round(elementInfo.nodeHeight*100)/100);const style=elementInfo.style||{};let elementInfoBodyElement;if(elementInfo.isLockedAncestor){addTextRow('Showing the locked ancestor','');}
const color=style['color'];if(color&&color!=='#00000000'){addColorRow('Color',color,colorFormat);}
const fontFamily=style['font-family'];const fontSize=style['font-size'];if(fontFamily&&fontSize!=='0px'){addTextRow('Font',`${fontSize} ${fontFamily}`);}
const bgcolor=style['background-color'];if(bgcolor&&bgcolor!=='#00000000'){addColorRow('Background',bgcolor,colorFormat);}
const margin=style['margin'];if(margin&&margin!=='0px'){addTextRow('Margin',margin);}
const padding=style['padding'];if(padding&&padding!=='0px'){addTextRow('Padding',padding);}
const cbgColor=elementInfo.contrast?elementInfo.contrast.backgroundColor:null;const hasContrastInfo=color&&color!=='#00000000'&&cbgColor&&cbgColor!=='#00000000';if(elementInfo.showAccessibilityInfo){addSection('Accessibility');if(hasContrastInfo&&style['color']&&elementInfo.contrast){addContrastRow(style['color'],elementInfo.contrast);}
addTextRow('Name',elementInfo.accessibleName);addTextRow('Role',elementInfo.accessibleRole);addIconRow('Keyboard-focusable',elementInfo.isKeyboardFocusable?'a11y-icon a11y-icon-ok':'a11y-icon a11y-icon-not-ok');}
function ensureElementInfoBody(){if(!elementInfoBodyElement){elementInfoBodyElement=createChild(elementInfoElement,'div','element-info-body');}}
function addSection(name){ensureElementInfoBody();const rowElement=createChild(elementInfoBodyElement,'div','element-info-row element-info-section');const nameElement=createChild(rowElement,'div','section-name');nameElement.textContent=name;createChild(createChild(rowElement,'div','separator-container'),'div','separator');}
function addRow(name,rowClassName,valueClassName){ensureElementInfoBody();const rowElement=createChild(elementInfoBodyElement,'div','element-info-row');if(rowClassName){rowElement.classList.add(rowClassName);}
const nameElement=createChild(rowElement,'div','element-info-name');nameElement.textContent=name;createChild(rowElement,'div','element-info-gap');return createChild(rowElement,'div',valueClassName||'');}
function addIconRow(name,value){createChild(addRow(name,'','element-info-value-icon'),'div',value);}
function addTextRow(name,value){createTextChild(addRow(name,'','element-info-value-text'),value);}
function addColorRow(name,color,colorFormat){const valueElement=addRow(name,'','element-info-value-color');const swatch=createChild(valueElement,'div','color-swatch');const inner=createChild(swatch,'div','color-swatch-inner');inner.style.backgroundColor=color;createTextChild(valueElement,formatColor(color,colorFormat));}
function addContrastRow(fgColor,contrast){const ratio=contrastRatio(parseHexa(fgColor),parseHexa(contrast.backgroundColor));const threshold=computeIsLargeFont(contrast)?3.0:4.5;const valueElement=addRow('Contrast','','element-info-value-contrast');const sampleText=createChild(valueElement,'div','contrast-text');sampleText.style.color=fgColor;sampleText.style.backgroundColor=contrast.backgroundColor;sampleText.textContent='Aa';const valueSpan=createChild(valueElement,'span');valueSpan.textContent=String(Math.round(ratio*100)/100);createChild(valueElement,'div',ratio<threshold?'a11y-icon a11y-icon-warning':'a11y-icon a11y-icon-ok');}
return elementInfoElement;}
function _drawElementTitle(elementInfo,colorFormat,bounds,canvasWidth,canvasHeight){const tooltipContainer=document.getElementById('tooltip-container');if(!tooltipContainer){throw new Error('#tooltip-container is not found');}
tooltipContainer.innerHTML='';const wrapper=createChild(tooltipContainer,'div');const tooltipContent=createChild(wrapper,'div','tooltip-content');const tooltip=_createElementDescription(elementInfo,colorFormat);tooltipContent.appendChild(tooltip);const titleWidth=tooltipContent.offsetWidth;const titleHeight=tooltipContent.offsetHeight;const arrowHalfWidth=8;const pageMargin=2;const arrowWidth=arrowHalfWidth*2;const arrowInset=arrowHalfWidth+2;const containerMinX=pageMargin+arrowInset;const containerMaxX=canvasWidth-pageMargin-arrowInset-arrowWidth;const boundsAreTooNarrow=bounds.maxX-bounds.minX<arrowWidth+2*arrowInset;let arrowX;if(boundsAreTooNarrow){arrowX=(bounds.minX+bounds.maxX)*0.5-arrowHalfWidth;}
else{const xFromLeftBound=bounds.minX+arrowInset;const xFromRightBound=bounds.maxX-arrowInset-arrowWidth;if(xFromLeftBound>containerMinX&&xFromLeftBound<containerMaxX){arrowX=xFromLeftBound;}
else{arrowX=constrainNumber(containerMinX,xFromLeftBound,xFromRightBound);}}
const arrowHidden=arrowX<containerMinX||arrowX>containerMaxX;let boxX=arrowX-arrowInset;boxX=constrainNumber(boxX,pageMargin,canvasWidth-titleWidth-pageMargin);let boxY=bounds.minY-arrowHalfWidth-titleHeight;let onTop=true;if(boxY<0){boxY=Math.min(canvasHeight-titleHeight,bounds.maxY+arrowHalfWidth);onTop=false;}
else if(bounds.minY>canvasHeight){boxY=canvasHeight-arrowHalfWidth-titleHeight;}
const includes=boxX>=bounds.minX&&boxX+titleWidth<=bounds.maxX&&boxY>=bounds.minY&&boxY+titleHeight<=bounds.maxY;const overlaps=boxX<bounds.maxX&&boxX+titleWidth>bounds.minX&&boxY<bounds.maxY&&boxY+titleHeight>bounds.minY;if(overlaps&&!includes){tooltipContent.style.display='none';return;}
tooltipContent.style.top=boxY+'px';tooltipContent.style.left=boxX+'px';tooltipContent.style.setProperty('--arrow-visibility',(arrowHidden||includes)?'hidden':'visible');if(arrowHidden){return;}
tooltipContent.style.setProperty('--arrow',onTop?'var(--arrow-down)':'var(--arrow-up)');tooltipContent.style.setProperty('--shadow-direction',onTop?'var(--shadow-up)':'var(--shadow-down)');tooltipContent.style.setProperty('--arrow-top',(onTop?titleHeight-1:-arrowHalfWidth)+'px');tooltipContent.style.setProperty('--arrow-left',(arrowX-boxX)+'px');}
function drawPath(context,commands,fillColor,outlineColor,bounds,emulationScaleFactor){context.save();const path=buildPath(commands,bounds,emulationScaleFactor);if(fillColor){context.fillStyle=fillColor;context.fill(path);}
if(outlineColor){context.lineWidth=2;context.strokeStyle=outlineColor;context.stroke(path);}
context.restore();return path;}
const DEFAULT_RULER_COLOR='rgba(128, 128, 128, 0.3)';function drawRulers(context,bounds,rulerAtRight,rulerAtBottom,color,dash,canvasWidth,canvasHeight){context.save();const width=canvasWidth;const height=canvasHeight;context.strokeStyle=color||DEFAULT_RULER_COLOR;context.lineWidth=1;context.translate(0.5,0.5);if(dash){context.setLineDash([3,3]);}
if(rulerAtRight){for(const y in bounds.rightmostXForY){context.beginPath();context.moveTo(width,Number(y));context.lineTo(bounds.rightmostXForY[y],Number(y));context.stroke();}}
else{for(const y in bounds.leftmostXForY){context.beginPath();context.moveTo(0,Number(y));context.lineTo(bounds.leftmostXForY[y],Number(y));context.stroke();}}
if(rulerAtBottom){for(const x in bounds.bottommostYForX){context.beginPath();context.moveTo(Number(x),height);context.lineTo(Number(x),bounds.topmostYForX[x]);context.stroke();}}
else{for(const x in bounds.topmostYForX){context.beginPath();context.moveTo(Number(x),0);context.lineTo(Number(x),bounds.topmostYForX[x]);context.stroke();}}
context.restore();}
function drawLayoutFlexContainerHighlight(highlight,context,deviceScaleFactor,canvasWidth,canvasHeight,emulationScaleFactor){const config=highlight.flexContainerHighlightConfig;const bounds=emptyBounds();const borderPath=buildPath(highlight.containerBorder,bounds,emulationScaleFactor);if(config.containerBorder&&config.containerBorder.color){context.save();context.translate(0.5,0.5);context.lineWidth=1;if(config.containerBorder.pattern===LinePattern.Dashed){context.setLineDash([3,3]);}
if(config.containerBorder.pattern===LinePattern.Dotted){context.setLineDash([2,2]);}
context.strokeStyle=config.containerBorder.color;context.stroke(borderPath);context.restore();}}
const style$3=new CSSStyleSheet();style$3.replaceSync("body {\n  background-color: rgb(0 0 0 / 31%);\n}\n\n.controls-line {\n  display: flex;\n  justify-content: center;\n  margin: 10px 0;\n}\n\n.message-box {\n  padding: 2px 4px;\n  display: flex;\n  align-items: center;\n  cursor: default;\n  overflow: hidden;\n}\n\n#paused-in-debugger {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.controls-line > * {\n  background-color: rgb(255 255 194);\n  border: 1px solid rgb(202 202 202);\n  height: 22px;\n  box-sizing: border-box;\n}\n\n.controls-line .button {\n  width: 26px;\n  margin-left: -1px;\n  margin-right: 0;\n  padding: 0;\n  flex-shrink: 0;\n  flex-grow: 0;\n  cursor: pointer;\n}\n\n.controls-line .button .glyph {\n  width: 100%;\n  height: 100%;\n  background-color: rgb(0 0 0 / 75%);\n  opacity: 80%;\n  -webkit-mask-repeat: no-repeat;\n  -webkit-mask-position: center;\n  position: relative;\n}\n\n.controls-line .button:active .glyph {\n  top: 1px;\n  left: 1px;\n}\n\n#resume-button .glyph {\n  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAKCAYAAABv7tTEAAAAAXNSR0IArs4c6QAAAFJJREFUKM+10bEJgGAMBeEPbR3BLRzEVdzEVRzELRzBVohVwEJ+iODBlQfhBeJhsmHU4C0KnFjQV6J0x1SNAhdWDJUoPTB3PvLLeaUhypM3n3sD/qc7lDrdpIEAAAAASUVORK5CYII=);\n  -webkit-mask-size: 13px 10px;\n  background-color: rgb(66 129 235);\n}\n\n#step-over-button .glyph {\n  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAYAAAC5Sw6hAAAAAXNSR0IArs4c6QAAAOFJREFUKM+N0j8rhXEUB/DPcxW35CqhvIBrtqibkklhV8qkTHe4ZbdblcXgPVhuMdqUTUl5A2KRRCF5LGc4PT1P7qnfcr5/zu/8KdTHLFaxjHnc4RZXKI0QYxjgLQTVd42l/0wmg5iFX3iq5H6w22RS4DyRH7CB8cAXcBTGJT6xUmd0mEwuMdFQcA3fwXvGTAan8BrgPabTL9fRRyfx91PRMwyjGwcJ2EyCfsrfpPw2Pipz24NT/MZciiQYVshzOKnZ5Hturxt3k2MnCpS4SPkeHpPR8Sh3tYgttBoW9II2/AHiaEqvD2Fc0wAAAABJRU5ErkJggg==);\n  -webkit-mask-size: 18px 10px;\n}\n");class PausedOverlay extends Overlay{constructor(window,style=[]){super(window,style);this.onKeyDown=this.onKeyDown.bind(this);}
onKeyDown(event){if(event.key==='F8'||this.eventHasCtrlOrMeta(event)&&event.key==='\\'){this.window.InspectorOverlayHost.send('resume');}
else if(event.key==='F10'||this.eventHasCtrlOrMeta(event)&&event.key==='\''){this.window.InspectorOverlayHost.send('stepOver');}}
install(){const controlsLine=this.document.createElement('div');controlsLine.classList.add('controls-line');const messageBox=this.document.createElement('div');messageBox.classList.add('message-box');const pausedInDebugger=this.document.createElement('div');pausedInDebugger.id='paused-in-debugger';this.container=pausedInDebugger;messageBox.append(pausedInDebugger);controlsLine.append(messageBox);const resumeButton=this.document.createElement('div');resumeButton.id='resume-button';resumeButton.title='Resume script execution (F8).';resumeButton.classList.add('button');const glyph=this.document.createElement('div');glyph.classList.add('glyph');resumeButton.append(glyph);controlsLine.append(resumeButton);const stepOverButton=this.document.createElement('div');stepOverButton.id='step-over-button';stepOverButton.title='Step over next function call (F10).';stepOverButton.classList.add('button');const glyph2=this.document.createElement('div');glyph2.classList.add('glyph');stepOverButton.append(glyph2);controlsLine.append(stepOverButton);this.document.body.append(controlsLine);this.document.addEventListener('keydown',this.onKeyDown);resumeButton.addEventListener('click',()=>this.window.InspectorOverlayHost.send('resume'));stepOverButton.addEventListener('click',()=>this.window.InspectorOverlayHost.send('stepOver'));super.install();}
uninstall(){this.document.body.innerHTML='';this.document.removeEventListener('keydown',this.onKeyDown);super.uninstall();}
drawPausedInDebuggerMessage(message){this.container.textContent=message;}}
const style$4=new CSSStyleSheet();style$4.replaceSync("body {\n  cursor: crosshair;\n}\n\n#zone {\n  background-color: #0003;\n  border: 1px solid #fffd;\n  display: none;\n  position: absolute;\n}\n");let anchor=null;let position=null;class ScreenshotOverlay extends Overlay{constructor(window,style=[]){super(window,style);this.onMouseDown=this.onMouseDown.bind(this);this.onMouseUp=this.onMouseUp.bind(this);this.onMouseMove=this.onMouseMove.bind(this);this.onKeyDown=this.onKeyDown.bind(this);}
install(){const root=this.document.documentElement;root.addEventListener('mousedown',this.onMouseDown,true);root.addEventListener('mouseup',this.onMouseUp,true);root.addEventListener('mousemove',this.onMouseMove,true);root.addEventListener('keydown',this.onKeyDown,true);const zone=this.document.createElement('div');zone.id='zone';this.document.body.append(zone);this.zone=zone;super.install();}
uninstall(){this.document.body.innerHTML='';const root=this.document.documentElement;root.removeEventListener('mousedown',this.onMouseDown,true);root.removeEventListener('mouseup',this.onMouseUp,true);root.removeEventListener('mousemove',this.onMouseMove,true);root.removeEventListener('keydown',this.onKeyDown,true);super.uninstall();}
onMouseDown(event){anchor={x:event.pageX,y:event.pageY};position=anchor;this.updateZone();event.stopPropagation();event.preventDefault();}
onMouseUp(event){if(anchor&&position){const rect=currentRect();if(rect.width>=5&&rect.height>=5){this.window.InspectorOverlayHost.send(JSON.stringify(rect));}}
cancel();this.updateZone();event.stopPropagation();event.preventDefault();}
onMouseMove(event){if(anchor&&event.buttons===1){position={x:event.pageX,y:event.pageY};}
else{anchor=null;}
this.updateZone();event.stopPropagation();event.preventDefault();}
onKeyDown(event){if(anchor&&event.key==='Escape'){cancel();this.updateZone();event.stopPropagation();event.preventDefault();}}
updateZone(){const zone=this.zone;if(!position||!anchor){zone.style.display='none';return;}
zone.style.display='block';const rect=currentRect();zone.style.left=rect.x+'px';zone.style.top=rect.y+'px';zone.style.width=rect.width+'px';zone.style.height=rect.height+'px';}}
function currentRect(){return{x:Math.min(anchor.x,position.x),y:Math.min(anchor.y,position.y),width:Math.abs(anchor.x-position.x),height:Math.abs(anchor.y-position.y),};}
function cancel(){anchor=null;position=null;}
const style$5=new CSSStyleSheet();style$5.replaceSync(":root {\n  --border-radius: 4px;\n}\n\n.source-order-label-container {\n  display: block;\n  min-width: 20px;\n  position: absolute;\n  text-align: center;\n  align-items: center;\n  background-color: white;\n  font-family: Menlo, Consolas, monospace;\n  font-size: 12px;\n  font-weight: bold;\n  padding: 2px;\n  border: 1.5px solid;\n}\n\n.top-corner {\n  border-bottom-right-radius: var(--border-radius);\n}\n\n.bottom-corner {\n  border-top-right-radius: var(--border-radius);\n}\n\n.above-element {\n  border-top-right-radius: var(--border-radius);\n  border-top-left-radius: var(--border-radius);\n}\n\n.below-element {\n  border-bottom-right-radius: var(--border-radius);\n  border-bottom-left-radius: var(--border-radius);\n}\n\n.above-element-wider {\n  border-top-right-radius: var(--border-radius);\n  border-top-left-radius: var(--border-radius);\n  border-bottom-right-radius: var(--border-radius);\n}\n\n.below-element-wider {\n  border-bottom-right-radius: var(--border-radius);\n  border-bottom-left-radius: var(--border-radius);\n  border-top-right-radius: var(--border-radius);\n}\n\n.bottom-corner-wider {\n  border-top-right-radius: var(--border-radius);\n  border-bottom-right-radius: var(--border-radius);\n}\n\n.bottom-corner-taller {\n  border-top-right-radius: var(--border-radius);\n  border-top-left-radius: var(--border-radius);\n}\n\n.bottom-corner-wider-taller {\n  border-top-left-radius: var(--border-radius);\n  border-top-right-radius: var(--border-radius);\n  border-bottom-right-radius: var(--border-radius);\n}\n");class SourceOrderOverlay extends Overlay{reset(resetData){super.reset(resetData);this.sourceOrderContainer.textContent='';}
install(){this.document.body.classList.add('fill');const canvas=this.document.createElement('canvas');canvas.id='canvas';canvas.classList.add('fill');this.document.body.append(canvas);const sourceOrderContainer=this.document.createElement('div');sourceOrderContainer.id='source-order-container';this.document.body.append(sourceOrderContainer);this.sourceOrderContainer=sourceOrderContainer;this.setCanvas(canvas);super.install();}
uninstall(){this.document.body.classList.remove('fill');this.document.body.innerHTML='';super.uninstall();}
drawSourceOrder(highlight){const sourceOrder=highlight.sourceOrder||0;const path=highlight.paths.slice().pop();if(!path){throw new Error('No path provided');}
this.context.save();const bounds=emptyBounds();const outlineColor=path.outlineColor;this.context.save();_drawPath(this.context,path.path,outlineColor,!!sourceOrder,bounds,this.emulationScaleFactor);this.context.restore();this.context.save();if(!!sourceOrder){this._drawSourceOrderLabel(sourceOrder,outlineColor,bounds);}
this.context.restore();return{bounds:bounds};}
_drawSourceOrderLabel(sourceOrder,color,bounds){const sourceOrderContainer=this.sourceOrderContainer;const otherLabels=sourceOrderContainer.children;const labelContainer=createChild(sourceOrderContainer,'div','source-order-label-container');labelContainer.style.color=color;labelContainer.textContent=String(sourceOrder);const labelHeight=labelContainer.offsetHeight;const labelWidth=labelContainer.offsetWidth;const labelType=_getLabelType(bounds,labelHeight,labelWidth,otherLabels,this.canvasHeight);const labelPosition=_getPositionFromLabelType(labelType,bounds,labelHeight);labelContainer.classList.add(labelType);labelContainer.style.top=labelPosition.contentTop+'px';labelContainer.style.left=labelPosition.contentLeft+'px';}}
const MAX_CHILD_ELEMENTS_THRESHOLD=300;const LabelTypes={topCorner:'top-corner',aboveElement:'above-element',belowElement:'below-element',aboveElementWider:'above-element-wider',belowElementWider:'below-element-wider',bottomCornerWider:'bottom-corner-wider',bottomCornerTaller:'bottom-corner-taller',bottomCornerWiderTaller:'bottom-corner-wider-taller',};function _getPositionFromLabelType(positionType,bounds,labelHeight){let contentTop=0;switch(positionType){case LabelTypes.topCorner:contentTop=bounds.minY;break;case LabelTypes.aboveElement:case LabelTypes.aboveElementWider:contentTop=bounds.minY-labelHeight;break;case LabelTypes.belowElement:case LabelTypes.belowElementWider:contentTop=bounds.maxY;break;case LabelTypes.bottomCornerWider:case LabelTypes.bottomCornerTaller:case LabelTypes.bottomCornerWiderTaller:contentTop=bounds.maxY-labelHeight;break;}
return{contentTop,contentLeft:bounds.minX,};}
function _getLabelType(bounds,labelHeight,labelWidth,otherLabels,canvasHeight){let labelType;const widerThanElement=bounds.minX+labelWidth>bounds.maxX;const tallerThanElement=bounds.minY+labelHeight>bounds.maxY;if((!widerThanElement&&!tallerThanElement)||otherLabels.length>=MAX_CHILD_ELEMENTS_THRESHOLD){return LabelTypes.topCorner;}
let overlaps=false;for(let i=0;i<otherLabels.length;i++){const currentLabel=otherLabels[i];const rect=currentLabel.getBoundingClientRect();if(currentLabel.style.top===''&&currentLabel.style.left===''){continue;}
const topOverlaps=bounds.minY-labelHeight<=rect.top+rect.height&&bounds.minY-labelHeight>=rect.top;const bottomOverlaps=bounds.minY<=rect.top+rect.height&&bounds.minY>=rect.top;const leftOverlaps=bounds.minX>=rect.left&&bounds.minX<=rect.left+rect.width;const rightOverlaps=bounds.minX+labelWidth>=rect.left&&bounds.minX+labelWidth<=rect.left+rect.width;const sideOverlaps=leftOverlaps||rightOverlaps;if(sideOverlaps&&(topOverlaps||bottomOverlaps)){overlaps=true;break;}}
if(bounds.minY-labelHeight>0&&!overlaps){labelType=LabelTypes.aboveElement;if(widerThanElement){labelType=LabelTypes.aboveElementWider;}}
else if(bounds.maxY+labelHeight<canvasHeight){labelType=LabelTypes.belowElement;if(widerThanElement){labelType=LabelTypes.belowElementWider;}}
else{if(widerThanElement&&tallerThanElement){labelType=LabelTypes.bottomCornerWiderTaller;}
else if(widerThanElement){labelType=LabelTypes.bottomCornerWider;}
else{labelType=LabelTypes.bottomCornerTaller;}}
return labelType;}
function _drawPath(context,commands,outlineColor,isChild,bounds,emulationScaleFactor){context.save();const path=buildPath(commands,bounds,emulationScaleFactor);if(outlineColor){context.strokeStyle=outlineColor;context.lineWidth=2;if(!isChild){context.setLineDash([3,3]);}
context.stroke(path);}
context.restore();return path;}
const darkGridColor$1='rgba(0,0,0,0.7)';const gridBackgroundColor$1='rgba(255, 255, 255, 0.8)';class ViewportSizeOverlay extends Overlay{install(){this.document.body.classList.add('fill');const canvas=this.document.createElement('canvas');canvas.id='canvas';canvas.classList.add('fill');this.document.body.append(canvas);this.setCanvas(canvas);super.install();}
uninstall(){this.document.body.classList.remove('fill');this.document.body.innerHTML='';super.uninstall();}
drawViewSize(){const viewportSize=this.viewportSize;const text=`${viewportSize.width}px \u00D7 ${viewportSize.height}px`;const canvasWidth=this.canvasWidth||0;this.context.save();this.context.font=`14px ${this.window.getComputedStyle(document.body).fontFamily}`;const textWidth=this.context.measureText(text).width;this.context.fillStyle=gridBackgroundColor$1;this.context.fillRect(canvasWidth-textWidth-12,0,canvasWidth,25);this.context.fillStyle=darkGridColor$1;this.context.fillText(text,canvasWidth-textWidth-6,18);this.context.restore();}}
adoptStyleSheet(style);const gridStyleSheet=new CSSStyleSheet();gridStyleSheet.replaceSync(gridStyle);const highlightOverlay=new HighlightOverlay(window,[style$2,gridStyleSheet]);const highlightGridOverlay=new HighlightGridOverlay(window,[style$1,gridStyleSheet]);const distancesOverlay=new DistancesOverlay(window);const pausedOverlay=new PausedOverlay(window,style$3);const screenshotOverlay=new ScreenshotOverlay(window,style$4);const sourceOrderOverlay=new SourceOrderOverlay(window,style$5);const viewportSizeOverlay=new ViewportSizeOverlay(window);let currentOverlay;let platformName;const overlays={distances:distancesOverlay,highlight:highlightOverlay,highlightGrid:highlightGridOverlay,paused:pausedOverlay,screenshot:screenshotOverlay,sourceOrder:sourceOrderOverlay,viewportSize:viewportSizeOverlay,};window.dispatch=message=>{const functionName=message[0];if(functionName==='setOverlay'){const overlayName=message[1];if(currentOverlay){currentOverlay.uninstall();}
currentOverlay=overlays[overlayName];currentOverlay.setPlatform(platformName);if(!currentOverlay.installed){currentOverlay.install();}}
else if(functionName==='setPlatform'){platformName=message[1];}
else{currentOverlay.dispatch(message);}};}());