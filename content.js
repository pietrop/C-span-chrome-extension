// TODO: take last fed speech 
// diff against c-span captions and add words here to fix auto punctuation.
const words = [
  { key: "america", value: "America" },
  { key: "american", value: "American" },
  { key: "donald", value: "Donald" },
  { key: "donald trump", value: "Donald Trump" },
  { key: "donald j trump", value: "Donald J. Trump" },
  { key: "donald j. trump", value: "Donald J. Trump" },
  { key: "donald john trump", value: "Donald John Trump" },
  { key: "trump", value: "Trump" },
  { key: "ivanka", value: "Ivanka" },
  { key: "eric", value: "Eric" },
  { key: "melania", value: "Melania" },
  { key: "tiffany", value: "Tiffany" },
  { key: "barron", value: "Barron" },
  { key: "medicare", value: "Medicare" },
  { key: "medicaid", value: "Medicaid" },
  { key: "social security", value: "Social Security" },
  { key: "barack obama", value: "Barack Obama" },
  { key: "obama", value: "Obama" },
  { key: "obamacare", value: "Obamacare" },
  { key: "i", value: "I" },
  { key: "i'll", value: "I'll" },
  { key: "i'm", value: "I'm" },
  { key: "i'd", value: "I'd" },
  { key: "--", value: "—" },
  { key: "pence", value: "Pence" },
  { key: "mike pence", value: "Mike Pence" },
  { key: "michael pence", value: "Michael Pence" },
  { key: "michael richard pence", value: "Michael Richard Pence" },
  { key: "washington", value: "Washington" },
  { key: "d.c.", value: "D.C." },
  { key: "district of columbia", value: "District of Columbia" },
  { key: "god", value: "God" },
  { key: "scripture", value: "Scripture" },
  { key: "bible", value: "Bible" },
  { key: "lincoln", value: "Lincoln" },
  { key: "mexico", value: "Mexico" },
  { key: "china", value: "China" },
  { key: "earth", value: "Earth" },
  { key: "new york", value: "New York" },
  { key: "united states of america", value: "United States of America" },
  { key: "founding fathers", value: "Founding Fathers" },
  { key: "affordable care act", value: "Affordable Care Act" },
  { key: "president trump", value: "President Trump" },
  { key: "michelle obama", value: "Michelle Obama" },
  { key: "president obama", value: "President Obama" },
  { key: "george bush", value: "George Bush" },
  { key: "bill clinton", value: "Bill Clinton" },
  { key: "hillary clinton", value: "Hillary Clinton" },
  { key: "clinton", value: "Clinton" },
  { key: "white house", value: "White House" },
  { key: "united states", value: "United States" },
  { key: "americans", value: "Americans" },
  { key: "america's", value: "America's" },
  { key: "constitution", value: "Constitution" },
  { key: "china", value: "China" },
  { key: "russia", value: "Russia" },
  { key: "u.s.", value: "U.S." },
  { key: "u.s.a.", value: "U.S.A." },
  { key: "usa", value: "U.S.A." },
  { key: "israel", value: "Israel" },
  { key: "israeli", value: "Israeli" },
  { key: "israelis", value: "Israelis" },
  { key: "lgbt", value: "LGBT" },
  { key: "palestine", value: "Palestine" },
  { key: "palestinian", value: "Palestinian" },
  { key: "palestinians", value: "Palestinians" },
  { key: "president-elect", value: "President-elect" },
  { key: "republican", value: "Republican" },
  { key: "democrat", value: "Democrat" },
  { key: "republicans", value: "Republicans" },
  { key: "democrats", value: "Democrats" },
  { key: "twitter", value: "Twitter" },
  { key: "facebook", value: "Facebook" },
  { key: "cnn", value: "CNN" },
  { key: "buzzfeed", value: "Buzzfeed" },
  { key: "putin", value: "Putin" },
  { key: "isis", value: "ISIS" },
  { key: "i.s.i.s.", value: "ISIS" },
  { key: "monday", value: "Monday" },
  { key: "tuesday", value: "Tuesday" },
  { key: "wednesday", value: "Wednesday" },
  { key: "thursday", value: "Thursday" },
  { key: "friday", value: "Friday" },
  { key: "saturday", value: "Saturday" },
  { key: "sunday", value: "Sunday" },
  { key: "january", value: "January" },
  { key: "february", value: "February" },
  { key: "march", value: "March" },
  { key: "april", value: "April" },
  { key: "may", value: "May" },
  { key: "june", value: "June" },
  { key: "july", value: "July" },
  { key: "august", value: "August" },
  { key: "september", value: "September" },
  { key: "october", value: "October" },
  { key: "november", value: "November" },
  { key: "december", value: "December" },
  { key: "europe", value: "Europe" },
  { key: "mexico", value: "Mexico" },
  { key: "mexican", value: "Mexican" },
  { key: "mexicans", value: "Mexicans" },
  { key: "muslim", value: "Muslim" },
  { key: "moslem", value: "Moslem" },
  { key: "muslims", value: "Muslims" },
  { key: "moslems", value: "Moslems" },
  { key: "islam", value: "Islam" },
  { key: "islamic", value: "Islamic" },
  { key: "christian", value: "Christian" },
  { key: "christians", value: "Christians" },
  { key: "c-span", value: "C-SPAN" },
  { key: "cuba", value: "Cuba" },
  { key: "cuban", value: "Cuban" },
  { key: "cuban", value: "Cubans" },
  { key: "congress", value: "Congress" },
  { key: "senator", value: "Senator" },
  { key: "senate", value: "Senate" },
  { key: "house of representatives", value: "House of Representatives" },
  { key: "supreme court", value: "Supreme Court" },
  { key: "chief justice", value: "Chief Justice" }
];
// console.log(Array.from(document.querySelectorAll('.cue')).map((c)=>{return c.innerHTML.trim()}).join(' '));
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    /**
     * To Scrape captions text from C-Span website
     *
     * Example page
     * https://www.c-span.org/video/?465757-1/federal-reserve-chair-powell-announces-interest-rate-cut-signals-pause
     */
    // possible function to clean up text
    // https://github.com/voxmedia/c-span_opened_captions_server/blob/master/index.js#L61
    function formatText(str) {
      var ret = str.toLowerCase().replace("\r\n", " "); // remove random line breaks
      // ret = s.clean(ret) // remove redundant spaces

      // now use our words file to adjust capitalization of specific words in our custom dictionary
      words.forEach(pair => {
        const pairkey = pair.key;
        const pairValue = pair.value;
        ret = ret
          .replace(
            new RegExp(` ${pairkey.replace(".", "\\.")}( |\\.|,|:|')`, "gi"),
            (match, a) => {
              return ` ${pairValue}${a}`;
            }
          )
          .replace(new RegExp(`^${pairkey}( |\\.|,|:|')`, "i"), (match, a) => {
            return `${pairValue}${a}`;
          })
          .replace(new RegExp(` ${pairkey}$`, "i"), pairValue);
      });

      ret = ret
        // Music notes
        .replace(/\s+b\x19\*\s+/, "\n\n🎵\n\n")
        // remove blank space before puncuation
        .replace(/\s+(!|\?|;|:|,|\.|')/g, "$1")
        // handle honorifics
        .replace(
          / (sen\.?|rep\.?|mr\.?|mrs\.?|ms\.?|dr\.?) (\w)/gi,
          (match, a, b) => {
            return ` ${s.capitalize(a)} ${b.toUpperCase()}`;
          }
        )
        // Cap first letter of sentences
        .replace(/(!|\?|:|\.|>>)\s+(\w)/g, (match, a, b) => {
          return `${a} ${b.toUpperCase()}`;
        })
        // >> seems to be used instead of repeating speaker prompts in back and forths
        .replace(/\s*>>\s*/g, "\n\n>> ")
        // Put speaker prompts on new lines
        .replace(/(\.|"|!|\?|—)\s*([a-zA-Z. ]{2,30}:)/g, "$1\n\n$2");

      return ret;
    }

    // iterate through all `short_transcript`
    // for individual
    //     p = document.querySelector('.short_transcript')
    // If ends with `...` (means it's not expanded)
    // Then get hiddent text
    // p.querySelector('.hidden-full-transcript-text').innerText
    //  else move on/continue iterating

    // Opens up the 'show more'
    document.querySelectorAll(".hidden-full-transcript-link").forEach(p => {
      return p.click();
    });

    // Get the transcription text.
    const result = [];
    document.querySelectorAll(".short_transcript").forEach(p => {
      //console.log(p.innerText);
      const text = p.innerText;
      result.push(text);
    });
    const resultString = result.join("\n");
    const resultCleaned = formatText(resultString);

    console.log(resultCleaned);

    const responseCliboard = confirm(
      "Would you like to copy the text to clipboard?"
    );
    if (responseCliboard === true) {
      // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
      // https://barrysimpson.net/posts/copy-paste-chrome-ext
      navigator.clipboard.writeText(resultCleaned).then(
        function() {
          /* clipboard successfully set */
          alert("copied onto your clipboard");
        },
        function() {
          /* clipboard write failed */
          alert("there was an error copying it onto your clipboard");
        }
      );
    } else {
      alert(`Transcript Text: ${resultCleaned}`);
    }
  }
});
