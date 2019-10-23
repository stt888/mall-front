require("./index.css");
var _mm = require("util/mm");
var htmlTemplate = require("./index.string");

var navSide = {
  option: {
    name: "",
    navList: [
      { name: "user-center", desc: "User Center", href: "./user-center.ejs" },
      { name: "order-list", desc: "Order List", href: "./order-list.ejs" },
      {
        name: "user-pass-update",
        desc: "Update Password",
        href: "./user-pass-update.ejs"
      },
      { name: "about", desc: "About HMall", href: "./about.ejs" }
    ]
  },

  // combin options
  init: function(option) {
    $.extend(this.option, option);
    this.renderNav();
  },

  renderNav: function() {
    // render active
    for (var i = 0, navLength = this.option.navList.length; i < navLength; i++) {
      if (this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true;
      }
    }
    // render nav-side html
    var navHtml = _mm.renderHtml(htmlTemplate, {
      navList: this.option.navList
    });

    $(".nav-side").html(navHtml);
  }
};

module.exports = navSide;
