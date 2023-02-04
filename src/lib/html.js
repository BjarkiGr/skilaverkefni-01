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
    const list = csvResults.map(
      (csvResult) => `<tr>
      <td>${csvResult.numer}</td>
      <td><a class="table-item-link" href="${csvResult.link}">${csvResult.heiti}</a></td>
      <td>${csvResult.einingar}</td>
      <td>${csvResult.kennslumisseri}</td>
      <td>${csvResult.namsstig}</td>
      </tr>`
   );

    return `
    <h1 class="title">${result.title}</h1>
    <p class="description">${result.description}</p>
    <table>
    ${list}
    </table>
    <a class="button-content" href="/"><button>Til baka</button></a>
  `;

  }




  function index(results) {
    const list = results?.map(
      (result) => `
      <a class="list-item-link" href="${result.filename}"><li class="list-item">${result.title}</li></a>`
    )
    .join('\n');

  return `
  <h1 class="title">Okkar eigin kennsluskrá</h1>
  <ul class="list">${list}</ul>
`;
}

  export function indexTemplate(results) {
    return template('Kennsluskrá', index(results));
  }

  export function pagesTemplate(title, result, csvResults) {
    return template(title, pages(result, csvResults));
  }
