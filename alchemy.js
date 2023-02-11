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

const cipher = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","?","!"];
let encoded01 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let encoded02 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let encoded03 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let operator = null;

textPut1.addEventListener('input', onTextChanged);
textPut2.addEventListener('input', onTextChanged);
textPut3.addEventListener('input', onTextChanged);

function onLoad() {
  image(1,textPut1.value);
  punch(1,encode(textPut1.value));
  image(2,textPut2.value);
  punch(2,encode(textPut2.value));
  if (andButton.checked = true) operator = "AndButton";
  else if (orButton.checked = true) operator = "OrButton";
  else if (xorButton.checked = true) operator = "XorButton";
  else if (abjButton.checked = true) operator = "AbjButton";
  if (operator != null) equalsButton.src = "img/btn/EQ00.png";
}

function onTextChanged(evt) {
  let id = evt.currentTarget.id.slice(-1);
  let item_encoded = encode(this.value)
  image(id,this.value);
  punch(id,item_encoded);
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
  let card;
  if (id == 1) {card = card1}
  else if (id == 2) { card = card2}
  else if (id == 3) { card = card3}
  card.children[0].style.backgroundImage = "url(img/item/"+code+".png)";
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

