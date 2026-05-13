const saveBtn = document.getElementById('btnSave');
saveBtn.addEventListener('click', async () => {
   const selectedCode = document.getElementById('specializationCode')?.value || '';
   const selectedName = document.getElementById('specializationName')?.selectedOptions[0]?.textContent || '';
   const formData = {
       specializationCode: selectedCode,
       specializationName: selectedName,
       lastNameRussian: document.querySelector('#Russia input:nth-child(1)')?.value || '',
       firstNameRussian: document.querySelector('#Russia input:nth-child(2)')?.value || '',
       lastNameChinese: document.querySelector('#China input:nth-child(1)')?.value || '',
       firstNameChinese: document.querySelector('#China input:nth-child(2)')?.value || '',
       email: document.querySelector('#Russia input:nth-child(3)')?.value || '',
       password: document.querySelector('#Russia input:nth-child(4)')?.value || '',
       emailCn: document.querySelector('#China input:nth-child(3)')?.value || '',
       passwordCn: document.querySelector('#China input:nth-child(4)')?.value || '',
   };
   if (!formData.lastNameRussian || !formData.firstNameRussian || !formData.email) {
       alert('Пожалуйста, заполните обязательные поля: Фамилия, Имя и Email на русском языке');
       return;
   }
   const userConfirmed = confirm(
       'Сохранить изменения?\n\n' +
       'Все введённые данные будут сохранены.'
   );
   if (!userConfirmed) {
       return;
   }
   const originalText = saveBtn.textContent;
   saveBtn.textContent = 'СОХРАНЕНИЕ...';
   saveBtn.disabled = true;
   try {
       let result;
       if (applicantId) {
           result = await updateApplicant(applicantId, formData);
       } else {
           result = await createApplicant(formData);
       }
       if (result.success || result.id) {
           alert('Данные успешно сохранены!');
           window.location.href = 'GeneralTable.html';
       } else {
           alert(`Ошибка сохранения: ${result.message || 'Неизвестная ошибка'}`);
           saveBtn.textContent = originalText;
           saveBtn.disabled = false;
       }
   } catch (error) {
       console.error('Ошибка сети:', error);
       alert('Ошибка соединения с сервером. Проверьте, запущен ли бэкенд.');
       saveBtn.textContent = originalText;
       saveBtn.disabled = false;
   }
});

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

fileInput.addEventListener('change', async function(event) {
   if (imageToUpdate && event.target.files.length > 0) {
       const file = event.target.files[0];
       if (file.type.startsWith('image/')) {
           const result = await uploadPhoto(applicantId, file);
           if (result.success || result.file_path) {
               const reader = new FileReader();
               reader.onload = function(e) {
                   imageToUpdate.src = e.target.result;
               };
               reader.readAsDataURL(file);
           } else {
               alert('Ошибка загрузки фото');
           }
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

const urlParams = new URLSearchParams(window.location.search);
const applicantId = urlParams.get('id');
const deleteBtn = document.getElementById('btnDelete');
deleteBtn.addEventListener('click', async () => {
   if (!applicantId) {
       alert('ID абитуриента не найден. Возможно, это новый абитуриент.');
       return;
   }
   const userConfirmed = confirm(
       'Вы уверены, что хотите удалить этого абитуриента?\n\n' +
       'Это действие НЕЛЬЗЯ будет отменить. Все данные и документы будут удалены.'
   );
   if (!userConfirmed) {
       return;
   }
   deleteBtn.textContent = 'УДАЛЕНИЕ...';
   deleteBtn.disabled = true;
   try {
       const result = await deleteApplicant(applicantId);
           if (result.success === true || result.ok === true) {
           alert('Абитуриент успешно удалён!');
           window.location.href = 'GeneralTable.html';
       } else {
           alert(`Ошибка удаления: ${result.message || 'Неизвестная ошибка'}`);
           deleteBtn.textContent = 'УДАЛИТЬ АБИТУРИЕНТА';
           deleteBtn.disabled = false;
       }
   } catch (error) {
       console.error('Ошибка сети:', error);
       alert('Ошибка соединения с сервером. Проверьте, запущен ли бэкенд.');
       deleteBtn.textContent = 'УДАЛИТЬ АБИТУРИЕНТА';
       deleteBtn.disabled = false;
   }
});

let specializationsList = [];

async function loadSpecializations() {
   const codeSelect = document.getElementById('specializationCode');
   const nameSelect = document.getElementById('specializationName');
   if (!codeSelect || !nameSelect) return;
   try {
       specializationsList = await getSpecializations();
       codeSelect.innerHTML = '<option value="">Код специализации</option>';
       nameSelect.innerHTML = '<option value="">Название специализации</option>';
       specializationsList.forEach(spec => {
           const codeOption = document.createElement('option');
           codeOption.value = spec.code;
           codeOption.textContent = spec.code;
           codeSelect.appendChild(codeOption);
           const nameOption = document.createElement('option');
           nameOption.value = spec.code;
           nameOption.textContent = spec.name;
           nameSelect.appendChild(nameOption);
       });
       specializationSync();
   } catch (error) {
       console.error('Ошибка загрузки специализаций:', error);
   }
}

function specializationSync() {
   const codeSelect = document.getElementById('specializationCode');
   const nameSelect = document.getElementById('specializationName');
   if (!codeSelect || !nameSelect) return;
   // подстановка названия при выборе кода
   codeSelect.addEventListener('change', () => {
       const selectedCode = codeSelect.value;
       if (selectedCode === '') {
           nameSelect.value = '';
           return;
       }
       const found = specializationsList.find(spec => spec.code === selectedCode);
       if (found) {
           nameSelect.value = found.code;
       } else {
           nameSelect.value = '';
       }
   });
   // подстановка кода при выборе названия
   nameSelect.addEventListener('change', () => {
       const selectedName = nameSelect.value;
       if (selectedName === '') {
           codeSelect.value = '';
           return;
       }
       codeSelect.value = selectedName;
   });
}

loadSpecializations();
loadApplicantData();
