window.jsonParse=function(){function s(e,t,n){return t?i[t]:String.fromCharCode(parseInt(n,16))}var e="(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)",t='(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';t='(?:"'+t+'*")';var n=new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|"+e+"|"+t+")","g"),r=new RegExp("\\\\(?:([^u])|u(.{4}))","g"),i={'"':'"',"/":"/","\\":"\\",b:"\b",f:"\f",n:"\n",r:"\r",t:"	"};var o=new String(""),u=Object.hasOwnProperty;return function(e,t){e=e.match(n);var i,a=e[0],f=false;if("{"===a)i={};else if("["===a)i=[];else{i=[];f=true}for(var l,c=[i],h=1-f,p=e.length;h<p;++h){a=e[h];var d;switch(a.charCodeAt(0)){default:d=c[0];d[l||d.length]=+a;l=void 0;break;case 34:a=a.substring(1,a.length-1);if(a.indexOf("\\")!==-1)a=a.replace(r,s);d=c[0];if(!l)if(d instanceof Array)l=d.length;else{l=a||o;break}d[l]=a;l=void 0;break;case 91:d=c[0];c.unshift(d[l||d.length]=[]);l=void 0;break;case 93:c.shift();break;case 102:d=c[0];d[l||d.length]=false;l=void 0;break;case 110:d=c[0];d[l||d.length]=null;l=void 0;break;case 116:d=c[0];d[l||d.length]=true;l=void 0;break;case 123:d=c[0];c.unshift(d[l||d.length]={});l=void 0;break;case 125:c.shift();break}}if(f){if(c.length!==1)throw new Error;i=i[0]}else if(c.length)throw new Error;if(t){var m=function(e,n){var r=e[n];if(r&&typeof r==="object"){var i=null;for(var s in r)if(u.call(r,s)&&r!==e){var o=m(r,s);if(o!==void 0)r[s]=o;else{i||(i=[]);i.push(s)}}if(i)for(s=i.length;--s>=0;)delete r[i[s]]}return t.call(e,n,r)};i=m({"":i},"")}return i}}()