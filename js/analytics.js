var gettyImagesVisitorId = '';

(function() {
	// Omniture page tracking
	gettyImagesVisitorId = readCookie('s_vi');
	s.pageName=window.location.href;
	s.prop1=gettyImagesVisitorId;
	s.eVar1=gettyImagesVisitorId;
	s.prop2=window.location.href;
	s.eVar2=window.location.href;
	s.t();
})();

function reportOmnitureData(data) {
	var vars = [];
	s.prop1=gettyImagesVisitorId;
	s.eVar1=gettyImagesVisitorId;
	vars.push('prop1');
	vars.push('eVar1');
	for (var key in data.fields) {
		if (data.fields.hasOwnProperty(key)) {
			s[key] = data.fields[key];
			if (key != 'events') {
				vars.push(key);
			}
		}
	}
	s.linkTrackVars=vars.join(',');
	s.linkTrackEvents=data.fields.events;
	var param = data.parameter;
	s.tl(true, 'o', param);		
}

$(function () {
	$(document).on('click', '[omniture]', function (e) {
		var omnitureData = JSON.parse($(this).attr('omniture'));
		reportOmnitureData(omnitureData);
	});
	
	$(document).on("scroll", function () {
		var $window = $(window);
		var docViewTop = $window.scrollTop();
		var docViewBottom = docViewTop + $window.height();
		
		$("[trackview]").each(function () {
			var $this = $(this);
			var elemTop = $this.offset().top;
			var isReported = $this.attr('reported');
			if (elemTop >= docViewTop && elemTop <= docViewBottom && isReported !== 'true') {
				$this.attr('reported', 'true');
				var omnitureData = JSON.parse($(this).attr('trackview'));
				reportOmnitureData(omnitureData);
			}
		});
	});
	
	// specific to try it out searching parameters
	var resource = "images";
	
	$(document).on('change', '[name="resource"]', function () {
		resource = $(this).val().replace('/search/', '');
	});
	
	$(document).on('click', '.omniture-search', function (e) {
		var omnitureData = {
			fields: { 
				events : "event3", 
				prop8 : resource, 
				eVar8 : resource,
				prop9 : $("[name='sortOrder'] option:selected").text(), 
				eVar9 : $("[name='sortOrder'] option:selected").text(),
				prop10 : $("[name='searchPhrase']").val(), 
				eVar10 : $("[name='searchPhrase']").val()
			}, 
			parameter: "Search"
		};
		reportOmnitureData(omnitureData);
	});	
});

  //Google Analytics
  var _gaq = _gaq || [];
 _gaq.push(['_setAccount', 'UA-28608292-1']);
 _gaq.push(['_trackPageview']);

 (function() {
   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 })();

 
 // Jaguar
 /*

     )\-"```-,_
    /.   _     `"-._
   _`-c_/_'. `\   , `"-._
  (_.--`  '-_;-'   \     `"-.
          (_.-----'`-.._     `\._
                        `\     `\'._
                          `'.    '._'._
                             `'---, `._'-._
                                   `-._/'--'
 */

(function() {
	trackPageLoad();
})();

function trackPageLoad(){

	var payload = {};
	payload.source = "Getty API Portal";
	payload.event = "GettyAPIPortal Page Loaded";

	payload.properties = {};
	payload.properties.url = window.location.href;
	payload.properties.referer = document.referrer;
    payload.properties.visitor_id = getGettyImagesVisitorId();

    var payloadWrapper = [];
    payloadWrapper[0] = payload;

    var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","//spectrum.gettyimages.com/v3/signals",true);
	xmlhttp.setRequestHeader("Content-type","Content-Type: application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(payloadWrapper));
}

function getGettyImagesVisitorId(){
	
	//	The Getty visitor_id is defined as
	//		key:vis 
	//		value:vid={guid} 

	var guid = readCookie("vis");

	if(!guid){
		guid = pseudoGUID();
		createCookie("vis", "vid="+guid, 365*10);
	}
	else {
		guid = guid.substring(4);
	}

	return guid;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; domain=.gettyimages.com; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function pseudoGUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
