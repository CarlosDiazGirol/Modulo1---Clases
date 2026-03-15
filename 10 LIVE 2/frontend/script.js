// frontend/script.js
// Se comunica con el backend en http://localhost:3000

const API_URL = 'http://localhost:3000';

// Muestra la respuesta formateada en el <pre> del HTML
function showResult(data) {
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);
}

// --- LOGIN ---
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.ok) {
            // Guardar el token para usarlo en peticiones posteriores
            localStorage.setItem('token', data.token);
            document.getElementById('loginStatus').textContent = `✅ Sesión iniciada (${email})`;
        }

        showResult(data);
    } catch (error) {
        showResult({ error: 'No se pudo conectar con el servidor' });
    }
}

// --- CERRAR SESIÓN ---
function logout() {
    localStorage.removeItem('token');
    document.getElementById('loginStatus').textContent = '👋 Sesión cerrada';
    showResult({ message: 'Token eliminado de localStorage' });
}

// --- HELPER: petición autenticada ---
// Recoge el token de localStorage y lo envía en el header Authorization
async function fetchWithToken(url) {
    const token = localStorage.getItem('token');

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}

// --- GET /profile ---
async function getProfile() {
    const data = await fetchWithToken(`${API_URL}/profile`);
    showResult(data);
}

// --- GET /admin ---
async function getAdmin() {
    const data = await fetchWithToken(`${API_URL}/admin`);
    showResult(data);
}
