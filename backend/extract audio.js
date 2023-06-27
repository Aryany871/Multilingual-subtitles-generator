const ffmpeg = require('fluent-ffmpeg');

// Function to extract audio from a video
function extractAudio(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .noVideo()
      .on('end', () => {
        resolve(outputPath);
      })
      .on('error', (err) => {
        reject(err);
      })
      .run();
  });
}

// Usage example
const inputVideoPath = 'input/sample1.mp4';  // Replace with the path to your input video
const outputAudioPath = 'output/audio2.mp3';  // Replace with the desired output audio path

extractAudio(inputVideoPath, outputAudioPath)
  .then((outputPath) => {
    console.log(`Audio extracted and saved to ${outputPath}`);
  })
  .catch((err) => {
    console.error('Error extracting audio:', err);
  });

  