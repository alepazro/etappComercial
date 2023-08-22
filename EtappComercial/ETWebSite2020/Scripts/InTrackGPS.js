var currItemId = '';
var hasScrolled = 0;

function ourSystemHoverIn() {
    try {
        $('#ourSystemSubMenu').show();
    }
    catch (err) {
    }
}

function ourSystemHoverOut() {
    try {
        $('#ourSystemSubMenu').hide();
    }
    catch (err) {
    }
}

function ourSystemSubMenuHoverIn() {
    try {
        $('#ourSystemSubMenu').show();
    }
    catch (err) {
    }
}

function ourSystemSubMenuHoverOut() {
    try {
        $('#ourSystemSubMenu').hide();
    }
    catch (err) {
    }
}

function closeSubMenu() {
    try {
        $('#ourSystemSubMenu').hide();
    }
    catch (err) {
    }
}

function menuItemHoverIn() {
    try {
        var id = $(this).attr('id');
        if (currItemId != id) {
            var imgTag = $('#' + id).attr('data-imgTag');
            var imgName = 'Feature' + imgTag + 'Hover.png';
            $('#' + id).find('a').attr('style', 'background-image:url(ITImages/' + imgName + ');color:#FFF;');
        }
    }
    catch (err) {
    }
}

function menuItemHoverOut() {
    try {
        var id = $(this).attr('id');
        if (currItemId != id) {
            var imgTag = $('#' + id).attr('data-imgTag');
            var imgName = 'Feature' + imgTag + 'Unselected.png';
            $('#' + id).find('a').attr('style', 'background-image:url(ITImages/' + imgName + ');color:#666;');
        }
    }
    catch (err) {
    }
}

function setScreenScroll(obj) {
    try {
        if (hasScrolled == 0 && $(obj).position()) {
            var distanceToTop = $(obj).position().top - $(window).scrollTop();
            var halfScreen = (window.innerHeight || document.documentElement.clientHeight) / 2;
            if (distanceToTop > halfScreen) {
                $('html,body').animate({ scrollTop: jQuery(obj).position().top - 15 }, 1000);
                hasScrolled = 1;
            }
        }
    }
    catch (err) {
    }
}

function altMenuItemClicked(obj) {
    try {
        setScreenScroll(obj);
        var itmName = $(obj).attr('data-menuItem');
        var itmObj = $('#' + itmName).find('a');
        menuItemClicked(itmObj[0]);
    }
    catch (err) {
    }
}

function altMenuItemClicked2(obj, contentName) {
    try {
        setScreenScroll(obj);
        loadOtherContent(contentName);
    }
    catch (err) {
    }
}

function menuItemClicked(obj) {
    try {
        /* Unmark the currently selected item, if any */
        if ($('.menuItemSelected').length > 0) {
            var currId = $('.menuItemSelected').attr('id');
            var currImgTag = $('.menuItemSelected').attr('data-imgTag');
            var currImgName = 'Feature' + currImgTag + 'Unselected.png';
            $('#' + currId).removeClass('menuItemSelected').find('a').attr('style', 'background-image:url(ITImages/' + currImgName + ');color:#666;');
        }

        /* Define the new selected item */
        var newId = $(obj).parent().attr('id');
        var newImgTag = $(obj).parent().attr('data-imgTag');
        var newImgName = 'Feature' + newImgTag + 'Selected.png';
        var contentName = $(obj).parent().attr('data-content');
        $('#' + newId).addClass('menuItemSelected').find('a').attr('style', 'background-image:url(ITImages/' + newImgName + ');color:#FFF;');

        $('#featureContent').load('feature' + contentName + '.html');

        currItemId = newId;

        //if (window.__TrackingScript.ping) {
        //    __TrackingScript.ping();
        //}

    }
    catch (err) {
        alert('menuItemClicked: ' + err.message);
    }
}

function openLargeImage(imgName) {
    try {
        $("#imgDlgLargeImage").attr('src', 'ITImages/' + imgName + 'X900.png');
        $("#dlgLargeImage").dialog('open');
    }
    catch (err) {
        alert('openLargeImage: ' + err.message);
    }
}

function loadInitContent() {
    try {
        /* Define the selected item */
        var newId = 'mainMenuTracking';
        var newImgTag = $('#' + newId).attr('data-imgTag');
        var newImgName = 'Feature' + newImgTag + 'Selected.png';
        var contentName = $('#' + newId).attr('data-content');
        $('#' + newId).addClass('menuItemSelected').find('a').attr('style', 'background-image:url(ITImages/' + newImgName + ');color:#FFF;');

        loadOtherContent('Tracking');
        currItemId = newId;

    }
    catch (err) {
        alert('loadInitContent: ' + err.message);
    }
}

function loadOtherContent(contentName, withScroll) {
    try {
        $('#featureContent').load('feature' + contentName + '.html');
        if (withScroll) {
            $('html,body').animate({ scrollTop: 600 }, 'slow');
        }
    }
    catch (err) {
        alert('loadAuxMenu: ' + err.message);
    }
}
