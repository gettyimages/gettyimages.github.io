var lang = navigator.languages ? navigator.languages[0].substring(0, 2) : 'en';
if (lang !== = 'en') {
  var langloc = '/' + lang;
  if (window.location.toString().indexOf(langloc) < 0) {
    window.location = langloc + window.location.pathname;
  }
}
