var Hogan = require("hogan.js");
var conf = { serverHost: "" };
var _mm = {
  // network request
  request: function(param) {
    var _this = this;
    $.ajax({
      type: param.method || "get",
      url: param.url || "",
      dataType: param.type || "json",
      data: param.data || "",
      success: function(res) {
        // requst success
        if (0 === res.status) {
          typeof param.success === "function" &&
            param.success(res.data, res.msg);
        } else if (10 === res.status) {
          // not login yet
          _this.doLogin();
        } else if (1 === res.status) {
          // request data is wrong
          typeof param.error === "function" && param.error(res.msg);
        }
      },
      error: function(err) {
        typeof param.error === "function" && param.error(err.statusText);
      }
    });
  },

  doLogin: function() {
    window.location.href =
      "./user-login.html?redirct=" + encodeURIComponent(window.location.href);
  },

  getServerUrl: function(path) {
    return conf.serverHost + path;
  },

  getUrlParam: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },

  renderHtml: function(htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate);
    var result = template.render(data);
    return result;
  },

  // prompt message
  successTips: function(msg) {
    alert(msg || "success!");
  },
  errTips: function(msg) {
    alert(msg || "Something went wrong!");
  },

  // form validation
  validate: function(value, type) {
    var value = $.trim(value); // turn to string
    if (type === "require") {
      return !!value; // turn to boolean
    }
    if (type === "phone") {
      return /^\d{10}$/.test(value);
    }
    if (type === "email") {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }
  },

  // go to the home page
  goHome: function() {
    window.location.href = "./index.html";
  }
};

module.exports = _mm;
