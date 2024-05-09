let cardsData = [
    {
        "id": "kcet",
        "symbol": "☀",
        "pair": 1
    },
    {
        "id": "rgfd",
        "symbol": "☀",
        "pair": 1
    },
    {
        "id": "pihn",
        "symbol": "☂",
        "pair": 2
    },
    {
        "id": "xqwe",
        "symbol": "☂",
        "pair": 2
    },
    {
        "id": "wtba",
        "symbol": "★",
        "pair": 3
    },
    {
        "id": "blsk",
        "symbol": "★",
        "pair": 3
    },
    {
        "id": "zdmn",
        "symbol": "☘",
        "pair": 4
    },
    {
        "id": "uytm",
        "symbol": "☘",
        "pair": 4
    },
    {
        "id": "ncyp",
        "symbol": "☺",
        "pair": 5
    },
    {
        "id": "xyag",
        "symbol": "☺",
        "pair": 5
    },
    {
        "id": "gwyu",
        "symbol": "♫",
        "pair": 6
    },
    {
        "id": "qjta",
        "symbol": "♫",
        "pair": 6
    },
    {
        "id": "qasf",
        "symbol": "⚐",
        "pair": 7
    },
    {
        "id": "ejsz",
        "symbol": "⚐",
        "pair": 7
    },
    {
        "id": "jghp",
        "symbol": "⚛",
        "pair": 8
    },
    {
        "id": "qfhe",
        "symbol": "⚛",
        "pair": 8
    },
    {
        "id": "btpe",
        "symbol": "⚝",
        "pair": 9
    },
    {
        "id": "wpej",
        "symbol": "⚝",
        "pair": 9
    },
    {
        "id": "lfyt",
        "symbol": "✦",
        "pair": 10
    },
    {
        "id": "nrmz",
        "symbol": "✦",
        "pair": 10
    },
    {
        "id": "bces",
        "symbol": "✽",
        "pair": 11
    },
    {
        "id": "iksa",
        "symbol": "✽",
        "pair": 11
    },
    {
        "id": "kwop",
        "symbol": "❆",
        "pair": 12
    },
    {
        "id": "zpxb",
        "symbol": "❆",
        "pair": 12
    },
    {
        "id": "bdte",
        "symbol": "❖",
        "pair": 13
    },
    {
        "id": "rlsa",
        "symbol": "❖",
        "pair": 13
    },
    {
        "id": "sfze",
        "symbol": "☏",
        "pair": 14
    },
    {
        "id": "hkre",
        "symbol": "☏",
        "pair": 14
    },
    {
        "id": "agwp",
        "symbol": "⚬",
        "pair": 15
    },
    {
        "id": "bvmn",
        "symbol": "⚬",
        "pair": 15
    },
    {
        "id": "gfus",
        "symbol": "♦",
        "pair": 16
    },
    {
        "id": "gf8t",
        "symbol": "♦",
        "pair": 16
    }
]
//////////////////////////////////////////////////////////////////////////////////////////////
let setSizeCards = []
let winScore = 0
let score = 0
let missed = 0
let chosenCards = []


const setSize = (num) => {
    document.getElementById("btnDis").style.visibility = "hidden";
    setSizeCards = cardsData.slice(0, num);
    winScore = num / 2;
    shuffleArray()
    setTimeout(buildDisplay,500)
}

const shuffleArray = () => {
    for (let i = setSizeCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [setSizeCards[i], setSizeCards[j]] = [setSizeCards[j], setSizeCards[i]]
    }
}


const buildDisplay = () => {
    document.getElementById("cardContainer").style.visibility = 'visible';
    if (setSizeCards.length >= 16) {
        document.getElementById("cardContainer").style.height = '568px';
    }
    if (setSizeCards.length == 32){
        document.getElementById("cardContainer").style.width ='1136px';
    }

    document.getElementById("displayErea").innerHTML = setSizeCards.map(card => `
    <div id = "${card.id}" class = "card" onclick = "show('${card.id}','${card.pair}')">
        ${card.symbol}
    </div>
    `).join('');
}

const show = (id, pair) => {
    console.log(chosenCards)
    document.getElementById(id).style.background = '#fff';
    document.getElementById(id).style.color = '#7c99f7';
    if (chosenCards.length == 0) {
        chosenCards.push({ "id": id, "pair": pair })
    }

    if (chosenCards.length == 1 && chosenCards[0].id != id) {
        chosenCards.push({ "id": id, "pair": pair })
    }

    if (chosenCards.length == 2) {
        checkMatch()
    }
}


const checkMatch = async () => {
    var card1 = chosenCards[0].pair
    var card2 = chosenCards[1].pair
    var c1Id = chosenCards[0].id
    var c2Id = chosenCards[1].id
    if (card1 == card2) {
        setTimeout(function () {
            document.getElementById(c1Id).style.background = '#cedaeb';
            document.getElementById(c2Id).style.background = '#cedaeb';
            document.getElementById(c1Id).removeAttribute("onclick");
            document.getElementById(c2Id).removeAttribute("onclick");
        }, 400)
        chosenCards = []
        score++
        console.log(score)
        checkWin()
    } else {
        missed++
        setTimeout(function () {
            document.getElementById(c1Id).style.background = '#1F283E';
            document.getElementById(c2Id).style.background = '#1F283E';
            document.getElementById(c1Id).style.color = '#1F283E';
            document.getElementById(c2Id).style.color = '#1F283E';
        }, 400)
        chosenCards = []
    }
}

const checkWin = () => {
    if (score == winScore) {
        document.getElementById('modal').style.visibility = 'visible';
        document.getElementById('modalContent').innerHTML =
            `<div>
            Congratulations! you got it!
                <div>
                    And you only missed ${missed}!
                    <div>
                    <button class = "button-p" onclick="resetGame()">Play again</button>
                    </div>
                </div>
                
        </div>`;
    }
}

const resetGame = () => {
    document.getElementById("modal").style.visibility = "hidden";
    document.getElementById("btnDis").style.visibility = "visible";
    document.getElementById("cardContainer").style.visibility = "hidden";
    document.getElementById("cardContainer").style.height = '283px';
    document.getElementById("cardContainer").style.width = '568px';
    setSizeCards = []
    document.getElementById("displayErea").innerHTML = '';
    score = 0
    missed = 0
}
