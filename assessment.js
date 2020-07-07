'use srrict';

const userNameInput = document.getElementById('user-name');      //inputのID
const assessmentButton = document.getElementById('assessment');　　//assessment ボタンの ID
const resultDivided = document.getElementById('result-area');　　//result divのID
const tweetDivided = document.getElementById('tweet-area');　　//tweet divのID

/**
 * 指定した要素の子供をすべて削除する関数を定義する
 * @param {HTML Element} element HTMLの要素
 * 返り値は特になし
 */
function removeAllChildren(element){　//分かりやすい関数名で関数を定義することでresultDividedの
//                                      全ての子要素を削除しているということが明確になる
    while (element.firstChild) {    //子供の要素 firstChildがある限り削除
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = (event) => {  //アロー関数　無名関数を代入することでキー入力時の処理が実装できる
    if (event.key === 'Enter') {
        assessmentButton.onclick();     
        //クリックしたときの関数はこのonlickに代入されている。それを()をつけて実行してあげると
        //診断するボタンを押したのと同じ機能が使える。結果的に診断してくれる。
  }
};

//assessmentButton.onclick = function (){　　//無名関数
assessmentButton.onclick = () => {    //アロー関数
    const userName = userNameInput.value;
    if (userName.length === 0){
        return;  //直ちに関数の処理を終了するカード句　入力しないでボタンだけ押しても無視　!userName
    }

//削除したい子要素を指定して実行
    removeAllChildren(resultDivided); // 前の結果が残っていたら消す　実行
  

    const result = assessment(userName);  //新しい診断結果の取得

    /** 診断結果表示エリアの作成　HTMLを足していく
    <div id ="result-area">
    <h3>診断結果</h3>
    </div>
    */
    const header = document.createElement('h3');  //h3タグをjsのプログラムから作る
    header.innerText = '診断結果';  // h3タグの内側に中身を入れる　<h3>診断結果</h3>
    resultDivided.appendChild(header);   //入れ子構造htmlのどこに⇒appendchildで子要素（タグの内側）に足す

    const paragraph = document.createElement('p');　　//pタグをjsのプログラムから作る
    paragraph.innerText = result;        //新しい診断結果の取得
    resultDivided.appendChild(paragraph); //'result-area内に子要素として足す

// TODO ツイートエリアの作成

removeAllChildren(tweetDivided);  //　ツイートボタン空にする　また診断ボタン作る

//twitterのサイトから持ってきてhtmlにコピーしたaタグと同じものをjsに再現　
//⇒子要素を追加aタグ交えたボタンができる
const anchor = document.createElement('a');  //htmlタグをプログラムから作る（この場合aタグ=anchor）
const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' 
    + encodeURIComponent('いいところについて') //ボタンに表示される文字？
    + '&ref_src=twsrc%5Etfw';
//Twitterと同じリンク　一旦丁寧に数に入れている
anchor.setAttribute('href', hrefValue);
//attribute=属性　　属性を設定する　href属性を作ってurlを設定する
anchor.className = ('twitter-hashtag-button');
//classは最初から設定する関数があるので .classNameで
anchor.setAttribute('data-text', 'result'); 
//assessment（ボタン）してresultに結果が入っているのでここでも使う。属性をresultに
anchor.innerText = ('Tweet #いいとこ');　　//Twitterのリンクの文字

//aタグを作ったので、html内のどこかに足す。tweetDividedの子要素として追加
tweetDivided.appendChild(anchor);

//ボタンどちらか入れる　あとの報はhtmlから持ってきた
//twttr.widgets.load();
const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
script.setAttribute('charset', 'utf-8');
tweetDivided.appendChild(script);
};

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * ここまでVScodeが用意してくれる
 * @param {*} userName 
 */


/**
 * 名前の文字列を渡すと診断結果を返す
 * @param {string} userName ユーザー名      引数 型 引数は文字列を受け取る。変数名　説明
 * @return {string} 診断結果　　戻り値の説明　文字列
 * function宣言

 */

 function assessment(userName) {
    let sumOfCharCode = 0; 
    /** 全部のuserNameの文字数分ぐるぐる回るように実装   */
    for (let i = 0; i < userName.length; i++) {　　//文字の数(userName.length)だけ足したい
        sumOfCharCode += userName.charCodeAt(i);  /**文字列を配列とみなして sumOfCharCodeに足し合わせる
    /** +=で足し算できる　　
     *  userName.charCodeAt(0) + userName.charCodeAt(1) +  一般的でないので臨機応変に対応
     *  文字コードの合計値 sumOfChartCode（最初0）に足していく
     *  sumOfChartCode = sumOfCharCode + userName.charCodeAt(i) ;
     *  sumOfCharCodeにi番目の文字コード足した値でsumOfChatCode上書きできる。
    */
    }
    // 文字コードの番号の合計を回答の数で割って添え字の数値を
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName)  //正規表現
    return result;
 }

 //テストを行う機能　引数にあっている答えの１例を入れる
    console.assert(assessment('折原') === '折原のいいところは見た目です。内側から溢れ出る折原の良さに皆が気を惹かれます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );

/**「入力が同じ名前なら、同じ診断結果を出力する」処理が正しいかどうか
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );

    console.assert(
        assessment('太郎') === assessment('次郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );

    console.log(assessment('折原'));
    console.log(assessment('太郎'));
    console.log(assessment('太郎'));
    console.log(assessment('userName'));
*/

