import fs from 'node:fs/promises';
import path from 'node:path';
import { Presentation, PresentationFile } from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';

const outDir = path.resolve('outputs');
const workDir = path.resolve('work/cover_build');
await fs.mkdir(outDir, {recursive:true});
const ppt = Presentation.create({slideSize:{width:1280,height:720}});
const slide = ppt.slides.add();
slide.background.fill = '#101216';

function textBox(name, text, x, y, w, h, size, color, bold=false) {
  const shape = slide.shapes.add({
    geometry:'textbox', name,
    position:{left:x, top:y, width:w, height:h},
    fill:'none', line:{style:'solid', fill:'none', width:0}
  });
  shape.text = text;
  shape.text.style = {fontSize:size, color, bold, autoFit:'shrinkText', wrap:'square', insets:0};
  return shape;
}

textBox('portfolio-label','GAME CLIENT PROGRAMMER     PORTFOLIO · 2026',78,68,560,30,17,'#5A8DFF',true);
textBox('candidate-name','김수현',78,128,520,58,42,'#F4F5F7',true);
textBox('positioning','게임 시스템을 설계하고,\n플레이 문제를 코드로 해결하는\n게임 클라이언트 개발자',78,221,548,166,36,'#F4F5F7',true);
textBox('engine-experience','Unreal C++  /  Unity C#',80,424,530,36,24,'#DCE0E7',true);
textBox('proof-points','동적 맵 생성, 청크 기반 AI,\n이벤트 시스템, 충돌 판정',80,472,530,66,21,'#A9B0BC',false);
textBox('education','홍익대학교 게임학부  ·  2027년 2월 졸업 예정',80,600,540,32,18,'#A9B0BC',false);
textBox('contact','kimsoohyen@naver.com     github.com/YGY992',80,649,560,28,16,'#DCE0E7',false);

const heroBytes = await fs.readFile(path.resolve('work/pdf_review/hero.png'));
const heroArray = heroBytes.buffer.slice(heroBytes.byteOffset, heroBytes.byteOffset + heroBytes.byteLength);
slide.images.add({
  blob:heroArray, contentType:'image/png',
  alt:'Neapolitan game title screen from the portfolio',
  fit:'cover',
  position:{left:680,top:152,width:540,height:304}
});
textBox('project-name','NEAPOLITAN',680,484,540,30,20,'#F4F5F7',true);
textBox('project-caption','동적 미로 생성과 청크 기반 AI 구현',680,521,540,34,19,'#A9B0BC',false);

const png = await ppt.export({slide,format:'png',scale:1});
await fs.writeFile(path.join(outDir,'portfolio_cover_mockup.png'),new Uint8Array(await png.arrayBuffer()));
const draft = await PresentationFile.exportPptx(ppt);
await draft.save(path.join(workDir,'cover_mockup_draft.pptx'));
console.log('Rendered preview and draft slide.');




