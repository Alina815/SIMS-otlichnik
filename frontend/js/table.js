async function loadTable() {
    const applicants = await getApplicants()
    const tbody = document.getElementById('tableBody')
    tbody.innerHTML = ''
    applicants.forEach(applicant => {
        const row = tbody.insertRow()
        row.insertCell(0).textContent = applicant.lastNameRussian
        row.insertCell(1).textContent = applicant.firstNameRussian
        row.insertCell(2).textContent = applicant.lastNameChiniese
        row.insertCell(3).textContent = applicant.firstNameChiniese
        row.insertCell(4).textContent = applicant.specializationCode
        row.insertCell(5).textContent = applicant.specializationName
        row.insertCell(6).textContent = applicant.email
        row.insertCell(7).textContent = applicant.password
        row.insertCell(8).textContent = applicant.SNILS
        row.insertCell(9).textContent = applicant.passportNumber
        row.insertCell(10).textContent = applicant.passportTime
        row.insertCell(11).textContent = applicant.passportPlace
        row.insertCell(12).textContent = applicant.educationType
        row.insertCell(13).textContent = applicant.doc1Number
        row.insertCell(14).textContent = applicant.doc2Number
        row.insertCell(15).textContent = applicant.partner
        const actionsCell = row.insertCell(16)
        actionsCell.innerHTML = `
            <button onclick="goToEditData(${applicant.id})">✏️</button>
            <button onclick="goToLoadDocs(${applicant.id})">📄</button>
        `
    })
}

function goToEditData(id) {
    window.open(`EditData.html?id=${id}`)
}

function goToLoadDocs(id) {
    window.open(`LoadDocs.html?id=${id}`)
}

document.getElementById('btnExport').onclick = exportToExcel
loadTable()