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
  //  IPA: ɐ, i, u; 英式： u, ee, oo; 歐陸式： a, i, u
  ['拼式', [1, '英式', '歐陸式']],// 切換英式/歐陸式

  ['k', [1, 'k', 'kw']],
  ['ts及tsʰ', [1, 'ts', 'ch']],
  ['s', [1, 's', 'sh']],
  ['ʃ', [1, 'sh', 's']],
  ['a', [1, 'a', 'ah']],
  ['ɐu', [1, 'au', 'ow']],
  ['ɐŋ', [1, 'ang', 'eng']],
  ['ɪŋ及ɪk', [1, 'ing及ik', 'eng及ek']],
  ['ei', [1, 'i', 'ei']],
  ['ɔy', [1, 'oi', 'oy']],
  ['y', [1, 'ue', 'u']],
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
  if (is('支脂之微韻 幫組')) return 'ei';
  if (is('支脂之微韻 開口 舌齒音 端組')) return 'ei';
  if (is('支脂之微韻 開口 舌齒音 來母')) return 'ei';
  if (is('支脂之微韻 開口 舌齒音 孃母')) return 'ei';
  if (is('支脂之微韻 開口 舌齒音')) return 'i'; // 開口： i 在 z/c/s 前為 ii，詳後
  if (is('支脂之微韻 開口 牙喉音 疑母')) return 'i';
  if (is('支脂之微韻 開口 牙喉音 影母')) return 'i';
  if (is('支脂之微韻 開口 牙喉音 云母')) return 'i';
  if (is('支脂之微韻 開口 牙喉音 以母')) return 'i';
  if (is('支脂之微韻 開口 牙喉音')) return 'ei';
  if (is('支脂之微韻 合口 舌齒音')) return 'eoi';
  if (is('支脂之微韻 合口 牙喉音')) return 'ai';

  // 遇攝
  if (is('魚虞韻 幫組 幫滂並母')) return 'u';
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
  if (is('模韻 牙喉音')) return 'u';

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
  if (is('灰韻')) return 'ui';
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
  if (is('魂韻 幫組')) return 'un';
  if (is('魂韻 端組')) return 'eon';
  if (is('魂韻 來母')) return 'eon';
  if (is('魂韻 精組')) return 'uen';
  if (is('魂韻 牙喉音')) return 'an';
  if (is('痕韻')) return 'an';

  // 山攝
  if (is('寒韻 幫組')) return 'un';
  if (is('寒韻 開口 舌齒音')) return 'aan';
  if (is('寒韻 開口 牙喉音')) return 'on';
  if (is('寒韻 合口 舌齒音')) return 'uen';
  if (is('寒韻 合口 牙喉音')) return 'un';
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
  if (is('麻韻 二等')) return 'aa';
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
  if (is('尤侯幽韻')) return 'au';

  // 深攝
  if (is('侵韻')) return 'am'; // m 韻尾在聲母為脣音時為 n，詳後，下同

  // 咸攝
  if (is('覃談韻 幫組')) return 'aam';
  if (is('覃談韻 舌齒音')) return 'aam';
  if (is('覃談韻 牙喉音')) return 'om';
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
const is細音 = ['eo', 'i', 'eu', 'u', 'ue'].some((x) => 韻母.startsWith(x));
if (聲母 === 'ng' && is細音) 聲母 = 'y';

// 合口字
if (is('合口 或 模韻') && !['eo', 'eu', 'ue'].some((x) => 韻母.startsWith(x))) {
    if (!韻母.startsWith('i') || is('見母')) {
        if (聲母 === 'h') 聲母 = 'f';
        else if (聲母 === 'k') {
            if (is('溪母 一等') && !is('魂唐韻')) 聲母 = 'f'; // ??
            else if (韻母.startsWith('u')) 聲母 = 'k';
            else 聲母 = 'kw';
        }
    }
    if (聲母 === 'y' || !聲母) 聲母 = 'w';
}

// sh:  Sh 作 S
if (選項.ʃ === 's' && 聲母 === 'sh') 聲母 = 's';

// s:  S 作 Sh
if (選項.s === 'sh' && 聲母 === 's' && 韻母 !== 'ze') 聲母 = 'sh';

// z及c: Ts 作 Ch
if (選項.ts及tsʰ === 'ch' && 聲母 === 'ts' && 韻母 !== 'z') 聲母 = 'ch';

// oi: Choi 作 Choy
if (選項.ɔy === 'oy' && 聲母 === 'Ch' && 韻母 === 'oi') 韻母 = 'oy';

// au: Chau 作 Chow
if (選項.ɐu === 'ow' && 聲母 === 'Ch' && 韻母 === 'au') 韻母 = 'ow';

// ue: ue 作 u
if (選項.y === 'u' && 韻母 === 'ue') 韻母 = 'u';

// aa:  Wa 作 Wah
if (選項.a === 'ah' && 聲母 === 'w' && 韻母 === 'aa') 韻母 = 'ah';

// ei: ei 作 i
if (選項.ei === 'i' && 韻母 === 'ei') 韻母 = 'i';

// ang: Hang 作 Heng
if (選項.ɐŋ === 'eng' && 聲母 === 'h' && 韻母 === 'ang' ) 韻母 = 'eng';

// ing及ik: ing及ik 作 eng及ek (白讀)
if (選項.ɪŋ及ɪk === 'eng及ek' && ['ing', 'ik'].includes(韻母)) 韻母 = 'e' + 韻母.slice(1);

// 英式
if (選項.拼式 === '英式') { // bugs, need to enumerate all
    if (['am', 'at'].includes(韻母)) 韻母 = 'u' + 韻母.slice(1);// *an, *ap, ak??
    if (['u', 'un'].includes(韻母)) 韻母 = 'oo' + 韻母.slice(1); // ui, ung??
    if (['i', 'in'].includes(韻母)) 韻母 = 'ee' + 韻母.slice(1);
}

// g: K or Kw
if (選項.k === 'kw') {
    if (聲母 === 'k' && ['u', 'un'].includes(韻母)) 聲母 = 'kw'; // Kwoo- 不合法 //ui, ut??
}

// 不區分 aa 和 a
if (韻母.startsWith('aa')) 韻母 = 韻母.slice(1);

// 不區分 eo 和 u
if (韻母.startsWith('eo')) 韻母 = 'u' + 韻母.slice(2);

// m 韻尾在聲母為脣音時為 n
if (is('幫組') && 韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'n';

// 首字母大寫
if (聲母 === '') 韻母 = 韻母[0].toUpperCase() + 韻母.slice(1);
else 聲母 = 聲母[0].toUpperCase() + 聲母.slice(1);

// 入聲字
if (is('入聲')) {
    if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'p';
    else if (韻母.endsWith('n')) 韻母 = 韻母.slice(0, -1) + 't';
    else if (韻母.endsWith('ng')) 韻母 = 韻母.slice(0, -2) + 'k';
  }

return 聲母 + 韻母;
