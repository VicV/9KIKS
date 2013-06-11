/**
 * photo-viewer.js
 * Embeddable photo viewer
 * Copyright (c) 2013 Kik Interactive, http://kik.com
 * Released under the MIT license
 *
 * SlideView based on code from SwipeView v1.0 ~ Copyright (c) 2012 Matteo Spinelli
 * http://cubiq.org - Released under MIT license, http://cubiq.org/license
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
PhotoViewer._SlideViewer=(function(l,m){var j={allowScroll:true,length:10,startAt:0,bufferDist:10,errorGenerator:k,};function f(u,C,y){var A=this;var D;var E=[];var z=0;var x=0;var K=0;var B=0;var L=0;var r=new b();function s(){if(!g(u)){throw TypeError("SlideViewer first argument should be a DOM node which wraps the slider. Got "+u)}if(typeof C!=="function"){throw TypeError("SlideViewer second argument should be a generator function!")}y=y||{};for(var M in j){if(y[M]===undefined){y[M]=j[M]}}}s();var G=y.length;var t=y.startAt;function F(){u.style.postition="relative";u.innerHTML="";D=document.createElement("div");var N=D.style;N.position="relative";N.top="0";N.height="100%";N.width="100%";N[d("transitionTimingFunction")]="ease-out";u.appendChild(D);for(var M=-1;M<2;M++){var O=document.createElement("div");var N=O.style;N.position="absolute";N.top="0";N.height="100%";N.width="100%";N.left=M*100+"%";D.appendChild(O);E.push({elm:O})}r.attach(u,D);r.on("start",H);r.on("resize",A.refreshSize);p.on("destroy",function(){r.detach()});A.refreshSize();A.setPage(y.startAt)}var p=new e();A.on=p.on;A.off=p.off;A.refreshSize=function(){L=u.clientWidth;K=(1-G)*L;B=Math.round(L*0.15);n(0);v(-t*L);return A};A.setLen=function(M){G=M;A.refreshSize();return A};A.page=function(){return t};var q=-1;A.setPage=function(P){if(typeof P!=="number"){throw TypeError("SlideViewer.setPage() requires a number! ('"+P+"' given)")}function N(T,S,W){var R=E;var Q=R[T].elm.style;var V=R[S].elm.style;var U=R[W].elm.style;Q.left=(t-1)*100+"%";if(t===0){Q.visibility="hidden"}else{Q.visibility="visible"}V.left=t*100+"%";V.visibility="visible";U.left=(t+1)*100+"%";if(t===G-1){U.visibility="hidden"}else{U.visibility="visible"}R[T].newPage=t-1;R[S].newPage=t;R[W].newPage=t+1}t=c(P,0,G-1);n(0);v(-t*L);z=h(t+1,3);if(z===0){N(2,0,1)}else{if(z==1){N(0,1,2)}else{N(1,2,0)}}for(var O=0;O<3;O++){var M=E[O];if(M.newPage==M.page){continue}M.elm.innerHTML="";if(M.newPage>=0&&M.newPage<y.length){M.elm.appendChild(w(M.newPage))}M.page=M.newPage}if(q!==P){p.fire("flip",P,E[z].elm);q=P}return A};A.curMaster=function(){for(var M=0;M<3;M++){if(E[M].page==t){return E[M].elm}}throw Error("No master is displaying our current page. This is a bug! Current page: "+M+", masters: "+JSON.serialize(E))};A.eachMaster=function(M){for(var N=0;N<3;N++){M(E[N].elm,E[N].page)}};A.invalidate=function(){for(var M=0;M<3;M++){E[M].page=-1}A.setPage(t);return A};A.destroy=function(){p.fire("destroy");return A};A.disable=function(){r.disableTouch()};A.enable=function(){r.enableTouch()};A.moving=function(){return J};var I=true;A.disable3d=function(){I=false;v(x)};A.enable3d=function(){I=true;v(x)};function v(N,M){var P=N===x;var O=d("transform");x=N;if(I){D.style[O]="translateX("+N+"px) translateZ(0)";D.style.left=""}else{D.style[O]="";D.style.left=N+"px"}if(M){if(P||!a){M()}else{r.on("transitionEnd",M)}}}function n(N,M){D.style[d("transitionDuration")]=N+"ms"}var o=false;var J=false;function H(U){r.off("start");r.on("end",O);var Q=U.pageX;var P=U.pageY;var S=Q;var R=P;o=false;J=false;n(0);r.on("move",N);function N(Z,V){var W=V.pageX-S;S=V.pageX;R=V.pageY;var Y=Math.abs(S-Q);var X=Math.abs(R-P);if(!o&&Y<y.bufferDist&&X<y.bufferDist){return}o=true;if(X>Y&&!J&&y.allowScroll){r.off("move");r.off("end");r.on("start",H);return}J=true;var aa=x+W;if(aa>0||aa<K){aa=x+(W/2)}Z.preventDefault();r.off("end").on("end",M);v(aa);p.fire("move",aa)}function M(V){r.off("move");r.off("end");S=V.pageX;var W=S-Q;var Z=Math.abs(W);var Y;if(x>0||x<K){Z*=0.15}if(Z<B){var X=Math.floor(300*Z/B);n(X);Y=-t*L;v(Y,T);return}if(W>0){t=Math.floor(-x/L)}else{t=Math.ceil(-x/L)}Y=-t*L;var X=Math.floor(200*Math.abs(x-Y)/L);n(X);v(Y,T)}function O(){r.off("move");r.off("end");r.on("start",H)}function T(){r.off("transitionEnd");A.setPage(t);r.on("start",H)}}function w(N){var M;try{M=C(N)}catch(P){var O=Error("Exception returned from source() function with input "+N+". Message: "+P.message);O.original=P;return y.errorGenerator(O)}if(!g(M)&&M.length){M=M[0]}if(!g(M)){var O=TypeError("Invalid type returned from source() function. Got type "+typeof M+" (with value "+M+"), expected HTMLElement. Input was "+N);return y.errorGenerator(O)}return M}F()}f.needsPreventDefaultHack=(function(){var o=/\bAndroid (\d+(\.\d+)?)/.exec(navigator.userAgent);if(!o){return false}var n=parseFloat(o[1]);if(n>=4.1){return false}return true}());function k(n){if(window.console&&console.error){if(n.original){console.error(n.original);console.log(n.original.stack)}else{console.error(n);console.log(n.stack)}}var o=document.createElement("p");o.innerHTML="There was an error creating this page! Contact the developer for more information.<br><br>"+n.message+"<br><br>If you are the developer, this means you made a mistake in your source() function. If you want to ensure users never see this page, you can override opts.errorGenerator to generate a more user-friendly error page.";return o}function b(){var B=this;var u="ontouchstart" in window;var r={"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"oTransitionEnd",ms:"MSTransitionEnd"};var n=r[i];var v="onorientationchange" in window?"orientationchange":"resize";var t=u?"touchstart":"mousedown";var p=u?"touchmove":"mousemove";var C=u?"touchend":"mouseup";var w=u?"touchcancel":"mouseout";var s;var y=false;function A(E,F){for(var D=0;D<E.length;D++){if(E[D].identifier==F){return E[D]}}return null}function x(E){var D=E.type;if(D==v){z.fire("resize",E);return}else{if(D==n){z.fire("transitionEnd",E);return}}if((D===t||D===p)&&f.needsPreventDefaultHack){E.preventDefault()}if(y){if(u&&D==t){s=E.changedTouches[0]}return}var G=s?s.identifier:"";if(D==t){if(u){if(s){return}s=E.changedTouches[0]}z.fire("start",u?E.changedTouches[0]:E)}else{if(D==p){if(!u){z.fire("move",E,E);return}var F=A(E.touches,G);s=F;z.fire("move",E,F)}else{if(D==w||D==C){if(!u){z.fire("end",E);return}if(!s){return}var F=A(E.changedTouches,G);if(!F){F=A(E.touches,G)}z.fire("end",F);s=null}}}}var z=new e();B.on=z.on;B.off=z.off;var o;var q;B.attach=function(E,D){if(o||q){B.detach()}o=E;q=D;window.addEventListener(v,x,false);q.addEventListener(n,x,false);o.addEventListener(t,x,false);o.addEventListener(p,x,false);o.addEventListener(C,x,false);o.addEventListener(w,x,false);return B};B.detach=function(){window.removeEventListener(v,x,false);q.removeEventListener(n,x,false);o.removeEventListener(t,x,false);o.removeEventListener(p,x,false);o.removeEventListener(C,x,false);o.removeEventListener(w,x,false);return B};B.disableTouch=function(){if(s){z.fire("end",s);s=null}y=true};B.enableTouch=function(){if(s){z.fire("start",s)}y=false}}function e(){var o=this;var p={};o.callbacks=p;function n(r,s){for(var q=0;q<r.length;q++){if(r[q]===s){r.splice(q,1)}}}o.on=function(r,q){var s=p[r]||[];n(s,q);s.push(q);p[r]=s;return o};o.off=function(r,q){if(q===undefined){delete p[r];return o}var s=p[r];if(!s){return o}n(s,q);return o};o.fire=function(u,s,q){var v=p[u];if(!v){return}var r=Array.prototype.slice.call(arguments,1);for(var t=0;t<v.length;t++){v[t].apply(null,r)}return o}}var a=false;var i=(function(){var p=document.createElement("div").style;var r="webkitT,MozT,msT,OT,t".split(",");for(var o=0;o<r.length;o++){var n=r[o]+"ransform";var q=r[o]+"ransition";if(q in p){a=true}if(n in p){return r[o].substr(0,r[o].length-1)}}return false})();function d(n){if(i===""){return n}n=n.charAt(0).toUpperCase()+n.substr(1);return i+n}function h(o,n){return((o%n)+n)%n}function c(q,p,o){return Math.max(p,Math.min(o,q))}function g(n){if(typeof HTMLElement==="object"){return n instanceof HTMLElement}else{return n&&typeof n==="object"&&n.nodeType===1&&typeof n.nodeName==="string"}}return f}(window.Zepto,window.jQuery));
SlideViewer=PhotoViewer._SlideViewer;