(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{Nh35:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a("dI71"),r=a("q1tI"),i=a.n(r),l=a("Wbzz"),o=function(e){function t(){return e.apply(this,arguments)||this}return Object(n.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.skip,a=void 0===t?0:t,n=e.limit,r=void 0===n?10:n,o=e.total,c=e.pathPrefix,s=void 0===c?"/page/":c,m=a/r+1,p=Math.ceil(o/r),u=m-1>0?""+s+(m-1):null,d=p>m?""+s+(m+1):null;return i.a.createElement("nav",{className:"pagination"},i.a.createElement("div",{className:"inner"},u&&i.a.createElement(l.Link,{className:"pagination-prev",to:u},i.a.createElement("i",{className:"icon icon-arrow-left"}),i.a.createElement("span",{className:"pagination-label"},"Newer Posts")),p&&i.a.createElement("span",{className:"pagination-info"},"Page ",m," of ",p),d&&i.a.createElement(l.Link,{className:"pagination-next",to:d},i.a.createElement("span",{className:"pagination-label"},"Older Posts"),i.a.createElement("i",{className:"icon icon-arrow-right"})),i.a.createElement("div",{className:"clear"})))},t}(i.a.PureComponent)},RXBc:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f})),a.d(t,"pageQuery",(function(){return h}));var n=a("dI71"),r=a("mwIZ"),i=a.n(r),l=a("q1tI"),o=a.n(l),c=a("TSYQ"),s=a.n(c),m=a("Wbzz"),p=a("ynKl"),u=a("Nh35"),d=a("rY4l"),E=a("7oih"),v=a("EYWl"),f=function(e){function t(){return e.apply(this,arguments)||this}return Object(n.a)(t,e),t.prototype.render=function(){var e=i()(this.props,"data.currentMarkdownRemark",{}).edges,t=i()(this.props,"data.allMarkdownRemark",{}).totalCount,a=this.props.pageContext||{},n=a.skip,r=void 0===n?0:n,l=a.limit,c=void 0===l?10:l,f=i()(this.props,"data.site.siteMetadata",{}),h=f.cover,g=f.navigation,N=f.description,k=f.title,b=f.logo,y=this.props.data.allAuthorJson.edges.map((function(e){return{id:e.node.id,avatar:e.node.avatar}}));return o.a.createElement(E.a,{location:this.props.location},o.a.createElement("div",{className:s()("home-template",{paged:r>0})},o.a.createElement(v.a,{title:k}),o.a.createElement(d.a,{logo:b,cover:h,hideNavBack:!0,navigation:g,isPost:!1},o.a.createElement("h1",{className:"blog-name"},o.a.createElement(m.Link,{to:"/"},k)),N&&o.a.createElement("span",{className:"blog-description"},N)),o.a.createElement("div",{id:"index",className:"container"},o.a.createElement("main",{className:s()("content",{paged:r>0}),role:"main"},o.a.createElement("div",{className:"extra-pagination"},o.a.createElement(u.a,{skip:r,limit:c,total:t,pathPrefix:"/page/"})),o.a.createElement(p.a,{edges:e,authorList:y}),o.a.createElement(u.a,{skip:r,limit:c,total:t,pathPrefix:"/page/"})))))},t}(o.a.PureComponent),h="4293062639"},vmZo:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a("dI71"),r=a("q1tI"),i=a.n(r),l=a("eIB4"),o=function(e){function t(){return e.apply(this,arguments)||this}return Object(n.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.avatar,a=e.name,n=e.className,r=t&&t.indexOf("http")>-1?t:Object(l.a)(t);return i.a.createElement("figure",{className:n,title:a},t&&i.a.createElement("img",{src:r,alt:a}))},t}(i.a.PureComponent)},ynKl:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a("dI71"),r=a("q1tI"),i=a.n(r),l=a("Wbzz"),o=a("M4XY"),c=a.n(o),s=a("TSYQ"),m=a.n(s),p=a("vmZo"),u=function(e){function t(){return e.apply(this,arguments)||this}return Object(n.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.edges,a=e.authorList;return i.a.createElement("section",null,t&&t.map((function(e){var t=e.node.fields.slug,n=e.node.frontmatter,r=e.node.excerpt,o=n.author,s=a.find((function(e){return e.id===o}));if(!s)return null;var u=function(){return n.tags?n.tags.map((function(e){return i.a.createElement("span",{key:e},i.a.createElement(l.Link,{to:"/tag/"+c()(e)+"/"},e)," ")})):null},d=function(){return n.tags&&s.id&&"on "},E=function(){return s.id&&i.a.createElement("span",null,i.a.createElement(l.Link,{to:"/author/"+c()(s.id)+"/"},s.id)," ",i.a.createElement(d,null))};return i.a.createElement("article",{className:m()("post",{featured:n.star}),key:n.title+"-"+n.date},i.a.createElement("div",{className:"inner"},i.a.createElement("header",{className:"post-header"},i.a.createElement("h2",{className:"post-title"},i.a.createElement(l.Link,{to:t},n.title)),i.a.createElement("div",{className:"post-meta"},s.avatar&&i.a.createElement("div",{className:"post-meta-avatar"},i.a.createElement(p.a,{className:"post-other-avatar avatar",name:s.id,avatar:s.avatar})),i.a.createElement("div",{className:"post-meta-inner"},i.a.createElement(E,null),i.a.createElement(u,null),"| ",i.a.createElement("time",null,n.date))),i.a.createElement("div",{className:"clear"})),i.a.createElement("section",{className:"post-excerpt"},i.a.createElement("p",null,r,"…"))))})))},t}(i.a.PureComponent)}}]);
//# sourceMappingURL=component---src-pages-index-js-6a0e2374cf9050a53e74.js.map