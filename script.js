/**
 * 1DA — Official Music Website
 * Nav, scroll reveals, track highlight + now-playing label, mailing list
 */

(function () {
    'use strict';

    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var open = navLinks.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Scroll reveal ---
    var revealEls = document.querySelectorAll('.reveal');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (revealEls.length && !reduceMotion) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
        );

        revealEls.forEach(function (el) {
            observer.observe(el);
        });
    } else if (revealEls.length) {
        revealEls.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    // --- Track row: visual “playing” + now playing bar ---
    var tracks = document.querySelectorAll('.track');
    var nowPlayingEl = document.getElementById('now-playing-name');

    tracks.forEach(function (track) {
        track.addEventListener('click', function () {
            var wasPlaying = track.classList.contains('playing');
            tracks.forEach(function (t) {
                t.classList.remove('playing');
            });
            if (!wasPlaying) {
                track.classList.add('playing');
                if (nowPlayingEl) {
                    var title = track.getAttribute('data-track-title') || '';
                    nowPlayingEl.textContent = title || 'Track selected';
                }
            } else if (nowPlayingEl) {
                nowPlayingEl.textContent = 'Select a track below';
            }
        });
    });

    // --- Mailing list ---
    var form = document.getElementById('newsletter-form');
    var messageEl = document.getElementById('form-message');

    if (form && messageEl) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = form.querySelector('input[type="email"]');
            var email = input && input.value ? input.value.trim() : '';

            messageEl.classList.remove('success', 'error');
            messageEl.textContent = '';

            if (!email) {
                messageEl.textContent = 'Please enter your email.';
                messageEl.classList.add('error');
                return;
            }

            messageEl.textContent = "Thanks! We'll be in touch when the EP drops.";
            messageEl.classList.add('success');
            input.value = '';
        });
    }
})();
