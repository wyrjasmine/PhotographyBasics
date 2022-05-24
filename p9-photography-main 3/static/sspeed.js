let cur = 1

$(document).ready(function(){
    $("#next").click(function(){
        let url = 'http://127.0.0.1:5000/quiz'
        window.location.replace(url)
    });
    $("#back").click(function(){
        let url = 'http://127.0.0.1:5000/learn/3'
        console.log(url)
        window.location.replace(url)
    });
})

// function updatePic(){
//     cur = cur%3 + 1
//     document.getElementById('update').src="/static/images/sspeed/" + cur + ".png";
// }
function setImage()
{
	var value = $('#sliderBar').val();
    console.log(value)
    document.getElementById('update').src="/static/images/sspeed/" + value + ".png";
}
