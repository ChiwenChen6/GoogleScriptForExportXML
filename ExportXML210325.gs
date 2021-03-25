

/*
   The number of languages you support. Please check the README.md for more
   information on column positions.
*/
var NUMBER_OF_LANGUAGES = 3;

/* 
   The script expects two columns for iOS and Android identifiers, respectively,
   and a column after that with all of the string values. This is the position of
   the iOS column.
*/
var FIRST_COLUMN_POSITION = 1;

/*
   The position of the header containing the strings "Identifier iOS" and "Identifier Android"
*/
var HEADER_ROW_POSITION = 1;

/*
   True if iOS output should contain a `Localizable` `enum` that contains all of
   the keys as string constants.
*/
var IOS_INCLUDES_LOCALIZABLE_ENUM = true;


// Constants

var LANGUAGE_IOS      = 'iOS';
var LANGUAGE_ANDROID  = 'Android';
var DEFAULT_LANGUAGE = LANGUAGE_ANDROID;
var LANGUAGE_Javascript = 'Javascript'
var stringsoutput = [];

// Export

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Export')
      .addItem('iOS', 'exportForIos')
      .addItem('Android English', 'exportEnglishForAndroid')
      .addItem('Android 中文', 'exportChineseForAndroid')
      .addItem('Android 日本語', 'exportJapaneseForAndroid')
      .addItem('JSON_Javascript English', 'exportEnglishJSON_Javascript')
      .addToUi();
  ui.createMenu('Export download')
      .addItem('AVerPTZ English', 'downloadEnglishForAVerPTZ')
      .addItem('AVerPTZ 中文', 'downloadChineseForAVerPTZ')
      .addItem('AVerPTZ 日本語', 'downloadJapaneseForAVerPTZ')
      .addItem('Launcher English', 'downloadEnglishForLauncher')
      .addItem('Launcher 中文', 'downloadChineseForLauncher')
      .addItem('Launcher 日本語', 'downloadJapaneseForLauncher')
      .addToUi();
}


function  downloadEnglishForAVerPTZ(){
    var e = {
      parameter: {
        language: LANGUAGE_ANDROID
      }
    };
    var contentoutput = tranferSpecialWord(exportSheet(e,0));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.XML);
    output.downloadAsFile("string.xml");  
    return output;
}

function  downloadChineseForAVerPTZ(e){
    var e = {
      parameter: {
        language: LANGUAGE_ANDROID
      }
    };
    var contentoutput = tranferSpecialWord(exportSheet(e,1));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.XML);
    output.downloadAsFile("string.xml");  
}
function  downloadJapaneseForAVerPTZ(e){
    var e = {
      parameter: {
        language: LANGUAGE_ANDROID
      }
    };
    var contentoutput = tranferSpecialWord(exportSheet(e,2));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.XML);
    output.downloadAsFile("string.xml");  
}

function doGet(e) {
  if (e.parameter.setting == "AVerPTZenglish") {
    var contentoutput = tranferSpecialWord(exportSheet(e,0));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.XML);
    output.downloadAsFile("string.xml");    
  }
  else if (e.parameter.setting == "AVerPTZchinese") {
    var contentoutput = tranferSpecialWord(exportSheet(e,1));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.XML);
    output.downloadAsFile("string.xml");   
  }
  else if (e.parameter.setting == "AVerPTZjapanese") {
    var contentoutput = tranferSpecialWord(exportSheet(e,2));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.XML);
    output.downloadAsFile("string.xml");
  }
  else if (e.parameter.setting == "AVerPTZios") {
    var contentoutput = tranferSpecialWord(exportSheetOnlyIOS(e));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.XML);
    output.downloadAsFile("string.xml");
  }  
  else if (e.parameter.setting == "Launcherenglish") {
    var contentoutput = tranferSpecialWord(exportSheetLauncher(e,0));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.XML);
    output.downloadAsFile("string.xml");
  }
  else if (e.parameter.setting == "Launcherchinese") {
    var contentoutput = tranferSpecialWord(exportSheetLauncher(e,1));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.XML);
    output.downloadAsFile("string.xml");
  }
  else if (e.parameter.setting == "Launcherjapanese") {
    var contentoutput = tranferSpecialWord(exportSheetLauncher(e,2));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.XML);
    output.downloadAsFile("string.xml");
  }
  else if (e.parameter.setting == "Javascriptenglish") {
    var e = {
      parameter: {
        language: LANGUAGE_Javascript
      }
    };
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Javascript Device");
    var contentoutput = tranferSpecialWord(exportSheetJavascriptDevice(e,0));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.JSON);
    var dataName = sheet.getSheetValues(1, 8, 1,1);//輸出檔案名稱 h1
    output.downloadAsFile(dataName);
  }

  else if (e.parameter.setting == "Javascriptchinese") {
    var e = {
      parameter: {
        language: LANGUAGE_Javascript
      }
    };
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Javascript Device");
    var contentoutput = tranferSpecialWord(exportSheetJavascriptDevice(e,1));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.JSON);
    var dataName = sheet.getSheetValues(1, 9, 1,1);//輸出檔案名稱
    output.downloadAsFile(dataName);
  }

  else if (e.parameter.setting == "Javascriptjapanese") {
    var e = {
      parameter: {
        language: LANGUAGE_Javascript
      }
    };
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Javascript Device");
    var contentoutput = tranferSpecialWord(exportSheetJavascriptDevice(e,2));
    var output =  ContentService.createTextOutput(contentoutput); 
    output.setMimeType(ContentService.MimeType.JSON);
    var dataName = sheet.getSheetValues(1, 10, 1,1);//輸出檔案名稱
    output.downloadAsFile(dataName);
  }
  return output;
}

function tranferSpecialWord(string) {
    while (0 <= string.indexOf('\n')) {
      string = string.replace('\n', ('\\' + 'n'));
    }
  return string
}

function exportForIos() {
  var e = {
    parameter: {
      language: LANGUAGE_IOS
    }
  };
   exportSheetAll(e);
}

function exportEnglishForAndroid() {
  var e = {
    parameter: {
      language: LANGUAGE_ANDROID
    }
  };
 var i = 0;
  stringsoutput = exportSheet(e,i);
  displayTexts_(stringsoutput); 
}

function exportChineseForAndroid() {
  var e = {
    parameter: {
      language: LANGUAGE_ANDROID
    }
  };
  i = 1;
  stringsoutput = exportSheet(e,i);
  displayTexts_(stringsoutput)
}

function exportJapaneseForAndroid() {
  var e = {
    parameter: {
      language: LANGUAGE_ANDROID
    }
  };
  i = 2;
  stringsoutput = exportSheet(e,i);
  displayTexts_(stringsoutput)
}


function exportEnglishJSON_Javascript() {
  var e = {
    parameter: {
      language: LANGUAGE_Javascript
    }
  };
   exportSheetAll(e);
}


 function stringoutput(string){
     var output =  ContentService.createTextOutput(stringsoutput);
     output.setMimeType(ContentService.MimeType.XML);
     output.downloadAsFile("string.xml");     
     // displayTexts_(stringsoutput)
    return output;
}

/*
   Fetches the active sheet, gets all of the data and displays the
   result strings.
*/
function exportSheetLauncher(e,i) {
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Android CP10Launcher");
  var rowsData = getRowsData_(sheet, getExportOptions(e));
  var strings = [];
  strings.push(makeString(rowsData, i, getExportOptions(e)));
  // createGoogleDriveTextFile(i, strings)
  return strings;
}

function exportSheetJavascriptDevice(e,i) {
  var e = {
    parameter: {
      language: LANGUAGE_Javascript
    }
  };
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Javascript Device");
  var rowsData = getRowsData_(sheet, getExportOptions(e));
  var strings = [];
  strings.push(makeString(rowsData, i, getExportOptions(e)));
  // createGoogleDriveTextFile(i, strings)
  return strings;
}


function exportSheetAll(e) {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var rowsData = getRowsData_(sheet, getExportOptions(e));

  var strings = [];
  for (var i = 0; i < NUMBER_OF_LANGUAGES; i++) {
    strings.push(makeString(rowsData, i, getExportOptions(e)));
  }
  return displayTexts_(strings);
}


function exportSheet(e,i) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var rowsData = getRowsData_(sheet, getExportOptions(e));

  var strings = [];
  strings.push(makeString(rowsData, i, getExportOptions(e)));
  // createGoogleDriveTextFile(i, strings)
  return strings;
}

function createGoogleDriveTextFile(num_output, content) {
  var content,fileName,newFile;//Declare variable names
  
  fileName = "string" + num_output + ".xml";//Create a new file name with date on end
  newFile = DriveApp.createFile(fileName,content);//Create a new text file in the root folder
};

function getExportOptions(e) {
  var options = {};
  options.language = e && e.parameter.language || DEFAULT_LANGUAGE;  
  return options;
}

// UI Elements

function makeLabel(app, text, id) {
  var lb = app.createLabel(text);
  if (id) lb.setId(id);
  return lb;
}

function makeListBox(app, name, items) {
  var listBox = app.createListBox().setId(name).setName(name);
  listBox.setVisibleItemCount(1);
  
  var cache = CacheService.getPublicCache();
  var selectedValue = cache.get(name);
  Logger.log(selectedValue);
  for (var i = 0; i < items.length; i++) {
    listBox.addItem(items[i]);
    if (items[1] == selectedValue) {
      listBox.setSelectedIndex(i);
    }
  }
  return listBox;
}

function makeButton(app, parent, name, callback) {
  var button = app.createButton(name);
  app.add(button);
  var handler = app.createServerClickHandler(callback).addCallbackElement(parent);;
  button.addClickHandler(handler);
  return button;
}

function makeTextBox(id, content) {
  var textArea = '<textarea rows="10" cols="80" id="' + id + '">' + content + '</textarea>';
  return textArea;
}

function displayTexts_(texts) {
  
  var app = HtmlService.createHtmlOutput().setWidth(800).setHeight(600);

  for (var i = 0; i < texts.length; i++) {
     app.append(makeTextBox("export_" + i, texts[i]))
  }
  
  SpreadsheetApp.getUi().showModalDialog(app, "Translations");

  return app; 
}


// Creating iOS and Android strings

function makeString(object, textIndex, options) {
  switch (options.language) {
    case LANGUAGE_ANDROID:
      return makeAndroidString(object, textIndex, options);
      break;
    case LANGUAGE_IOS:
      return makeIosString(object, textIndex, options);
      break;
    case LANGUAGE_Javascript:
      return makeJSONString(object, textIndex, options);
      break;

    default:
      break;
  }
}

/*
   Creates the strings.xml file for Android.
*/
function makeAndroidString(object, textIndex, options) {

  var exportString = "";
  var prevIdentifier = "";
  
  exportString = '<?xml version="1.0" encoding="UTF-8"?>' + "\n";
  exportString += "<resources>\n";
  
  for (var i = 0; i < object.length; i++) {
    var o = object[i];
    var identifier = o.identifierAndroid;
    if (identifier == undefined || identifier == "")
      continue;
    
    var text = o.texts[textIndex];
    if (text == undefined || text == "")
      continue;

    while (0 <= text.indexOf('\n')) {
      text = text.replace('\n', ('\\' + 'n'));
    }
  
    // while (0 <= text.indexOf('\n')) {
    //   text = text.replace('\n', ('\\' + 'n'));
    // }
  
    if(identifier != prevIdentifier && prevIdentifier != "") {
      exportString += "\t" + '</string-array>' + "\n";
      prevIdentifier = "";
    }
    
    if(identifier.indexOf("[]")>0) {
      
      if(identifier != prevIdentifier) {
        exportString += "\t" + '<string-array name="' + identifier.substr(0,identifier.length-2) + '">' + "\n";
      }
      
      exportString += "\t\t"+'<item>'+o.text+'</item>' + "\n";
      prevIdentifier = identifier;
      
    } else {
      exportString += "\t"+'<string name="'+identifier+'">'+text+'</string>' + "\n";
    }
  }
  
  exportString += "</resources>";
  
  return exportString;
}

/*
   Creates the json file.
*/
function makeJSONString(object, textIndex, options) {

  var exportString = "";
  
  exportString = '{' + "\n";

    for(var i=0; (i < object.length) ; i++) {
        
      var o = object[i];
      var identifier = o.identifierJavascript;
      var text = o.texts[textIndex];
    
      if (text == undefined || text == "") {
        continue;
      }
    
      if (identifier == "") {
        continue;
      }
      exportString += "\t"+'"'+identifier+'": "'+text+'",' + "\n";

    }
  
 
    var o = object[ (object.length - 1)];
    var text = o.texts[textIndex];
    var identifier = o.identifierIos;
    exportString += "\t"+'"'+identifier+'": '+text+ "\n";
  
  exportString += "}";
  
  return exportString;
}

/*
   Creates the Localizable.strings file and a Localizable enum for iOS.
*/
function makeIosString(object, textIndex, options) {

  var exportString = "";
  
  if (IOS_INCLUDES_LOCALIZABLE_ENUM) {
  
    exportString += "// MARK: - Localizable enum\n\n"
  
    exportString += "enum Localizable {\n\n"
          
    for(var i=0; i<object.length; i++) {
        
      var o = object[i];
      var text = o.texts[textIndex];
    
      if (text == undefined || text == "") {
        continue;
      }
    
      var identifier = o.identifierAndroid;
      
      if (identifier == "") {
        continue;
      }
        
      exportString += "    /// " + text + "\n";
      exportString += "    static let " + identifier + " = \"" + identifier + "\"\n\n";
    }
    
    exportString += "}\n\n"
    exportString += "// MARK: - Strings\n\n";
  }
  
  for(var i=0; i<object.length; i++) {
    var o = object[i];
    var identifier = o.identifierAndroid;
    var text = o.texts[textIndex];
    
    if (text == undefined || text == "") {
      continue;
    }
    
    if(identifier == "") {
      continue;
    }

    exportString += '"' + identifier + '" = "' + text + "\";\n";
  }
  
  return exportString;
}


// Data fetching

/*
   Gets the titles for the first row from the speadsheet, in lower case and without spaces.
   - returns: a string array of the headers
*/
function getNormalizedHeaders(sheet, options) {
  var headersRange = sheet.getRange(1, FIRST_COLUMN_POSITION, HEADER_ROW_POSITION, sheet.getMaxColumns());
  var headers = headersRange.getValues()[0];
  return normalizeHeaders(headers);
}

/*
   Removes all empty cells from the headers string array, and normalizes the rest into camelCase.
   - returns: a string array containing a list of normalized headers
*/
function normalizeHeaders(headers) {
  var keys = [];
  for (var i = 0; i < headers.length; ++i) {
    var key = normalizeHeader(headers[i]);
    if (key.length > 0) {
      keys.push(key);
    }
  }
  return keys;
}

/*
   Converts a header string into a camelCase string.
    - returns a string in camelCase
*/
function normalizeHeader(header) {
  var key = "";
  var upperCase = false;
  for (var i = 0; i < header.length; ++i) {
    var letter = header[i];
    if (letter == " " && key.length > 0) {
      upperCase = true;
      continue;
    }
    if (!isAlnum_(letter)) {
      continue;
    }
    if (key.length == 0 && isDigit_(letter)) {
      continue; // first character must be a letter
    }
    if (upperCase) {
      upperCase = false;
      key += letter.toUpperCase();
    } else {
      key += letter.toLowerCase();
    }
  }
  return key;
}

/*
   Gets all of the data from the sheet.
    - returns an array of objects containing all the necessary data for display.
*/
function getRowsData_(sheet, options) {
  
  var dataRange = sheet.getRange(HEADER_ROW_POSITION + 1, FIRST_COLUMN_POSITION, sheet.getMaxRows(), sheet.getMaxColumns());
  var headers = getNormalizedHeaders(sheet, options);
  var objects = getObjects(dataRange.getValues(), headers);
  
  return objects;
}

/*
   Gets the objects for the cell data. For each cell, the keys are the headers and the value is the
   data inside the cell.
   - returns: an array of objects with data for displaying the final string
*/
function getObjects(data, keys) {
  
  var objects = [];
  
  for (var i = 0; i < data.length; ++i) {
    
    var object = {
      "texts": []
    };
    
    var hasData = false;
    
    for (var j = 0; j < data[i].length; ++j) {
      
      var cellData = data[i][j];
      if (isCellEmpty_(cellData)) {
        cellData = "";
      }
      
      if (keys[j] != "identifierIos" && keys[j] != "identifierAndroid"&& keys[j] != "identifierJavascript" && keys[j] != "Identifier Qt") {
        object["texts"].push(cellData);
      } else {
        object[keys[j]] = cellData;
      }
      hasData = true;
    }
    if (hasData) {
      objects.push(object);
    }
  }
  return objects;
}

// Utils


// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty_(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}

// Returns true if the character char is alphabetical, false otherwise.
function isAlnum_(char) {
  return char >= 'A' && char <= 'Z' ||
    char >= 'a' && char <= 'z' ||
    isDigit_(char);
}

// Returns true if the character char is a digit, false otherwise.
function isDigit_(char) {
  return char >= '0' && char <= '9';
}

// Given a JavaScript 2d Array, this function returns the transposed table.
// Arguments:
//   - data: JavaScript 2d Array
// Returns a JavaScript 2d Array
// Example: arrayTranspose([[1,2,3],[4,5,6]]) returns [[1,4],[2,5],[3,6]].
function arrayTranspose_(data) {
  if (data.length == 0 || data[0].length == 0) {
    return null;
  }

  var ret = [];
  for (var i = 0; i < data[0].length; ++i) {
    ret.push([]);
  }

  for (var i = 0; i < data.length; ++i) {
    for (var j = 0; j < data[i].length; ++j) {
      ret[j][i] = data[i][j];
    }
  }

  return ret;
}
