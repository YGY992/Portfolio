from pypdf import PdfReader
r=PdfReader(r'C:\Users\User\Downloads\Portfolio.pdf')
print('pages',len(r.pages))
for i,p in enumerate(r.pages):
    urls=[]
    for a in (p.get('/Annots') or []):
        o=a.get_object(); ac=o.get('/A')
        if ac and ac.get('/URI'): urls.append(str(ac.get('/URI')))
    if urls: print(i+1,urls)
