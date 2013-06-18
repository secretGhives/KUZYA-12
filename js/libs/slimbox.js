/*
	Slimbox v2.04 - The ultimate lightweight Lightbox clone for jQuery
	(c) 2007-2010 Christophe Beyls <http://www.digitalia.be>
	MIT-style license.
*/
(function (w) {
    var E = w(window),
        u, f, F = -1,
        n, x, D, v, y, L, r, m = !window.XMLHttpRequest,
        s = [],
        l = document.documentElement,
        k = {}, t = new Image(),
        J = new Image(),
        H, a, g, p, I, d, G, c, A, K;
    w(function () {
        w("body").append(w([H = w('<div id="lbOverlay" />')[0], a = w('<div id="lbCenter" />')[0], G = w('<div id="lbBottomContainer" />')[0]]).css("display", "none"));
        g = w('<div id="lbImage" />').appendTo(a).append(p = w('<div id="lbNav" />').append([I = w('<a id="lbPrevLink" href="#" />').click(B)[0], d = w('<a id="lbNextLink" href="#" />').click(e)[0]])[0])[0];
        c = w('<div id="lbBottom" />').appendTo(G).append([w('<a id="lbCloseLink" href="#">x</a>').add(H).click(C)[0], A = w('<div id="lbCaption" />')[0], K = w('<div id="lbNumber" />')[0], w('<div style="clear: both;" />')[0]])[0]
    });
    w.slimbox = function (O, N, M) {
        u = w.extend({
            loop: false,
            overlayOpacity: 0.8,
            overlayFadeDuration: 400,
            resizeDuration: 400,
            resizeEasing: "swing",
            initialWidth: 250,
            initialHeight: 250,
            imageFadeDuration: 400,
            captionAnimationDuration: 400,
            counterText: "Image {x} of {y}",
            closeKeys: [27, 88, 67],
            previousKeys: [37, 80],
            nextKeys: [39, 78]
        }, M);
        if (typeof O == "string") {
            O = [
                [O, N]
            ];
            N = 0
        }
        y = E.scrollTop() + (E.height() / 2);
        L = u.initialWidth;
        r = u.initialHeight;
        w(a).css({
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }).show();
        v = m || (H.currentStyle && (H.currentStyle.position != "fixed"));
        if (v) {
            H.style.position = "absolute"
        }
        w(H).css("opacity", u.overlayOpacity).fadeIn(u.overlayFadeDuration);
        z();
        j(1);
        f = O;
        u.loop = u.loop && (f.length > 1);
        return b(N)
    };
    w.fn.slimbox = function (M, P, O) {
        P = P || function (Q) {
            return [Q.href, Q.title]
        };
        O = O || function () {
            return true
        };
        var N = this;
        return N.unbind("click").click(function () {
        	$(".step.active").hide()
            var S = this,
                U = 0,
                T, Q = 0,
                R;
            T = w.grep(N, function (W, V) {
                return O.call(S, W, V)
            });
            for (R = T.length; Q < R; ++Q) {
                if (T[Q] == S) {
                    U = Q
                }
                T[Q] = P(T[Q], Q)
            }
            return w.slimbox(T, U, M)
        })
    };

    function z() {
        if (v) {
            w(H).css({
                left: 0,
                top: 0
            })
        }
    }
    function j(M) {
        if (M) {
            w("object").add(m ? "select" : "embed").each(function (O, P) {
                s[O] = [P, P.style.visibility];
                P.style.visibility = "hidden"
            })
        } else {
            w.each(s, function (O, P) {
                P[0].style.visibility = P[1]
            });
            s = []
        }
        var N = M ? "bind" : "unbind";
        E[N]("scroll resize", z);
        w(document)[N]("keydown", o)
    }
    function o(O) {
        var N = O.keyCode,
            M = w.inArray;
        return (M(N, u.closeKeys) >= 0) ? C() : (M(N, u.nextKeys) >= 0) ? e() : (M(N, u.previousKeys) >= 0) ? B() : false
    }
    function B() {
        return b(x)
    }
    function e() {
        return b(D)
    }
    function b(M) {
        if (M >= 0) {
            F = M;
            n = f[F][0];
            x = (F || (u.loop ? f.length : 0)) - 1;
            D = ((F + 1) % f.length) || (u.loop ? 0 : -1);
            q();
            a.className = "lbLoading";
            k = new Image();
            k.onload = i;
            k.src = n
        }
        return false
    }
    function i() {
        a.className = "";
        w(g).css({
            backgroundImage: "url(" + n + ")",
            visibility: "hidden",
            display: ""
        });
        w(A).html(f[F][1] || "");
        w(K).html((((f.length > 1) && u.counterText) || "").replace(/{x}/, F + 1).replace(/{y}/, f.length));
        if (x >= 0) {
            t.src = f[x][0]
        }
        if (D >= 0) {
            J.src = f[D][0]
        }
        L = g.offsetWidth;
        r = g.offsetHeight;
        var M = Math.max(0, y - (r / 2));
        w(a).queue(function () {
            w(G).css({
                visibility: "hidden",
                display: ""
            });
            w(g).css({
                display: "none",
                visibility: "",
                opacity: ""
            }).fadeIn(u.imageFadeDuration, h)
        })
    }
    function h() {
        if (x >= 0) {
            w(I).show()
        }
        if (D >= 0) {
            w(d).show()
        }
        w(c).css("marginTop", -c.offsetHeight).animate({
            marginTop: 0
        }, u.captionAnimationDuration);
        G.style.visibility = ""
    }
    function q() {
        k.onload = null;
        k.src = t.src = J.src = n;
        w([a, g, c]).stop(true);
        w([I, d, g, G]).hide()
    }
    function C() {
    	$(".step.active").show()
        if (F >= 0) {
            q();
            F = x = D = -1;
            w(a).hide();
            w(H).stop().fadeOut(u.overlayFadeDuration, j)
        }
        return false
    }
})(jQuery);
if (!/android|iphone|ipod|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent)) {
    jQuery(function (a) {
        a("a[rel^='lightbox']").slimbox({}, null, function (b) {
            return (this == b) || ((this.rel.length > 8) && (this.rel == b.rel))
        });
        a("a[href^='http://picasaweb.google.'] > img:first-child[src]").parent().slimbox({}, function (b) {
            return [b.firstChild.src.replace(/\/s\d+(?:\-c)?\/([^\/]+)$/, "/s512/$1"), (b.title || b.firstChild.alt) + '<br /><a href="' + b.href + '">Picasa Web Albums page</a>']
        });
        a("a[href^='market://']").slimbox({}, function (b) {
            return ["http://chart.apis.google.com/chart?chs=400x400&cht=qr&chl=" + encodeURIComponent(b.href.replace(/\/\?/, "?")), b.title + "<br />Scan this barcode with your Android phone."]
        })
    })
};