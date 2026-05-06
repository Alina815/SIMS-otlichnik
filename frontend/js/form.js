const fileInput = document.createElement("input");
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

imageToUpdate = null;
function openFileSelector(imageElement) {
    imageToUpdate = imageElement;
    fileInput.click();
}

fileInput.addEventListener('change', function(event) {
    if (imageToUpdate && event.target.files.length > 0) {
        const file = event.target.files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageToUpdate.src = e.target.result;
                fileInput.value = '';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Пожалуйста, выберите изображение!');
        }
    }
});

const imgAvatar = document.querySelector(".avatar-block img");
document.getElementById("btnPhoto").onclick = () => { openFileSelector(imgAvatar)};

const DocImages = document.querySelectorAll(".doc-card img");
document.getElementById("btnRUPassport").onclick = () => openFileSelector(DocImages[0]);
document.getElementById("btnRUSNILS").onclick = () => openFileSelector(DocImages[1]);
document.getElementById("btnRuDoc1").onclick = () => openFileSelector(DocImages[2]);
document.getElementById("btnRUDoc2").onclick = () => openFileSelector(DocImages[3]);
document.getElementById("btnRUPerformance").onclick = () => openFileSelector(DocImages[4]);

document.getElementById("btnCNPassport").onclick = () => openFileSelector(DocImages[5]);
document.getElementById("btnCNSNILS").onclick = () => openFileSelector(DocImages[6]);
document.getElementById("btnCNDoc1").onclick = () => openFileSelector(DocImages[7]);
document.getElementById("btnCNDoc2").onclick = () => openFileSelector(DocImages[8]);
document.getElementById("btnCNPerformance").onclick = () => openFileSelector(DocImages[9]);