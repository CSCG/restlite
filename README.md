# RestLite.js
A JavaScript Microframework to make Single Page Applications (SPAs) using RESTful APIs

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
(In progress, more coming soon)

#### Routes configuration
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

#### Render a partial view
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

#### Access a route
To access a route from a control like a button you need to use the `restlite.setRoute()` function, for example :

```
<button onclick="restlite.setRoute('/signin')"></button>
```

(More coming soon)

### Compatibility
RestLite.js is using HTML5 `history.pushState()` which is **not compatible with IE 9 and older** versions
