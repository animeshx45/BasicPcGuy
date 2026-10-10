// Spring Boot Backend Base URL
export const BACKEND_BASE_URL = 'http://localhost:8080';

async function requestApi(path) {
  // 1. Direct call to Spring Boot backend at http://localhost:8080
  try {
    const res = await fetch(`${BACKEND_BASE_URL}${path}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Direct request to ${BACKEND_BASE_URL}${path} failed, attempting local proxy:`, err);
  }

  // 2. Fallback via local Vite proxy if direct request encountered network/CORS error
  try {
    const proxyRes = await fetch(path);
    const contentType = proxyRes.headers.get('content-type') || '';
    if (proxyRes.ok && contentType.includes('application/json')) {
      return await proxyRes.json();
    }
  } catch {
    // ignore
  }

  return null;
}

// 1. GET http://localhost:8080/api/wallpapers
export async function getWallpapers() {
  const data = await requestApi('/api/wallpapers');
  return Array.isArray(data) ? data : [];
}

// 2. GET http://localhost:8080/api/wallpapers/{slug}
export async function getWallpaperBySlug(slug) {
  return await requestApi(`/api/wallpapers/${encodeURIComponent(slug)}`);
}

// 3. GET http://localhost:8080/api/articles
export async function getArticles() {
  const data = await requestApi('/api/articles');
  return Array.isArray(data) ? data : [];
}

// 4. GET http://localhost:8080/api/articles/{id}
export async function getArticleById(id) {
  return await requestApi(`/api/articles/${id}`);
}

// 5. GET http://localhost:8080/api/about
export async function getAbout() {
  return await requestApi('/api/about');
}
