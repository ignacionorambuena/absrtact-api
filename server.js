const express = require("express");
const bodyParser = require('body-parser');
const { Client } = require('pg');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
});

client.connect();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS, PUT');
    next();
});

const recintoDeportivo = [{
        ID: 1,
        name: "Enesport",
        phone: "(56) 9 5021 1658",
        address: "Av J Manuel Guzmán R ",
        number: "1302",
        common: "Pudahuel",
        latLong: "-33.4312804,-70.7755772"
    },
    {
        ID: 2,
        name: "Mas Soccer",
        phone: "(56-2) 22397609",
        phone2: "(56-2) 22397394",
        address: "Castillo Urízar",
        number: "2463",
        common: "Macul",
        latLong: "-33.4775271,-70.6124869"
    },
    {
        ID: 3,
        name: "Cancha de Futbolito Don Manuel",
        phone: "(56) 9 9542 2622",
        address: "Av Senador J Guzmán",
        number: "144",
        common: "Isla de Maipo",
        latLong: "-33.7505065,-70.9080593"
    },
    {
        ID: 4,
        name: "Espacio Futbolito LTDA.",
        phone: "(56-2) 22397394",
        address: "Av Los Toros",
        number: "5321",
        common: "Puente Alto",
        latLong: "-33.567247,-70.561764",
        horarios: "Lunes a Sábado de 9:00 a 00:00hrs y Domingo de 9:00 a 23:00hrs.",
        website: "http://WWW.ESPACIOFUTBOLITO.CL",
        email: "contacto@espaciofutbolito.cl"
    },
    {
        ID: 5,
        name: "Deportes Alfe Limitada",
        phone: "(56) 9 9051 3234",
        address: "Av José Manuel Infante",
        number: "2013",
        common: "ÑUÑOA",
        latLong: "-33.4494336,-70.6206432"
    },
    {
        ID: 6,
        name: "Marbe S a",
        phone: " ",
        address: "Mons.Escrivá de B.",
        number: "12352",
        common: "Lo Barnechea",
        latLong: "no corresponde"
    },
    {
        ID: 7,
        name: "Club el Rancho Melipilla",
        phone: "(56) 9 9656 3895",
        phone2: "8324989",
        address: "Av Padre Demetrio Bravo ",
        number: " ",
        common: "Melipilla",
        latLong: "no corresponde"
    },
    {
        ID: 8,
        name: "Terrasoccer",
        phone: "56 2 2237 0967",
        phone2: "56 9 82683354",
        address: "Williams Rebolledo ",
        number: "1800",
        common: "ÑUÑOA",
        latLong: "-33.4718222,-70.6215581",
        horarios: "Lunes a Domingo de 9.00 a 23.00",
        website: "http://www.terrasoccer.cl/",
        email: "terra.soccer.nunoa@gmail.com"
    },
    {
        ID: 9,
        name: "Carlos encina",
        phone: " ",
        address: " ",
        number: " ",
        common: " ",
        latLong: " ",
        horarios: " ",
        website: "http://www.carlosencinas.cl/"
    },
    {
        ID: 10,
        name: "Club Futbol 7",
        phone: "02 8578251 (Mall Pza Sur)",
        address: "Serafín Zamora ",
        number: "127",
        common: "Santiago",
        latLong: "-33.5203164,-70.6011829",
        email: "mps@elclubfutbol7.cl"
    },
    {
        ID: 11,
        name: "Club Soccer",
        phone: "(56) 2 2237 9026",
        address: "Williams Rebolledo ",
        number: "1788",
        common: "Ñuñoa",
        latLong: "-33.4718421,-70.6222044",
        website: " "
    },
    {
        ID: 12,
        name: "Futbolito Maipu",
        phone: "(2) 2301 2491",
        address: "avenida tres poniente",
        number: "2600",
        common: "Maipu",
        latLong: "-33.5043206,-70.7824134",
        horarios: "Lunes a Domingo de 9.00 a 01.00",
        website: "https://bit.ly/2BMeEVT",
        email: "contacto@futbolitomaipu.cl"
    },
    {
        ID: 13,
        name: "Soccer Pro",
        phone: "(56) 2 2237 9026",
        address: "Francisco Meneses",
        number: "1580",
        common: "Ñuñoa",
        latLong: "-33.4715762,-70.6196143",
        horarios: " ",
        website: "http://www.soccerpro.cl"
    },
    {
        ID: 14,
        name: "Club Pato Cornejo",
        phone: "988087925",
        phone2: "2217-2031 / 2217-3071",
        address: " ",
        number: " ",
        common: " ",
        latLong: " ",
        horarios: "Lunes a Viernes 10:00 a 23:00hrs Sábado 10:00 a 20:00hrs Domingo 9:00 a 14:00hrs",
        website: "http://www.clubpatocornejo.cl",
        email: "info@clubpatocornejo.cl"
    },
    {
        ID: 15,
        name: "Centro Deportivo Bollenar",
        phone: "(56) 9 7369 8931",
        address: "Las Culebras Verdes",
        number: "1",
        common: "MELIPILLA",
        latLong: "-33.5671828,-71.2141779"
    },
    {
        ID: 16,
        name: "Pro Club",
        phone: "232167826",
        address: "Av La Montaña ",
        number: "11",
        common: "Lampa",
        latLong: "-33.3266442,-70.7559236",
        website: "http://www.proclub.cl"
    },
    {
        ID: 17,
        name: "Complejo Deportivo Don Oscar",
        phone: "979288480",
        address: "Av Los Pajaritos ",
        number: "4155",
        common: "Maipu",
        latLong: "-33.4861848,-70.7493336",
        website: "http://www.donoscar.cl"
    },
    {
        ID: 18,
        name: "Canchas Futbolito las Palmeras de Albano",
        phone: "23129530",
        address: "AV. fernandez albano ",
        number: "200",
        common: "La cisterna",
        latLong: "-33.5238911,-70.6595479"
    },
    {
        ID: 19,
        name: "Jardin Vivero Bora Bora",
        phone: "24191686",
        address: "Av Camilo Henríquez ",
        number: "3527",
        common: "Puente alto",
        latLong: "-33.567983,-70.5556128",
        website: "http://www.borafutbol.cl"
    },
    {
        ID: 20,
        name: "Soccer Arena S.A.",
        phone: "56974974295",
        phone2: "2 2267 8810",
        address: "Av José Joaquín Prieto Vial ",
        number: "7600",
        common: "La Cisterna",
        latLong: "-33.5222891,-70.6784592",
        horarios: "Lunes a Domingo de 9.00 a 00.00",
        website: "http://www.soccerarena.cl",
        email: "reservas@soccerarena.cl"
    },
    {
        ID: 21,
        name: "Sierra 10",
        phone: "9 8846 4828",
        address: "Lo Blanco",
        number: "2795",
        common: "La pintana",
        latLong: "-33.5733763,-70.7122723",
        website: " "
    },
    {
        ID: 22,
        name: "Cristo Salva Arriendo de Canchas",
        phone: "222389813",
        address: "av. Macul",
        number: "2645",
        common: "Macul",
        latLong: "-33.4789017,-70.6013945"
    },
    {
        ID: 23,
        name: "Cancha Futbolito Diagonal Oriente",
        phone: "224469222",
        address: "Diagonal Oriente",
        number: "1696",
        common: "Providencia",
        latLong: "-33.4457918,-70.6117942",
        horarios: "Lunes a Domingo de 8.00 a 22.00",
        website: "http://www.providencia.cl/centro-deportivo-diagonal-oriente"
    },
    {
        ID: 24,
        name: "Canchas Futbolito, PUC San Joaquín",
        phone: "223544738",
        address: " ",
        number: " ",
        common: "Macul",
        latLong: " "
    },
    {
        ID: 25,
        name: "Campo Deportivo Quilin Limitada",
        phone: "224808351",
        address: "av. Quilin",
        number: "2501",
        common: "macul",
        latLong: "-33.485392,-70.6102171",
        horarios: "Lunes a Viernes 09:00 a 22:00hrs Sábado, Domingo y Festivo 09:00 a 23:00hrs",
        website: "https://www.recrear.cl/web/campo-deportivo/"
    },
    {
        ID: 26,
        name: "Corporacion club de tenis estadio nacional",
        phone: "222370897",
        address: "Av. Grecia",
        number: "2001",
        common: "nuñoa",
        latLong: "-33.4625264,-70.6135749",
        horarios: "Martes a Viernes 08:00 a 21:30hrs Sábado 08:00 a 18:00hrs, Domingo 08:00 a 17:00hrs",
        website: "http://www.tenisnacional.cl/"
    },
    {
        ID: 27,
        name: "Complejo deportivo mundo Sport",
        phone: "227526650",
        address: "El libano",
        number: "5001",
        common: "macul",
        latLong: "-33.4967783,-70.5949198",
        website: "http://www.mundosport.cl/"
    },
    {
        ID: 28,
        name: "Canchas de Futbolito",
        phone: "950056406",
        address: "San Jose de la estrella",
        number: "777",
        common: "la florida",
        latLong: "-33.5531922,-70.5800035"
    },
    {
        ID: 29,
        name: "Los Cancheros",
        phone: "995418771",
        address: "Carlos Ossandon ",
        number: "40",
        common: "La reina",
        latLong: "-33.4498273,-70.5462111",
        website: "http://www.loscancheros.cl/"
    },
    {
        ID: 30,
        name: "Canchas Soto Aguilar",
        phone: "22543166",
        address: "Soto aguilar",
        number: "1509",
        common: "San Miguel",
        latLong: "-33.4858361,-70.6584653"
    },
    {
        ID: 31,
        name: "Club Palestino",
        phone: "222129451",
        address: "Kennedy",
        number: "9351",
        common: "Las Condes",
        latLong: "-33.3881484,-70.5454845",
        website: "http://clubpalestino.cl/",
        email: "info@clubpalestino.cl"
    },
    {
        ID: 32,
        name: "Canchas Soocer Pro Ñuñoa",
        phone: "973885078",
        address: "Francisco Meneses ",
        number: "1580",
        common: "Ñuñoa",
        latLong: "-33.4715807,-70.6196143",
        website: "http://soccerpro.cl/"
    },
    {
        ID: 33,
        name: "Canchas Parque Centenario",
        phone: " ",
        address: "Centenario",
        number: "2221",
        common: "Pedro Aguirre Cerda",
        latLong: "-33.4760409,-70.6718241",
        website: "http://www.cordesansantiago.cl/"
    },
    {
        ID: 34,
        name: "Terra soccer",
        phone: "222370967",
        phone2: "56982683354",
        address: "Williams Rebolledo ",
        number: "1800",
        common: "Ñuñoa",
        latLong: "-33.4718222,-70.6215581",
        website: "http://www.terrasoccer.cl/",
        email: "terra.soccer.nunoa@gmail.com"
    },
    {
        ID: 35,
        name: "Cancha de Futbolito",
        phone: "997904079",
        address: "Palena",
        number: "743",
        common: "Estacion central",
        latLong: "-33.4718754,-70.7092674"
    },
    {
        ID: 36,
        name: "Club Oriente",
        phone: "56223031232",
        phone2: "56223031216",
        address: "Nueva Bilbao",
        number: "9495",
        common: "Las condes",
        latLong: "-33.4292111,-70.5336402",
        website: "http://www.cluboriente.cl/",
        email: "contacto@canchasoriente.cl"
    },
    {
        ID: 37,
        name: "Massu Tenis",
        phone: "223406342",
        address: "Padre Hurtado sur",
        number: "2650",
        common: "Las condes",
        latLong: "-33.4299877,-70.5420937",
        website: "http://www.massutenis.com/"
    },
    {
        ID: 38,
        name: "Liga Amigos del Futbol",
        phone: "222988438",
        address: "Quilin",
        number: "8809",
        common: "peñalolen",
        latLong: "-33.5013425,-70.5466761",
        website: "http://www.laf.cl/"
    },
    {
        ID: 39,
        name: "Canchas Futbolito",
        phone: "987654321",
        address: "Covadonga ",
        number: "399",
        common: "La cisterna",
        latLong: "-33.5249657,-70.6562949"
    },
    {
        ID: 40,
        name: "Club de Tenis Tobalaba",
        phone: "223266595",
        address: " ",
        number: " ",
        common: "La Reina",
        latLong: " ",
        website: "http://www.canchasdetenis.cl/club-de-tenis-tobalaba-biomachine/"
    },
    {
        ID: 41,
        name: "Futbolito Greenland",
        phone: "56225955130",
        address: "Laguna del Maule",
        number: "392",
        common: "Estacion central",
        latLong: "-33.457361,-70.7255178",
        website: "http://futbolitogreenland.cl/",
        email: "contacto@futbolitogreenland.cl"
    },
    {
        ID: 42,
        name: "Canchas de Tenis PArque Brasil",
        phone: "222211238",
        address: "Punta Arenas ",
        number: "6711",
        common: "La Granja",
        latLong: "-33.5187546,-70.6156403",
        website: "https://www.municipalidadlagranja.cl/patrimonio/"
    },
    {
        ID: 43,
        name: "Soccer Pro Macul",
        phone: "975854238",
        address: "Castillo Urizar",
        number: "2463",
        common: "Macul",
        latLong: "-33.4775271,-70.6124923",
        website: "https://www.facebook.com/soccerpro.cl/"
    },
    {
        ID: 44,
        name: "Canchas Quimey",
        phone: "228416326",
        address: "Portales",
        number: "2744",
        common: "San Bernardo",
        latLong: "-33.623308,-70.7033946",
        website: "http://www.canchasquimey.cl/"
    },
    {
        ID: 45,
        name: "Pasco Club",
        phone: "982129614",
        address: "Cerro de Pasco",
        number: "1372",
        common: "Providencia",
        latLong: "-33.4420122,-70.5989744",
        website: "http://www.pascoclub.cl/"
    }
];

app.get('/tipoPartido', function(req, res) {
    client.query('SELECT * FROM tipoPartido;', (err, response) => {
        if (response !== undefined) {
            res.send(response.rows);
        } else {
            res.send('NO_DATA');
        }

    });
});

app.get('/recintoDeportivo', function(req, res) {
    res.send(recintoDeportivo);
});

app.get('/listaPartidos', function(req, res) {
    client.query('SELECT par.id as idPar, par.nombre, to_char(par.fecha, \'DD/MM/YYYY\') as fecha, par.hora, tp.nombre as tipopartido, tp.id as tipopartidoid FROM partido par LEFT JOIN tipoPartido tp ON tp.id=par.tipopartidoid;', (err, response) => {
        if (response !== undefined) {
            res.send(response.rows);
        } else {
            res.send('NO_DATA');
        }
    });
});

app.get('/detallePartido/:id', function(req, res) {
    client.query('SELECT par.id, par.nombre, to_char(par.fecha, \'DD/MM/YYYY\') as fecha, par.hora, tp.nombre as tipopartido, tp.id as tipopartidoid, par.recintodeportivoid as recinto FROM partido par LEFT JOIN tipoPartido tp ON tp.id = par.tipopartidoid WHERE par.id = ' + req.params.id + ';', (err, response) => {
        if (response !== undefined) {
            let det = response.rows[0];
            let rec = { detalle: det, recinto: recintoDeportivo.find(x => x.ID == det.recinto) };
            res.send(rec);
        } else {
            res.send('NO_DATA');
        }
    });
});

app.post('/insertarEvento', function(req, res) {
    const body = req.body;
    const text = 'INSERT INTO partido (nombre, tipopartidoid, recintodeportivoid, fecha, hora) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [body.name, body.tipoPartido, body.recintoDeportivo, body.date, body.hour];

    client.query(text, values, (err, response) => {
        if (err) {
            res.send(err.stack);
        } else {
            res.send(response.rows[0]);
        }

    });
});

app.delete('/deleteEvento/:id', function(req, res) {
    client.query('DELETE FROM partido WHERE id =' + req.params.id + '; DELETE FROM invitado WHERE idpartido = ' + req.params.id + ';', (err, response) => {
        if (response !== undefined) {
            res.send('ELIMINADO');
        } else {
            res.send('NO_DATA');
        }
    });
});

//Invitado
app.get('/listadoInvitados/:id', function(req, res) {
    client.query('SELECT inv.*, par.tipopartidoid as tipo FROM invitado inv LEFT JOIN partido par ON par.id = inv.idpartido WHERE inv.idpartido =' + req.params.id + ';', (err, response) => {
        if (response !== undefined) {
            res.send(response.rows);
        } else {
            res.send('NO_DATA');
        }
    });
});

app.post('/insertarInvitado', function(req, res) {
    const body = req.body;

    const text = 'INSERT INTO invitado (idpartido, nombre, estado) VALUES($1, $2, $3) RETURNING *';
    const values = [body.idpartido, body.nombre, 0];

    client.query(text, values, (err, response) => {
        if (err) {
            res.send(err.stack);
        } else {
            res.send(response.rows[0]);
        }

    });
});

app.delete('/deleteInvitado/:id', function(req, res) {
    client.query('DELETE FROM invitado WHERE id =' + req.params.id + ' RETURNING *;', (err, response) => {
        if (response !== undefined) {
            res.send(response.rows);
        } else {
            res.send('NO_DATA');
        }
    });
});

app.put('/confirmarInvitado/:id', function(req, res) {
    client.query('UPDATE invitado SET estado=1 WHERE id =' + req.params.id + ' RETURNING *;', (err, response) => {
        if (response !== undefined) {
            res.send(response.rows);
        } else {
            res.send('NO_DATA');
        }
    });
});

app.put('/rechazarInvitado/:id', function(req, res) {
    client.query('UPDATE invitado SET estado=2 WHERE id =' + req.params.id + ' RETURNING *;', (err, response) => {
        if (response !== undefined) {
            res.send(response.rows);
        } else {
            res.send('NO_DATA');
        }
    });
});

var server = app.listen(process.env.PORT || 4000, function() {
    console.log('Abstract is comming ...');
});