
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

function getBorderStyle(style, prefix, suffix) {
    // get border style properties for a given style

    
    // Map of variable locations in the output:
    // 
    // [cTL]   [hdH]  [cTM]   [hdH]  [cTR]
    // [hdV] Header 1 [hdV] Header 2 [hdV]
    // [cML]   [hdH]  [cMM]   [hdH]  [cMR]
    // [spV] Value 1  [spV] Value 2  [spV]
    // [cML]   [spH]  [cMM]   [spH]  [cMR]
    // [spV] Value 1a [spV] Value 2a [spV]
    // [cBL]   [spH]  [cBM]   [spH]  [cBR]
    var borderStyle = {};
    borderStyle.prefix = prefix;
    borderStyle.suffix = suffix;
    // set defaults
    borderStyle.name = style;
    borderStyle.hasHeaderSeparators = true; // Defaults to including a separator line btwn header and data rows
    borderStyle.hasLineSeparators = false; // Defaults to no separator lines btwn data rows
    borderStyle.hasTopLine = true; // Defaults to including the topmost line
    borderStyle.hasBottomLine = true; // Defaults to including the bottom-most line
    borderStyle.hasLeftSide = true; // Defaults to including the left side line
    borderStyle.hasRightSide = true; // Defaults to including the right side line
    borderStyle.topLineUsesBodySeparators = false; // Defaults to top line uses the same separators as the line between header and body
    borderStyle.align = "";
    borderStyle.suppressCommenting = false;
    borderStyle.cTL = ""; borderStyle.cTM = ""; borderStyle.cTR = "";
    borderStyle.cML = ""; borderStyle.cMM = ""; borderStyle.cMR = "";
    borderStyle.cBL = ""; borderStyle.cBM = ""; borderStyle.cBR = "";

    borderStyle.hdV = ""; borderStyle.hdH = "";
    borderStyle.spV = ""; borderStyle.spH = "";
    
    switch (style) {
        case "mysql":
            // ascii mysql style
            borderStyle.cTL = "+"; borderStyle.cTM = "+"; borderStyle.cTR = "+";
            borderStyle.cML = "+"; borderStyle.cMM = "+"; borderStyle.cMR = "+";
            borderStyle.cBL = "+"; borderStyle.cBM = "+"; borderStyle.cBR = "+";
    
            borderStyle.hdV = "|"; borderStyle.hdH = "-"; 
            borderStyle.spV = "|"; borderStyle.spH = "-"; 
            break;
        case "separated":
            // ascii 2
            borderStyle.hasLineSeparators = true;
            borderStyle.cTL = "+"; borderStyle.cTM = "+"; borderStyle.cTR = "+";
            borderStyle.cML = "+"; borderStyle.cMM = "+"; borderStyle.cMR = "+";
            borderStyle.cBL = "+"; borderStyle.cBM = "+"; borderStyle.cBR = "+";
    
            borderStyle.hdV = "|"; borderStyle.hdH = "="; 
            borderStyle.spV = "|"; borderStyle.spH = "-"; 
            break;
        case "compact":
            // ascii - compact
            borderStyle.hasTopLine = false;
            borderStyle.hasBottomLine = false;
            borderStyle.cML = " "; borderStyle.cMM = " "; borderStyle.cMR = " ";
            borderStyle.hdV = " "; borderStyle.hdH = "-"; 
            borderStyle.spV = " "; borderStyle.spH = "-"; 
            break;
        case "rounded":
            // ascii rounded style
            borderStyle.hasLineSeparators = true;
            borderStyle.cTL = "."; borderStyle.cTM = "."; borderStyle.cTR = ".";
            borderStyle.cML = ":"; borderStyle.cMM = "+"; borderStyle.cMR = ":";
            borderStyle.cBL = "'"; borderStyle.cBM = "'"; borderStyle.cBR = "'";
    
            borderStyle.hdV = "|"; borderStyle.hdH = "-"; 
            borderStyle.spV = "|"; borderStyle.spH = "-"; 
            break;
        case "girder":
            // ascii rounded style
            borderStyle.cTL = "//"; borderStyle.cTM = "[]"; borderStyle.cTR = "\\\\";
            borderStyle.cML = "|]"; borderStyle.cMM = "[]"; borderStyle.cMR = "[|";
            borderStyle.cBL = "\\\\"; borderStyle.cBM = "[]"; borderStyle.cBR = "//";
    
            borderStyle.hdV = "||"; borderStyle.hdH = "="; 
            borderStyle.spV = "||"; borderStyle.spH = "="; 
            break;
        case "bubbles":
            // ascii bubbled style
            borderStyle.cTL = " o8"; borderStyle.cTM = "(_)"; borderStyle.cTR = "8o ";
            borderStyle.cML = "(88"; borderStyle.cMM = "(_)"; borderStyle.cMR = "88)";
            borderStyle.cBL = " O8"; borderStyle.cBM = "(_)"; borderStyle.cBR = "8O ";
    
            borderStyle.hdV = "(_)"; borderStyle.hdH = "8"; 
            borderStyle.spV = "(_)"; borderStyle.spH = "o"; 
            break;
        case "dots":
            // ascii dotted style
            borderStyle.cTL = "."; borderStyle.cTM = "."; borderStyle.cTR = ".";
            borderStyle.cML = ":"; borderStyle.cMM = ":"; borderStyle.cMR = ":";
            borderStyle.cBL = ":"; borderStyle.cBM = ":"; borderStyle.cBR = ":";
    
            borderStyle.hdV = ":"; borderStyle.hdH = "."; 
            borderStyle.spV = ":"; borderStyle.spH = "."; 
            break;
        case "gfm":
            // github markdown
            borderStyle.hasTopLine = false;
            borderStyle.hasBottomLine = false;
            borderStyle.cML = "|"; borderStyle.cMM = "|"; borderStyle.cMR = "|";
    
            borderStyle.hdV = "|"; borderStyle.hdH = "-"; 
            borderStyle.spV = "|"; borderStyle.spH = "-"; 
            break;
        case "reddit":
            // reddit markdown
            borderStyle.hasTopLine = false;
            borderStyle.hasBottomLine = false;
            borderStyle.hasLeftSide = false;
            borderStyle.hasRightSide = false;
            borderStyle.cML = " "; borderStyle.cMM = "|"; borderStyle.cMR = " ";
    
            borderStyle.hdV = "|"; borderStyle.hdH = "-"; 
            borderStyle.spV = "|"; borderStyle.spH = "-"; 
            break;
        case "rstGrid":
            // reStructuredText Grid markup
            topLineUsesBodySeparators = true;
            borderStyle.cTL = "+"; borderStyle.cTM = "+"; borderStyle.cTR = "+";
            borderStyle.cML = "+"; borderStyle.cMM = "+"; borderStyle.cMR = "+";
            borderStyle.cBL = "+"; borderStyle.cBM = "+"; borderStyle.cBR = "+";
    
            borderStyle.hdV = "|"; borderStyle.hdH = "="; 
            borderStyle.spV = "|"; borderStyle.spH = "-"; 
            break;
        case "rstSimple":
            // reStructuredText Simple markup
            borderStyle.cTL = " "; borderStyle.cTM = " "; borderStyle.cTR = " ";
            borderStyle.cML = " "; borderStyle.cMM = " "; borderStyle.cMR = " ";
            borderStyle.cBL = " "; borderStyle.cBM = " "; borderStyle.cBR = " ";
    
            borderStyle.hdV = " "; borderStyle.hdH = "="; 
            borderStyle.spV = " "; borderStyle.spH = "="; 
            break;
        case "jira":
            // jira markdown
            borderStyle.hasTopLine = false;
            borderStyle.hasBottomLine = false;
            borderStyle.autoFormat = false;
            borderStyle.hasHeaderSeparators = false;
    
            borderStyle.cTL = ""; borderStyle.cTM = ""; borderStyle.cTR = "";
            borderStyle.cML = ""; borderStyle.cMM = ""; borderStyle.cMR = "";
            borderStyle.cBL = ""; borderStyle.cBM = ""; borderStyle.cBR = "";
    
            borderStyle.hdV = "||"; borderStyle.hdH = ""; 
            borderStyle.spV = "| "; borderStyle.spH = ""; 
            break;
        case "wikim":
            // wikimedia
            borderStyle.hasLineSeparators = true;
            borderStyle.hasRightSide = false;
            borderStyle.autoFormat = false;
            borderStyle.align = "l";
            borderStyle.cTL = '{| class="wikitable"'; borderStyle.cTM = ""; borderStyle.cTR = "";
            borderStyle.cML = "|-"; borderStyle.cMM = ""; borderStyle.cMR = "";
            borderStyle.cBL = ""; borderStyle.cBM = ""; borderStyle.cBR = "|}";
    
            borderStyle.hdV = "\n!"; borderStyle.hdH = ""; 
            borderStyle.spV = "\n|"; borderStyle.spH = ""; 
            
            // also remove prefix/suffix:
            borderStyle.suppressCommenting = true;
            break;
        case "unicode":
            // unicode
            borderStyle.cTL = "\u2554"; borderStyle.cTM = "\u2566"; borderStyle.cTR = "\u2557";
            borderStyle.cML = "\u2560"; borderStyle.cMM = "\u256C"; borderStyle.cMR = "\u2563";
            borderStyle.cBL = "\u255A"; borderStyle.cBM = "\u2569"; borderStyle.cBR = "\u255D";
    
            borderStyle.hdV = "\u2551"; borderStyle.hdH = "\u2550"; 
            borderStyle.spV = "\u2551"; borderStyle.spH = "\u2550"; 
            break;
        case "unicode_single_line":
            // unicode one line thick border
            borderStyle.cTL = "\u250C"; borderStyle.cTM = "\u252C"; borderStyle.cTR = "\u2510";
            borderStyle.cML = "\u251C"; borderStyle.cMM = "\u253C"; borderStyle.cMR = "\u2524";
            borderStyle.cBL = "\u2514"; borderStyle.cBM = "\u2534"; borderStyle.cBR = "\u2518";
    
            borderStyle.hdV = "\u2502"; borderStyle.hdH = "\u2500";
            borderStyle.spV = "\u2502"; borderStyle.spH = "\u2500";
            break;
        default:
            break;
        }
        if (borderStyle.suppressCommenting) {
            borderStyle.prefix = "";
            borderStyle.suffix = "";
        }
    return borderStyle;
};

function getProperties(inputStyle, outputStyle, commenting) {
    // define style for prefix, suffix, and borders    

    var properties = {};

    // set defaults
    var prefix = "";
    var suffix = "";

    // Add comment/remark indicators for use in code
    commentingStyles = {
        none: {},
        doubleslant: {prefix: "// "}, // C++/C#/F#/Java/JavaScript/Swift
        hash: {prefix: "# "}, // Perl/PowerShell/Python/R/Ruby
        doubledash: {prefix: "-- "}, // ada/AppleScript/Haskell/Lua/SQL
        percent: {prefix: "% "}, // MATLAB
        singlespace: {prefix: " "}, // wikimedia
        quadspace: {prefix: "    "}, // reddit
        singlequote: {prefix: "' "}, // VBA
        rem: {prefix: "REM "}, // BASIC/DOS batch file/Shiny Happy People
        c: {prefix: "C "}, // Fortran IV
        exclamation: {prefix: "! "}, // Fortran 90 
        slantsplat: {prefix: "/* ", suffix: " */"}, // CSS 
        xml: {prefix: "<!-- ", suffix: " -->"} // XML
    }
    if ("prefix" in commentingStyles[commenting]) {
        prefix = commentingStyles[commenting].prefix;
    } 
    if ("suffix" in commentingStyles[commenting]) {
        suffix = commentingStyles[commenting].suffix;
    }
    
    properties.input = getBorderStyle(inputStyle, prefix, suffix);
    
    properties.output = getBorderStyle(outputStyle, prefix, suffix);

    return properties;
};

function stripRow(text, inputProperties) {
    // Strip a string of horizontal separators to identify separator rows
    propertiesToStrip = [inputProperties.cTL,
        inputProperties.cTM, 
        inputProperties.cTR, 
        inputProperties.cML,
        inputProperties.cMM, 
        inputProperties.cMR,
        inputProperties.cBL,
        inputProperties.cBM,
        inputProperties.cBR,
        inputProperties.hdH,
        inputProperties.spH,
        " "];
    for (var p = 0; p < propertiesToStrip.length; p++) {
        while (text.includes(propertiesToStrip[p]) && propertiesToStrip[p].length>0) {
            text = text.replace(propertiesToStrip[p], "");
        }
    }
    return text;
};

function trimEmptyRows(rows) {
    // Remove empty rows
    var trimmedRows = [];
    for (var i = 0; i < rows.length; i++) {
        if (rows[i] != "") {
            // Row has content, keep it
            trimmedRows.push(rows[i]);
        }
    }
    return trimmedRows
}

function transformInput(rows,inputStyle,separator) {
    // Remove horizontal separators
    var strippedRow;

    for (var i = 0; i < rows.length; i++) {
        if (inputStyle.name != "none") {
            strippedRow = stripRow(rows[i],inputStyle)
            if (strippedRow == "") {
                // This is a separator line, skip it
                rows[i] = ""
                continue;
            } else if (separator != " ") {
                // Trim off leading and trailing spaces
                // rows[i] = $.trim(rows[i]);
            }
            while ((inputStyle.spV != "" && rows[i].includes(inputStyle.spV)) || 
                   (inputStyle.hdV != "" && rows[i].includes(inputStyle.hdV)) ) {
                if (inputStyle.spV == separator || inputStyle.hdV == separator) {
                    // Infinite loop if the vertical separators are the same as the custom separator
                    break;
                }
                rows[i] = rows[i].replace(inputStyle.spV, separator).replace(inputStyle.hdV, separator);
            }
        }
    }
    return rows;
}

function autoDetectInputStyle(rows,separator) {
    // Cycle through styles to find best match
    var bestMatch;
    var bigN = 99999;
    var maxColumnCount = bigN;
    var maxRowCount = bigN;
    var testStyle;
    var testRows;
    var testColCount;
    var testRowCount;
    var colLengths;

    styles = ["mysql", "separated", "compact", "rounded", "girder",
     "bubbles", "dots", "gfm", "reddit", "rstGrid", "rstSimple",
     "jira", "wikim", "unicode", "unicode_single_line"];
     // in retrospect, could be better to define the styles and properties as a big array and just call each key
     // in case more get added later
     for (var s = 0; s < styles.length; s++) {
        testStyle = getBorderStyle(styles[s], "", "");
        testRows = transformInput(rows.slice(),testStyle,separator);

        // Count only the non-null rows
        testRows = trimEmptyRows(testRows);
        testRowCount = testRows.length;
        
        // Check column lengths to see which will be discarded
        testColCount = 0;
        colLengths = [];
        for (var i = 0; i < testRows.length; i++) {
            var cols = testRows[i].split(separator);
            for (var j = 0; j < cols.length; j++) {
                var data = _trim(cols[j]);
                var isNewCol = colLengths[j] == undefined;
                if (isNewCol || colLengths[j] < data.length) {
                    colLengths[j] = data.length;
                }
            }
        }

        // Count only the non-null columns
        for (var j = 0; j < colLengths.length; j++) {
            if (colLengths[j] != 0) {
                testColCount += 1;
            }
        }
        
        // Generally, the fewer cols and rows the better, but need more than 1 of each
        if (testRowCount <= maxRowCount
            && testRowCount > 1 
            && testColCount <= maxColumnCount 
            && testColCount > 1) {
            maxColumnCount = testColCount;
            maxRowCount = testRowCount;
            bestMatch = testStyle.name;
        }
     }

    return bestMatch;
}

function createTable() {
    // set up the style

    var headerStyle = $('#hdr-style').val();
    var autoFormat = $('#auto-format').is(':checked');
    var hasHeaders = headerStyle == "top";
    var spreadSheetStyle = headerStyle == "ssheet";
    var input = $('#input').val();
    var separator = $('#separator').val();
    var inputStyle = $('#inputStyle').val();
    var outputStyle = $('#outputStyle').val();
    var commenting = $('#commenting').val();
    var rows = input.split(/[\r\n]+/);
    rows = trimEmptyRows(rows)

    if (separator == "") {
        //Default separator is the tab
        separator = "\t";
    } 

    if (inputStyle == "auto") {
        inputStyle = autoDetectInputStyle(rows.slice(),separator);
    }
    properties = getProperties(inputStyle, outputStyle, commenting)

    if ("autoFormat" in properties.output) {
        autoFormat = properties.output.autoFormat
    }

    if (spreadSheetStyle) {
        hasHeaders = true;
        // add the row numbers
        for (var i = 0; i < rows.length; i++) {
            rows[i] = (i+1) + separator + rows[i];
        }
    }    

    // calculate the max size of each column
    var colLengths = [];
    var isNumberCol = [];
    rows = transformInput(rows,properties.input,separator);
    for (var i = 0; i < rows.length; i++) {
        
        if (separator == "\t") {
            if ( inputStyle == "none") {
                rows[i] = rows[i].replace(/(    )/g, "\t");
            }
        } else {
            //Tab is not the separator, replace tabs with single characters to keep correct spacing
            rows[i] = rows[i].replace(/\t/g, "    ");
        }
        var cols = rows[i].split(separator);
        for (var j = 0; j < cols.length; j++) {
            var data = _trim(cols[j]);
            var isNewCol = colLengths[j] == undefined;
            if (isNewCol) {
                isNumberCol[j] = true;
            }
            // keep track of which columns are numbers only
            if (autoFormat) {
                if (hasHeaders && i == 0 && !spreadSheetStyle) {
                    ; // a header is allowed to not be a number (exclude spreadsheet because the header hasn't been added yet
                } else if (isNumberCol[j] && !data.match(/^(\s*-?(\d|,| |[.])*\s*)$/)) { //number can be negative, comma/period-separated, or decimal
                    isNumberCol[j] = false;
                }
            }
            if (isNewCol || colLengths[j] < data.length) {
               colLengths[j] = data.length;
            }
        }
    }
    rows = trimEmptyRows(rows)

    if (spreadSheetStyle) {    
        // now that we have the number of columns, add the letters
        var colCount = colLengths.length;
        var letterRow = " "; // initial column will have a space
        for (var j = 0; j < colCount; j++) {
            var asciiVal = (65 + j);
            if (90 < asciiVal) {
                asciiVal = 90; // Z is the max column
            }
            letterRow += separator + String.fromCharCode(asciiVal);
        }
        rows.splice(0, 0, letterRow); // add as first row
    }

    if (outputStyle == "html") {
        outputAsNormalTable(rows, hasHeaders, colLengths, separator);
        return;
    }

    var align; // Default alignment: left-aligned
    align = properties.output.align;

    // output the text
    var output = "";
    
    // output the top most row
    // Ex: +---+---+
    if (properties.output.hasTopLine ) {
        if (properties.output.topLineUsesBodySeparators || !hasHeaders) {
            topLineHorizontal = properties.output.spH;
        } else {
            topLineHorizontal = properties.output.hdH;
        } 
        output += getSeparatorRow(colLengths, 
            properties.output.cTL, 
            properties.output.cTM, 
            properties.output.cTR, 
            topLineHorizontal, 
            properties.output.prefix, 
            properties.output.suffix)
    }

    for (var i = 0; i < rows.length; i++) {
        // Separator Rows
        if (hasHeaders && properties.output.hasHeaderSeparators && i == 1 ) { 
            // output the header separator row
            output += getSeparatorRow(colLengths, 
                properties.output.cML, 
                properties.output.cMM, 
                properties.output.cMR, 
                properties.output.hdH, 
                properties.output.prefix, 
                properties.output.suffix)
        } else if ( properties.output.hasLineSeparators && i < rows.length ) { 
            // output line separators
            if( ( !hasHeaders && i >= 1 ) || ( hasHeaders && i > 1 ) ) {
                output += getSeparatorRow(colLengths, 
                    properties.output.cML, 
                    properties.output.cMM, 
                    properties.output.cMR, 
                    properties.output.spH, 
                    properties.output.prefix, 
                    properties.output.suffix)
            }
        }

        for (var j = 0; j <= colLengths.length; j++) {
            // output the data
            
            if (colLengths[j] == 0) {
                // No data, skip this column
                continue
            }
            if (j == 0) {
                output += properties.output.prefix;
            }
            var cols = rows[i].split(separator);
            var data = _trim(cols[j] || "");
            if (autoFormat) {
                if (hasHeaders && i == 0) {
                    align = "c";
                } else if (isNumberCol[j]) {
                    align = "r";
                } else {
                    align = "l";
                }
            } else {
                align = "l";
            }
            if (hasHeaders && i == 0 ) { 
                verticalBar = properties.output.hdV;
            } else {
                verticalBar = properties.output.spV;
            }
            if ( j < colLengths.length ) {
                data = _pad(data, colLengths[j], " ", align);
                if (j == 0 && !properties.output.hasLeftSide) {
                    output += "  " + data + " ";
                } else {
                    output += verticalBar + " " + data + " ";
                }
            } else if (properties.output.hasRightSide) {
                output += verticalBar + properties.output.suffix + "\n";
            } else {
                output += properties.output.suffix + "\n";
            }

        }
    }
    
    // output the bottom line
    // Ex: +---+---+
    if (properties.output.hasBottomLine ) {
        output += getSeparatorRow(colLengths, 
            properties.output.cBL, 
            properties.output.cBM, 
            properties.output.cBR, 
            properties.output.spH, 
            properties.output.prefix, 
            properties.output.suffix)
    }

    $('#output').val(output);
    $('#outputText').show();
    $('#outputTbl').hide();
}

function getSeparatorRow(lengths, left, middle, right, horizontal, prefix, suffix) {
    rowOutput = prefix;
    for (var j = 0; j <= lengths.length; j++) {
        if (lengths[j] == 0) {
            // No data, skip this column
            continue;
        }
        if ( j == 0 ) {
            rowOutput += left + _repeat(horizontal, lengths[j] + 2);
        } else if ( j < lengths.length ) {
            rowOutput += middle + _repeat(horizontal, lengths[j] + 2);
        } else {
            rowOutput += right + suffix + "\n";
        }
    }
    return rowOutput;
};

function outputAsNormalTable(rows, hasHeaders, colLengths, separator) {
    var output = "";

    var $outputTable = $('<table border="1" cellpadding="1" cellspacing="1" align="center">');
    for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].split(separator);
        var tag = (hasHeaders && i == 0) ? "th" : "td";
        var $row = $('<tr>').appendTo($outputTable);
        for (var j = 0; j < colLengths.length; j++) {
            var data = _trim(cols[j] || " ");
            if (colLengths[j] > 0) {
                var $cell = $('<' + tag + '>').text(data);
                $row.append($cell);
            }
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
    var separator = $('#separator').val();
    
    if (separator == "") {
        //Default separator is the tab
        separator = "\t";
    } 
    
    var lines = table.split('\n');
    
    // discard separator lines
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (isSeparatorLine(line)) {
            lines.splice(i, 1); // only keep non-separator lines
            i -= 1; // array size changed, decrement index to match
        }
    }
    
    // http://stackoverflow.com/questions/6521245/finding-longest-string-in-array
    var copy_lines = lines.slice(0);
    var longest = copy_lines.sort(function (a, b) { return b.length - a.length; })[0];
    
    // Identify column separators
    var colIndexes = [];
    for (var j = 0; j < longest.length; j++) {
        if (isColumnSeparator(lines.slice(), j)) {
            colIndexes.push(j);
        }
    }
    
    if (colIndexes.length < 2) {
        alert("No results parsed. Whitespace is not yet parsable as a column separator.");
        return lines.join('\n');
    } else if (colIndexes.length >= longest.length) {
        alert("No results parsed. Single lines are not yet parsable.");
        return lines.join('\n');
    }
    
    alert("Parsed rows: " + lines.length + ", length: " + longest.length + ", column locations: " + colIndexes);
    
    // Loop over all items and extract the data
    var result = "";
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        for (var j = 0; j < colIndexes.length - 1; j++) {
            if (colIndexes[j+1] == colIndexes[j] + 1) {
                // adjecent columns, skip this column
                continue;
            }
            var fromCol = colIndexes[j] + 1;
            var toCol = colIndexes[j+1];
            var data = line.slice(fromCol, toCol);
            data = _trim(data);
            result += data;
            
            if (j < colIndexes.length - 2)
                result += separator;
        }
                
        if (i < lines.length - 1)
            result += '\n';
    }

    return result;
}

function isColumnSeparator(lines, column) {
    // Return true if this column is the same character all the way to the last row
    if (lines.length < 2) {
        // Last line in array, must be a valid separator
        return true;
    } else {
        var thisLine = lines[0];
        var nextLine = lines[1];
        if (column >= thisLine.length) {
            // Column is out of range, must not be a separator
            return false;
        }
        if (thisLine[column] == nextLine[column] && thisLine[column] != " ") {
            // Rows match, check next row down
            return isColumnSeparator(lines.splice(0,1), column);
        } else {
            // Rows are different, this is not a separator
            return false;
        }
    }
}

function isSeparatorLine(line) {
    return line.trim().indexOf(" ") == -1; // must not have spaces
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
