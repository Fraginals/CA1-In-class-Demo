// <!-- The following code belongs to the github account: https://github.com/mikhail-cct/CA1-In-class-Demo.git, -->
// <!-- which was adjusted and mofidied in order to create the "Timepieces" Web App -->


var http = require('http'), //This is a package that provides "HTTP" server functionalities
    path = require('path'), //Package that manages utilities in order to work with files and directory paths
    express = require('express'), // This module anables the app to work with HTTP Requests using the Express Framework, applying the routing and the required content!!
    fs = require('fs'), //The fs module is responsible for all the asynchronous or synchronous file I/O operations.
    xmlParse = require('xslt-processor').xmlParse, //This module shows an XML document inputting XML Parser for JavaScript
    xsltProcess = require('xslt-processor').xsltProcess, //This module operates on two inputs: the XML document to transform, and when is used to apply transformations on the XML.
    xml2js = require('xml2js'), //This package converts XML files to JSON and to get back from JSON to XML
    expAutoSan = require('express-autosanitizer');//This package Express middleware automatically sanitize user inputs against Javascript Injection

var router = express(); //Defining the routing and using methods of the Express app object that correspond to HTTP
var server = http.createServer(router);// This method creates an HTTP Server object that can listen to ports and execute a function, a requestListener, each time a request is made.

router.use(express.static(path.resolve(__dirname, 'views'))); //Here we are using the views folder where the static content will be provided such as images, CSS files and JavaScript files.
router.use(express.urlencoded({extended: true})); //Working with the URL in GET and POST requests where the data sent comes from the client side
router.use(express.json()); //Including any support for JSON taking in consideration the client side
router.use(expAutoSan.allUnsafe);//We mount here and call the sanitizer to be used in the app


// This main Function allows us to read an XML file and transform it into JSON
function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}

//This other function does the opposite, it converts from JSON to XML files and afterwards save it!!
function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.writeFile(filepath, xml, cb);
}
//Here we are implementing the root of the app and showing the index.html file that is in the views folder
router.get('/', function(req, res){

    res.render('index');//displaying the index template within the view folder

})
//The following is using a new route "/get/html" in order to represent the table when applying XSL file to XML
router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'}); //Generating a positive response to the client when the content requested is provided back demonstrating that it exists !!

    var xml = fs.readFileSync('Timepieces.xml', 'utf8'); //When we are allowed to read in the XML file
    var xsl = fs.readFileSync('Timepieces.xsl', 'utf8'); //When we are allowed to read in the XSL file
    var doc = xmlParse(xml); //This means that we are parsing the Timepieces.xml file
    var stylesheet = xmlParse(xsl); //This means that we are parsing the Timepieces.xsl!

    var result = xsltProcess(doc, stylesheet); //Here we are implementing the transformation!!

    res.end(result.toString()); //Representing the result back to the client and transforming it to a string before providing the request!
//HERE

});

// This method allows a POST request adding to XML files and JSON  
router.post('/post/json', function(req, res) {

  // This function permits us to read a JSON file, adding info to it and converting it into an XML file
  function appendJSON(obj) {
    // This enable us to read an XML file, then convert it to JSON adding a new object and viceversa, converting into an XML file
    xmlFileToJs('Timepieces.xml', function(err, result) {
      if (err) throw (err);
      //In this section we are passing the information from the form inside the index file in a form of JSON and through the JSON (XML) file we create a new entree object
      result.catalogue.section[obj.sec_n].watch.push({'brand': obj.brand, 'price': obj.price, 'precision': obj.precision, 'discount': obj.discount, 'stock': obj.stock}); //If your XML elements are differet, this is where you have to change to your own element names
      //Here we are converting from JSON to the original XML file!!
      jsToXmlFile('Timepieces.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  };

  // We are calling the appendJSON function and passing the current POST request
  appendJSON(req.body);

  // This response helps to redirect the browser back to the page, where the post request is originated
  res.redirect('back');

});

// This method is a post request that allow us adding to XML files and JSON 
router.post('/post/delete', function(req, res) {
 // This function permits us to read a JSON file, adding info to it and converting it into an XML file
  function deleteJSON(obj) {
    // This enable us to read an XML file, then convert it to JSON, deleting an especific object and write to a XML file
    xmlFileToJs('Timepieces.xml', function(err, result) {
      if (err) throw (err);
      // Deleting the object in regard to the position of the section(0,1,2 etc) and position of the entree(0,1,2 etc) obtained from index.html
      delete result.catalogue.section[obj.section].watch[obj.watch];/* */
      //This is where we convert from JSON to the XML file
      jsToXmlFile('Timepieces.xml', result, function(err) {/*When converting from JSON to XML it save it*/ 
        if (err) console.log(err);
      })
    })
  }

  // Here we are calling the deleteJSON function and and passing the current POST request
  deleteJSON(req.body);

});

//Here is where we connect to the server which is listening through an especific IP and Port
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});