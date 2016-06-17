$(function() {
    // allow tab key to be used in the text area
    $('#input').keydown(function(e) {
        // http://stackoverflow.com/questions/1738808/keypress-in-jquery-press-tab-inside-textarea-when-editing-an-existing-text/1738888#1738888
        if (e.keyCode == 9) {
            var myValue = "\t";
            var startPos = this.selectionStart;
            var endPos = this.selectionEnd;
            var scrollTop = this.scrollTop;
            this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
            this.focus();
            this.selectionStart = startPos + myValue.length;
            this.selectionEnd = startPos + myValue.length;
            this.scrollTop = scrollTop;

            e.preventDefault();
        }
    });
});

function createTable() {
    // set up the style
    var cTL, cTM, cTR;
    var cML, cMM, cMR;
    var cBL, cBM, cBR;
    var cH, cV;
    var sL, sM, sR;

    var headerStyle = $('#hdr-style').val();
    var autoFormat = $('#auto-format').is(':checked');
    var hasHeaders = headerStyle == "top";
    var spreadSheetStyle = headerStyle == "ssheet";
    var input = $('#input').val();

    var rows = input.split(/[\r\n]+/);
    if (rows[rows.length - 1] == "") {
        // extraneous last row, so delete it
        rows.pop();
    }
    
    if (spreadSheetStyle) {
        hasHeaders = true;
        // add the row numbers
        for (var i = 0; i < rows.length; i++) {
            rows[i] = (i+1) + "\t" + rows[i];
        }
    }    

    // calculate the max size of each column
    var colLengths = [];
    var isNumberCol = [];
    for (var i = 0; i < rows.length; i++) {
        rows[i] = rows[i].replace(/(    )/g, "\t");
        var cols = rows[i].split(/\t/);
        for (var j = 0; j < cols.length; j++) {
            var data = cols[j];
            var isNewCol = colLengths[j] == undefined;
            if (isNewCol) {
                isNumberCol[j] = true;
            }
            // keep track of which columns are numbers only
            if (autoFormat) {
                if (hasHeaders && i == 0 && !spreadSheetStyle) {
                    ; // a header is allowed to not be a number (exclude spreadsheet because the header hasn't been added yet
                } else if (isNumberCol[j] && !data.match(/^(\s*-?\d+\s*|\s*)$/)) {
                    isNumberCol[j] = false;
                }
            }
            //Chinese character displays double length than ASCII character
            if (isNewCol || colLengths[j] < data.replace(/[^\x00-\xff]/g, '__').length) {
               colLengths[j] = data.replace(/[^\x00-\xff]/g, '__').length;
            }
        }
    }
    
    if (spreadSheetStyle) {    
        // now that we have the number of columns, add the letters
        var colCount = colLengths.length;
        var letterRow = " "; // initial column will have a space
        for (var i = 0; i < colCount; i++) {
            var asciiVal = (65 + i);
            if (90 < asciiVal) {
                asciiVal = 90; // Z is the max column
            }
            letterRow += "\t" + String.fromCharCode(asciiVal);
        }
        rows.splice(0, 0, letterRow); // add as first row
    }

    var style = $('#style').val();
    switch (style) {
    case "0":
        // ascii mysql style
        cTL = "+";
        cTM = "+";
        cTR = "+";
        cML = "+";
        cMM = "+";
        cMR = "+";
        cBL = "+";
        cBM = "+";
        cBR = "+";
        cH = "-";
        cV = "|";
        break;
    case "2":
        // ascii 2
        cTL = "+";
        cTM = "+";
        cTR = "+";
        cML = "+";
        cMM = "+";
        cMR = "+";
        cBL = "+";
        cBM = "+";
        cBR = "+";
        cH = "=";
        cV = "|";
        sL = "+";
        sM = "-";
        sR = "+";
        break;
    case "3":
        // ascii - compact
        cML = " ";
        cMM = " ";
        cMR = " ";
        cH  = "-";
        cV  = " ";
        break;
    case "gfm":
        // github markdown
        cTL = "|";
        cTM = "|";
        cTR = "|";
        cML = "|";
        cMM = "|";
        cMR = "|";
        cBL = "|";
        cBM = "|";
        cBR = "|";
        cH = "-";
        cV = "|";
        break;
    case "1":
        // unicode
        cTL = "\u2554";
        cTM = "\u2566";
        cTR = "\u2557";
        cML = "\u2560";
        cMM = "\u256C";
        cMR = "\u2563";
        cBL = "\u255A";
        cBM = "\u2569";
        cBR = "\u255D";
        cH = "\u2550";
        cV = "\u2551";
        break;
    case "html":
        outputAsNormalTable(rows, hasHeaders, colLengths);
        return;
    default:
        break;
    }

    // output the text
    var output = "";
    for (var i = 0; i < rows.length; i++) {
        // output the top most row
        // Ex: +---+---+
        if (i == 0 && style != 'gfm' && style != 3 ) {
            if( style == 2 && !hasHeaders ) {
                cH = sM;
            }
            output += cTL;
            for (var j = 0; j < colLengths.length; j++) {
                output += _repeat(cH, colLengths[j] + 2);
                if (j < colLengths.length - 1) {
                    output += cTM;
                }
                else output += cTR;
            }
            output += "\n";
        }

        // output the header separator row
        // Ex: +---+---+
        if (hasHeaders && i == 1 ) {
            output += cML;
            for (var j = 0; j < colLengths.length; j++) {
                output += _repeat(cH, colLengths[j] + 2);
                if (j < colLengths.length - 1) {
                    output += cMM;
                }
                else {
                    output += cMR;
                }
            }
            output += "\n";
        }
        
        // output line separators
        if( ( !hasHeaders && style == "2" & i >= 1 ) || ( hasHeaders && style == 2 & i > 1 ) ) {
            output += sL;
            for (var j = 0; j < colLengths.length; j++) {
                output += _repeat(sM, colLengths[j] + 2);
                if (j < colLengths.length - 1) {
                    output += sR;
                }
                else {
                    output += sR;
                }
            }
            output += "\n";
            
        }

        // output the data
        output += cV;
        var cols = rows[i].split(/\t/);
        for (var j = 0; j < colLengths.length; j++) {
            var data = cols[j] || "";
            var align = "l";
            if (autoFormat) {
                if (hasHeaders && i == 0) {
                    align = "c";
                } else if (isNumberCol[j]) {
                    align = "r";
                }
            }
            //Chinese character displays double length than ASCII character
            data = _pad(data, colLengths[j]-(data.replace(/[\u4e00-\u9fff]+/, '__').length-data.length), " ", align);
            output += " " + data + " " + cV;
        }
        output += "\n";

        // output the bottom row
        // Ex: +---+---+
        if (i == rows.length - 1 && style != 'gfm' && style != 3 ) {
            output += cBL;
            if( style == 2 ) {
                cH = sM;
            }
            for (var j = 0; j < colLengths.length; j++) {
                output += _repeat(cH, colLengths[j] + 2);
                if (j < colLengths.length - 1) output += cBM;
                else output += cBR;
            }
        }
    }

    $('#output').val(output);
    $('#outputText').show();
    $('#outputTbl').hide();
}

function outputAsNormalTable(rows, hasHeaders, colLengths) {
    var output = "";

    var $outputTable = $('<table border="1" cellpadding="1" cellspacing="1">');
    for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].split(/\t/);
        var tag = (hasHeaders && i == 0) ? "th" : "td";
        var $row = $('<tr>').appendTo($outputTable);
        for (var j = 0; j < colLengths.length; j++) {
            var data = cols[j] || " ";
            var $cell = $('<' + tag + '>').text(data);
            $row.append($cell);
        }
    }
    var $outputDiv = $('#outputTbl');
    $outputDiv.empty();
    $outputDiv.append($outputTable);
    $('#output').val('<table>' + $outputTable.html() + '</table>');
    $('#outputText').show();
    $('#outputTbl').show();
}

function parseTableClick() {
    var result = parseTable($('#output').val());
    $('#input').val(result);
}

function parseTable(table) {
    var lines = table.split('\n');
    
    // first find a seprator line
    var separatorLine = '';
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (isSepratorLine(line)) {
            separatorLine = line;
            break;
        }
    }
    
    if (separatorLine == '') {
        alert('Error: make sure to include separator lines.');
        return;
    }
    
    // next, find all column indexes
    var colIndexes = [];
    var horizLineChar = separatorLine[1]; // 2nd char is always the repeating char
    for (var i = 0; i < separatorLine.length; i++) {
        var char = separatorLine[i];
        if (char != horizLineChar) {
            colIndexes.push(i);
        }
    }
    
    // finally, loop over all items and extract the data
    var result = "";
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (isSepratorLine(line)) {
            continue;
        }
        
        for (var j = 0; j < colIndexes.length - 1; j++) {
            var fromCol = colIndexes[j] + 1;
            var toCol = colIndexes[j+1];
            var data = line.slice(fromCol, toCol);
            data = _trim(data);
            result += data;
            
            if (j < colIndexes.length - 2)
                result += '\t';
        }
                
        if (i < lines.length - 1)
            result += '\n';
    }

    return result;
}

function isSepratorLine(line) {
    return line.indexOf(" ") == -1; // must not have spaces
}

function _trim(str) {
    var rgx = /^\s*(.*?)\s*$/;
    var result = str.match(rgx);
    return result[1];
}

function defValue(value, defaultValue) {
    return (typeof value === "undefined") ? defaultValue : value;
}

function _pad(text, length, char, align) {
    // align: r l or c
    char = defValue(char, " ");
    align = defValue(align, "l");
    var additionalChars = length - text.length;
    var result = "";
    switch (align) {
        case "r":
            result = _repeat(char, additionalChars) + text;
            break;
        case "l":
            result = text + _repeat(char, additionalChars);
            break;
        case "c":
            var leftSpaces = Math.floor(additionalChars / 2);
            var rightSpaces = additionalChars - leftSpaces;
            result = _repeat(char, leftSpaces) + text + _repeat(char,rightSpaces);
            break;
        default:
            assert(false);
            break;
    }
    return result;
}

function _repeat(str, num) {
    return new Array(num + 1).join(str);
}