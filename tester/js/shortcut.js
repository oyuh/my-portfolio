shortcut = {
    all_shortcuts: {},
    add: function(b, h, d) {
        var g = { type: "keydown", propagate: false, disable_in_input: false, target: document, keycode: false };
        if (!d) { d = g } else { for (var a in g) { if (typeof d[a] == "undefined") { d[a] = g[a] } } }
        var f = d.target;
        if (typeof d.target == "string") { f = document.getElementById(d.target) }
        var c = this;
        b = b.toLowerCase();
        var e = function(o) {
            o = o || window.event;
            if (d.disable_in_input) { var l; if (o.target) { l = o.target } else { if (o.srcElement) { l = o.srcElement } } if (l.nodeType == 3) { l = l.parentNode } if (l.tagName == "INPUT" || l.tagName == "TEXTAREA") { return } }
            if (o.keyCode) { code = o.keyCode } else { if (o.which) { code = o.which } }
            var n = String.fromCharCode(code).toLowerCase();
            if (code == 188) { n = "," }
            if (code == 190) { n = "." }
            var s = b.split("+");
            var r = 0;
            var p = { "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ":", "'": '"', ",": "<", ".": ">", "/": "?", "\\": "|" };
            var m = { esc: 27, escape: 27, tab: 9, space: 32, "return": 13, enter: 13, backspace: 8, scrolllock: 145, scroll_lock: 145, scroll: 145, capslock: 20, caps_lock: 20, caps: 20, numlock: 144, num_lock: 144, num: 144, pause: 19, "break": 19, insert: 45, home: 36, "delete": 46, end: 35, pageup: 33, page_up: 33, pu: 33, pagedown: 34, page_down: 34, pd: 34, left: 37, up: 38, right: 39, down: 40, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123 };
            var q = { shift: { wanted: false, pressed: false }, ctrl: { wanted: false, pressed: false }, alt: { wanted: false, pressed: false }, meta: { wanted: false, pressed: false } };
            if (o.ctrlKey) { q.ctrl.pressed = true }
            if (o.shiftKey) { q.shift.pressed = true }
            if (o.altKey) { q.alt.pressed = true }
            if (o.metaKey) { q.meta.pressed = true }
            for (var j = 0; k = s[j], j < s.length; j++) {
                if (k == "ctrl" || k == "control") {
                    r++;
                    q.ctrl.wanted = true
                } else {
                    if (k == "shift") {
                        r++;
                        q.shift.wanted = true
                    } else {
                        if (k == "alt") {
                            r++;
                            q.alt.wanted = true
                        } else {
                            if (k == "meta") {
                                r++;
                                q.meta.wanted = true
                            } else { if (k.length > 1) { if (m[k] == code) { r++ } } else { if (d.keycode) { if (d.keycode == code) { r++ } } else { if (n == k) { r++ } else { if (p[n] && o.shiftKey) { n = p[n]; if (n == k) { r++ } } } } } }
                        }
                    }
                }
            }
            if (r == s.length && q.ctrl.pressed == q.ctrl.wanted && q.shift.pressed == q.shift.wanted && q.alt.pressed == q.alt.wanted && q.meta.pressed == q.meta.wanted) {
                h(o);
                if (!d.propagate) {
                    o.cancelBubble = true;
                    o.returnValue = false;
                    if (o.stopPropagation) {
                        o.stopPropagation();
                        o.preventDefault()
                    }
                    return false
                }
            }
        };
        this.all_shortcuts[b] = { callback: e, target: f, event: d.type };
        if (f.addEventListener) { f.addEventListener(d.type, e, false) } else { if (f.attachEvent) { f.attachEvent("on" + d.type, e) } else { f["on" + d.type] = e } }
    },
    remove: function(a) {
        a = a.toLowerCase();
        var d = this.all_shortcuts[a];
        delete(this.all_shortcuts[a]);
        if (!d) { return }
        var b = d.event;
        var c = d.target;
        var e = d.callback;
        if (c.detachEvent) { c.detachEvent("on" + b, e) } else { if (c.removeEventListener) { c.removeEventListener(b, e, false) } else { c["on" + b] = false } }
    }
};