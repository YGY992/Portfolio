from PIL import Image, ImageDraw
from pathlib import Path
p=Path('work/pdf_review')
fs=sorted(p.glob('page-*.jpg'),key=lambda x:int(x.stem.split('-')[1]))
print('renders',len(fs))
for batchno in range((len(fs)+19)//20):
    batch=fs[batchno*20:(batchno+1)*20]
    w,h=420,600
    sheet=Image.new('RGB',(w*4,(h+24)*5),'white')
    d=ImageDraw.Draw(sheet)
    for j,f in enumerate(batch):
        im=Image.open(f)
        im.thumbnail((w,h))
        x=(j%4)*w; y=(j//4)*(h+24)
        sheet.paste(im,(x,y+24))
        d.text((x+6,y+4),f.stem,fill='black')
    sheet.save(p/f'contact{batchno+1}.jpg',quality=90)
