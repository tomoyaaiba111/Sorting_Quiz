//問題
const question = [
    {
        q: "2023/12/31時点で日本企業時価総額が高い順に並べ替えてください",
        a: ["トヨタ自動車", "ソニーグループ", "日本電信電話", "キーエンス", "三菱UFJフィナンシャルグループ", "信越化学工業"]
    },
    {
        q: "2023/12/31時点で日本企業時価総額が高い順に並べ替えてください",
        a: ["東京エレクトロン", "ファーストリテイリング", "KDDI", "リクルートHD", "三菱商事", "任天堂"]
    },
    {
        q: "2023/12/31時点で日本企業時価総額が高い順に並べ替えてください",
        a: ["オリエンタルランド", "日立製作所", "ソフトバンクグループ", "三井住友フィナンシャルグループ", "伊藤忠商事", "中外製薬"]
    },
    {
        q: "2023/12/31時点で日本企業時価総額が高い順に並べ替えてください",
        a: ["三井物産", "ホンダ", "第一三共", "JT", "東京海上HD", "デンソー"]
    },
    {
        q: "2023/12/31時点で日本企業時価総額が高い順に並べ替えてください",
        a: ["富士通", "日本郵政", "ブリヂストン", "ファナック", "住友商事", "丸紅"]
    },
    {
        q: "2023/12/31時点で日本企業時価総額が高い順に並べ替えてください",
        a: ["パナソニックHD", "オリックス", "京セラ", "日本製鉄", "アステラス製薬", "NTTデータグループ"]
    },
    {
        q: "2023/12/31時点で日本企業時価総額が高い順に並べ替えてください",
        a: ["三菱重工", "イオン", "花王", "アサヒグループHD", "野村総合研究所", "NEC"]
    },
    {
        q: "2023/12/31時点で日本企業時価総額が高い順に並べ替えてください",
        a: ["キリンHD", "バンダイナムコHD", "関西電力", "資生堂", "旭化成", "オムロン"]
    },
    {
        q: "2023/12/31時点で日本企業時価総額が高い順に並べ替えてください",
        a: ["楽天グループ", "カプコン", "出光興産", "AGC", "東急", "明治HD"]
    },
    {
        q: "2023/12/31時点で米国企業時価総額が高い順に並べ替えてください",
        a: ["Apple", "Microsoft", "Amazon.Com", "NVIDIA", "Alphabet A", "Alphabet C"]
    },
    {
        q: "2023/12/31時点で米国企業時価総額が高い順に並べ替えてください",
        a: ["Tesla", "Meta Platforms A", "Eli Lilly", "Broadcom", "JPMorgan Chase", "UnitedHealth Group"]
    },
    {
        q: "2023/12/31時点で米国企業時価総額が高い順に並べ替えてください",
        a: ["Berkshire Hathaway B", "Walmart", "Visa A", "Exxon Mobil", "Mastercard A", "Johnson & Johnson"]
    },
    {
        q: "2023/12/31時点で米国企業時価総額が高い順に並べ替えてください",
        a: ["Proctor & Gamble", "Oracle", "Adobe", "Bank of America", "Salesforce", "Accenture A"]
    },
    {
        q: "2023/12/31時点で米国企業時価総額が高い順に並べ替えてください",
        a: ["Cisco Systems", "Walt Disney", "Pfizer", "Boeing", "Broadcom", "International Business Machines"]
    },
    {
        q: "2023/12/31時点で米国企業時価総額が高い順に並べ替えてください",
        a: ["Nike B", "Goldman Sachs Group", "Starbucks", "UBS Group", "Citi Group", "Eaton"]
    },

];

//top画面
const scenetop = document.querySelector("#start");
//game画面
const scecegame = document.querySelector("#game");
//正解不正解表示画面
const next = document.querySelector("#next");
const field = document.querySelector("#field");
const select = document.querySelectorAll(".select");
const answer = document.querySelectorAll(".answer");

//選択された答えを順番に格納
let answers = [];
//問題番号を管理
let questionnum = 0;


init();
function init() {
    changescene(scecegame, scenetop);
    scenetop.addEventListener('click', gamestart, false);
}

function changescene(hiddenscene, visiblescene) {
    hiddenscene.classList.add("is-hidden");
    hiddenscene.classList.remove("is-visible");
    visiblescene.classList.add("is-visible");
}

function gamestart() {
    changescene(scenetop, scecegame);
    showQuestion()
}

//並べ替えクイズの処理
function showQuestion() {
    //答えを格納している配列を初期化
    answers.length = 0; 
    for (let i = 0; i < 6; i++) {
        answer[i].textContent = i + 1;
    }

    //問題の解答シャッフル Fisher–Yatesアルゴリズムを用いる
    //値渡しコピーで配列に代入
    let shufflea = question[questionnum].a.concat(); 
    for (let i = shufflea.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        let tmp = shufflea[i];
        shufflea[i] = shufflea[r];
        shufflea[r] = tmp;
    }

    //問題文挿入
    document.querySelector("h1").textContent = question[questionnum].q;
    //回答選択肢挿入
    for (let i = 0; i < shufflea.length; i++) {
        select[i].classList.remove('is-hidden');
        select[i].textContent = shufflea[i];
    }

    let count = 0;
    //選択された答えを消す 
    for (let i = 0; i < shufflea.length; i++) {
        select[i].onclick = () => {
            console.log(count);
            select[i].classList.add('is-hidden');
            //選択された答えを移動
            answer[count].textContent = select[i].textContent;
            answers.push(answer[count].textContent);
            count += 1;
            if (count == shufflea.length) {
                count = 0;
                Judgment();
            }
        }
    }
}

//正解かどうか判定
function Judgment() {
    changescene(scecegame, next);
    if (JSON.stringify(question[questionnum].a) == JSON.stringify(answers)) {
        next.innerHTML = "<p style='font-size:3em;color:#f00;'>正解です！!</p><button  class='button' onclick='nextquestion()'>次の問題</button>";

    } else {
        next.innerHTML = "<p style='font-size:3em;color:#000;'>不正解...</p><button  class='button' onclick='nextquestion()'>次の問題</button>";
    }
}

//次の問題ボタンが押された時の処理
function nextquestion() {
    questionnum++
    if (Object.keys(question).length > questionnum) {
        changescene(next, scecegame);
        showQuestion();
    } else {
        questionnum = 0;
        changescene(next, scecegame);
        showQuestion();
    }
}
