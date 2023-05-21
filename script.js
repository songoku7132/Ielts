let timeMinut = '3599';
let i = 0;
let summary = ''
const BtnStart = document.querySelector('.start-timer')
const tablo = document.querySelector('.tablo')
const Btn1 = document.querySelector('.one')
const Btn2 = document.querySelector('.two')
const saveBtn1 = document.querySelector('.save-btn1')
const saveBtn3 = document.querySelector('.save-btn3')
const downlBtn1 = document.querySelector('.downL-btn1')
const downlBtn3 = document.querySelector('.downL-btn3')
const el = document.querySelector('#place2')
const count = document.querySelector('.count')
const count2 = document.querySelector('.count2')



const startTimer = () => {
timer = setInterval(function () {
    seconds = timeMinut%60 
    minutes = timeMinut/60%60 
    hour = timeMinut/60/60%60 
    
    if (timeMinut <= 0) {
        
        clearInterval(timer);
        
        alert("Time is over");
    }else if(timeMinut <= 600){
        const el = document.querySelector('.tablo')
        el.style.cssText='color: red;'
        let strTimer = `0${Math.trunc(hour)}:${Math.trunc(minutes)}:${seconds}`;
        
        tablo.innerHTML = strTimer;
    }else { 
        
        // let strTimer = `0${Math.trunc(hour)}:${Math.trunc(minutes)}:${seconds}`;
        let strTimer = `${Math.trunc(minutes)}:${seconds}`;
        
        tablo.innerHTML = strTimer;
    }
    timeMinut--; 
}, 1000)
}
BtnStart.addEventListener('click', startTimer);

Btn1.addEventListener('click',() => {
    blockButton('one');
})
Btn1.addEventListener('click',() => {
    unblockButton('two');
})
Btn2.addEventListener('click',() => {
    blockButton('two');
})
Btn2.addEventListener('click',() => {
    unblockButton('one');
})
const blockButton = (button) => {
    let but = document.querySelector(`.${button}`)
    but.disabled = true;
}
const unblockButton = (button) => {
    let but = document.querySelector(`.${button}`)
    but.disabled = false
}
blockButton('one')
const autoSave = (x) => {
    if (x === '1'){
        i++
        saveText('3','4',i)
    }else if(x === '3'){
        i++
        saveText('1','2',i)      
    }
}

const createPlace = (x,y) => {
    autoSave(x);

    const main = document.querySelector('.main')
    const footer = document.querySelector('.savebtn-box')
    const downBox = document.querySelector('.download-box')
    downBox.textContent = "";
    footer.textContent = "";
    main.textContent = "";

    const sheet1 = document.createElement('textarea')
    sheet1.classList.add('place')
    sheet1.id = `place${x}`
    sheet1.setAttribute('spellcheck','false')
    main.appendChild(sheet1)

    const sheet2 = document.createElement('textarea')
    sheet2.classList.add('place')
    sheet2.id = `place${y}`
    sheet2.setAttribute('spellcheck','false')
    main.appendChild(sheet2)

    const saveBox = document.createElement('div');
    saveBox.classList.add(`save-btn${x}`)
    footer.appendChild(saveBox)

    const save = document.createElement('p')
    save.textContent = 'Save';
    saveBox.appendChild(save)

    const downloadBox = document.createElement('div');
    downloadBox.classList.add(`downL-btn${x}`)
    downBox.appendChild(downloadBox)

    const download = document.createElement('p')
    download.textContent = 'Download';
    downloadBox.appendChild(download)

    saveBox.addEventListener('click', () => {
        saveText(x,y)
    })
    downloadBox.addEventListener('click', () => {
        downloadTextFile(summary,'test.txt')
    })
    sheet2.addEventListener('input', onInput)
    loadText(x,y);
}

Btn1.addEventListener('click', () => {
    createPlace('1','2');
})
Btn2.addEventListener('click', () => {
    createPlace('3','4');
})
const onInput = (event) => {
    let str = event.target.value;
    let wordList = str.split(" ");
    count.innerHTML = wordList;
    let rem = count.innerHTML;
    let gone = rem.split(',');
    console.log(gone.length);
    count2.textContent = `Word Count: ${gone.length}`;
    
}

const saveText = (x,y,i) => {
    const el = document.getElementById(`place${x}`)
    const el2 = document.getElementById(`place${y}`)

    if(i == 1){
        console.log('LOL')
    }else{
    let question = el.value;
    let text = el2.value;
    summary = question + '\n---------------------------\n' + text
    localStorage.setItem(`question${x}`, JSON.stringify(question))
    localStorage.setItem(`text${y}`, JSON.stringify(text))
    }
}

const loadText = (x,y) => {
    const inputQuestion = document.getElementById(`place${x}`);
    const inputText = document.getElementById(`place${y}`);
    question = JSON.parse(localStorage.getItem(`question${x}`));
    text = JSON.parse(localStorage.getItem(`text${y}`));
    inputQuestion.value = question;
    inputText.value = text;
}
createPlace('1','2')

function downloadTextFile(data, filename) {
    var blob = new Blob([data], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
  
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
  
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}