async function getChartInfo(country){
    document.getElementById('songInfo').style.display = "none";
    
    const lastFmApi = `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&limit=1&api_key=fee660639faf83514aaa7855bb082e4f&format=json`;
    
    const response = await fetch(lastFmApi);

    const data = await response.json();

    let songTitle, artistName, coverArt;

    songTitle = await data.tracks.track[0].name;
    artistName = await data.tracks.track[0].artist.name;
    
    coverArtResponse = await fetch (`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=fee660639faf83514aaa7855bb082e4f&artist=${artistName}&track=${songTitle}&format=json`);
    coverArtData = await coverArtResponse.json();
    coverArt = await coverArtData.track.album.image[2]["#text"];

    document.getElementById('songTitle').innerText = `${songTitle}`;
    document.getElementById('artistName').innerText = `${artistName}`;
    document.getElementById('albumCover').src = `${coverArt}`;
    document.getElementById('songInfo').style.display = "block";
}


document.querySelectorAll(".allPaths").forEach(e => {
    e.addEventListener("mouseover", () => {
        window.onmousemove = (j) => {
            x = j.clientX;
            y = j.clientY;
            document.getElementById('name').style.top = y-60 + 'px';
            document.getElementById('name').style.left = x+10 + 'px';
        }
        e.style.fill = "#fa576a";
        document.getElementById('name').style.opacity = 1;
        document.getElementById("namep").innerText = e.id;
    })

    e.addEventListener("mouseleave", () => {
        e.style.fill = "#1f1f1f";
        document.getElementById('name').style.opacity = 0;
    })

    e.addEventListener("click", () => {
        getChartInfo(e.id).then(() => {
            document.getElementById('countryName').innerText = e.id;
        }
       );
    })
})