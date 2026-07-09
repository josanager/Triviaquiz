import fs from 'fs';

const songs = [
  "Dynamite",
  "Butter",
  "Boy With Luv",
  "Fake Love",
  "DNA",
  "Blood Sweat & Tears",
  "Spring Day",
  "Idol",
  "Mic Drop",
  "Fire",
  "Life Goes On",
  "Permission to Dance",
  "Run",
  "Dope",
  "I Need U",
  "Black Swan",
  "Save Me",
  "Boy In Luv",
  "Danger",
  "Anpanman",
  "Go Go",
  "Silver Spoon (Baepsae)",
  "Yet To Come",
  "Not Today",
  "ON",
  "Make It Right",
  "The Truth Untold",
  "Magic Shop",
  "Stay Gold",
  "We Are Bulletproof: Pt.2"
];

async function run() {
  const results = {};
  for (const song of songs) {
    // Clean up song name for iTunes query if needed, e.g. "Silver Spoon (Baepsae)" -> "Silver Spoon" or "Baepsae"
    let cleanSongName = song;
    if (song === "Silver Spoon (Baepsae)") {
      cleanSongName = "Baepsae";
    }
    const term = `BTS ${cleanSongName}`;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=1`;
    try {
      const resp = await fetch(url);
      const json = await resp.json();
      if (json.results && json.results[0]) {
        results[song] = json.results[0].previewUrl;
        console.log(`Found: ${song} -> ${json.results[0].previewUrl}`);
      } else {
        console.log(`Not found: ${song}`);
      }
    } catch (err) {
      console.error(`Error searching ${song}:`, err);
    }
  }
  // Make sure scratch folder exists
  if (!fs.existsSync('scratch')) {
    fs.mkdirSync('scratch');
  }
  fs.writeFileSync('scratch/songs_urls.json', JSON.stringify(results, null, 2));
}

run();
