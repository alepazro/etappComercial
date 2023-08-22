// MY SCRIPTS
$(document).ready(() => {
  $("select").formSelect();
  const stepper = document.querySelector(".stepper");
  const stepperInstace = new MStepper(stepper, { firstActive: 0});
});

// SCRIPT1
$(document).ready(function () {
  if($('select[name=type1] option').filter(':selected').val()=='TF') {
    $('.optionalcable').hide();
    $('#obdConnector').prop('disabled', 'disabled');
    $('#custom3').val(0);
  }else{
    $('.optionalcable').show();
    $('#obdConnector').prop('disabled', false);
  }
  loadPrices(1);
  $("#cbxServices").val("13");

  $("#cbxServices").change(function () {
    calcForm();
  });
  $("#shippingOptions").change(function () {
    calcForm();
  });
  $("#obdConnector").change(function () {
    if($(this).is(':checked')){
      $('#custom3').val($('#qty').val());
      $('#custom3').prop('disabled', false);
    }
    else{
      $('#custom3').val(0);
      $('#custom3').prop('disabled', 'disabled');
    }
    calcForm();
  });
  $("#postedSpeedLimit").change(function () {
    calcForm();
  });
  $("#type1").change(function () {
    if(this.value=="TF"){
      $('.image1').show();
      $('.image2').hide();
      $('.optionalcable').hide();
      $('#obdConnector').prop('disabled', 'disabled');
      calcForm();
    }
    else{
      $('.image1').hide();
      $('.image2').show();
      $('.optionalcable').show();
      $('#obdConnector').prop('disabled', false);
      if ($('.optionalCheck').is(':checked') && $('.optionalcable').is(":visible")) {
        $('#custom3').val($('#qty').val());
        calcForm();
      }
    }

  });

  //if this comes from an internal call...
  var s = getParameterByName("s");
  if (s == 1) {
    var t = getParameterByName("t");
    if (t != "") {
      loadCustomer(t);
    }
  }
  //If there is a previous shopping cart, load it...
  var editionIndex = getParameterByName("ed");
  if (editionIndex) {
    if (editionIndex >= 0) {
      var exdate = new Date();
      var expiredays = 100;
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        "ETED=" + editionIndex + "; expires=" + exdate.toUTCString();
      editionIndex = -1;
    }
  }
  var param = getParameterByName("d");
  loadForm(param);

  var promo = getParameterByName("promo");
  if (promo == undefined) {
    promo = "";
  }
  if (promo.length > 0) {
    $("#promoCode").val(promo);
    applyPromoCode();
  }
  $("#dialog").dialog({
    autoOpen: false,
  });
  $("#opener").click(function () {
    $("#dialog").dialog("open");
  });
  $(".next-step").click(function () {
    $("input").focus().blur();
  });

  $("#dialogPostedSpeedLimit").dialog({
    autoOpen: false,
  });
  $("#openerPostedSpeedLimit").click(function () {
    $("#dialogPostedSpeedLimit").dialog("open");
  });
  $( ".hover1" ).hover(

      function() {
        if($('select[name=type1] option').filter(':selected').val()=='TF'){
          $('.image1').show();
          $('.image2').hide();
          $('.image3').hide();
          $('.image4').hide();
          $('.image5').hide();
        }
        else{
          $('.image1').hide();
          $('.image2').show();
          $('.image3').hide();
          $('.image4').hide();
          $('.image5').hide();
        }

      }, function() {
        $('.image5').hide();
        $('.image4').hide();
        $('.image1').hide();
        $('.image2').hide();
        $('.image3').hide();
      }
  );
  $( ".hover3" ).hover(
      function() {
        $('.image3').show();
        $('.image1').hide();
        $('.image2').hide();
        $('.image4').hide();
        $('.image5').hide();
      }, function() {
        $('.image5').hide();
        $('.image4').hide();
        $('.image1').hide();
        $('.image2').hide();
        $('.image3').hide();
      }
  );
  $( ".hover4" ).hover(
      function() {
        $('.image4').show();
        $('.image1').hide();
        $('.image2').hide();
        $('.image3').hide();
        $('.image5').hide();
      }, function() {
        $('.image5').hide();
        $('.image4').hide();
        $('.image1').hide();
        $('.image2').hide();
        $('.image3').hide();
      }
  );
  $( ".hover5" ).hover(
      function() {
        $('.image5').show();
        $('.image4').hide();
        $('.image1').hide();
        $('.image2').hide();
        $('.image3').hide();
      }, function() {
        $('.image5').hide();
        $('.image4').hide();
        $('.image1').hide();
        $('.image2').hide();
        $('.image3').hide();
      }
  );
});

// SCRIPT2
window["_fs_debug"] = false;
window["_fs_host"] = "www.fullstory.com";
window["_fs_org"] = "13PWT";
(function (m, n, e, t, l, o, g, y) {
  g = m[e] = function (a, b) {
    g.q ? g.q.push([a, b]) : g._api(a, b);
  };
  g.q = [];
  o = n.createElement(t);
  o.async = 1;
  o.src = "https://" + _fs_host + "/s/fs.js";
  y = n.getElementsByTagName(t)[0];
  y.parentNode.insertBefore(o, y);
  g.identify = function (i, v) {
    g(l, { uid: i });
    if (v) g(l, v);
  };
  g.setUserVars = function (v) {
    FS(l, v);
  };
  g.identifyAccount = function (i, v) {
    o = "account";
    v = v || {};
    v.acctId = i;
    FS(o, v);
  };
  g.clearUserCookie = function (d, i) {
    d = n.domain;
    while (1) {
      n.cookie = "fs_uid=;domain=" + d + ";path=/;expires=" + new Date(0);
      i = d.indexOf(".");
      if (i < 0) break;
      d = d.slice(i + 1);
    }
  };
})(window, document, "FS", "script", "user");

// SCRIPT3
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-25669991-1"]);
_gaq.push(["_setDomainName", ".easitrack.com"]);
_gaq.push(["_trackPageview"]);

(function () {
  var ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src =
    ("https:" == document.location.protocol ? "https://ssl" : "https://www") +
    ".google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s);
})();
