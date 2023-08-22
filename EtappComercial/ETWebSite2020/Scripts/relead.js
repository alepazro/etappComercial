﻿var Relead = {
    generateId: function () {
        var a = "";
        var b = "0123456789abcdef";
        for (var c = 0; c < 32; c++) {
            var d = Math.floor(Math.random() * b.length);
            a += b.substring(d, d + 1)
        }
        return a
    },
    writeCookie: function (a, b, c) {
        var d = "";
        if (c) {
            var e = new Date;
            e.setTime(e.getTime() + c * 1e3);
            d = "; expires=" + e.toGMTString()
        }
        document.cookie = a + "=" + b + d + "; path=/"
    },
    readCookie: function (a) {
        var b = a + "=";
        var c = document.cookie.split(";");
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            while (e.charAt(0) == " ") {
                e = e.substring(1, e.length)
            }
            if (e.indexOf(b) == 0) {
                return e.substring(b.length, e.length)
            }
        }
        return null
    },
    track: function (a) {
        if (typeof releadTrackingLegacy != "undefined") {
            if (releadTrackingLegacy) {
                releadTrackingId = "LEGACY"
            }
        }
        if (typeof releadUseSSL == "undefined") {
            releadUseSSL = true
        }
        if (typeof releadTrackingId != "undefined") {
            var b = this.readCookie("_rlvid");
            var c = this.readCookie("_rlsid");
            if (!b) {
                b = this.generateId()
            }
            if (!c) {
                c = this.generateId()
            }
            var d = 30;
            this.writeCookie("_rlvid", b, 365 * 24 * 60 * 60);
            this.writeCookie("_rlsid", c, d * 60);
            var e = (document.location.protocol == "https:" && releadUseSSL ? "https://" : "http://") + "www.relead.com/tracker/";
            var f = e + "?i=" + encodeURIComponent(releadTrackingId) + "&v=" + b + "&s=" + c + "&h=" + encodeURIComponent(document.location.hostname) + "&t=" + encodeURIComponent(document.title) + "&r=" + encodeURIComponent(document.referrer) + "&lc=" + parseInt((new Date).getTime() / 1e3) + "&e=" + a;
            var g = new Image;
            g.src = f;
            setTimeout("Relead.track(1);", 1e3 * 60 * 3)
        }
    }
};
Relead.track(0)