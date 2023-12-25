const path = require('path');
const { readdir, readFile } = require('fs');

/**
 * Gets an array of the file names in the instrument's directory
 * @param { string } instrumentDirectoryPath
 * @returns { Promise }
 */
function getAudioFileNames(instrumentDirectoryPath) {
  return getAsyncFunctionAsPromise({
    asyncFn: readdir,
    path: instrumentDirectoryPath
  });
}

/**
 * Get the data for all audio files in a directory
 * @param { Array<string> } fileNames
 * @param { string } instrumentDirectoryPath
 * @returns { Promise }
 */
function getAudioFiles(fileNames, instrumentDirectoryPath) {
  const audioFiles = [];
  let filePath;

  fileNames.forEach((fileName) => {
    filePath = path.resolve(instrumentDirectoryPath, fileName);
    audioFiles.push(getAudioFile(filePath));
  });

  return Promise.all(audioFiles);
}

/**
 * Gets the audio file data at the specified path
 * @param { string } audioFilePath
 * @returns { Promise }
 */
function getAudioFile(audioFilePath) {
  return getAsyncFunctionAsPromise({
    asyncFn: readFile,
    path: audioFilePath,
    options: { encoding: 'base64' }
  });
}

/**
 * Wraps an callback-based function in a promise.
 * @param { Object } params the parameters needed to for the callback-based function and the callback itself
 * @param { function } params.asyncFn the callback-based function to call
 * @param { string } params.path
 * @param { Object } params.options the options needed for the callback
 * @returns { Promise }
 */
function getAsyncFunctionAsPromise({ asyncFn, path, options = {} }) {
  return new Promise((resolve, reject) =>
    asyncFn(path, options, (error, result) =>
      error != null ? reject(error) : resolve(result)
    )
  );
}

/**
 * Combines an array of keys and an array of values into one object.
 * The arrays must have the same length.
 * @param { Array } keys
 * @param { Array } values
 * @returns { Object }
 */
function combineArraysToObject(keys, values) {
  if (keys == null || values == null || keys.length !== values.length) {
    return null;
  }

  const result = {};

  for (let i = 0; i < keys.length; ++i) {
    result[keys[i]] = values[i];
  }

  return result;
}

function getPitchesFromFileNames(fileNames) {
  const pitches = [];
  let pitch;

  for (let i in fileNames) {
    pitch = getPitchFromFileName(fileNames[i]);
    pitches.push(pitch);
  }

  return pitches;
}

function getPitchFromFileName(fileName) {
  const fileExtension = '.mp3';
  return fileName.slice(0, fileName.length - fileExtension.length);
}

module.exports = {
  getAudioFileNames,
  getAudioFiles,
  getPitchesFromFileNames,
  combineArraysToObject
};