/**
 * RUH PROJECT - Application Main Entrypoint (ES6 Module)
 * Initializes i18n, Canvas visualizer, Wizard portal, Donations Leaderboard, Auth/Profile system, FAQ accordion, and UI micro-interactions.
 */

import { getCurrentLang, onLanguageChange, switchLanguage } from './modules/i18n.js';
import { initEnergyCanvas } from './modules/canvas.js';
import { initWizard, updateDynamicFormTitles, updateFeeSummary, populateContingencySuccessionView } from './modules/wizard.js';
import { initDonations, renderLeaderboard, updateDonationProgress } from './modules/donations.js';
import { initAuth, updateNavAuthButton } from './modules/auth.js';

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Bio-Energy Canvas Visualizer
    initEnergyCanvas();

    // 2. Initialize Interactive Multi-Step Wizard
    initWizard();

    // 3. Initialize Transparent Donation Pool & Masked Leaderboard
    initDonations();

    // 4. Initialize User Auth & Profile System
    initAuth();

    // 5. Initialize Language Switcher Controls
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const nextLang = getCurrentLang() === 'tr' ? 'en' : 'tr';
            switchLanguage(nextLang);
        });
    }

    // Register callback on language change to update dynamic fee summary, leaderboard & nav auth label
    onLanguageChange(() => {
        updateDynamicFormTitles();
        updateFeeSummary();
        populateContingencySuccessionView();
        renderLeaderboard();
        updateDonationProgress();
        updateNavAuthButton();
    });

    // 6. Apply initial saved language state
    switchLanguage(getCurrentLang());

    // 7. FAQ Accordion & Toggle Controls
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('active');

            // Toggle active state
            item.classList.toggle('active');
            btn.setAttribute('aria-expanded', !isOpen);
        });
    });

    const btnToggleFaq = document.getElementById('btnToggleFaq');
    if (btnToggleFaq) {
        let isFaqExpanded = false;
        btnToggleFaq.addEventListener('click', () => {
            isFaqExpanded = !isFaqExpanded;
            const hiddenItems = document.querySelectorAll('.faq-hidden-item');
            hiddenItems.forEach(item => {
                item.style.display = isFaqExpanded ? 'block' : 'none';
            });

            const lang = getCurrentLang();
            const icon = btnToggleFaq.querySelector('i');
            const label = btnToggleFaq.querySelector('span');

            if (isFaqExpanded) {
                if (icon) icon.className = 'fa-solid fa-chevron-up';
                if (label) {
                    label.setAttribute('data-i18n', 'btnFaqShowLess');
                    label.textContent = lang === 'tr' ? 'Daha Az Göster' : 'Show Less';
                }
            } else {
                if (icon) icon.className = 'fa-solid fa-chevron-down';
                if (label) {
                    label.setAttribute('data-i18n', 'btnFaqShowAll');
                    label.textContent = lang === 'tr' ? 'Tüm Sıkça Sorulan Soruları Gör (10 Soru)' : 'View All FAQ Questions (10 Questions)';
                }
            }
        });
    }

    // 8. Mobile Navigation Hamburger Menu
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const active = navMenu.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', active);
        });
    }

    // 9. Top Announcement Close Control
    const closeAnnouncement = document.getElementById('closeAnnouncement');
    const announcementBar = document.getElementById('announcementBar');
    if (closeAnnouncement && announcementBar) {
        closeAnnouncement.addEventListener('click', () => {
            announcementBar.style.display = 'none';
        });
    }

    // 10. Password Eye Icon Visibility Toggles
    document.querySelectorAll('.btn-toggle-password').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            if (!targetInput) return;

            const icon = btn.querySelector('i');
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                if (icon) {
                    icon.className = 'fa-solid fa-eye-slash';
                    icon.style.color = 'var(--color-primary)';
                }
            } else {
                targetInput.type = 'password';
                if (icon) {
                    icon.className = 'fa-solid fa-eye';
                    icon.style.color = 'var(--text-muted)';
                }
            }
        });
    });

});
