// ----------------------------
// Symbols & Characters for comments
// ----------------------------
// Check if comment area exists
checkElement(".flat_page").then((element) => {
  // console.log("flat_page exists");
  function setCommentSymbolsPicker() {
    const symbolsDialogDetails = document.createElement("div");
    symbolsDialogDetails.className = "symbols-container ";
    symbolsDialogDetails.innerHTML = `
          <div id="symbolsModal">
          <div>
          <a id="close">❌</a>
          <div class="subSection detailBox" id="2050699">
          <div class="subSectionTitle">Invisible Spacers</div>
          <div class="subSectionDesc">
            For those needing spacers for anything they are doing, but regular spaces (using the space bar) do not properly register. Simply copy and paste the space between the two " | " and use that for
            all your spacing needs. <br />⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀▼▼▼▼▼▼▼<br />⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ |⠀⠀⠀⠀⠀⠀⠀⠀⠀| <br />⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀▲▲▲▲▲▲▲
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356403">
          <div class="subSectionTitle">Animals &amp; Insects</div>
          <div class="subSectionDesc">
            🐸 🐢 🐍 🐲🐉 🙈 🙊 🙉🐒🦍🐶🐕🐩🐺🦊🐱🐈🦁🐯🐅🐆🐴🐎🦄🦓🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑 🐐 🐪 🐫 🦒 🐘 🦏 🐭 🐁 🐀 🐹 🐰 🐇 🐿 🦔 🦇 🐻 🐨 🐼 🐾 🦃 🐔 🐓🐣 🐤 🐥 🐦 🐧 🦅 🦆 🦉🦕🦖 🐳🐋 🐬 🐟 🐠 🐡 🐡🐙 🐌
            🦈 🐚 🦀 🦐 🦑 🐌 🦋 🐛🐜 🐝 🐞 🦗 🕷 🕸 🦂
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1355840">
          <div class="subSectionTitle">Arrows</div>
          <div class="subSectionDesc">
            ➟ ➡ ➢ ➣ ➤ ➥ ➦ ➧ ➨ ➚ ➘ ➙ ➛ ➜ ➝ ➞ ➸ ➲ ➳ ➳ ➴ ➵ ➶ ➷ ➸ ➹ ➺ ➻ ➼ ➽ ← ↑ → ↓ ↔ ↕ ↖ ↗ ↘ ↙ ↚ ↛ ↜ ↝ ↞ ↟ ↠ ↡ ↢ ↣ ↤ ↥ ↦ ↧ ↨ ➫ ➬ ➩ ➪ ➭ ➮ ➯ ➱ ↩ ↪ ↫ ↬ ↭ ↮ ↯ ↰ ↱ ↲ ↳ ↴ ↵ ↶ ↷ ↸ ↹ ↺ ↻ ↼ ↽ ↾ ↿ ⇀ ⇁ ⇂ ⇃ ⇄ ⇅ ⇆ ⇇ ⇈ ⇉ ⇊
            ⇋ ⇌ ⇍ ⇎ ⇏ ⇐ ⇑ ⇒ ⇓ ⇔ ⇕ ⇖ ⇗ ⇘ ⇙ ⇚ ⇛ ⇜ ⇝ ⇞ ⇟ ⇠ ⇡ ⇢ ⇣ ⇫ ⇬ ⇭ ⇮ ⇯ ⇰ ⇱ ⇲ ⇳ ⇴ ⇵ ⇶ ⇷ ⇸ ⇹ ⇺ ⇻ ⇼ ⇽ ⇾ ⇿ ☇ ☈
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050601">
          <div class="subSectionTitle">Chess Pieces</div>
          <div class="subSectionDesc">
            ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050598">
          <div class="subSectionTitle">Crosses</div>
          <div class="subSectionDesc">
            † ✞ ✛ ✙ ☩ † ☨ ✞ ✝ ☥ ☦✞ ✜✝✙ ✠
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050526">
          <div class="subSectionTitle">Emergency &amp; Medicine</div>
          <div class="subSectionDesc">
            🚓 🚑 🚒 🏥 💉 💊
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356343">
          <div class="subSectionTitle">Food</div>
          <div class="subSectionDesc">
            🍄🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🍍🥝🥑🍅🍆🥒🥕🌽🌶🥔🍠🌰🥜🍯🥐🍞🥖🧀🥚🍳🥓🥞🍤🍗🍖🍕🌭🍔🍟🥙🌮🌯🥗🥘🍝🍜🍲🍥🍣🍱🍛🍙🍚🍘🍢🍡🍧 🎂 🍰🍨🍦🍮🍭🍬🍫🍿🍩🍪🥛🍼☕🍵🍶🍺🍻🥂🍷🥃🍸🍹🍾🥄🍴🍽🔪
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356328">
          <div class="subSectionTitle">Hands, Faces &amp; People</div>
          <div class="subSectionDesc">
            😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔🤨 😐 😑 😶 🙄 😏 😣 😥😮 🤐 😯 😪 😫 😴😌 😛😜 😝 🤤 😒 😓 😔😕 🙃 🤑 😲 🙁 😖 😞 😟 😤 😢<br />😭😦 😧😨 😩 🤯😬 😰 😱😳🤪 😵 😡
            😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👶 👦 👧 👨 👩 👴 <br />👵 👨‍⚕️ 👩‍⚕️ 👨‍🎓 👩‍🎓 👨‍⚖️ 👩‍⚖️👨‍🌾 👩‍🌾 👨‍🍳 👩‍🍳 👨‍🔧👩‍🔧👨‍🏭 👩‍🏭 👨‍💼 👩‍💼👨‍🔬 👩‍🔬 👨‍💻 👩‍💻 👨‍🎤👩‍🎤 👨‍🎨 👩‍🎨
            👨‍✈️ 👩‍✈️ 👨‍🚀 👩‍🚀 <br />👨‍🚒 👩‍🚒 👮 👮‍♂️ 👮‍♀️ 🕵 🕵️‍♂️ 🕵️‍♀️ 💂 💂‍♂️ 💂‍♀️ 👷 👷‍♂️ 👷‍♀️ 🤴 👸 👳👳‍♂️ 👳‍♀️ 👲 🧕 🧔 👱 <br />👱‍♂️👱‍♀️ 🤵 👰 🤰🤱 👼 🎅 🤶 🧙‍♀️ 🧙‍♂️ 🧚‍♀️ 🧚‍♂️ 🧛‍♀️ 🧛‍♂️ 🧜‍♀️ 🧜‍♂️ 🧝‍♀️ 🧝‍♂️ 🧞‍♀️ 🧞‍♂️🧟‍♀️ <br />🧟‍♂️🙍 🙍‍♂️ 🙍‍♀️ 🙎 🙎‍♂️ 🙎‍♀️ 🙅 🙅‍♂️ 🙅‍♀️ 🙆
            🙆‍♂️ 🙆‍♀️💁 💁‍♂️💁‍♀️ 🙋 🙋‍♂️ 🙋‍♀️ 🙇 🙇‍♂️<br />🙇‍♀️ 🤦 🤦‍♂️ 🤦‍♀️ 🤷 🤷‍♂️🤷‍♀️ 💆 💆‍♂️ 💆‍♀️💇 💇‍♂️ 💇‍♀️ 🤷🚶 🚶‍♂️ 🚶‍♀️ 🏃🏃‍♂️ 🏃‍♀️ 💃 🕺 👯👯‍♂️ <br />👯‍♀️ 🧖‍♀️ 🧖‍♂️ 🕴 🗣👤 👥 👫👬 👭💏 👨‍❤️‍💋‍👨 👩‍❤️‍💋‍👩 💑 👨‍❤️‍👨 👩‍❤️‍👩 👪 👨‍👩‍👦 👨‍👩‍👧 👨‍👩‍👧‍👦 👨‍👩‍👦‍👦 👨‍👩‍👧‍👧 👨‍👨‍👦 👨‍👨‍👧 👨‍👨‍👧‍👦 👨‍👨‍👦‍👦 <br />👨‍👨‍👧‍👧 👩‍👩‍👦 👩‍👩‍👧
            👩‍👩‍👧‍👦 👩‍👩‍👦‍👦 👩‍👩‍👧‍👧 👨‍👦 👨‍👦‍👦 👨‍👧 👨‍👧‍👦 👨‍👧‍👧 👩‍👦 👩‍👦‍👦 👩‍👧 👩‍👧‍👦 👩‍👧‍👧 🤳 💪 👈 👉 ☝ 👆 🖕 👇 ✌ 🤞 🖖 🤘 🖐 <br />✋ 👌 👍 👎 ✊ 👊🤛 🤜 🤚 👋 🤟 ✍ 👏 👐 🙌 🤲 🙏 🤝 💅 👂 👃 👣 👀 🧠 👅 👄 💋 👨‍🎤 <br />👩‍🎤 💃 🕺 👯‍♂️ 👯‍♀️
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050605">
          <div class="subSectionTitle">Gender Signs</div>
          <div class="subSectionDesc">
            ♀ ♂ ⚢ ⚣ ⚤ ⚥ ☿ ♁ ⚧
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050535">
          <div class="subSectionTitle">Geometric</div>
          <div class="subSectionDesc">
            ☐ Ↄ ■ □ ▢ ▣ ▤ ▥ ▦ ▧ ▨ ▩ ▪ ▫ ▬ ▭ ▮ ▯ ▰ ▱ ◆ ◇ ◈ ◉ ◊ ○ ◌ ◍ ◎ ● ◐ ◑ ◒ ◓ ◔ ◕ ◖ ◗ ◘ ◙ ◚ ◛ ◜ ◝ ◞ ◟ ◠ ◡ ▲▼△▽⊿ ◤ ◥ ◣ ◢ ◦ ◧ ◨ ◩ ◪ ◫ ◬ ◭ ◮ ◯ ⍁ ⍂ ⍃ ⍄ ⌷ ⌸ ⌹ ⌺ ⌻ ⌼ ⌿ ⍀ ⍅ ⍆ ⍇ ⍈ ⍉ ⍊ ⍋ ⍌ ⍍ ⍎ ⍏ ⍐ ⍑ ⍒ ⍓ ⍔
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2534949">
          <div class="subSectionTitle">Halloween</div>
          <div class="subSectionDesc">
            😨 😰 😱 🤡 😈 👿 👹 👺 💀 ☠️👻 👽 👾 🤖 🕵 👸 🧙 ⚱️⚰️⛓️🧙‍♀️🧙‍♂️ 🧚 🧚‍♀️ 🧚‍♂️ <br />
            🧛 🧛‍♀️ 🧛‍♂️ 🧜 🧜‍♀️ 🧜‍♂️ 🧝 🧝‍♀️ 🧝‍♂️ 🧞 🧞‍♀️ 🧞‍♂️ 🧟 🧟‍♀️ 🧟‍♂️ 🕴 💚🖤 🦄 🦇🦉 🕷️🕸️🥀 <br />
            🍫 🍬 🍭 🌃 🛸🌕 🌚 ⚡🎃 🔮🎭 🕯️🗡️<br /><br />
            <br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356331">
          <div class="subSectionTitle">Hearts &amp; Love</div>
          <div class="subSectionDesc">
            ღ ♥ ♡ ❤ ➳♥ ❥ ❦ ❧ ❣ 💕 💔💘 💓 💔 💖 💗 💌🖤 💜 💙 💚 💛🧡 💞 💟 💝<br /><br />👰 💍 💒 🏩 💑 💏<br /><br /><br /><br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1355831">
          <div class="subSectionTitle">Letters</div>
          <div class="subSectionDesc">
            Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ<br />ⓐ ⓑ ⓒ ⓓ ⓔ ⓕ ⓖ ⓗ ⓘ ⓙ ⓚ ⓛ ⓜ ⓝ ⓞ ⓟ ⓠ ⓡ ⓢ ⓣ ⓤ ⓥ ⓦ ⓧ ⓨ ⓩ<br /><br />₠ ₡ ₢ ₣ ₤ ₥ ₦ ₧ ₨ ₪ ₫ € ₭ ₮ ₯ ℀ ℁ ℂ ℄ ℅ ℆ ℇ ℈ ℉ ℊ ℋ ℌ ℍ ℎ ℏ ℐ ℑ ℒ ℓ ℔ ℕ №
            ℗ ℘ ℙ ℚ ℛ ℜ ℝ ℞ ℟ ℡ ™ ℣ ℤ ℥ Ω ℧ ℨ ℩ K Å ℬ ℭ ℮ ℯ ℰ ℱ Ⅎ ℳ ℴ ℵ ℶ ℷ ℸ<br /><br />𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫<br />𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ<br /><br />𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟<br />𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅<br /><br />𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏<br />𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵<br /><br />ᵃᵇᶜᵈᵉᶠᵍʰᶤʲᵏˡᵐᶰᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ<br /><br />℃
            ℉ °∃ ∧ ∠ ∨ ∩ ⊂ ⊃ ∪ ⊥ ∀ Ξ Γ ɐ ə ɘ ε β ɟ ɥ ɯ ɔ и ๏ ɹ ʁ я ʌ ʍ λ ч ∞ Σ Π<br /><br />๖ۣۜA ๖ۣۜB ๖ۣۜC ๖ۣۜD ๖ۣۜE ๖ۣۜF ๖ۣۜG ๖ۣۜH ๖ۣۜI ๖ۣۜJ ๖ۣۜK ๖ۣۜL ๖ۣۜM ๖ۣۜN ๖ۣۜO ๖ۣۜP ๖ۣۜQ ๖ۣۜR ๖ۣۜS ๖ۣۜT ๖ۣۜU ๖ۣۜW ๖ۣۜV
            ๖ۣۜX ๖ۣۜY ๖ۣۜZ <br /><br />æ Æ ø Ø å Å ö Ö ä Ä ë Ê ï Î é É ß <br /><br />α в ¢ ∂ є f g н ι נ к ℓ м и σ ρ q я ѕ т υ ω ν χ у <br /><br />💤 | ᶠᵘᶜᵏᵧₒᵤ | Yᵒᵘ Oᶰˡʸ Lᶤᵛᵉ Oᶰᶜᵉ | ℓ٥ﻻ ﻉ√٥υ | ᶫᵒᵛᵉᵧₒᵤ<br /><br />🆕
            🆒 🆙 🆖 🆓 🔤 🔠 🔡 <br /><br /><br /><br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1355839">
          <div class="subSectionTitle">Lines, Bars &amp; Dashes</div>
          <div class="subSectionDesc">
            ▂▃▅▆█▆▅▃▂ <br /><br />ılı.lıllılı.ıllı..ılı.lıllılı.ıllı <br /><br />║▌│█║▌│ █║▌│█│║▌║ <br /><br />▂ ▃ ▄ ▅ ▆ ▇ █ █ ▇ ▆ ▅ ▄ ▃ ▂<br /><br />· ¨ … ¦ ┅ ┆ ┈ ┊ ╱ ╲ ╳ ¯ – —<br /><br />≡ ჻ ░ ▒ ▓ ▤ ▥ ▦ ▧
            ▨ ▩ █ ▌ ▐ ▀ ▄<br /><br />◠ ◡ ╭ ╮ ╯ ╰<br /><br />│ ┤ ╡ ╢ ╖ ╕ ╣ ║ ╝ ╜ ╛ ┐ └ ┴ ┬ ├ ─ ┼ ╞ ╟ ╚ ╔ ╩ ╦ ╠ ═ ╬ ╧ ╨ ╤ ╥ ╙ ╘ ╒ ╓ ╫ ╪ ┘ ┌<br /><br />
            ⊢ ⊣ ⊤ ⊥ ⊦ ⊧ ⊨ ⊩ ⊪ ⊫ ⊬ ⊭ ⊮ ⊯<br /><br />☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050595">
          <div class="subSectionTitle">Marks, Signs &amp; Symbols</div>
          <div class="subSectionDesc">
            ☢️☣️ 🆗 🏧 🚮 🚰 ♿ 🚹 🚺 🚻 🚼 🚾 ▶️ ⏩ ◀️⏪ 🔼 ⏫ 🔽 ⏬ ⏹️ ⏏️ 🎦 🔅 🔆 📶 📳 📴 ♻️ #️⃣ 0️⃣ 1️⃣2️⃣ 3️⃣ 4️⃣ 5️⃣6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 💯 🔠 🔡 🔢 🔣 🔤 🅰 🆎 🅱 🆑🆒 🆓🆕 🆖 🅾 🆗 🅿 🆘 🆙 🆚 🈁 🈂️ 🈷️ 🈶 🈯 🉐 🈹
            🈚 🈲 🉑 🈸 🈴 🈳 ㊗️ ㊙️ 🈺🈵 ◽ ◾ ⬛ ⬜ 🔶 🔷 🔸 🔹 🔺 🔻 💠 🔲 🔳 ⚪ ⚫ 🔴 🔵 <br /><br />🛐⚛️🕉️✡️☸️☯️✝️☦️☪️☮️🕎 🔯 ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ ⛎ <br /><br />⚠️🚸 ⛔ 🚫 🚳 🚭 🚯 🚱
            🚷🔞 <br /><br />⬆️➡️↗️➡️↘️⬇️↙️⬅️↖️↩️↪️⤴️⤵️🔃🔄🔙🔚🔛 🔜 🔝 <br /><br />🔱📛 🔰⭕ ✅ ☑️✔️✖️❌❎➕➖➗➰➿〽️✳️✴️❇️❓❔❕ ❗ Ⓜ️<br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1355841">
          <div class="subSectionTitle">Miscellaneous Characters &amp; Symbols</div>
          <div class="subSectionDesc">
            유 웃 ۵ ∴ △ ∞ ｡ ™ ℠ © ℗ ® ™ ® ™ ✿ ❖ ∞ ზ ⧞ ⧝ ◎ ♣ ♥ ♦ ➸ ☫ ☬ ☭ ☮ ☯ ◎ ♣ ♥ ☼ ☾ ☽ ♦ ✚ ✪ ✣ ✤ ✥ ☠ 유 ℧ ℥ ۵ ≛ ∫ ∬ ∭ ∮ ∯ ∰ ∱∳ 〄 ∩ ∪ ⊗ ⊘ ≅ ≠ Ω ♨ ❢ ❣ ✐ ✎ ✏ ✆ ރ ▧ ▨ ▦ ▩ ۩ ஜ ஜ ๑۩۞۩๑ ஜ ஒ ண இஆ ௰ ௫&amp;➸ ๏̯͡๏
            【ツ】 ะ㋚ะ ๑㋡๑ ʚ㋞ɞ <br /><br />∎ − ∓ ∔ ∕ ∖ ∗ ∘ ∙ ∝ ∞ ∟ ∠ ∡ ∢ ∣ ∤ ∥ ∦ ∧ ∨ ∩ ∪ ∴ ∵ ∶ ∷ ∸ ∹ ∺ ∻ ∼ ∽ ∾ ∿ ≀ ≁ ≪ ≫ ≬ ≭ ≮ ≯ ≰ ≱ ≲ ≳ ≴ ≵ ≶ ≷ ≸ ≹ ≺ ≻ ≼ ≽ ≾ ≿ ⊀ ⊁ ⊂ ⊃ ⊄ ⊅ ⊆ ⊇ ⊈ ⊉ ⊊ ⊋ ⊌ ⊍ ⊎ ⊏ ⊐ ⊑ ⊒ ⊓ ⊔
            ⊕ ⊖ ⊗ ⊘ ⊙ ⊚ ⊛ ⊜ ⊝ ⊞ ⊟ ⊠ ⊡ ⊰ ⊱ ⊲ ⊳ ⊴ ⊵ ⊶ ⊷ ⊸ ⊹ ⊺ ⊻ ⊼ ⊽ ⊾ ⊿ ⋀ ⋁ ⋂ ⋃ ⋄ ⋅ ⋇ ⋈ ⋉ ⋊ ⋋ ⋌ ⋍ ⋎ ⋏ ⋐ ⋑ ⋒ ⋓ ⋔ ⋕ ⊾ ⋖ ⋗ ∀ ∃ ∄ ∅ ∈ ∉ ∏ ∑ ∓ ∝ ∟ ∠ ∡ ∢ ≃ ⋖ ⋗ ⋘ ⋙ ⋚ ⋛ ≦ ≧ ⋜ ⋝ ⋞ ⋟ ⋠ ⋡ ⋢ ⋣ ⋤ ⋥ ⋦ ⋧ ⋨ ⋩ ⋪ ⋫ ⋬ ⋭ ⋮ ⋯ ⋰
            ⋱ ⋲ ⋳ ⋴ ⋵ ⋶ ⋷ ⋸ ⋹ ⋺ ⋻ ⋼ ⋽ ⋾ ⋿ ⌀ ⌁ ⌂ ⌃ ⌄ ⌅ ⌆ ⌇ ⌈ ⌉ ⌊ ⌋ ⌌ ⌍ ⌎ ⌏ ⌐ ⌑ ⌒ ⌓ ⌔ ⌕ ⌖ ⌗ ⌘ ⌙ ⌜⌝ ⌞ ⌟ ⌠ ⌡ ⌢ ⌣ ⌤ ⌥ ⌨ ⟨ ⟩ ⌫ ⌬ ⌭ ⌮ ⌯ ⌰ ⌱ ⌲ ⌳ ⌴ ⌵ ⌶ ⌽ ⌾ ⍕ ⍖ ⍗ ⍘ ⍙ ⍚ ␋ ␢ ␣<br /><br />
            ☤ ⚛ ☊ ☋ ☌ ☍ ☓ ☖ ☗ ☘ ☙ ☟ ☠ ☡ ☢ ☣ ☤ ☥ ☦ ☧ ☨ ☩ ☪ ☫ ☬ ☭ ☸ ☼ ♃ ♄ ♅ ♇ ♨ ♰ ♱ ☫ ª ↀ ↁ ↂ ϡ ☤ ☥ ☦ ☧ ☨ ☩ ☪ ☫ ☬ ☭ ⁉ ⁈ ؟ ﹖ ¿ Ƹ̵̡Ӝ̵̨̄Ʒ [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅] 🏳 ๖ۣۜ ‡ ☮ ☪ ⚔ ✡ ☭ ✯ <br /><br />
            🎀 🎄 🎅 🎆 🎈 🎊 ⚔ 🎃 👻 🎁 🎉🔥💣👑🔥 🎆 🎭🔫 🏁 🚩🎌 🏴 🏳️‍🌈 🏴‍☠️ 💺🌠 ⛱️🏖️🎆 🎇 🎑 💴 💵💶 💷 🗿 🗾 🏔️🌋 🗻 🏕️🏜️🏝️🏞️🏟️🏛️🏗️🏘️🏚️🏠 🏡 🏢 🏣 🏤 🏥 🏦 🏨 🏩 🏪 🏫 🏬 🏭 🏯 🏰 💒 🗼 🗽 ⛪ 🕌 🕍 ⛩ 🕋
            ⛲ ⛺ 🌁 🌃 🏙️🌄 🌅 🌆 🌇 🌉 🌌🎠 🎡 🎢🎥 🎬 💣 👑 🔥 🎭 🔫 ⌚ ⌛☕ 🗯️💭💢♨️💤🌀<br /><br /><br /><br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050555">
          <div class="subSectionTitle">Music</div>
          <div class="subSectionDesc">
            ♩ ♫ ♭ ♪ ♯ ♬ ♮ 🔇🔈 🔉 🔊 📢📣 📯 🔔 🔕 🎵 🎶 🎧🎼🎷 🎸 🎹 🎺 🎻 🥁
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1355832">
          <div class="subSectionTitle">Numbers</div>
          <div class="subSectionDesc">
            ⓵ ⓶ ⓷ ⓸ ⓹ ⓺ ⓻ ⓼ ⓽ ⓾ ⓫ ⓬ ⓭ ⓮ ⓯ ⓰ ⓱ ⓲ ⓳ ⓴<br /><br />① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ ⑪ ⑫ ⑬ ⑭ ⑮ ⑯ ⑰ ⑱ ⑲ ⑳<br /><br />
            ⒉ ⒊ ⒋ ⒌ ⒍ ⒎ ⒏ ⒐ ⒑ ⒒ ⒓ ⒔ ⒕ ⒖ ⒗ ⒘ ⒙ ⒚ ⒛ <br /><br />𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫 <br /><br />𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡𝟘<br /><br />√ ∛ ∜ <br /><br />⅟ ½ ⅓ ⅕<br />⅙ ⅛ ⅔ ⅖<br />⅚ ⅜ ¾ ⅗<br />⅝ ⅞ ⅘<br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2436771">
          <div class="subSectionTitle">Plants</div>
          <div class="subSectionDesc">
            💐 🌸 💮 🌹 🥀 🌺 🌻 🌼 🌷 🌱🌲 🌳 🌴 🌵🌾 🌿 ☘🍀 🍁 🍂🍃 🍄 🌰
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356327">
          <div class="subSectionTitle">Stars &amp; Circular Shapes</div>
          <div class="subSectionDesc">
            ✸✤ ✥✦✧ ◈ ★ ☆ ✩ ✫ ✬ ✭ ✮ ✯ ✰ 【★】 ✱ ✲ ✳ ❃ ❂ ❁ ❀ ✿ ✾ ✽ ✼ ✻ ✺ ✹ ✸ ✷ ❃ ❂ ❁ ❀ ✿ ✾ ✽ ✼ ✻ ✺ ✹ ✸ ✷ ✶ ✵ ✴ ❄ ❅ ❆ ❇ ❈ ❉ ❊ ❋ ✪ ⋆ 💫 🌠 ✨🌟
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356354">
          <div class="subSectionTitle">Sports</div>
          <div class="subSectionDesc">
            🏆 🏁 ♕ ♛ ♔ ♚ 🏂 🏄 🏊 🎯 ⚽ ⚾ 🎾 🏀⚽ 🏈🏉 🎳 ⛳ 🎱 🎲 🎮 👾 ♖ ♗ ♘ ♙ ♜ ♝ ♞ ♟ 🃏 ♤ ♧ ♡ ♢ ♠ ♣ ♥ ♦🏅 🥇 🥈 🥉 🏒⛸ 🎿 🛷 🥌 🏹🧗‍♀️ 🧗‍♂️ 🧘‍♀️ 🧘‍♂️ 🕴 🏇 ⛷ 🏂 🏌 🏌️‍♂️ 🏌️‍♀️ 🏄 🏄‍♂️ 🏄‍♀️ 🚣 🚣‍♂️ 🚣‍♀️ 🏊 🏊‍♂️ 🏊‍♀️ ⛹ ⛹️‍♂️ ⛹️‍♀️ 🏋
            🏋️‍♂️ 🏋️‍♀️ 🚴 🚴‍♂️🚴‍♀️ 🚵 🚵‍♂️ 🚵‍♀️ 🤸 🤸‍♂️ 🤸‍♀️ 🤼 🤼‍♂️ 🤼‍♀️ 🤽 🤽‍♂️ 🤽‍♀️ 🤾 🤾‍♂️ 🤾‍♀️ 🤹 🤹‍♂️ 🤹‍♀️ 🎪🎫 🎾<br />🎳 🏏 🏑 🏒 🏓 🏸 🥊 🥋 ⛳🎣 🎽 🛷 🥌 🎯 🎱 🎮 🎰 🎲
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2436791">
          <div class="subSectionTitle">Transportation</div>
          <div class="subSectionDesc">
            🏎️🏍️🚂 🚃 🚄 🚅 🚆🚇 🚈 🚊 🚝 🚞 🚋 🚌 🚍🚎 🚐 🚑 🚒 🚓 🚔 🚕 🚖 🚗 🚘 🚚 🚛 <br />🚜🚲 🛴 🛵 🛥️⛵ 🚤 🚢 ✈️🛩️🛫 🛬 🚁 🚟 🚠 🚡 🚀 🛸 ⚓🚧🚦🚥🚨🚏 ⛽ 🛤️
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050539">
          <div class="subSectionTitle">Weather &amp; Space</div>
          <div class="subSectionDesc">
            🌪️🌠🌈 🌂 ⚡ ❄🔥💧 🌊 🚀🌍 🌎 🌏🌐☔☂️🌡️🌬️⛄🌁🌂🏂🌨️☁️🌩️⛅🌫️⛆
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356348">
          <div class="subSectionTitle">Work &amp; Office</div>
          <div class="subSectionDesc">
            📅 📆 🔧 🔨 🔩 🚪 🔑 🔐 🔏 🔒 🔓 🎬 🎥 📹 📼 📷 📡 📺 🔌 🔋 💡 🔦 ☎ ☏ 📞📟 ✂ ✃ ✄ 📌 📎 🔗 ✏ ✒ 🔎 🔍 📏 📐 🎨 💻 📠 📇 💾 💽 📀 💿 📊 📈 📉 📇 📠 💻 ✉ 📧 📨 📩 📮 📪 📫 📥 📤 📲 📱 📁 📂 📰 📄 📃
            📑 📜 📋 📝 📦 🎫 🔖 📖 📔 📒 📓 📕 📙 📗 📘 📚 💄 👓 👑 🎩 👒 🎓 👛 👜 👝 🎒 💼 🎽 👗 👔 👕 👚 👘 👙 👖 👠 👢 👞 👡 👟 🕛🕧🕐 🕜 🕑🕝 🕒 🕞 🕓🕟 🕔 🕠🕕 🕡 🕖🕢 🕗🕣 🕘 🕤 🕙 🕥 🕚 🕦 📫 📪📬
            📭
            <div style="clear: both"></div>
          </div>
        </div>
          </div>
        </div>
        `;

    function setSymbolsCharactersModal() {
      const showButton = document.getElementById("showSymbols");
      const symbolsModal = document.getElementById("symbolsModal");
      const closeButton = document.getElementById("close");
      showButton.addEventListener("click", () => {
        symbolsModal.classList.add("show");
      });
      closeButton.addEventListener("click", () => {
        symbolsModal.classList.remove("show");
      });
    }
    // Reload page after 3 seconds
    setTimeout(setSymbolsCharactersModal, 1000);

    // Check if on main profile page

    const mainProfilePage = document.getElementsByClassName("commentthread_entry").length > 0;

    if (mainProfilePage) {
      // Grab mainContentsDiv element reference
      // console.log("commentthread_entry found");
      const symbolsPickerModalLocation = document.querySelector(".commentthread_entry");
      symbolsPickerModalLocation.parentNode.appendChild(symbolsDialogDetails, symbolsPickerModalLocation);
    } else {
      // console.log("commentthread_entry not found");
    }

    // Check if on Edit Profile page

    const profileEditInfoPage = document.getElementsByClassName("summary_summaryTextArea_2ipSt").length > 0;

    if (profileEditInfoPage) {
      const symbolsPickerProfileEditLocation = document.querySelector(".summary_summaryTextArea_2ipSt");
      symbolsPickerProfileEditLocation.parentNode.appendChild(symbolsDialogDetails, symbolsPickerProfileEditLocation);
    }

    // Featured Showcase Custom Text

    const profileEditShowcaseText = document.getElementsByClassName("customization_edit_area").length > 0;

    const navLinkShowcase = document.getElementsByClassName("profileeditshell_Shell_2kqKZ").length > 0;

    if (navLinkShowcase) {
      console.log("profileShowCasesMavLink found");
      const profileEditGeneralNavLink = document.querySelector(".profileeditshell_NavLink_3rtIp[href$='/showcases']");
      profileEditGeneralNavLink.addEventListener("click", () => {
        console.log("Featured Showcase nav link clicked");
        // window.location.replace("https://steamcommunity.com/id/darkharden/edit/showcases")
        // window.location.reload();
        window.history.pushState("", "", "/showcases");
        function reloadShowCasesPage() {
          window.location.reload();
        }
        // Reload page after 3 seconds
        setTimeout(reloadShowCasesPage, 200);
      });
    }

    if (profileEditShowcaseText) {
      // console.log("customization_edit_area found");
      const symbolsPickerProfileEditLocation = document.querySelector(".customization_edit_area .customtext_showcase");
      symbolsPickerProfileEditLocation.parentNode.appendChild(symbolsDialogDetails, symbolsPickerProfileEditLocation);
    } else {
      // console.log("customization_edit_area not found");
    }

    // Featured Showcase Summary
    const profileEditSummary = document.getElementsByClassName("profileedit_ProfileBoxContent_3s6BB").length > 0;

    // Check if Showcase Nav link exists

    const navLinkGeneral = document.getElementsByClassName("profileeditshell_Shell_2kqKZ").length > 0;

    if (navLinkGeneral) {
      const profileEditFeaturedShowCaseNavLink = document.querySelector(".profileeditshell_NavLink_3rtIp[href$='/info']");
      profileEditFeaturedShowCaseNavLink.addEventListener("click", () => {
        console.log("General nav link clicked");
        // window.location.replace("https://steamcommunity.com/id/darkharden/edit/info")
        // window.location.reload();
        window.history.pushState("", "", "/info");
        function reloadGeneralPage() {
          window.location.reload();
        }
        // Reload page after 3 seconds
        setTimeout(reloadGeneralPage, 200);
      });
    }

    if (profileEditSummary) {
      // console.log("profileedit_ProfileBoxContent_3s6BB found");
      const symbolsPickerProfileEditLocation = document.querySelector(".profileedit_ProfileBoxContent_3s6BB .summary_summaryTextArea_2ipSt");
      symbolsPickerProfileEditLocation.parentNode.appendChild(symbolsDialogDetails, symbolsPickerProfileEditLocation);
    } else {
      // console.log("profileedit_ProfileBox_uwqwo not found");
    }
  }
  setTimeout(setCommentSymbolsPicker, 500);
});
