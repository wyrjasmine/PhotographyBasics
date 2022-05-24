function isFinished() {
    if (curr > num) {
        return true
    }
    return false
}

function progress(finished, curr, num) {
    if(!finished) {
        let ptext = 'You are on question ' + curr + ' of ' + num + '.'
        $('#progress').html(ptext)
        $('#next').html('Continue')

        // $('#continue').append("<button id = \'next\' class = \'start\'> <a href= /quiz/" + curr_question + "></a></button>")
    }
    else {
        let ptext = 'You have completed the quiz.'
        $('#progress').html(ptext)
        $('#next').html('See Results')
    }
}

$(document).ready(function(){
    let finished = isFinished(curr, num)
    progress(finished, curr, num)
    
    $("#next").click(function(){
        if (curr > num) {
            let url = `http://127.0.0.1:5000/end`
            window.location.replace(url)
        } else {
        let url = 'http://127.0.0.1:5000/quiz/' + curr
        console.log(url)
        window.location.replace(url)
        }
    });
})

// function display_continue(curr){
//     let ptext = 'You are on question ' + curr + ' of ' + num + '.'
//     $('#progress').append(ptext)
//     $('#progress').append("<button id = \'next\' class=\"btn btn-primary\"> <a href= \"{{ url_for('quiz', id=curr) }}\"></a></button>")
// }


// $(document).ready(function(){
// 	display_continue(curr) 
// });
