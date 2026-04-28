let feltoltesGomb = document.querySelector('#feltoltes');
feltoltesGomb.addEventListener('click', (event) => feltoltes(event));

async function feltoltes(event) {
    event.preventDefault();

    try {
        // Alap mezők beolvasása
        const jarat = document.querySelector('#jarat').value;
        const induloallomas = document.querySelector('#induloallomas').value;
        const celallomas = document.querySelector('#celallomas').value;

        // Többes kijelölés beolvasása
        const allomasokSelect = document.querySelector('#allomasok');
        const allomasok = Array.from(allomasokSelect.selectedOptions).map(
            (o) => o.value
        );

        const kedvezmenySelect = document.querySelector('#kedvezmeny');
        const kedvezmeny = Array.from(kedvezmenySelect.selectedOptions).map(
            (o) => o.value
        ); //  ezt kell

        const kortablakSelect = document.querySelector('#kortablak'); // ezt kell
        const kortablak = Array.from(kortablakSelect.selectedOptions).map(
            (o) => o.value
        ); //  ezt kell

        const idotartam = document.querySelector('#idotartam').value;

        const idopontokSelect = document.querySelector('#idopontok'); // ezt kell
        const idopontok = Array.from(idopontokSelect.selectedOptions).map(
            (o) => o.value
        ); // ezt kell

        const klimak = document.getElementsByName('klima');
        
        let klima = '';
        if (klimak[0].checked) klima = klimak[0].value;
        else klima = klimak[1].value;
        console.log(klima);

        const helyjegyek = document.getElementsByName('helyjegy');
        
        let helyjegy = '';
        if (helyjegyek[0].checked) helyjegy = helyjegyek[0].value;
        else helyjegy = helyjegyek[1].value;
        console.log(helyjegy);

        const arak = document.getElementById('ar');
        let ar = arak.value;

        const kep1 = document.querySelector('#kep1').value;
        const kep2 = document.querySelector('#kep2').value;

        console.log({
            jarat,
            induloallomas,
            celallomas,
            allomasok,
            kedvezmeny,
            kortablak,
            idotartam,
            idopontok,
            klima,
            helyjegy,
            kep1,
            kep2,
            ar
        });

        // Küldés backend felé
        const response = await fetch(`/api/new-schedule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jarat,
                induloallomas,
                celallomas,
                allomasok,
                kedvezmeny,
                kortablak,
                idotartam,
                idopontok,
                klima,
                helyjegy,
                kep1,
                kep2,
                ar
            }),
        });

        const vissza = await response.json();
        console.log(vissza);

        if (response.ok) {
            alert(vissza.msg);
            window.location.href = '/api/schedules-backend';
        } else {
            alert(vissza.msg);
        }
    } catch (error) {
        console.error('Hiba:', error.message);
    }
}
