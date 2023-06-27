const fs = require('fs');
const response = require('./output/response.json');
const translate = require('translate-google');

// Function to translate a sentence
async function translateSentence(sentence) {
  try {
    const translatedText = await translate(sentence.text, { to: 'fr' }); // Replace 'fr' with the desired target language code
    
    const translatedSentence = {
      text: translatedText,
      start: sentence.start,
      end: sentence.end
    };

    return translatedSentence;
  } catch (error) {
    console.error('Translation Error:', error);
    return null;
  }
}

// Translate each sentence
async function translateSentences(sentences) {
  const translatedSentences = [];

  for (const sentence of sentences) {
    const translatedSentence = await translateSentence(sentence);
    
    if (translatedSentence) {
      translatedSentences.push(translatedSentence);
    }
  }

  return translatedSentences;
}

// Define the sentences to be translated
const paragraphs = response.results.channels[0].alternatives[0].paragraphs;
const allSentences = paragraphs.paragraphs.reduce((acc, para) => acc.concat(para.sentences), []);

// Call the function to start translation
translateSentences(allSentences)
  .then((translatedSentences) => {
    // Create an object to store the translations
    const translations = {
      sentences: translatedSentences,
      num_words: response.results.channels[0].alternatives[0].num_words,
      start: response.results.channels[0].alternatives[0].start,
      end: response.results.channels[0].alternatives[0].end
    };

    // Convert translations object to JSON string
    const jsonData = JSON.stringify(translations, null, 2);

    // Write JSON data to a file
    fs.writeFile('translated_sentences.json', jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Translations saved to translated_sentences.json');
      }
    });
  })
  .catch((error) => {
    console.error('Translation Error:', error);
  });
