//forms.lib.js
var internals = exports.FormsClass = {};

internals.makeForm = function(form, callback) {

  var thisForm = form;
  var newForm = {};

  for ( var i=0;i<thisForm.length;++i) {

    if (!newForm[thisForm[i].type]) {

      newForm[thisForm[i].type] = [];
    } 
  }

  for ( var i=0;i<thisForm.length;++i) {

    if (newForm[thisForm[i].type]) {

      newForm[thisForm[i].type].push(thisForm[i]);
    } 
  }

  return (callback) ? callback(newForm) : newForm;

}

internals.formatForm = function(form, data, callback) {

  var thisForm = form;
  var currentForm = data;

  for ( var i=0;i<currentForm.length;++i) {

    if (currentForm[i].name === thisForm[i][name] ) {
      thisForm[i].ctx = currentForm[i].value;
    }
  }

  return (callback) ? callback(thisForm) : thisForm;
};