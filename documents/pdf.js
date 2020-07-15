module.exports = (results) => {
  return`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Droit2Veto pdf</title>
        <style>
        h1 {
          color: red;
        }
        </style>
      </head>
      <body>
        <div>
          <h1>Mes activités</h1>
          <ul>${results.reduce((acc, currentValue) => {
            return acc+'<li>'+currentValue.title+','+currentValue.description+'</li>'
          }, '')}</ul>
        </div>
      </body>
    </html>
  `
}