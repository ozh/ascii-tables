
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
    var hdV, hdH;
    var spV, spH;

    var headerStyle = $('#hdr-style').val();
    var autoFormat = $('#auto-format').is(':checked');
    var hasHeaders = headerStyle == "top";
    var spreadSheetStyle = headerStyle == "ssheet";
    var input = $('#input').val();
    var separator = $('#separator').val();
    var commenting = $('#commenting').val();

    if (separator == "") {
        //Default separator is the tab
        separator = "\t";
    }

    var rows = input.split(/[\r\n]+/);
    if (rows[rows.length - 1] == "") {
        // extraneous last row, so delete it
        rows.pop();
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
    for (var i = 0; i < rows.length; i++) {
        if (separator == "\t") {
            rows[i] = rows[i].replace(/(    )/g, "\t");
        } else {
            //Tab is not the separator, replace tabs with single characters to keep correct spacing
            rows[i] = rows[i].replace(/\t/g, "    ");
        }
        var cols = rows[i].split(separator);
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
                } else if (isNumberCol[j] && !data.match(/^(\s*-?(\d|,| |[.])*\s*)$/)) { //number can be negative, comma/period-separated, or decimal
                    isNumberCol[j] = false;
                }
            }
            if (isNewCol || colLengths[j] < data.length) {
               colLengths[j] = data.length;
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
            letterRow += separator + String.fromCharCode(asciiVal);
        }
        rows.splice(0, 0, letterRow); // add as first row
    }

    var style = $('#style').val();
    var hasHeaderSeparators = true; // Defaults to including a separator line btwn header and data rows
    var hasLineSeparators = false; // Defaults to no separator lines btwn data rows
    var hasTopLine = true; // Defaults to including the topmost line
    var hasBottomLine = true; // Defaults to including the bottom-most line
    var hasLeftSide = true; // Defaults to including the left side line
    var hasRightSide = true; // Defaults to including the right side line
    var topLineUsesBodySeparators = false; // Defaults to top line uses the same separators as the line between header and body
    var align; // Default alignment: left-aligned

    // Add comment/remark indicators for use in code":
    commentbefore = "";
    commentafter  = "";
    prefix = "";
    suffix = "";
    switch (commenting) {
    case "none":
        break;
    case "doubleslant":
        // C++/C#/F#/Java/JavaScript/Rust/Swift
        prefix = "// ";
        break;
    case "hash":
        // Perl/PowerShell/Python/R/Ruby
        prefix = "# ";
        break;
    case "doubledash":
        // ada/AppleScript/Haskell/Lua/SQL
        prefix = "-- ";
        break;
    case "docblock":
        // PHPDoc, JSDoc, Javadoc
        commentbefore = "/**";
        commentafter  = " */";
        prefix = " * ";
        break;
    case "percent":
        // MATLAB
        prefix = "% ";
        break;
    case "singlespace":
        // mediawiki
        prefix = " ";
        break;
    case "quadspace":
        // reddit
        prefix = "    ";
        break;
    case "singlequote":
        // VBA
        prefix = "' ";
        break;
    case "rem":
        // BASIC/DOS batch file
        prefix = "REM ";
        break;
    case "c":
        // Fortran IV
        prefix = "C ";
        break;
    case "exclamation":
        // Fortran 90
        prefix = "! ";
        break;
    case "slantsplat":
        // CSS
        prefix = "/* ";
        suffix = " */";
        break;
    case "xml":
        // XML
        prefix = "<!-- ";
        suffix = " -->";
        break;
    case "pipe":
        prefix = "|";
        suffix = "|";
        break;
    default:
        break;
    }

    // Map of variable locations in the output:
    //
    // [cTL]   [hdH]  [cTM]   [hdH]  [cTR]
    // [hdV] Header 1 [hdV] Header 2 [hdV]
    // [cML]   [hdH]  [cMM]   [hdH]  [cMR]
    // [spV] Value 1  [spV] Value 2  [spV]
    // [cML]   [spH]  [cMM]   [spH]  [cMR]
    // [spV] Value 1a [spV] Value 2a [spV]
    // [cBL]   [spH]  [cBM]   [spH]  [cBR]

    switch (style) {
    case "mysql":
        // ascii mysql style
        cTL = "+"; cTM = "+"; cTR = "+";
        cML = "+"; cMM = "+"; cMR = "+";
        cBL = "+"; cBM = "+"; cBR = "+";

        hdV = "|"; hdH = "-";
        spV = "|"; spH = "-";
        break;
    case "separated":
        // ascii 2
        hasLineSeparators = true;
        cTL = "+"; cTM = "+"; cTR = "+";
        cML = "+"; cMM = "+"; cMR = "+";
        cBL = "+"; cBM = "+"; cBR = "+";

        hdV = "|"; hdH = "=";
        spV = "|"; spH = "-";
        break;
    case "compact":
        // ascii - compact
        hasTopLine = false;
        hasBottomLine = false;
        cML = " "; cMM = " "; cMR = " ";
        hdV = " "; hdH = "-";
        spV = " "; spH = "-";
        break;
    case "rounded":
        // ascii rounded style
        hasLineSeparators = true;
        cTL = "."; cTM = "."; cTR = ".";
        cML = ":"; cMM = "+"; cMR = ":";
        cBL = "'"; cBM = "'"; cBR = "'";

        hdV = "|"; hdH = "-";
        spV = "|"; spH = "-";
        break;
    case "girder":
        // ascii rounded style
        cTL = "//"; cTM = "[]"; cTR = "\\\\";
        cML = "|]"; cMM = "[]"; cMR = "[|";
        cBL = "\\\\"; cBM = "[]"; cBR = "//";

        hdV = "||"; hdH = "=";
        spV = "||"; spH = "=";
        break;
    case "bubbles":
        // ascii bubbled style
        cTL = " o8"; cTM = "(_)"; cTR = "8o ";
        cML = "(88"; cMM = "(_)"; cMR = "88)";
        cBL = " O8"; cBM = "(_)"; cBR = "8O ";

        hdV = "(_)"; hdH = "8";
        spV = "(_)"; spH = "o";
        break;
    case "dots":
        // ascii dotted style
        cTL = "."; cTM = "."; cTR = ".";
        cML = ":"; cMM = ":"; cMR = ":";
        cBL = ":"; cBM = ":"; cBR = ":";
        sL  = ":"; sM  = "."; sR  = ":";

        hdV = ":"; hdH = ".";
        spV = ":"; spH = ".";
        break;
    case "gfm":
        // github markdown
        hasTopLine = false;
        hasBottomLine = false;
        cTL = "|"; cTM = "|"; cTR = "|";
        cML = "|"; cMM = "|"; cMR = "|";
        cBL = "|"; cBM = "|"; cBR = "|";

        hdV = "|"; hdH = "-";
        spV = "|"; spH = "-";
        break;
    case "reddit":
        // reddit markdown
        hasTopLine = false;
        hasBottomLine = false;
        hasLeftSide = false;
        hasRightSide = false;
        cTL = " "; cTM = "|"; cTR = " ";
        cML = " "; cMM = "|"; cMR = " ";
        cBL = " "; cBM = "|"; cBR = " ";

        hdV = "|"; hdH = "-";
        spV = "|"; spH = "-";
        break;
    case "rstGrid":
        // reStructuredText Grid markup
        hasTopLine = true;
        topLineUsesBodySeparators = true;
        hasBottomLine = true;
        cTL = "+"; cTM = "+"; cTR = "+";
        cML = "+"; cMM = "+"; cMR = "+";
        cBL = "+"; cBM = "+"; cBR = "+";

        hdV = "|"; hdH = "=";
        spV = "|"; spH = "-";
        break;
    case "rstSimple":
        // reStructuredText Simple markup
        hasTopLine = true;
        hasBottomLine = true;
        cTL = " "; cTM = " "; cTR = " ";
        cML = " "; cMM = " "; cMR = " ";
        cBL = " "; cBM = " "; cBR = " ";

        hdV = " "; hdH = "=";
        spV = " "; spH = "=";
        break;
    case "jira":
        // jira markdown
        hasTopLine = false;
        hasBottomLine = false;
        autoFormat = false;
        hasHeaderSeparators = false;

        cTL = ""; cTM = ""; cTR = "";
        cML = ""; cMM = ""; cMR = "";
        cBL = ""; cBM = ""; cBR = "";

        hdV = "||"; hdH = "";
        spV = "| "; spH = "";
        break;
    case "mediawiki":
        // mediawiki
        hasLineSeparators = true;
        hasRightSide = false;
        autoFormat = false;
        align = "l";
        cTL = '{| class="wikitable"'; cTM = ""; cTR = "";
        cML = "|-"; cMM = ""; cMR = "";
        cBL = ""; cBM = ""; cBR = "|}";

        hdV = "\n!"; hdH = "";
        spV = "\n|"; spH = "";

        // also remove prefix/suffix:
        prefix = "";
        suffix = "";
        break;
    case "unicode":
        // unicode
        cTL = "\u2554"; cTM = "\u2566"; cTR = "\u2557";
        cML = "\u2560"; cMM = "\u256C"; cMR = "\u2563";
        cBL = "\u255A"; cBM = "\u2569"; cBR = "\u255D";

        hdV = "\u2551"; hdH = "\u2550";
        spV = "\u2551"; spH = "\u2550";
        break;
    case "unicode_single_line":
        // unicode one line thick border
        cTL = "\u250C"; cTM = "\u252C"; cTR = "\u2510";
        cML = "\u251C"; cMM = "\u253C"; cMR = "\u2524";
        cBL = "\u2514"; cBM = "\u2534"; cBR = "\u2518";

        hdV = "\u2502"; hdH = "\u2500";
        spV = "\u2502"; spH = "\u2500";
        break;
    case "html":
        outputAsNormalTable(rows, hasHeaders, colLengths, separator);
        return;
    default:
        break;
    }

    // output the text
    var output = "";

    // echo comment wrapper if any
    output += commentbefore + "\n";

    // output the top most row
    // Ex: +---+---+
    if (hasTopLine ) {
        if (topLineUsesBodySeparators || !hasHeaders) {
            topLineHorizontal = spH;
        } else {
            topLineHorizontal = hdH;
        }
        output += getSeparatorRow(colLengths, cTL, cTM, cTR, topLineHorizontal, prefix, suffix)
    }

    for (var i = 0; i < rows.length; i++) {
        // Separator Rows
        if (hasHeaders && hasHeaderSeparators && i == 1 ) {
            // output the header separator row
            output += getSeparatorRow(colLengths, cML, cMM, cMR, hdH, prefix, suffix)
        } else if ( hasLineSeparators && i < rows.length ) {
            // output line separators
            if( ( !hasHeaders && i >= 1 ) || ( hasHeaders && i > 1 ) ) {
                output += getSeparatorRow(colLengths, cML, cMM, cMR, spH, prefix, suffix)
            }
        }

        for (var j = 0; j <= colLengths.length; j++) {
            // output the data
            if (j == 0) {
                output += prefix;
            }
            var cols = rows[i].split(separator);
            var data = cols[j] || "";
            if (autoFormat) {
                if (hasHeaders && i == 0) {
                    align = "c";
                } else if (isNumberCol[j]) {
                    align = "r";
                } else {
                    align = "l";
                }
            }
            if (hasHeaders && i == 0 ) {
                verticalBar = hdV;
            } else {
                verticalBar = spV;
            }
            if ( j < colLengths.length ) {
                data = _pad(data, colLengths[j], " ", align);
                if (j == 0 && !hasLeftSide) {
                    output += "  " + data + " ";
                } else {
                    output += verticalBar + " " + data + " ";
                }
            } else if (hasRightSide) {
                output += verticalBar + suffix + "\n";
            } else {
                output += suffix + "\n";
            }

        }
    }

    // output the bottom line
    // Ex: +---+---+
    if (hasBottomLine ) {
        output += getSeparatorRow(colLengths, cBL, cBM, cBR, spH, prefix, suffix)
    }

    // echo comment wrapper if any
    output += commentafter + "\n";

    $('#output').val(output);
    $('#outputText').show();
    $('#outputTbl').hide();
}

function getSeparatorRow(lengths, left, middle, right, horizontal, prefix, suffix) {
    rowOutput = prefix;
    for (var j = 0; j <= lengths.length; j++) {
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

function copyOutputToClipboard() {
    const output = $('#output').val();
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(output).catch(e => console.error('Cannot write to clipboard', e));
    } else {
        const tmp = $('<textarea>');
        $('body').append(tmp);
        tmp.val(output).select();
        document.execCommand('copy');
        tmp.remove();
    }
}
