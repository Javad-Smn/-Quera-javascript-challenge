document.querySelector("#send-requests").addEventListener("click", async () => {
    const reqs = document.querySelector("#urls").value.trim().split(/\s+/);
    document.querySelector("#results").innerHTML = "";
    for await ( const req of reqs ) {
        const response = await fetch( req )
        .then(response => response.json())
        .then(data => document.querySelector("#results").innerHTML += `<div class="result">${JSON.stringify(data)}</div>`)
        .catch( () =>  document.querySelector("#results").innerHTML += `<div class="result">error</div>`)
    }
});