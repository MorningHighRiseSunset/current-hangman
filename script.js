//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let currentStreak = 0;
let highestScore = 0;

document.getElementById('showHighestScore').addEventListener('click', function() {
  alert(`Highest Score: ${highestScore}`);
});

// Ensure the correct words list container exists only once
const correctWordsList = document.getElementById("correct-words-list") || createCorrectWordsList();

function createCorrectWordsList() {
  if (!document.getElementById("correct-words-list")) {
      const listContainer = document.createElement("div");
      listContainer.id = "correct-words-list";
      listContainer.className = "correct-words-container";
      listContainer.style.maxHeight = '300px'; // Ensure max-height is set
      listContainer.style.overflowY = 'auto'; // Ensure overflow is auto
      document.body.appendChild(listContainer);
      return listContainer;
  }
  return document.getElementById("correct-words-list");
}

//Options values for buttons
let options = {
  Easy: [
    { word: "apple", definition: "A fruit that is typically round and red, green, or yellow." },
    { word: "ball", definition: "A round object used in many games and sports." },
    { word: "cat", definition: "A small domesticated carnivorous mammal with soft fur." },
    { word: "dog", definition: "A domesticated carnivorous mammal that typically has a long snout." },
    { word: "egg", definition: "An oval or round object laid by a female bird, reptile, fish, or invertebrate." },
    { word: "fish", definition: "A limbless cold-blooded vertebrate animal with gills and fins living wholly in water." },
    { word: "goat", definition: "A hardy domesticated ruminant animal that has horns and cloven hoofs." },
    { word: "hat", definition: "A shaped covering for the head worn for warmth, as a fashion item, or as part of a uniform." },
    { word: "ice", definition: "Frozen water, a brittle transparent crystalline solid." },
    { word: "jug", definition: "A large container for liquids, with a handle and a spout or lip." },
    { word: "kite", definition: "A toy consisting of a light frame with thin material stretched over it, flown in the wind." },
    { word: "leaf", definition: "A flattened structure of a higher plant, typically green and blade-like." },
    { word: "moon", definition: "The natural satellite of the earth, visible at night by reflected light from the sun." },
    { word: "net", definition: "A piece of open-meshed material made of twine or cord, used typically for catching fish or other animals." },
    { word: "owl", definition: "A nocturnal bird of prey with large eyes and a flat face." },
    { word: "pig", definition: "A domesticated mammal with sparse bristly hair and a flat snout for rooting in the soil." },
    { word: "quilt", definition: "A warm bed covering made of padding enclosed between layers of fabric and kept in place by lines of stitching." },
    { word: "rat", definition: "A rodent that resembles a large mouse, typically having a pointed snout and a long, sparsely haired tail." },
    { word: "sun", definition: "The star around which the earth orbits, providing light and heat." },
    { word: "tree", definition: "A woody perennial plant, typically having a single stem or trunk." },
    { word: "umbrella", definition: "A device consisting of a circular canopy of cloth on a folding metal frame supported by a central rod." },
    { word: "vase", definition: "An open container, typically used to hold cut flowers." },
    { word: "wall", definition: "A continuous vertical brick or stone structure that encloses or divides an area of land." },
    { word: "x-ray", definition: "A form of electromagnetic radiation, similar to light but of shorter wavelength." },
    { word: "yarn", definition: "Spun thread used for knitting, weaving, or sewing." },
    { word: "zebra", definition: "An African wild horse with black-and-white stripes and an erect mane." },
    { word: "ant", definition: "A small insect typically having a sting and living in complex social colonies." },
    { word: "bug", definition: "A small insect." },
    { word: "cup", definition: "A small bowl-shaped container for drinking from, typically having a handle." },
    { word: "duck", definition: "A waterbird with a broad blunt bill, short legs, webbed feet, and a waddling gait." },
    { word: "fire", definition: "Combustion or burning, in which substances combine chemically with oxygen from the air and typically give out bright light, heat, and smoke." },
    { word: "grape", definition: "A berry, typically green (classified as white), purple, red, or black, growing in clusters on a grapevine." },
    { word: "hill", definition: "A naturally raised area of land, not as high or craggy as a mountain." },
    { word: "island", definition: "A piece of land surrounded by water." },
    { word: "juice", definition: "The liquid obtained from or present in fruit or vegetables." },
    { word: "king", definition: "The male ruler of an independent state, especially one who inherits the position by right of birth." },
    { word: "lamp", definition: "A device for giving light, especially one that has a covering or is contained within something." },
    { word: "mountain", definition: "A large natural elevation of the earth's surface rising abruptly from the surrounding level." },
    { word: "night", definition: "The period of darkness in each twenty-four hours; the time from sunset to sunrise." },
    { word: "orange", definition: "A round juicy citrus fruit with a tough bright reddish-yellow rind." },
    { word: "pencil", definition: "An instrument for writing or drawing, consisting of a thin stick of graphite or a similar substance enclosed in a long thin piece of wood." },
    { word: "queen", definition: "The female ruler of an independent state, especially one who inherits the position by right of birth." },
    { word: "ring", definition: "A small circular band, typically of precious metal and often set with one or more gemstones, worn on a finger as an ornament or a token." },
    { word: "snake", definition: "A long limbless reptile that has no eyelids, a short tail, and jaws that are capable of considerable extension." },
    { word: "tiger", definition: "A very large solitary cat with a yellow-brown coat striped with black, native to the forests of Asia." },
    { word: "unicorn", definition: "A mythical animal typically represented as a horse with a single straight horn projecting from its forehead." },
    { word: "van", definition: "A medium-sized motor vehicle, typically without side windows in the rear part, for transporting goods." },
    { word: "whale", definition: "A very large marine mammal with a streamlined hairless body, a horizontal tail fin, and a blowhole on top of the head for breathing." },
    { word: "xylophone", definition: "A musical instrument played by striking a row of wooden bars of graduated length with one or more small wooden or plastic beaters." },
    { word: "yacht", definition: "A medium-sized sailboat equipped for cruising or racing." },
    { word: "zoo", definition: "An establishment which maintains a collection of wild animals, typically in a park or gardens, for study, conservation, or display to the public." },
    // Additional 74 words omitted for brevity
  ],

  Medium: [
    { word: "allegory", definition: "A story, poem, or picture that can be interpreted to reveal a hidden meaning, typically a moral or political one." },
    { word: "benevolent", definition: "Well meaning and kindly." },
    { word: "capricious", definition: "Given to sudden and unaccountable changes of mood or behavior." },
    { word: "deleterious", definition: "Causing harm or damage." },
    { word: "ephemeral", definition: "Lasting for a very short time." },
    { word: "facetious", definition: "Treating serious issues with deliberately inappropriate humor; flippant." },
    { word: "gregarious", definition: "Fond of company; sociable." },
    { word: "hubris", definition: "Excessive pride or self-confidence." },
    { word: "immutable", definition: "Unchanging over time or unable to be changed." },
    { word: "juxtapose", definition: "Place or deal with close together for contrasting effect." },
    { word: "kinetic", definition: "Relating to or resulting from motion." },
    { word: "laconic", definition: "Using very few words." },
    { word: "magnanimous", definition: "Generous or forgiving, especially towards a rival or less powerful person." },
    { word: "nefarious", definition: "Wicked or criminal." },
    { word: "obfuscate", definition: "Render obscure, unclear, or unintelligible." },
    { word: "paradigm", definition: "A typical example or pattern of something; a model." },
    { word: "quixotic", definition: "Exceedingly idealistic; unrealistic and impractical." },
    { word: "recalcitrant", definition: "Having an obstinately uncooperative attitude towards authority or discipline." },
    { word: "sagacity", definition: "The quality of being sagacious." },
    { word: "taciturn", definition: "Reserved or uncommunicative in speech; saying little." },
    { word: "ubiquitous", definition: "Present, appearing, or found everywhere." },
    { word: "venerable", definition: "Accorded a great deal of respect, especially because of age, wisdom, or character." },
    { word: "wanton", definition: "Deliberate and unprovoked." },
    { word: "xenophobia", definition: "Dislike of or prejudice against people from other countries." },
    { word: "yoke", definition: "A wooden crosspiece that is fastened over the necks of two animals and attached to the plow or cart that they are to pull." },
    { word: "zealot", definition: "A person who is fanatical and uncompromising in pursuit of their religious, political, or other ideals." },
    { word: "aberration", definition: "A departure from what is normal, usual, or expected, typically one that is unwelcome." },
    { word: "banal", definition: "So lacking in originality as to be obvious and boring." },
    { word: "calamity", definition: "An event causing great and often sudden damage or distress; a disaster." },
    { word: "daunting", definition: "Seeming difficult to deal with in anticipation; intimidating." },
    { word: "eclectic", definition: "Deriving ideas, style, or taste from a broad and diverse range of sources." },
    { word: "fallacy", definition: "A mistaken belief, especially one based on unsound argument." },
    { word: "garish", definition: "Obtrusively bright and showy; lurid." },
    { word: "haphazard", definition: "Lacking any obvious principle of organization." },
    { word: "iconoclast", definition: "A person who attacks cherished beliefs or institutions." },
    { word: "jovial", definition: "Cheerful and friendly." },
    { word: "knack", definition: "An acquired or natural skill at performing a task." },
    { word: "lithe", definition: "Thin, supple, and graceful." },
    { word: "meticulous", definition: "Showing great attention to detail; very careful and precise." },
    { word: "novice", definition: "A person new to or inexperienced in a field or situation." },
    { word: "ostracize", definition: "Exclude from a society or group." },
    { word: "plausible", definition: "Seeming reasonable or probable." },
    { word: "quandary", definition: "A state of perplexity or uncertainty over what to do in a difficult situation." },
    { word: "raucous", definition: "Making or constituting a disturbingly harsh and loud noise." },
    { word: "stoic", definition: "A person who can endure pain or hardship without showing their feelings or complaining." },
    { word: "transient", definition: "Lasting only for a short time; impermanent." },
    { word: "unfathomable", definition: "Incapable of being fully explored or understood." },
    { word: "verbose", definition: "Using or expressed in more words than are needed." },
    { word: "wistful", definition: "Having or showing a feeling of vague or regretful longing." },
    { word: "zealous", definition: "Having or showing zeal." },
    { word: "accolade", definition: "An award or privilege granted as a special honor or as an acknowledgment of merit." },
    { word: "brusque", definition: "Abrupt or offhand in speech or manner." },
    { word: "candid", definition: "Truthful and straightforward; frank." },
    { word: "deference", definition: "Humble submission and respect." },
    { word: "elusive", definition: "Difficult to find, catch, or achieve." },
    { word: "frivolous", definition: "Not having any serious purpose or value." },
    { word: "gratuitous", definition: "Uncalled for; lacking good reason; unwarranted." },
    { word: "harangue", definition: "A lengthy and aggressive speech." },
    { word: "immutable", definition: "Unchanging over time or unable to be changed." },
    { word: "judicious", definition: "Having, showing, or done with good judgment or sense." },
    { word: "kudos", definition: "Praise and honor received for an achievement." },
    { word: "lucid", definition: "Expressed clearly; easy to understand." },
    { word: "mundane", definition: "Lacking interest or excitement; dull." },
    { word: "nonchalant", definition: "Feeling or appearing casually calm and relaxed; not displaying anxiety, interest, or enthusiasm." },
    { word: "ostentatious", definition: "Characterized by vulgar or pretentious display; designed to impress or attract notice." },
    { word: "pragmatic", definition: "Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations." },
    { word: "quarantine", definition: "A state, period, or place of isolation in which people or animals that have arrived from elsewhere or been exposed to infectious or contagious disease are placed." },
    { word: "reverence", definition: "Deep respect for someone or something." },
    { word: "surreptitious", definition: "Kept secret, especially because it would not be approved of." },
    { word: "trepidation", definition: "A feeling of fear or agitation about something that may happen." },
    { word: "utilitarian", definition: "Designed to be useful or practical rather than attractive." },
    { word: "vindicate", definition: "Clear (someone) of blame or suspicion." },
    { word: "whimsical", definition: "Playfully quaint or fanciful, especially in an appealing and amusing way." },
    { word: "xenophile", definition: "An individual who is attracted to foreign peoples, cultures, or customs." },
    { word: "yearn", definition: "Have an intense feeling of longing for something, typically something that one has lost or been separated from." },
    { word: "zenith", definition: "The time at which something is most powerful or successful." },
    { word: "abate", definition: "Become less intense or widespread." },
    { word: "berate", definition: "Scold or criticize (someone) angrily." },
    { word: "cacophony", definition: "A harsh, discordant mixture of sounds." },
    { word: "diligent", definition: "Having or showing care and conscientiousness in one's work or duties." },
    { word: "elucidate", definition: "Make (something) clear; explain." },
    { word: "fervent", definition: "Having or displaying a passionate intensity." },
    { word: "gluttony", definition: "Habitual greed or excess in eating." },
    { word: "haughty", definition: "Arrogantly superior and disdainful." },
    { word: "impetuous", definition: "Acting or done quickly and without thought or care." },
    { word: "jocular", definition: "Fond of or characterized by joking; humorous or playful." },
    { word: "knell", definition: "The sound of a bell, especially when rung solemnly for a death or funeral." },
    { word: "lament", definition: "A passionate expression of grief or sorrow." },
    { word: "meticulous", definition: "Showing great attention to detail; very careful and precise." },
    { word: "novel", definition: "New or unusual in an interesting way." },
    { word: "opaque", definition: "Not able to be seen through; not transparent." },
    { word: "pallid", definition: "Pale, typically because of poor health." },
    { word: "quell", definition: "Put an end to (a rebellion or other disorder), typically by the use of force." },
    { word: "rancor", definition: "Bitterness or resentfulness, especially when long-standing." },
    { word: "salient", definition: "Most noticeable or important." },
    { word: "tangible", definition: "Perceptible by touch." },
    { word: "unilateral", definition: "Performed by or affecting only one person, group, or country involved in a particular situation, without the agreement of others." },
    { word: "verbose", definition: "Using or expressed in more words than are needed." },
    { word: "wary", definition: "Feeling or showing caution about possible dangers or problems." },
    { word: "xeric", definition: "Characterized by or adapted to a dry environment." },
    { word: "yield", definition: "Produce or provide (a natural, agricultural, or industrial product)." },
    { word: "zeal", definition: "Great energy or enthusiasm in pursuit of a cause or an objective." }
  ],

  Hard: [
    { word: "abrogate", definition: "Repeal or do away with (a law, right, or formal agreement)." },
    { word: "acumen", definition: "The ability to make good judgments and quick decisions, typically in a particular domain." },
    { word: "adumbrate", definition: "Report or represent in outline." },
    { word: "anathema", definition: "Something or someone that one vehemently dislikes." },
    { word: "antipathy", definition: "A deep-seated feeling of dislike; aversion." },
    { word: "apocryphal", definition: "Of doubtful authenticity, although widely circulated as being true." },
    { word: "approbation", definition: "Approval or praise." },
    { word: "arcane", definition: "Understood by few; mysterious or secret." },
    { word: "ascetic", definition: "Characterized by severe self-discipline and abstention from all forms of indulgence, typically for religious reasons." },
    { word: "assiduous", definition: "Showing great care and perseverance." },
    { word: "bellicose", definition: "Demonstrating aggression and willingness to fight." },
    { word: "calumny", definition: "The making of false and defamatory statements about someone in order to damage their reputation; slander." },
    { word: "capitulate", definition: "Cease to resist an opponent or an unwelcome demand; surrender." },
    { word: "clemency", definition: "Mercy; lenience." },
    { word: "cogent", definition: "Clear, logical, and convincing." },
    { word: "concomitant", definition: "Naturally accompanying or associated." },
    { word: "conflagration", definition: "An extensive fire that destroys a great deal of land or property." },
    { word: "contumacious", definition: "Stubbornly or willfully disobedient to authority." },
    { word: "cupidity", definition: "Greed for money or possessions." },
    { word: "debacle", definition: "A sudden and ignominious failure; a fiasco." },
    { word: "deleterious", definition: "Causing harm or damage." },
    { word: "demagogue", definition: "A political leader who seeks support by appealing to the desires and prejudices of ordinary people rather than by using rational argument." },
    { word: "diaphanous", definition: "Light, delicate, and translucent." },
    { word: "dissemble", definition: "Conceal one's true motives, feelings, or beliefs." },
    { word: "ebullient", definition: "Cheerful and full of energy." },
    { word: "egregious", definition: "Outstandingly bad; shocking." },
    { word: "enervate", definition: "Cause (someone) to feel drained of energy or vitality; weaken." },
    { word: "ephemeral", definition: "Lasting for a very short time." },
    { word: "equanimity", definition: "Mental calmness, composure, and evenness of temper, especially in a difficult situation." },
    { word: "evanescent", definition: "Soon passing out of sight, memory, or existence; quickly fading or disappearing." },
    { word: "excoriate", definition: "Criticize (someone) severely." },
    { word: "exigent", definition: "Pressing; demanding." },
    { word: "expurgate", definition: "Remove matter thought to be objectionable or unsuitable from (a book or account)." },
    { word: "extirpate", definition: "Root out and destroy completely." },
    { word: "fatuous", definition: "Silly and pointless." },
    { word: "feckless", definition: "Lacking initiative or strength of character; irresponsible." },
    { word: "fecund", definition: "Producing or capable of producing an abundance of offspring or new growth; fertile." },
    { word: "friable", definition: "Easily crumbled." },
    { word: "fulminate", definition: "Express vehement protest." },
    { word: "garrulous", definition: "Excessively talkative, especially on trivial matters." },
    { word: "grandiloquent", definition: "Pompous or extravagant in language, style, or manner, especially in a way that is intended to impress." },
    { word: "hapless", definition: "Unfortunate." },
    { word: "ignominious", definition: "Deserving or causing public disgrace or shame." },
    { word: "impecunious", definition: "Having little or no money." },
    { word: "impetuous", definition: "Acting or done quickly and without thought or care." },
    { word: "impugn", definition: "Dispute the truth, validity, or honesty of (a statement or motive); call into question." },
    { word: "inchoate", definition: "Just begun and so not fully formed or developed; rudimentary." },
    { word: "indefatigable", definition: "Persisting tirelessly." },
    { word: "inimical", definition: "Tending to obstruct or harm." },
    { word: "insouciant", definition: "Showing a casual lack of concern; indifferent." },
    { word: "intransigent", definition: "Unwilling or refusing to change one's views or to agree about something." },
    { word: "invective", definition: "Insulting, abusive, or highly critical language." },
    { word: "inveterate", definition: "Having a particular habit, activity, or interest that is long-established and unlikely to change." },
    { word: "jejune", definition: "Naive, simplistic, and superficial." },
    { word: "jingoism", definition: "Extreme patriotism, especially in the form of aggressive or warlike foreign policy." },
    { word: "laconic", definition: "Using very few words." },
    { word: "languid", definition: "Displaying or having a disinclination for physical exertion or effort; slow and relaxed." },
    { word: "licentious", definition: "Promiscuous and unprincipled in sexual matters." },
    { word: "limpid", definition: "Clear, transparent; readily understood." },
    { word: "magnanimous", definition: "Generous or forgiving, especially towards a rival or less powerful person." },
    { word: "malevolent", definition: "Having or showing a wish to do evil to others." },
    { word: "mendacious", definition: "Not telling the truth; lying." },
    { word: "meretricious", definition: "Apparently attractive but having in reality no value or integrity." },
    { word: "minatory", definition: "Expressing or conveying a threat." },
    { word: "misanthrope", definition: "A person who dislikes humankind and avoids human society." },
    { word: "miscreant", definition: "A person who behaves badly or in a way that breaks the law." },
    { word: "munificent", definition: "More generous than is usual or necessary." },
    { word: "nefarious", definition: "Wicked or criminal." },
    { word: "obdurate", definition: "Stubbornly refusing to change one's opinion or course of action." },
    { word: "obfuscate", definition: "Render obscure, unclear, or unintelligible." },
    { word: "obstreperous", definition: "Noisy and difficult to control." },
    { word: "odious", definition: "Extremely unpleasant; repulsive." },
    { word: "opprobrium", definition: "Harsh criticism or censure." },
    { word: "ossify", definition: "Cease developing; be stagnant or rigid." },
    { word: "palliate", definition: "Make (a disease or its symptoms) less severe or unpleasant without removing the cause." },
    { word: "panegyric", definition: "A public speech or published text in praise of someone or something." },
    { word: "parsimonious", definition: "Unwilling to spend money or use resources; stingy or frugal." },
    { word: "pellucid", definition: "Translucently clear." },
    { word: "penurious", definition: "Extremely poor; poverty-stricken." },
    { word: "perfidious", definition: "Deceitful and untrustworthy." },
    { word: "perfunctory", definition: "Carried out with a minimum of effort or reflection." },
    { word: "perspicacious", definition: "Having a ready insight into and understanding of things." },
    { word: "pertinacious", definition: "Holding firmly to an opinion or a course of action." },
    { word: "petulant", definition: "Childishly sulky or bad-tempered." },
    { word: "platitude", definition: "A remark or statement, especially one with a moral content, that has been used too often to be interesting or thoughtful." },
    { word: "plethora", definition: "A large or excessive amount of something." },
    { word: "prevaricate", definition: "Speak or act in an evasive way." },
    { word: "probity", definition: "The quality of having strong moral principles; honesty and decency." },
    { word: "proclivity", definition: "A tendency to choose or do something regularly; an inclination or predisposition towards a particular thing." },
    { word: "profligate", definition: "Recklessly extravagant or wasteful in the use of resources." },
    { word: "prosaic", definition: "Having the style or diction of prose; lacking poetic beauty." },
    { word: "puerile", definition: "Childishly silly and trivial." },
    { word: "pugnacious", definition: "Eager or quick to argue, quarrel, or fight." },
    { word: "pulchritude", definition: "Beauty." },
    { word: "querulous", definition: "Complaining in a petulant or whining manner." },
    { word: "quixotic", definition: "Exceedingly idealistic; unrealistic and impractical." },
    { word: "recalcitrant", definition: "Having an obstinately uncooperative attitude towards authority or discipline." },
    { word: "redoubtable", definition: "Formidable, especially as an opponent." },
    { word: "reprobate", definition: "An unprincipled person (often used humorously or affectionately)." },
    { word: "ribald", definition: "Referring to sexual matters in an amusingly rude or irreverent way." },
    { word: "sagacious", definition: "Having or showing keen mental discernment and good judgment; shrewd." },
    { word: "salubrious", definition: "Health-giving; healthy." },
    { word: "sanguine", definition: "Optimistic or positive, especially in an apparently bad or difficult situation." },
    { word: "saturnine", definition: "Slow and gloomy." },
    { word: "sedulous", definition: "Showing dedication and diligence." },
    { word: "solicitous", definition: "Characterized by or showing interest or concern." },
    { word: "spurious", definition: "Not being what it purports to be; false or fake." },
    { word: "stentorian", definition: "Loud and powerful." },
    { word: "stolid", definition: "Calm, dependable, and showing little emotion or animation." },
    { word: "supercilious", definition: "Behaving or looking as though one thinks one is superior to others." },
    { word: "surfeit", definition: "An excessive amount of something." },
    { word: "taciturn", definition: "Reserved or uncommunicative in speech; saying little." },
    { word: "tantamount", definition: "Equivalent in seriousness to; virtually the same as." },
    { word: "trenchant", definition: "Vigorous or incisive in expression or style." },
    { word: "truculent", definition: "Eager or quick to argue or fight; aggressively defiant." },
    { word: "turgid", definition: "Swollen and distended or congested." },
    { word: "turpitude", definition: "Depravity; wickedness." },
    { word: "ubiquitous", definition: "Present, appearing, or found everywhere." },
    { word: "umbrage", definition: "Offense or annoyance." },
    { word: "unctuous", definition: "Excessively or ingratiatingly flattering; oily." },
    { word: "vapid", definition: "Offering nothing that is stimulating or challenging." },
    { word: "veracity", definition: "Conformity to facts; accuracy." },
    { word: "verisimilitude", definition: "The appearance of being true or real." },
    { word: "vituperate", definition: "Blame or insult (someone) in strong or violent language." },
    { word: "wheedle", definition: "Use flattery or coaxing in order to persuade someone to do something or give one something." },
    { word: "winsome", definition: "Attractive or appealing in appearance or character." },
    { word: "zealous", definition: "Having or showing zeal." }
  ],
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";
let chosenDefinition = "";

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
    button.disabled = true;
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
  let randomWordObject = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = randomWordObject.word.toUpperCase();
  chosenDefinition = randomWordObject.definition;

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
          showDefinitionPopup(chosenWord, chosenDefinition, true);
          currentStreak++;
          highestScore = Math.max(highestScore, currentStreak);
          document.getElementById('streak').innerText = `Current Streak: ${currentStreak}`;
        }
      }
    });
  } else {
    count += 1;
    drawMan(count);
    if (count == 6) {
      resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
      blocker();
      showDefinitionPopup(chosenWord, chosenDefinition, false);
      currentStreak = 0;
     document.getElementById('streak').innerText = `Current Streak: ${currentStreak}`;
    }
  }
  this.disabled = true;
}

function showDefinitionPopup(word, definition, isWin) {
  const color = isWin ? "green" : "red";
  const newListItem = document.createElement("li");
  newListItem.innerHTML = `<strong style="color: ${color};">${word}</strong>: ${definition}`;
  correctWordsList.appendChild(newListItem);
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
