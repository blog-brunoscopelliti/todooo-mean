exports.setHeaders = function(headers) {

  return function(req, res, next) {

    var header;

    for(var i=0; i<headers.length; i++) {
      header = headers[i];
      res.header(header.key, header.value);
    }

    next();

  }

};