from http import client
from flask import Flask
from flask import render_template,  redirect, url_for
from flask import Response, request, jsonify

app = Flask(__name__)

curr_question = 1
num_of_questions = 10
questionInfo = {'score': 0}
answer_select = ['A', 'B', 'C', 'D', 'E']
questions = [
    {
        "id": "1",
        "question": "Adjust the aperture to match the sample photo",
        "answers": ["F/22", "F/4", "F/2.8"],
        "correct": 0
    },
    {
        "id": "2",
        "question": "Adjust the ISO to match the sample photo",
        "answers": ["ISO 100", "ISO 1600", "ISO 12800"],
        "correct": 2
    },
    {
        "id": "3",
        "question": "Adjust the shutter speed to match the sample photo",
        "answers": ["1/750", "1/250", "1/10"],
        "correct": 1
    },
    {
        "id": "4",
        "question": "What changes the graininess of the photo?",
        "answers":  ["ISO", "Aperture", "Lenses", "Shutter Speed"],
        "correct": 0
    },
    {
        "id": "5",
        "question": "If you want motion blur in your photo, what setting should you choose?",
        "answers": ["Smaller aperture", "Long shutter speed", "Short shutter speed", "High ISO"],
        "correct": 1
    },
    {
        "id": "6",
        "question": "What is depth of field?",
        "answers": ["How far the image is", "How blurry the background is", "How close the image is to the camera",
                    "How grainy the photo is"],
        "correct": 1
    },
    {
        "id": "7",
        "question": "What is the monitor?",
        "answers": ["The little thing at the top of the camera", "A computer screen", "The screen on the camera",
                    "Where you adjust the settings"],
        "correct": 2
    },
    {
        "id": "8",
        "question": "If you want the background blurry, what setting should you choose?",
        "answers": ["Large aperture", "Long shutter speed", "High ISO" , "Small aperture"],
        "correct": 3
    },
    {
        "id": "9",
        "question": "If you want the photo to be less grainy, what setting should you choose?",
        "answers": ["Smaller aperture", "Low ISO", "Longer shutter speed" , "High ISO"],
        "correct": 1
    },
    
]

learn_templates = {
    1: "anatomy.html",
    2: "aperture.html",
    3: "ISO.html",
    4: "sspeed.html",
}


@app.route('/')
def welcome():
    return render_template('welcome.html')


@app.route('/learn/<id>')
def learn(id):
    return render_template(learn_templates[int(id)])


@app.route('/quiz')
def quizstart():
    return render_template('start.html', curr=curr_question, num=num_of_questions)


@app.route('/redo_quiz', methods=['GET', 'POST'])
def redo_quiz():
    global curr_question
    curr_question = 1
    return redirect((url_for('quizstart')))


@app.route('/quiz/<int:quiz_id>', methods=['GET', 'POST'])
def quiz(quiz_id):
    if request.method == "GET":
        question = []
        if quiz_id > 10:
            quiz_id = 1 
        if quiz_id >= 2:
            question = questions[quiz_id - 2]
        return render_template('quiz.html', quizId=quiz_id, question=question, answer_select=answer_select)


@app.route('/upload_answer')
def upload_answer():
    global curr_question
    score = request.args.get('score', 0)
    score = int(score)
    questionInfo['score'] += score
    curr_question += 1
    return jsonify({}), 200


@app.route('/end')
def end():
    score = questionInfo['score']
    questionInfo['score'] = 0
    return render_template('quiz_results.html', score=score)


if __name__ == '__main__':
    app.run(debug=True)
