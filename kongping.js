/* 推導港拼（香港政府粵語拼音）
 *
 * https://morrisl27.github.io/linguistics/KongPing.html
 *
 * 參考文獻: 片岡新（2014）: “香港政府粵語拼音”：一個亂中有序的系統
 * 
 * 程序基於綾香廣州音及分韻撮要推導 
 * https://ayaka.shn.hk/teoi/ & https://ayaka.shn.hk/fanwan/
 *
 * @author Noroki
 */

const is = (x) => 音韻地位.屬於(x);


// 選項
if (!音韻地位) return [
  ['拼式', [1, '英式', '歐陸式']],// 切換英式/歐陸式

  ['口語eng及ek'  , false], // 關：ing/ik，開：eng/ek

  ['Ts訛作Ch'  , false], // 關：Ts，開：Ch

  ['au/ow', [1, 'au', 'ow']],// 切換au/ow *
  ['Chau作Chow', false], // 關閉：Chau (38)，打開：Chow (5) *

  ['aa作ah'  , true], // 關：a，開：ah
  ['Waa作Wah', true], // 關閉：Wa (33)，打開：Wah (57) *

  ['oi作oy'  , true], // 
  ['Choi作Choy', false], // 關閉：Choi (36)，打開：Choy (0) *

  ['分i及ei'  , false], // 關：i，開：ei
  ['ang作eng'  , false], // 關：ang，開：eng

  ['om及op作am及ap', false], // 關閉：om/op，打開：am/ap *
  ['u作oo', false], // 關閉：u，打開：oo *
  ['ui作ooi', false], // 關閉：ui，打開：ooi *
  ['un作oon', false], // 關閉：un，打開：oon *
  ['ing及ik作eng及ek', false], // 關閉：ing/ik，打開：eng/ek *
  ['S作Sh', false], // 關閉：S，打開：Sh *

  ['Ku作Kwu', true], // 關閉：Ku (5)，打開：「ui作ooi」關閉時作Kwu (10)，打開時作Kwoo (0) *
  ['Kui作Kwui', true], // 關閉：Kui，打開：「ui作ooi」關閉時作Kwui，打開時作Kwooi *
  ['Kun及Kut作Kwun及Kwut', true], // 關閉：Kun/Kut (4)，打開：「ui作ooi」關閉時作Kwun/Kwut (18)，打開時作Kwoon/Kwoot (0) *

  ['ei作i', false], // 關閉：ei，打開：「i作ee」關閉時作i，打開時作ee *
  ['i作ee', false], // 關閉：i (127)，打開：ee (79) *
  ['ue作u', true], // 關閉：ue，打開：u *
  ['am及ap作um及up', false], // 關閉：am/ap，打開：um/up *
  ['an及at作un及ut', false], // 關閉：an/at，打開：un/ut *

];

function 聲母規則() {
  if (is('幫母')) {
    if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'F';
    return 'P';
  }
  if (is('滂母')) {
    if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'F';
    return 'P';
  }
  if (is('並母')) {
    if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'F';
    if (is('平聲')) return 'P';
    return 'P';
  }
  if (is('明母')) return 'M';

  if (is('端母')) return 'T';
  if (is('透母')) return 'T';
  if (is('定母')) return 'T';
  if (is('泥母')) return 'N';
  if (is('來母')) return 'L';

  if (is('知母')) return 'Ch';
  if (is('徹母')) return 'Ch';
  if (is('澄母')) return 'Ch';
  if (is('孃母')) return 'N';

  if (is('精母')) return 'Ts';
  if (is('清母')) return 'Ts';
  if (is('從母')) return 'Ts';
  if (is('心母')) return 'S';
  if (is('邪母')) return 'Ts'; // 塞擦音多於擦音

  if (is('莊母')) return 'Ch';
  if (is('初母')) return 'Ch';
  if (is('崇母')) return 'Ch';
  if (is('生母')) return 'Sh';
  if (is('俟母')) return 'Ch';

  if (is('章母')) return 'Ch';
  if (is('昌母')) return 'Ch';
  if (is('常母')) return 'Sh'; // 擦音多於塞擦音
  if (is('書母')) return 'Sh';
  if (is('船母')) return 'Sh';
  if (is('日母')) return 'Y';

  if (is('見母')) return 'K';
  if (is('溪母')) return 'H'; // 多數擦化
  if (is('羣母')) return 'K';
  if (is('疑母')) return 'Ng'; // Ng 拼細音時為 Y，詳後

  if (is('曉母')) return 'H';
  if (is('匣母')) {
    if (is('合口 或 模韻')) return 'Y'; // 非 ue 前為 W，詳後
    return 'H';
  }
  if (is('影云以母')) {
    if (is('三四等')) return 'Y'; // 非 ue 前為 W，詳後
    return '';
  }

  throw new Error('無聲母規則');
}

function 韻母規則() {
  // 通攝
  if (is('東冬鍾韻')) return 'ung';

  // 江攝
  if (is('江韻 幫組')) return 'ong';
  if (is('江韻 舌齒音')) return 'eung';
  if (is('江韻 牙喉音')) return 'ong';

  // 止攝
  // 分 ei 及 i
  if (選項.分i及ei) {
    if (is('支脂之微韻 幫組')) return 'ei';
    if (is('支脂之微韻 開口 舌齒音 端組')) return 'ei';
    if (is('支脂之微韻 開口 舌齒音 來母')) return 'ei';
    if (is('支脂之微韻 開口 舌齒音 孃母')) return 'ei';
    if (is('支脂之微韻 開口 舌齒音')) return 'i';
    if (is('支脂之微韻 開口 牙喉音 疑母')) return 'i';
    if (is('支脂之微韻 開口 牙喉音 影母')) return 'i';
    if (is('支脂之微韻 開口 牙喉音 云母')) return 'i';
    if (is('支脂之微韻 開口 牙喉音 以母')) return 'i';
    if (is('支脂之微韻 開口 牙喉音')) return 'ei';
  }else {
    if (is('支脂之微韻 幫組')) return 'i';
    if (is('支脂之微韻 開口')) return 'i'; // i 在 z/c/s 前為 ii，詳後
  }

  if (is('支脂之微韻 合口 舌齒音')) return 'eoi';
  if (is('支脂之微韻 合口 牙喉音')) return 'ai';

  // 遇攝
  if (is('魚虞韻 幫組 幫滂並母')) return 選項.拼式 === '歐陸式'? 'u' : 'oo';
  if (is('魚虞韻 幫組 明母')) return 'o';
  if (is('魚虞韻 舌齒音 端組')) return 'eoi';
  if (is('魚虞韻 舌齒音 來母')) return 'eoi';
  if (is('魚虞韻 舌齒音 孃母')) return 'eoi';
  if (is('魚虞韻 舌齒音 精組')) return 'eoi';
  if (is('魚虞韻 舌齒音 莊組')) return 'o';
  if (is('魚虞韻 舌齒音')) return 'ue';
  if (is('魚虞韻 牙喉音 見溪羣母')) return 'eoi';
  if (is('魚虞韻 牙喉音 曉匣母')) return 'eoi';
  if (is('魚虞韻 牙喉音')) return 'ue';
  if (is('模韻 脣音')) return 'o';
  if (is('模韻 舌齒音')) return 'o';
  if (is('模韻 牙喉音 疑母')) return '';
  if (is('模韻 牙喉音')) return 選項.拼式 === '歐陸式'? 'u' : 'oo';

  // 蟹攝
  if (is('齊韻')) return 'ai';
  if (is('祭韻 幫組')) return 'ai';
  if (is('祭韻 開口')) return 'ai';
  if (is('祭韻 合口 舌齒音')) return 'eoi';
  if (is('祭韻 合口 以母')) return 'eoi';
  if (is('祭韻 合口 牙喉音')) return 'ai';
  if (is('泰韻 幫組')) return 'ui';
  if (is('泰韻 開口 舌齒音 精組')) return 'oi';
  if (is('泰韻 開口 舌齒音')) return 'aai';
  if (is('泰韻 開口 牙喉音')) return 'oi';
  if (is('泰韻 合口 舌齒音')) return 'eoi';
  if (is('泰韻 合口 牙喉音 疑母')) return 'oi';
  if (is('泰韻 合口 牙喉音')) return 'ui';
  if (is('佳皆夬韻 幫組')) return 'aai';
  if (is('佳皆夬韻 開口')) return 'aai';
  if (is('佳皆夬韻 合口 舌齒音')) return 'eoi';
  if (is('佳皆夬韻 合口')) return 'aai';
  if (is('灰韻 舌齒音')) return 'eoi';
  if (is('灰韻 疑母')) return 'oi';
  if (is('灰韻')) return 'ui';// ui/ooi?
  if (is('咍韻')) return 'oi';
  if (is('廢韻')) return 'ai';

  // 臻攝
  if (is('眞韻 幫組')) return 'an';
  if (is('眞韻 開口')) return 'an';
  if (is('眞韻 合口 舌齒音')) return 'eon';
  if (is('眞韻 合口 牙喉音')) return 'an';
  if (is('臻文欣韻')) return 'an';
  if (is('元韻 幫組')) return 'aan';
  if (is('元韻 開口')) return 'in';
  if (is('元韻 合口')) return 'uen';
  if (is('魂韻 幫組')) return 選項.拼式 === '歐陸式'? 'un' : 'oon';
  if (is('魂韻 端組')) return 'eon';
  if (is('魂韻 來母')) return 'eon';
  if (is('魂韻 精組')) return 'uen';
  if (is('魂韻 牙喉音')) return 'an';
  if (is('痕韻')) return 'an';

  // 山攝
  if (is('寒韻 幫組')) return 選項.拼式 === '歐陸式'? 'un' : 'oon';
  if (is('寒韻 開口 舌齒音')) return 'aan';
  if (is('寒韻 開口 牙喉音')) return 'on';
  if (is('寒韻 合口 舌齒音')) return 'uen';
  if (is('寒韻 合口 牙喉音')) return 選項.拼式 === '歐陸式'? 'un' : 'oon';
  if (is('刪山韻')) return 'aan';
  if (is('仙先韻 幫組')) return 'in';
  if (is('仙先韻 開口')) return 'in';
  if (is('仙先韻 合口')) return 'uen';

  // 效攝
  if (is('蕭宵韻')) return 'iu';
  if (is('肴韻')) return 'aau';
  if (is('豪韻')) return 'o';

  // 果攝
  if (is('歌韻 一等')) return 'o';
  if (is('歌韻 三等 脣音')) return 'e';
  if (is('歌韻 三等 開口')) return 'e';
  if (is('歌韻 三等 合口')) return 'eu';

  // 假攝
  if (is('麻韻 二等')) return 選項.aa作ah ? 'ah' : 'a';
  if (is('麻韻 三等')) return 'e';

  // 宕攝
  if (is('陽韻 幫組')) return 'ong';
  if (is('陽韻 開口 莊組')) return 'ong';
  if (is('陽韻 開口')) return 'eung';
  if (is('陽韻 合口')) return 'ong';
  if (is('唐韻')) return 'ong';

  // 梗攝
  if (is('庚韻 二等')) return 'ang';
  if (is('庚韻 三等 莊組')) return 'ang';
  if (is('庚韻 三等')) return 'ing';
  if (is('耕韻')) return 'ang';
  if (is('清青韻')) return 'ing';

  // 曾攝
  if (is('蒸韻')) return 'ing';
  if (is('登韻')) return 'ang';

  // 流攝
  if (is('尤侯幽韻')) return 選項.au作ow? 'ow' : 'au';

  // 深攝
  if (is('侵韻')) return 'am'; // m 韻尾在聲母為脣音時為 n，詳後，下同

  // 咸攝
  if (is('覃談韻 幫組')) return 'aam';
  if (is('覃談韻 舌齒音')) return 'aam';
  if (is('覃談韻 牙喉音')) return 'om'; // -om 併入 -am，詳後
  if (is('鹽添嚴韻')) return 'im';
  if (is('咸銜凡韻')) return 'aam';

  throw new Error('無韻母規則');
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();

// i 在 Ts/S 前為 z
if (['Ts', 'Ts'].includes(聲母) && 韻母 === 'i') 韻母 = 'z';
if (['S'].includes(聲母) && 韻母 === 'i') 韻母 = 'ze';

// Ng 拼細音時為 Y
const is細音 = ['eo', 'i', 'eu', 'u', 'oo', 'ue'].some((x) => 韻母.startsWith(x));
if (聲母 === 'Ng' && is細音) 聲母 = 'Y';

if (is('合口 或 模韻') && !['eo', 'eu', 'ue'].some((x) => 韻母.startsWith(x))) { // 合口字
  if (聲母 === 'K' && !韻母.startsWith('oo')) 聲母 = 'Kw';
  else if (聲母 === 'K' && !韻母.startsWith('oo')) 聲母 = 'Kw';// Kwun, Koon/Kwoon?
  else if (聲母 === 'H' && !韻母.startsWith('i')) 聲母 = 'F';
  else if (聲母 === 'Y') 聲母 = 'W';
  else if (聲母 === '') 聲母 = 'W';
}

// m 韻尾在聲母為脣音時為 n
if (is('幫組') && 韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'n';

if (is('入聲')) {
  if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'p';
  else if (韻母.endsWith('n')) 韻母 = 韻母.slice(0, -1) + 't';
  else if (韻母.endsWith('ng')) 韻母 = 韻母.slice(0, -2) + 'k';
}

// eo 作 u
const isEO = ['eo'].some((x) => 韻母.startsWith(x));
if (isEO) 韻母 = 'u' + 韻母.slice(2);

// 單 ue 作 ue/u
const isUE = ['ue'].some((x) => 韻母.startsWith(x));
if (聲母 === 'Ch' && isUE) 韻母 = 'u' + 韻母.slice(2);

// a 作 u （英式）
if (選項.拼式 === '英式' && ['am', 'an', 'ap', 'ak', 'at'].includes(韻母)) 韻母 = 'u' + 韻母.slice(1);// at -> ut?
// TODO: an not to un

// 單 aa 作 ah
const isAA = ['aa'].some((x) => 韻母.startsWith(x));
if (isAA) 韻母 = 'a' + 韻母.slice(2);

// 單 i 作 ee （英式）
if (選項.拼式 === '英式' && 韻母 === 'i') 韻母 = 'ee'; 

// 口語 ing 作 eng
if (選項.口語eng及ek && ['ing', 'ik'].includes(韻母)) 韻母 = 'e' + 韻母.slice(1);

// Ts 訛作 Ch
if (選項.Ts訛作Ch && 聲母 === 'Ts' && 韻母 !== 'z') 聲母 = 'Ch';

// oi 作 oy
if (選項.oi作oy && 韻母 === 'oi') 韻母 = 'oy';

// ang 作 eng
if (選項.ang作eng && 韻母 === 'ang') 韻母 = 'eng';


if (聲母 === '') 韻母 = 韻母.slice(0, 1).toUpperCase() + 韻母.slice(1);

return 聲母 + 韻母;
