var promoPrice = 0;
var promoPriceService = 0;
var promoPriceActivation = 0;
var promoPriceOBD = 0;
var promoPricePostedSL = 0;
var itm1 = 0;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function applyPromoCode() {
    try {
        promoPrice = 0;
        promoPriceService = 0;
        promoPriceOBD = 0;

        var promoCode = $('#promoCode').val();

        switch(promoCode) {
            case '43367':
                promoPrice = 159;
                alert('Valid Promotion Code!');
                break;
            case '16935':
                promoPrice = 169;
                alert('Valid Promotion Code!');
                break;
            case '65890':
                promoPrice = 149;
                alert('Valid Promotion Code!');
                break;
            case '37213':
                promoPrice = 139;
                alert('Valid Promotion Code!');
                break;
            case 'SPE129':
                promoPrice = 129;
                alert('Valid Promotion Code!');
                break;
            case 'STQ129':
                promoPrice = 129;
                alert('Valid Promotion Code!');
                break;
            case 'SPE119':
                promoPrice = 119;
                alert('Valid Promotion Code!');
                break;
            case 'AWQ119':
                promoPrice = 119;
                alert('Valid Promotion Code!');
                break;
            case 'BF99':
                promoPrice = 99;
                alert('Valid Promotion Code!');
                break;
            case 'SPE109':
                promoPrice = 109;
                alert('Valid Promotion Code!');
                break;
            case 'REW109':
                promoPrice = 109;
                alert('Valid Promotion Code!');
                break;
            case 'XMAS978':
                promoPrice = 109;
                alert('Valid Promotion Code!');
                break;
            default:
                promoPrice = 119;
        }

        calcForm();
    }
    catch (err) {
        alert('applyPromoCode: ' + err.description);
    }
}

function loadServicePrice() {
    try {
        var itm2 = 0.00;
        if ($('#cbxServices').length == 0) {
            itm2 = 17.99;
        }
        else {
            var serviceId = $('#cbxServices').val();
            switch (serviceId) {
                case "0":
                    itm2 = 0.00;
                    break;
                case "11":
                    itm2 = 9.99;
                    break;
                case "12":
                    itm2 = 15.99;
                    break;
                case "13":
                    itm2 = 17.99; //17.99
                    break;
                case "14":
                    itm2 = 19.99;
                    break;
                case "15":
                    itm2 = 13.99;
                    break;
                default:
                    itm2 = 0.00;
            }
        }
        return itm2;
    }
    catch (err) {
        alert('loadServicePrice: ' + err.description);
    }
}

function loadPrices(qty) {
    try {

        if (qty == undefined) {
            qty = 1;
        }

        if (itm1 == 0) {
            itm1 = 119.00; //129
            if (qty <= 2) {
                itm1 = 119.00; //129
            }
            else {
                if (qty <= 5) {
                    itm1 = 119.00; //129
                }
                else {
                    if (qty < 10) {
                        itm1 = 109.00; //119
                    }
                    else {
                        if (qty < 20) {
                            itm1 = 109.00; //109
                        }
                        else {
                            if (qty >= 20) {
                                itm1 = 1199.00; //99
                            }
                            else {
                                itm1 = 119.00; //149
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
        var itm3 = 0.00;  //Activation
        if (promoPriceActivation > 0) {
            itm3 = promoPriceActivation;
        }
        var itm4 = 15.00; //OBD Connector
        if (promoPriceOBD > 0) {
            itm4 = promoPriceOBD;
        }
        var itm5 = 4.00; //Posted Speed Limit
        if (promoPricePostedSL > 0) {
            itm4 = promoPricePostedSL;
        }

        $('.itm1').attr('data-price', itm1.toFixed(2)).html(itm1.toFixed(2));
        $('.itm2').attr('data-price', itm2.toFixed(2)).html(itm2.toFixed(2));
        $('.itm3').attr('data-price', itm3.toFixed(2)).html(itm3.toFixed(2));
        $('.itm4').attr('data-price', itm4.toFixed(2)).html(itm4.toFixed(2));
        $('.itm5').attr('data-price', itm5.toFixed(2)).html(itm5.toFixed(2));

    }
    catch (err) {
        alert('loadPrices: ' + err.description);
    }
}

function onEdit(obj) {
    try {
        $(obj).addClass('leftAligned');
        obj.select();
    }
    catch (err) {
        alert('onEdit: ' + err.description);
    }
}

function onEndEdit(obj) {
    try {
        $(obj).removeClass('leftAligned');
    }
    catch (err) {
        alert('onEndEdit: ' + err.description);
    }
}

function calcForm() {
    try {
        var qty = document.getElementById('qty').value;
        if (qty.length == 0) {
            qty = '0';
        }

        if (!(/^[0-9]+$/.test(qty))) {
            alert('Please enter a valid quantity');
        }
        else {
            qty = parseInt(qty);

            var price = 0;
            var itemTotal = 0;
            var orderSubtotal = 0;

            //Adjust price depending on qty
            loadPrices(qty);

            $('.orderItem').each(function () {
                price = $(this).find('.itemPrice').attr('data-price');
                if (price == undefined) {
                    price = 0;
                }
                itemTotal = price * qty;
                $(this).find('.enteredQty').html(qty);
                $(this).find('.itemTotal').html(itemTotal.toFixed(2));
                orderSubtotal = orderSubtotal + itemTotal;
            });

            $('.optionalOrderItem').each(function () {
                if ($(this).find('.optionalCheck').is(':checked')) {
                    price = $(this).find('.itemPrice').attr('data-price');
                    if (price == undefined) {
                        price = 0;
                    }
                    itemTotal = price * qty;
                    $(this).find('.enteredQty').html(qty);
                    $(this).find('.itemTotal').html(itemTotal.toFixed(2));
                    orderSubtotal = orderSubtotal + itemTotal;
                }
                else {
                    $(this).find('.enteredQty').html('0');
                    $(this).find('.itemTotal').html('0.00');
                };
            });

            $('.subTotal').html(orderSubtotal.toFixed(2));

            $('.shippingItem').find('.enteredQty').html(qty);
            price = $('#shippingOptions').val();

            itemTotal = price * 1;//qty;
            $('.shippingTotal').html(itemTotal.toFixed(2));

            orderSubtotal = orderSubtotal + itemTotal;
            $('.grandTotal').html(orderSubtotal.toFixed(2));
            var editionIndex = $('#cbxServices').prop('selectedIndex');
            var shippingIndex = $('#shippingOptions').prop('selectedIndex');

            //Sets cookies
            var exdate = new Date();
            var expiredays = 100;
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = "ETQTY=" + qty + "; expires=" + exdate.toUTCString();
            document.cookie = "ETED=" + editionIndex + "; expires=" + exdate.toUTCString();
            document.cookie = "ETSH=" + shippingIndex + "; expires=" + exdate.toUTCString();
        }

    }
    catch (err) {
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

        if (docId.length > 0) {
            var data = 'd=' + escape(docId);
            var result = dbReadWrite('getDocQty', data, true, false);
            if (result) {
                if (result.doc) {
                    if (result.doc.length > 0) {
                        jsonDoc = eval('(' + result.doc[0] + ')');
                    }
                }
            }
        }

        if (etqty) {
            var qty = unescape(etqty[2]);
            if (jsonDoc) {
                qty = jsonDoc.qty;
            }
            $('#qty').val(qty);
            if (eted) {
                var editionIndex = unescape(eted[2]);
                if (jsonDoc) {
                    editionIndex = jsonDoc.editionOption;
                }
                $('#cbxServices').prop('selectedIndex', editionIndex);
            }
            if (etsh) {
                var shippingIndex = unescape(etsh[2]);
                if (jsonDoc) {
                    shippingIndex = jsonDoc.shippingOption;
                }
                $('#shippingOptions').prop('selectedIndex', shippingIndex);
            }

            loadPrices(qty);
            calcForm();
        }

    }
    catch (err) {
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
    }
    catch (err) {
        alert('copyShippingInfo: ' + err.description);
    }
}

function anonFeedback() {
    try {
        var data = 'formId=' + escape($('#formId2').val()) +
                   '&msg=' + escape($('#message2').val());

        var result = https://easitrack.com/etws.asmx/saveWebForm(data);

        alert('Thank you!');

        $('#message2').val('');
    }
    catch (err) {
        alert('anonFeedback: ' + err.description);  
    }
}

function contactUs() {
    try {
        var data = 'formId=' + escape($('#formId').val()) +
                   '&msg=' + escape($('#message').val()) + 
                   '&fn=' + escape($('#firstName').val()) +
                   '&ln=' + escape($('#lastName').val()) +
                   '&ph=' + escape($('#phone').val()) +
                   '&email=' + escape($('#email').val()) +
                   '&repId=' + escape($('#repId').val());

        var result = https://easitrack.com/etws.asmx/saveWebForm(data);

        $('#message').val('');
        $('#firstName').val('');
        $('#lastName').val('');
        $('#email').val('');
        $('#phone').val('');
        $('#repId').val('');

        goTo('thank-you-contact.html');
    }
    catch (err) {
        alert('contactUs: ' + err.description);
    }
}

function getQuote() {
    try {
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

        var data = 'formId=' + escape($('#formId').val()) +
                   '&qty=' + escape(qty) +
                   '&serviceId=' + escape(serviceId) +
                   '&ship=' + escape($('#shippingOptions').prop('selectedIndex')) +
                   '&fn=' + escape($('#firstName').val()) +
                   '&ln=' + escape($('#lastName').val()) +
                   '&email=' + escape($('#email').val()) +
                   '&ph=' + escape($('#phone').val()) +
                   '&co=' + escape($('#company').val()) +
                   '&repId=' + escape($('#repId').val());

//        var data = 'formId=' + escape($('#formId').val()) +
//                   '&qty=' + escape($('#qty').val()) +
//                   '&ship=0' +
//                   '&fn=' + escape($('#firstName').val()) +
//                   '&ln=' + escape($('#lastName').val()) +
//                   '&email=' + escape($('#email').val()) +
//                   '&ph=' + escape($('#phone').val()) +
//                   '&co=' + escape($('#company').val());

        var result = saveWebForm(data);

        goTo('thank-you-quote.html');
    }
    catch (err) {
        alert('getQuote: ' + err.description);
    }
}

function buyNow() {
    try {
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

        var data = 'formId=' + escape($('#formId').val()) +
                   '&qty=' + escape(qty) +
                   '&serviceId=' + escape(serviceId) +
                   '&isOBDOption=' + escape(isOBDOption) +
                   '&isPostedSLOption=' + escape(isPostedSLOption) +
                   '&ship=' + escape($('#shippingOptions').prop('selectedIndex')) +
                   '&fn=' + escape($('#firstName').val()) +
                   '&ln=' + escape($('#lastName').val()) +
                   '&email=' + escape($('#email').val()) +
                   '&ph=' + escape($('#phone').val()) +
                   '&cell=' + escape($('#cellPhone').val()) +
                   '&co=' + escape($('#company').val()) +
                   '&street=' + escape($('#street').val()) +
                   '&city=' + escape($('#city').val()) +
                   '&state=' + escape($('#state').val()) +
                   '&postal=' + escape($('#postalCode').val()) +
                   '&ccType=' + escape($('#ccType').val()) +
                   '&ccNo=' + escape($('#ccNumber').val()) +
                   '&ccSec=' + escape($('#ccSecCode').val()) +
                   '&ccMonth=' + escape($('#ccExpMonth').val()) +
                   '&ccYear=' + escape($('#ccExpYear').val()) +
                   '&ccFn=' + escape($('#ccFirstName').val()) +
                   '&ccLn=' + escape($('#ccLastName').val()) +
                   '&ccStreet=' + escape($('#ccStreet').val()) +
                   '&ccCity=' + escape($('#ccCity').val()) +
                   '&ccState=' + escape($('#ccState').val()) +
                   '&ccPostal=' + escape($('#ccPostalCode').val()) +
                   '&promoCode=' + escape($('#promoCode').val()) +
                   '&msg=' + escape($('#specialInstructions').val()) +
                   '&repId=' + escape($('#repId').val());

        var result = saveWebForm(data, true);

        $('#ccNumber').val('');
        $('#ccSecCode').val('');

        goTo('http://www.easitrack.com/thank-you-order.html');
    }
    catch (err) {
        alert('buyNow: ' + err.description);
    }
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
                'formId=':escape($('#formId').val()),
                'qty':escape(qty),
                'serviceId':escape(serviceId),
                'isOBDOption':escape(isOBDOption),
                'isPostedSLOption':escape(isPostedSLOption),
                'ship': escape($('#shippingOptions').prop('selectedIndex')),
                'firsName':escape($('#firstName').val()) ,
                'lastName':escape($('#lastName').val()) ,
                'email':escape($('#email').val()) ,
                'phone':escape($('#phone').val()) ,
                'cell':escape($('#cellPhone').val()) ,
                'co':escape($('#company').val()) ,
                'street':escape($('#street').val()) ,
                'city':escape($('#city').val()) ,
                'state':escape($('#state').val()) ,
                'postal':escape($('#postalCode').val()) ,
                'ccType':escape($('#ccType').val()) ,
                'ccNo':escape($('#ccNumber').val()) ,
                'ccSec':escape($('#ccSecCode').val()) ,
                'ccMonth':escape($('#ccExpMonth').val()) ,
                'ccYear':escape($('#ccExpYear').val()) ,
                'ccFn':escape($('#ccFirstName').val()) ,
                'ccLn':escape($('#ccLastName').val()) ,
                'ccStreet':escape($('#ccStreet').val()) ,
                'ccCity':escape($('#ccCity').val()) ,
                'ccState':escape($('#ccState').val()) ,
                'ccPostal':escape($('#ccPostalCode').val()) ,
                'promoCode':escape($('#promoCode').val()) ,
                'msg':escape($('#specialInstructions').val()) ,
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


function saveWebForm(data, isSLL) {
    try {
        debugger;
        debugger;
        if (isSLL == undefined) {
            isSLL = false;
        }
        debugger;
        var result = dbReadWriteNew('saveWebForm', data, true, false, isSLL);

        return result;
    }
    catch (err) {
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
    }
    catch (err) {
        alert('loadUnsubscribeInfo: ' + err.description);
    }
}

function loadCustomer(t) {
    try {
        var data = 't=' + t;
        var jsonCompany = dbReadWrite('getShoppingCartInfo', data, true, false);
        if (jsonCompany.shoppingCart.length == 1) {
            var jsonItem = eval('(' + jsonCompany.shoppingCart[0] + ')');

            if (jsonItem.result == true) {
                $('#firstName').val(jsonItem.firstName);
                $('#lastName').val(jsonItem.lastName);
                $('#email').val(jsonItem.email);
                $('#phone').val(jsonItem.phone);
                $('#company').val(jsonItem.companyName);
                $('#street').val(jsonItem.street);
                $('#city').val(jsonItem.city);
                $('#state').val(jsonItem.state);
                $('#postalCode').val(jsonItem.postalCode);
                //$('#ccType').val(jsonItem.ccType);
                //$('#ccNumber').val(jsonItem.ccNumber);
                //$('#ccExpMonth').val(jsonItem.ccExpMonth);
                //$('#ccExpYear').val(jsonItem.ccExpYear);
                $('#ccFirstName').val(jsonItem.ccFirstName);
                $('#ccLastName').val(jsonItem.ccLastName);
                $('#ccStreet').val(jsonItem.ccStreet);
                $('#ccCity').val(jsonItem.ccCity);
                $('#ccState').val(jsonItem.ccState);
                $('#ccPostalCode').val(jsonItem.ccPostalCode);
                $('#firstName').val(jsonItem.firstName);

                loadPrices(1);
                itm1 = jsonItem.price;
                $('.itm1').attr('data-price', itm1.toFixed(2)).html(itm1.toFixed(2));
                calcForm();

                isResultOk = true;
            }
        }

    }
    catch (err) {
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
    }
    catch (err) {
        alert('getFamousQuote: ' + err.description);
    }
}

function getAccessLink() {
    try {
        var data = {
            "formId": escape($('#formId').val()),
            "qty": "0",
            "serviceId": "0",
            "isOBDOption": false,
            "isPostedSLOption": false,
            "ship": "0",
            "firsName": escape($('#firstName').val()),
            "lastName": escape($('#lastName').val()),
            "email": escape($('#email').val()),
            "phone": escape($('#phone').val()),
            "cell": "",
            "co": "",
            "street": "",
            "city": "",
            "state": "",
            "postal": "",
            "ccType": "",
            "ccNo": "",
            "ccSec": "",
            "ccMonth": "0",
            "ccYear": "0",
            "ccFn": "",
            "ccLn": "",
            "ccStreet": "",
            "ccCity": "",
            "ccState": "",
            "ccPostal": "",
            "promoCode": "",
            "msg": "",
            "repId": escape($('#repId').val())
        };

        var result = saveWebForm(data);

        $('#firstName').val('');
        $('#lastName').val('');
        $('#email').val('');
        $('#phone').val('');
        $('#repId').val('');

        goTo('thank-you-live-demo.html');
    }
    catch (err) {
        alert('getAccessLink: ' + err.description);
    }
}

