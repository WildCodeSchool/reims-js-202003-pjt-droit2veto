module.exports = (activities, user) => {
  let adress2 = '';
  if (user.address_of_establishment_2 !== null) {
    adress2 = `<li>${user.address_of_establishment_2}</li>`
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
        .logoActivity {
          height: 6vw;
          margin-right: 0.5rem;
        }
        .logoUser{
          height: 20vh;
          position: absolute;
          top: 10vh;
          right: 10vw;
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
              <h1>${user.establishment_name}</h1>
              <li>${user.address_of_establishment_1}</li>
              ${adress2}
              <li>${user.city}, ${user.postal_code}</li>
              <li>${user.telephone_of_the_establishment}</li>
              <li><img src="http://localhost:8000/${user.logo}" alt="logo" class="logoUser" /></li>
            </ul>
          </header>
            <h2>Les activités de la clinique</h2>
            <ul>${activities.reduce((acc, currentValue) => {
              return acc+'<li>'+`<img src="http://localhost:8000/${currentValue.logo}" alt="" class="logoActivity" />`+'<span class="title">'+currentValue.title+'</span><br><span class="description">'+currentValue.description+'</span></li><br><br>'
            }, '')}</ul>
          <footer>
            <ul>
              <p>${user.establishment_name}</p>
              <li>${user.address_of_establishment_1}</li>
              ${adress2}
              <li>${user.city}, ${user.postal_code}</li>
              <li>${user.telephone_of_the_establishment}</li>
              <li><img src="${user.logo}"/></li>
          </ul>
          </footer>
        </div>
      </body>
    </html>
  `
}