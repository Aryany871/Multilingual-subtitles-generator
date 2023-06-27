const fs = require('fs');
const translated_sentences = require('./output/translated_sentences.json');
function convertToSrt(sentences) {
  let srt = '';
  let index = 1;

  for (const sentence of sentences) {
    const startTime = formatTime(sentence.start);
    const endTime = formatTime(sentence.end);

    srt += `${index}\n`;
    srt += `${startTime} --> ${endTime}\n`;
    srt += `${sentence.text}\n\n`;

    index++;
  }

  return srt;
}

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = (time % 60).toFixed(3);

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}


function saveSrtToFile(srtContent, filename) {
    fs.writeFile(filename, srtContent, 'utf8', (err) => {
      if (err) {
        console.error('Error saving file:', err);
      } else {
        console.log('Subtitle file saved successfully:', filename);
      }
    });
  }

  // Usage example
  const subtitleFilePath = 'output/subtitles.srt'; 
  const srtContent = convertToSrt(translated_sentences.sentences);
  
  saveSrtToFile(srtContent, subtitleFilePath);