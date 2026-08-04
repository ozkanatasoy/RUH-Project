/**
 * RUH PROJECT - User Authentication & Profile Dashboard Module
 * Manages user accounts, login modal, session state, and profile dashboard view.
 */

import { getCurrentLang, getTranslation } from './i18n.js';

let currentUser = null;

export function initAuth() {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('ruh_current_user');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
        } catch (e) {
            currentUser = null;
        }
    }

    updateNavAuthButton();

    const navUserBtn = document.getElementById('navUserBtn');
    const loginModal = document.getElementById('loginModal');
    const profileModal = document.getElementById('profileModal');
    const closeLoginModalBtn = document.getElementById('closeLoginModalBtn');
    const closeProfileModalBtn = document.getElementById('closeProfileModalBtn');
    const submitLoginBtn = document.getElementById('submitLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (navUserBtn) {
        navUserBtn.addEventListener('click', () => {
            if (currentUser) {
                openProfileModal();
            } else {
                if (loginModal) loginModal.classList.add('active');
            }
        });
    }

    if (closeLoginModalBtn && loginModal) {
        closeLoginModalBtn.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });
    }

    if (closeProfileModalBtn && profileModal) {
        closeProfileModalBtn.addEventListener('click', () => {
            profileModal.classList.remove('active');
        });
    }

    if (submitLoginBtn) {
        submitLoginBtn.addEventListener('click', handleLogin);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

export function registerUserAccount(accountData) {
    // Store user account in accounts database in localStorage
    const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    
    // Check if email already registered
    const index = existingAccounts.findIndex(acc => acc.email.toLowerCase() === accountData.email.toLowerCase());
    if (index >= 0) {
        existingAccounts[index] = accountData;
    } else {
        existingAccounts.push(accountData);
    }

    localStorage.setItem('ruh_accounts', JSON.stringify(existingAccounts));

    // Auto-login registered user
    currentUser = accountData;
    localStorage.setItem('ruh_current_user', JSON.stringify(currentUser));
    updateNavAuthButton();
}

function handleLogin() {
    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginPassword');
    const lang = getCurrentLang();

    const email = emailInput ? emailInput.value.trim() : '';
    const pass = passInput ? passInput.value : '';

    if (!email || !pass) {
        alert(lang === 'tr' ? 'Lütfen e-posta ve şifrenizi giriniz.' : 'Please enter email and password.');
        return;
    }

    const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    const user = existingAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === pass);

    if (user) {
        currentUser = user;
        localStorage.setItem('ruh_current_user', JSON.stringify(currentUser));
        updateNavAuthButton();
        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.classList.remove('active');
        alert(lang === 'tr' ? `Hoş geldiniz, ${user.fullName}!` : `Welcome back, ${user.fullName}!`);
        openProfileModal();
    } else {
        alert(lang === 'tr' ? 'Hatalı e-posta veya şifre! Lütfen ön kayıt formunu tamamlayarak hesap oluşturunuz.' : 'Invalid email or password! Please complete pre-registration to create an account.');
    }
}

function handleLogout() {
    const lang = getCurrentLang();
    currentUser = null;
    localStorage.removeItem('ruh_current_user');
    updateNavAuthButton();
    const profileModal = document.getElementById('profileModal');
    if (profileModal) profileModal.classList.remove('active');
    alert(lang === 'tr' ? 'Oturum kapatıldı.' : 'Logged out successfully.');
}

export function updateNavAuthButton() {
    const navUserBtn = document.getElementById('navUserBtn');
    if (!navUserBtn) return;

    const lang = getCurrentLang();
    const userLabelSpan = navUserBtn.querySelector('.nav-user-label');

    if (currentUser) {
        if (userLabelSpan) userLabelSpan.textContent = lang === 'tr' ? 'Profilim' : 'My Profile';
        navUserBtn.classList.add('logged-in');
    } else {
        if (userLabelSpan) userLabelSpan.textContent = lang === 'tr' ? 'Giriş Yap' : 'Login';
        navUserBtn.classList.remove('logged-in');
    }
}

export function openProfileModal() {
    if (!currentUser) return;
    const profileModal = document.getElementById('profileModal');
    if (!profileModal) return;

    const lang = getCurrentLang();

    const profName = document.getElementById('profName');
    const profEmail = document.getElementById('profEmail');
    const profId = document.getElementById('profIdentity');
    const profHash = document.getElementById('profHash');
    const profTier = document.getElementById('profTier');
    const profInheritance = document.getElementById('profInheritance');

    if (profName) profName.textContent = currentUser.fullName;
    if (profEmail) profEmail.textContent = currentUser.email;
    if (profId) profId.textContent = currentUser.identityNo;
    if (profHash) profHash.textContent = currentUser.hashId || 'RUH-2026-X9842-887';
    if (profTier) profTier.textContent = currentUser.tierName;
    if (profInheritance) profInheritance.textContent = currentUser.inheritanceStatus;

    profileModal.classList.add('active');
}
