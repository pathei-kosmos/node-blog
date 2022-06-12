const fetchDel = async (endpoint) => {
    const response = await fetch(endpoint, { method: 'DELETE' });
    const data = await response.json();
    return data;
}

const trashcan = document.querySelector('.delete');

trashcan.addEventListener('click', () => {
    const endpoint = `/articles/${trashcan.dataset.doc}`;
    
    fetchDel(endpoint)
        .then(result => window.location.href = result.redirect)
        .catch(err => {
            console.log(err);
        });
}); 