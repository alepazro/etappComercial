var promoPrice = 0;
var promoPriceService = 0;
var promoPriceActivation = 0;
var promoPriceOBD = 0;
var promoPricePostedSL = 0;
var itm1 = 0;
var listPrice = false;

function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regexS = '[\\?&]' + name + '=([^&#]*)';
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if (results == null) return '';
  else return decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function applyPromoCode() {
  try {
    var isValid = false;

    promoPrice = 0;
    promoPriceService = 0;
    promoPriceOBD = 0;
    promoPriceActivation = 0;
    $('#orderItemLastMonth').hide();

    var promoCode = $('#promoCode').val();

    if (promoCode) {
      if (promoCode != '') {
        try {
          promoCode = promoCode.toUpperCase();
          $('#promoCode').val(promoCode);
        } catch (ex) {}

        $('#cbxServices').val('13');

        switch (promoCode) {
          case '43367':
            promoPrice = 159;
            isValid = true;
            break;
          case '16935':
            promoPrice = 169;
            isValid = true;
            break;
          case '65890':
            promoPrice = 149;
            isValid = true;
            break;
          case '37213':
            promoPrice = 139;
            isValid = true;
            break;
          case 'SPE129':
            promoPrice = 129;
            isValid = true;
            break;
          case 'STQ129':
            promoPrice = 129;
            isValid = true;
            break;
          case 'SPE119':
            promoPrice = 119;
            isValid = true;
            break;
          case 'AWQ119':
            promoPrice = 119;
            isValid = true;
            break;
          case 'BF99':
            promoPrice = 99;
            isValid = true;
            break;
          case 'SPE109':
            promoPrice = 109;
            isValid = true;
            break;
          case 'REW109':
            promoPrice = 109;
            isValid = true;
            break;
          case 'XMAS978':
            promoPrice = 109;
            isValid = true;
            break;
          case 'ALLIN':
            promoPrice = 159;
            promoPriceService = 17.99;
            promoPriceActivation = 20.0;
            $('#cbxServices').val('17');
            $('#orderItemLastMonth').show();
            $('#specialInstructions').val(
              'Special Conditions: 1 Cent unit with 1st, last, and activation.  Minimum commitment: 6 months.'
            );
            isValid = false;
            break;
          default:
            promoPrice = 119;
        }

        if (isValid) {
          alert('Valid Promotion Code!');
          calcForm();
        } else {
          alert('Promo code not valid');
        }
      }
    }
  } catch (err) {
    alert('applyPromoCode: ' + err.description);
  }
}

function loadServicePrice() {
  try {
    var itm2 = listPrice.service;
    if ($('#cbxServices').length == 0) {
      itm2 = listPrice.service;
    } else {
      var serviceId = $('#cbxServices').val();
      switch (serviceId) {
        case '0':
          itm2 = 0.0;
          break;
        case '11':
          itm2 = 9.99;
          break;
        case '12':
          itm2 = 15.99;
          break;
        case '13':
          itm2 = listPrice.service;
          break;
        case '14':
          itm2 = 19.99;
          break;
        case '15':
          itm2 = 13.99;
          break;
        case '17':
          itm2 = 17.99;
          break;
        default:
          itm2 = 0.0;
      }
    }

    return itm2;
  } catch (err) {
    alert('loadServicePrice: ' + err.description);
  }
}

function loadPrices(qty) {
  try {
    listPrice = getPrice();

    if (qty == undefined) {
      qty = 1;
    }

    if (itm1 == 0) {
      itm1 = listPrice.device;
      if (qty <= 2) {
        itm1 = listPrice.device; //129
      } else {
        if (qty <= 5) {
          itm1 = listPrice.device; //129
        } else {
          if (qty < 10) {
            itm1 = listPrice.device - 10; //119
          } else {
            if (qty < 20) {
              itm1 = listPrice.device - 20; //109
            } else {
              if (qty >= 20) {
                itm1 = listPrice.device - 30; //99
              } else {
                itm1 = listPrice.device; //149
              }
            }
          }
        }
      }
    }

    if (promoPrice > 0) {
      itm1 = promoPrice;
    }
    var itm2 = loadServicePrice(); //Service
    if (promoPriceService > 0) {
      itm2 = promoPriceService;
    }
    var itm3 = 0.0; //Activation
    if (promoPriceActivation > 0) {
      itm3 = promoPriceActivation;
    }
    var itm4 = 15.0; //OBD Connector
    if (promoPriceOBD > 0) {
      itm4 = promoPriceOBD;
    }
    var itm5 = 4.0; //Posted Speed Limit
    if (promoPricePostedSL > 0) {
      itm4 = promoPricePostedSL;
    }

    $('.itm1').attr('data-price', itm1.toFixed(2)).html(itm1.toFixed(2));
    $('.itm2').attr('data-price', itm2.toFixed(2)).html(itm2.toFixed(2));
    $('.itm3').attr('data-price', itm3.toFixed(2)).html(itm3.toFixed(2));
    $('.itm4').attr('data-price', itm4.toFixed(2)).html(itm4.toFixed(2));
    $('.itm5').attr('data-price', itm5.toFixed(2)).html(itm5.toFixed(2));
  } catch (err) {
    alert('loadPrices: ' + err.description);
  }
}

function onEdit(obj) {
  try {
    $(obj).addClass('leftAligned');
    obj.select();
  } catch (err) {
    alert('onEdit: ' + err.description);
  }
}

function onEndEdit(obj) {
  try {
    $(obj).removeClass('leftAligned');
  } catch (err) {
    alert('onEndEdit: ' + err.description);
  }
}

function calcForm() {
console.log('entro');
  try {
    var qtyaux = document.getElementById('qty').value;
    var qty = document.getElementById('qty').value;
    let custom1 = $('#custom1').val();
    let custom2 = $('#custom2').val();
    qty = parseInt(qty) + parseInt(custom1) + parseInt(custom2);
    if (qty.length == 0) qty = '0';

    if (!/^[0-9]+$/.test(qty)) {
      alert('Please enter a valid quantity');
    } else {
      qty = parseInt(qty);

      var price = 0;
      var itemTotal = 0;
      var orderSubtotal = 0;

      //Adjust price depending on qty
      loadPrices(qty);



      $('.orderItem').each(function () {
        price = $(this).find('.itemPrice').attr('data-price');
        if (price == undefined) price = 0;
        itemTotal = price * qty;
        $(this).find('.enteredQty').html(qty);
        $(this).find('.itemTotal').html(itemTotal.toFixed(2));
        orderSubtotal = orderSubtotal + itemTotal;
      });

      $('.customOrderItem').each(function () {
        const el = $(this);
        const input = $(el).find(':input[type="number"]');
        const value = +input.val();
        let total = 0;
        if (value === NaN || value == null || value < 0) input.val(0);
        else if (el) {
          const itemPrice = +el.find('.itemPrice').text();
          total = itemPrice * value;
        }
        el.find('.itemTotal').text(total.toFixed(2));
        orderSubtotal = orderSubtotal + total;
      });

      $('.optionalcable').each(function () {
        const el = $(this);
        if ($(this).find('.optionalCheck').is(':checked') && $('.optionalcable').is(":visible")) {

          console.log(el);
          const input = $(el).find(':input[type="number"]');
          console.log(input);
          const value = +input.val();
          console.log(value);
          let total = 0;
          if (value === NaN || value == null || value < 0) input.val(0);
          else if (el) {
            const itemPrice = +el.find('.itemPrice').text();
            total = itemPrice * value;
          }
          el.find('.itemTotal').text(total.toFixed(2));
          orderSubtotal = orderSubtotal + total;
        }
        else
          el.find('.itemTotal').text('0.00');
      });

      $('.optionalOrderItem').each(function () {
        if ($(this).find('.optionalCheck').is(':checked')) {
          price = $(this).find('.itemPrice').attr('data-price');
          if (price == undefined) {
            price = 0;
          }
          itemTotal = price * qty;
          $(this).find('.enteredQty').html(qty);
          //$('.cableobd').value(qty);
          $(this).find('.itemTotal').html(itemTotal.toFixed(2));
          orderSubtotal = orderSubtotal + itemTotal;
        } else {
          $(this).find('.enteredQty').html('0');
          //$('.cableobd').value(0);
          $(this).find('.itemTotal').html('0.00');
        }
      });
      //$('.cableobd').value(0);
      $('.subTotal').html(orderSubtotal.toFixed(2));

      $('.shippingItem').find('.enteredQty').html(qty);
      price = $('#shippingOptions').val();
      itemTotal = price * 1; //qty;
      $('.shippingTotal').html(itemTotal.toFixed(2));
      orderSubtotal = orderSubtotal + itemTotal;
      $('.grandTotal').html(orderSubtotal.toFixed(2));
      var editionIndex = $('#cbxServices').prop('selectedIndex');
      var shippingIndex = $('#shippingOptions').prop('selectedIndex');
 
      //Sets cookies
      var exdate = new Date();
      var expiredays = 100;
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie = 'ETQTY=' + qtyaux + '; expires=' + exdate.toUTCString();
      document.cookie =
        'ETED=' + editionIndex + '; expires=' + exdate.toUTCString();
      document.cookie =
        'ETSH=' + shippingIndex + '; expires=' + exdate.toUTCString();

    }
  } catch (err) {
    alert('calcForm: ' + err.description);
  }
}

function loadForm(docId) {
  try {
    var etqty = document.cookie.match('(^|;) ?' + 'ETQTY' + '=([^;]*)(;|$)');
    var eted = document.cookie.match('(^|;) ?' + 'ETED' + '=([^;]*)(;|$)');
    var etsh = document.cookie.match('(^|;) ?' + 'ETSH' + '=([^;]*)(;|$)');
    var jsonDoc = false;

    if (docId == undefined) {
      docId = '';
    }

    var previousDoc = false;
    if (docId.length > 0) {
      var data = 'docId=' + docId;
      previousDoc = getDb('getDocQty', data);
    }

    if (etqty) {
      var qty = unescape(etqty[2]);
      if (previousDoc) {
        qty = previousDoc.qty;
      }
      $('#qty').val(qty);
      if (eted) {
        var editionIndex = unescape(eted[2]);
        $('#cbxServices').prop('selectedIndex', editionIndex);
      }
      if (etsh) {
        var shippingIndex = unescape(etsh[2]);
        if (previousDoc) {
          shippingIndex = previousDoc.shippingOption;
        }
        $('#shippingOptions').prop('selectedIndex', shippingIndex);
      }

      loadPrices(qty);
      calcForm();
    }
  } catch (err) {
    alert('loadForm: ' + err.description);
  }
}

function copyShippingInfo() {
  try {
    $('#ccFirstName').val($('#firstName').val());
    $('#ccLastName').val($('#lastName').val());
    $('#ccStreet').val($('#street').val());
    $('#ccCity').val($('#city').val());
    $('#ccState').val($('#state').val());
    $('#ccPostalCode').val($('#postalCode').val());
    $("input").focus().blur();
  } catch (err) {
    alert('copyShippingInfo: ' + err.description);
  }
}

function anonFeedback() {
  try {
    var data =
      'formId=' +
      escape($('#formId2').val()) +
      '&msg=' +
      escape($('#message2').val());

    var result = saveWebForm(data);

    alert('Thank you!');

    $('#message2').val('');
  } catch (err) {
    alert('anonFeedback: ' + err.description);
  }
}

function contactUs() {
  try {
    var data =
      'formId=' +
      escape($('#formId').val()) +
      '&msg=' +
      escape($('#message').val()) +
      '&fn=' +
      escape($('#firstName').val()) +
      '&ln=' +
      escape($('#lastName').val()) +
      '&ph=' +
      escape($('#phone').val()) +
      '&email=' +
      escape($('#email').val()) +
      '&repId=' +
      escape($('#repId').val());

    var result = saveWebForm(data);

    $('#message').val('');
    $('#firstName').val('');
    $('#lastName').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#repId').val('');

    goTo('thank-you-contact.html');
  } catch (err) {
    alert('contactUs: ' + err.description);
  }
}

function getQuote() {
  try {
    var serviceId = 2;
    var qty = 0;
    qty = $('#qty').val();
    if (qty <= 0) {
      alert('Please enter a quantity');
      return;
    }

    var data = {
      formId: $('#formId').val(),
      qty: qty,
      serviceId: serviceId,
      ship: $('#shippingOptions').prop('selectedIndex'),
      fn: $('#firstName').val(),
      ln: $('#lastName').val(),
      email: $('#email').val(),
      ph: $('#phone').val(),
      co: $('#company').val(),
    };
    data = JSON.stringify(data);
    var res = postDb('getQuote', data);
    if (res.isOk == true) {
      alert($('#firstName').val() + ' please check your inbox for our Quote!');
      $('#firstName').val('');
      $('#lastName').val('');
      $('#email').val('');
      $('#phone').val('');
      $('#company').val('');
    } else {
      alert('Sorry, we could not process your request.  Kindly try again.');
    }
  } catch (err) {
    alert('getQuote: ' + err.description);
  }
}

function buyNow() {
  try {
    //if user picked service.value=17 but no promocode=allin, then revert to service.value=13
    var promoCode = $('#promoCode').val();
    if (promoCode) {
      promoCode = promoCode.toUpperCase();
    }
    if ($('#cbxServices').val() == '17' && promoCode != 'ALLIN') {
      $('#cbxServices').val('13');
    }
  } catch (ex) {}
  try {
    //Valida the CC
    var isValidCC = false;
    if ($('#ccNumber').val().substring(0, 4) == '****') {
      isValidCC = true;
    } else {
      isValidCC = ValidateCreditCard();
      if (!isValidCC) {
        alert('Invalid Credit Card number');
        return;
      }
    }

    //Validate the email
    var isValidEmail = false;
    validateEmail($('#email').val());
    if (!validateEmail) {
      alert('Invalid Email Address');
      return;
    }

    var serviceId = $('#cbxServices').val();

    let qty = $('#qty').val() || 0;
    let custom1 = $('#custom1').val() || 0;
    let custom2 = $('#custom2').val() || 0;
    if (qty <= 0 && custom1 <= 0 && custom2 <= 0) {
      alert('Please enter a quantity for a GPS Tracker');
      return;
    }
    //var custom3=0;
    //if($('.optionalcable').is(":visible"))
    var custom3 = $('#custom3').val();
    if($('select[name=type1] option').filter(':selected').val()=='TF'){
      custom3 = "0";
      var qtyGX= "0";
      var qtyTF= qty;
    }
    else{
      var qtyGX= qty;
      var qtyTF= '0';
    }

    var isOBDOption = false;
    try {
      if ($('#obdConnector').is(':checked')) {
        isOBDOption = true;
      }
    } catch (err) {
      isOBDOption = false;
    }

    var isPostedSLOption = false;
    try {
      if ($('#postedSpeedLimit').is(':checked')) {
        isPostedSLOption = true;
      }
    } catch (err) {
      isPostedSLOption = false;
    }

    var promoCode = '';

    try {
      promoCode = $('#promoCode').val();
      if (promoCode) {
        promoCode = promoCode.toUpperCase();
      }
    } catch (ex) {}

    var data = {
      formId: $('#formId').val(),
      qty: qtyGX,
      //qtyGX: qtyGX,
      qtyTF: qtyTF,
      qtyOBDTracker: custom1,
      qtyAssets: custom2,
      serviceId: serviceId,
      isOBDOption: isOBDOption,
      qtyOBDConnector: custom3,
      isPostedSLOption: isPostedSLOption,
      ship: $('#shippingOptions').prop('selectedIndex'),
      fn: $('#firstName').val(),
      ln: $('#lastName').val(),
      email: $('#email').val(),
      ph: $('#phone').val(),
      cell: $('#cellPhone').val(),
      co: $('#company').val(),
      street: $('#street').val(),
      city: $('#city').val(),
      state: $('#state').val(),
      postal: $('#postalCode').val(),
      ccType: $('#ccType').val(),
      ccNo: $('#ccNumber').val(),
      ccSec: $('#ccSecCode').val(),
      ccMonth: $('#ccExpMonth').val(),
      ccYear: $('#ccExpYear').val(),
      ccFn: $('#ccFirstName').val(),
      ccLn: $('#ccLastName').val(),
      ccStreet: $('#ccStreet').val(),
      ccCity: $('#ccCity').val(),
      ccState: $('#ccState').val(),
      ccPostal: $('#ccPostalCode').val(),
      promoCode: promoCode,
      msg: $('#specialInstructions').val(),
      repId: $('#repId').val(),
    };
    data = JSON.stringify(data);

    var url = 'https://etrack.ws/ws.svc/saveWebForm2';
    console.log(data);
    $.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      data: data,
      dataType: 'json',
      processdata: false,
      success: function (data) {
        $('#ccNumber').val('');
        $('#ccSecCode').val('');

        goTo('http://easitrack.com/thank-you-order.html');
      },
      error: function (a, b, c) {
        alert(
          'Sorry, something happend and we could not get your order.  Please try again.'
        );
      },
      async: false,
    });
  } catch (err) {
    alert('buyNow: ' + err.description);
  }
}

function saveWebForm(data, isSLL) {
  try {
    if (isSLL == undefined) {
      isSLL = false;
    }

    var result = dbSaveForm('saveWebForm', data, true, false, isSLL);

    return result;
  } catch (err) {
    alert('saveWebForm: ' + err.description);
  }
}

function goTo(thisPage) {
  location.href = thisPage;
}

function loadUnsubscribeInfo() {
  try {
    var id = getParameterByName('id');
    if (id == undefined) {
      id = '';
    }
    if (id.length > 0) {
      var data = 'id=' + escape(id);
      var result = dbReadWrite('contactUnsubscribe', data, true, false);

      if (result) {
        if (result.info) {
          if (result.info.length > 0) {
            jsonInfo = eval('(' + result.info[0] + ')');
            $('#contactName').html(jsonInfo.name);
            $('#quote').html('"' + jsonInfo.quote + '"');
          }
        }
      }
    }
  } catch (err) {
    alert('loadUnsubscribeInfo: ' + err.description);
  }
}

function loadCustomer(t) {
  try {
    var data = 'token=' + t;
    var jsonItem = getDb('getShoppingCartInfo', data);

    $('#firstName').val(jsonItem.fn);
    $('#lastName').val(jsonItem.ln);
    $('#email').val(jsonItem.email);
    $('#phone').val(jsonItem.ph);
    $('#company').val(jsonItem.co);
    $('#street').val(jsonItem.street);
    $('#city').val(jsonItem.city);
    $('#state').val(jsonItem.state);
    $('#postalCode').val(jsonItem.postalCode);
    $('#ccType').val(jsonItem.ccType);
    $('#ccNumber').val(jsonItem.ccNo);
    $('#ccExpMonth').val(jsonItem.ccMonth);
    $('#ccExpYear').val(jsonItem.ccYear);
    $('#ccFirstName').val(jsonItem.ccFn);
    $('#ccLastName').val(jsonItem.ccLn);
    $('#ccStreet').val(jsonItem.ccStreet);
    $('#ccCity').val(jsonItem.ccCity);
    $('#ccState').val(jsonItem.ccState);
    $('#ccPostalCode').val(jsonItem.ccPostalCode);
    $('#firstName').val(jsonItem.fn);

    loadPrices(1);
    itm1 = jsonItem.price;
    $('.itm1').attr('data-price', itm1.toFixed(2)).html(itm1.toFixed(2));
    calcForm();

    isResultOk = true;
  } catch (err) {
    alert('loadCustomer: ' + err.description);
  }
}

function getFamousQuote() {
  try {
    var data = 'type=' + escape('6C3BC03F-B6DC-44BD-A238-B4B52D59CC07');
    var result = dbReadWrite('getFamousQuote', data, true, false);
    if (result) {
      if (result.quote) {
        if (result.quote.length > 0) {
          jsonInfo = eval('(' + result.quote[0] + ')');
          $('#quote').html('"' + jsonInfo.quote + '"');
        }
      }
    }
  } catch (err) {
    alert('getFamousQuote: ' + err.description);
  }
}

function getAccessLink() {
  try {
    var data =
      'formId=' +
      escape($('#formId').val()) +
      '&fn=' +
      escape($('#firstName').val()) +
      '&ln=' +
      escape($('#lastName').val()) +
      '&ph=' +
      escape($('#phone').val()) +
      '&email=' +
      escape($('#email').val()) +
      '&repId=' +
      escape($('#repId').val());

    var result = saveWebForm(data);

    $('#firstName').val('');
    $('#lastName').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#repId').val('');

    goTo('thank-you-live-demo.html');
  } catch (err) {
    alert('getAccessLink: ' + err.description);
  }
}

function dbSaveForm(methodName, data, alertFailure, isAsync, isSLL) {
  var ret = true;
  var jsonObj = false;

  if (isAsync == undefined) {
    isAsync = true;
  }

  if (isSLL == undefined) {
    isSLL = false;
  }

  if (alertFailure == undefined) {
    alertFailure = true;
  }

  try {
    if (methodName == undefined || methodName == null) {
      alert('Invalid method name');
      ret = false;
    } else {
      if (data == undefined || data == null) {
        data = '';
      }

      var url = 'ws.svc/' + methodName;

      if (isSLL == true) {
        url = 'https://eTrack.ws/' + url;
      }

      jQuery.ajax({
        url: url,
        data: data,
        dataType: 'xml',
        type: 'POST',
        success: function (xml, textStatus) {
          if (textStatus == 'success') {
            if ($('string', xml).text() == 'failure') {
              ret = false;
            } else {
              jsonObj = eval('(' + $('string', xml).text() + ')');
              if (jsonObj.result == 'failure') {
                if (alertFailure == true) {
                  alert(jsonObj.error);
                }
                if (jsonObj.error == 'LOGOUT') {
                  logout();
                } else {
                  ret = false;
                }
              } else {
                ret = true;
              }
            }
          } else {
            ret = false;
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          //alert(errorThrown);
          ret = false;
        },
        async: isAsync,
      });
    }

    return jsonObj;
  } catch (err) {
    alert('dbReadWrite: Error loading ' + methodName);
    return false;
  }
}

function getPrice() {
  try {
    var prices = false;
    $.ajax({
      type: 'GET',
      url: 'https://etrack.ws/ws.svc/getPrice',
      crossDomain: true,
      contentType: 'application/json',
      data: 0,
      dataType: 'json',
      processdata: false,
      success: function (data) {
        prices = data;
      },
      error: function (a, b, c) {
        prices = { device: 129, service: 17.99 };
      },
      async: false,
    });

    return prices;
  } catch (err) {}
}

function qtyfunction() {
  if ($('.optionalCheck').is(':checked') && $('.optionalcable').is(":visible"))
    $('#custom3').val($('#qty').val());
  calcForm();

}
function buyNowN() {
    try {
        debugger;
        //Valida the CC
        var isValidCC = false;
        isValidCC = ValidateCreditCard();
        if (!isValidCC) {
            alert('Invalid Credit Card number');
            return;
        }

        //Validate the email
        var isValidEmail = false;
        validateEmail($('#email').val());
        if (!validateEmail) {
            alert('Invalid Email Address');
            return;
        }

        var serviceId = 0;
        if ($('#cbxServices').length == 0) {
            serviceId = 2;
        }
        else {
            serviceId = $('#cbxServices').val();
            if (serviceId == '0') {
                alert('Please select a service edition');
                return;
            }
        }

        var qty = 0;
        qty = $('#qty').val();
        if (qty <= 0) {
            alert('Please enter a quantity');
            return;
        }

        var isOBDOption = false;
        try {
            if ($('#obdConnector').is(':checked')) {
                isOBDOption = true;
            }
        }
        catch (err) {
            isOBDOption = false;
        }

        var isPostedSLOption = false;
        try {
            if ($('#postedSpeedLimit').is(':checked')) {
                isPostedSLOption = true;
            }
        }
        catch (err) {
            isPostedSLOption = false;
        }

        var data = {
            'formId=': escape($('#formId').val()),
            'qty': escape(qty),
            'serviceId': escape(serviceId),
            'isOBDOption': escape(isOBDOption),
            'isPostedSLOption': escape(isPostedSLOption),
            'ship': escape($('#shippingOptions').prop('selectedIndex')),
            'firsName': escape($('#firstName').val()),
            'lastName': escape($('#lastName').val()),
            'email': escape($('#email').val()),
            'phone': escape($('#phone').val()),
            'cell': escape($('#cellPhone').val()),
            'co': escape($('#company').val()),
            'street': escape($('#street').val()),
            'city': escape($('#city').val()),
            'state': escape($('#state').val()),
            'postal': escape($('#postalCode').val()),
            'ccType': escape($('#ccType').val()),
            'ccNo': escape($('#ccNumber').val()),
            'ccSec': escape($('#ccSecCode').val()),
            'ccMonth': escape($('#ccExpMonth').val()),
            'ccYear': escape($('#ccExpYear').val()),
            'ccFn': escape($('#ccFirstName').val()),
            'ccLn': escape($('#ccLastName').val()),
            'ccStreet': escape($('#ccStreet').val()),
            'ccCity': escape($('#ccCity').val()),
            'ccState': escape($('#ccState').val()),
            'ccPostal': escape($('#ccPostalCode').val()),
            'promoCode': escape($('#promoCode').val()),
            'msg': escape($('#specialInstructions').val()),
            'repId': escape($('#repId').val())
        };
        var result = saveWebForm(data, true);

        $('#ccNumber').val('');
        $('#ccSecCode').val('');

        goTo('http://www.easitrack.com/thank-you-order.html');
    }
    catch (err) {
        alert('buyNow: ' + err.description);
    }
}

