
const inputValue = document.getElementById('inputValue');
document.getElementById('search-btn').addEventListener('click', function () {

    fetch(' https://api.lyrics.ovh/suggest/' + inputValue.value)
        .then(res => res.json())
        .then(value => {
            console.log(value);
            const dataArray = value.data.slice(0, 10);
            const mainDiv = document.getElementById('song-container');

            let master = ``;

            for (let i = 0; i < dataArray.length; i++) {
                const element = dataArray[i];
                const song = element.title;
                const artist = element.artist['name'];
                const title = element.album['title'];
                master = master + `<div class="single-result row align-items-center my-3 p-3" id="lyrics-area">
                   <div class="col-md-9">
                    <h3 class="lyrics-name">${element.title} </ h3>
                        
                       <p>Album : <span>${element.album['title']}</span></p>
                       <p>Album by <span>${element.artist['name']}</span>  <a class="link-img" href="${element.preview}" target="_blank"></a></p>
                       
                   </div>
                   <div class="col-md-3 text-md-right text-center">
                       <button onclick="getLyrics('${artist}', '${song}')" class="btn btn-success">Get Lyrics</button>
                   </div>
               </div>`;

            }
            mainDiv.innerHTML = master;
            // console.log(mainDiv.innerHTML);
            const songArea = document.getElementById('song-container');
            songArea.style.display = "block";


        })
})

function getLyrics(artist, song) {

    fetch('https://api.lyrics.ovh/v1/' + artist + '/' + song)
        .then(res => res.json())
        .then(data => {
            // console.log(data.lyrics);
            const lyricsValue = `
                   <button class="btn go-back">&lsaquo;</button>
                   <h2 class="text-success mb-4">${song}-${artist}</h2>
                   <pre class="lyric text-white">${data.lyrics}</pre>
                   `
            const lyricsContainer = document.getElementById('lyrics-container');
            lyricsContainer.innerHTML = lyricsValue;
            lyricsContainer.style.display = "block";
        })
}

