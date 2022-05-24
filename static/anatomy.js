$(document).ready(function(){
    $("#next").click(function(){
        let url = 'http://127.0.0.1:5000/learn/2'
        window.location.replace(url)
    });
})