# RestLite.js
A JavaScript Microframework to make Single Page Applications (SPAs) using RESTful APIs

Totally written in vanilla JS and 100% unobtrusive.

### Getting started
To use restlite.js you simply need to add it in your HTML page :

```
<script src="js/restlite.min.js"></script>
```

Then you should create another js file for example *app.js* in which you will configure your routes and make your REST calls.
This script should be referenced after the restlite one :

```
<script src="js/restlite.min.js"></script>
<script src="js/app.js"></script>
```

Once it's done, you're ready to go !

### How to use it

##### Routes configuration
Start by defining the routes in your *app.js*, to do so, you should use `restlite.routes[]` see the following example :

```
restlite.routes['/'] = function() { // do something ... };
```

You have to define the route as a key of the `restlite.routes[]` array and assign it a function that will be called when that route is used.

RestLite.js automatically adds the **/404** route and uses it when an undefined route is called. You can change this default value by assigning another value to `restlite.error404`, for example :

```
restlite.error404 = '/error';
```

You should also define the function to call when that route is called :

```
restlite.routes['/error'] = function() { // do something ... };
```

Or if you kept the default value :

```
restlite.routes['/404'] = function() { // do something ... };
```

Finally when you're done configuring your routes you need to call the `restlite.route()` function, that way :

```
restlite.routes['/'] = function() { // do something ... };
restlite.routes['/error'] = function() { // do something ... };
restlite.error404 = '/error';
restlite.route();
```

##### Rendering a partial view
When a route is called usually the page content should change. So it's common to create partial views that will be included in the page depending on the route.

RestLite.js make that easy to do, all you need is the **id** of the container and the **path** of the partial view, then you can use the `restlite.render(id, path)` function, for example :

```
restlite.render('content', 'partials/signup-form.html');
```

And in your HTML page :

```
<div id="content"></div>
```

Now if you combine everything you can render a partial view depending on the route like this :

```
restlite.routes['/signin'] = restlite.render('content', 'partials/signup-form.html');
```

If you need to do other stuff when the route is called you could simply do like this :

```
restlite.routes['/signin'] = function() { 
  restlite.render('content', 'partials/signup-form.html')();
  // do something else ... 
};
```

*Notice the additional () at the end of the render function* 

##### Accessing a route
To access a route from a control like a button you need to use the `restlite.setRoute()` function, for example :

```
<button onclick="restlite.setRoute('/signin')"></button>
```

##### Making a REST call
This can be easily done by using the `restlite.rest()` function, it takes 5 parameters :

1. The URL
2. The Method (GET, POST, PUT or DELETE)
3. The Data to send (needs to be a JSON format)
4. The Success callback function (having a JSON parameter)
5. The Error callback function (having two parameters, the status code and a JSON which is optional)

Let's have a look at an example for better understanding :

```
restlite.rest('/api/test', 'GET', {}, function(json) {
    alert(JSON.stringify(json));
  }, function(status, error) {
    alert(status+' '+JSON.stringify(error));
  }); 
};
```

This is a GET example, so you can notice the `{}` because no data needs to be sent. 
You can also set that parameter to `undefined` or `null`. 

If you don't need one of the callback function or both of them you can simply write `function(){}`.

### Compatibility
RestLite.js is using HTML5 `history.pushState()` which is **not compatible with IE 9 and older** versions
