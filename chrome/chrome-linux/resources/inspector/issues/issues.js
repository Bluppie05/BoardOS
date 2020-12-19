import{IssuesManager as e}from"../browser_sdk/browser_sdk.js";import{ObjectWrapper as t,ls as s,EventTarget as n,Revealer as i,Linkifier as a,Settings as o}from"../common/common.js";import{Issue as r,ContentSecurityPolicyIssue as d,NetworkLog as c,FrameManager as l,OverlayModel as u,SDKModel as h,DOMModel as p,MixedContentIssue as f}from"../sdk/sdk.js";import{ViewManager as m,TreeOutline as g,Tooltip as _,UIUtils as C,Fragment as y,Widget as v,Toolbar as k}from"../ui/ui.js";import{Linkifier as w}from"../components/components.js";import{Icon as I,ElementsPanelLink as E,Adorner as R}from"../elements/elements.js";import{userMetrics as x,InspectorFrontendHost as L}from"../host/host.js";import{NetworkPanel as S,NetworkItemView as T}from"../network/network.js";import{html as b,render as A}from"../third_party/lit-html/lit-html.js";import{Marked as M}from"../marked/marked.js";import{Runtime as D}from"../root/root.js";class q extends r.Issue{constructor(e){super(e),this._cookies=new Map,this._requests=new Map,this._representative=null,this._mixedContents=new Map,this._heavyAdIssueDetails=new Map,this._cspIssues=new Set,this._blockedByResponseDetails=new Map,this._aggregatedIssuesCount=0}primaryKey(){throw new Error("This should never be called")}blockedByResponseDetails(){return this._blockedByResponseDetails.values()}cookies(){return Array.from(this._cookies.values()).map(e=>e.cookie)}cookiesWithRequestIndicator(){return this._cookies.values()}heavyAds(){return this._heavyAdIssueDetails.values()}mixedContents(){return this._mixedContents.values()}cspIssues(){return this._cspIssues}requests(){return this._requests.values()}getDescription(){return this._representative?this._representative.getDescription():null}getCategory(){return this._representative?this._representative.getCategory():r.IssueCategory.Other}getAggregatedIssuesCount(){return this._aggregatedIssuesCount}_keyForCookie(e){const{domain:t,path:s,name:n}=e;return`${t};${s};${n}`}addInstance(e){this._aggregatedIssuesCount++,this._representative||(this._representative=e);let t=!1;for(const s of e.requests())t=!0,this._requests.has(s.requestId)||this._requests.set(s.requestId,s);for(const s of e.cookies()){const e=this._keyForCookie(s);this._cookies.has(e)||this._cookies.set(e,{cookie:s,hasRequest:t})}for(const t of e.mixedContents()){const e=JSON.stringify(t);this._mixedContents.set(e,t)}for(const t of e.heavyAds()){const e=JSON.stringify(t);this._heavyAdIssueDetails.set(e,t)}for(const t of e.blockedByResponseDetails()){const e=JSON.stringify(t,["parentFrame","blockedFrame","requestId","frameId","reason","request"]);this._blockedByResponseDetails.set(e,t)}e instanceof d.ContentSecurityPolicyIssue&&this._cspIssues.add(e)}}class F extends t.ObjectWrapper{constructor(t){super(),this._aggregatedIssuesByCode=new Map,this._issuesManager=t,this._issuesManager.addEventListener(e.Events.IssueAdded,this._onIssueAdded,this),this._issuesManager.addEventListener(e.Events.FullUpdateRequired,this._onFullUpdateRequired,this);for(const e of this._issuesManager.issues())this._aggregateIssue(e)}_onIssueAdded(e){const{issue:t}=e.data;this._aggregateIssue(t)}_onFullUpdateRequired(){this._aggregatedIssuesByCode.clear();for(const e of this._issuesManager.issues())this._aggregateIssue(e);this.dispatchEventToListeners(O.FullUpdateRequired)}_aggregateIssue(e){let t=this._aggregatedIssuesByCode.get(e.code());return t||(t=new q(e.code()),this._aggregatedIssuesByCode.set(e.code(),t)),t.addInstance(e),this.dispatchEventToListeners(O.AggregatedIssueUpdated,t),t}aggregatedIssues(){return this._aggregatedIssuesByCode.values()}numberOfAggregatedIssues(){return this._aggregatedIssuesByCode.size}}const O={AggregatedIssueUpdated:Symbol("AggregatedIssueUpdated"),FullUpdateRequired:Symbol("FullUpdateRequired")};var N=Object.freeze({__proto__:null,AggregatedIssue:q,IssueAggregator:F,Events:O});var V=Object.freeze({__proto__:null,IssueRevealer:class{async reveal(e){if(!(e instanceof r.Issue))throw new Error("Internal error: not a issue");await m.ViewManager.instance().showView("issues-pane");const t=m.ViewManager.instance().view("issues-pane");if(t){(await t.widget()).revealByCode(e.code())}}}});const P=s;var B;!function(e){e[e.Checking=0]="Checking",e[e.ShowLink=1]="ShowLink",e[e.Sending=2]="Sending",e[e.SurveyShown=3]="SurveyShown",e[e.Failed=4]="Failed",e[e.DontShowLink=5]="DontShowLink"}(B||(B={}));class U extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.trigger="",this.canShowSurvey=()=>{},this.showSurvey=()=>{},this.state=B.Checking}set data(e){this.trigger=e.trigger,this.canShowSurvey=e.canShowSurvey,this.showSurvey=e.showSurvey,this.checkSurvey()}checkSurvey(){this.state=B.Checking,this.canShowSurvey(this.trigger,({canShowSurvey:e})=>{this.state=e?B.ShowLink:B.DontShowLink,this.render()})}sendSurvey(){this.state=B.Sending,this.render(),this.showSurvey(this.trigger,({surveyShown:e})=>{this.state=e?B.SurveyShown:B.Failed,this.render()})}render(){if(this.state===B.Checking||this.state===B.DontShowLink)return;let e=P`Is this issue message helpful to you?`;this.state===B.Sending?e=P`Opening survey …`:this.state===B.SurveyShown?e=P`Thank you for your feedback`:this.state===B.Failed&&(e=P`An error occurred with the survey`);let t="";this.state===B.Sending?t="pending-link":this.state!==B.Failed&&this.state!==B.SurveyShown||(t="disabled-link");const s=b`
      <style>
        .link-icon {
          width: 28px;
          height: 24px;
          text-align: center;
          vertical-align: sub;
        }
        .link {
          padding-top: 4px;
          text-decoration: underline;
          cursor: pointer;
          font-size: 14px;
          color: var(--issue-link);
        }
        .pending-link {
          opacity: 75%;
          pointer-events: none;
          cursor: default;
          text-decoration: none;
        }
        .disabled-link {
          pointer-events: none;
          cursor: default;
          text-decoration: none;
        }
      </style>
      <a class="link ${t}" @click=${this.sendSurvey}>
        <devtools-icon class="link-icon" .data=${{iconName:"feedback_thin_16x16_icon",color:"var(--issue-link)",width:"16px",height:"16px"}}></devtools-icon><!--
      -->${e}
      </a>
    `;A(s,this.shadow,{eventContext:this})}}customElements.define("devtools-issue-survey-link",U);const H=b,$=A;class j extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.tokenData=[]}set data(e){this.tokenData=e.tokens,this.update()}update(){this.render()}render(){$(H`
      <style>
      .message {
        line-height: 20px;
        font-size: 14px;
        color: var(--issue-gray);
        margin-bottom: 4px;
        user-select: text;
      }

      .message p {
        margin-bottom: 16px;
        margin-block-start: 2px;
      }

      .message ul {
        list-style-type: none;
        list-style-position: inside;
        padding-inline-start: 0;
      }

      .message li {
        margin-top: 8px;
        display: list-item;
      }

      .message li::before {
        content: "→";
        -webkit-mask-image: none;
        padding-right: 5px;
        position: relative;
        top: -1px;
      }

      .message code {
        color: var(--issue-black);
        font-size: 12px;
        user-select: text;
        cursor: text;
        background: var(--issue-code);
      }
      </style>
      <div class='message'>
        ${this.tokenData.map(G)}
      </div>
    `,this.shadow)}}customElements.define("devtools-markdown-view",j);const z=e=>e.tokens.map(G),W=e=>{const t=new Map([["&amp;","&"],["&lt;","<"],["&gt;",">"],["&quot;",'"'],["&#39;","'"]]);return e.replace(/&(amp|lt|gt|quot|#39);/g,e=>{const s=t.get(e);return s||e})},K=new Map([["paragraph",e=>H`<p>${z(e)}</p>`],["list",e=>H`<ul>${e.items.map(G)}</ul>`],["list_item",e=>H`<li>${z(e)}</li>`],["text",e=>e.tokens&&e.tokens.length>0?H`${z(e)}`:H`${W(e.text)}`],["codespan",e=>H`<code>${W(e.text)}</code>`],["space",()=>H``]]),G=e=>{const t=K.get(e.type);if(!t)throw new Error(`Markdown token type '${e.type}' not supported.`);return t(e)};function J(e){return function(e,t){const s=M.lexer(e),n=function(e){if(0===e.length||"heading"!==e[0].type||1!==e[0].depth)return null;return e[0].text}(s);if(!n)throw new Error("Markdown issue descriptions must start with a heading");const i=new j;return i.data={tokens:s.slice(1)},{title:n,message:()=>i,issueKind:r.IssueKind.BreakingChange,links:t.links}}(function(e){const t=D.cachedResources.get(e);if(!t)throw new Error(`Markdown file ${e} not found. Declare it as a resource in the module.json file`);return t}(e.file),e)}const Q="Cookie",X="Element",Y="LearnMore",Z="Request",ee=e=>(/[^/]+$/.exec(e)||/[^/]+\/$/.exec(e)||[""])[0];class te extends g.TreeElement{constructor(e,t){super(),this.toggleOnClick=!0,this._parent=e,this._resourceName=t,this._affectedResourcesCountElement=this.createAffectedResourcesCounter(),this._affectedResources=this.createAffectedResources(),this._affectedResourcesCount=0,this._networkListener=null,this._frameListeners=[],this._unresolvedRequestIds=new Set,this._unresolvedFrameIds=new Set}createAffectedResourcesCounter(){const e=document.createElement("div");return e.classList.add("affected-resource-label"),this.listItemElement.appendChild(e),e}createAffectedResources(){const e=new g.TreeElement,t=document.createElement("table");return t.classList.add("affected-resource-list"),e.listItemElement.appendChild(t),this.appendChild(e),t}getResourceName(e){return 1===e?this._resourceName.singular:this._resourceName.plural}updateAffectedResourceCount(e){this._affectedResourcesCount=e,this._affectedResourcesCountElement.textContent=`${e} ${this.getResourceName(e)}`,this.hidden=0===this._affectedResourcesCount,this._parent.updateAffectedResourceVisibility()}isEmpty(){return 0===this._affectedResourcesCount}clear(){this._affectedResources.textContent=""}expandIfOneResource(){1===this._affectedResourcesCount&&this.expand()}_resolveRequestId(e){const t=c.NetworkLog.instance().requestsForId(e);return t.length||(this._unresolvedRequestIds.add(e),this._networkListener||(this._networkListener=c.NetworkLog.instance().addEventListener(c.Events.RequestAdded,this._onRequestAdded,this))),t}_onRequestAdded(e){const t=e.data,s=this._unresolvedRequestIds.delete(t.requestId());0===this._unresolvedRequestIds.size&&this._networkListener&&(n.EventTarget.removeEventListeners([this._networkListener]),this._networkListener=null),s&&this.update()}_resolveFrameId(e){const t=l.FrameManager.instance().getFrame(e);if(!(t&&t.url||(this._unresolvedFrameIds.add(e),this._frameListeners.length))){const e=l.FrameManager.instance().addEventListener(l.Events.FrameAddedToTarget,this._onFrameChanged,this),t=l.FrameManager.instance().addEventListener(l.Events.FrameNavigated,this._onFrameChanged,this);this._frameListeners=[e,t]}return t}_onFrameChanged(e){const t=e.data.frame;if(!t.url)return;const s=this._unresolvedFrameIds.delete(t.id);0===this._unresolvedFrameIds.size&&this._frameListeners.length&&(n.EventTarget.removeEventListeners(this._frameListeners),this._frameListeners=[]),s&&this.update()}_createFrameCell(e,t){const s=this._resolveFrameId(e),n=s&&(s.unreachableUrl()||s.url)||ls`unknown`,a=document.createElement("td");if(a.classList.add("affected-resource-cell"),s){const s=I.createIcon();s.data={iconName:"elements_panel_icon",color:"var(--issue-link)",width:"16px",height:"16px"},s.classList.add("link","elements-panel"),s.onclick=async()=>{x.issuesPanelResourceOpened(t.getCategory(),X);const s=l.FrameManager.instance().getFrame(e);if(s){const e=await s.getOwnerDOMNodeOrDocument();e&&i.reveal(e)}},_.Tooltip.install(s,ls`Click to reveal the frame's DOM node in the Elements panel`),a.appendChild(s)}return a.appendChild(document.createTextNode(n)),a.onmouseenter=()=>{const t=l.FrameManager.instance().getFrame(e);t&&t.highlight()},a.onmouseleave=()=>u.OverlayModel.hideDOMNodeHighlight(),a}_createRequestCell(e){let t=e.url,s=t?ee(t):"";const n=document.createElement("td");n.classList.add("affected-resource-cell");const i=I.createIcon();i.data={iconName:"network_panel_icon",color:"var(--issue-link)",width:"16px",height:"16px"},i.classList.add("network-panel"),n.appendChild(i);const a=this._resolveRequestId(e.requestId);if(a.length){const e=a[0];n.onclick=()=>{S.NetworkPanel.selectAndShowRequest(e,T.Tabs.Headers)},n.classList.add("link"),i.classList.add("link"),t=e.url(),s=ee(t),i.title=ls`Click to show request in the network panel`}else i.title=ls`Request unavailable in the network panel, try reloading the inspected page`,i.classList.add("unavailable");return t&&(n.title=t),n.appendChild(document.createTextNode(s)),n}update(){throw new Error("This should never be called, did you forget to override?")}}class se extends te{constructor(e,t){super(e,{singular:ls`element`,plural:ls`elements`}),this._issue=t}_sendTelemetry(){x.issuesPanelResourceOpened(this._issue.getCategory(),X)}async _appendAffectedElements(e){let t=0;for(const s of e)await this._appendAffectedElement(s),t++;this.updateAffectedResourceCount(t)}async _appendAffectedElement({backendNodeId:e,nodeName:t}){const s=h.TargetManager.instance().mainTarget(),n=new p.DeferredDOMNode(s,e),i=await a.Linkifier.linkify(n);i.textContent=t,i.addEventListener("click",this._sendTelemetry),i.addEventListener("keydown",e=>{isEnterKey(e)&&this._sendTelemetry()});const o=document.createElement("td");o.classList.add("affected-resource-element","devtools-link"),o.appendChild(i);const r=document.createElement("tr");r.appendChild(o),this._affectedResources.appendChild(r)}update(){this.clear(),this._appendAffectedElements(this._issue.elements())}}class ne extends te{constructor(e,t){super(e,{singular:ls`directive`,plural:ls`directives`}),this._issue=t}_appendDirectiveColumnTitle(e){const t=document.createElement("td");t.classList.add("affected-resource-header"),t.textContent=ls`Directive`,e.appendChild(t)}_appendURLColumnTitle(e){const t=document.createElement("td");t.classList.add("affected-resource-header"),t.classList.add("affected-resource-directive-info-header"),t.textContent=ls`Resource`,e.appendChild(t)}_appendElementColumnTitle(e){const t=document.createElement("td");t.classList.add("affected-resource-header"),t.textContent=ls`Element`,e.appendChild(t)}_appendSourceCodeColumnTitle(e){const t=document.createElement("td");t.classList.add("affected-resource-header"),t.textContent=ls`Source code`,e.appendChild(t)}_appendStatusColumnTitle(e){const t=document.createElement("td");t.classList.add("affected-resource-header"),t.textContent=ls`Status`,e.appendChild(t)}_appendStatus(e,t){const s=document.createElement("td");t?(s.classList.add("affected-resource-report-only-status"),s.textContent=ls`report-only`):(s.classList.add("affected-resource-blocked-status"),s.textContent=ls`blocked`),e.appendChild(s)}_appendViolatedDirective(e,t){const s=document.createElement("td");s.textContent=t,e.appendChild(s)}_appendBlockedURL(e,t){const s=document.createElement("td");s.classList.add("affected-resource-directive-info"),s.textContent=t,e.appendChild(s)}_appendBlockedElement(e,t,s){const n=E.createElementsPanelLink();if(t){const e=t;_.Tooltip.install(n,ls`Click to reveal the violating DOM node in the Elements panel`);const a=()=>{const t=s.getTargetIfNotDisposed();if(t){x.issuesPanelResourceOpened(this._issue.getCategory(),X);const s=new p.DeferredDOMNode(t,e);i.reveal(s)}},o=()=>{const t=s.getTargetIfNotDisposed();if(t){const s=new p.DeferredDOMNode(t,e);s&&s.highlight()}},r=()=>{u.OverlayModel.hideDOMNodeHighlight()};n.data={onElementRevealIconClick:a,onElementRevealIconMouseEnter:o,onElementRevealIconMouseLeave:r}}const a=document.createElement("td");a.classList.add("affected-resource-csp-info-node"),a.appendChild(n),e.appendChild(a)}_appendSourceLocation(e,t){const s=document.createElement("td");if(s.classList.add("affected-source-location"),t){const e=40,n=new w.Linkifier(e).linkifyScriptLocation(null,null,t.url,t.lineNumber);s.appendChild(n)}e.appendChild(s)}_appendAffectedContentSecurityPolicyDetails(e){const t=document.createElement("tr");if(this._issue.code()===d.inlineViolationCode)this._appendDirectiveColumnTitle(t),this._appendElementColumnTitle(t),this._appendSourceCodeColumnTitle(t),this._appendStatusColumnTitle(t);else if(this._issue.code()===d.urlViolationCode)this._appendURLColumnTitle(t),this._appendStatusColumnTitle(t),this._appendDirectiveColumnTitle(t),this._appendSourceCodeColumnTitle(t);else if(this._issue.code()===d.evalViolationCode)this._appendSourceCodeColumnTitle(t),this._appendDirectiveColumnTitle(t),this._appendStatusColumnTitle(t);else if(this._issue.code()===d.trustedTypesSinkViolationCode)this._appendSourceCodeColumnTitle(t),this._appendStatusColumnTitle(t);else{if(this._issue.code()!==d.trustedTypesPolicyViolationCode)return void this.updateAffectedResourceCount(0);this._appendSourceCodeColumnTitle(t),this._appendDirectiveColumnTitle(t),this._appendStatusColumnTitle(t)}this._affectedResources.appendChild(t);let s=0;for(const t of e)s++,this._appendAffectedContentSecurityPolicyDetail(t);this.updateAffectedResourceCount(s)}_appendAffectedContentSecurityPolicyDetail(e){const t=document.createElement("tr");t.classList.add("affected-resource-directive");const s=e.details();if(this._issue.code()===d.inlineViolationCode)this._appendViolatedDirective(t,s.violatedDirective),this._appendBlockedElement(t,s.violatingNodeId,e.model()),this._appendSourceLocation(t,s.sourceCodeLocation),this._appendStatus(t,s.isReportOnly);else if(this._issue.code()===d.urlViolationCode){const e=s.blockedURL?s.blockedURL:"";this._appendBlockedURL(t,e),this._appendStatus(t,s.isReportOnly),this._appendViolatedDirective(t,s.violatedDirective),this._appendSourceLocation(t,s.sourceCodeLocation)}else if(this._issue.code()===d.evalViolationCode)this._appendSourceLocation(t,s.sourceCodeLocation),this._appendViolatedDirective(t,s.violatedDirective),this._appendStatus(t,s.isReportOnly);else if(this._issue.code()===d.trustedTypesSinkViolationCode)this._appendSourceLocation(t,s.sourceCodeLocation),this._appendStatus(t,s.isReportOnly);else{if(this._issue.code()!==d.trustedTypesPolicyViolationCode)return;this._appendSourceLocation(t,s.sourceCodeLocation),this._appendViolatedDirective(t,s.violatedDirective),this._appendStatus(t,s.isReportOnly)}this._affectedResources.appendChild(t)}update(){this.clear(),this._appendAffectedContentSecurityPolicyDetails(this._issue.cspIssues())}}class ie extends te{constructor(e,t){super(e,{singular:ls`cookie`,plural:ls`cookies`}),this._issue=t}_appendAffectedCookies(e){const t=document.createElement("tr"),s=document.createElement("td");s.classList.add("affected-resource-header"),s.textContent="Name",t.appendChild(s);const n=document.createElement("td");n.classList.add("affected-resource-header"),n.classList.add("affected-resource-cookie-info-header"),n.textContent=ls`Domain`+" & "+ls`Path`,t.appendChild(n),this._affectedResources.appendChild(t);let i=0;for(const t of e)i++,this.appendAffectedCookie(t.cookie,t.hasRequest);this.updateAffectedResourceCount(i)}appendAffectedCookie(e,t){const s=document.createElement("tr");s.classList.add("affected-resource-cookie");const n=document.createElement("td");t?n.appendChild(C.createTextButton(e.name,()=>{x.issuesPanelResourceOpened(this._issue.getCategory(),Q),S.NetworkPanel.revealAndFilter([{filterType:"cookie-domain",filterValue:e.domain},{filterType:"cookie-name",filterValue:e.name},{filterType:"cookie-path",filterValue:e.path}])},"link-style devtools-link")):n.textContent=e.name;const i=document.createElement("td");i.classList.add("affected-resource-cookie-info"),i.textContent=`${e.domain}${e.path}`,s.appendChild(n),s.appendChild(i),this._affectedResources.appendChild(s)}update(){this.clear(),this._appendAffectedCookies(this._issue.cookiesWithRequestIndicator())}}class ae extends te{constructor(e,t){super(e,{singular:ls`request`,plural:ls`requests`}),this._issue=t}_appendAffectedRequests(e){let t=0;for(const s of e)for(const e of this._resolveRequestId(s.requestId))t++,this._appendNetworkRequest(e);this.updateAffectedResourceCount(t)}_appendNetworkRequest(e){const t=e.name().trimMiddle(100),s=document.createElement("td"),n=re.get(this._issue.getCategory())||T.Tabs.Headers;s.appendChild(C.createTextButton(t,()=>{x.issuesPanelResourceOpened(this._issue.getCategory(),Z),S.NetworkPanel.selectAndShowRequest(e,n)},"link-style devtools-link"));const i=document.createElement("tr");i.classList.add("affected-resource-request"),i.appendChild(s),this._affectedResources.appendChild(i)}update(){this.clear();for(const e of this._issue.blockedByResponseDetails())return void this.updateAffectedResourceCount(0);this._appendAffectedRequests(this._issue.requests())}}class oe extends te{constructor(e,t){super(e,{singular:ls`source`,plural:ls`sources`}),this._issue=t}_appendAffectedSources(e){let t=0;for(const s of e)this._appendAffectedSource(s),t++;this.updateAffectedResourceCount(t)}_appendAffectedSource({url:e,lineNumber:t,columnNumber:s}){const n=document.createElement("td"),i={columnNumber:s,lineNumber:t,tabStop:!0},a=w.Linkifier.linkifyURL(e,i);n.appendChild(a);const o=document.createElement("tr");o.classList.add("affected-resource-source"),o.appendChild(n),this._affectedResources.appendChild(o)}update(){this.clear(),this._appendAffectedSources(this._issue.sources())}}const re=new Map([[r.IssueCategory.SameSiteCookie,T.Tabs.Cookies],[r.IssueCategory.CrossOriginEmbedderPolicy,T.Tabs.Headers],[r.IssueCategory.MixedContent,T.Tabs.Headers]]);class de extends te{constructor(e,t){super(e,{singular:ls`resource`,plural:ls`resources`}),this._issue=t}_appendAffectedMixedContents(e){const t=document.createElement("tr"),s=document.createElement("td");s.classList.add("affected-resource-header"),s.textContent=ls`Name`,t.appendChild(s);const n=document.createElement("td");n.classList.add("affected-resource-header"),n.textContent=ls`Restriction Status`,t.appendChild(n),this._affectedResources.appendChild(t);let i=0;for(const t of e)t.request?this._resolveRequestId(t.request.requestId).forEach(e=>{this.appendAffectedMixedContent(t,e),i++}):(this.appendAffectedMixedContent(t),i++);this.updateAffectedResourceCount(i)}appendAffectedMixedContent(e,t=null){const s=document.createElement("tr");s.classList.add("affected-resource-mixed-content");const n=ee(e.insecureURL),i=document.createElement("td");if(t){const e=t,s=re.get(this._issue.getCategory())||T.Tabs.Headers;i.appendChild(C.createTextButton(n,()=>{x.issuesPanelResourceOpened(this._issue.getCategory(),Z),S.NetworkPanel.selectAndShowRequest(e,s)},"link-style devtools-link"))}else i.classList.add("affected-resource-mixed-content-info"),i.textContent=n;_.Tooltip.install(i,e.insecureURL),s.appendChild(i);const a=document.createElement("td");a.classList.add("affected-resource-mixed-content-info"),a.textContent=f.MixedContentIssue.translateStatus(e.resolutionStatus),s.appendChild(a),this._affectedResources.appendChild(s)}update(){this.clear(),this._appendAffectedMixedContents(this._issue.mixedContents())}}class ce extends te{constructor(e,t){super(e,{singular:ls`resource`,plural:ls`resources`}),this._issue=t}_appendAffectedHeavyAds(e){const t=document.createElement("tr"),s=document.createElement("td");s.classList.add("affected-resource-header"),s.textContent=ls`Limit exceeded`,t.appendChild(s);const n=document.createElement("td");n.classList.add("affected-resource-header"),n.textContent=ls`Resolution Status`,t.appendChild(n);const i=document.createElement("td");i.classList.add("affected-resource-header"),i.textContent=ls`Frame URL`,t.appendChild(i),this._affectedResources.appendChild(t);let a=0;for(const t of e)this._appendAffectedHeavyAd(t),a++;this.updateAffectedResourceCount(a)}_statusToString(e){switch(e){case Protocol.Audits.HeavyAdResolutionStatus.HeavyAdBlocked:return ls`Removed`;case Protocol.Audits.HeavyAdResolutionStatus.HeavyAdWarning:return ls`Warned`}return""}_limitToString(e){switch(e){case Protocol.Audits.HeavyAdReason.CpuPeakLimit:return ls`CPU peak limit`;case Protocol.Audits.HeavyAdReason.CpuTotalLimit:return ls`CPU total limit`;case Protocol.Audits.HeavyAdReason.NetworkTotalLimit:return ls`Network limit`}return""}_appendAffectedHeavyAd(e){const t=document.createElement("tr");t.classList.add("affected-resource-heavy-ad");const s=document.createElement("td");s.classList.add("affected-resource-heavy-ad-info"),s.textContent=this._limitToString(e.reason),t.appendChild(s);const n=document.createElement("td");n.classList.add("affected-resource-heavy-ad-info"),n.textContent=this._statusToString(e.resolution),t.appendChild(n);const i=e.frame.frameId,a=this._createFrameCell(i,this._issue);t.appendChild(a),this._affectedResources.appendChild(t)}update(){this.clear(),this._appendAffectedHeavyAds(this._issue.heavyAds())}}class le extends te{constructor(e,t){super(e,{singular:ls`request`,plural:ls`requests`}),this._issue=t}_appendDetails(e){const t=document.createElement("tr"),s=document.createElement("td");s.classList.add("affected-resource-header"),s.textContent=ls`Request`,t.appendChild(s);const n=document.createElement("td");n.classList.add("affected-resource-header"),n.textContent=ls`Parent Frame`,t.appendChild(n);const i=document.createElement("td");i.classList.add("affected-resource-header"),i.textContent=ls`Blocked Resource`,t.appendChild(i),this._affectedResources.appendChild(t);let a=0;for(const t of e)this._appendDetail(t),a++;this.updateAffectedResourceCount(a)}_appendDetail(e){const t=document.createElement("tr");t.classList.add("affected-resource-row");const s=this._createRequestCell(e.request);if(t.appendChild(s),e.parentFrame){const s=this._createFrameCell(e.parentFrame.frameId,this._issue);t.appendChild(s)}else t.appendChild(document.createElement("td"));if(e.blockedFrame){const s=this._createFrameCell(e.blockedFrame.frameId,this._issue);t.appendChild(s)}else t.appendChild(document.createElement("td"));this._affectedResources.appendChild(t)}update(){this.clear(),this._appendDetails(this._issue.blockedByResponseDetails())}}const ue=new Map([[r.IssueCategory.CrossOriginEmbedderPolicy,ls`Cross Origin Embedder Policy`],[r.IssueCategory.MixedContent,ls`Mixed Content`],[r.IssueCategory.SameSiteCookie,ls`SameSite Cookie`],[r.IssueCategory.HeavyAd,ls`Heavy Ads`],[r.IssueCategory.ContentSecurityPolicy,ls`Content Security Policy`],[r.IssueCategory.Other,ls`Other`]]);class he extends g.TreeElement{constructor(e){super(),this._category=e,this._issues=[],this.toggleOnClick=!0,this.listItemElement.classList.add("issue-category")}getCategoryName(){return ue.get(this._category)||ls`Other`}onattach(){this._appendHeader()}_appendHeader(){const e=document.createElement("div");e.classList.add("header");const t=document.createElement("div");t.classList.add("title"),t.textContent=this.getCategoryName(),e.appendChild(t),this.listItemElement.appendChild(e)}}const pe=new Map([[r.IssueCategory.CrossOriginEmbedderPolicy,null],[r.IssueCategory.MixedContent,null],[r.IssueCategory.SameSiteCookie,null],[r.IssueCategory.HeavyAd,null],[r.IssueCategory.ContentSecurityPolicy,null],[r.IssueCategory.Other,null]]);class fe extends g.TreeElement{constructor(e,t,s){super(),this._parent=e,this._issue=t,this._description=s,this.toggleOnClick=!0,this.listItemElement.classList.add("issue"),this.childrenListElement.classList.add("body"),this._affectedResources=this._createAffectedResources(),this._affectedResourceViews=[new ie(this,this._issue),new se(this,this._issue),new ae(this,this._issue),new de(this,this._issue),new oe(this,this._issue),new ce(this,this._issue),new ne(this,this._issue),new le(this,this._issue)],this._aggregatedIssuesCount=null,this._hasBeenExpandedBefore=!1}getIssueTitle(){return this._description.title}onattach(){this._appendHeader(),this._createBody(),this.appendChild(this._affectedResources);for(const e of this._affectedResourceViews)this.appendAffectedResource(e),e.update();this._createReadMoreLinks(),this.updateAffectedResourceVisibility()}appendAffectedResource(e){this._affectedResources.appendChild(e)}_appendHeader(){const e=document.createElement("div");e.classList.add("header");const t=I.createIcon();t.data={iconName:"breaking_change_icon",color:"",width:"16px",height:"16px"},t.classList.add("breaking-change"),this._aggregatedIssuesCount=document.createElement("span");const s=R.Adorner.create(this._aggregatedIssuesCount,"countWrapper");s.classList.add("aggregated-issues-count"),this._aggregatedIssuesCount.textContent=""+this._issue.getAggregatedIssuesCount(),e.appendChild(t),e.appendChild(s);const n=document.createElement("div");n.classList.add("title"),n.textContent=this._description.title,e.appendChild(n),this.listItemElement.appendChild(e)}onexpand(){const e=this._issue.getCategory().description;if(x.issuesPanelIssueExpanded(e),!this._hasBeenExpandedBefore){this._hasBeenExpandedBefore=!0;for(const e of this._affectedResourceViews)e.expandIfOneResource()}}_updateAggregatedIssuesCount(){this._aggregatedIssuesCount&&(this._aggregatedIssuesCount.textContent=""+this._issue.getAggregatedIssuesCount())}updateAffectedResourceVisibility(){const e=this._affectedResourceViews.every(e=>e.isEmpty());this._affectedResources.hidden=e}_createAffectedResources(){const e=new g.TreeElement;return e.setCollapsible(!1),e.setExpandable(!0),e.expand(),e.selectable=!1,e.listItemElement.classList.add("affected-resources-label"),e.listItemElement.textContent=ls`Affected Resources`,e.childrenListElement.classList.add("affected-resources"),e}_createBody(){const e=new g.TreeElement;e.setCollapsible(!1),e.selectable=!1;const t=this._description.message();e.listItemElement.appendChild(t),this.appendChild(e)}_createReadMoreLinks(){const e=new g.TreeElement;e.setCollapsible(!1),e.listItemElement.classList.add("link-wrapper");const t=e.listItemElement.createChild("ul","link-list");for(const e of this._description.links){const s=y.html`<a class="link devtools-link" role="link" tabindex="0" href=${e.link}>${ls`Learn more: ${e.linkTitle}`}</a>`,n=I.createIcon();n.data={iconName:"link_icon",color:"var(--issue-link)",width:"16px",height:"16px"},n.classList.add("link-icon"),s.prepend(n),self.onInvokeElement(s,t=>{x.issuesPanelResourceOpened(this._issue.getCategory(),Y);const s=h.TargetManager.instance().mainTarget();s&&s.targetAgent().invoke_createTarget({url:e.link}),t.consume(!0)});t.createChild("li").appendChild(s)}this.appendChild(e);const s=pe.get(this._issue.getCategory());if(s){const e=new U;e.data={trigger:s,canShowSurvey:L.InspectorFrontendHostInstance.canShowSurvey,showSurvey:L.InspectorFrontendHostInstance.showSurvey},t.createChild("li").appendChild(e)}}update(){this._affectedResourceViews.forEach(e=>e.update()),this.updateAffectedResourceVisibility(),this._updateAggregatedIssuesCount()}toggle(e){e||void 0===e&&!this.expanded?this.expand():this.collapse()}}function me(){return o.Settings.instance().createSetting("groupIssuesByCategory",!1)}class ge extends v.VBox{constructor(){super(!0),this.registerRequiredCSS("issues/issuesPane.css",{enableLegacyPatching:!0}),this.contentElement.classList.add("issues-pane"),this._categoryViews=new Map,this._issueViews=new Map,this._showThirdPartyCheckbox=null;const{toolbarContainer:t,updateToolbarIssuesCount:s}=this._createToolbars();this._issuesToolbarContainer=t,this._updateToolbarIssuesCount=s,this._issuesTree=new g.TreeOutlineInShadow,this._issuesTree.registerRequiredCSS("issues/issuesTree.css",{enableLegacyPatching:!0}),this._issuesTree.setShowSelectionOnKeyboardFocus(!0),this._issuesTree.contentElement.classList.add("issues"),this.contentElement.appendChild(this._issuesTree.element),this._noIssuesMessageDiv=document.createElement("div"),this._noIssuesMessageDiv.classList.add("issues-pane-no-issues"),this.contentElement.appendChild(this._noIssuesMessageDiv),this._issuesManager=e.IssuesManager.instance(),this._aggregator=new F(this._issuesManager),this._aggregator.addEventListener(O.AggregatedIssueUpdated,this._issueUpdated,this),this._aggregator.addEventListener(O.FullUpdateRequired,this._fullUpdate,this);for(const e of this._aggregator.aggregatedIssues())this._updateIssueView(e);this._issuesManager.addEventListener(e.Events.IssuesCountUpdated,this._updateCounts,this),this._updateCounts()}elementsToRestoreScrollPositionsFor(){return[this._issuesTree.element]}_createToolbars(){const e=this.contentElement.createChild("div","issues-toolbar-container");new k.Toolbar("issues-toolbar-left",e);const t=new k.Toolbar("issues-toolbar-right",e),s=me(),n=new k.ToolbarSettingCheckbox(s,ls`Group displayed issues under associated categories`,ls`Group by category`);n.setVisible(!1),t.appendToolbarItem(n),s.addChangeListener(()=>{this._fullUpdate()});const i=r.getShowThirdPartyIssuesSetting();this._showThirdPartyCheckbox=new k.ToolbarSettingCheckbox(i,ls`Include cookie Issues caused by third-party sites`,ls`Include third-party cookie issues`),t.appendToolbarItem(this._showThirdPartyCheckbox),this.setDefaultFocusedElement(this._showThirdPartyCheckbox.inputElement),t.appendSeparator();const a=document.createElement("div");a.classList.add("toolbar-warnings");const o=I.createIcon();o.data={iconName:"breaking_change_icon",color:"",width:"16px",height:"16px"},o.classList.add("breaking-change"),a.appendChild(o);const d=a.createChild("span","warnings-count-label"),c=new k.ToolbarItem(a);t.appendToolbarItem(c);return{toolbarContainer:e,updateToolbarIssuesCount:e=>{d.textContent=""+e,1===e?c.setTitle(ls`Issues pertaining to ${e} operation detected.`):c.setTitle(ls`Issues pertaining to ${e} operations detected.`)}}}_issueUpdated(e){const t=e.data;this._updateIssueView(t)}_updateIssueView(e){if(!this._issueViews.has(e.code())){let t=e.getDescription();if(!t)return void console.warn("Could not find description for issue code:",e.code());"file"in t&&(t=J(t));const s=new fe(this,e,t);this._issueViews.set(e.code(),s);this._getIssueViewParent(e).appendChild(s,(e,t)=>e instanceof fe&&t instanceof fe?e.getIssueTitle().localeCompare(t.getIssueTitle()):(console.error("The issues tree should only contain IssueView objects as direct children"),0))}this._issueViews.get(e.code()).update(),this._updateCounts()}_getIssueViewParent(e){if(!me().get())return this._issuesTree;const t=e.getCategory(),s=this._categoryViews.get(t);if(s)return s;const n=new he(t);return this._issuesTree.appendChild(n,(e,t)=>e instanceof he&&t instanceof he?e.getCategoryName().localeCompare(t.getCategoryName()):0),this._categoryViews.set(t,n),n}_clearViews(e){for(const t of e.values())t.parent.removeChild(t);e.clear()}_fullUpdate(){if(this._clearViews(this._categoryViews),this._clearViews(this._issueViews),this._aggregator)for(const e of this._aggregator.aggregatedIssues())this._updateIssueView(e);this._updateCounts()}_updateCounts(){const e=this._issuesManager.numberOfIssues();this._updateToolbarIssuesCount(e),this._showIssuesTreeOrNoIssuesDetectedMessage(e)}_showIssuesTreeOrNoIssuesDetectedMessage(e){if(e>0){this._issuesTree.element.hidden=!1,this._noIssuesMessageDiv.style.display="none";const e=this._issuesTree.firstChild();e&&(e.select(!0),this.setDefaultFocusedElement(e.listItemElement))}else{this._issuesTree.element.hidden=!0,this._showThirdPartyCheckbox&&this.setDefaultFocusedElement(this._showThirdPartyCheckbox.inputElement);const e=this._issuesManager.numberOfAllStoredIssues()>0;this._noIssuesMessageDiv.textContent=e?ls`Only third-party cookie issues detected so far`:ls`No issues detected so far`,this._noIssuesMessageDiv.style.display="flex"}}revealByCode(e){const t=this._issueViews.get(e);t&&(t.expand(),t.reveal())}}var _e=Object.freeze({__proto__:null,IssueCategoryNames:ue,getGroupIssuesByCategorySetting:me,IssuesPaneImpl:ge});export{N as IssueAggregator,V as IssueRevealer,_e as IssuesPane};
