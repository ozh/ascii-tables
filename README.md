# ascii-tables

Quickly format tables in plain tables.

New UI by Luan Daros.

Play with it: https://ldaros.github.io/ascii-tables/

### Input text like this

```
Col1	Col2	Col3	Numeric Column
Value 1	Value 2	123	10.0
Separate	cols    with a tab or 4 spaces	-2,027.1
This is a row with only one cell
```

Press **Create Table** to get something like:

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

## License

Forked from https://github.com/ozh/ascii-tables

WTFPL. Do whatever you want with it.
