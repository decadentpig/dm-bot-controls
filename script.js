/** COPYING TO CLIPBOARD **/
function copyText(selection){ 
    document.querySelector('#clipboard-textarea').value = `${selection}`;
    document.querySelector('#clipboard-textarea').select();
    document.execCommand("copy");
    notifyCopy();
};

function copyTrack(){
    let trackID = document.querySelector('input[name="track-list"]:checked').value;
    let url = trackList[trackID][1];
    copyText(`p!play ${url}`);
};

function notifyCopy(){
  const button = document.getElementById('copier');
  button.style.color = 'var(--sub-container-bg)';
  button.innerText = 'DONE!';
  setTimeout(function(){
    const button = document.getElementById('copier');
    button.style.color = 'var(--button-content)';
    button.innerText = 'COPY';
  },600);
};


/** TRACK LIST POPULATE/CLEAR **/
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
    };
};


/** CREATING/CLEARING ENTRIES FROM 'ADD' FORM **/
function createEntry(){
    // Grab user inputs for entry into track list object
    let trackTitle = document.getElementById('track-title').value.toUpperCase();
    let trackURL = document.getElementById('track-url').value;
    let trackDesc1 = document.getElementById('track-desc1').value.toUpperCase();
    let trackDesc2 = document.getElementById('track-desc2').value.toUpperCase();
  
    // Check for invalid inputs
    if (
      trackTitle.length < 1 ||
      trackURL.length < 1 ||
      trackDesc1.length < 1 ||
      trackDesc2.length < 1
    ) {
        throwFormError();
        return;
    };

    // Remove placeholder list item & calculate new key names:
    if (trackList['default']) delete trackList.default;
    let newID = Object.keys(trackList).length+1;
    if (newID >= 10 && newID < 100) newID = '0' + newID;
    if (newID < 10) newID = '00' + newID;

    trackList[newID] = [trackTitle, trackURL, trackDesc1, trackDesc2];
    clearForm();
    populateTrackList();
};

function clearForm(){
    document.getElementById('track-title').value = '';
    document.getElementById('track-url').value = '';
    document.getElementById('track-desc1').value = '';
    document.getElementById('track-desc2').value = '';
};

function toggleForm(){
    let toggler = document.getElementById('add-button');
    let container = document.getElementById('add-form-container');
    if (toggler.innerText === 'ADD'){
        toggler.innerText = 'HIDE';
        container.style.display = 'grid';
    } else if (toggler.innerText === 'HIDE') {
        clearForm();
        toggler.innerText = 'ADD';
        container.style.display = 'none';
    };
};

function throwFormError(){
  document.getElementById('error-field').innerText = 'FIELDS MISSING / INCOMPLETE';
  setTimeout(function(){
     const errorField = document.getElementById('error-field');
     errorField.innerText = '';
  },3000);
};


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
    };
});


/** WRITE CURRENT TRACK LIST TO FILE **/
function writeFile(filename, content){
    let saveButton = document.getElementById('save-button');
    saveButton.setAttribute('href', 'data:text/plain;charet=utf-8,' + encodeURIComponent(content));
    saveButton.setAttribute('download', filename);
}


/** APP COMPLETE RESET **/
function clearAll(){
    clearForm();
  
    listDiv.innerHTML = '';
    trackList = { 'default': '(NO TRACKS LOADED)' };
    document.querySelector('#file-upload').value = '';
    populateTrackList();
};


/** BUTTON BEHAVIOURS **/
document.querySelector('#stop-button').onclick = () => copyText('p!stop');
document.querySelector('#play-button').onclick = () => copyText('p!resume');
document.querySelector('#pause-button').onclick = () => copyText('p!pause');
document.querySelector('#skip-button').onclick = () => copyText('p!skip');
document.querySelector('#rep-all').onclick = () => copyText('p!repeat all');
document.querySelector('#rep-one').onclick = () => copyText('p!repeat one');
document.querySelector('#rep-off').onclick = () => copyText('p!repeat off');
document.querySelector('#copier').onclick = () => copyTrack();
document.querySelector('#clear-button').onclick = () => clearAll();
document.querySelector('#add-button').onclick = () => toggleForm();
document.querySelector('#submit-add-form').onclick = () => createEntry();
document.querySelector('#save-button').onclick = () => writeFile('d&d-tracklist.txt', JSON.stringify(trackList));