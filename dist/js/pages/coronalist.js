var coronadata = 
{
    init:function()
	{
        this.getDataList();
        this.getIndiaDataList();
        this.listHelpContact();
    },
    datedata:[],
    coronalist:"",
    dateselected:"",
    markupdata:[],
    worldconfirmedcount:"",
    worldrecoveredcount:"",
    worlddeathcount:"",
    indiatotalcount:"",
    indiaconfirmedcount:"",
    indiaconfirmedforeigncount:"",
    indiarecoveredcount:"",
    indiadeathcount:"",
    statelist:[],
    statecode:[],
    swapstate:[],
    swaprevstate:[],
    statedata:[],

    
    getDataList:function()
    {
        var _this = this;
        var ajaxresult = $.ajax({
            type:"GET",
            url:"https://raw.githubusercontent.com/datasets/covid-19/master/time-series-19-covid-combined.csv",
            dataType: "text", 
            success:function(data)
            {
                data = $.csv.toArrays(data);
                _this.worldconfirmedcount="";
                _this.worldrecoveredcount="";
                _this.worlddeathcount="";
                console.log(data);
                _this.coronalist = data;
                _this.renderMap(data);
            },
            error:function(error)
            {
                console.log(error);
            }
            
            
         });
    },
    renderMap:function(data)
    {
        var _this = this;


         

        //Get list by date wise\
        data.forEach(function(val)
        {
            //var date = val.time.split('T')[0];
            if (val[4] in _this.datedata) 
            {
                _this.datedata[val[4]].push(val);
            } else 
            {
                _this.datedata[val[4]] = new Array(val);
            }
        });

        console.log(_this.datedata);

        var currentdate = moment().add(-1, 'days').format("YYYY-MM-DD");
        if(_this.dateselected)
        {
            currentdate = _this.dateselected;
        }

        console.log(currentdate);

        if(!_this.datedata[currentdate])
        {
            currentdate = moment().add(-2, 'days').format("YYYY-MM-DD");
        }
        else
        {
            console.log('Data not found');
        }
       
        for(var i in _this.datedata[currentdate])
        {
           // console.log("Current date data"+currentdate);
           // console.log("WOrld confirmed before count"+_this.worldconfirmedcount);

           // console.log("WOrld recovered before count"+_this.worldrecoveredcount);
    
            //console.log("WOrld death before count"+_this.worlddeathcount);
            var state="";
            _this.worldconfirmedcount=Number(_this.worldconfirmedcount)+Number(_this.datedata[currentdate][i][5]);

            _this.worldrecoveredcount=Number(_this.worldrecoveredcount)+Number(_this.datedata[currentdate][i][6]);

            _this.worlddeathcount=Number(_this.worlddeathcount)+Number(_this.datedata[currentdate][i][7]);


            if(_this.datedata[currentdate][i][0] != "")
            {
               // console.log(_this.datedata[currentdate][i][0]);
                state = _this.datedata[currentdate][i][0];
            }
            var html = "</br>State:"+state+"</br>Confrimed cases:"+_this.datedata[currentdate][i][5]+"</br>Recoverd cases:"+_this.datedata[currentdate][i][6]+"</br>Death cases:"+_this.datedata[currentdate][i][7];
            _this.markupdata.push(html);
        }

        console.log("WOrld confirmed count"+_this.worldconfirmedcount);

        console.log("WOrld recovered count"+_this.worldrecoveredcount);

        console.log("WOrld death count"+_this.worlddeathcount);

        $('#world-map-markers').vectorMap({
            map: 'world_mill_en',
            normalizeFunction: 'polynomial',
            hoverOpacity: 0.7,
            hoverColor: true,
            backgroundColor: 'transparent',
            regionStyle: {
              initial: {
                /* fill: 'rgba(210, 214, 222, 1)',
                "fill-opacity": 1,
                stroke: '#ff0000',
                "stroke-width": 0,
                "stroke-opacity": 1 */
                'font-family': 'Verdana',
                'font-size': '12',
                'font-weight': 'bold',
                cursor: 'default',
                fill:  '#f92a63'
              },
             
              selected: {
                fill: 'yellow'
              },
              selectedHover: {
              }
            },
            markerStyle: {
              initial: {
                fill: 'black',
                stroke: '#1111'
              }
            },
            
            markers: [{latLng:[15,101],name:"Thailand"},{latLng:[36,138],name:"Japan"},{latLng:[1,103],name:"Singapore"},{latLng:[28,84],name:"Nepal"},{latLng:[2,112],name:"Malaysia"},{latLng:[49,-123],name:"Canada"},{latLng:[-33,151],name:"Australia"},{latLng:[-37,144],name:"Australia"},{latLng:[-28,153],name:"Australia"},{latLng:[11,104],name:"Cambodia"},{latLng:[7,81],name:"Sri Lanka"},{latLng:[51,9],name:"Germany"},{latLng:[64,26],name:"Finland"},{latLng:[24,54],name:"United Arab Emirates"},{latLng:[13,122],name:"Philippines"},{latLng:[21,78],name:"India"},{latLng:[43,12],name:"Italy"},{latLng:[63,16],name:"Sweden"},{latLng:[40,-4],name:"Spain"},{latLng:[-34,138],name:"Australia"},{latLng:[50,4],name:"Belgium"},{latLng:[26,30],name:"Egypt"},{latLng:[35,139],name:"Australia"},{latLng:[33,35],name:"Lebanon"},{latLng:[33,44],name:"Iraq"},{latLng:[21,57],name:"Oman"},{latLng:[33,65],name:"Afghanistan"},{latLng:[26,50],name:"Bahrain"},{latLng:[29,47],name:"Kuwait"},{latLng:[28,1],name:"Algeria"},{latLng:[45,15],name:"Croatia"},{latLng:[46,8],name:"Switzerland"},{latLng:[47,14],name:"Austria"},{latLng:[31,35],name:"Israel"},{latLng:[30,69],name:"Pakistan"},{latLng:[-14,-51],name:"Brazil"},{latLng:[42,43],name:"Georgia"},{latLng:[39,21],name:"Greece"},{latLng:[41,21],name:"North Macedonia"},{latLng:[60,8],name:"Norway"},{latLng:[45,24],name:"Romania"},{latLng:[58,25],name:"Estonia"},{latLng:[43,12],name:"San Marino"},{latLng:[53,27],name:"Belarus"},{latLng:[64,-19],name:"Iceland"},{latLng:[55,23],name:"Lithuania"},{latLng:[23,-102],name:"Mexico"},{latLng:[-40,174],name:"New Zealand"},{latLng:[9,8],name:"Nigeria"},{latLng:[-31,115],name:"Australia"},{latLng:[53,-7],name:"Ireland"},{latLng:[49,6],name:"Luxembourg"},{latLng:[43,7],name:"Monaco"},{latLng:[25,51],name:"Qatar"},{latLng:[-1,-78],name:"Ecuador"},{latLng:[40,47],name:"Azerbaijan"},{latLng:[40,45],name:"Armenia"},{latLng:[18,-70],name:"Dominican Republic"},{latLng:[0,113],name:"Indonesia"},{latLng:[39,-8],name:"Portugal"},{latLng:[42,1],name:"Andorra"},{latLng:[-41,145],name:"Australia"},{latLng:[56,24],name:"Latvia"},{latLng:[31,-7],name:"Morocco"},{latLng:[24,45],name:"Saudi Arabia"},{latLng:[14,-14],name:"Senegal"},{latLng:[-38,-63],name:"Argentina"},{latLng:[-35,-71],name:"Chile"},{latLng:[31,36],name:"Jordan"},{latLng:[48,31],name:"Ukraine"},{latLng:[47,19],name:"Hungary"},{latLng:[-12,130],name:"Australia"},{latLng:[47,9],name:"Liechtenstein"},{latLng:[51,19],name:"Poland"},{latLng:[34,9],name:"Tunisia"},{latLng:[43,17],name:"Bosnia and Herzegovina"},{latLng:[46,14],name:"Slovenia"},{latLng:[-30,22],name:"South Africa"},{latLng:[27,90],name:"Bhutan"},{latLng:[3,11],name:"Cameroon"},{latLng:[4,-74],name:"Colombia"},{latLng:[9,-83],name:"Costa Rica"},{latLng:[-9,-75],name:"Peru"},{latLng:[44,21],name:"Serbia"},{latLng:[48,19],name:"Slovakia"},{latLng:[8,0],name:"Togo"},{latLng:[35,14],name:"Malta"},{latLng:[14,-61],name:"Martinique"},{latLng:[42,25],name:"Bulgaria"},{latLng:[3,73],name:"Maldives"},{latLng:[23,90],name:"Bangladesh"},{latLng:[-23,-58],name:"Paraguay"},{latLng:[51,-85],name:"Canada"},{latLng:[53,-116],name:"Canada"},{latLng:[52,-73],name:"Canada"},{latLng:[41,20],name:"Albania"},{latLng:[35,33],name:"Cyprus"},{latLng:[4,114],name:"Brunei"},{latLng:[47,-121],name:"US"},{latLng:[42,-74],name:"US"},{latLng:[36,-119],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[35,139],name:"US"},{latLng:[37,-122],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[39,-105],name:"US"},{latLng:[27,-81],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[44,-122],name:"US"},{latLng:[31,-97],name:"US"},{latLng:[40,-88],name:"US"},{latLng:[40,-77],name:"US"},{latLng:[42,-93],name:"US"},{latLng:[39,-76],name:"US"},{latLng:[35,-79],name:"US"},{latLng:[33,-80],name:"US"},{latLng:[35,-86],name:"US"},{latLng:[37,-78],name:"US"},{latLng:[33,-111],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[38,-117],name:"US"},{latLng:[43,-71],name:"US"},{latLng:[45,-93],name:"US"},{latLng:[41,-98],name:"US"},{latLng:[40,-82],name:"US"},{latLng:[41,-71],name:"US"},{latLng:[44,-89],name:"US"},{latLng:[41,-72],name:"US"},{latLng:[21,-157],name:"US"},{latLng:[35,-96],name:"US"},{latLng:[40,-111],name:"US"},{latLng:[12,-1],name:"Burkina Faso"},{latLng:[41,12],name:"Holy See"},{latLng:[46,103],name:"Mongolia"},{latLng:[8,-80],name:"Panama"},{latLng:[38,-96],name:"US"},{latLng:[31,-91],name:"US"},{latLng:[38,-92],name:"US"},{latLng:[44,-72],name:"US"},{latLng:[61,-152],name:"US"},{latLng:[34,-92],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[44,-114],name:"US"},{latLng:[44,-69],name:"US"},{latLng:[43,-84],name:"US"},{latLng:[32,-89],name:"US"},{latLng:[46,-110],name:"US"},{latLng:[34,-106],name:"US"},{latLng:[47,-99],name:"US"},{latLng:[44,-99],name:"US"},{latLng:[38,-80],name:"US"},{latLng:[42,-107],name:"US"},{latLng:[30,112],name:"China"},{latLng:[32,53],name:"Iran"},{latLng:[36,128],name:"Korea, South"},{latLng:[46,2],name:"France"},{latLng:[23,113],name:"China"},{latLng:[33,113],name:"China"},{latLng:[29,120],name:"China"},{latLng:[27,111],name:"China"},{latLng:[31,117],name:"China"},{latLng:[27,115],name:"China"},{latLng:[36,118],name:"China"},{latLng:[35,139],name:"Cruise Ship"},{latLng:[32,119],name:"China"},{latLng:[30,107],name:"China"},{latLng:[30,102],name:"China"},{latLng:[47,127],name:"China"},{latLng:[56,9],name:"Denmark"},{latLng:[40,116],name:"China"},{latLng:[31,121],name:"China"},{latLng:[39,116],name:"China"},{latLng:[26,117],name:"China"},{latLng:[23,108],name:"China"},{latLng:[35,108],name:"China"},{latLng:[24,101],name:"China"},{latLng:[19,109],name:"China"},{latLng:[26,106],name:"China"},{latLng:[39,117],name:"China"},{latLng:[37,112],name:"China"},{latLng:[37,101],name:"China"},{latLng:[22,114],name:"China"},{latLng:[41,122],name:"China"},{latLng:[43,126],name:"China"},{latLng:[49,15],name:"Czechia"},{latLng:[41,85],name:"China"},{latLng:[44,113],name:"China"},{latLng:[37,106],name:"China"},{latLng:[23,121],name:"Taiwan*"},{latLng:[16,108],name:"Vietnam"},{latLng:[60,90],name:"Russia"},{latLng:[35,95],name:"China"},{latLng:[22,113],name:"China"},{latLng:[47,28],name:"Moldova"},{latLng:[-16,-63],name:"Bolivia"},{latLng:[61,-6],name:"Denmark"},{latLng:[18,-63],name:"France"},{latLng:[15,-86],name:"Honduras"},{latLng:[49,-2],name:"United Kingdom"},{latLng:[46,-66],name:"Canada"},{latLng:[31,88],name:"China"},{latLng:[-4,21],name:"Congo (Kinshasa)"},{latLng:[7,-5],name:"Cote d'Ivoire"},{latLng:[17,-62],name:"France"},{latLng:[18,-77],name:"Jamaica"},{latLng:[38,35],name:"Turkey"},{latLng:[36,-5],name:"United Kingdom"},{latLng:[47,-122],name:"US"},{latLng:[38,-121],name:"US"},{latLng:[37,-121],name:"US"},{latLng:[38,-122],name:"US"},{latLng:[34,-119],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[37,-82],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[32,-94],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[39,-106],name:"US"},{latLng:[40,-105],name:"US"},{latLng:[39,-104],name:"US"},{latLng:[38,-106],name:"US"},{latLng:[41,-88],name:"US"},{latLng:[41,-75],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[38,-76],name:"US"},{latLng:[41,-95],name:"US"},{latLng:[34,-80],name:"US"},{latLng:[32,-111],name:"US"},{latLng:[41,-85],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[43,-89],name:"US"},{latLng:[44,-92],name:"US"},{latLng:[41,-81],name:"US"},{latLng:[41,-111],name:"US"},{latLng:[43,-73],name:"US"},{latLng:[44,-93],name:"US"},{latLng:[26,-81],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[33,-96],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[29,-90],name:"US"},{latLng:[40,-121],name:"US"},{latLng:[34,-81],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[41,-91],name:"US"},{latLng:[42,-73],name:"US"},{latLng:[36,-86],name:"US"},{latLng:[43,-123],name:"US"},{latLng:[36,-119],name:"US"},{latLng:[39,-76],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[38,-94],name:"US"},{latLng:[47,-120],name:"US"},{latLng:[27,-82],name:"US"},{latLng:[44,-122],name:"US"},{latLng:[30,-86],name:"US"},{latLng:[34,-85],name:"US"},{latLng:[33,-117],name:"US"},{latLng:[35,-89],name:"US"},{latLng:[38,-90],name:"US"},{latLng:[40,-72],name:"US"},{latLng:[41,-74],name:"US"},{latLng:[29,-81],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[40,-75],name:"US"},{latLng:[37,-121],name:"US"},{latLng:[26,-80],name:"US"},{latLng:[26,-81],name:"US"},{latLng:[32,-111],name:"US"},{latLng:[41,-73],name:"US"},{latLng:[43,-73],name:"US"},{latLng:[32,-79],name:"US"},{latLng:[45,-122],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[40,-112],name:"US"},{latLng:[38,-104],name:"US"},{latLng:[21,-157],name:"US"},{latLng:[42,-122],name:"US"},{latLng:[47,-123],name:"US"},{latLng:[34,-80],name:"US"},{latLng:[42,-121],name:"US"},{latLng:[37,-119],name:"US"},{latLng:[47,-122],name:"US"},{latLng:[36,-95],name:"US"},{latLng:[39,-104],name:"US"},{latLng:[41,-71],name:"US"},{latLng:[35,-79],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[41,-96],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[40,-73],name:"US"},{latLng:[44,-93],name:"US"},{latLng:[40,-119],name:"US"},{latLng:[41,-75],name:"US"},{latLng:[38,-121],name:"US"},{latLng:[37,-121],name:"US"},{latLng:[36,-115],name:"US"},{latLng:[29,-95],name:"US"},{latLng:[47,-119],name:"US"},{latLng:[30,-86],name:"US"},{latLng:[35,-86],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[39,-104],name:"US"},{latLng:[39,-106],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[29,-95],name:"US"},{latLng:[37,-122],name:"US"},{latLng:[37,-121],name:"US"},{latLng:[33,-117],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[33,-112],name:"US"},{latLng:[35,-78],name:"US"},{latLng:[41,-73],name:"US"},{latLng:[43,-71],name:"US"},{latLng:[27,-82],name:"US"},{latLng:[39,-120],name:"US"},{latLng:[37,-122],name:"US"},{latLng:[38,-122],name:"US"},{latLng:[45,-118],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[45,-123],name:"US"},{latLng:[48,-121],name:"US"},{latLng:[40,-123],name:"US"},{latLng:[38,-121],name:"US"},{latLng:[32,-117],name:"US"},{latLng:[36,-120],name:"US"},{latLng:[34,-118],name:"US"},{latLng:[47,-122],name:"US"},{latLng:[41,-87],name:"US"},{latLng:[48,-121],name:"US"},{latLng:[46,-122],name:"US"},{latLng:[48,-122],name:"US"},{latLng:[48,-121],name:"US"},{latLng:[38,-122],name:"US"},{latLng:[38,-120],name:"US"},{latLng:[37,-120],name:"US"},{latLng:[36,-120],name:"US"},{latLng:[42,-70],name:"US"},{latLng:[30,-82],name:"US"},{latLng:[26,-81],name:"US"},{latLng:[27,-82],name:"US"},{latLng:[29,-82],name:"US"},{latLng:[30,-81],name:"US"},{latLng:[28,-82],name:"US"},{latLng:[32,-96],name:"US"},{latLng:[32,-97],name:"US"},{latLng:[30,-95],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[39,-105],name:"US"},{latLng:[45,-122],name:"US"},{latLng:[44,-123],name:"US"},{latLng:[43,-121],name:"US"},{latLng:[42,-88],name:"US"},{latLng:[42,-87],name:"US"},{latLng:[40,-75],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[34,-80],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[41,-86],name:"US"},{latLng:[42,-97],name:"US"},{latLng:[40,-81],name:"US"},{latLng:[45,-93],name:"US"},{latLng:[43,-92],name:"US"},{latLng:[40,-110],name:"US"},{latLng:[41,-73],name:"US"},{latLng:[41,-73],name:"US"},{latLng:[29,-90],name:"US"},{latLng:[43,-102],name:"US"},{latLng:[44,-98],name:"US"},{latLng:[43,-98],name:"US"},{latLng:[43,-98],name:"US"},{latLng:[43,-96],name:"US"},{latLng:[42,-97],name:"US"},{latLng:[33,-106],name:"US"},{latLng:[35,-106],name:"US"},{latLng:[42,-83],name:"US"},{latLng:[42,-83],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[22,-80],name:"Cuba"},{latLng:[5,-58],name:"Guyana"},{latLng:[-35,149],name:"Australia"},{latLng:[55,-3],name:"United Kingdom"},{latLng:[48,66],name:"Kazakhstan"},{latLng:[-17,149],name:"France"},{latLng:[53,-98],name:"Canada"},{latLng:[52,-106],name:"Canada"},{latLng:[9,40],name:"Ethiopia"},{latLng:[12,30],name:"Sudan"},{latLng:[9,-9],name:"Guinea"},{latLng:[37,-122],name:"Canada"},{latLng:[0,37],name:"Kenya"},{latLng:[17,-61],name:"Antigua and Barbuda"},{latLng:[32,-86],name:"US"},{latLng:[-32,-55],name:"Uruguay"},{latLng:[7,-1],name:"Ghana"},{latLng:[18,-66],name:"US"},{latLng:[-22,18],name:"Namibia"},{latLng:[-4,55],name:"Seychelles"},{latLng:[10,-61],name:"Trinidad and Tobago"},{latLng:[6,-66],name:"Venezuela"},{latLng:[-26,31],name:"Eswatini"},{latLng:[0,11],name:"Gabon"},{latLng:[15,-90],name:"Guatemala"},{latLng:[21,10],name:"Mauritania"},{latLng:[-1,29],name:"Rwanda"},{latLng:[13,-60],name:"Saint Lucia"},{latLng:[12,-61],name:"Saint Vincent and the Grenadines"},{latLng:[3,-56],name:"Suriname"},{latLng:[3,-53],name:"France"},{latLng:[13,144],name:"US"},{latLng:[42,20],name:"Kosovo"},{latLng:[53,-57],name:"Canada"},{latLng:[46,-63],name:"Canada"},{latLng:[6,20],name:"Central African Republic"},{latLng:[-4,21],name:"Congo (Brazzaville)"},{latLng:[1,10],name:"Equatorial Guinea"},{latLng:[-12,45],name:"France"},{latLng:[41,64],name:"Uzbekistan"},{latLng:[52,5],name:"Netherlands"},{latLng:[44,-63],name:"Canada"},{latLng:[16,-61],name:"France"},{latLng:[9,2],name:"Benin"},{latLng:[6,-9],name:"Liberia"},{latLng:[12,-68],name:"Netherlands"},{latLng:[5,46],name:"Somalia"},{latLng:[-6,34],name:"Tanzania"},{latLng:[18,-64],name:"US"},{latLng:[19,-81],name:"United Kingdom"},{latLng:[-21,55],name:"France"},{latLng:[13,-59],name:"Barbados"},{latLng:[42,19],name:"Montenegro"},{latLng:[41,74],name:"Kyrgyzstan"},{latLng:[-20,57],name:"Mauritius"},{latLng:[12,-70],name:"Netherlands"},{latLng:[-15,28],name:"Zambia"},{latLng:[11,42],name:"Djibouti"},{latLng:[13,-15],name:"Gambia, The"},{latLng:[16,-62],name:"United Kingdom"},{latLng:[25,-77],name:"Bahamas, The"},{latLng:[71,-42],name:"Denmark"},{latLng:[-20,165],name:"France"},{latLng:[32,-64],name:"United Kingdom"},{latLng:[15,18],name:"Chad"},{latLng:[13,-88],name:"El Salvador"},{latLng:[-17,178],name:"Fiji"},{latLng:[12,-85],name:"Nicaragua"}
            
            ],
            labels: {
                markers: {
                  render: function(index){
                    //return plants[index].name;
                    return "<strong></strong>"+_this.markupdata[index];
                  },
                  offsets: function(index){
                    var offset = _this.markupdata[index]['offsets'] || [0, 0];
        
                    return [offset[0] - 7, offset[1] + 3];
                  }
                }
            },
            series: {
                markers: [{
                 
                  scale: {
                    'Confirmed': '',
                    'Recovered': '',
                    'Death': ''
                  },
                 value:"",
                  legend: {
                    horizontal: true,
                    title: 'Total number of corona cases till now',
                    labelRender: function(v){
                      return {
                        Confirmed: _this.worldconfirmedcount,
                        Recovered: _this.worldrecoveredcount,
                        Death: _this.worlddeathcount
                      }[v];
                    }
                  }
                }]
              },
            onMarkerLabelShow: function(event, label, code) 
            {
             label.html("<strong>"+label.html()+"</strong>"+_this.markupdata[code]);                
            },
           /*  onMarkerTipShow:function(event, label, code) 
            {
             label.html("<strong>"+label.html()+"</strong>"+_this.markupdata[code]);                
            }, */
            onLabelShow: function(event, label, code){
                label.html("<strong>"+label.html()+"</strong>"+_this.markupdata[code]);
            }
          });

          //Donut Chart
        var donut = new Morris.Donut({
            element: 'sales-chart',
            resize: true,
            colors: ["#e3a211", "#21db1e", "#db1e1e"],
            data: [
            {label: "Confirmed cases", value: _this.worldconfirmedcount},
            {label: "Recoverd cases", value: _this.worldrecoveredcount},
            {label: "Death cases", value: _this.worlddeathcount}
            ],
            hideHover: 'auto'
        });
    },
    getIndiaDataList:function()
    {
        var _this = this;
        var ajaxresult = $.ajax({
            type:"GET",
            url:"https://api.rootnet.in/covid19-in/stats/latest",
            contentType:false,
            processData:false,
            global:false,
            async:false,
            success:function(response)
            {
                /* data = $.csv.toArrays(data);
                console.log(data);
                _this.coronalist = data;
                _this.renderMap(data); */
                console.log(response);
                for(i in response.data.regional)
                {
                    console.log(response.data.regional[i].loc);
                  //  _this.statelist.push(response.data.regional[i].loc);
                }

                console.log(_this.statelist);

                _this.renderIndiaMap(response);
            },
            error:function(error)
            {
                console.log(error);
            }
            
            
         });
    },

    renderIndiaMap:function(indiadata)
    {
    
        var _this = this;

        _this.statecode=[
            ["IN-BR","Bihar"],
            ["IN-PY","Puducherry"],
            ["IN-DD","Daman and Diu"],
            ["IN-DN","Dadra and Nagar Haveli"],
            ["IN-DL","Delhi"],
            ["IN-NL","Nagaland"],
            ["IN-WB","West Bengal"],
            ["IN-HR","Haryana"],
            ["IN-HP","Himachal Pradesh"],
            ["IN-AS","Assam"],
            ["IN-UT","Uttaranchal"],
            ["IN-JH","Jharkhand"],
            ["IN-JK","Jammu and Kashmir"],
            ["IN-UP","Uttar Pradesh"],
            ["IN-SK","Sikkim"],
            ["IN-MZ","Mizoram"],
            ["IN-CT","Chhattisgarh"],
            ["IN-CH","Chandigarh"],
            ["IN-GA","Goa"],
            ["IN-GJ","Gujarat"],
            ["IN-RJ","Rajasthan"],
            ["IN-MP","Madhya Pradesh"],
            ["IN-OR","Orissa"],
            ["IN-TN","Tamil Nadu"],
            ["IN-AN","Andaman and Nicobar"],
            ["IN-AP","Andhra Pradesh"],
            ["IN-TR","Tripura"],
            ["IN-AR","Arunachal Pradesh"],
            ["IN-KA","Karnataka"],
            ["IN-PB","Punjab"],
            ["IN-ML","Meghalaya"],
            ["IN-MN","Manipur"],
            ["IN-MH","Maharashtra"],
            ["IN-KL","Kerala"]
            ];

            $.each(_this.statecode, function( index, value ) {
               // console.log(value);
                _this.swapstate[value[1]] = value[0];
              });

              _this.indiatotalcount = indiadata.data.summary.total;
              _this.indiaconfirmedcount = indiadata.data.summary.confirmedCasesIndian;
              _this.indiaconfirmedforeigncount = indiadata.data.summary.confirmedCasesForeign;
              _this.indiarecoveredcount = indiadata.data.summary.discharged;
              _this.indiadeathcount = indiadata.data.summary.deaths;

              for(i in indiadata.data.regional)
              {
                  //console.log(indiadata.data.regional[i].loc);
               // _this.statelist[_this.swapstate[indiadata.data.regional[i].loc]]=indiadata.data.regional[i];
                /*   _this.statelist.push(indiadata.data.regional[i].loc); */

                var html ="";
                html+="</br>Confirmed cases Indian:"+indiadata.data.regional[i]['confirmedCasesIndian'];
                html+="</br>Confirmed cases Foreign:"+indiadata.data.regional[i]['confirmedCasesForeign'];
                html+="</br>Discharged:"+indiadata.data.regional[i]['discharged'];
                html+="</br>Death:"+indiadata.data.regional[i]['deaths'];

                _this.statelist[_this.swapstate[indiadata.data.regional[i].loc]]= html;
              }

            // /_this.statedata[]
            console.log(_this.statelist);
            console.log(data);
            console.log(_this.statecode);
            console.log(_this.swapstate);

        $('#india-map-markers').vectorMap({
            map: 'in_mill',
            normalizeFunction: 'polynomial',
            hoverOpacity: 0.7,
            hoverColor: true,
            backgroundColor: 'transparent',
            regionLabelStyle: {
                initial: {
                  fill: '#B90E32'
                },
                hover: {
                  fill: 'red'
                }
              },
            regionStyle: {
              initial: {
                /* fill: 'rgba(210, 214, 222, 1)',
                "fill-opacity": 1,
                stroke: '#ff0000',
                "stroke-width": 0,
                "stroke-opacity": 1 */
                'font-family': 'Verdana',
                'font-size': '12',
                'font-weight': 'bold',
                cursor: 'default',
                fill:  '#f92a63'
              },
             
              selected: {
                fill: 'yellow'
              },
              selectedHover: {
              }
            },
            markerLabelStyle:
            {
                initial: {
                    'font-family': 'Verdana',
                    'font-size': '12',
                    'font-weight': 'bold',
                    cursor: 'default',
                    fill: 'black'
                  },
                  hover: {
                    cursor: 'pointer'
                  }
            },
             markerStyle: {
              initial: {
                fill: '#000007',
                stroke: '#1111'
              }
            }, 
            
            markers:[{latLng:[11.059821,78.387451],name:"Tamil Nadu"},

            {latLng:[17.123184,79.208824],name:"Telangana"},
            {latLng:[23.473324,77.947998],name:"Madhya Pradesh"},
            
            {latLng:[29.238478,76.431885],name:"Haryana"},
            {latLng:[21.295132,81.828232],name:"Chhattisgarh"},
            {latLng:[29.065773,76.040497],name:"Haryana"},
            {latLng:[25.794033,78.116531],name:"Bhitarwar, Madhya Pradesh"},
            
            
            {latLng:[19.601194,75.552979],name:"Maharashtra"},
            
            
            {latLng:[23.745127,91.746826],name:"Tripura"},
            {latLng:[17.874857,78.100815],name:"Chandoor, Telangana"},
            {latLng:[15.317277,75.71389],name:"Karnataka"},
            {latLng:[10.850516,76.27108],name:"Kerala"},
            {latLng:[28.207609,79.82666],name:"Uttar Pradesh"},
            {latLng:[26.244156,92.537842],name:"Assam"},
            {latLng:[19.66328,75.300293],name:"Maharashtra"},
            {latLng:[22.978624,87.747803],name:"West Bengal"},
            {latLng:[22.309425,72.13623],name:"Gujarat"},
            {latLng:[20.94092,84.803467],name:"Odisha"},
            {latLng:[27.391277,73.432617],name:"Rajasthan"},
            {latLng:[32.084206,77.571167],name:"Himachal Pradesh"}
            ],
            labels: {
                regions: {
                    render: function(code){
                     // return _this.statelist[code] && jvm.Map.maps['in_mill'].paths[code].name;
                     return code;
                    },
                    offsets: function(code){
                    return code;
                    }
                  },

               
            },
            series: {
                regions: [{
                  values: _this.statecode,
                  attribute: "fill"
                }]
              },
              
            onMarkerLabelShow: function(event, label, code) 
            {
             label.html("<strong>"+label.html()+"</strong>"+_this.markupdata[code]);                
            },
            onRegionLabelShow: function(event, label, code){
                /* label.html(
                  '<b>'+label.html()+'</b></br>'+
                  '<b>Unemployment rate: </b>'+12+'%'
                ); */
                console.log(label);
                label.html("<strong>"+label.html()+"</strong>"+_this.statelist[code]);
              },
           /*  onMarkerTipShow:function(event, label, code) 
            {
             label.html("<strong>"+label.html()+"</strong>"+_this.markupdata[code]);                
            }, */
            onLabelShow: function(event, label, code){
                label.html("<strong>"+label.html()+"</strong>"+_this.markupdata[code]);
            }
          });


          var donut = new Morris.Donut({
            element: 'india-chart',
            resize: true,
            colors: ["#c3a211","#f3a211","#e3a211", "#21db1e", "#db1e1e"],
            data: [
            {label: "Total", value: _this.indiatotalcount},
            {label: "Confirmed Indian", value: _this.indiaconfirmedcount},
            {label: "Confirmed Foreign return", value: _this.indiaconfirmedforeigncount},
            {label: "Recovered", value: _this.indiarecoveredcount},
            {label: "Death", value: _this.indiadeathcount}
            ],
            hideHover: 'auto'
        });

    },

    listHelpContact:function()
    {
        var _this = this;
        var ajaxresult = $.ajax({
            type:"GET",
            url:"https://api.rootnet.in/covid19-in/contacts",
            contentType:false,
            processData:false,
            global:false,
            async:false,
            success:function(data)
            {
                
                console.log(data);
                _this.renderContact(data);
            },
            error:function(error)
            {
                console.log(error);
            }
            
            
         });
    },
    renderContact:function(data)
    {
        var _this = this;
        var html="";
        //var i = 1;
        $("#emergencylist tbody").html("");

      
        for(i in data.data.contacts.regional)
        {
            console.log(data.data.contacts.regional[i]['loc']);
            var j =i+1;
            html+="<tr>";
            html+="<td>"+j+"</td>";
            html+="<td>"+data.data.contacts.regional[i]['loc'];
            html+="<td>"+data.data.contacts.regional[i]['number'];
            html+="</tr>";
            
        }
        console.log(html);
        $("#emergencylist tbody").html(html);
        

        $('#emergencylist').dataTable({
            "bPaginate": true,
            "bLengthChange": false,
            "bFilter": true,
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": false
          });
    }
};

$(document).ready(function(){
    coronadata.init();

   /*  setInterval(function(){
        coronadata.init();
      }, 3000); */
   
});