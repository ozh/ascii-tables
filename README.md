ascii-tables
============

Quickly format tables in ASCII. Great for code comments, or Github Markdown!

Play with it: http://ozh.github.io/ascii-tables/

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

### reStructuredText table
```
 ================================== ========= ======================== ================ 
                Col1                  Col2              Col3            Numeric Column  
 ================================== ========= ======================== ================ 
  Value 1                            Value 2   123                                10.0  
  Separate                           cols      with a tab or 4 spaces         -2,027.1  
  This is a row with only one cell                                                      
 ================================== ========= ======================== ================ 
```
### Wikimedia markup

### Or even a boring html &lt;table>




