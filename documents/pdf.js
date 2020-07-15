module.exports = (activities, user) => {
  let adress2 = '';
  if (user[0].address_of_establishment_2 !== null) {
    adress2 = `<li>${user[0].address_of_establishment_2}</li>`
  }
  return`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Droit2Veto pdf</title>
        <style>        
        html, body {
          height: 100%;
          margin: 0; padding: 0;
        }
        body {
          display : table;
          width: 100%;
          position: relative;
        }
        header {
          background-color: #003366;
          color: white;
          padding: 0.5rem;
          text-align: center;
        }
        h1 {
          font-size: 1.3rem;
        }
        h2 {
          font-size: 1rem;
          margin-left: 1rem;
          font-weight: bold;
        }
        li {
          list-style-type: none;
        }
        .title {
          color: #003366;
          font-size: 0.8rem;
        }
        .description {
          font-size: 0.6rem;
        }
        footer {
          background-color: #003366;
          color: white;
          font-size: 0.6rem;
          padding: 0.5rem;
          text-align: center;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }
        </style>
      </head>
      <body>
        <div>
          <header>
            <ul>
              <h1>${user[0].establishment_name}</h1>
              <li>${user[0].address_of_establishment_1}</li>
              ${adress2}
              <li>${user[0].city}, ${user[0].postal_code}</li>
              <li>${user[0].telephone_of_the_establishment}</li>
              <li><img src="${user[0].logo}"/></li>
            </ul>
          </header>
            <h2>Les activités de la clinique</h2>
            <ul>${activities.reduce((acc, currentValue) => {
              return acc+'<li><span class="title">'+currentValue.title+'</span><br><span class="description">'+currentValue.description+'</span></li><br><br>'
            }, '')}</ul>
          <footer>
            <ul>
              <p>${user[0].establishment_name}</p>
              <li>${user[0].address_of_establishment_1}</li>
              ${adress2}
              <li>${user[0].city}, ${user[0].postal_code}</li>
              <li>${user[0].telephone_of_the_establishment}</li>
              <li><img src="${user[0].logo}"/></li>
          </ul>
          </footer>
        </div>
      </body>
    </html>
  `
}