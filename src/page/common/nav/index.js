require("./index.css");
var _mm = require("util/mm");
var _user = require("service/user-service");
var _cart = require("service/cart-service");

var nav = {
  init: function() {
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartCount();
    return this;
  },
  bindEvent: function() {
    //login click event
    $(".js-login").click(function() {
      _mm.doLogin();
    });
    //register click event
    $(".js-register").click(function() {
      window.location.href = "./user-register.html";
    });
    //logout click event
    $(".js-logout").click(function() {
      _user.logout(
        function(res) {
          window.location.reload();
        },
        function(errMsg) {
          _mm.errTips(errMsg);
        }
      );
    });
  },

  //load user information
  loadUserInfo: function() {
    _user.checkLogin(
      function(res) {
        $(".user.not-login")
          .hide()
          .siblings(".user.login")
          .find(".username")
          .text(res.username);
      },
      function(errMsg) {
        _mm.errTips(errMsg);
      }
    );
  },

  //load quantity of the goods in the cart 
  loadCartCount: function(){
    _cart.getCartCount(function(res){
      $('.nav .cart-count').text(res||0);
    }, function(errMsg){
      $('.nav .cart-count').text(0);
    });
  }

};

module.exports = nav.init();
