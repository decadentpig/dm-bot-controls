let trackList = {
    001: [
        'THE TRIAL',
        'L74pTmqgQ9o',
        'COMBAT',
        'CHASE'
    ],
    002: [
        'AEN SEIDHE',
        'paDuue9Bgas',
        'INVESTIGATION',
        'INTRIGUE'
    ],
    003: [
        'KING BRAN\'S FINAL VOYAGE',
        'r_gIRaYQRqo',
        'MOURNING',
        'LOSS'
    ]
}

function copyText(selection){ 
    // Copy text to clipboard
    document.querySelector('#clipboard-textarea').value = `${selection}`;
    document.querySelector('#clipboard-textarea').select();
    document.execCommand("copy");
}

function populateTrackList() {
    const listDiv = document.querySelector('#tracklist-container');

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
  
    document.getElementById('1').checked = true;
}

function copyTrack(){
    // Determine selection and then fetch trackID
    let trackID = document.querySelector('input[name="track-list"]:checked').value;
    let url = trackList[trackID][1];

    document.querySelector('#clipboard-textarea').value = `p!play https://youtu.be/${url}`;
    document.querySelector('#clipboard-textarea').select();
    document.execCommand("copy");
}

// Find buttons
const stopButton = document.querySelector('#stop-button');
const playButton = document.querySelector('#play-button');
const pauseButton = document.querySelector('#pause-button');
const skipButton = document.querySelector('#skip-button');
const repeatAll = document.querySelector('#rep-all-button');
const repeatOne = document.querySelector('#rep-one-button');
const repeatOff = document.querySelector('#rep-off-button');
const copierButton = document.querySelector('#copier');

// Button behaviours
stopButton.onclick = () => copyText('p!stop');
playButton.onclick = () => copyText('p!resume');
pauseButton.onclick = () => copyText('p!pause');
skipButton.onclick = () => copyText('p!skip');
repeatAll.onclick = () => copyText('p!repeat all');
repeatOne.onclick = () => copyText('p!repeat one');
repeatOff.onclick = () => copyText('p!repeat off');
copierButton.onclick = () => copyTrack();