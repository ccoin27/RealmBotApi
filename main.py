from flask import Flask, send_file, request, jsonify
import threading
import json, base64, os, io, requests
from flask_cors import CORS
from PIL import Image, ImageDraw, ImageFont
app = Flask('app', template_folder='case', static_folder='enemyes')

@app.route('/')
def index():
  return "Сигма момент"

@app.route('/<enemy>/<animation>.gif')
def main(enemy, animation):
  try:
    return send_file(f'sprites/enemies/{enemy}/{animation}.gif')
  except Exception as e:
    return e


@app.route('/api')
def api():
  return open('api.json', 'r').read().replace("'", '"')


@app.route('/api', methods=['POST'])
def post():
  content = request.json
  print(content)
  open('api.json', 'w').write(str(content))
  return content


@app.route('/rank', methods=['POST'])
def rank():

  level = request.json
  print(level)

  try:
    image_binary = io.BytesIO()
    x = 5
    y = 320
    width = 730
    height = 60
    progress = level['exp'] / level['lvlup']
    bg = (88, 101, 242)
    fg = (127, 255, 0)
    fg2 = (15, 15, 15)
    avatar = level['avatar']
    user = request.args.get('user')

    avatar = Image.open(io.BytesIO(
    requests.get(avatar).content)).convert('RGBA')

    avatar = avatar.resize((256, 256), Image.Resampling.LANCZOS)

    fornext = level['lvlup']

    currect = level['exp']

    lev = level['value']

    im = Image.open("rank_card.png").convert('RGBA')

    im.paste(avatar.convert('RGBA'), (20, 50))

    draw = ImageDraw.Draw(im)

    font = ImageFont.truetype("arial.ttf", 60)

    sub = ImageFont.truetype("arial.ttf", 30)

    draw.text((300, 40), user, font=font)

    draw.text(
      (300, 70),
      f"\n\nУровень: {lev}\nОпыт: {currect}\nЦель: {fornext}\nПроценты: {round(progress * 100)}%",
      font=sub)

    draw.rectangle((x + (height / 2), y, x + width + (height / 2), y + height),
                   fill=fg2,
                   width=10)

    draw.ellipse((x + width, y, x + height + width, y + height), fill=fg2)

    draw.ellipse((x, y, x + height, y + height), fill=fg2)

    width = int(width * progress)

    draw.rectangle((x + (height / 2), y, x + width + (height / 2), y + height),
                   fill=fg,
                   width=10)

    draw.ellipse((x + width, y, x + height + width, y + height), fill=fg)

    draw.ellipse((x, y, x + height, y + height), fill=fg)
    im.save(image_binary, 'PNG')
    image_binary.seek(0)

    return send_file(image_binary,
                     download_name='card.png',
                     mimetype='image/jpg')
  except Exception as e:
    print(e)
    return 'error'


app.run(host="0.0.0.0", port=8080)