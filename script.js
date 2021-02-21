/** COPYING TO CLIPBOARD **/
function notifyCopy(){
  const button = document.getElementById('copier');
  button.style.color = 'var(--sub-container-bg)';
  button.innerText = 'DONE!';
  setTimeout(function(){
    const button = document.getElementById('copier');
    button.style.color = 'var(--button-content)';
    button.innerText = 'COPY';
  },300);
};

function copyText(selection){ 
    document.querySelector('#clipboard-textarea').value = `${selection}`;
    document.querySelector('#clipboard-textarea').select();
    document.execCommand("copy");
    notifyCopy();
}

function copyTrack(){
    let trackID = document.querySelector('input[name="track-list"]:checked').value;
    let url = trackList[trackID][1];
    copyText(`p!play https://youtu.be/${url}`);
}

/** TRACK LIST POPULATE / CLEAR **/
let trackList = { 'default': '(NO TRACKS LOADED)' };
const listDiv = document.querySelector('#tracklist-container');

function populateTrackList() {

    if (trackList.hasOwnProperty('default')){
        let defaultMessage = document.createElement('p');
        defaultMessage.setAttribute('class', 'tracklist-entries');
        defaultMessage.innerText = trackList['default'];
        listDiv.append(defaultMessage);

        return;
    } else listDiv.innerText = '';

    for (let i in trackList){
        // Create radio button
        let listEntry = document.createElement('input');
        listEntry.setAttribute('type', 'radio');
        listEntry.setAttribute('id', `${i}`);
        listEntry.setAttribute('class', 'tracklist-entries');
        listEntry.setAttribute('value', `${i}`);
        listEntry.setAttribute('name', 'track-list');
      
        // Associated label
        let entryLabel = document.createElement('label');
        entryLabel.setAttribute('for', `${i}`);
        entryLabel.setAttribute('class', 'tracklist-entries');
        entryLabel.innerHTML = `${trackList[i][0]} [${trackList[i][2]}, ${trackList[i][3]}]`;

        // Append to list
        listDiv.append(listEntry);
        listDiv.append(entryLabel);
        listDiv.append(document.createElement('br'));
    }
}

function clearTrackList(){
    listDiv.innerHTML = '';
    trackList = { 'default': '(NO TRACKS LOADED)' };
    document.querySelector('#file-upload').value = '';
    populateTrackList();
}

/** PARSE USER FILE FOR TRACK LIST **/
let inputFile = document.querySelector('#file-upload');

inputFile.addEventListener('change', () => {
    let files = inputFile.files;

    if (files.length === 0) return;

    const userFile = files[0];

    let reader = new FileReader();
    reader.readAsText(userFile);
    reader.onload = (e) => {
        trackList = JSON.parse(e.target.result);
        populateTrackList();
    }
});

/** BUTTON BEHAVIOURS **/
document.querySelector('#stop-button').onclick = () => copyText('p!stop');
document.querySelector('#play-button').onclick = () => copyText('p!resume');
document.querySelector('#pause-button').onclick = () => copyText('p!pause');
document.querySelector('#skip-button').onclick = () => copyText('p!skip');
document.querySelector('#rep-all').onclick = () => copyText('p!repeat all');
document.querySelector('#rep-one').onclick = () => copyText('p!repeat one');
document.querySelector('#rep-off').onclick = () => copyText('p!repeat off');
document.querySelector('#copier').onclick = () => copyTrack();
document.querySelector('#clear-button').onclick = () => clearTrackList();