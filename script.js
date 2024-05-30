//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

// Ensure the correct words list container exists only once
const correctWordsList = document.getElementById("correct-words-list") || createCorrectWordsList();

function createCorrectWordsList() {
    // Check if it already exists to avoid creating multiple boxes
    if (!document.getElementById("correct-words-list")) {
        const listContainer = document.createElement("div");
        listContainer.id = "correct-words-list";
        listContainer.className = "correct-words-container";
        
        document.body.appendChild(listContainer);
        return listContainer;
    }
    return document.getElementById("correct-words-list");
}

//Options values for buttons
let options = {
  Easy: [
    "apple", "ball", "cat", "dog", "elephant", "fish", "goat", "hat", "ice", "jug", 
    "kite", "lion", "monkey", "nest", "orange", "pig", "queen", "rat", "snake", "tiger", 
    "umbrella", "vase", "whale", "xylophone", "yak", "zebra", "box", "yellow", "van", "truck", 
    "school", "rose", "quilt", "pencil", "lamp", "kangaroo", "jelly", "island", "horse", "grape", 
    "forest", "egg", "dolphin", "crocodile", "butterfly", "ant", "giraffe", "house", "igloo", "juice", 
    "king", "leaf", "mountain", "north", "ocean", "panda", "quack", "river", "sun", "tree", 
    "unicorn", "volcano", "wolf", "yo-yo", "zeppelin", "ax", "beach", "cave", "desert", 
    "eagle", "flute", "guitar", "helicopter", "island", "jacket", "kiwi", "lemon", "mango", "notebook", 
    "octopus", "parrot", "queen", "rope", "star", "train", "umbrella", "violin", "wall", "xenon", 
    "yacht", "zoo", "banana", "cherry", "date", "fig", "grapefruit", "honeydew", "kiwifruit", "lime", 
    "mushroom", "nectarine", "olive", "peach", "quince", "raspberry", "strawberry", "tangerine", "watermelon", "yam"
  ],

  Medium: [
    "algebra", "metaphor", "syntax", "thesis", "amendment", "constitution", "democracy", "photosynthesis", "evolution", "mitosis",
    "neutron", "proton", "electron", "isotope", "velocity", "acceleration", "momentum", "voltage", "resistance", "current",
    "calculus", "geometry", "vector", "scalar", "quadratic", "polynomial", "derivative", "integral", "function", "limit",
    "literature", "protagonist", "antagonist", "narrative", "genre", "fiction", "nonfiction", "poetry", "drama", "dialogue",
    "chemistry", "biology", "physics", "zoology", "botany", "ecology", "geology", "meteorology", "astronomy", "anthropology",
    "sociology", "psychology", "philosophy", "theology", "ethics", "logic", "aesthetics", "epistemology", "metaphysics", "existentialism",
    "economics", "macroeconomics", "microeconomics", "supply", "demand", "scarcity", "monopoly", "oligopoly", "inflation", "recession",
    "government", "legislature", "executive", "judiciary", "senate", "congress", "parliament", "president", "minister", "diplomacy",
    "history", "archaeology", "chronology", "renaissance", "medieval", "colonialism", "imperialism", "revolution", "territory", "sovereignty"
  ],

  Hard: [
    "aberration", "abnegation", "abrogate", "abscond", "abstruse", "accretion", "acumen", "adamant", "admonish", "adumbrate",
    "adventitious", "aggrandize", "alacrity", "ambivalent", "amenable", "anachronistic", "anathema", "antithesis", "apocryphal", "arrogate",
    "ascetic", "aspersion", "assiduous", "atrophy", "bane", "beguile", "bereft", "blandishment", "cacophony", "cajole",
    "calumny", "capitulate", "clemency", "cogent", "concomitant", "conflagration", "contravene", "convivial", "corroborate", "credulity",
    "culpable", "decry", "deferential", "demagogue", "denigrate", "derivative", "despot", "diaphanous", "didactic", "diffident",
    "disparate", "dispel", "disrepute", "divisive", "dogmatic", "duplicity", "eclectic", "effrontery", "egregious", "enervate",
    "enfranchise", "epitome", "equanimity", "equivocate", "esoteric", "euphoric", "evanescent", "exacerbate", "exculpate", "exigent",
    "expedient", "extraneous", "fastidious", "fatuous", "fecund", "feral", "florid", "fractious", "garrulous", "grandiloquent",
    "gregarious", "hackneyed", "hapless", "hegemony", "iconoclast", "idiosyncratic", "impecunious", "impetuous", "impinge", "implacable",
    "inchoate", "incumbent", "inexorable", "inimical", "iniquity", "insidious", "insolvent", "interlocutor", "inure", "invective",
    "irascible", "laconic", "lampoon", "largesse", "lethargic", "limpid", "lithe", "magnanimous", "malevolent", "malleable",
    "manifold", "maudlin", "maverick", "mawkish", "mendacious", "mercurial", "modicum", "morass", "multifarious", "munificent",
    "myriad", "nadir", "nascent", "nebulous", "nefarious", "neophyte", "nocturnal", "noxious", "obdurate", "obfuscate",
    "oblique", "obstreperous", "obviate", "occlude", "odious", "onerous", "ostensible", "ostracism", "palliate", "panacea",
    "paradigm", "pariah", "partisan", "paucity", "pejorative", "pellucid", "penchant", "penurious", "perfunctory", "pernicious",
    "pertinacious", "phlegmatic", "pithy", "platitude", "plethora", "pliable", "poignant", "polemic", "pragmatic", "precocious",
    "prescient", "probity", "proclivity", "profligate", "progeny", "prolific", "prosaic", "protean", "prudence", "pugnacious",
    "pulchritude", "punctilious", "quagmire", "quixotic", "quotidian", "rancor", "recalcitrant", "redoubtable", "refractory", "replete",
    "reprehensible", "repudiate", "rescind", "reticent", "reverent", "ribald", "rife", "sagacious", "salient", "sanguine",
    "scurrilous", "sedentary", "sedulous", "solicitous", "solipsism", "spurious", "staid", "stolid", "subjugate", "sublime",
    "subterfuge", "supercilious", "superfluous", "surfeit", "surreptitious", "tacit", "taciturn", "tangential", "tantamount", "temerity",
    "tenuous", "terse", "tirade", "torpid", "tractable", "transient", "trepidation", "truculent", "tumultuous", "ubiquitous",
    "umbrage", "unctuous", "undulate", "upbraid", "usurp", "vacillate", "vacuous", "vapid", "variegated", "vehement",
    "venal", "venerate", "veracity", "verbose", "verdant", "verisimilitude", "vestige", "vicarious", "vilify", "vindicate",
    "virtuoso", "vitriolic", "vituperate", "vociferous", "wanton", "winsome", "wistful", "zealous", "zenith", "zephyr"
  ],
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML = ""; // Clear previous options
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled = true; // Corrected from button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValue matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letters and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", letterButtonClickHandler);
    letterContainer.append(button);
  }

  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing(); // Draw the initial frame
};

// Letter button click handler
function letterButtonClickHandler() {
  let charArray = chosenWord.split("");
  let dashes = document.getElementsByClassName("dashes");
  if (charArray.includes(this.innerText)) {
    charArray.forEach((char, index) => {
      if (char === this.innerText) {
        dashes[index].innerText = char;
        winCount += 1;
        if (winCount == charArray.length) {
          resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
          const newListItem = document.createElement("li");
          newListItem.textContent = chosenWord;
          correctWordsList.appendChild(newListItem);
        }
      }
    });
  } else {
    count += 1;
    drawMan(count);
    if (count == 6) {
      resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
      blocker();
    }
  }
  this.disabled = true;
}

// Canvas drawing functions
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 5;

  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130);
    drawLine(10, 10, 10, 131);
    drawLine(10, 10, 70, 10);
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// Draw the man based on the count
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;

document.addEventListener("DOMContentLoaded", function() {
  const body = document.body;
  body.style.backgroundImage = "url('https://64.media.tumblr.com/7288fb9c5a568fc033a233b1b5862886/27bd7103dd700c5a-de/s500x750/8e8261cf6e76222c6ca0ab275a5dcae5e2fbd7cb.gifv')";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "100% 100%"; // This will stretch the GIF to cover the entire body
  body.style.backgroundAttachment = "fixed"; // This will keep the background fixed during scrolling

  const changeBackgroundButton = document.getElementById("changeBackground");
  changeBackgroundButton.addEventListener("click", function() {
      // List of GIF URLs
      const backgrounds = [
          "https://64.media.tumblr.com/f1580c43a35318d575498d6049568d4c/27bd7103dd700c5a-b3/s500x750/9b2bef2d7734a7c3c0f3ab43522666a7a3d3adba.gif", // Add more GIF URLs as needed
          "https://64.media.tumblr.com/3f4c144b0e13323ba97a59a6761fbb78/50cd3b10801c5f9d-11/s500x750/0f14fd6578f201f12c9f4b0db476eecc3a3d7138.gif",
          "https://64.media.tumblr.com/7288fb9c5a568fc033a233b1b5862886/27bd7103dd700c5a-de/s500x750/8e8261cf6e76222c6ca0ab275a5dcae5e2fbd7cb.gifv"
      ];

      // Get a random background from the list
      const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      
      // Set the new background image
      body.style.backgroundImage = `url('${randomBackground}')`;
  });
});
