/**
 * RUH PROJECT - Application Main Entrypoint (ES6 Module)
 * Initializes i18n, Canvas visualizer, Wizard portal, Donations Leaderboard, FAQ accordion, and UI micro-interactions.
 */

import { getCurrentLang, onLanguageChange, switchLanguage } from './modules/i18n.js';
import { initEnergyCanvas } from './modules/canvas.js';
import { initWizard, updateFeeSummary } from './modules/wizard.js';
import { initDonations, renderLeaderboard, updateDonationProgress } from './modules/donations.js';

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Bio-Energy Canvas Visualizer
    initEnergyCanvas();

    // 2. Initialize Interactive Multi-Step Wizard
    initWizard();

    // 3. Initialize Transparent Donation Pool & Masked Leaderboard
    initDonations();

    // 4. Initialize Language Switcher Controls
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const nextLang = getCurrentLang() === 'tr' ? 'en' : 'tr';
            switchLanguage(nextLang);
        });
    }

    // Register callback on language change to update dynamic fee summary & leaderboard
    onLanguageChange(() => {
        updateFeeSummary();
        renderLeaderboard();
        updateDonationProgress();
    });

    // 5. FAQ Accordion Controls
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('active');

            // Toggle active state
            item.classList.toggle('active');
            btn.setAttribute('aria-expanded', !isOpen);
        });
    });

    // 6. Mobile Navigation Hamburger Menu
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const active = navMenu.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', active);
        });
    }

    // 7. Top Announcement Close Control
    const closeAnnouncement = document.getElementById('closeAnnouncement');
    const announcementBar = document.getElementById('announcementBar');
    if (closeAnnouncement && announcementBar) {
        closeAnnouncement.addEventListener('click', () => {
            announcementBar.style.display = 'none';
        });
    }

});
