const ffmpeg = require('fluent-ffmpeg');
const inputVideoPath = 'input/sample1.mp4';
const subtitleFilePath = 'output/subtitles.srt';
const outputVideoPath = 'output/output-video2.mp4';

ffmpeg()
  .input(inputVideoPath)
  .input(subtitleFilePath)
  .videoFilters({
    filter: 'subtitles',
    options: subtitleFilePath,
  })
  .output(outputVideoPath)
  .on('end', () => {
    console.log('Subtitles added to video.');
  })
  .on('error', (err) => {
    console.error('Error adding subtitles:', err.message);
  })
  .run();
