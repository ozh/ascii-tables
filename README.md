ascii-tables
============

Quickly format tables in ASCII. Great for code comments, or Github Markdown!

Play with it: https://ozh.github.io/ascii-tables/

### Input text like this

```
Col1	Col2	Col3	Numeric Column
Value 1	Value 2	123	10.0
Separate	cols    with a tab or 4 spaces	-2,027.1
This is a row with only one cell
```

Press **Create Table** to get something like:

### ASCII table (mysql style)
```
+----------------------------------+---------+------------------------+----------------+
|               Col1               |  Col2   |          Col3          | Numeric Column |
+----------------------------------+---------+------------------------+----------------+
| Value 1                          | Value 2 | 123                    |           10.0 |
| Separate                         | cols    | with a tab or 4 spaces |       -2,027.1 |
| This is a row with only one cell |         |                        |                |
+----------------------------------+---------+------------------------+----------------+
```

### ASCII table (separated style)
```
+==================================+=========+========================+================+
|               Col1               |  Col2   |          Col3          | Numeric Column |
+==================================+=========+========================+================+
| Value 1                          | Value 2 | 123                    |           10.0 |
+----------------------------------+---------+------------------------+----------------+
| Separate                         | cols    | with a tab or 4 spaces |       -2,027.1 |
+----------------------------------+---------+------------------------+----------------+
| This is a row with only one cell |         |                        |                |
+----------------------------------+---------+------------------------+----------------+
```

### ASCII table (compact style)
```
                Col1                  Col2              Col3            Numeric Column  
 ---------------------------------- --------- ------------------------ ---------------- 
  Value 1                            Value 2   123                                10.0  
  Separate                           cols      with a tab or 4 spaces         -2,027.1  
  This is a row with only one cell                                                      
```

### ASCII table (Github Markdown style)
```
|               Col1               |  Col2   |          Col3          | Numeric Column |
|----------------------------------|---------|------------------------|----------------|
| Value 1                          | Value 2 | 123                    |           10.0 |
| Separate                         | cols    | with a tab or 4 spaces |       -2,027.1 |
| This is a row with only one cell |         |                        |                |
```

### ASCII table (Reddit Markdown style)
```
               Col1               |  Col2   |          Col3          | Numeric Column 
----------------------------------|---------|------------------------|----------------
 Value 1                          | Value 2 | 123                    |           10.0 
 Separate                         | cols    | with a tab or 4 spaces |       -2,027.1 
 This is a row with only one cell |         |                        |                
```

### ASCII table ([reStructuredText](http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html#tables) Grid style)
```
+----------------------------------+---------+------------------------+----------------+
|               Col1               |  Col2   |          Col3          | Numeric Column |
+==================================+=========+========================+================+
| Value 1                          | Value 2 | 123                    |           10.0 |
| Separate                         | cols    | with a tab or 4 spaces |       -2,027.1 |
| This is a row with only one cell |         |                        |                |
+----------------------------------+---------+------------------------+----------------+
```

### ASCII table ([reStructuredText](http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html#tables) Simple style)
```
 ================================== ========= ======================== ================ 
                Col1                  Col2              Col3            Numeric Column  
 ================================== ========= ======================== ================ 
  Value 1                            Value 2   123                                10.0  
  Separate                           cols      with a tab or 4 spaces         -2,027.1  
  This is a row with only one cell                                                      
 ================================== ========= ======================== ================ 
```

### ASCII table (Jira style)
```
|| Col1                             || Col2    || Col3                   || Numeric Column ||
|  Value 1                          |  Value 2 |  123                    |  10.0           | 
|  Separate                         |  cols    |  with a tab or 4 spaces |  -2,027.1       | 
|  This is a row with only one cell |          |                         |                 | 
```

### ASCII table (rounded style)
```
.----------------------------------.---------.------------------------.----------------.
|               Col1               |  Col2   |          Col3          | Numeric Column |
:----------------------------------+---------+------------------------+----------------:
| Value 1                          | Value 2 | 123                    |           10.0 |
:----------------------------------+---------+------------------------+----------------:
| Separate                         | cols    | with a tab or 4 spaces |       -2,027.1 |
:----------------------------------+---------+------------------------+----------------:
| This is a row with only one cell |         |                        |                |
'----------------------------------'---------'------------------------'----------------'
```

### ASCII table (bubbles style)
```
 o88888888888888888888888888888888888(_)888888888(_)888888888888888888888888(_)88888888888888888o 
(_)               Col1               (_)  Col2   (_)          Col3          (_) Numeric Column (_)
(888888888888888888888888888888888888(_)888888888(_)888888888888888888888888(_)888888888888888888)
(_) Value 1                          (_) Value 2 (_) 123                    (_)           10.0 (_)
(_) Separate                         (_) cols    (_) with a tab or 4 spaces (_)       -2,027.1 (_)
(_) This is a row with only one cell (_)         (_)                        (_)                (_)
 O8oooooooooooooooooooooooooooooooooo(_)ooooooooo(_)oooooooooooooooooooooooo(_)oooooooooooooooo8O 
```

### ASCII table (girder style)
```
//==================================[]=========[]========================[]================\\
||               Col1               ||  Col2   ||          Col3          || Numeric Column ||
|]==================================[]=========[]========================[]================[|
|| Value 1                          || Value 2 || 123                    ||           10.0 ||
|| Separate                         || cols    || with a tab or 4 spaces ||       -2,027.1 ||
|| This is a row with only one cell ||         ||                        ||                ||
\\==================================[]=========[]========================[]================//
```

### ASCII table (dots style)
```
........................................................................................
:               Col1               :  Col2   :          Col3          : Numeric Column :
:..................................:.........:........................:................:
: Value 1                          : Value 2 : 123                    :           10.0 :
: Separate                         : cols    : with a tab or 4 spaces :       -2,027.1 :
: This is a row with only one cell :         :                        :                :
:..................................:.........:........................:................:
```

### Unicode table
```
╔══════════════════════════════════╦═════════╦════════════════════════╦════════════════╗
║               Col1               ║  Col2   ║          Col3          ║ Numeric Column ║
╠══════════════════════════════════╬═════════╬════════════════════════╬════════════════╣
║ Value 1                          ║ Value 2 ║ 123                    ║           10.0 ║
║ Separate                         ║ cols    ║ with a tab or 4 spaces ║       -2,027.1 ║
║ This is a row with only one cell ║         ║                        ║                ║
╚══════════════════════════════════╩═════════╩════════════════════════╩════════════════╝
```

### Unicode (single line) table
```
┌──────────────────────────────────┬─────────┬────────────────────────┬────────────────┐
│               Col1               │  Col2   │          Col3          │ Numeric Column │
├──────────────────────────────────┼─────────┼────────────────────────┼────────────────┤
│ Value 1                          │ Value 2 │ 123                    │           10.0 │
│ Separate                         │ cols    │ with a tab or 4 spaces │       -2,027.1 │
│ This is a row with only one cell │         │                        │                │
└──────────────────────────────────┴─────────┴────────────────────────┴────────────────┘
```

### Github Markdown table
```
|               Col1               |  Col2   |          Col3          | Numeric Column |
|----------------------------------|---------|------------------------|----------------|
| Value 1                          | Value 2 | 123                    |           10.0 |
| Separate                         | cols    | with a tab or 4 spaces |       -2,027.1 |
| This is a row with only one cell |         |                        |                |
```

### Jira table
```
||             Col1               ||  Col2  ||          Col3         || Numeric Column ||
| Value 1                          | Value 2 | 123                    |           10.0 |
| Separate                         | cols    | with a tab or 4 spaces |       -2,027.1 |
| This is a row with only one cell |         |                        |                |
```

### MediaWiki markup

```
{| class="wikitable"

! Col1
! Col2
! Col3
! Numeric Column
|-

| Value 1
| Value 2
| 123
| 10.0
|-

| Separate
| cols
| with a tab or 4 spaces
| -2,027.1
|-

| This is a row with only one cell
|
|
|
|}
```

### Or even a boring html &lt;table>

Leading characters can be added by selecting a comment style:

|    Style    |            Characters            |                Usage                 |
|-------------|----------------------------------|--------------------------------------|
| none        | ""                               | no comment style applied             |
| doubleslant | "// "                            | C++/C#/F#/Java/JavaScript/Rust/Swift |
| hash        | "# "                             | Perl/PowerShell/Python/R/Ruby        |
| doubledash  | "-- "                            | ada/AppleScript/Haskell/Lua/SQL      |
| percent     | "% "                             | MATLAB                               |
| singlespace | " " (1 space)                    | MediaWiki                            |
| quadspace   | " &nbsp;&nbsp;&nbsp;" (4 spaces) | reddit                               |
| singlequote | "' " (single quote)              | VBA                                  |
| rem         | "REM "                           | BASIC/DOS batch file                 |
| c           | "C "                             | Fortran IV                           |
| exclamation | "! "                             | Fortran 90                           |
| slantsplat  | "/* ... */ "                     | CSS                                  |
| xml         | "&lt;!-- ... --&gt;"             | XML                                  |

## License

WTFPL. Do whatever the hell you want with it.
