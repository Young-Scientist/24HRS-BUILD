import os
from werkzeug.utils import secure_filename
from flask import Flask, flash, request, redirect, render_template, url_for
import merge_pictures


app = Flask(__name__)
app.secret_key = "secret key"

app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024

path = os.getcwd()
UPLOAD_FOLDER = os.path.join(path, 'uploads')

if not os.path.isdir(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def upload_form():
    return render_template('upload.html')


@app.route('/', methods=['POST'])
def upload_file():
    if request.method == 'POST':

        image_text = request.form['image_text']

        if 'files[]' not in request.files:
            flash('No file part')
            return redirect(request.url)

        files = request.files.getlist('files[]')

        if len(files) != 8:
            flash('8 Images are required to make a beautiful collage')
            return render_template('upload.html')
        else:
            pass
            for file in files:
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                
            if merge_pictures.create_photo_collage(UPLOAD_FOLDER, image_text):
                return render_template('photo_collage.html')
            else:
                flash('An error occured. Files in folder not up to 8')
                return render_template('upload.html')


@app.route('/display')
def collage():
    return render_template('photo_collage.html')

if __name__ == "__main__":
    app.run(host='127.0.0.1',port=5000,debug=False,threaded=True)