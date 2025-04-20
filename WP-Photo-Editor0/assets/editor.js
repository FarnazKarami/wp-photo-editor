let canvas = new fabric.Canvas('editor-canvas');
canvas.setBackgroundColor('#ffffff', canvas.renderAll.bind(canvas));

// بارگذاری تصویر
const imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    fabric.Image.fromURL(event.target.result, function (img) {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.8,
        scaleY: 0.8
      });
      canvas.clear();
      canvas.add(img);
      canvas.setActiveObject(img);
    });
  }
  reader.readAsDataURL(e.target.files[0]);
});

function addText() {
  const text = new fabric.Textbox("متن دلخواه", {
    left: 50,
    top: 50,
    fontSize: 24,
    fill: '#000000'
  });
  canvas.add(text);
}

function addRect() {
  const rect = new fabric.Rect({
    left: 70,
    top: 70,
    fill: 'blue',
    width: 100,
    height: 80
  });
  canvas.add(rect);
}

function addCircle() {
  const circle = new fabric.Circle({
    left: 150,
    top: 150,
    radius: 40,
    fill: 'green'
  });
  canvas.add(circle);
}

function applyFilters() {
  const obj = canvas.getActiveObject();
  if (obj && obj.type === 'image') {
    obj.filters.push(new fabric.Image.filters.Brightness({ brightness: 0.1 }));
    obj.filters.push(new fabric.Image.filters.Contrast({ contrast: 0.15 }));
    obj.filters.push(new fabric.Image.filters.Saturation({ saturation: 0.3 }));
    obj.applyFilters();
    canvas.renderAll();
  }
}

function cropImage() {
  const activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === 'image') {
    const cropped = new fabric.Image(activeObject.getElement(), {
      left: activeObject.left,
      top: activeObject.top,
      width: 200,
      height: 200,
      cropX: 50,
      cropY: 50
    });
    canvas.remove(activeObject);
    canvas.add(cropped);
    canvas.setActiveObject(cropped);
  }
}

function removeSelected() {
  const obj = canvas.getActiveObject();
  if (obj) canvas.remove(obj);
}

function removeBackground() {
  alert("در نسخه کامل باید به API حذف پس‌زمینه وصل شوید (مثلاً remove.bg یا Pixian.ai)");
}

function saveImage() {
  const dataURL = canvas.toDataURL('image/png');
  console.log('تصویر ذخیره شد:', dataURL);
  // اینجا می‌توانید AJAX برای ذخیره در کتابخانه وردپرس ارسال کنید
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvas.toDataURL();
  link.click();
}
