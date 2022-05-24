let quiz1Correct = 0
let score = 0
let curPic = 1
let curr = 1
let numQ = 10
let has_submit = false

function renderCorrect() {
    let results = $("#results")
    results.text(`Results: ${quiz1Correct}/5`)
    results.css('fontWeight', 'bold')
    
}

function uploadAnswer(score) {
    return fetch('/upload_answer?score=' + score)
}

// function updateCurr(curr) {
//     return fetch('/upload_answer?curr=' + curr)
// }

function setImage(q) {
    var value = $('#sliderBar').val();
    curPic = value

    if (q == 2) {
        document.getElementById('update').src = "/static/images/aperture/" + value + ".png";
    } else if (q == 3) {
        document.getElementById('update').src = "/static/images/iso/" + value + ".png";
    } else {
        document.getElementById('update').src = "/static/images/sspeed/" + value + ".png";
    }
}



$(document).on('click', '#next', function () {
    if (quizId === 10) {
        let url = `http://127.0.0.1:5000/end`
        window.location.replace(url)
    } else {
        let url = `http://127.0.0.1:5000/quiz/${quizId + 1}`
        window.location.replace(url)
    }
})

function redoQuiz() {
    $.ajax({
        type: "POST",
        url: "/redo_quiz",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            window.location.href = "/quiz";
        },
        error: function (request, status, error) {
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}


$(document).ready(function () {

    $("#submit").click(function () {
        if (has_submit == false) {
        if (quizId === 1) {
            $('.input').each(function () {
                let answer = $(this).val().toLowerCase()
                let id = this.id
                if (answer === id) {
                    $(this).css('color', 'green')
                    quiz1Correct++
                    score += 2
                } else {
                    $(this).val(id)
                    $(this).css('color', 'red')
                }
                $(this).attr('disabled', true)
            });
            renderCorrect()
            uploadAnswer(score).then(r => r.json())
            // uploadAnswer(curr).then(r => r.json())
        } else if (quizId == 2) {

           
                let results = $("#results")
                if (curPic == 1) {
                    results.text(`You got it!`)
                    results.css('color', 'green')
                    score =5
                } else {
                    let msg = 'Wrong Answer, the right setting is ' + question['answers'][question['correct']]
                    results.text(msg)
                    results.css('color', 'red')
                    
                }
            uploadAnswer(score).then(r => r.json())
            // uploadAnswer(curr).then(r => r.json())

        }
        else if (quizId == 3) {

            let results = $("#results")
            if (curPic == 3) {
                results.text(`You got it!`)
                results.css('color', 'green')
                score =5
            } else {
                results.text(`Wrong Answer, the right setting is ISO 100 `)
                results.css('color', 'red')
            }
        uploadAnswer(score).then(r => r.json())
        // uploadAnswer(curr).then(r => r.json())

    }
    else if (quizId == 4) {

        // curr += 1
        // console.log(curr)
        let results = $("#results")
        if (curPic == 2) {
            results.text(`You got it!`)
            results.css('color', 'green')
            score =5
        } else {
            results.text(`Wrong Answer, the right shutter speed is 1/250`)
            results.css('color', 'red')
        }
    uploadAnswer(score).then(r => r.json())
    // uploadAnswer(curr).then(r => r.json())

}
        else {
            $(".answer").each(function () {
                let val = $("input[type='radio']:checked").val()
                let results = $("#results")
                if (parseInt(val) === parseInt(question.correct)) {
                    results.text(`You got it!`)
                    results.css('color', 'green')
                    score = 5
                    
                } else {
                    let msg = 'Wrong Answer, the right answer is \"' + question['answers'][question['correct']] + "\""
                    results.text(msg)
                    results.css('color', 'red')
                }
                $(".answer").attr('disabled', true)
            })
            uploadAnswer(score).then(r => r.json())
            // uploadAnswer(curr).then(r => r.json())

        }

        // let nbutton = $("<button id='next' class='btn btn-outline-primary'>")
        // nbutton.html("Next")
        // $("#buttons").prepend(nbutton)
    has_submit = true
    }
    })

    $("#redo").click(function () {
        redoQuiz()
    })
})
