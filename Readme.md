# BC3formatter

A package to read BC3 files in Javascript to parse and convert them to JSON.

## Installation

```bash
npm install bc3formatter
```

## Usage

```typescript
import { parseBC3 } from 'bc3formatter';

// Only accepts a buffer, use validateBC3File to check if the file is a BC3 file
const bc3Data = parseBC3(fileBuffer);
```

## License

MIT © [Lifo123](https://github.com/Lifo123)
