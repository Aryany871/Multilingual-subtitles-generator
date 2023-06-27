const fs = require('fs');
const { Deepgram } = require('@deepgram/sdk');
const dotenv = require('dotenv');
dotenv.config();

const deepgramApiKey = process.env.API_KEY;

const deepgram = new Deepgram(deepgramApiKey);

// Function to save Deepgram API response to a file
const saveResponseToFile = (response, filePath) => {
  const responseJson = JSON.stringify(response);
  fs.writeFileSync(filePath, responseJson);
};

// Function to retrieve Deepgram API response from a file
const getResponseFromFile = (filePath) => {
  const responseJson = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(responseJson);
};

// Function to transcribe audio and save the response to a file
const transcribeAudioAndSaveResponse = async (audioFile, responseFile) => {
  const source = {
    buffer: fs.readFileSync(audioFile),
    mimetype: 'audio/wav',
  };

  try {
    const response = await deepgram.transcription.preRecorded(source, {
      smart_format: true,
      model: 'nova',
    });

    saveResponseToFile(response, responseFile);
    console.log('Deepgram API response saved to file:', responseFile);
  } catch (error) {
    console.error('Error transcribing audio:', error);
  }
};

module.exports = { transcribeAudioAndSaveResponse, getResponseFromFile };
