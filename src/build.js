import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { direxists, readFile } from './lib/file.js';
import { indexTemplate, pagesTemplate } from './lib/html.js';
import { parseCSV } from './lib/parser.js';

const OUTPUT_DIR = './dist';
const INDEX = './data/index.json';

async function main() {

  // býr til dist möppu ef hún er ekki til
  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

  const results = [];

  const rawJSON = await readFile(INDEX);
  let JSONdata = JSON.parse(rawJSON);

  for (const data of JSONdata) {
    const title = data.title;
    const description = data.description;
    const csv = data.csv;
    const file = csv.slice(0, csv.indexOf('.'));
    const filename = `${file}.html`;

    let csvData = await readFile('./data/'+csv, { encoding: 'latin1' });
    let parsedCSV = parseCSV(csvData)

    const csvResults = []

    // Setur csv data í sér array
    for(let i = 0; i < (parsedCSV.length)-1; i++) {

      const numer = parsedCSV[i][0];
      const heiti = parsedCSV[i][1];
      const einingar = parsedCSV[i][2];
      const kennslumisseri = parsedCSV[i][3];
      const namsstig = parsedCSV[i][4];
      const link = parsedCSV[i][5];

      const csvResult = {
        numer,
        heiti,
        einingar,
        kennslumisseri,
        namsstig,
        link
      }
      csvResults.push(csvResult);
    }


    const result = {
      title,
      description,
      csv,
      filename
    }


    results.push(result);

    const filepath = join(OUTPUT_DIR, filename);
    const template = pagesTemplate(title, result, csvResults);

    await writeFile(filepath, template, { flag: 'w+' });

  }


  // býr til index.html
  const filepath = join(OUTPUT_DIR, 'index.html');
  const template = indexTemplate(results);

  await writeFile(filepath, template, { flag: 'w+' });
}

main().catch((err) => console.error(err));
