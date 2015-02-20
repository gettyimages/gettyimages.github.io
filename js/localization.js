(function() {
  var supportedLanguages = ['de', 'es', 'fr', 'it', 'ja', 'nl', 'pt', 'sv', 'en', 'pseudo'];
  var lang = 'en';
  var preferredLang = navigator.languages.filter(function(l) {
    return supportedLanguages.indexOf(l.substring(0, 2)) != -1;
  })[0];

  if (preferredLang) {
    lang = preferredLang.substring(0, 2);
  }

  var needToRedirect = true;
  var langloc = '/' + lang;
  var pathname = window.location.pathname;


  for (i = 0; i < supportedLanguages.length; i++) {
    if (pathname.indexOf(supportedLanguages[i]) > -1) {
      needToRedirect = false;
      break;
    }
  }

  if (needToRedirect && supportedLanguages.indexOf(lang) > -1) {
    needToRedirect = pathname.indexOf(langloc) < 0;
  } else {
    needToRedirect = false
  }

  if (needToRedirect) {
    window.location = langloc + window.location.pathname;
  }
})();
