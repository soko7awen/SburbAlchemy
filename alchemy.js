const card1 = document.getElementById("Card1");
const card2 = document.getElementById("Card2");
const holesGrid1 = document.getElementById("HolesGrid1");
const holesGrid2 = document.getElementById("HolesGrid2");
const textPut1 = document.getElementById("TextPut1");
const textPut2 = document.getElementById("TextPut2");
const andButton = document.getElementById("AndButton");
const orButton = document.getElementById("OrButton");
const xorButton = document.getElementById("XorButton");
const abjButton = document.getElementById("AbjButton");
const equalsButton = document.getElementById("EqualsButton");
const card3 = document.getElementById("Card3");
const holesGrid3 = document.getElementById("HolesGrid3");
const textPut3 = document.getElementById("TextPut3");
const suggestionsContainer = document.getElementById('suggestions-container');
const items = {
"00000000": "perfectly_generic_object",
"11111111": "captchalogue_card",
"DQMmJLeK": "green_slime_ghost_pogo",
"nZ7Un6BI": "claw_hammer",
"dskjhsdk": "rocket_pack_with_items",
"126GH48G": "pogo_hammer",
"cZCMY4Qf": "cruxite_apple",
"zxN?pNhM": "hammerhead_pogo_ride",
"00080020": "joker_figurine",
"CuPA8LnQ": "potted_plant",
"CuPA8LpQ": "cosby_poster_that_john_drew_on",
"CuP28LpQ": "painting_of_a_horse_attacking_a_football_player",
"CuP28LnQ": "clean_cosby_poster",
"Q82a0H54": "cruxite_bottle",
"?0YFY90!": "dutton_photo",
"L229BxoG": "punch_designix",
"PCHOOOOO": "rocket_pack",
"pshoooes": "rocket_boots",
"PSWOOOOP": "rocket_wings",
"WIin189Q": "fear_no_anvil",
"72KH?CNq": "roses_journals",
"FFFFFFWW": "ahabs_crosshairs",
"r5jQS?v2": "box_of_chalk",
"82THE8TH": "fluorite_octet",
"qG4e0H5C": "cruxite_dog_pinata",
"uROBuROS": "red_sucker",
"UrobUros": "green_sucker",
"!!!!!!!!": "perfectly_unique_object"
};

const cipher = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","?","!"];
let encoded01 = new Array(48).fill(0);
let encoded02 = new Array(48).fill(0);
let encoded03 = new Array(48).fill(0);
let operator = null;
let currentIndex = -1;

document.addEventListener('DOMContentLoaded', () => {
  const inputs = [textPut1, textPut2, textPut3];
  inputs.forEach(input => {
      input.addEventListener('input', onTextChanged);
      input.addEventListener("focus", onTextFocus); 
      input.addEventListener('keydown', onKeyDown);
  });

  document.addEventListener('click', (event) => {
      if (!suggestionsContainer.contains(event.target) && !inputs.includes(event.target)) {
          suggestionsContainer.innerHTML = '';
      }
  });
  punch(1,encode(textPut1.value));
  image(1,textPut1.value);
  punch(2,encode(textPut2.value));
  image(2,textPut2.value);
  operator = [andButton, orButton, xorButton, abjButton].find(button => button.checked)?.id;
  if (operator != null) equalsButton.src = "img/btn/EQ00.png";
});

function onTextChanged(evt) {
  const input = evt.currentTarget;
  let id = evt.currentTarget.id.slice(-1);
  this.value = evt.currentTarget.value.substr(0,8);
  let item_encoded = encode(this.value);
  const query = this.value.toLowerCase();
  suggestionsContainer.innerHTML = '';
  currentIndex = -1;

  if (query) {
    const filteredSuggestions = Object.keys(items).filter(item => item.toLowerCase().startsWith(query));

    filteredSuggestions.forEach((suggestion, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = suggestion;

        suggestionItem.addEventListener('click', () => {
            input.value = suggestion;
            suggestionsContainer.innerHTML = '';
            const event = new Event('input', { bubbles: true });
            input.dispatchEvent(event);
        });

        suggestionsContainer.appendChild(suggestionItem);
    });
  }
  punch(id,item_encoded);
  image(id,this.value);
}

function onTextFocus(evt){
  const input = evt.currentTarget;
  suggestionsContainer.innerHTML = '';
  input.parentElement.appendChild(suggestionsContainer);
}

function onKeyDown(event) {
  const input = event.currentTarget;
  const suggestionItems = document.querySelectorAll('.suggestion-item');

  if (event.key === 'ArrowDown' && suggestionItems.length > 0) {
      event.preventDefault();
      currentIndex = (currentIndex + 1) % suggestionItems.length;
      highlightSuggestion(suggestionItems, currentIndex);
  } else if (event.key === 'ArrowUp' && suggestionItems.length > 0) {
      event.preventDefault();
      if (currentIndex === -1) {
          currentIndex = suggestionItems.length - 1;
      } else if (currentIndex === 0) {
          currentIndex = -1;
          highlightSuggestion(suggestionItems, currentIndex);
          return;
      } else {
          currentIndex = (currentIndex - 1) % suggestionItems.length;
      }
      highlightSuggestion(suggestionItems, currentIndex);
  } else if (event.key === 'Enter') {
      if (currentIndex > -1) {
          event.preventDefault();
          input.value = suggestionItems[currentIndex].textContent;
          const inputEvent = new Event('input', { bubbles: true });
          input.dispatchEvent(inputEvent);
      }
      suggestionsContainer.innerHTML = '';
      currentIndex = -1;
  }
}



function highlightSuggestion(items, index) {
  items.forEach((item, i) => {
      if (i === index) {
          item.classList.add('highlight');
      } else {
          item.classList.remove('highlight');
      }
  });
}

function punch(id,item_encoded) {
  let holesGridId;
  if (id == 1) {holesGridId = holesGrid1}
  else if (id == 2) { holesGridId = holesGrid2}
  else if (id == 3) { holesGridId = holesGrid3}
  for (let i=0; i<item_encoded.length; i++) {
    if (item_encoded[i]==1) {
      holesGridId.children[i].style.visibility = "visible";
    }
    else {
      holesGridId.children[i].style.visibility = "hidden";
    }
  }
}

function image(id,code) {
  const card = document.getElementById(`Card${id}`);
  card.children[0].style.backgroundImage = (!card || !Object.keys(items).includes(code)) ? "" : "url(img/item/"+items[code]+".png)";
}

function encode(code) {
  let item_encoded = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  for (let i=1; i<=8; i++) {
    let char = code.slice(i-1,i);
    if (char == "" || cipher.indexOf(char) == -1) {
      char = "0";
    }
    let char2binary = parseInt(cipher.indexOf(char));
    for (let j=1; j<=6; j++) {
      item_encoded[(i*6)-j] = char2binary % 2;
      char2binary = parseInt(char2binary / 2);
    }
  }
  return item_encoded;
}

function decode(code) {
  let item_decoded = "";
  for (let i=1; i<=8; i++) {
    let binary2char = parseInt(code.slice((i*6)-6,i*6).toString().replace(/,/g, ""),2);
    item_decoded = item_decoded + cipher[binary2char];
  }
  return item_decoded;
}

function alchemizeAND() {
  for (let i=0; i<=47; i++) {
    encoded03[i] = encoded01[i] & encoded02[i];
  }
  let decoded = decode(encoded03);
  image(3,decoded);
  punch(3,encoded03);
  return decoded;
}
function alchemizeOR() {
  for (let i=0; i<=47; i++) {
    encoded03[i] = encoded01[i] | encoded02[i];
  }
  let decoded = decode(encoded03);
  image(3,decoded);
  punch(3,encoded03);
  return decoded;
}

function alchemizeXOR() {
  for (let i=0; i<=47; i++) {
    encoded03[i] = encoded01[i] ^ encoded02[i];
  }
  let decoded = decode(encoded03);
  image(3,decoded);
  punch(3,encoded03);
  return decoded;
}

function alchemizeABJ() {
  for (let i=0; i<=47; i++) {
    if (encoded01[i] == 1 && encoded02[i] == 0) {
      encoded03[i] = 1;
    } else {
      encoded03[i] = 0;
    }
  }
  let decoded = decode(encoded03);
  image(3,decoded);
  punch(3,encoded03);
  return decoded;
}

andButton.addEventListener('click', getChecked);
orButton.addEventListener('click', getChecked);
xorButton.addEventListener('click', getChecked);
abjButton.addEventListener('click', getChecked);

function getChecked() {
  if(this.id==operator) {
    this.checked = false;
    operator = null;
    equalsButton.src = "img/btn/EQ02.png"
  }
  else {
    operator = this.id;
    equalsButton.src = "img/btn/EQ00.png"
  }
}

function equalsEnable() {
  equalsButton.src = "img/btn/EQ02.png"
  equalsButton.style = "cursor: auto;"
}

function equalsDisable() {
  equalsButton.src = "img/btn/EQ00.png"
  equalsButton.style = "cursor: pointer;"
}

equalsButton.addEventListener('keypress', onEqualsKeypressed);

function onEqualsKeypressed(evt) {
  if (evt.key === "Enter") evt.currentTarget.click();
}

equalsButton.addEventListener('click', alchemize);

function alchemize() {
  encoded01 = encode(textPut1.value);
  encoded02 = encode(textPut2.value);
  if (operator != null) {
    equalsButton.src = "img/btn/EQ01.png";
    setTimeout(() => {equalsButton.src = "img/btn/EQ00.png";}, 150);
  }
  if (operator == "AndButton") textPut3.value = alchemizeAND();
  else if (operator == "OrButton") textPut3.value = alchemizeOR();
  else if (operator == "XorButton") textPut3.value = alchemizeXOR();
  else if (operator == "AbjButton") textPut3.value   = alchemizeABJ();
}