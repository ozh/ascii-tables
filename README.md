ascii-tables
============

Quickly format table in ASCII. Great for code comments, or Github Markdown!

Play with it: http://ozh.github.io/ascii-tables/

### Input text like this

```
Col1	Col2	Col3
Value 1	Value 2	123
Separate	columns	with a tab or 4 spaces
This is a row with only one cell
```

Press **Create Table** to get something like:

### Ascii table
```
+----------------------------------+---------+------------------------+
|               Col1               |  Col2   |          Col3          |
+----------------------------------+---------+------------------------+
| Value 1                          | Value 2 | 123                    |
| Separate                         | columns | with a tab or 4 spaces |
| This is a row with only one cell |         |                        |
+----------------------------------+---------+------------------------+
```

### Unicode table
```
╔══════════════════════════════════╦═════════╦════════════════════════╗
║               Col1               ║  Col2   ║          Col3          ║
╠══════════════════════════════════╬═════════╬════════════════════════╣
║ Value 1                          ║ Value 2 ║ 123                    ║
║ Separate                         ║ columns ║ with a tab or 4 spaces ║
║ This is a row with only one cell ║         ║                        ║
╚══════════════════════════════════╩═════════╩════════════════════════╝
```

### Github Markdown table
```
|               Col1               |  Col2   |          Col3          |
|----------------------------------|---------|------------------------|
| Value 1                          | Value 2 | 123                    |
| Separate                         | columns | with a tab or 4 spaces |
| This is a row with only one cell |         |                        |
```

### Or even a boring html &lt;table>



