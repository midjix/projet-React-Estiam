const BASE_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'An error occurred');
    }

    return res.json();
}

export const api = {
    get: (url) => request(url),
    post: (url, body) => request(url, { method: 'POST', body: JSON.stringify(body) }),
    put: (url, body) => request(url, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (url) => request(url, { method: 'DELETE' })
};
   



