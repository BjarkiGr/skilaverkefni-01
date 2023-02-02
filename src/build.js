import { mkdir, writeFile } from 'fs/promises';
import path, { join } from 'path';
import { direxists, readFile, readFilesFromDir } from './lib/file.js';
import { indexTemplate, pagesTemplate } from './lib/html.js';

const DATA_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
  // Búa til `./dist` ef ekki til
  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

  const dataFiles = await readFilesFromDir(DATA_DIR);
  const results = [];


  for (const file of dataFiles) {
    // eslint-disable-next-line no-await-in-loop
    const content = await readFile(file);

    if (content) {
      const title = path.basename(file, '.csv');
      const filename = `${title}.html`;

      const result = {
        title,
        filename,
      };

      results.push(result);

      const filepath = join(OUTPUT_DIR, filename);
      const template = pagesTemplate(title, result);

      // eslint-disable-next-line no-await-in-loop
      await writeFile(filepath, template, { flag: 'w+' });
    }
  }

  const filepath = join(OUTPUT_DIR, 'index.html');
  const template = indexTemplate(results);

  await writeFile(filepath, template, { flag: 'w+' });
}

main().catch((err) => console.error(err));
