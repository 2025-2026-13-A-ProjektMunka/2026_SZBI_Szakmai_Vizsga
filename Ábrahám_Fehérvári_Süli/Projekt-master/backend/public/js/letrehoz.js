async function letrehoz(event) {
    event.preventDefault();
    const nev = document.querySelector('#nev').value;
    const elerhetoseg = document.querySelector('#elerhetoseg').value;
    const specialization = document.querySelector('#specialization').value;
    const experience = document.querySelector('#experience').value;
    // const tartalom = document.querySelector('#tartalom').value;
    const ar = document.querySelector('#ar').value;
    // const peldanySzam = document.querySelector('#peldanySzam').value;
    // const kedvezmeny = document.querySelector('#kedvezmeny').value;
    const kep = document.querySelector('#kep').value;
    console.log({
            nev,
            elerhetoseg,
            specialization,
            experience,
            ar,
            kep,
        });
    
    const response = await fetch('/api/new-trainer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nev,
            elerhetoseg,
            specialization,
            experience,
            ar,
            kep,
        }),
    });

    console.log(response);
    const resp = await response.json();

    if (response.ok) {
        window.alert(resp.msg);
        window.location.href = '/api/trainers-backend';
    } else {
        window.alert(resp.msg);
    }
}
