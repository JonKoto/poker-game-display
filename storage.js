// --- Password ---
const APP_PASSWORD = "kotolegacypoker!@#";

function checkAuth() {
  if (sessionStorage.getItem("poker_auth") === "1") return true;
  return false;
}

function showAuthGate() {
  if (checkAuth()) return;
  const overlay = document.createElement("div");
  overlay.id = "auth-gate";
  overlay.style.cssText = "position:fixed;inset:0;z-index:9999;background:#1a1a2e;display:flex;align-items:center;justify-content:center;";
  overlay.innerHTML = `
    <div style="text-align:center;padding:20px;">
      <div style="font-size:20px;font-weight:700;color:#fff;margin-bottom:16px;">Enter Password</div>
      <input type="password" id="auth-input" placeholder="Password" style="width:260px;padding:14px 16px;background:#2a2a4a;border:2px solid #444;border-radius:12px;color:#e0e0e0;font-size:18px;font-family:inherit;outline:none;text-align:center;">
      <div id="auth-error" style="color:#e94560;font-size:14px;margin-top:8px;opacity:0;">Wrong password</div>
    </div>
  `;
  document.body.appendChild(overlay);
  const input = document.getElementById("auth-input");
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      if (input.value === APP_PASSWORD) {
        sessionStorage.setItem("poker_auth", "1");
        overlay.remove();
      } else {
        document.getElementById("auth-error").style.opacity = "1";
        input.value = "";
      }
    }
  });
  setTimeout(() => input.focus(), 100);
}

// --- Storage Keys ---
const KEYS = {
  state: "poker_state",
  games: "poker_games",
  qualifiers: "poker_qualifiers",
  boards: "poker_boards",
  sounds: "poker_sounds"
};

// --- Defaults ---
const DEFAULTS = {
  state: { game: "", qualifier: "", boards: "", notes: "" },

  games: [
    "Omaha",
    "Big O",
    "Holdem",
    "Pineapple",
    "Crazy Pineapple",
    "Herb-aha",
    "Boardman"
  ],

  qualifiers: [
    "No Qualifier",
    "7 or Better",
    "8 or Better",
    "9 or Better",
    "High Only",
    "High on Top, Low on Bottom",
    "Jill-Son"
  ],

  boards: ["1", "2", "3", "Bomb Pot"],

  sounds: [
    {
      "label": "Hurry up, Andy",
      "phrases": [
        "Andy, hurry the fuck up.",
        "Andy, you stupid bitch, hurry up.",
        "Andy, I swear to God, if you don't act right now I'm going to reach across this table and fold your cards into your throat.",
        "Hey Andy, did your brain shit itself again or are you always this fucking useless?",
        "Andy, my grandma makes faster decisions and she's been dead for twelve years, you absolute walnut.",
        "For fuck's sake Andy, it's a pair of fours, not the goddamn nuclear launch codes.",
        "Andy, you mouth-breathing dipshit, it's been five minutes. FIVE.",
        "Andy, I've had kidney stones pass faster than you make a fucking decision.",
        "Andy, you play poker like a dog trying to do algebra. Just fucking fold.",
        "Hey Andy, quick question: are you having a stroke or is this just your personality?",
        "Andy, hurry the fuck up before I grow old and die at this table, you glacial piece of shit.",
        "Andy, the combined IQ of your two cards is higher than yours. Act faster.",
        "Andy, you dense motherfucker, it's check or fold. Those are your only options. Pick one before I pick your chair up and throw it.",
        "Andy. ANDY. Jesus Christ, Andy, did you just flatline? Should I call 911 or just deal around you?",
        "Andy, you donkey-brained son of a bitch, we've been waiting so long my beer evolved into wine.",
        "Andy, every second you waste is a second I fantasize about flipping this table onto your stupid fucking face.",
        "Hey Andy, I didn't realize we were playing Stare at Your Cards Like a Confused Labrador. My bad.",
        "Andy, you absolute fucking potato, MAKE A DECISION.",
        "Andy, if stupidity burned calories you'd be shredded by now. Fold, you dumb bastard.",
        "Andy, I hope your cards are worth it because your friendship sure as shit isn't right now.",
        "Andy, you slack-jawed fuck, my unborn children will be dead of old age before you act.",
        "Andy, you useless sack of shit, even Helen Keller would've folded by now.",
        "Andy, quit fondling your cards like it's the first time anyone's ever touched you and MAKE A FUCKING MOVE.",
        "Andy, I will personally shove that deck so far up your ass you'll be coughing up aces if you don't hurry the fuck up.",
        "Andy, you brain-dead goldfish, you looked at these same two cards nine seconds ago. Nothing changed. FOLD.",
        "Andy, you're so goddamn slow that continental drift just lapped you. Twice.",
        "Andy, you dumb bitch, I've seen faster decision-making at a retirement home lunch buffet.",
        "Andy, hurry up you stupid fuck, I want to lose my money to someone ELSE for a change.",
        "Andy, if your poker speed matched your eating speed we'd be done by now, you greedy bastard.",
        "Andy, you fucking troglodyte, cavemen made faster decisions and they were being chased by bears.",
        "Andy, act now or I swear on my mother's life I'm never inviting your slow ass back.",
        "Andy, you absolute shitstain on the underwear of poker, HURRY. UP.",
        "Andy, I could fly to Vegas, play a full tournament, fly back, and you'd still be staring at a 7-2 offsuit like it owes you money.",
        "Andy, you smooth-brained fuck, the cards aren't going to whisper the answer to you. FOLD.",
        "Andy, you're the human equivalent of a please wait screen and I want to throw you out a window.",
        "Andy, every time it's your turn, a little part of my soul dies. I'm running out of soul, Andy.",
        "Andy, hurry the fuck up, you overcooked piece of spaghetti.",
        "Andy, you dumb shit, I've seen smarter plays from a fucking Roomba.",
        "Andy, your two brain cells are clearly in a fistfight right now. Let me help: FOLD, you jackass.",
        "Andy, you weapons-grade moron, the pot is six dollars. You're not deciding the fate of nations.",
        "Andy, I'd call you a tool but at least tools are fucking useful. Make a decision.",
        "Andy, did your parents have any children that weren't catastrophically slow? Asking for the whole table.",
        "Andy, you constipated fuck, just push it out. Call or fold. PUSH.",
        "Andy, my therapist is going to hear about you. She already has. She hates you too.",
        "Andy, you dick, I had hair when this hand started.",
        "Andy, if I waterboarded you with information about your own cards, would you act faster? Because I'm considering it.",
        "Andy, you absolute cum dumpster of wasted time, THE CLOCK IS TICKING.",
        "Andy, every time you tank for five minutes on a $2 bet, God kills a kitten. You monster.",
        "Andy, you thundering dipshit, I've seen quadriplegics move faster.",
        "Andy, you limp-dicked waste of a poker seat, FOLD OR BET. Those are the only two things in the universe right now.",
        "Andy, hurry the fuck up. I'd rather watch my parents have sex than watch you think.",
        "Andy, you cock-juggling thundercunt, it's. Your. Fucking. Turn.",
        "Andy, if I wanted to spend my Friday night watching someone stare blankly, I'd go to the fucking zoo.",
        "Andy, you catastrophic asshole, I'm aging in dog years over here.",
        "Andy, you stupid son of a bitch, even a Magic 8-Ball makes decisions faster and it's a plastic toy filled with blue water.",
        "Andy, put down the cards and step away from the table if you can't handle this level of complexity, you magnificent dumbass.",
        "Andy, you're so fucking slow that NASA could use your turn as a unit of measurement for deep space travel.",
        "Andy, my divorce was faster than this, and that bitch fought for EVERYTHING.",
        "Andy, I've shit faster than you think, and I have IBS, you infuriating prick.",
        "Andy, you empty-headed fuck, somewhere out there a village is missing its idiot and WE FOUND HIM.",
        "Andy, act right now or I'm telling everyone about that thing you did in Daytona.",
        "Andy, you colossal waste of oxygen, I've seen coma patients with more urgency.",
        "Andy, hurry the fuck up, you inbred calculator. Even a broken abacus is faster.",
        "Andy, you four-flushing fuckwit, THE FLOP WAS TEN MINUTES AGO. WE'RE ON THE RIVER OF NO RETURN.",
        "Andy, if your dick worked as slow as your brain, your wife would've left you years ago. Oh wait.",
        "Andy, I'm going to name my next hemorrhoid after you because you're a massive pain in my ass that won't go away.",
        "Andy, you gelatinous turd, I'm watching my life flash before my eyes and it's just you... thinking... forever.",
        "Andy, you knuckle-dragging fuckstick, even evolution skipped you and it takes MILLIONS OF YEARS.",
        "Andy, you window-licking shit goblin, MAKE A GODDAMN DECISION.",
        "Andy, hurry up before I call your mother and tell her she raised a fucking traffic cone.",
        "Andy, you sentient speed bump, I could've gotten a vasectomy AND recovered in the time you've taken.",
        "Andy, you dumb motherfucker, I've seen faster movement from a corpse. In a coffin. Underground.",
        "Andy, fold your cards or I'll fold you in half, you insufferable cock.",
        "Andy, you're proof that God has a sense of humor and absolutely zero quality control.",
        "Andy, you constipated walrus, shit or get off the pot. Literally. Fold.",
        "Andy, I'd trade you for a fucking house plant right now. At least it grows.",
        "Andy, you stupid bitch, if I had a dollar for every second you've wasted, I wouldn't need to win this pot.",
        "Andy, you wheezing sack of dicks, I've had faster responses from my dead email inbox.",
        "Andy, I'm starting to think you can't read, and honestly that would explain a lot.",
        "Andy, you miserable piss-drinking fuck nugget, THE TABLE IS WAITING.",
        "Andy, God gave you a brain and you're using it as a fucking paperweight.",
        "Andy, hurry the fuck up. My will to live has a 30-second timer and you just ran it out.",
        "Andy, you're the reason the gene pool needs a lifeguard. Now fold.",
        "Andy, you absolute oxygen thief, if your cards could talk they'd be SCREAMING at you to fold.",
        "Andy, you crusty ballsack of indecision, we have been waiting since the birth of Christ.",
        "Andy, play your fucking hand before I play it for you by shoving your cards up your ass sideways.",
        "Andy, you weapons-grade fuckweasel, I could train a chimp to play faster. I could train a DEAD chimp.",
        "Andy, hurry up you stupid prick, I've seen tectonic plates shift with more fucking purpose.",
        "Andy, you drooling cock-socket, your cards aren't a love letter. Stop reading them over and over.",
        "Andy, I didn't think it was possible to be this fucking bad at a game where half the strategy is QUITTING, and yet here you are.",
        "Andy, if I shoved a lump of coal up your ass, it wouldn't become a diamond because there's NO FUCKING PRESSURE. HURRY UP.",
        "Andy, you witless cum stain, I am BEGGING you on my HANDS AND KNEES to make a decision.",
        "Andy, you useless flesh mannequin, do you need me to draw you a fucking flowchart? Cards bad, fold. Cards good, bet. DONE.",
        "Andy, hurry up, you human dial tone. Everyone else has disconnected.",
        "Andy, you stupid bitch, I've ghostwritten my own obituary waiting for this call. Cause of death: you.",
        "Andy, you dripping infected cock blister, if you take one more minute I am LEAVING and taking the chips with me.",
        "Andy, you paste-eating fuckhead, I wouldn't trust you to make a decision at a stop sign, let alone a poker table.",
        "Andy, hurry the fuck up or I'm shuffling your ass into the discard pile where you belong.",
        "Andy, you're the worst thing to happen to poker since poker happened. Make a fucking move.",
        "Andy, you beautiful stupid son of a bitch, I love you, but if you don't fold right now I will END you. Emotionally. And maybe physically. FOLD."
      ]
    },
    {
      "label": "Dennis, pick a game",
      "phrases": [
        "Dennis, pick a fucking game. It's dealer's choice, not dealer's existential crisis.",
        "Dennis, you stupid bitch, you've known this was coming for the entire orbit. How are you STILL not ready?",
        "Dennis, it's dealer's choice, not dealer's umm hold on let me think about it for nine fucking minutes. NAME A GAME.",
        "Dennis, you indecisive fuck, there are like six options. Texas Hold 'Em. Omaha. Stud. Pick one before I stud YOU in the face.",
        "Dennis, every single round this happens. The deal comes to you and your brain just shuts the fuck off like a power outage. NAME. A. GAME.",
        "Dennis, you dense motherfucker, you had an ENTIRE ORBIT to think about this. What were you doing? Staring at your chips like a brain-dead hamster?",
        "Dennis, say Hold 'Em or Omaha. Those are two words each. You've been sitting there longer than it takes to say both. REPEATEDLY.",
        "Dennis, hurry the fuck up and pick a game before I pick one for you. It's called 52 Card Pickup Because I Threw the Deck at Dennis's Stupid Face.",
        "Dennis, you slack-jawed dipshit, you act like you just invented poker every time it's your deal. You didn't. Pick a game we already know.",
        "Dennis, you absolute cock, don't you DARE say umm one more time. Your mouth opens, a game name comes out. That's how this works.",
        "Dennis, if you say I don't know, what do you guys want to play? when it's literally YOUR CHOICE, I will flip this table into your lap, you deflecting piece of shit.",
        "Dennis, you weapons-grade fuckwit, the deal rotates. It comes to you every single round. And every single round you look at us like it's a fucking SURPRISE. It's not, Dennis. Prepare.",
        "Dennis, you overthinking sack of shit, it's not the NFL Draft. You're not trading picks. Say a game. Say it NOW.",
        "Dennis, you dithering cock, I've watched the deal go around this table four times and every time it hits you we lose five minutes of our lives. That's TWENTY MINUTES of my life you've stolen, you time-thieving bastard.",
        "Dennis, pick a goddamn game. I don't care if it's Go Fish at this point. Literally anything is better than watching your two brain cells play rock-paper-scissors.",
        "Dennis, you fucking disaster, you've been the dealer for 90 seconds and haven't said a single word. Are you choosing a poker variant or processing grief?",
        "Dennis, for the love of Christ, the cards are in your hands. Pick a game and deal them before those cards decompose.",
        "Dennis, you knuckle-dragging fuckstick, it's not a life-altering decision. Nobody gives a shit what we play. JUST PICK ONE.",
        "Dennis, you stupid son of a bitch, we all picked our games in two seconds. TWO SECONDS. You've been sitting there so long your deal should've expired.",
        "Dennis, hurry the fuck up. My suggested game is called Skip Dennis's Deal Because He Can't Handle Basic Fucking Responsibilities.",
        "Dennis, you drooling waste of a poker seat, just say the first poker game that enters your head. Oh wait, that requires something to BE in your head. My mistake.",
        "Dennis, you constipated fuck, I can physically SEE you cycling through games and rejecting all of them. This isn't a wine list. PICK SOMETHING.",
        "Dennis, every time it's your deal the whole table ages a year. I started this game at 35. I'm now eligible for Social Security. Thanks, asshole.",
        "Dennis, you catastrophic dipshit, I'll make it easy for you: Hold 'Em or Omaha. That's TWO choices. A fucking toddler can handle two choices. BE BETTER THAN A TODDLER, DENNIS.",
        "Dennis, you thundering cock-juggling waste of dealer position, I propose a new house rule: Dennis doesn't get dealer's choice. Dennis gets dealer's we pick for you because you're fucking useless.",
        "Dennis, you useless bitch, the button coming to you is the worst part of everyone's night. Not losing money. Not bad beats. YOUR DEAL. That's how bad this is.",
        "Dennis, it's been so long the cards in your hand are now a vintage collectible. PICK A GAME AND DEAL THEM.",
        "Dennis, you magnificent dumbass, I'm going to make you a laminated cheat sheet with six games on it. When it's your deal, close your eyes and point. Literally cannot be slower than what you do now.",
        "Dennis, you absolute fucking anchor, the deal hit you and the entire table's momentum just died. You are the speed bump of poker. You are the human rain delay. PICK A GAME.",
        "Dennis, you stupid indecisive son of a bitch, if you don't name a game in the next three seconds I'm revoking your dealer's choice privileges PERMANENTLY and you will play whatever the fuck we tell you for the rest of your life. THREE... TWO..."
      ]
    },
    {
      "label": "Stop asking for the game",
      "phrases": [
        "It's on the iPad, you illiterate fuck.",
        "Check the iPad, dipshit. That's literally why it's there.",
        "I'm not your fucking secretary. The iPad is RIGHT THERE. Use your eyes.",
        "Oh I'm sorry, did the giant glowing screen in the middle of the room not catch your attention, you blind bastard?",
        "The iPad, motherfucker. DO YOU SEE IT?",
        "Hey genius, see that rectangular piece of technology sitting right fucking there? It has every answer you just wasted my time asking for. It's called an iPad. Look at it.",
        "I didn't spend money on an iPad so you could walk in and ask me the same goddamn question every single week like a goldfish with amnesia. LOOK. AT. THE. IPAD.",
        "The iPad is literally three feet from your face. If it were a snake it would've bit you, you oblivious sack of shit.",
        "What game are we playing? Great question. You know what has a great answer? THE FUCKING IPAD.",
        "Read the iPad or I'm throwing it at your head. Either way, you'll get the information.",
        "The iPad exists for exactly this question, you dense motherfucker. Go introduce yourself to it.",
        "Every week. EVERY WEEK you ask me this. And every week the iPad is sitting there with the answer like a faithful dog you keep ignoring. Look at the goddamn iPad.",
        "Do I look like Siri to you? Check the iPad, you lazy piece of shit.",
        "The iPad has the game. The iPad has ALWAYS had the game. The iPad will ALWAYS have the game. LOOK AT THE IPAD.",
        "Bro, if you can find your way to the fridge for another beer, you can find your way to the iPad. It's closer.",
        "I put it on the iPad specifically so I wouldn't have to talk to you about this. Please respect the system, you beautiful dumbass.",
        "What game are we playing? I don't know, what does the iPad say? Go fucking look. I'll wait. Actually no I won't because IT TAKES TWO SECONDS.",
        "The information is on the iPad. I am not the iPad. Please redirect your stupid fucking question to the appropriate device.",
        "Oh, you want to know the game? Let me check... oh wait, I ALREADY PUT IT ON THE IPAD SO I WOULDN'T HAVE TO DO THIS.",
        "Hey, see that iPad? It's not decoration. It's not a coaster. It's not a fucking art piece. It has the game on it. Go look at it before I lose my shit.",
        "Asking me what game we're playing when the iPad is right there is like asking a stranger for directions while holding a GPS. Look at the screen, you absolute weapon.",
        "The iPad, you cock. THE IPAD. I will tattoo this on my forehead if it helps.",
        "I swear to God, the next person who asks me what game we're playing instead of looking at the iPad is dealing every hand for the rest of the night.",
        "What game are we playing? Fantastic. Walk three steps to your left. Look down. See that flat glowing thing? No, not your phone, the OTHER flat glowing thing. Read it. Congratulations, you stupid bitch, you just answered your own question.",
        "Brother, I set up the iPad so my mouth could take the night off. Let it do its fucking job.",
        "If you ask me the game one more time instead of checking the iPad, I'm changing the Wi-Fi password and not telling you, you helpless fuck.",
        "The iPad is the oracle. I am not the oracle. Consult the oracle, you braindead knob.",
        "I will buy a second iPad. I will buy a THIRD iPad. I will wallpaper this entire fucking room in iPads if that's what it takes for you to stop asking me and just LOOK.",
        "What are we playing? I don't know, man, if only there was some kind of device, maybe a TABLET, sitting RIGHT THERE with that exact information on it. Oh wait. THERE FUCKING IS.",
        "The next person who asks me what game we're playing instead of checking the iPad gets their chair taken away. You can stand and think about what you've done while you READ THE GODDAMN IPAD."
      ]
    },
    {
      "label": "Rebuying",
      "phrases": [
        "Oh look, another rebuy. At this point just set your wallet on fire, it's faster.",
        "Welcome back, you dumb bitch. The table missed your money. Not you. Your money.",
        "Rebuying AGAIN? Bro, this isn't a subscription service. You can cancel anytime.",
        "Hey everyone, he's rebuying! That's not a poker strategy, that's a fucking cry for help.",
        "You rebuy more than you breathe. At least breathing is free, you stupid bastard.",
        "Congratulations on your rebuy. Your chips have a shorter lifespan than a fruit fly, you absolute hemorrhage of cash.",
        "Another rebuy? At this rate your kids aren't going to college. They're funding OUR college.",
        "Dude, rebuying again? Just Venmo us directly and skip the middleman. The middleman being your dogshit poker skills.",
        "Welcome back to the game you stupid fuck. Your last stack lasted what, eleven minutes? I've had sneezes with more longevity.",
        "Oh, a rebuy! I love this part. It's like watching someone touch a hot stove, scream, and then TOUCH IT AGAIN.",
        "How many rebuys is that now? I lost count around the time you lost your dignity.",
        "Another rebuy? Bro, your wallet is like a clown car. I don't know how money keeps coming out of that thing but I'm entertained as fuck.",
        "Rebuying again, huh? Your poker game is basically a charity and we're all grateful recipients, you generous dumbass.",
        "You rebuy so often the chips know your fucking name. Oh hey, it's this idiot again. See you in ten minutes.",
        "Another rebuy? At this point just leave your credit card on the table and we'll swipe it every fifteen minutes. Same result.",
        "Bro's rebuying like it's a fucking hobby. Some people collect stamps. You collect losses.",
        "Welcome back, ATM. I mean... buddy. No, I meant ATM.",
        "You've rebuought so many times tonight I'm genuinely worried about your financial wellbeing. Just kidding. Give me your money, you stupid bitch.",
        "Another rebuy? Your stack evaporates faster than my respect for your poker skills, and that shit was already at zero.",
        "Rebuying AGAIN? Dude, at some point this stops being poker and starts being a GoFundMe for the rest of us.",
        "Hey look, it's Rebuy Rick over here. Except your name isn't Rick, it's just Fucking Embarrassing.",
        "You've spent more on rebuys tonight than most people spend on rent. And you have less to show for it.",
        "Another rebuy? Bro, the house doesn't even take a cut and you're STILL the biggest loser at this table. That takes talent.",
        "Rebuying? Again? At this point I feel like I should offer you a rewards card. Buy nine rebuys, get the tenth free, you degenerate fuck.",
        "Welcome back, dipshit. Your chips missed you. Actually no they didn't, they're sitting in front of ME now and they're very happy here.",
        "You rebuy more often than I check my phone, and I have a fucking problem.",
        "Another rebuy. You know what, I respect it. It takes a special kind of stupid to keep throwing money at something you're this bad at. And you, my friend, are VERY special.",
        "Bro just handed over another rebuy like it was nothing. That's not confidence, that's brain damage.",
        "Rebuying again? At this rate we should name a chair after you. The Rebuy Seat. It comes with a built-in ATM and a box of tissues.",
        "Oh you're rebuying? Shocking. Absolutely shocking. I am STUNNED. This is my stunned face. Now give me your fucking money."
      ]
    },
    {
      "label": "Your wine sucks",
      "phrases": [
        "What the fuck is this, grape-flavored sadness? This wine is terrible.",
        "Bro, did you buy this wine or find it behind a gas station dumpster? Be honest.",
        "This wine tastes like someone squeezed a grape into a puddle and said good enough.",
        "Where did you get this wine? And more importantly, why do you hate us?",
        "This wine is so bad I'd rather drink the water we use to rinse the cards. At least that has some flavor from Dorito fingers.",
        "Dude, this wine tastes like it was made by someone who had wine described to them but never actually tasted it.",
        "I've had communion wine with more complexity than this dogshit you brought.",
        "This isn't wine. This is what happens when you leave Kool-Aid in the sun for six months and bottle it with a grudge.",
        "Bro, this wine is so cheap the grapes are embarrassed. They died for THIS?",
        "I took one sip of this wine and my taste buds filed a restraining order.",
        "This wine pairs beautifully with regret and poor life decisions. Which is fitting, because you brought it.",
        "Did you stomp these grapes yourself? With dirty feet? In a porta-potty? Because that's what this tastes like.",
        "I'm not saying your wine is bad, but I just watched a guy pour it out and he was drinking Natural Light all night. Even HE has standards.",
        "This wine tastes like it was aged for fifteen minutes in a shoe.",
        "Bro, I've had better wine at a hospital. And they don't serve wine at hospitals. That's how bad this is. My brain invented a better memory.",
        "This wine is so fucking bad it makes my beer taste like champagne. Thank you for that, I guess.",
        "Where'd you get this, the Wines That Should Be Crimes section? Bottom shelf? Under the shelf? In the fucking floor?",
        "I'd rather drink bong water. At least bong water has a story behind it.",
        "This wine is the liquid equivalent of getting punched in the mouth by a grape farmer who hates his job.",
        "Bro brought over wine that tastes like a melted candle fucked a cough drop. What IS this?",
        "This wine is so bad even the bottle looks ashamed. Look at it. It knows.",
        "I've tasted better fermentation in a forgotten lunchbox, you cheap bastard.",
        "Did this wine come with a warning label? Because it should. CAUTION: May cause disappointment, nausea, and the sudden urge to question your friendships.",
        "This is the kind of wine they serve in hell. Not even the cool part of hell. The DMV part of hell.",
        "Bro, this wine costs less than a gallon of gas and somehow has WORSE mileage. One sip and I'm done.",
        "I took a sip, and my body immediately tried to return it. My throat said no. My stomach said absolutely not. My soul left.",
        "This wine is proof that just because you CAN make alcohol out of something doesn't mean you SHOULD.",
        "You brought this wine like you were proud of it, which honestly is the most offensive part. The taste is second. But it's a CLOSE second.",
        "I wouldn't cook with this wine. I wouldn't clean with this wine. I wouldn't use this wine to put out a fire because the fire deserves better.",
        "This wine is so unbelievably terrible that I'm going to keep drinking it out of pure spite. Cheers, you cheap son of a bitch."
      ]
    }
  ]
};

// --- Helper Functions ---
function loadData(key) {
  try {
    const raw = localStorage.getItem(KEYS[key]);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULTS[key]));
}

function saveData(key, val) {
  localStorage.setItem(KEYS[key], JSON.stringify(val));
}

// --- Auto-initialization ---
Object.keys(KEYS).forEach(key => {
  if (!localStorage.getItem(KEYS[key])) {
    saveData(key, DEFAULTS[key]);
  }
});
