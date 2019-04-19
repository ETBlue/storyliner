(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{315:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},317:function(e,t,a){e.exports=a(577)},337:function(e,t){},339:function(e,t){},348:function(e,t,a){},360:function(e,t,a){},361:function(e,t,a){},362:function(e,t,a){},571:function(e,t,a){},572:function(e,t,a){},573:function(e,t,a){},577:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(68),o=a.n(r),c=a(76),i=(a(322),{title:"Storyliner",subtitle:"The Interactive Gossip Viewer",baseUrl:"/storyliner",query:"?source="}),s=window.localStorage;s.getItem(i.title)||s.setItem(i.title,JSON.stringify({}));for(var u=window.localStorage,m=["object","object_1","subject","subject_1","location","location_1"],d=a(136),h=a(137),p=a(144),f=a(138),b=a(145),v=a(69),g=a(78),E=a.n(g),y=a(277),N=a.n(y),w=(a(348),Object(v.d)(function(e){var t={href:i.baseUrl,className:"item"};""===e.location.search&&(t={className:"active item",onClick:e.onCurrentClick,style:{cursor:"default"}});var a=[],n=JSON.parse(u.getItem(i.title));Object.keys(n).forEach(function(e,t){a.push({key:e,title:n[e].title,subtitle:n[e].subtitle,time:n[e].time})}),a.sort(function(e,t){return t.time-e.time});var r=a.map(function(t,a){var n={href:"".concat(i.baseUrl,"/").concat(i.query).concat(t.key),className:"item"};return e.location.search==="".concat(i.query).concat(t.key)&&(n={className:"active item",onClick:e.onCurrentClick,style:{cursor:"default"}}),l.a.createElement("a",Object.assign({key:t.key},n),l.a.createElement("span",{className:"ui small header"},t.title,l.a.createElement("span",{className:"sub header"},t.subtitle)))});return l.a.createElement("aside",{className:"Sidebar"},l.a.createElement("h1",{className:"ui header"},l.a.createElement("span",{className:"App-name"},i.title),l.a.createElement("div",{className:"sub header App-description"},i.subtitle)),l.a.createElement("nav",{className:"ui vertical secondary fluid menu",style:{margin:"0"}},l.a.createElement("a",t,l.a.createElement("i",{className:"icon home"}),"Home"),r))})),k=(a(360),function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(p.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(l)))).state={input:void 0},a.handleInputChange=function(e){a.setState({input:e.target.value})},a.handleSourceSubmit=function(){var e="".concat(a.props.location.pathname,"?").concat(E.a.stringify({source:a.state.input}));console.log(a.props.location.pathname),console.log(e),a.props.history.push(e)},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return l.a.createElement("section",{className:"Home"},l.a.createElement("div",{className:"ui fluid action input"},l.a.createElement("input",{type:"text",placeholder:"Your data source here... (.csv file)",onChange:this.handleInputChange,value:this.state.input||"",autoFocus:!0}),l.a.createElement("button",{className:"ui teal button",onClick:this.handleSourceSubmit},"Submit")),l.a.createElement("hr",{className:"ui hidden section divider"}),l.a.createElement("div",{className:"ui center aligned basic segment"},l.a.createElement("h2",{className:"ui bottom pointing black label",style:{marginBottom:"2rem"}},"Create your own .csv file in 1 minute!"),l.a.createElement("hr",{className:"ui hidden fitted divider"}),l.a.createElement("span",{className:"ui horizontal black label"},"Step 1"),l.a.createElement("h3",{className:"ui tiny header",style:{margin:"1rem 0"}},"Make a copy",l.a.createElement("div",{className:"sub header"},"of this ",l.a.createElement("a",{href:"https://docs.google.com/spreadsheets/d/1w8IAAl2JZhqpmLIxJ8GWNO6KT0CQxM4wCnnIPpGvLPM/edit?usp=sharing",target:"_blank",rel:"noopener noreferrer"},"Google Spreadsheet"))),l.a.createElement("span",{className:"ui horizontal black label"},"Step 2"),l.a.createElement("h3",{className:"ui tiny header",style:{margin:"1rem 0"}},"Publish it by clicking",l.a.createElement("div",{className:"sub header"},l.a.createElement("code",{className:"ui horizontal basic label"},"File")," > ",l.a.createElement("code",{className:"ui horizontal basic label"},"Publish to the web..."))),l.a.createElement("span",{className:"ui horizontal black label"},"Step 3"),l.a.createElement("h3",{className:"ui tiny header",style:{margin:"1rem 0"}},"Select the format of",l.a.createElement("div",{className:"sub header"},l.a.createElement("code",{className:"ui horizontal basic label"},"Comma-seperated values (.csv)"))),l.a.createElement("span",{className:"ui horizontal black label"},"Step 4"),l.a.createElement("h3",{className:"ui tiny header",style:{margin:"1rem 0"}},"Click the",l.a.createElement("div",{className:"sub header"},l.a.createElement("code",{className:"ui horizontal basic label"},"Publish")," button")),l.a.createElement("span",{className:"ui horizontal black label"},"Step 5"),l.a.createElement("h3",{className:"ui tiny header",style:{margin:"1rem 0"}},"Copy the provided URL",l.a.createElement("div",{className:"sub header"},"and paste here")),l.a.createElement("h3",{className:"ui top pointing black label"},"And you are done!")))}}]),t}(l.a.Component)),S=Object(v.d)(k),_=(a(361),function(e){var t=e.logo,a=e.title,n=e.subtitle,r=e.onIconClick,o=e.onLogoClick,c="redo";switch(e.status){case"success":c="green check";break;case"loading":c="blue spinner";break;case"invalid":c="";break;case"error":c="red exclamation triangle";break;default:c="redo"}return l.a.createElement("header",{className:"Header"},l.a.createElement("div",{className:"wrapper ui container",style:{display:"flex"}},l.a.createElement("span",{style:{flex:"none"}},l.a.createElement("img",{src:t,alt:"logo",className:"ui image App-logo",onClick:o})),l.a.createElement("h1",{className:"ui header",style:{flexGrow:"1",margin:"0"}},l.a.createElement("span",{className:"App-name"},a),l.a.createElement("div",{className:"sub header App-description"},n)),l.a.createElement("div",{style:{flex:"none"}},""===c?null:l.a.createElement("i",{className:"icon ".concat(c),onClick:r}))))}),I=(a(362),function(){return l.a.createElement("footer",{className:"Footer"},l.a.createElement("div",{className:"ui center aligned container"},l.a.createElement("div",{className:"wrapper"},l.a.createElement("p",null,"Yet another open data experiment by ETBlue.",l.a.createElement("br",null),l.a.createElement("a",{href:"https://github.com/ETBlue/storyliner",target:"_blank",rel:"noopener noreferrer"},l.a.createElement("i",{className:"icon code"}),"Source code"),l.a.createElement("a",{href:"https://etblue.github.io/storyliner/?source=https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8ukLhLNcPLc20_7J2ju6_e_KSLW2RW0LDu_1_4__IvaVUCO1BhZ9RGwefcWkOVRQ8XjlYv6MSe8oA/pub?output=csv"},l.a.createElement("i",{className:"icon globe"}),"Sample page"),l.a.createElement("a",{href:"https://docs.google.com/spreadsheets/d/1w8IAAl2JZhqpmLIxJ8GWNO6KT0CQxM4wCnnIPpGvLPM/edit?usp=sharing",target:"_blank",rel:"noopener noreferrer"},l.a.createElement("i",{className:"icon table"}),"Sample data"),l.a.createElement("br",null),l.a.createElement("a",{href:"https://etblue.blogspot.com/2018/04/storyliner-interactive-gossip-viewer.html",target:"_blank",rel:"noopener noreferrer"},l.a.createElement("i",{className:"icon blogger b"}),"Release note"),l.a.createElement("a",{href:"https://twitter.com/ETBlue/status/981475770836049922",target:"_blank",rel:"noopener noreferrer"},l.a.createElement("i",{className:"icon twitter"}),"Dev log"),l.a.createElement("a",{href:"https://www.facebook.com/ETBlue/media_set?set=a.10212507248088923.1073741901.1014354995",target:"_blank",rel:"noopener noreferrer"},l.a.createElement("i",{className:"icon facebook f"}),"Dev log"),l.a.createElement("a",{href:"https://www.playpcesor.com/2018/04/storyliner-google.html",target:"_blank",rel:"noopener noreferrer"},l.a.createElement("i",{className:"icon blogger b"}),"Tutorial (by \u96fb\u8166\u73a9\u7269)")))))}),C=a(316),j=a(314),x=a.n(j),D=function(e){var t=e.visibleEventIDs,a=e.eventIndex;return t.has(a.toString())},A=function(e){var t=e.firstStagedEventID,a=e.lastStagedEventID,n=e.eventIndex;return n>=t&&n<=a},O=function(e){var t=e.filter,a=e.setFilter;return l.a.createElement("div",{className:"Filter ui two column stackable grid"},l.a.createElement("div",{className:"eleven wide column"},l.a.createElement("p",{className:"Filter-message"},"Filtered by",l.a.createElement("span",{className:"ui horizontal label",style:{margin:"0 0.5rem"}},t,l.a.createElement("i",{className:"icon delete",onClick:function(){return a(t)}})))))},q=function(e){var t=e.event,a=e.eventIndex,n=e.isActive,r=e.props,o=e.year,c=e.month,i=e.date,s=e.time;return l.a.createElement("article",{key:a,id:a,className:"Event"},l.a.createElement("div",{className:"ui two column stackable grid"},l.a.createElement("div",{className:"eleven wide column"},l.a.createElement("div",{className:"Event-block ui segments ".concat(n?"active":"")},l.a.createElement("div",{className:"ui segment"},l.a.createElement("a",{className:"Timestamp",href:"#".concat(a)},o,"-",c,"-",i," ",s||null),l.a.createElement("p",null,t.subject&&t.subject.length>0?l.a.createElement("span",{className:"ui large horizontal label",style:{backgroundColor:"hsla(".concat(r.labelColor[t.subject],", 50%, 50%, 0.3)")},onClick:function(){return r.setFilter(t.subject)}},t.subject):null,t.subject_1_prep&&t.subject_1_prep.length>0?l.a.createElement("span",null,t.subject_1_prep):null,t.subject_1&&t.subject_1.length>0?l.a.createElement("span",{className:"ui large horizontal label",style:{backgroundColor:"hsla(".concat(r.labelColor[t.subject_1],", 50%, 50%, 0.3)")},onClick:function(){return r.setFilter(t.subject_1)}},t.subject_1):null,t.action&&t.action.length>0?l.a.createElement("span",null,t.action):null,t.object&&t.object.length>0?l.a.createElement("span",{className:"ui large horizontal label",style:{backgroundColor:"hsla(".concat(r.labelColor[t.object],", 50%, 50%, 0.3)")},onClick:function(){return r.setFilter(t.object)}},t.object):null,t.object_1_prep&&t.object_1_prep.length>0?l.a.createElement("span",null,t.object_1_prep):null,t.object_1&&t.object_1.length>0?l.a.createElement("span",{className:"ui large horizontal label",style:{backgroundColor:"hsla(".concat(r.labelColor[t.object_1],", 50%, 50%, 0.3)")},onClick:function(){return r.setFilter(t.object_1)}},t.object_1):null,t.content_topic&&t.content_topic.length>0?l.a.createElement("span",null,t.content_topic):null),function(e){var t=e.event;return t.location&&t.location.length>0||t.location_1&&t.location_1.length>0}({event:t})?l.a.createElement("p",{className:"description"},t.location_prep&&t.location_prep.length>0?l.a.createElement("span",null,t.location_prep):null,t.location&&t.location.length>0?l.a.createElement("span",{className:"ui small horizontal label",style:{backgroundColor:"hsla(".concat(r.labelColor[t.location],", 20%, 70%, 0.3)")},onClick:function(){return r.setFilter(t.location)}},t.location):null,t.location_1_prep&&t.location_1_prep.length>0?l.a.createElement("span",null,t.location_1_prep):null,t.location_1&&t.location_1.length>0?l.a.createElement("span",{className:"ui small horizontal label",style:{backgroundColor:"hsla(".concat(r.labelColor[t.location_1],", 20%, 70%, 0.3)")},onClick:function(){return r.setFilter(t.location_1)}},t.location_1):null):null,function(e){var t=e.event;return t.channel&&t.channel.length>0||t.channel_carrier&&t.channel_carrier.length>0}({event:t})?l.a.createElement("p",{className:"description"},t.via,t.channel,t.content_carrier," \u2014 ",l.a.createElement("a",{href:t.ref_url,target:"_blank",rel:"noopener noreferrer"},t.ref_title&&t.ref_title.length>0?t.ref_title:t.ref_url)):null,t.summary?l.a.createElement("p",{className:"description"},t.summary):null),function(e){if(!e||0===e.length)return null;var t=e.map(function(t,a){var n=null;return t.author.length>0&&(e[a+1]&&t.author===e[a+1].author||(n=l.a.createElement("p",{className:"Author"},"\u2014 ",t.author))),l.a.createElement("blockquote",{key:a},l.a.createElement("i",{className:"quote left icon"}),l.a.createElement("i",{className:"quote right icon"}),t.content,n)});return l.a.createElement("div",{className:"ui secondary segment"},t)}(t.quote))),t.note&&t.note.length>0?l.a.createElement("div",{className:"five wide column"},l.a.createElement("h4",{className:"Note-header ui dividing teal header"},"\u570d\u89c0\u7b46\u8a18"),l.a.createElement("p",{className:"Note-content"},t.note)):null))},L=function(e){var t=e.year,a=e.eventIndex,n=e.isStaged;return l.a.createElement("div",{key:"year-of-".concat(a),className:"MenuYearMark item ".concat(n?"":"not-staged"," ")},t)},R=function(e){var t=e.eventIndex,a=e.isActive,n=e.isInViewPort,r=e.isStaged,o=e.month,c=e.date,i=e.time;return l.a.createElement("a",{key:t,href:"#".concat(t),className:"MenuItem item ".concat(a?"active":""," ").concat(n?"in-viewport":""," ").concat(r?"":"not-staged")},"".concat(o,"/").concat(c),i?l.a.createElement("span",{className:"Time"},i):null)},z=(a(571),Object(v.d)(function(e){var t=[],a=[];return e.data.forEach(function(n,r){if(!n.date)return null;var o,c=x()(n.date),i=n.date.includes("/")||n.date.includes("-")||n.date.length>5,s=i?c.year():n.date,u=i?c.month()+1:"?",d=i?c.date():"?",h=n.time&&n.time.length>0?n.time:null,p=(o=e.location.hash,parseInt(o.replace("#",""),10)===r);(function(e){var t=e.filter,a=e.event;if(0===t.length)return!0;var n=!0,l=!1,r=void 0;try{for(var o,c=m[Symbol.iterator]();!(n=(o=c.next()).done);n=!0)if(t===a[o.value])return!0}catch(i){l=!0,r=i}finally{try{n||null==c.return||c.return()}finally{if(l)throw r}}return!1})({filter:e.filter,event:n})&&a.push(l.a.createElement(q,{key:r,eventIndex:r,event:n,isActive:p,props:e,year:s,month:u,date:d,time:h})),0===r?t.push(l.a.createElement(L,{key:"year-of-".concat(r),eventIndex:r,isStaged:A({firstStagedEventID:e.firstStagedEventID,lastStagedEventID:e.lastStagedEventID,eventIndex:r}),year:s})):function(e){var t=e.data;return e.year!==t[e.eventIndex-1].date.split("/")[0]}({data:e.data,year:s,eventIndex:r})&&t.push(l.a.createElement(L,{key:"year-of-".concat(r),eventIndex:r,isStaged:A({firstStagedEventID:e.firstStagedEventID,lastStagedEventID:e.lastStagedEventID,eventIndex:r}),year:s})),t.push(l.a.createElement(R,{key:r,eventIndex:r,isActive:p,isInViewPort:D({visibleEventIDs:e.visibleEventIDs,eventIndex:r}),isStaged:A({firstStagedEventID:e.firstStagedEventID,lastStagedEventID:e.lastStagedEventID,eventIndex:r}),month:u,date:d,time:h}))}),l.a.createElement("div",{className:"Body"},l.a.createElement("div",{className:"Menu-wrapper",ref:e.handleContextRef},l.a.createElement(C.a,{context:e.contextRef},l.a.createElement("nav",{className:"ui vertical fluid secondary mini pointing pink menu"},l.a.createElement("span",{className:"item",style:{cursor:"pointer"},onClick:function(){return e.scrollReset("top")}},l.a.createElement("i",{className:"icon up chevron",style:{float:"none",opacity:"0.5"}})),t,l.a.createElement("span",{className:"item",style:{cursor:"pointer"},onClick:function(){return e.scrollReset("bottom")}},l.a.createElement("i",{className:"icon down chevron",style:{float:"none",opacity:"0.5"}}))))),l.a.createElement("div",{className:"Event-wrapper"},e.filter.length>0?l.a.createElement(O,e):null,a))})),T=[],F=0;F<12;F++)T.push(30*F);var M=T,P=new Set(M),B=new Set,J={quote:[]},W="",U=function(e){if(e.length<2)return[];for(var t=[],a=e[1],n=a.length-1,l=2;l<e.length;l++)for(var r=e[l],o=0;o<r.length;o++){var c=a[o];switch(c){case"quote_author":W=r[o]||"";break;case"quote_content":r[o]&&r[o].length>0&&r[o].split("\n").forEach(function(e){J.quote.push({author:W,content:e})});break;default:J[c]=r[o]||"",m.includes(c)&&B.add(r[o])}o===n&&(""===J.date?t[t.length-1].quote=t[t.length-1].quote.concat(J.quote):t.push(J),J={quote:[]},W="")}var i={};return B.delete(""),B.forEach(function(e){var t=Math.floor(Math.random()*P.size),a=Array.from(P)[t];i[e]=a,P.delete(a),0===P.size&&(P=new Set(M))}),{data:t,labelColor:i}},G=function(e){var t=e[0];return{title:t[0],subtitle:t[1]}},V=function(e){var t=e.offsetTop,a=t+e.offsetHeight,n=window.scrollY,l=n+window.innerHeight;return a>n&&t<l},H=a(315),Y=a.n(H),Q=(a(572),function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(p.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(l)))).queries=E.a.parse(a.props.location.search),a.state={isLoaded:!1,status:"standby",data:[],title:"",subtitle:"",filter:"",showSidebar:!1,visibleEventIDs:new Set,firstStagedEventID:0,lastStagedEventID:10,contextRef:null},a.updateVisibleEventIDs=function(){var e,t,n=new Set,l=!1,r=!1,o=window.document.getElementsByClassName("Event");Array.from(o).forEach(function(a,o){V(a)?(l||(e=parseInt(a.id,10)-5,l=!0),n.add(a.id)):l&&!r&&(t=parseInt(a.id,10)+5-1,r=!0)}),a.setState({visibleEventIDs:n,firstStagedEventID:e,lastStagedEventID:t})},a.resetStatus=function(){window.setTimeout(function(){a.setState({status:"standby"},a.updateVisibleEventIDs())},5e3)},a.toggleSidebar=function(){a.setState(function(e,t){return{showSidebar:!e.showSidebar}})},a.startApp=function(){a.queries.source&&0!==decodeURIComponent(a.queries.source).length?a.fetchData():a.setState({status:"invalid",isLoaded:!1})},a.fetchData=function(){a.setState({status:"loading",isLoaded:!1},function(){N.a.parse(a.queries.source,{download:!0,complete:function(e){var t=e.data,n=G(t),l=JSON.parse(u.getItem(i.title));for(var r in l[a.queries.source]={title:n.title,subtitle:n.subtitle,time:Date.now()},l)r.match(/^http/)&&!l[r].title.includes("<!DOCTYPE html>")||delete l[r];u.setItem(i.title,JSON.stringify(l));var o=U(t);a.setState({title:n.title,subtitle:n.subtitle,data:o.data,labelColor:o.labelColor,isLoaded:!0,status:"success"},a.resetStatus())},error:function(e){console.error(e)}})})},a.scrollReset=function(e){a.props.history.push("".concat(a.props.location.pathname).concat(a.props.location.search)),"top"===e?window.scrollTo(0,0):"bottom"===e&&window.scrollTo(0,window.document.body.scrollHeight)},a.setFilter=function(e){a.setState(function(t,a){return t.filter===e?{filter:""}:{filter:e}})},a.handleContextRef=function(e){a.setState({contextRef:e})},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.startApp(),window.addEventListener("scroll",function(t){e.updateVisibleEventIDs()})}},{key:"componentDidUpdate",value:function(e){this.props.location.search!==e.location.search&&(this.queries=E.a.parse(this.props.location.search),this.startApp())}},{key:"render",value:function(){var e,t,a;return E.a.parse(this.props.location.search).source&&0!==this.state.data.length?(e=this.state.title,t=this.state.subtitle,a=l.a.createElement(z,Object.assign({handleContextRef:this.handleContextRef,scrollReset:this.scrollReset,setFilter:this.setFilter},this.state))):(e=i.title,t=i.subtitle,a=l.a.createElement(S,null)),l.a.createElement("div",{className:"App",style:this.state.showSidebar?{left:"20rem"}:{}},l.a.createElement(w,{onCurrentClick:this.toggleSidebar}),l.a.createElement("main",{className:"App-main"},l.a.createElement(_,{logo:Y.a,title:e,subtitle:t,status:this.state.status,onIconClick:this.startApp,onLogoClick:this.toggleSidebar}),l.a.createElement("section",{className:"Body-wrapper ui container"},a),l.a.createElement("hr",{className:"ui divider"}),l.a.createElement(I,null)))}}]),t}(l.a.Component)),K=Object(v.d)(Q),Z=(a(573),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function X(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}o.a.render(l.a.createElement(c.a,{basename:i.baseUrl},l.a.createElement(K,null)),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/storyliner",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/storyliner","/service-worker.js");Z?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):X(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):X(e)})}}()}},[[317,1,2]]]);
//# sourceMappingURL=main.5b3fb31d.chunk.js.map