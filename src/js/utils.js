/**
 * @param {!Date} jsDate
 * @returns 
 */

function toBackendDateString(jsDate) {
    const day = jsDate.getDate() > 9 ? jsDate.getDate() : `0${jsDate.getDate()}`; 
    const monthRaw = jsDate.getMonth() + 1; 
    const month = monthRaw > 9 ? monthRaw : `0${monthRaw}`; 
    const year = jsDate.getFullYear();
    return `${day}.${month}.${year}`;
  }
  
  module.exports = {
    toBackendDateString,
  };