let trackList = {
    001: [
        'The Trial (Witcher 3)',
        'L74pTmqgQ9o',
        'COMBAT',
        'CHASE'
    ],
    002: [
        'Aen Seidhe (Witcher 3)',
        'paDuue9Bgas',
        'INVESTIGATION',
        'INTRIGUE'
    ],
    003: [
        'King Bran\'s Final Voyage (Witcher 3)',
        'r_gIRaYQRqo',
        'MOURNING',
        'LOSS'
    ]
}

function copyText(selection){
    document.querySelector('#clipboard-textarea').value = `${selection}`;
    document.querySelector('#clipboard-textarea').select();
    document.execCommand("copy");
}

function copyTrack(){
    // Determine selection and then fetch trackID
    let trackID;
    let url = trackList[trackID][1];

    document.querySelector('#clipboard-textarea').value = `p!play https://youtu.be/${url}`;
    document.querySelector('#clipboard-textarea').select();
    document.execCommand("copy");
}

function populateTrackList() {
    const listDiv = document.querySelector('#tracklist-container')

    for (let i in trackList){
        let listEntry = document.createElement('input');
        listEntry.setAttribute('class', 'tracklist-entries');
        listEntry.setAttribute('type', 'radio');
        listEntry.setAttribute('name', `${i}`);

        let entryLabel = document.createElement('label');
        entryLabel.setAttribute('for', `${i}`);
        entryLabel.textContent = `${i}: ${trackList[i][0]}`;
        listDiv.append(listEntry);
        listDiv.append(entryLabel);
    }
}