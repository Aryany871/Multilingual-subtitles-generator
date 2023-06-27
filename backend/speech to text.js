const fs = require("fs");
const { Deepgram } = require("@deepgram/sdk");
const dotenv = require("dotenv");
dotenv.config();

const deepgramApiKey = process.env.API_KEY;
const deepgram = new Deepgram(deepgramApiKey);
const file = "output/audio2.mp3";
const mimetype = "audio/mp3";

let source;

if (file.startsWith("http")) {
  // File is remote
  // Set the source
  source = {
    url: file,
  };
} else {
  // File is local
  // Open the audio file
  const audio = fs.readFileSync(file);

  // Set the source
  source = {
    buffer: audio,
    mimetype: mimetype,
  };
}

deepgram.transcription
  .preRecorded(source, {
    smart_format: true,
    model: "nova",
  })
  .then((response) => {
    // Write the response to the console
    // console.dir(response, { depth: null });
    fs.writeFileSync("output/response.json", JSON.stringify(response, null, 2));
    console.log("Transcription saved successfully.");
  })
  .catch((err) => {
    console.log(err);
  });