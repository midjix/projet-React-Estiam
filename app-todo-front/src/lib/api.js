const BASE_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if(!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Erreur API')
    }

    return res.json(); // pour retourner les données JSON
};

export const api = {
    get: (endpoint, options = {}) => request(endpoint, { method: 'GET', ...options }),
    post: (endpoint, body = {}, options = {}) => request(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
    put: (endpoint, body = {}, options = {}) => request(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),
    delete: (endpoint, options = {}) => request(endpoint, { method: 'DELETE', ...options }),
};