/**
 * 1DA — Official Music Website
 * Nav, track “playing” state, mailing list form
 */

(function () {
    'use strict';

    // --- Mobile nav (hamburger) ---
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var open = navLinks.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });

        // Close menu when a nav link is clicked (for anchor links)
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Track “playing” state (visual only) ---
    var tracks = document.querySelectorAll('.track');

    tracks.forEach(function (track) {
        track.addEventListener('click', function () {
            var wasPlaying = track.classList.contains('playing');
            tracks.forEach(function (t) {
                t.classList.remove('playing');
            });
            if (!wasPlaying) {
                track.classList.add('playing');
            }
        });
    });

    // --- Mailing list form ---
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

            // No backend: show success (replace with real API call when ready)
            messageEl.textContent = 'Thanks! We\'ll be in touch when the EP drops.';
            messageEl.classList.add('success');
            input.value = '';
        });
    }
})();
