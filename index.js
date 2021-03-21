const express = require('express')
const got = require('got');
const cors = require('cors');
const app = express()
const port = 8080

//var corsOptions = {
//    origin: 'https://hackappatoi.github.io/',
//    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//}

var hackappatoi_id = 140428;

app.get('/', cors(), (req, res) => {
    return res.status(200).send("Ciaone");
})

app.get('/results', cors(), (req, res) => {
    var today = new Date();
    var year = today.getFullYear();

    got('http://ctftime.org/api/v1/results/'+year+'/')
    .then(response => {
        
        var json_events_data = JSON.parse(response.body);
    
        var risultati = [];
    
        for (var event_id in json_events_data){
            for(var i=0; i<json_events_data[event_id].scores.length; i++){
                if(hackappatoi_id == json_events_data[event_id].scores[i].team_id){
                    var res_json = new Object();
    
                    // console.log('IO EROO QUIIIIIIII '+json_events_data[event_id].title);
    
                    res_json.event_id = event_id;
                    res_json.title = json_events_data[event_id].title;
                    res_json.place = json_events_data[event_id].scores[i].place;
                    res_json.points = json_events_data[event_id].scores[i].points;
    
                    risultati.push(res_json);
                }
            }
        }
        return res.status(200).json(risultati);
    })
    .catch(error => {
        console.log(error.response.body);
        return res.status(500).send('mmt');
    });
})

app.get('/pastresults', cors(), (req, res) => {
    var today = new Date();
    var year = today.getFullYear();

    got('http://ctftime.org/api/v1/results/'+(year-1)+'/')
    .then(response => {
        
        var json_events_data = JSON.parse(response.body);
    
        var risultati = [];
    
        for (var event_id in json_events_data){
            for(var i=0; i<json_events_data[event_id].scores.length; i++){
                if(hackappatoi_id == json_events_data[event_id].scores[i].team_id){
                    var res_json = new Object();
    
                    // console.log('IO EROO QUIIIIIIII '+json_events_data[event_id].title);
    
                    res_json.event_id = event_id;
                    res_json.title = json_events_data[event_id].title;
                    res_json.place = json_events_data[event_id].scores[i].place;
                    res_json.points = json_events_data[event_id].scores[i].points;
    
                    risultati.push(res_json);
                }
            }
        }
        return res.status(200).json(risultati);
    })
    .catch(error => {
        console.log(error.response.body);
        return res.status(500).send('mmt');
    });
})


app.get('/teamdata', cors(), (req, res) => {

    got('https://ctftime.org/api/v1/teams/140428/').then(response => {
        
        var json_events_data = JSON.parse(response.body);
        return res.status(200).json(json_events_data);
    }).catch(error => {
        console.log(error.response.body);
        return res.status(500).send('mmt');
    });

    
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})