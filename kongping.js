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

  // Consonants
  ['S作Sh', false], // 關閉：S，打開：Sh *
  ['Ts訛作Ch'  , false], // 關：Ts，開：Ch

  // Vowels
  // i-/e-
  ['ing及ik作eng及ek', false], // 關閉：ing/ik，打開：eng/ek *

  // aa/ah
  ['aa作ah'  , true], // 關：a，開：ah

  // au/ow:
  ['au作ow', false], // 關：au，開：ow

  // a-
  ['ang作eng', false], // 關：ang，開：eng //Special case

  ['am及ap作um及up', false], // 關閉：am/ap，打開：um/up *
  ['an及at作un及ut', false], // 關閉：an/at，打開：un/ut *

  // oi/oy 
  ['oi作oy'  , true], // 關：oi，開：oy

  ['om及op作am及ap', false], // 關閉：om/op，打開：am/ap *

  // u/oo
  ['u作oo', false], // 關閉：u，打開：oo *
  ['ui作ooi', false], // 關閉：ui，打開：ooi *
  ['un作oon', false], // 關閉：un，打開：oon * 
  ['ung作oong', false], // 關閉：ung，打開：oong * 

  // K/Kw
  ['Ku作Kwu', true], // 關閉：Ku (5)，打開：「ui作ooi」關閉時作Kwu (10)，打開時作Kwoo (0) *
  ['Kui作Kwui', true], // 關閉：Kui，打開：「ui作ooi」關閉時作Kwui，打開時作Kwooi *
  ['Kun及Kut作Kwun及Kwut', true], // 關閉：Kun/Kut (4)，打開：「ui作ooi」關閉時作Kwun/Kwut (18)，打開時作Kwoon/Kwoot (0) *

  // i
  ['分i及ei'  , false], // 關：i，開：ei
  ['ei作i', false], // 關閉：ei，打開：「i作ee」關閉時作i，打開時作ee *
  ['i作ee', false], // 關閉：i (127)，打開：ee (79) *

  // ue/u
  ['ue作u', true], // 關閉：ue，打開：u *

];

function 聲母規則() {
  if (is('幫滂並母')) return is('東韻 三等 或 鍾微虞廢文元陽尤凡韻') ? 'f' : 'p'; // 輕脣十韻
  if (is('明母')) return 'm';

  if (is('端透定母')) return 't';
  if (is('泥母')) return 'n';
  if (is('來母')) return 'l';

  if (is('知徹澄母')) return 'ch';
  if (is('孃母')) return 'n';

  if (is('精清從邪母')) return 'ts'; // 邪母塞擦音多於擦音
  if (is('心母')) return 's';

  // 二等 ch, 三等 ts
  if (is('莊初崇俟母')) return is('二等') ? 'ch' : 'ts';
  if (is('生母')) return is('二等') ? 'sh' : 's';

  if (is('章昌母')) return 'ch';
  if (is('常書船母')) return 'sh'; // 常母擦音多於塞擦音
  if (is('日母')) return 'y';

  if (is('見羣母')) return 'k';
  if (is('溪母')) { // ? // 多數擦化
    if (is('尤侵韻')) return 'y';
    if (is('合口 或 支齊模韻') && !is('元陽先夬韻')) return 'k';
    return 'h';
  }
  if (is('疑母')) return 'ng'; // ng 拼細音時為 y，詳後

  if (is('曉母')) {
    if (is('尤欣韻 平聲')) return 'y'; // ?
    return 'h';
  }
  if (is('匣母')) { // ?四等、齊韻
    if (is('合口 或 四等 或 模韻') && !is('齊韻')) return 'y'; // 非 ue 前為 w，詳後
    return 'h';
  }
  if (is('影云以母')) {
    if (is('三四等')) return 'y'; // 非 ue 前為 w，詳後
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
  // 分 ei 及 i // TODO
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

// i 在 ts 前為 z, ，在 s 後為 ze
if (韻母 === 'i') {
    if (聲母 === 'ts') 韻母 = 'z';
    else if (聲母 === 's') 韻母 = 'ze';
}

// ng 拼細音時為 y
const is細音 = ['eo', 'i', 'eu', 'u', 'oo', 'ue'].some((x) => 韻母.startsWith(x));
if (聲母 === 'ng' && is細音) 聲母 = 'y';

// 合口字 TODO
if (is('合口 或 模韻') && !['eo', 'eu', 'ue'].some((x) => 韻母.startsWith(x))) { // 合口字
  if (聲母 === 'K' && !韻母.startsWith('oo')) 聲母 = 'Kw';
  else if (聲母 === 'K' && !韻母.startsWith('oo')) 聲母 = 'Kw';// Kwun, Koon/Kwoon?
  else if (聲母 === 'H' && !韻母.startsWith('i')) 聲母 = 'F';
  else if (聲母 === 'Y') 聲母 = 'W';
  else if (聲母 === '') 聲母 = 'W';
}

// 不區分 aa 和 a TODO

// m 韻尾在聲母為脣音時為 n
if (is('幫組') && 韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'n';

// 入聲字
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

// 首字母大寫
if (聲母 === '') 韻母 = 韻母[0].toUpperCase() + 韻母.slice(1);
else 聲母 = 聲母[0].toUpperCase() + 聲母.slice(1);

if (選項.au/ow  === 'au') 選項.Chau作Chow = true;
else 選項.Chau作Chow = false;

return 聲母 + 韻母;
