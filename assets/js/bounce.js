(function () {
    'use strict';

    var defaults = {
        duration: 400,
        easing: function easing(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        to: 0
    };

    var animatedScrollTo = function animatedScrollTo(args) {
        if (isInteger(args)) {
            args = {
                to: args
            };
        }

        var options = extend(defaults, args);
        options.startingYOffset = window.pageYOffset;
        options.distanceYOffset = parseInt(options.to, 10) - options.startingYOffset;
        window.requestAnimationFrame(function (timestamp) {
            return animateScroll(options, timestamp);
        });
    };

    var animateScroll = function animateScroll(options, now) {
        if (!options.startTime) {
            options.startTime = now;
        }

        var currentTime = now - options.startTime;
        var newYOffset = Math.round(options.easing(currentTime, options.startingYOffset, options.distanceYOffset, options.duration));

        if (currentTime < options.duration) {
            window.requestAnimationFrame(function (timestamp) {
                return animateScroll(options, timestamp);
            });
        } else {
            newYOffset = options.to;
        }

        setScrollTopPosition(newYOffset);
    };

    var setScrollTopPosition = function setScrollTopPosition(newYOffset) {
        document.documentElement.scrollTop = newYOffset;
        document.body.scrollTop = newYOffset;
    };

    var isInteger = function isInteger(value) {
        if (Number.isInteger) {
            return Number.isInteger(value);
        } else {
            return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        }
    };

    var extend = function extend(defaults, options) {
        var extendedOptions = {};

        for (var key in defaults) {
            extendedOptions[key] = options[key] || defaults[key];
        }

        return extendedOptions;
    };


    var easeInOutQuint = function easeInOutQuint(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };

    document.getElementById('scroll-up').onclick = function () {
        animatedScrollTo({
            to: 0,
            easing: easeInOutQuint,
            duration: 2000
        });
    };
})();