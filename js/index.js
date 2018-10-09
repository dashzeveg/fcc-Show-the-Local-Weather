$(document).ready(function() {
  geolocation();
  $("#changeUnit").on("click", function() {
    geolocation();
  });

  function geolocation() {
    if ($("#changeUnit").html().toLowerCase() == "c") {
      var unit = "imperial";
      var unit1 = "f";
    } else {
      var unit = "metric";
      var unit1 = "c";
    }

    $("#changeUnit").html(unit1.toUpperCase());
    $.getJSON("https://freegeoip.net/json/", function(json) {
      //alert(json.country_code+" "+json.country_name+" "+json.latitude+" "+json.longitude+" ");
      $(".wLocation").html(json.country_name + ", " + json.country_code);
      weather(json.latitude, json.longitude, unit);
    });
  }

  function weather(lat, lon, unit) {
    $.getJSON(
      "https://api.openweathermap.org/data/2.5/weather?q=Ulaanbaatar,MN&APPID=71279ba1ee1aeff72bfe124503eb071b&units=" +
        unit,
      function(json) {
        var wTemperatureVal = json.main.temp;
        var wTemperatureUnit = "F";
        var wImage = '<i class="wi wi-owm-' + json.weather[0].id + '"></i>';
        var wImage1 = json.weather.id;
        var wText = json.weather[0].main;
        var wLocation = json.name + ", " + json.sys.country;

        changeInfo(wLocation, wTemperatureVal, wTemperatureUnit, wImage, wText);
      }
    );
  }

  function changeInfo(
    wLocation,
    wTemperatureVal,
    wTemperatureUnit,
    wImage,
    wText
  ) {
    $(".wLocation").html(wLocation);
    $(".wTemperatureVal").html(wTemperatureVal);
    $(".wImage").html(wImage);
    $(".wText").html(wText);
  }
});