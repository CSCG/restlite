var restlite = {};

restlite.routes = [];

restlite.error404 = '/404';

restlite.route = 
function() {
  var r = window.location.pathname;
  if(restlite.routes[r] !== undefined)
    restlite.routes[r]();
  else if(restlite.routes[restlite.error404] !== undefined)
    restlite.routes[restlite.error404]();
};

restlite.render =
function(id, path) {
  return function() { 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        document.getElementById(id).innerHTML = xhttp.responseText;
      }
    };
    xhttp.open('GET', path, true);
    xhttp.send();
  };
};

restlite.setRoute =
function(r) {
  history.pushState({}, '', r);
  restlite.route();
};

window.addEventListener('popstate', function() {
  restlite.route();
});

restlite.rest = 
function(route, method, json, success, error) {
  var methods = ['GET','POST','PUT','DELETE'];
  if(methods.indexOf(method.toUpperCase()) !== -1) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          if (typeof success === 'function')
            success(JSON.parse(xhttp.responseText));
        }
        else {
          if (typeof error === 'function') 
            error(xhttp.status, JSON.parse(xhttp.responseText || '{}'));
        }
      }
    };
    xhttp.open(method, route, true);
    if(method.toUpperCase() !== 'GET' && typeof json === 'object' && json !== null
      && Object.keys(json).length !== 0 && JSON.stringify(json) !== JSON.stringify({})) {
      alert('in');
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(json));
    }
    else
      xhttp.send();
    return xhttp.onreadystatechange();
  }
};