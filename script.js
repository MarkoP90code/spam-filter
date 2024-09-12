

//1.
const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");

//2.
checkMessageButton.addEventListener("click", () => {
    if (messageInput.value === "") {
        alert("Please enter a message.");
        return;         //Ovde stavim return da bi blokirao da se kod izvrsava dalje ako je ovaj if uslov zadovoljen.
      }
      result.textContent = isSpam(messageInput.value) ? "Oh no! This looks like a spam message." : "This message does not seem to contain any spam.";       // Radi i ovako samo ovo sto smo uradili je lepse. isSpam(messageInput.value) ? result.textContent = "Oh no! This looks like a spam message." : result.textContent = "This message does not seem to contain any spam.";

      messageInput.value = "";

    });

//3.
const isSpam = (msg) => denyList.some(regex => regex.test(msg));            //* ispod        A ovo desno sam ostavim jer objasni match() i test()  const isSpam = (msg) => msg.match(helpRegex); Ovde ako nadje neki match onda je taj string rezultat funkcije, a ako ne nadje nista vraca null. A u ovom sledecem slucaju testira da li postoji odredjeni substring unutar stringa i ako postoji rezultat je true, a ako ne postoji onda je false.


//4. 
const helpRegex = /please help|assist me/i;             //trazi "please help" ili "assist me".
const dollarRegex = /[0-9]+ (?:hundred|thousand|million|billion)? dollars/i;               //** ispod.
const freeRegex = /(?:\s|^)fr[e3][e3] m[o0]n[e3]y(?:\s|$)/i;       //*** ispod.
const stockRegex = /(?:\s|^)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:\s|$)/i;       //e3 i o0 sam objasnio. ovde imam s5, t7, a@4, c{[(.
const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;         //Ovde je novo i1|.


//5.
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];


// *
// .some() IMA NA GOOGLU. Ako bar jedna vrednost zadovoljava callback funkciju vraca true.
// regex => regex.test(msg).
// U prvoj iteraciji regex uzuma prvi clan denyList-e i onda to testira na msg i vraca true ili false.
// To radi redom za svaki clan array-a, ali prvi put kad vrati true tu se zaustavlja jer some() proverava 
// da li je bar jedan element vraio true. To onda znaci je isSpam(msg) true.


// **
// trazi broj ("+" zaci jednu ili vise. Znaci trazi broj od od 1 do 9 jednom ili vise puta. znaci naci ce 9 i 99 i 999) pa onda RAZMAK pa rec hundred ili thousand ili million ili billion pa onda RAZMAK pa onda rec dollars.
// /[0-9]+ (?:hundred|thousand|million|billion)? dollars/i
// [0-9]                                   -trazi broj od 1 do 9.
// [0-9]+                                  -trazi broj od 1 do 9 ali jednom ili vise puta (to je "+"). znaci trazi 2, 22, 454, 2235 itd.
// pa onda trazi RAZMAK
// hundred|thousand|million|billion        -trazi rec hundred ili thousand ili million ili billion. 
// (hundred|thousand|million|billion)      -ovde zagrade "()" prave capturing group. 
//                                          AKO NE STAVIM ZAGRADE NECE RADITI KAKO TREBA. NPR /[0-9]+ hundred|thousand|million|billion dollars/i 
//                                          CE DA NADJE [0-9]+ hundred ili thousand ili million ili billion dollars, a to ovde ne zelimo. Step 18. - A capture group is a way to define a part of the expression that should be captured and saved for later reference. You can define a capture group by wrapping a part of your expression in parentheses. For example, /h(i|ey) camper/ would match either hi camper or hey camper, and would capture i or ey in a group. Turn your place values into a capture group.
// (?:hundred|thousand|million|billion)    -kad stavim "?:" posle "(" pravim non capturing group. Tako i dalje grupisem clanove ali ih ne pamti za posle.  Step 20. -One last thing with this expression. You dont actually need the match value from your capture group, so you can turn it into a non-capturing group. This will allow you to group the characters together without preserving the result. To create a non-capturing group in a regular expression, you can add ?: after the opening parenthesis of a group. For instance, (?:a|b) will match either a or b, but it will not capture the result. Update your regular expression to use a non-capturing group.
// pa onda trazi RAZMAK
// ?                                       -Step 19. - Now that you have your capture group, you can mark the entire pattern as an optional match. The ? quantifier matches zero or one occurrence of the preceding character or group. For example, the regular expression /colou?r/ matches both color and colour, because the u is optional. Mark your capture group as optional.
// dollars                                 -trazi rec dollars.
// /i                                      -case insensitive.



// ***
// /(?:\s|^)fr[e3][e3] m[o0]n[e3]y(?:\s|$)/i;
// (?:\s|^)                                -ovaj deo (?:) je non capturing group (to sam iznad objasnio). 
//                                         -ovaj deo \s|^ ovaj deo trazi ili razmak ili da moj pattern match bude pocetak stringa.
//                                         Ovo radim jer mi ne treba da nadje "free money" npr u ovom slucaju "hands-free money management".
//                                         Da sam samo ovo uradio /\sfr[e3][e3] m[o0]n[e3]y\s/i; ond nea bi pronalazio
//                                         "free money" nego samo " free money ". A posto sam dodao "^" onda matchuje string ako je matching pattern pocetak stringa.  Step 26. - If you try entering the message free money, you'll notice it doesn't match your expression! This is because \s doesn't match the beginning or end of the text. To match the beginning of the text, you can use the ^ anchor. This asserts that your pattern match starts at the beginning of the full string. Replace your first \s character with a non-capturing group that matches \s or ^.
//                                         -ovaj deo (?:\s|$)  metchuje razmak ili kraj stringa.
//                                         Tako da ce sad ceo izraz da matchuje i ovo "free money" i ovo " free money" i ovo "free money " i ovo " free money ". Ovde sam za "e" i "o" objasnio.