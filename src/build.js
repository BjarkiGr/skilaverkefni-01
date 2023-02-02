import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { direxists, readFile } from './lib/file.js';
import { indexTemplate, pagesTemplate } from './lib/html.js';

const DATA_DIR = './data/';
const OUTPUT_DIR = './dist';
const INDEX = './data/index.json';

async function main() {

  // býr til dist möppu ef hún er ekki til
  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

  const results = [];

  const rawdata = await readFile(INDEX);
  let JSONdata = JSON.parse(rawdata);

  for (const data of JSONdata) {
    const title = data.title;
    const description = data.description;
    const csv = data.csv;
    const file = csv.slice(0, csv.indexOf('.'));
    const filename = `${file}.html`;

    const result = {
      title,
      description,
      csv,
      filename
    }

    results.push(result);

    const filepath = join(OUTPUT_DIR, filename);
    const template = pagesTemplate(title, result);

    await writeFile(filepath, template, { flag: 'w+' });

  }


  // býr til index.html
  const filepath = join(OUTPUT_DIR, 'index.html');
  const template = indexTemplate(results);

  await writeFile(filepath, template, { flag: 'w+' });
}

main().catch((err) => console.error(err));
