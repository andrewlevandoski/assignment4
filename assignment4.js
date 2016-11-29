// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
  // Magic!
  console.log('Keepin\'n it clean with an external script!');

  $('.matches').hide();

  // Get input and pass on to getJSON()
  $('.flexsearch-input').keyup(function(event) {
    var input = $(".flexsearch-input").val();
    $('.matches').html("");
    $('.matches').show();

    getJSON(input);
  });

  // Actual functionality
  function getJSON(input) {
    $.ajax({
      url:"http://www.mattbowytz.com/simple_api.json?data=all",
      type:"GET",
      dataType:"json"
    })

    .done(function(json) {
      json.data.programming.forEach(function(search) {
        search = search.toLowerCase();

        if (input.length > 0 && search.startsWith(input.toLowerCase())) {
          $('.matches').append("<a target=\"_blank\" href=\"http://www.google.com/search?q=" + search + "\">" + search + "</a>");
        }
      });

      json.data.interests.forEach(function(search) {
        search = search.toLowerCase();

        if (input.length > 0 && search.startsWith(input.toLowerCase())) {
          $('.matches').append("<a target=\"_blank\" href=\"http://www.google.com/search?q=" + search + "\">" + search + "</a>");
        }
      });
    })

    .fail(function() {
      console.log("Error");
    });
  }

  // link to Google Search functionality
  $(document).on('click', '.flexsearch-submit', function() {
    var input = $(".flexsearch-input").val();

    if (input.length > 0) {
      var url = "http://www.google.com/search?q=" + input;
      window.open(url);
    }
  });
})();
