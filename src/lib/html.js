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


  export function pages(result) {

    return `<article>
    <h2>${result.title}</h2>
      <p>${result.description}</p>
    <p><a href="/">Til baka</a></p>
  </article>`;
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

  export function pagesTemplate(title, result) {
    return template(title, pages(result));
  }
