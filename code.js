let cardsData = [
    {
        "id": "kcet",
        "symbol": "&#9728;",
        "pair": 1
    },
    {
        "id": "rgfd",
        "symbol": "&#9728;",
        "pair": 1
    },
    {
        "id": "pihn",
        "symbol": "&#9730;",
        "pair": 2
    },
    {
        "id": "xqwe",
        "symbol": "&#9730;",
        "pair": 2
    },
    {
        "id": "wtba",
        "symbol": "&#9733;",
        "pair": 3
    },
    {
        "id": "blsk",
        "symbol": "&#9733;",
        "pair": 3
    },
    {
        "id": "zdmn",
        "symbol": "&#9752;",
        "pair": 4
    },
    {
        "id": "uytm",
        "symbol": "&#9752;",
        "pair": 4
    },
    {
        "id": "ncyp",
        "symbol": "&#9786;",
        "pair": 5
    },
    {
        "id": "xyag",
        "symbol": "&#9786;",
        "pair": 5
    },
    {
        "id": "gwyu",
        "symbol": "&#9835;",
        "pair": 6
    },
    {
        "id": "qjta",
        "symbol": "&#9835;",
        "pair": 6
    },
    {
        "id": "qasf",
        "symbol": "&#9872;",
        "pair": 7
    },
    {
        "id": "ejsz",
        "symbol": "&#9872;",
        "pair": 7
    },
    {
        "id": "jghp",
        "symbol": "&#9883;",
        "pair": 8
    },
    {
        "id": "qfhe",
        "symbol": "&#9883;",
        "pair": 8
    },
    {
        "id": "btpe",
        "symbol": "&#9885;",
        "pair": 9
    },
    {
        "id": "wpej",
        "symbol": "&#9885;",
        "pair": 9
    },
    {
        "id": "lfyt",
        "symbol": "&#10022;",
        "pair": 10
    },
    {
        "id": "nrmz",
        "symbol": "&#10022;",
        "pair": 10
    },
    {
        "id": "bces",
        "symbol": "&#10045;",
        "pair": 11
    },
    {
        "id": "iksa",
        "symbol": "&#10045;",
        "pair": 11
    },
    {
        "id": "kwop",
        "symbol": "&#10054;",
        "pair": 12
    },
    {
        "id": "zpxb",
        "symbol": "&#10054;",
        "pair": 12
    },
    {
        "id": "bdte",
        "symbol": "&#10070;",
        "pair": 13
    },
    {
        "id": "rlsa",
        "symbol": "&#10070;",
        "pair": 13
    },
    {
        "id": "sfze",
        "symbol": "&#9743;",
        "pair": 14
    },
    {
        "id": "hkre",
        "symbol": "&#9743;",
        "pair": 14
    },
    {
        "id": "agwp",
        "symbol": "&#9900;",
        "pair": 15
    },
    {
        "id": "bvmn",
        "symbol": "&#9900;",
        "pair": 15
    },
    {
        "id": "gfus",
        "symbol": "&#x2666;",
        "pair": 16
    },
    {
        "id": "gf8t",
        "symbol": "&#x2666;",
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