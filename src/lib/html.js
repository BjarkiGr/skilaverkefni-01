function template(title, content) {
    return `<!doctype html>
  <html lang="is">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <link rel="stylesheet" href="../public/styles.css">
    </head>
    <body>${content}</body>
  </html>`;
  }


  export function pages(result, csvResults) {
    const list = csvResults?.map(
      (csvResult) => `
  <p class="table-item">${csvResult.numer} ${csvResult.heiti} ${csvResult.einingar} ${csvResult.kennslumisseri} ${csvResult.namsstig}</p>`
    );

    return `
    <h1>${result.title}</h1>
    <div class="table">
    ${list}
    </div>
  `;

  }




  function index(results) {
    const list = results?.map(
      (result) => `
<li>
  <a href="${result.filename}">${result.title}</a>
</li>`
    )
    .join('\n');

  return `<section>
  <h1>Okkar eigin kennsluskrá</h1>
  <ul>${list}</ul>
</section>`;
}

  export function indexTemplate(results) {
    return template('Kennsluskrá', index(results));
  }

  export function pagesTemplate(title, result, csvResults) {
    return template(title, pages(result, csvResults));
  }
