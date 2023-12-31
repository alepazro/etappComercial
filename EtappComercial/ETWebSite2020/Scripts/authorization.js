﻿//et_02
var welcomeTitle = '';
var userFullName = '';
var userALID = 0;
var userIsAdmin = false;
var jsonAppFeatures = false;

function recoverCredentialsResponse(xml, textStatus) {
    try {
        if (textStatus == 'success') {
            if (($("string", xml).text()) == 'failure') {
                alert('We could not recover your credentials.  Please contact Support at support@easitrack.com.');
                return false;
            }
            var objResponse = $("string", xml).text();
            if (objResponse == '') {
                alert('Email not found.  Please try again.');
                return false;
            }
            var jsonResponse = eval('(' + objResponse + ')');
            if (jsonResponse.value == 'OK') {
                alert('Your credentials have been sent to your email.');
                location.href = 'https://easitrack.net/login.html';
            }
            else {
                alert('Email not found.  Please try again.');
            }
            return true;
        }
        else {
            alert('Sign in status: ' + textStatus);
            return false;
        }
    }
    catch (err) {
        alert('recoverCredentialsResponse: ' + err.description);
    }
}

function recoverCredentials() {
    try {
        var email = document.getElementById('txtEmail').value;
        var reqParams = 'email=' + escape(email);
        var url = "ETWS.asmx/recoverCredentials";
        $.post(url, reqParams, function (xml, textStatus) { recoverCredentialsResponse(xml, textStatus); });
    }
    catch (err) {
        alert('recoverCredentials: ' + err.description);
    }
}

function getFeatureALID(featureId) {
    try {
        var jsonFeature = false;
        var featureALID = 999;

        for (var ind = 0; ind < jsonAppFeatures.features.length; ind++) {
            jsonFeature = eval('(' + jsonAppFeatures.features[ind] + ')');

            if (featureId == jsonFeature.id) {
                featureALID = jsonFeature.minALID;
                break;
            }
        }

        return featureALID;
    }
    catch (err) {
        alert('getFeatureALID: ' + err.description);
    }
}

function validateUserAccess(featureId) {
    try {
        var isOk = false;
        if (jsonAppFeatures == false) {
            getAppFeatures();
        }
        if (jsonAppFeatures != false) {
            var featureALID = getFeatureALID(featureId);
            if (userALID >= featureALID) {
                isOk = true;
            }
        }
        if (isOk == false) {
            alert('Sorry, you dont have access to this feature. Please ask your System Administrator for assistance.');
        }
        return isOk;
    }
    catch (err) {
        alert('validateUserAccess: ' + err.description);
        return isOk;
    }
}

function getAppFeatures(moduleId) {
    try {
        if (jsonAppFeatures == false) {
            if (moduleId == undefined) {
                moduleId = 0;
            }
            var data = 't=' + getTokenCookie('ETTK') + '&moduleId=' + escape(moduleId);
            jsonAppFeatures = dbReadWrite('getAppFeatures', data, true, false);
        }
    }
    catch (err) {
        alert('getAppFeatures: ' + err.description);
    }
}

function setCookie(cName, t) {
    try {
        var exdate = new Date();
        var expiredays = 1;

        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = cName + "=" + escape(t) + "; expires=" + exdate.toUTCString();
    }
    catch (err) {
        alert('setTokenCookie: ' + err.Description);
    }
}

function setTokenCookie(jsonResponse) {
    try {
        var exdate = new Date();
        var expiredays = 1;

        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = jsonResponse.tokenCookie + "=" + escape(jsonResponse.token) + "; expires=" + exdate.toUTCString();
    }
    catch (err) {
        alert('setTokenCookie: ' + err.Description);
    }
}

function getTokenCookie(c_name) {
    try {
        var t = "";
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                t = unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return t;
    }
    catch (err) {
        alert('getTokenCookie: ' + err.Description);
    }
}
function deleteTokenCookie(c_name) {
    try {
        if (document.cookie.length > 0) {
            document.cookie = c_name + "=";
        }
    }
    catch (err) {
        alert('deleteTokenCookie: ' + err.Description);
    }
}

//Main Navigation
//1: Tracking, 2: Reports, 3: Settings
function changePanel(panelId) {
    try {
        if (panelId == 1) {
            location.href = 'Tracking.html';
        }
        else {
            if (panelId == 2) {
                location.href = 'Reports.html';
            }
            else {
                if (panelId == 3) {
                    location.href = 'Settings.html';
                }
                else {
                    if (panelId == 4) {
                        location.href = 'Multi-Tracking.html';
                    }
                    else {
                        if (panelId == 5) {
                            location.href = 'maintenance.html';
                        }
                        else {
                            if (panelId == 6) {
                                location.href = 'notifications.html';
                            }
                            else {
                                if (panelId == 7) {
                                    location.href = 'dashboard.html';
                                }
                                else {
                                    alert('changePanel: Undefined panel id');
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    catch (err) {
        alert('changePanel: ' + err.description);
    }
}

// Credentials
function validateCredentialsResponse(xml, textStatus, isMobile) {
    try {
        if (textStatus == 'success') {
            if (($("string", xml).text()) == 'failure') {
                alert('Login failed.  Please try again.');
                return false;
            }
            var objResponse = $("string", xml).text();
            if (objResponse == '') {
                alert('Invalid Credentials.  Please try again.');
                return false;
            }
            var jsonResponse = eval('(' + objResponse + ')');
            if (jsonResponse.result == 'failure') {
                alert(jsonResponse.error);
                return false;
            }
            else {
                setTokenCookie(jsonResponse);

                welcomeTitle = jsonResponse.welcomeTitle;
                userFullName = jsonResponse.fullName;
                userALID = jsonResponse.accessLevelId;

                document.getElementById('txtLogin').value = '';
                document.getElementById('txtPassword').value = '';

                if (isMobile == true) {
                    location.href = 'mDevicesList.html';
                }
                else {
                    location.href = 'tracking.html';
                }
                return true;
            }
        }
        else {
            alert('Sign in status: ' + textStatus);
            return false;
        }
    }
    catch (err) {
        alert('validateCredentialsResponse: ' + err.Description);
        return false;
    }
}
function validateCredentials(isMobile) {
    try {
        if (isMobile == undefined) {
            isMobile = false;
        }
        var login = document.getElementById('txtLogin').value;
        var pw = document.getElementById('txtPassword').value;
        var reqParams = 'Login=' + escape(login) + '&pw=' + escape(pw);
        var url = "ETWS.asmx/ValidateCredentials";
        $.post(url, reqParams, function (xml, textStatus) { validateCredentialsResponse(xml, textStatus, isMobile); });
    }
    catch (err) {
        alert('validateCredentials: ' + err.Description);
    }
}

function logout() {
    try {
        deleteTokenCookie('ETTK');
        location.href = 'https://easitrack.net/login.html';
    }
    catch (err) {
        alert('Logout: ' + err.Description);
    }
}

function validateToken(isMobile, sourcePage) {

    //This has to be placed outside the try...catch to permit its use in the catch.
    if (isMobile == undefined) {
        isMobile = false;
    }
    if (sourcePage == undefined) {
        sourcePage = '';
    }

    var loginPage = ''
    if (isMobile == true) {
        loginPage = 'mhttps://easitrack.net/login.html';
    }
    else {
        loginPage = 'https://easitrack.net/login.html';
    }

    try {
        var t = getTokenCookie('ETTK');
        var ret = false;
        if ((t == null) || (t == '')) {
            if (location.pathname.toLowerCase().indexOf(loginPage.toLowerCase()) == -1) {
                location.href = loginPage;
            }
            return false;
        }
        else {
            jQuery.ajax({
                url: 'ETWS.asmx/validateToken',
                data: 't=' + escape(t) + '&sourcePage=' + escape(sourcePage) + '&sourceId=' + escape('WEB'),
                dataType: 'xml',
                type: "POST",
                success: function (xml, textStatus) {
                    if (textStatus == 'success') {

                        var objResponse = $("string", xml).text();
                        if (objResponse == '') {
                            alert('Invalid Credentials.  Please try again.');
                            return false;
                        }
                        var jsonResponse = eval('(' + objResponse + ')');
                        if (jsonResponse.isValid == true) {

                            welcomeTitle = jsonResponse.welcomeTitle;
                            userFullName = jsonResponse.fullName;
                            userALID = jsonResponse.accessLevelId;
                            userIsAdmin = jsonResponse.isAdministrator;
                            if (isMobile == true) {
                            }
                            else {
                                if (location.pathname.toLowerCase().indexOf('tracking.html') == -1 &&
                                location.pathname.toLowerCase().indexOf('reports.html') == -1 &&
                                location.pathname.toLowerCase().indexOf('notifications.html') == -1 &&
                                location.pathname.toLowerCase().indexOf('maintenance.html') == -1 &&
                                location.pathname.toLowerCase().indexOf('dashboard.html') == -1 &&
                                location.pathname.toLowerCase().indexOf('settings.html') == -1 &&
                                location.pathname.toLowerCase().indexOf('account.html') == -1 &&
                                location.pathname.toLowerCase().indexOf('settings_v2.html') == -1) {
                                    location.href = 'tracking.html';
                                }
                            }
                            ret = true;
                        }
                        else {
                            if (location.pathname.toLowerCase().indexOf('https://easitrack.net/login.html') == -1) {
                                location.href = loginPage;
                            }
                            ret = false;
                        }
                    }
                    else {
                        alert('Error validating token');
                        ret = false;
                    }
                },
                error: function (result) {
                    alert('Error validating token');
                    ret = false;
                },
                async: false
            });
        }
        return ret;
    }
    catch (err) {
        if (location.pathname.toLowerCase().indexOf(loginPage.toLowerCase()) == -1) {
            location.href = loginPage;
            return false;
        }
    }
}

function validateDemoToken() {
    try {
        var token = getParameterByName('t');
        if (token.length > 0) {
            data = 't=' + escape(token);
            var jsonResponse = dbReadWrite('validateDemoToken', data, true, false);
            setTokenCookie(jsonResponse);
            welcomeTitle = jsonResponse.welcomeTitle;
            userFullName = jsonResponse.fullName;
            userALID = jsonResponse.accessLevelId;
            location.href = 'tracking.html';
            return true;
        }
        else {
            alert('Invalid access token');
            return false;
        }
    }
    catch (err) {
        alert('validateDemoToken: ' + err.description);
    }
}

function getUserGUIDParam() {
    try {
        var userGUID = getParameterByName('userGUID');
        if (userGUID != '') {
            var data = 'userGUID=' + userGUID;
            var jsonToken = dbReadWrite('getTokenFromUserGUID', data, true, false);
            if (jsonToken.token != '') {
                setTokenCookie(jsonToken);
            }
        }
    }
    catch (err) {
    }
}
