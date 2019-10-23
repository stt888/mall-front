var _mm = require("util/mm.js");
require("../common/nav-simple/index");
require("../common/nav/index");
require("../common/index");
require("../common/header/index");
var navSide = require("../common/nav-side/index");

// require("../../../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css");
// require("@fortawesome/fontawesome-free/css/fontawesome.min.css");

// _mm.request({
//     url: '/product/list.do?keyword=1',
//     success: function(res){
//         console.log(res);
//     },
//     error: function(errMsg){
//         console.log(errMsg);
//     }
// });

// console.log(_mm.getUrlParam("test"));

// console.log(_mm.getServerUrl("login.html"));

var html = "<div> {{data}} </div>";
var data = { data: "123fkalfj" };
console.log(_mm.renderHtml(html, data));

navSide.init({ name: "about" });
