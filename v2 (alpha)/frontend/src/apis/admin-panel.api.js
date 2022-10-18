export async function saveAdminPanel(formState) {
    return await fetch('https://api.leechersparadise.com/admin', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
    })
}
export async function getAdminPanel() {
    return await fetch('https://api.leechersparadise.com/admin', {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        }
    })
}