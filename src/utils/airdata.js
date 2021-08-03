import axios from 'axios';
import convert from 'xml-js';
const serviceKey = 'AOoFSrZdwJ9lEQ%2BGmUHr2Uex%2F%2FWYLpyQCEZj%2FbI3uMwlpFPFw1j9DmjKI%2BibJ4de3%2F8buDaHSd%2BiZG3VlODbUQ%3D%3D';

const airdata = (sidoName, callback) => {
    const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?';
    var queryParams = encodeURIComponent('serviceKey') + '=' + serviceKey;
    // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1');
    // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent(sidoName);
    queryParams += '&' + encodeURIComponent('dataTerm') + '=' + encodeURIComponent('DAILY');
    queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json');
    queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.0');

    const resultUrl = url + queryParams;
    //console.log(resultUrl);
    const getApi = async() => {
        try{
            const json = await axios.get(resultUrl)
            //console.log(JSON.stringify(json.data));
            callback(undefined, {air:json.data})
            //console.log("json.data : " + json.data);   //
        }catch(error){
            console.log('error broke out', error)
        }
    }
    getApi().then(air => console.log(air));
};
export default airdata;