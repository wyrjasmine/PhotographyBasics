$(document).ready(function(){
    $("#nextQ").click(function(){
        let url = 'http://127.0.0.1:5000/end'
        window.location.replace(url)
    });
  })