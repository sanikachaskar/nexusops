// auth.ts - NexusOps Authentication Module

// Types and Interfaces
interface User {
    email: string;
    role: 'admin' | 'engineer' | 'viewer';
}

interface LoginResponse {
    success: boolean;
    token?: string;
    user?: User;
    message?: string;
}

// DOM Elements
const emailInput = document.getElementById('emailInput') as HTMLInputElement;
const passInput = document.getElementById('passInput') as HTMLInputElement;
const errMsg = document.getElementById('errMsg') as HTMLDivElement;
const loadingOverlay = document.getElementById('loadingOverlay') as HTMLDivElement;
const loaderFill = document.getElementById('loaderFill') as HTMLDivElement;
const clockElement = document.getElementById('clock') as HTMLSpanElement;
const eyeBtn = document.getElementById('eyeBtn') as HTMLButtonElement;
const eyeIcon = document.getElementById('eyeIcon') as SVGElement;

// State
let passVisible: boolean = false;
let currentRole: 'admin' | 'engineer' | 'viewer' = 'admin';

// Clock update function
function updateClock(): void {
    const now = new Date();
    if (clockElement) {
        clockElement.textContent = now.toUTCString().replace('GMT', 'UTC').split(' ').slice(1).join(' ');
    }
}

// Role selection
function selectRole(btn: HTMLButtonElement): void {
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentRole = btn.dataset.role as 'admin' | 'engineer' | 'viewer';
}

// Toggle password visibility
function togglePass(): void {
    passVisible = !passVisible;
    if (passInput) {
        passInput.type = passVisible ? 'text' : 'password';
    }
    if (eyeIcon) {
        eyeIcon.style.opacity = passVisible ? '1' : '0.5';
    }
}

// Validate email format
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mock authentication function
async function authenticate(email: string, password: string, role: string): Promise<LoginResponse> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // Demo credentials
            if (email === 'admin@nexusops.dev' && password === 'admin123') {
                resolve({
                    success: true,
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImFkbWluIn0',
                    user: {
                        email: email,
                        role: role as 'admin' | 'engineer' | 'viewer'
                    }
                });
            } else {
                resolve({
                    success: false,
                    message: 'Invalid credentials. Use admin@nexusops.dev / admin123 for demo.'
                });
            }
        }, 1800);
    });
}

// Main login function
async function doLogin(): Promise<void> {
    const email: string = emailInput?.value.trim() || '';
    const password: string = passInput?.value || '';

    // Hide any previous error
    errMsg?.classList.remove('show');

    // Validation
    if (!email || !password) {
        errMsg.textContent = '? Please enter your email and password.';
        errMsg.classList.add('show');
        return;
    }

    if (!isValidEmail(email)) {
        errMsg.textContent = '? Please enter a valid email address.';
        errMsg.classList.add('show');
        return;
    }

    // Show loader
    if (loadingOverlay) {
        loadingOverlay.classList.add('show');
    }

    // Reset loader animation
    if (loaderFill) {
        loaderFill.style.animation = 'none';
        loaderFill.offsetHeight; // Force reflow
        loaderFill.style.animation = 'load-fill 1.8s cubic-bezier(.4,0,.2,1) forwards';
    }

    try {
        // Attempt authentication
        const response: LoginResponse = await authenticate(email, password, currentRole);

        setTimeout(() => {
            loadingOverlay?.classList.remove('show');

            if (!response.success) {
                errMsg.textContent = `? ${response.message}`;
                errMsg.classList.add('show');
            } else {
                // Store token in session storage
                if (response.token) {
                    sessionStorage.setItem('nexusops_token', response.token);
                    sessionStorage.setItem('nexusops_user', JSON.stringify(response.user));
                }

                // Redirect to dashboard
                window.location.href = '/frontend/pages/dashboard.html';
            }
        }, 1900);
    } catch (error) {
        console.error('Login error:', error);
        loadingOverlay?.classList.remove('show');
        errMsg.textContent = '? An error occurred. Please try again.';
        errMsg.classList.add('show');
    }
}

// Logout function
function logout(): void {
    sessionStorage.removeItem('nexusops_token');
    sessionStorage.removeItem('nexusops_user');
    window.location.href = '/frontend/pages/login.html';
}

// Check if user is authenticated
function isAuthenticated(): boolean {
    return !!sessionStorage.getItem('nexusops_token');
}

// Initialize clock and event listeners
function init(): void {
    updateClock();
    setInterval(updateClock, 1000);

    // Add enter key handler
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            doLogin();
        }
    });

    // Add eye button click handler if it exists
    if (eyeBtn) {
        eyeBtn.addEventListener('click', (e: Event) => {
            e.preventDefault();
            togglePass();
        });
    }

    // Auto-redirect if already logged in (except on login page)
    if (isAuthenticated() && !window.location.pathname.includes('login.html')) {
        window.location.href = '/frontend/pages/dashboard.html';
    }
}

// Start the app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for use in HTML
declare global {
    interface Window {
        selectRole: (btn: HTMLButtonElement) => void;
        togglePass: () => void;
        doLogin: () => void;
        logout: () => void;
    }
}

window.selectRole = selectRole;
window.togglePass = togglePass;
window.doLogin = doLogin;
window.logout = logout;
