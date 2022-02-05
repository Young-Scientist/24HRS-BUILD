import numpy as np
from PIL import Image, ImageDraw, ImageFont
from os import listdir
from os.path import isfile, join


def create_photo_collage(filepath, text):

    mypath = filepath
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath,f))]
    images_ = np.empty(len(onlyfiles), dtype=object)


    if len(images_) < 8:
        return False
    else:

        text_image = Image.new('RGB', (500,500), color = (20, 20, 20, 255))
        image_text = str(text)
        fontsize = 1

        img_fraction = 0.50

        font = ImageFont.truetype('Lemon Fresh.otf', fontsize)
        while font.getsize(image_text)[0] < img_fraction*text_image.size[0]:
            # iterate until the text size is just larger than the criteria
            fontsize += 1
            font = ImageFont.truetype("arial.ttf", fontsize)

        # optionally increment to be sure it is more than criteria
        fontsize += 20
        font = ImageFont.truetype('Lemon Fresh.otf', fontsize)

        text_image_editable = ImageDraw.Draw(text_image)
        text_image_editable.text((100,200), image_text, (255, 255, 255), font=font)


        for n in range(0, len(onlyfiles)):
            images_[n] = Image.open(join(mypath, onlyfiles[n])).convert("RGBA")
            images_[n] = images_[n].resize((500,500))

        collage = Image.new("RGBA", (1500,1500), color=(255,255,255,255))

        c=0

        for i in range(0,1500,500):
            for j in range(0,1500,500):
                if i == 500 and j == 500:
                    collage.paste(text_image, (i,j))
                else:       
                    collage.paste(images_[c], (i,j))
                    c+=1

        collage = collage.convert('RGB')
        collage.save('static/saved.jpg')

        return True