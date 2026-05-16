// ----------------------------------------------------
// SCROLLIX DEPLOYMENT CONFIGURATION
// ----------------------------------------------------
// If you are deploying the Frontend to Cloudflare Pages 
// and the Backend to Render, uncomment the line below 
// and replace with your actual Render URL.
// ----------------------------------------------------

let API_BASE_URL = "";
// API_BASE_URL = "https://your-backend-app.onrender.com";

// Helper function to resolve image URLs from the backend
function getImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return API_BASE_URL + url;
}
