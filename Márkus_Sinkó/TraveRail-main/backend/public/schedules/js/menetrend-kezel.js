async function torol(id) {
    const response = await fetch(`/api/schedules-backend/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const valasz = await response.json();
    if (response.ok) {
        window.alert(valasz.msg);
        window.location.href = '/api/schedules-backend';
    } else {
        window.alert(valasz.msg);
    }
}
