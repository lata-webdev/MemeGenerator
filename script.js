const imgUpload = document.getElementById('imgupload');
const topText = document.getElementById('toptext');
const bottomText = document.getElementById('bottomtext');
const canvas = document.getElementById('memecanvas');
const downloadButton = document.getElementById('downloadmeme');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

let uploadImage;

//image upload handle
imgUpload.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = function () {
        uploadImage = new Image();
        uploadImage.src = reader.result;
        uploadImage.onload = () => drawMeme();
    };
    reader.readAsDataURL(event.target.files[0]);
});

//draw image on canvas
function drawMeme() {
    //clear canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw the image on canvas
    ctx.drawImage(uploadImage, 0, 0, canvas.width, canvas.height);

    //Meme text style
    ctx.font = '28px Impact';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';

    //Add top text
    ctx.fillText(topText.value, canvas.width / 2, 40);
    ctx.strokeText(topText.value, canvas.width / 2, 40);

    //Add bottom text
    ctx.fillText(bottomText.value, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText.value, canvas.width / 2, canvas.height - 20);

}
//update meme text in real
topText.addEventListener('input', drawMeme);
bottomText.addEventListener('input', drawMeme);

//download meme
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
})
