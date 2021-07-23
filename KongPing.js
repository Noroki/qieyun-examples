/* 推導港拼
 *
 * based on https://ayaka.shn.hk/teoi/
 * 
 * reference: 片岡新（2014）: “香港政府粵語拼音”：一個亂中有序的系統
 *
 * @author Noroki
 */

const is = (x) => 音韻地位.屬於(x);


// 音韵地位对应音位开关
if (!音韻地位) return [
  ['拼式', [1, '英式', '歐陸式']],
  ['口語eng及ek'  , false], // 关闭：ing/ik，打开：eng/ek
  ['Ts訛作Ch'  , false], // 关闭：Ts，打开：Ch
  ['aa作ah'  , true], // 关闭：a，打开：ah
  ['oi作oy'  , true], // 关闭：oi，打开：oy
  ['ei作ee'  , false], // 关闭：ei，打开：ee
  ['au作ow'  , true], // 关闭：au，打开：ow
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

// ei 作 ee
if (選項.ei作ee && 韻母 === 'ei') {
  if (選項.拼式 === '英式') 韻母 = 'ee';
  else 韻母 = 'i';
}

if (聲母 === '') 韻母 = 韻母.slice(0, 1).toUpperCase() + 韻母.slice(1);

return 聲母 + 韻母;