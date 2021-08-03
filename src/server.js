import express, { json } from 'express';
import path from 'path';
import hbs from 'hbs';
import airdata from './utils/airdata';
import bodyParser from 'body-parser';
const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8002;
const __dirname = path.resolve();
const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

app.use(express.static(publicDirectoryPath));
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});

app.get('/', (req, res) => {
    res.render('index', {
        제목: '대기 오염 정보알림이',
    })
});
app.post('/air', (req, res) => {
    airdata(req.body.location, (error, { air } = {}) => {
        if (error) {
            return res.send({ error });
        }
        // console.log(air.response.body.items);
        let data = []
        air.response.body.items.map(item => {
            console.log(item.sidoName)
            data.push({
                location: item.sidoName,
                time: item.dataTime,
                stationName: item.stationName,
                coValue: item.coValue,
                o3Value: item.o3Value,
                pm10: item.pm10Value,
                pm25: item.pm25Value
            })
        });
        console.log(data);
        return res.render('air', {data:data});
    })
});

