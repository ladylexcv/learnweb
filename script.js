function createCoRSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if(typeof XDomainRequest !== "undefined") {
    xhr = new XDomainRequest(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}
var requst = createCoRSRequest("get", "http://www.weather.com.cn/data/sk/101110101.html");
if(requst) {
    requst.onload = function() {
    console.log(requst.responseText);
  }
  requst.send();
}
console.log(requst);
var x = new XMLHttpRequest();
console.log("withCredentials" in x);
