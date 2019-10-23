require("./index.css");
require("page/common/nav-simple/index");
var _mm = require("util/mm");

$(function() {
  var type = _mm.getUrlParam("type") || "default";
  var $element = $("." + type + "-success");
  $element.show();
});

console.log('result');