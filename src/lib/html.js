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
    `<table>`
    const listing = csvResults?.map(
      (csvResult) => `
  <tr>
    <td>${csvResult.numer}</td>
    <td>${csvResult.heiti}</td>
    <td>${csvResult.einingar}</td>
    <td>${csvResult.kennslumisseri}</td>
    <td>${csvResult.namsstig}</td>
  </tr>
  `
    )
    .join('\n');
    `</table>
    <article>
    <h2>${result.title}</h2>
      <p>${result.description}</p>
    <p><a href="/">Til baka</a></p>
  </article>`;

return `<section>
<h1>Okkar eigin kennsluskrá</h1>
<ul>${listing}</ul>
</section>`;

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
