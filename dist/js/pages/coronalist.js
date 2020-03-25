var coronadata = 
{
    init:function()
	{
        this.getDataList();
        this.getWorldDataList();
        this.getIndiaDataList();
        this.listHelpContact();
    },
    datedata:[],
    coronalist:"",
    dateselected:"",
    markupdata:[],
    markuplist:[],
    worldconfirmedcount:0,
    worldrecoveredcount:0,
    worlddeathcount:0,
    indiaconfirmedcount:"",
    indiarecoveredcount:"",
    indiadeathcount:"",
    statelist:[],
    statecode:[],
    swapstate:[],
    swaprevstate:[],
    statedata:[],

    getWorldDataList:function()
    {
      var _this = this;
      var currentdate = moment().add(-1, 'days').format("YYYY-MM-DD");
        if(_this.dateselected)
        {
            currentdate = _this.dateselected;
        }
      var ajaxresult = $.ajax({
        type:"GET",
        url:"https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv",
        dataType: "text", 
            success:function(data)
            {
                response = $.csv.toArrays(data);
            /* data = $.csv.toArrays(data);
            console.log(data);
            _this.coronalist = data;
            _this.renderMap(data); */
            //console.log(response);
            response.forEach(function(val)
            {
           //   console.log(val.Date);
                //var date = val.time.split('T')[0];
                if (val[0] in _this.datedata) 
                {
                    _this.datedata[val[0]].push(val);
                } else 
                {
                    _this.datedata[val[0]] = new Array(val);
                }
            });

            console.log(_this.datedata);

            _this.worldconfirmedcount = _this.datedata[currentdate][0][1];
            if(_this.datedata[currentdate][0][2] >0)
            {
              _this.worldrecoveredcount = _this.datedata[currentdate][0][2];
            }
            else
            {
              var precurrentdate = moment().add(-2, 'days').format("YYYY-MM-DD");
              _this.worldrecoveredcount = _this.datedata[precurrentdate][0][2];
            }

            _this.worlddeathcount = _this.datedata[currentdate][0][3];

            console.log(_this.worldconfirmedcount);
            console.log(_this.worlddeathcount);
            console.log(_this.worldrecoveredcount);
            /* for(i in response.data.regional)
            {
              console.log(response.data.regional[i].loc);
              _this.statelist.push(response.data.regional[i].loc);
            }

            console.log(_this.statelist); */

           // _this.renderIndiaMap(response);
        },
        error:function(error)
        {
            console.log(error);
        }
        
        
     });
    },
    
    getDataList:function()
    {
        var _this = this;
        
        var currentdate = moment().add(-1, 'days').format("MM-DD-YYYY");
        if(_this.dateselected)
        {
            currentdate = _this.dateselected;
        }
        var ajaxresult = $.ajax({
            type:"GET",
            url:"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"+currentdate+".csv",
            dataType: "text", 
            success:function(data)
            {
                data = $.csv.toArrays(data);
                //console.log(data);
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
        for(var i in data)
        {
          var obj={};
          var ltlgarray = [parseInt(data[i][5]),parseInt(data[i][6])];
     // ltlgarray = ltlgarray.push98(datedata[currentdate][i][2]);
      //ltlgarray = ltlgarray.push(datedata[currentdate][i][3]);
      /* {latLng: ['+datedata[currentdate][i][2]+','+datedata[currentdate][i][2]+'], name: '+datedata[currentdate][i][1]+'}; */

      obj.latLng= ltlgarray;
      
      obj.name = data[i][3];
           // console.log(data[i][2]+" "+data[i][3]);

      _this.markuplist.push(obj);
          
      var html = "</br>State:"+data[i][2]+"</br>Confrimed cases:"+data[i][7]+"</br>Recoverd cases:"+data[i][9]+"</br>Death cases:"+data[i][8];
      _this.markupdata.push(html);

      //console.log("Confirmed case before=> "+data[i][7]);
     // console.log( _this.worldconfirmedcount);
           /*  _this.worldconfirmedcount=_this.worldconfirmedcount+Number(data[i][7]);

            _this.worldrecoveredcount=Number(_this.worldrecoveredcount)+data[i][9];

            _this.worlddeathcount=Number(_this.worlddeathcount)+data[i][8]; */
            /* console.log("Current date data"+currentdate);
            var state="";
            _this.worldconfirmedcount=Number(_this.worldconfirmedcount)+Number(_this.datedata[currentdate][i][3]);

            _this.worldrecoveredcount=Number(_this.worldrecoveredcount)+Number(_this.datedata[currentdate][i][5]);

            _this.worlddeathcount=Number(_this.worlddeathcount)+Number(_this.datedata[currentdate][i][4]);


            if(_this.datedata[currentdate][i][0] != "")
            {
               // console.log(_this.datedata[currentdate][i][0]);
                state = _this.datedata[currentdate][i][0];
            }
            var html = "</br>State:"+state+"</br>Confrimed cases:"+_this.datedata[currentdate][i][3]+"</br>Recoverd cases:"+_this.datedata[currentdate][i][5]+"</br>Death cases:"+_this.datedata[currentdate][i][4];
            _this.markupdata.push(html); */
        }

       ///console.log(JSON.stringify(_this.markuplist));
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
            
            markers:[{latLng:[34,-82],name:"US"},{latLng:[30,-92],name:"US"},{latLng:[37,-75],name:"US"},{latLng:[43,-116],name:"US"},{latLng:[41,-94],name:"US"},{latLng:[37,-85],name:"US"},{latLng:[40,-92],name:"US"},{latLng:[35,-94],name:"US"},{latLng:[39,-104],name:"US"},{latLng:[44,-116],name:"US"},{latLng:[39,-91],name:"US"},{latLng:[40,-84],name:"US"},{latLng:[41,-94],name:"US"},{latLng:[31,-91],name:"US"},{latLng:[40,-98],name:"US"},{latLng:[46,-102],name:"US"},{latLng:[38,-83],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[46,-118],name:"US"},{latLng:[43,-89],name:"US"},{latLng:[44,-73],name:"US"},{latLng:[33,-81],name:"US"},{latLng:[46,-93],name:"US"},{latLng:[29,-82],name:"US"},{latLng:[36,-79],name:"US"},{latLng:[37,-121],name:"US"},{latLng:[37,-105],name:"US"},{latLng:[42,-73],name:"US"},{latLng:[41,-105],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[44,-83],name:"US"},{latLng:[34,-88],name:"US"},{latLng:[55,-161],name:"US"},{latLng:[52,-110],name:"US"},{latLng:[37,-89],name:"US"},{latLng:[35,-81],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[36,-98],name:"US"},{latLng:[46,-86],name:"US"},{latLng:[43,-91],name:"US"},{latLng:[42,-85],name:"US"},{latLng:[39,-78],name:"US"},{latLng:[42,-78],name:"US"},{latLng:[36,-81],name:"US"},{latLng:[37,-80],name:"US"},{latLng:[40,-79],name:"US"},{latLng:[41,-85],name:"US"},{latLng:[37,-95],name:"US"},{latLng:[36,-86],name:"US"},{latLng:[30,-92],name:"US"},{latLng:[40,-84],name:"US"},{latLng:[32,-81],name:"US"},{latLng:[45,-83],name:"US"},{latLng:[38,-119],name:"US"},{latLng:[38,-120],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[37,-79],name:"US"},{latLng:[31,-90],name:"US"},{latLng:[61,-149],name:"US"},{latLng:[38,-95],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[34,-82],name:"US"},{latLng:[36,-84],name:"US"},{latLng:[31,-95],name:"US"},{latLng:[39,-94],name:"US"},{latLng:[32,-102],name:"US"},{latLng:[44,-70],name:"US"},{latLng:[31,-94],name:"US"},{latLng:[39,-76],name:"US"},{latLng:[45,-93],name:"US"},{latLng:[34,-80],name:"US"},{latLng:[42,-98],name:"US"},{latLng:[44,-85],name:"US"},{latLng:[35,-109],name:"US"},{latLng:[40,-92],name:"US"},{latLng:[31,-82],name:"US"},{latLng:[37,-78],name:"US"},{latLng:[28,-96],name:"US"},{latLng:[39,-104],name:"US"},{latLng:[33,-98],name:"US"},{latLng:[37,-107],name:"US"},{latLng:[44,-83],name:"US"},{latLng:[34,-91],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[40,-79],name:"US"},{latLng:[34,-101],name:"US"},{latLng:[46,-68],name:"US"},{latLng:[41,-101],name:"US"},{latLng:[30,-90],name:"US"},{latLng:[36,-81],name:"US"},{latLng:[40,-82],name:"US"},{latLng:[46,-90],name:"US"},{latLng:[33,-91],name:"US"},{latLng:[41,-80],name:"US"},{latLng:[46,-117],name:"US"},{latLng:[29,-91],name:"US"},{latLng:[28,-98],name:"US"},{latLng:[39,-95],name:"US"},{latLng:[40,-95],name:"US"},{latLng:[39,-82],name:"US"},{latLng:[31,-82],name:"US"},{latLng:[39,-74],name:"US"},{latLng:[34,-96],name:"US"},{latLng:[33,-89],name:"US"},{latLng:[39,-91],name:"US"},{latLng:[41,-94],name:"US"},{latLng:[40,-84],name:"US"},{latLng:[38,-79],name:"US"},{latLng:[43,-98],name:"US"},{latLng:[29,-96],name:"US"},{latLng:[32,-86],name:"US"},{latLng:[36,-81],name:"US"},{latLng:[31,-92],name:"US"},{latLng:[37,-102],name:"US"},{latLng:[31,-82],name:"US"},{latLng:[34,-102],name:"US"},{latLng:[30,-82],name:"US"},{latLng:[31,-84],name:"US"},{latLng:[44,-117],name:"US"},{latLng:[30,-87],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[39,-76],name:"US"},{latLng:[39,-76],name:"US"},{latLng:[33,-81],name:"US"},{latLng:[29,-99],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[41,-103],name:"US"},{latLng:[42,-112],name:"US"},{latLng:[46,-88],name:"US"},{latLng:[37,-98],name:"US"},{latLng:[31,-85],name:"US"},{latLng:[39,-80],name:"US"},{latLng:[46,-98],name:"US"},{latLng:[41,-70],name:"US"},{latLng:[33,-81],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[45,-91],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[42,-85],name:"US"},{latLng:[36,-93],name:"US"},{latLng:[39,-85],name:"US"},{latLng:[38,-98],name:"US"},{latLng:[37,-94],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[30,-97],name:"US"},{latLng:[38,-94],name:"US"},{latLng:[38,-83],name:"US"},{latLng:[38,-79],name:"US"},{latLng:[36,-92],name:"US"},{latLng:[30,-85],name:"US"},{latLng:[43,-83],name:"US"},{latLng:[46,-91],name:"US"},{latLng:[33,-99],name:"US"},{latLng:[44,-98],name:"US"},{latLng:[42,-111],name:"US"},{latLng:[35,-76],name:"US"},{latLng:[32,-80],name:"US"},{latLng:[30,-93],name:"US"},{latLng:[36,-100],name:"US"},{latLng:[40,-80],name:"US"},{latLng:[38,-113],name:"US"},{latLng:[45,-112],name:"US"},{latLng:[46,-95],name:"US"},{latLng:[35,-99],name:"US"},{latLng:[40,-78],name:"US"},{latLng:[35,-86],name:"US"},{latLng:[37,-79],name:"US"},{latLng:[28,-97],name:"US"},{latLng:[43,-71],name:"US"},{latLng:[36,-83],name:"US"},{latLng:[31,-97],name:"US"},{latLng:[40,-80],name:"US"},{latLng:[47,-94],name:"US"},{latLng:[31,-83],name:"US"},{latLng:[47,-116],name:"US"},{latLng:[43,-101],name:"US"},{latLng:[43,-73],name:"US"},{latLng:[48,-99],name:"US"},{latLng:[37,-103],name:"US"},{latLng:[36,-94],name:"US"},{latLng:[40,-87],name:"US"},{latLng:[42,-92],name:"US"},{latLng:[45,-93],name:"US"},{latLng:[34,-89],name:"US"},{latLng:[38,-93],name:"US"},{latLng:[44,-123],name:"US"},{latLng:[36,-88],name:"US"},{latLng:[46,-119],name:"US"},{latLng:[44,-86],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[33,-79],name:"US"},{latLng:[39,-78],name:"US"},{latLng:[40,-75],name:"US"},{latLng:[42,-73],name:"US"},{latLng:[35,-106],name:"US"},{latLng:[31,-83],name:"US"},{latLng:[41,-86],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[60,-159],name:"US"},{latLng:[29,-98],name:"US"},{latLng:[32,-87],name:"US"},{latLng:[32,-83],name:"US"},{latLng:[32,-93],name:"US"},{latLng:[45,-107],name:"US"},{latLng:[44,-107],name:"US"},{latLng:[45,-96],name:"US"},{latLng:[47,-103],name:"US"},{latLng:[43,-112],name:"US"},{latLng:[42,-92],name:"US"},{latLng:[40,-85],name:"US"},{latLng:[34,-78],name:"US"},{latLng:[43,-113],name:"US"},{latLng:[48,-108],name:"US"},{latLng:[41,-99],name:"US"},{latLng:[35,-98],name:"US"},{latLng:[40,-78],name:"US"},{latLng:[30,-98],name:"US"},{latLng:[37,-81],name:"US"},{latLng:[32,-83],name:"US"},{latLng:[35,-85],name:"US"},{latLng:[33,-86],name:"US"},{latLng:[35,-83],name:"US"},{latLng:[44,-94],name:"US"},{latLng:[43,-115],name:"US"},{latLng:[33,-90],name:"US"},{latLng:[37,-90],name:"US"},{latLng:[42,-97],name:"US"},{latLng:[38,-89],name:"US"},{latLng:[48,-116],name:"US"},{latLng:[43,-111],name:"US"},{latLng:[36,-93],name:"US"},{latLng:[42,-88],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[42,-93],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[38,-92],name:"US"},{latLng:[41,-98],name:"US"},{latLng:[38,-81],name:"US"},{latLng:[32,-101],name:"US"},{latLng:[31,-97],name:"US"},{latLng:[32,-93],name:"US"},{latLng:[37,-79],name:"US"},{latLng:[48,-100],name:"US"},{latLng:[40,-105],name:"US"},{latLng:[48,-116],name:"US"},{latLng:[37,-94],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[33,-94],name:"US"},{latLng:[46,-103],name:"US"},{latLng:[42,-103],name:"US"},{latLng:[41,-113],name:"US"},{latLng:[38,-82],name:"US"},{latLng:[42,-98],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[29,-82],name:"US"},{latLng:[41,-76],name:"US"},{latLng:[33,-92],name:"US"},{latLng:[35,-84],name:"US"},{latLng:[41,-85],name:"US"},{latLng:[31,-81],name:"US"},{latLng:[38,-80],name:"US"},{latLng:[29,-95],name:"US"},{latLng:[30,-96],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[37,-86],name:"US"},{latLng:[42,-92],name:"US"},{latLng:[28,-80],name:"US"},{latLng:[29,-103],name:"US"},{latLng:[34,-101],name:"US"},{latLng:[41,-71],name:"US"},{latLng:[41,-71],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[58,-156],name:"US"},{latLng:[46,-111],name:"US"},{latLng:[40,-73],name:"US"},{latLng:[40,-80],name:"US"},{latLng:[44,-96],name:"US"},{latLng:[30,-83],name:"US"},{latLng:[27,-98],name:"US"},{latLng:[42,-75],name:"US"},{latLng:[39,-105],name:"US"},{latLng:[26,-80],name:"US"},{latLng:[39,-90],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[39,-95],name:"US"},{latLng:[44,-94],name:"US"},{latLng:[42,-99],name:"US"},{latLng:[38,-83],name:"US"},{latLng:[45,-98],name:"US"},{latLng:[31,-98],name:"US"},{latLng:[44,-88],name:"US"},{latLng:[43,-99],name:"US"},{latLng:[34,-78],name:"US"},{latLng:[36,-77],name:"US"},{latLng:[32,-81],name:"US"},{latLng:[33,-96],name:"US"},{latLng:[42,-91],name:"US"},{latLng:[39,-94],name:"US"},{latLng:[37,-82],name:"US"},{latLng:[37,-78],name:"US"},{latLng:[40,-75],name:"US"},{latLng:[42,-95],name:"US"},{latLng:[37,-79],name:"US"},{latLng:[40,-99],name:"US"},{latLng:[44,-99],name:"US"},{latLng:[44,-91],name:"US"},{latLng:[37,-85],name:"US"},{latLng:[32,-81],name:"US"},{latLng:[32,-85],name:"US"},{latLng:[35,-82],name:"US"},{latLng:[41,-89],name:"US"},{latLng:[33,-81],name:"US"},{latLng:[35,-81],name:"US"},{latLng:[48,-102],name:"US"},{latLng:[46,-100],name:"US"},{latLng:[30,-96],name:"US"},{latLng:[39,-74],name:"US"},{latLng:[30,-98],name:"US"},{latLng:[45,-92],name:"US"},{latLng:[41,-96],name:"US"},{latLng:[31,-86],name:"US"},{latLng:[42,-92],name:"US"},{latLng:[37,-96],name:"US"},{latLng:[37,-86],name:"US"},{latLng:[36,-90],name:"US"},{latLng:[41,-97],name:"US"},{latLng:[39,-84],name:"US"},{latLng:[40,-79],name:"US"},{latLng:[39,-121],name:"US"},{latLng:[43,-113],name:"US"},{latLng:[44,-103],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[35,-80],name:"US"},{latLng:[38,-82],name:"US"},{latLng:[41,-111],name:"US"},{latLng:[32,-93],name:"US"},{latLng:[35,-98],name:"US"},{latLng:[38,-120],name:"US"},{latLng:[30,-93],name:"US"},{latLng:[37,-87],name:"US"},{latLng:[32,-92],name:"US"},{latLng:[39,-93],name:"US"},{latLng:[35,-81],name:"US"},{latLng:[29,-97],name:"US"},{latLng:[44,-72],name:"US"},{latLng:[33,-85],name:"US"},{latLng:[33,-92],name:"US"},{latLng:[30,-85],name:"US"},{latLng:[31,-84],name:"US"},{latLng:[39,-90],name:"US"},{latLng:[42,-94],name:"US"},{latLng:[42,-85],name:"US"},{latLng:[33,-89],name:"US"},{latLng:[33,-80],name:"US"},{latLng:[28,-96],name:"US"},{latLng:[38,-81],name:"US"},{latLng:[32,-99],name:"US"},{latLng:[38,-91],name:"US"},{latLng:[36,-88],name:"US"},{latLng:[44,-88],name:"US"},{latLng:[38,-76],name:"US"},{latLng:[43,-114],name:"US"},{latLng:[40,-78],name:"US"},{latLng:[30,-81],name:"US"},{latLng:[38,-92],name:"US"},{latLng:[39,-74],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[29,-93],name:"US"},{latLng:[41,-78],name:"US"},{latLng:[26,-97],name:"US"},{latLng:[32,-94],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[45,-100],name:"US"},{latLng:[36,-84],name:"US"},{latLng:[37,-79],name:"US"},{latLng:[44,-105],name:"US"},{latLng:[35,-97],name:"US"},{latLng:[32,-82],name:"US"},{latLng:[35,-86],name:"US"},{latLng:[43,-116],name:"US"},{latLng:[37,-89],name:"US"},{latLng:[39,-74],name:"US"},{latLng:[45,-109],name:"US"},{latLng:[40,-75],name:"US"},{latLng:[39,-110],name:"US"},{latLng:[41,-106],name:"US"},{latLng:[42,-111],name:"US"},{latLng:[36,-88],name:"US"},{latLng:[46,-92],name:"US"},{latLng:[38,-75],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[36,-93],name:"US"},{latLng:[33,-85],name:"US"},{latLng:[42,-89],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[42,-94],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[33,-89],name:"US"},{latLng:[39,-93],name:"US"},{latLng:[43,-71],name:"US"},{latLng:[40,-81],name:"US"},{latLng:[35,-88],name:"US"},{latLng:[36,-80],name:"US"},{latLng:[35,-101],name:"US"},{latLng:[39,-119],name:"US"},{latLng:[38,-83],name:"US"},{latLng:[36,-90],name:"US"},{latLng:[45,-104],name:"US"},{latLng:[34,-97],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[34,-76],name:"US"},{latLng:[44,-93],name:"US"},{latLng:[47,-111],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[39,-90],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[41,-94],name:"US"},{latLng:[41,-85],name:"US"},{latLng:[46,-94],name:"US"},{latLng:[38,-94],name:"US"},{latLng:[40,-96],name:"US"},{latLng:[46,-97],name:"US"},{latLng:[33,-94],name:"US"},{latLng:[42,-113],name:"US"},{latLng:[34,-102],name:"US"},{latLng:[36,-79],name:"US"},{latLng:[31,-91],name:"US"},{latLng:[35,-81],name:"US"},{latLng:[34,-85],name:"US"},{latLng:[33,-108],name:"US"},{latLng:[42,-78],name:"US"},{latLng:[48,-98],name:"US"},{latLng:[42,-76],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[41,-91],name:"US"},{latLng:[37,-93],name:"US"},{latLng:[42,-97],name:"US"},{latLng:[40,-77],name:"US"},{latLng:[43,-93],name:"US"},{latLng:[38,-106],name:"US"},{latLng:[32,-85],name:"US"},{latLng:[29,-94],name:"US"},{latLng:[40,-88],name:"US"},{latLng:[40,-83],name:"US"},{latLng:[39,-92],name:"US"},{latLng:[38,-76],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[43,-98],name:"US"},{latLng:[32,-79],name:"US"},{latLng:[45,-85],name:"US"},{latLng:[26,-81],name:"US"},{latLng:[37,-78],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[30,-82],name:"US"},{latLng:[38,-96],name:"US"},{latLng:[40,-101],name:"US"},{latLng:[32,-81],name:"US"},{latLng:[35,-79],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[34,-85],name:"US"},{latLng:[37,-96],name:"US"},{latLng:[42,-79],name:"US"},{latLng:[33,-104],name:"US"},{latLng:[36,-87],name:"US"},{latLng:[45,-84],name:"US"},{latLng:[47,-120],name:"US"},{latLng:[42,-76],name:"US"},{latLng:[42,-75],name:"US"},{latLng:[34,-85],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[42,-95],name:"US"},{latLng:[37,-94],name:"US"},{latLng:[35,-84],name:"US"},{latLng:[35,-94],name:"US"},{latLng:[35,-81],name:"US"},{latLng:[31,-95],name:"US"},{latLng:[42,-101],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[42,-72],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[34,-81],name:"US"},{latLng:[35,-88],name:"US"},{latLng:[34,-80],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[38,-102],name:"US"},{latLng:[39,-101],name:"US"},{latLng:[41,-102],name:"US"},{latLng:[43,-92],name:"US"},{latLng:[33,-88],name:"US"},{latLng:[33,-91],name:"US"},{latLng:[34,-100],name:"US"},{latLng:[32,-86],name:"US"},{latLng:[46,-84],name:"US"},{latLng:[45,-95],name:"US"},{latLng:[45,-91],name:"US"},{latLng:[45,-92],name:"US"},{latLng:[44,-73],name:"US"},{latLng:[32,-88],name:"US"},{latLng:[33,-89],name:"US"},{latLng:[34,-95],name:"US"},{latLng:[47,-110],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[39,-89],name:"US"},{latLng:[36,-87],name:"US"},{latLng:[36,-93],name:"US"},{latLng:[39,-118],name:"US"},{latLng:[34,-107],name:"US"},{latLng:[36,-102],name:"US"},{latLng:[28,-82],name:"US"},{latLng:[45,-122],name:"US"},{latLng:[32,-92],name:"US"},{latLng:[31,-90],name:"US"},{latLng:[36,-83],name:"US"},{latLng:[48,-123],name:"US"},{latLng:[43,-84],name:"US"},{latLng:[33,-80],name:"US"},{latLng:[41,-79],name:"US"},{latLng:[34,-93],name:"US"},{latLng:[44,-112],name:"US"},{latLng:[39,-87],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[37,-99],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[40,-91],name:"US"},{latLng:[36,-115],name:"US"},{latLng:[39,-83],name:"US"},{latLng:[44,-97],name:"US"},{latLng:[45,-122],name:"US"},{latLng:[44,-90],name:"US"},{latLng:[31,-87],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[41,-93],name:"US"},{latLng:[32,-88],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[45,-123],name:"US"},{latLng:[33,-85],name:"US"},{latLng:[36,-90],name:"US"},{latLng:[29,-81],name:"US"},{latLng:[31,-84],name:"US"},{latLng:[38,-88],name:"US"},{latLng:[39,-87],name:"US"},{latLng:[43,-95],name:"US"},{latLng:[39,-97],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[46,-96],name:"US"},{latLng:[33,-88],name:"US"},{latLng:[39,-94],name:"US"},{latLng:[40,-98],name:"US"},{latLng:[35,-83],name:"US"},{latLng:[42,-96],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[33,-98],name:"US"},{latLng:[38,-81],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[42,-91],name:"US"},{latLng:[39,-105],name:"US"},{latLng:[41,-78],name:"US"},{latLng:[46,-115],name:"US"},{latLng:[47,-95],name:"US"},{latLng:[33,-85],name:"US"},{latLng:[35,-92],name:"US"},{latLng:[39,-84],name:"US"},{latLng:[33,-92],name:"US"},{latLng:[35,-81],name:"US"},{latLng:[35,-97],name:"US"},{latLng:[30,-82],name:"US"},{latLng:[38,-89],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[41,-90],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[42,-84],name:"US"},{latLng:[39,-94],name:"US"},{latLng:[44,-73],name:"US"},{latLng:[39,-83],name:"US"},{latLng:[41,-77],name:"US"},{latLng:[39,-97],name:"US"},{latLng:[34,-90],name:"US"},{latLng:[34,-96],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[31,-109],name:"US"},{latLng:[33,-102],name:"US"},{latLng:[35,-83],name:"US"},{latLng:[35,-111],name:"US"},{latLng:[44,-97],name:"US"},{latLng:[31,-85],name:"US"},{latLng:[31,-82],name:"US"},{latLng:[35,-86],name:"US"},{latLng:[38,-95],name:"US"},{latLng:[31,-100],name:"US"},{latLng:[34,-87],name:"US"},{latLng:[38,-92],name:"US"},{latLng:[31,-99],name:"US"},{latLng:[39,-88],name:"US"},{latLng:[41,-97],name:"US"},{latLng:[36,-104],name:"US"},{latLng:[32,-80],name:"US"},{latLng:[26,-81],name:"US"},{latLng:[33,-96],name:"US"},{latLng:[34,-100],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[29,-96],name:"US"},{latLng:[31,-83],name:"US"},{latLng:[33,-93],name:"US"},{latLng:[30,-82],name:"US"},{latLng:[33,-82],name:"US"},{latLng:[42,-73],name:"US"},{latLng:[45,-123],name:"US"},{latLng:[41,-76],name:"US"},{latLng:[46,-117],name:"US"},{latLng:[43,-89],name:"US"},{latLng:[40,-80],name:"US"},{latLng:[34,-78],name:"US"},{latLng:[39,-122],name:"US"},{latLng:[29,-98],name:"US"},{latLng:[37,-99],name:"US"},{latLng:[34,-98],name:"US"},{latLng:[31,-98],name:"US"},{latLng:[31,-99],name:"US"},{latLng:[31,-91],name:"US"},{latLng:[31,-86],name:"US"},{latLng:[37,-106],name:"US"},{latLng:[37,-121],name:"US"},{latLng:[42,-105],name:"US"},{latLng:[35,-92],name:"US"},{latLng:[31,-83],name:"US"},{latLng:[41,-87],name:"US"},{latLng:[47,-90],name:"US"},{latLng:[33,-97],name:"US"},{latLng:[38,-92],name:"US"},{latLng:[44,-71],name:"US"},{latLng:[43,-124],name:"US"},{latLng:[32,-86],name:"US"},{latLng:[31,-90],name:"US"},{latLng:[45,-101],name:"US"},{latLng:[42,-76],name:"US"},{latLng:[31,-97],name:"US"},{latLng:[40,-81],name:"US"},{latLng:[37,-105],name:"US"},{latLng:[34,-100],name:"US"},{latLng:[34,-98],name:"US"},{latLng:[44,-95],name:"US"},{latLng:[31,-86],name:"US"},{latLng:[31,-89],name:"US"},{latLng:[37,-79],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[37,-96],name:"US"},{latLng:[46,-122],name:"US"},{latLng:[36,-95],name:"US"},{latLng:[37,-80],name:"US"},{latLng:[35,-90],name:"US"},{latLng:[31,-102],name:"US"},{latLng:[35,-77],name:"US"},{latLng:[35,-94],name:"US"},{latLng:[32,-83],name:"US"},{latLng:[39,-87],name:"US"},{latLng:[38,-86],name:"US"},{latLng:[42,-95],name:"US"},{latLng:[37,-94],name:"US"},{latLng:[44,-84],name:"US"},{latLng:[37,-91],name:"US"},{latLng:[40,-82],name:"US"},{latLng:[41,-80],name:"US"},{latLng:[43,-90],name:"US"},{latLng:[35,-96],name:"US"},{latLng:[31,-86],name:"US"},{latLng:[31,-83],name:"US"},{latLng:[35,-90],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[35,-89],name:"US"},{latLng:[30,-101],name:"US"},{latLng:[44,-120],name:"US"},{latLng:[44,-104],name:"US"},{latLng:[33,-101],name:"US"},{latLng:[35,-90],name:"US"},{latLng:[46,-94],name:"US"},{latLng:[38,-103],name:"US"},{latLng:[31,-104],name:"US"},{latLng:[34,-86],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[39,-88],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[43,-70],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[35,-78],name:"US"},{latLng:[40,-77],name:"US"},{latLng:[35,-84],name:"US"},{latLng:[37,-78],name:"US"},{latLng:[41,-96],name:"US"},{latLng:[36,-75],name:"US"},{latLng:[34,-103],name:"US"},{latLng:[42,-124],name:"US"},{latLng:[38,-105],name:"US"},{latLng:[44,-114],name:"US"},{latLng:[46,-105],name:"US"},{latLng:[41,-99],name:"US"},{latLng:[35,-99],name:"US"},{latLng:[43,-103],name:"US"},{latLng:[41,-81],name:"US"},{latLng:[34,-85],name:"US"},{latLng:[37,-93],name:"US"},{latLng:[40,-109],name:"US"},{latLng:[44,-93],name:"US"},{latLng:[42,-96],name:"US"},{latLng:[31,-85],name:"US"},{latLng:[36,-102],name:"US"},{latLng:[32,-87],name:"US"},{latLng:[33,-92],name:"US"},{latLng:[41,-94],name:"US"},{latLng:[37,-93],name:"US"},{latLng:[32,-96],name:"US"},{latLng:[43,-89],name:"US"},{latLng:[48,-105],name:"US"},{latLng:[36,-79],name:"US"},{latLng:[35,-75],name:"US"},{latLng:[40,-84],name:"US"},{latLng:[34,-79],name:"US"},{latLng:[40,-76],name:"US"},{latLng:[35,-80],name:"US"},{latLng:[36,-86],name:"US"},{latLng:[35,-80],name:"US"},{latLng:[38,-87],name:"US"},{latLng:[37,-87],name:"US"},{latLng:[39,-93],name:"US"},{latLng:[40,-92],name:"US"},{latLng:[40,-112],name:"US"},{latLng:[43,-98],name:"US"},{latLng:[42,-103],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[47,-104],name:"US"},{latLng:[40,-99],name:"US"},{latLng:[32,-101],name:"US"},{latLng:[45,-97],name:"US"},{latLng:[34,-104],name:"US"},{latLng:[32,-93],name:"US"},{latLng:[40,-88],name:"US"},{latLng:[34,-85],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[41,-88],name:"US"},{latLng:[41,-84],name:"US"},{latLng:[39,-94],name:"US"},{latLng:[35,-85],name:"US"},{latLng:[27,-81],name:"US"},{latLng:[34,-89],name:"US"},{latLng:[29,-97],name:"US"},{latLng:[34,-102],name:"US"},{latLng:[39,-84],name:"US"},{latLng:[30,-84],name:"US"},{latLng:[39,-85],name:"US"},{latLng:[40,-93],name:"US"},{latLng:[39,-100],name:"US"},{latLng:[35,-88],name:"US"},{latLng:[46,-113],name:"US"},{latLng:[41,-84],name:"US"},{latLng:[41,-123],name:"US"},{latLng:[40,-85],name:"US"},{latLng:[42,-91],name:"US"},{latLng:[42,-74],name:"US"},{latLng:[40,-83],name:"US"},{latLng:[36,-94],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[38,-107],name:"US"},{latLng:[45,-86],name:"US"},{latLng:[33,-95],name:"US"},{latLng:[63,-150],name:"US"},{latLng:[37,-91],name:"US"},{latLng:[33,-97],name:"US"},{latLng:[39,-104],name:"US"},{latLng:[40,-91],name:"US"},{latLng:[43,-121],name:"US"},{latLng:[33,-91],name:"US"},{latLng:[41,-102],name:"US"},{latLng:[44,-96],name:"US"},{latLng:[35,-99],name:"US"},{latLng:[45,-100],name:"US"},{latLng:[33,-100],name:"US"},{latLng:[37,-82],name:"US"},{latLng:[46,-98],name:"US"},{latLng:[43,-95],name:"US"},{latLng:[38,-97],name:"US"},{latLng:[46,-87],name:"US"},{latLng:[36,-87],name:"US"},{latLng:[59,-158],name:"US"},{latLng:[34,-79],name:"US"},{latLng:[28,-99],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[48,-103],name:"US"},{latLng:[29,-83],name:"US"},{latLng:[42,-96],name:"US"},{latLng:[39,-80],name:"US"},{latLng:[32,-83],name:"US"},{latLng:[44,-92],name:"US"},{latLng:[41,-96],name:"US"},{latLng:[43,-88],name:"US"},{latLng:[37,-108],name:"US"},{latLng:[32,-106],name:"US"},{latLng:[39,-95],name:"US"},{latLng:[34,-100],name:"US"},{latLng:[32,-83],name:"US"},{latLng:[44,-87],name:"US"},{latLng:[38,-76],name:"US"},{latLng:[33,-80],name:"US"},{latLng:[31,-84],name:"US"},{latLng:[39,-104],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[39,-88],name:"US"},{latLng:[38,-95],name:"US"},{latLng:[45,-95],name:"US"},{latLng:[36,-92],name:"US"},{latLng:[41,-96],name:"US"},{latLng:[38,-119],name:"US"},{latLng:[43,-123],name:"US"},{latLng:[43,-98],name:"US"},{latLng:[47,-119],name:"US"},{latLng:[46,-91],name:"US"},{latLng:[32,-106],name:"US"},{latLng:[33,-91],name:"US"},{latLng:[41,-88],name:"US"},{latLng:[38,-86],name:"US"},{latLng:[42,-90],name:"US"},{latLng:[40,-110],name:"US"},{latLng:[41,-70],name:"US"},{latLng:[41,-70],name:"US"},{latLng:[40,-101],name:"US"},{latLng:[36,-90],name:"US"},{latLng:[47,-102],name:"US"},{latLng:[44,-91],name:"US"},{latLng:[34,-77],name:"US"},{latLng:[36,-78],name:"US"},{latLng:[41,-73],name:"US"},{latLng:[30,-81],name:"US"},{latLng:[27,-98],name:"US"},{latLng:[36,-89],name:"US"},{latLng:[39,-106],name:"US"},{latLng:[31,-84],name:"US"},{latLng:[30,-91],name:"US"},{latLng:[32,-91],name:"US"},{latLng:[30,-91],name:"US"},{latLng:[32,-98],name:"US"},{latLng:[42,-84],name:"US"},{latLng:[44,-91],name:"US"},{latLng:[30,-82],name:"US"},{latLng:[31,-102],name:"US"},{latLng:[32,-104],name:"US"},{latLng:[47,-98],name:"US"},{latLng:[39,-87],name:"US"},{latLng:[35,-77],name:"US"},{latLng:[33,-81],name:"US"},{latLng:[37,-86],name:"US"},{latLng:[45,-99],name:"US"},{latLng:[38,-88],name:"US"},{latLng:[37,-99],name:"US"},{latLng:[29,-100],name:"US"},{latLng:[32,-81],name:"US"},{latLng:[39,-88],name:"US"},{latLng:[38,-120],name:"US"},{latLng:[38,-104],name:"US"},{latLng:[31,-106],name:"US"},{latLng:[39,-104],name:"US"},{latLng:[34,-82],name:"US"},{latLng:[37,-96],name:"US"},{latLng:[41,-78],name:"US"},{latLng:[41,-85],name:"US"},{latLng:[41,-115],name:"US"},{latLng:[41,-115],name:"US"},{latLng:[38,-83],name:"US"},{latLng:[38,-99],name:"US"},{latLng:[36,-99],name:"US"},{latLng:[32,-96],name:"US"},{latLng:[38,-98],name:"US"},{latLng:[32,-86],name:"US"},{latLng:[43,-115],name:"US"},{latLng:[32,-82],name:"US"},{latLng:[38,-110],name:"US"},{latLng:[43,-94],name:"US"},{latLng:[45,-84],name:"US"},{latLng:[46,-100],name:"US"},{latLng:[36,-77],name:"US"},{latLng:[32,-98],name:"US"},{latLng:[42,-78],name:"US"},{latLng:[41,-82],name:"US"},{latLng:[41,-80],name:"US"},{latLng:[31,-87],name:"US"},{latLng:[30,-87],name:"US"},{latLng:[37,-117],name:"US"},{latLng:[42,-70],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[44,-73],name:"US"},{latLng:[44,-71],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[34,-86],name:"US"},{latLng:[39,-116],name:"US"},{latLng:[30,-92],name:"US"},{latLng:[32,-81],name:"US"},{latLng:[64,-146],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[41,-73],name:"US"},{latLng:[39,-82],name:"US"},{latLng:[34,-81],name:"US"},{latLng:[43,-103],name:"US"},{latLng:[46,-104],name:"US"},{latLng:[31,-96],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[33,-96],name:"US"},{latLng:[43,-93],name:"US"},{latLng:[45,-99],name:"US"},{latLng:[35,-92],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[33,-87],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[39,-89],name:"US"},{latLng:[39,-85],name:"US"},{latLng:[42,-91],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[39,-83],name:"US"},{latLng:[39,-79],name:"US"},{latLng:[35,-89],name:"US"},{latLng:[29,-96],name:"US"},{latLng:[38,-81],name:"US"},{latLng:[36,-84],name:"US"},{latLng:[47,-109],name:"US"},{latLng:[48,-118],name:"US"},{latLng:[43,-92],name:"US"},{latLng:[40,-97],name:"US"},{latLng:[38,-100],name:"US"},{latLng:[32,-100],name:"US"},{latLng:[29,-81],name:"US"},{latLng:[48,-114],name:"US"},{latLng:[38,-83],name:"US"},{latLng:[34,-79],name:"US"},{latLng:[45,-88],name:"US"},{latLng:[34,-85],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[43,-92],name:"US"},{latLng:[37,-82],name:"US"},{latLng:[34,-101],name:"US"},{latLng:[36,-80],name:"US"},{latLng:[37,-78],name:"US"},{latLng:[33,-99],name:"US"},{latLng:[43,-88],name:"US"},{latLng:[40,-88],name:"US"},{latLng:[37,-99],name:"US"},{latLng:[41,-79],name:"US"},{latLng:[45,-88],name:"US"},{latLng:[31,-89],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[36,-80],name:"US"},{latLng:[29,-95],name:"US"},{latLng:[47,-98],name:"US"},{latLng:[40,-87],name:"US"},{latLng:[34,-87],name:"US"},{latLng:[35,-93],name:"US"},{latLng:[29,-84],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[42,-111],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[39,-85],name:"US"},{latLng:[42,-93],name:"US"},{latLng:[38,-95],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[32,-91],name:"US"},{latLng:[44,-70],name:"US"},{latLng:[42,-72],name:"US"},{latLng:[31,-90],name:"US"},{latLng:[38,-91],name:"US"},{latLng:[40,-98],name:"US"},{latLng:[44,-74],name:"US"},{latLng:[36,-78],name:"US"},{latLng:[39,-83],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[35,-86],name:"US"},{latLng:[33,-95],name:"US"},{latLng:[44,-72],name:"US"},{latLng:[36,-79],name:"US"},{latLng:[46,-118],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[39,-78],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[43,-93],name:"US"},{latLng:[31,-96],name:"US"},{latLng:[38,-105],name:"US"},{latLng:[44,-111],name:"US"},{latLng:[40,-95],name:"US"},{latLng:[43,-108],name:"US"},{latLng:[36,-119],name:"US"},{latLng:[28,-99],name:"US"},{latLng:[40,-100],name:"US"},{latLng:[36,-91],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[40,-90],name:"US"},{latLng:[41,-86],name:"US"},{latLng:[36,-89],name:"US"},{latLng:[43,-74],name:"US"},{latLng:[41,-84],name:"US"},{latLng:[39,-78],name:"US"},{latLng:[40,-99],name:"US"},{latLng:[30,-84],name:"US"},{latLng:[40,-96],name:"US"},{latLng:[32,-102],name:"US"},{latLng:[36,-80],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[45,-111],name:"US"},{latLng:[38,-82],name:"US"},{latLng:[29,-94],name:"US"},{latLng:[41,-102],name:"US"},{latLng:[39,-107],name:"US"},{latLng:[47,-107],name:"US"},{latLng:[41,-98],name:"US"},{latLng:[36,-97],name:"US"},{latLng:[37,-111],name:"US"},{latLng:[46,-117],name:"US"},{latLng:[34,-93],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[39,-79],name:"US"},{latLng:[34,-97],name:"US"},{latLng:[33,-101],name:"US"},{latLng:[38,-91],name:"US"},{latLng:[35,-81],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[38,-96],name:"US"},{latLng:[41,-81],name:"US"},{latLng:[44,-116],name:"US"},{latLng:[43,-83],name:"US"},{latLng:[43,-78],name:"US"},{latLng:[31,-85],name:"US"},{latLng:[40,-94],name:"US"},{latLng:[30,-88],name:"US"},{latLng:[33,-79],name:"US"},{latLng:[38,-87],name:"US"},{latLng:[35,-88],name:"US"},{latLng:[33,-110],name:"US"},{latLng:[29,-82],name:"US"},{latLng:[35,-87],name:"US"},{latLng:[37,-80],name:"US"},{latLng:[30,-98],name:"US"},{latLng:[45,-120],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[38,-80],name:"US"},{latLng:[39,-105],name:"US"},{latLng:[48,-112],name:"US"},{latLng:[26,-81],name:"US"},{latLng:[43,-84],name:"US"},{latLng:[33,-82],name:"US"},{latLng:[31,-101],name:"US"},{latLng:[39,-122],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[31,-81],name:"US"},{latLng:[46,-89],name:"US"},{latLng:[46,-109],name:"US"},{latLng:[46,-103],name:"US"},{latLng:[28,-97],name:"US"},{latLng:[29,-97],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[44,-92],name:"US"},{latLng:[42,-114],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[42,-104],name:"US"},{latLng:[40,-99],name:"US"},{latLng:[38,-100],name:"US"},{latLng:[30,-84],name:"US"},{latLng:[35,-97],name:"US"},{latLng:[43,-71],name:"US"},{latLng:[32,-109],name:"US"},{latLng:[39,-99],name:"US"},{latLng:[35,-83],name:"US"},{latLng:[36,-83],name:"US"},{latLng:[40,-106],name:"US"},{latLng:[38,-109],name:"US"},{latLng:[47,-97],name:"US"},{latLng:[44,-73],name:"US"},{latLng:[44,-85],name:"US"},{latLng:[46,-113],name:"US"},{latLng:[34,-92],name:"US"},{latLng:[40,-85],name:"US"},{latLng:[37,-101],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[31,-92],name:"US"},{latLng:[45,-96],name:"US"},{latLng:[41,-101],name:"US"},{latLng:[32,-108],name:"US"},{latLng:[46,-101],name:"US"},{latLng:[36,-97],name:"US"},{latLng:[44,-119],name:"US"},{latLng:[45,-96],name:"US"},{latLng:[47,-119],name:"US"},{latLng:[39,-79],name:"US"},{latLng:[42,-90],name:"US"},{latLng:[36,-78],name:"US"},{latLng:[43,-84],name:"US"},{latLng:[36,-88],name:"US"},{latLng:[37,-100],name:"US"},{latLng:[35,-100],name:"US"},{latLng:[47,-123],name:"US"},{latLng:[37,-86],name:"US"},{latLng:[33,-96],name:"US"},{latLng:[36,-81],name:"US"},{latLng:[38,-101],name:"US"},{latLng:[41,-98],name:"US"},{latLng:[37,-85],name:"US"},{latLng:[42,-89],name:"US"},{latLng:[43,-89],name:"US"},{latLng:[37,-80],name:"US"},{latLng:[32,-87],name:"US"},{latLng:[36,-90],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[39,-90],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[42,-94],name:"US"},{latLng:[31,-88],name:"US"},{latLng:[37,-93],name:"US"},{latLng:[42,-74],name:"US"},{latLng:[35,-77],name:"US"},{latLng:[39,-83],name:"US"},{latLng:[39,-80],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[33,-109],name:"US"},{latLng:[36,-77],name:"US"},{latLng:[38,-82],name:"US"},{latLng:[34,-82],name:"US"},{latLng:[37,-96],name:"US"},{latLng:[34,-82],name:"US"},{latLng:[34,-99],name:"US"},{latLng:[32,-94],name:"US"},{latLng:[43,-99],name:"US"},{latLng:[33,-89],name:"US"},{latLng:[47,-98],name:"US"},{latLng:[30,-95],name:"US"},{latLng:[41,-88],name:"US"},{latLng:[42,-92],name:"US"},{latLng:[40,-93],name:"US"},{latLng:[35,-85],name:"US"},{latLng:[34,-104],name:"US"},{latLng:[29,-97],name:"US"},{latLng:[40,-81],name:"US"},{latLng:[36,-79],name:"US"},{latLng:[29,-85],name:"US"},{latLng:[38,-107],name:"US"},{latLng:[41,-94],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[44,-101],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[59,-135],name:"US"},{latLng:[32,-87],name:"US"},{latLng:[34,-101],name:"US"},{latLng:[36,-77],name:"US"},{latLng:[36,-78],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[40,-98],name:"US"},{latLng:[34,-100],name:"US"},{latLng:[36,-83],name:"US"},{latLng:[30,-82],name:"US"},{latLng:[38,-88],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[42,-93],name:"US"},{latLng:[37,-101],name:"US"},{latLng:[40,-98],name:"US"},{latLng:[43,-74],name:"US"},{latLng:[39,-84],name:"US"},{latLng:[35,-85],name:"US"},{latLng:[31,-98],name:"US"},{latLng:[44,-97],name:"US"},{latLng:[42,-72],name:"US"},{latLng:[42,-72],name:"US"},{latLng:[39,-78],name:"US"},{latLng:[32,-81],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[33,-82],name:"US"},{latLng:[40,-91],name:"US"},{latLng:[39,-85],name:"US"},{latLng:[43,-93],name:"US"},{latLng:[37,-86],name:"US"},{latLng:[44,-68],name:"US"},{latLng:[30,-89],name:"US"},{latLng:[41,-83],name:"US"},{latLng:[36,-83],name:"US"},{latLng:[40,-80],name:"US"},{latLng:[44,-99],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[36,-101],name:"US"},{latLng:[43,-97],name:"US"},{latLng:[33,-85],name:"US"},{latLng:[27,-81],name:"US"},{latLng:[35,-88],name:"US"},{latLng:[34,-99],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[42,-93],name:"US"},{latLng:[37,-85],name:"US"},{latLng:[40,-83],name:"US"},{latLng:[35,-88],name:"US"},{latLng:[30,-94],name:"US"},{latLng:[35,-103],name:"US"},{latLng:[45,-103],name:"US"},{latLng:[39,-78],name:"US"},{latLng:[39,-76],name:"US"},{latLng:[36,-83],name:"US"},{latLng:[40,-99],name:"US"},{latLng:[34,-99],name:"US"},{latLng:[35,-78],name:"US"},{latLng:[43,-118],name:"US"},{latLng:[37,-98],name:"US"},{latLng:[36,-99],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[29,-95],name:"US"},{latLng:[38,-86],name:"US"},{latLng:[41,-95],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[30,-89],name:"US"},{latLng:[40,-93],name:"US"},{latLng:[40,-81],name:"US"},{latLng:[32,-94],name:"US"},{latLng:[39,-80],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[34,-82],name:"US"},{latLng:[37,-85],name:"US"},{latLng:[41,-72],name:"US"},{latLng:[35,-102],name:"US"},{latLng:[38,-97],name:"US"},{latLng:[37,-100],name:"US"},{latLng:[35,-95],name:"US"},{latLng:[33,-99],name:"US"},{latLng:[19,-155],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[40,-101],name:"US"},{latLng:[30,-98],name:"US"},{latLng:[35,-82],name:"US"},{latLng:[35,-89],name:"US"},{latLng:[33,-85],name:"US"},{latLng:[35,-100],name:"US"},{latLng:[33,-93],name:"US"},{latLng:[40,-90],name:"US"},{latLng:[37,-87],name:"US"},{latLng:[35,-82],name:"US"},{latLng:[35,-88],name:"US"},{latLng:[32,-95],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[26,-81],name:"US"},{latLng:[45,-93],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[31,-85],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[41,-90],name:"US"},{latLng:[39,-85],name:"US"},{latLng:[40,-91],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[38,-93],name:"US"},{latLng:[41,-84],name:"US"},{latLng:[36,-88],name:"US"},{latLng:[36,-79],name:"US"},{latLng:[43,-74],name:"US"},{latLng:[28,-82],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[46,-102],name:"US"},{latLng:[36,-88],name:"US"},{latLng:[35,-87],name:"US"},{latLng:[37,-93],name:"US"},{latLng:[31,-108],name:"US"},{latLng:[26,-98],name:"US"},{latLng:[39,-83],name:"US"},{latLng:[38,-79],name:"US"},{latLng:[27,-81],name:"US"},{latLng:[48,-110],name:"US"},{latLng:[31,-97],name:"US"},{latLng:[27,-82],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[41,-84],name:"US"},{latLng:[32,-90],name:"US"},{latLng:[37,-107],name:"US"},{latLng:[40,-101],name:"US"},{latLng:[39,-82],name:"US"},{latLng:[33,-102],name:"US"},{latLng:[38,-99],name:"US"},{latLng:[35,-79],name:"US"},{latLng:[30,-85],name:"US"},{latLng:[33,-90],name:"US"},{latLng:[40,-81],name:"US"},{latLng:[40,-95],name:"US"},{latLng:[42,-98],name:"US"},{latLng:[21,-157],name:"US"},{latLng:[32,-97],name:"US"},{latLng:[45,-121],name:"US"},{latLng:[41,-101],name:"US"},{latLng:[58,-135],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[37,-87],name:"US"},{latLng:[33,-95],name:"US"},{latLng:[33,-78],name:"US"},{latLng:[34,-92],name:"US"},{latLng:[43,-108],name:"US"},{latLng:[46,-88],name:"US"},{latLng:[31,-85],name:"US"},{latLng:[32,-83],name:"US"},{latLng:[43,-91],name:"US"},{latLng:[36,-87],name:"US"},{latLng:[31,-95],name:"US"},{latLng:[34,-93],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[43,-92],name:"US"},{latLng:[39,-76],name:"US"},{latLng:[39,-92],name:"US"},{latLng:[41,-98],name:"US"},{latLng:[32,-101],name:"US"},{latLng:[36,-91],name:"US"},{latLng:[47,-94],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[31,-105],name:"US"},{latLng:[37,-104],name:"US"},{latLng:[35,-96],name:"US"},{latLng:[44,-99],name:"US"},{latLng:[40,-123],name:"US"},{latLng:[42,-94],name:"US"},{latLng:[41,-118],name:"US"},{latLng:[33,-90],name:"US"},{latLng:[36,-87],name:"US"},{latLng:[33,-96],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[40,-77],name:"US"},{latLng:[40,-85],name:"US"},{latLng:[43,-83],name:"US"},{latLng:[41,-82],name:"US"},{latLng:[43,-97],name:"US"},{latLng:[35,-101],name:"US"},{latLng:[35,-76],name:"US"},{latLng:[44,-99],name:"US"},{latLng:[29,-91],name:"US"},{latLng:[30,-91],name:"US"},{latLng:[42,-95],name:"US"},{latLng:[45,-115],name:"US"},{latLng:[33,-115],name:"US"},{latLng:[35,-91],name:"US"},{latLng:[27,-80],name:"US"},{latLng:[40,-79],name:"US"},{latLng:[42,-84],name:"US"},{latLng:[36,-117],name:"US"},{latLng:[42,-85],name:"US"},{latLng:[44,-83],name:"US"},{latLng:[41,-92],name:"US"},{latLng:[43,-90],name:"US"},{latLng:[35,-80],name:"US"},{latLng:[31,-100],name:"US"},{latLng:[46,-88],name:"US"},{latLng:[37,-90],name:"US"},{latLng:[37,-113],name:"US"},{latLng:[46,-90],name:"US"},{latLng:[40,-87],name:"US"},{latLng:[31,-83],name:"US"},{latLng:[43,-84],name:"US"},{latLng:[45,-93],name:"US"},{latLng:[48,-122],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[32,-90],name:"US"},{latLng:[47,-93],name:"US"},{latLng:[34,-88],name:"US"},{latLng:[36,-91],name:"US"},{latLng:[33,-98],name:"US"},{latLng:[34,-85],name:"US"},{latLng:[35,-91],name:"US"},{latLng:[40,-106],name:"US"},{latLng:[30,-85],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[37,-89],name:"US"},{latLng:[38,-86],name:"US"},{latLng:[42,-90],name:"US"},{latLng:[39,-95],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[32,-92],name:"US"},{latLng:[42,-84],name:"US"},{latLng:[43,-95],name:"US"},{latLng:[30,-88],name:"US"},{latLng:[39,-94],name:"US"},{latLng:[35,-83],name:"US"},{latLng:[39,-82],name:"US"},{latLng:[34,-99],name:"US"},{latLng:[42,-122],name:"US"},{latLng:[43,-101],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[28,-96],name:"US"},{latLng:[38,-81],name:"US"},{latLng:[44,-90],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[39,-88],name:"US"},{latLng:[41,-87],name:"US"},{latLng:[41,-93],name:"US"},{latLng:[32,-89],name:"US"},{latLng:[37,-94],name:"US"},{latLng:[32,-81],name:"US"},{latLng:[30,-94],name:"US"},{latLng:[40,-85],name:"US"},{latLng:[31,-82],name:"US"},{latLng:[30,-104],name:"US"},{latLng:[33,-86],name:"US"},{latLng:[34,-91],name:"US"},{latLng:[39,-105],name:"US"},{latLng:[30,-83],name:"US"},{latLng:[33,-82],name:"US"},{latLng:[43,-112],name:"US"},{latLng:[38,-88],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[41,-91],name:"US"},{latLng:[39,-95],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[29,-90],name:"US"},{latLng:[31,-91],name:"US"},{latLng:[38,-90],name:"US"},{latLng:[46,-112],name:"US"},{latLng:[40,-97],name:"US"},{latLng:[44,-75],name:"US"},{latLng:[40,-80],name:"US"},{latLng:[34,-97],name:"US"},{latLng:[44,-121],name:"US"},{latLng:[41,-78],name:"US"},{latLng:[36,-83],name:"US"},{latLng:[29,-94],name:"US"},{latLng:[47,-123],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[43,-88],name:"US"},{latLng:[30,-92],name:"US"},{latLng:[31,-89],name:"US"},{latLng:[32,-81],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[44,-98],name:"US"},{latLng:[42,-114],name:"US"},{latLng:[39,-90],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[39,-98],name:"US"},{latLng:[27,-98],name:"US"},{latLng:[27,-98],name:"US"},{latLng:[42,-90],name:"US"},{latLng:[35,-93],name:"US"},{latLng:[32,-82],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[41,-91],name:"US"},{latLng:[38,-94],name:"US"},{latLng:[37,-82],name:"US"},{latLng:[38,-93],name:"US"},{latLng:[40,-96],name:"US"},{latLng:[36,-81],name:"US"},{latLng:[32,-97],name:"US"},{latLng:[44,-106],name:"US"},{latLng:[35,-78],name:"US"},{latLng:[34,-96],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[42,-91],name:"US"},{latLng:[31,-89],name:"US"},{latLng:[35,-77],name:"US"},{latLng:[43,-100],name:"US"},{latLng:[32,-99],name:"US"},{latLng:[42,-123],name:"US"},{latLng:[39,-112],name:"US"},{latLng:[47,-110],name:"US"},{latLng:[58,-134],name:"US"},{latLng:[43,-90],name:"US"},{latLng:[40,-77],name:"US"},{latLng:[42,-85],name:"US"},{latLng:[21,-156],name:"US"},{latLng:[44,-85],name:"US"},{latLng:[45,-93],name:"US"},{latLng:[38,-81],name:"US"},{latLng:[45,-95],name:"US"},{latLng:[41,-88],name:"US"},{latLng:[37,-111],name:"US"},{latLng:[41,-87],name:"US"},{latLng:[39,-94],name:"US"},{latLng:[28,-97],name:"US"},{latLng:[22,-159],name:"US"},{latLng:[32,-96],name:"US"},{latLng:[36,-97],name:"US"},{latLng:[40,-98],name:"US"},{latLng:[38,-101],name:"US"},{latLng:[41,-101],name:"US"},{latLng:[32,-88],name:"US"},{latLng:[60,-151],name:"US"},{latLng:[41,-88],name:"US"},{latLng:[29,-98],name:"US"},{latLng:[26,-97],name:"US"},{latLng:[44,-69],name:"US"},{latLng:[42,-88],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[39,-76],name:"US"},{latLng:[43,-85],name:"US"},{latLng:[41,-71],name:"US"},{latLng:[33,-100],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[41,-92],name:"US"},{latLng:[35,-118],name:"US"},{latLng:[30,-99],name:"US"},{latLng:[34,-80],name:"US"},{latLng:[55,-130],name:"US"},{latLng:[44,-87],name:"US"},{latLng:[47,-88],name:"US"},{latLng:[42,-99],name:"US"},{latLng:[46,-99],name:"US"},{latLng:[41,-103],name:"US"},{latLng:[30,-99],name:"US"},{latLng:[33,-100],name:"US"},{latLng:[47,-121],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[35,-97],name:"US"},{latLng:[37,-98],name:"US"},{latLng:[36,-119],name:"US"},{latLng:[40,-73],name:"US"},{latLng:[44,-97],name:"US"},{latLng:[29,-100],name:"US"},{latLng:[38,-102],name:"US"},{latLng:[37,-99],name:"US"},{latLng:[34,-98],name:"US"},{latLng:[39,-102],name:"US"},{latLng:[47,-122],name:"US"},{latLng:[47,-120],name:"US"},{latLng:[48,-96],name:"US"},{latLng:[42,-121],name:"US"},{latLng:[27,-97],name:"US"},{latLng:[45,-120],name:"US"},{latLng:[37,-82],name:"US"},{latLng:[40,-90],name:"US"},{latLng:[38,-87],name:"US"},{latLng:[36,-83],name:"US"},{latLng:[44,-69],name:"US"},{latLng:[40,-92],name:"US"},{latLng:[42,-97],name:"US"},{latLng:[40,-82],name:"US"},{latLng:[35,-83],name:"US"},{latLng:[33,-99],name:"US"},{latLng:[57,-153],name:"US"},{latLng:[48,-93],name:"US"},{latLng:[47,-116],name:"US"},{latLng:[41,-85],name:"US"},{latLng:[43,-94],name:"US"},{latLng:[62,-163],name:"US"},{latLng:[43,-91],name:"US"},{latLng:[33,-113],name:"US"},{latLng:[37,-107],name:"US"},{latLng:[28,-99],name:"US"},{latLng:[41,-85],name:"US"},{latLng:[46,-98],name:"US"},{latLng:[41,-86],name:"US"},{latLng:[41,-88],name:"US"},{latLng:[31,-92],name:"US"},{latLng:[37,-95],name:"US"},{latLng:[44,-96],name:"US"},{latLng:[41,-75],name:"US"},{latLng:[37,-92],name:"US"},{latLng:[33,-93],name:"US"},{latLng:[29,-83],name:"US"},{latLng:[30,-92],name:"US"},{latLng:[34,-89],name:"US"},{latLng:[39,-93],name:"US"},{latLng:[42,-90],name:"US"},{latLng:[29,-90],name:"US"},{latLng:[39,-122],name:"US"},{latLng:[39,-106],name:"US"},{latLng:[28,-81],name:"US"},{latLng:[42,-88],name:"US"},{latLng:[41,-87],name:"US"},{latLng:[43,-85],name:"US"},{latLng:[47,-91],name:"US"},{latLng:[47,-114],name:"US"},{latLng:[41,-81],name:"US"},{latLng:[42,-120],name:"US"},{latLng:[44,-97],name:"US"},{latLng:[36,-89],name:"US"},{latLng:[58,-156],name:"US"},{latLng:[48,-94],name:"US"},{latLng:[33,-88],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[31,-89],name:"US"},{latLng:[33,-95],name:"US"},{latLng:[34,-102],name:"US"},{latLng:[44,-72],name:"US"},{latLng:[31,-98],name:"US"},{latLng:[40,-96],name:"US"},{latLng:[40,-76],name:"US"},{latLng:[34,-80],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[39,-117],name:"US"},{latLng:[38,-100],name:"US"},{latLng:[43,-122],name:"US"},{latLng:[45,-89],name:"US"},{latLng:[31,-83],name:"US"},{latLng:[43,-83],name:"US"},{latLng:[41,-104],name:"US"},{latLng:[40,-105],name:"US"},{latLng:[37,-85],name:"US"},{latLng:[37,-104],name:"US"},{latLng:[40,-120],name:"US"},{latLng:[46,-116],name:"US"},{latLng:[34,-95],name:"US"},{latLng:[34,-87],name:"US"},{latLng:[32,-88],name:"US"},{latLng:[35,-89],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[32,-82],name:"US"},{latLng:[34,-82],name:"US"},{latLng:[29,-96],name:"US"},{latLng:[34,-87],name:"US"},{latLng:[36,-91],name:"US"},{latLng:[38,-87],name:"US"},{latLng:[38,-86],name:"US"},{latLng:[38,-82],name:"US"},{latLng:[31,-90],name:"US"},{latLng:[37,-93],name:"US"},{latLng:[38,-82],name:"US"},{latLng:[40,-80],name:"US"},{latLng:[44,-103],name:"US"},{latLng:[35,-87],name:"US"},{latLng:[34,-94],name:"US"},{latLng:[44,-93],name:"US"},{latLng:[32,-103],name:"US"},{latLng:[32,-89],name:"US"},{latLng:[39,-95],name:"US"},{latLng:[40,-76],name:"US"},{latLng:[32,-85],name:"US"},{latLng:[34,-90],name:"US"},{latLng:[26,-81],name:"US"},{latLng:[31,-84],name:"US"},{latLng:[41,-89],name:"US"},{latLng:[40,-91],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[34,-88],name:"US"},{latLng:[35,-79],name:"US"},{latLng:[34,-80],name:"US"},{latLng:[30,-96],name:"US"},{latLng:[36,-83],name:"US"},{latLng:[44,-85],name:"US"},{latLng:[33,-90],name:"US"},{latLng:[40,-75],name:"US"},{latLng:[44,-113],name:"US"},{latLng:[41,-84],name:"US"},{latLng:[35,-77],name:"US"},{latLng:[30,-84],name:"US"},{latLng:[31,-95],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[37,-82],name:"US"},{latLng:[29,-82],name:"US"},{latLng:[46,-116],name:"US"},{latLng:[38,-83],name:"US"},{latLng:[40,-91],name:"US"},{latLng:[43,-75],name:"US"},{latLng:[35,-87],name:"US"},{latLng:[46,-122],name:"US"},{latLng:[38,-80],name:"US"},{latLng:[47,-112],name:"US"},{latLng:[33,-81],name:"US"},{latLng:[37,-79],name:"US"},{latLng:[30,-84],name:"US"},{latLng:[31,-81],name:"US"},{latLng:[48,-111],name:"US"},{latLng:[30,-94],name:"US"},{latLng:[40,-82],name:"US"},{latLng:[34,-86],name:"US"},{latLng:[31,-96],name:"US"},{latLng:[33,-91],name:"US"},{latLng:[38,-103],name:"US"},{latLng:[33,-82],name:"US"},{latLng:[43,-114],name:"US"},{latLng:[39,-98],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[32,-92],name:"US"},{latLng:[44,-69],name:"US"},{latLng:[44,-96],name:"US"},{latLng:[31,-90],name:"US"},{latLng:[39,-90],name:"US"},{latLng:[48,-115],name:"US"},{latLng:[41,-100],name:"US"},{latLng:[37,-114],name:"US"},{latLng:[33,-105],name:"US"},{latLng:[35,-81],name:"US"},{latLng:[35,-96],name:"US"},{latLng:[44,-123],name:"US"},{latLng:[43,-96],name:"US"},{latLng:[35,-86],name:"US"},{latLng:[47,-118],name:"US"},{latLng:[38,-82],name:"US"},{latLng:[45,-89],name:"US"},{latLng:[42,-110],name:"US"},{latLng:[42,-91],name:"US"},{latLng:[38,-94],name:"US"},{latLng:[39,-93],name:"US"},{latLng:[44,-122],name:"US"},{latLng:[36,-100],name:"US"},{latLng:[41,-73],name:"US"},{latLng:[33,-94],name:"US"},{latLng:[28,-98],name:"US"},{latLng:[40,-88],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[30,-90],name:"US"},{latLng:[42,-83],name:"US"},{latLng:[39,-93],name:"US"},{latLng:[42,-77],name:"US"},{latLng:[30,-98],name:"US"},{latLng:[35,-93],name:"US"},{latLng:[40,-103],name:"US"},{latLng:[40,-89],name:"US"},{latLng:[38,-101],name:"US"},{latLng:[36,-86],name:"US"},{latLng:[41,-100],name:"US"},{latLng:[46,-99],name:"US"},{latLng:[40,-83],name:"US"},{latLng:[35,-97],name:"US"},{latLng:[37,-81],name:"US"},{latLng:[31,-81],name:"US"},{latLng:[34,-91],name:"US"},{latLng:[41,-82],name:"US"},{latLng:[35,-106],name:"US"},{latLng:[34,-118],name:"US"},{latLng:[35,-84],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[41,-91],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[41,-99],name:"US"},{latLng:[33,-97],name:"US"},{latLng:[31,-103],name:"US"},{latLng:[32,-86],name:"US"},{latLng:[30,-83],name:"US"},{latLng:[33,-88],name:"US"},{latLng:[33,-101],name:"US"},{latLng:[41,-93],name:"US"},{latLng:[41,-83],name:"US"},{latLng:[46,-85],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[32,-107],name:"US"},{latLng:[36,-78],name:"US"},{latLng:[41,-75],name:"US"},{latLng:[41,-77],name:"US"},{latLng:[43,-99],name:"US"},{latLng:[37,-79],name:"US"},{latLng:[33,-101],name:"US"},{latLng:[43,-96],name:"US"},{latLng:[38,-96],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[44,-95],name:"US"},{latLng:[39,-119],name:"US"},{latLng:[46,-85],name:"US"},{latLng:[42,-82],name:"US"},{latLng:[32,-85],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[39,-88],name:"US"},{latLng:[39,-92],name:"US"},{latLng:[35,-83],name:"US"},{latLng:[36,-86],name:"US"},{latLng:[39,-89],name:"US"},{latLng:[37,-119],name:"US"},{latLng:[34,-86],name:"US"},{latLng:[36,-93],name:"US"},{latLng:[30,-83],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[43,-111],name:"US"},{latLng:[38,-89],name:"US"},{latLng:[40,-85],name:"US"},{latLng:[41,-94],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[32,-91],name:"US"},{latLng:[32,-90],name:"US"},{latLng:[37,-90],name:"US"},{latLng:[45,-111],name:"US"},{latLng:[41,-97],name:"US"},{latLng:[42,-75],name:"US"},{latLng:[35,-82],name:"US"},{latLng:[39,-83],name:"US"},{latLng:[35,-88],name:"US"},{latLng:[30,-95],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[41,-92],name:"US"},{latLng:[47,-95],name:"US"},{latLng:[41,-80],name:"US"},{latLng:[36,-98],name:"US"},{latLng:[43,-117],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[27,-82],name:"US"},{latLng:[44,-86],name:"US"},{latLng:[44,-87],name:"US"},{latLng:[44,-89],name:"US"},{latLng:[32,-87],name:"US"},{latLng:[33,-112],name:"US"},{latLng:[38,-91],name:"US"},{latLng:[38,-122],name:"US"},{latLng:[45,-88],name:"US"},{latLng:[34,-87],name:"US"},{latLng:[36,-92],name:"US"},{latLng:[29,-82],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[38,-88],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[41,-93],name:"US"},{latLng:[38,-97],name:"US"},{latLng:[37,-85],name:"US"},{latLng:[31,-89],name:"US"},{latLng:[39,-91],name:"US"},{latLng:[40,-83],name:"US"},{latLng:[44,-122],name:"US"},{latLng:[34,-79],name:"US"},{latLng:[35,-85],name:"US"},{latLng:[32,-94],name:"US"},{latLng:[39,-80],name:"US"},{latLng:[37,-119],name:"US"},{latLng:[34,-79],name:"US"},{latLng:[46,-87],name:"US"},{latLng:[43,-89],name:"US"},{latLng:[34,-86],name:"US"},{latLng:[41,-89],name:"US"},{latLng:[41,-86],name:"US"},{latLng:[42,-92],name:"US"},{latLng:[39,-96],name:"US"},{latLng:[36,-88],name:"US"},{latLng:[48,-96],name:"US"},{latLng:[34,-89],name:"US"},{latLng:[34,-96],name:"US"},{latLng:[45,-97],name:"US"},{latLng:[35,-86],name:"US"},{latLng:[39,-80],name:"US"},{latLng:[27,-80],name:"US"},{latLng:[38,-86],name:"US"},{latLng:[37,-82],name:"US"},{latLng:[43,-94],name:"US"},{latLng:[35,-77],name:"US"},{latLng:[32,-101],name:"US"},{latLng:[36,-79],name:"US"},{latLng:[40,-89],name:"US"},{latLng:[38,-83],name:"US"},{latLng:[43,-86],name:"US"},{latLng:[30,-99],name:"US"},{latLng:[47,-123],name:"US"},{latLng:[38,-82],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[28,-96],name:"US"},{latLng:[62,-149],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[20,-156],name:"US"},{latLng:[35,-87],name:"US"},{latLng:[28,-100],name:"US"},{latLng:[36,-95],name:"US"},{latLng:[35,-97],name:"US"},{latLng:[47,-105],name:"US"},{latLng:[43,-97],name:"US"},{latLng:[33,-82],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[36,-84],name:"US"},{latLng:[31,-99],name:"US"},{latLng:[34,-94],name:"US"},{latLng:[36,-94],name:"US"},{latLng:[40,-90],name:"US"},{latLng:[35,-82],name:"US"},{latLng:[37,-81],name:"US"},{latLng:[33,-82],name:"US"},{latLng:[42,-88],name:"US"},{latLng:[48,-100],name:"US"},{latLng:[31,-81],name:"US"},{latLng:[46,-99],name:"US"},{latLng:[35,-95],name:"US"},{latLng:[41,-78],name:"US"},{latLng:[47,-103],name:"US"},{latLng:[35,-108],name:"US"},{latLng:[40,-88],name:"US"},{latLng:[37,-87],name:"US"},{latLng:[47,-101],name:"US"},{latLng:[31,-97],name:"US"},{latLng:[44,-94],name:"US"},{latLng:[35,-84],name:"US"},{latLng:[28,-98],name:"US"},{latLng:[35,-88],name:"US"},{latLng:[38,-97],name:"US"},{latLng:[41,-101],name:"US"},{latLng:[45,-99],name:"US"},{latLng:[37,-100],name:"US"},{latLng:[37,-86],name:"US"},{latLng:[44,-102],name:"US"},{latLng:[46,-110],name:"US"},{latLng:[35,-80],name:"US"},{latLng:[36,-78],name:"US"},{latLng:[43,-85],name:"US"},{latLng:[41,-81],name:"US"},{latLng:[29,-99],name:"US"},{latLng:[45,-94],name:"US"},{latLng:[39,-82],name:"US"},{latLng:[35,-84],name:"US"},{latLng:[43,-100],name:"US"},{latLng:[40,-89],name:"US"},{latLng:[30,-99],name:"US"},{latLng:[39,-123],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[45,-87],name:"US"},{latLng:[45,-88],name:"US"},{latLng:[37,-120],name:"US"},{latLng:[41,-90],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[40,-93],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[47,-101],name:"US"},{latLng:[40,-84],name:"US"},{latLng:[41,-80],name:"US"},{latLng:[37,-81],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[41,-98],name:"US"},{latLng:[43,-71],name:"US"},{latLng:[39,-108],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[38,-94],name:"US"},{latLng:[40,-84],name:"US"},{latLng:[25,-80],name:"US"},{latLng:[41,-72],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[43,-84],name:"US"},{latLng:[31,-102],name:"US"},{latLng:[40,-77],name:"US"},{latLng:[30,-96],name:"US"},{latLng:[39,-113],name:"US"},{latLng:[45,-93],name:"US"},{latLng:[33,-93],name:"US"},{latLng:[31,-84],name:"US"},{latLng:[38,-92],name:"US"},{latLng:[41,-95],name:"US"},{latLng:[31,-98],name:"US"},{latLng:[43,-87],name:"US"},{latLng:[44,-97],name:"US"},{latLng:[37,-106],name:"US"},{latLng:[47,-115],name:"US"},{latLng:[38,-118],name:"US"},{latLng:[39,-78],name:"US"},{latLng:[37,-82],name:"US"},{latLng:[42,-113],name:"US"},{latLng:[43,-96],name:"US"},{latLng:[44,-85],name:"US"},{latLng:[35,-90],name:"US"},{latLng:[36,-89],name:"US"},{latLng:[47,-113],name:"US"},{latLng:[31,-84],name:"US"},{latLng:[43,-92],name:"US"},{latLng:[39,-98],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[32,-100],name:"US"},{latLng:[30,-88],name:"US"},{latLng:[41,-120],name:"US"},{latLng:[40,-108],name:"US"},{latLng:[35,-113],name:"US"},{latLng:[38,-92],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[37,-118],name:"US"},{latLng:[42,-95],name:"US"},{latLng:[39,-80],name:"US"},{latLng:[31,-87],name:"US"},{latLng:[34,-91],name:"US"},{latLng:[25,-81],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[38,-90],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[41,-92],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[41,-83],name:"US"},{latLng:[33,-88],name:"US"},{latLng:[39,-92],name:"US"},{latLng:[43,-77],name:"US"},{latLng:[39,-81],name:"US"},{latLng:[41,-75],name:"US"},{latLng:[35,-84],name:"US"},{latLng:[37,-80],name:"US"},{latLng:[43,-90],name:"US"},{latLng:[33,-97],name:"US"},{latLng:[43,-85],name:"US"},{latLng:[36,-121],name:"US"},{latLng:[37,-108],name:"US"},{latLng:[32,-86],name:"US"},{latLng:[34,-93],name:"US"},{latLng:[32,-82],name:"US"},{latLng:[39,-89],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[41,-95],name:"US"},{latLng:[37,-95],name:"US"},{latLng:[38,-83],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[33,-89],name:"US"},{latLng:[38,-91],name:"US"},{latLng:[42,-74],name:"US"},{latLng:[35,-79],name:"US"},{latLng:[39,-84],name:"US"},{latLng:[40,-75],name:"US"},{latLng:[36,-87],name:"US"},{latLng:[30,-95],name:"US"},{latLng:[37,-80],name:"US"},{latLng:[45,-84],name:"US"},{latLng:[41,-76],name:"US"},{latLng:[38,-108],name:"US"},{latLng:[44,-96],name:"US"},{latLng:[35,-79],name:"US"},{latLng:[35,-86],name:"US"},{latLng:[35,-101],name:"US"},{latLng:[36,-104],name:"US"},{latLng:[32,-91],name:"US"},{latLng:[34,-86],name:"US"},{latLng:[40,-103],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[39,-90],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[38,-92],name:"US"},{latLng:[39,-81],name:"US"},{latLng:[36,-84],name:"US"},{latLng:[41,-111],name:"US"},{latLng:[39,-78],name:"US"},{latLng:[41,-103],name:"US"},{latLng:[38,-96],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[33,-94],name:"US"},{latLng:[46,-94],name:"US"},{latLng:[40,-82],name:"US"},{latLng:[45,-119],name:"US"},{latLng:[37,-101],name:"US"},{latLng:[46,-101],name:"US"},{latLng:[34,-100],name:"US"},{latLng:[39,-88],name:"US"},{latLng:[48,-102],name:"US"},{latLng:[43,-92],name:"US"},{latLng:[37,-87],name:"US"},{latLng:[45,-122],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[44,-95],name:"US"},{latLng:[34,-97],name:"US"},{latLng:[41,-91],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[43,-86],name:"US"},{latLng:[39,-81],name:"US"},{latLng:[35,-95],name:"US"},{latLng:[46,-108],name:"US"},{latLng:[31,-94],name:"US"},{latLng:[41,-97],name:"US"},{latLng:[41,-70],name:"US"},{latLng:[38,-122],name:"US"},{latLng:[35,-77],name:"US"},{latLng:[30,-81],name:"US"},{latLng:[40,-73],name:"US"},{latLng:[31,-93],name:"US"},{latLng:[42,-106],name:"US"},{latLng:[35,-110],name:"US"},{latLng:[32,-96],name:"US"},{latLng:[37,-85],name:"US"},{latLng:[47,-98],name:"US"},{latLng:[37,-78],name:"US"},{latLng:[39,-96],name:"US"},{latLng:[40,-95],name:"US"},{latLng:[37,-95],name:"US"},{latLng:[32,-89],name:"US"},{latLng:[38,-99],name:"US"},{latLng:[33,-93],name:"US"},{latLng:[39,-120],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[34,-77],name:"US"},{latLng:[41,-72],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[41,-72],name:"US"},{latLng:[36,-89],name:"US"},{latLng:[40,-73],name:"US"},{latLng:[43,-85],name:"US"},{latLng:[34,-81],name:"US"},{latLng:[41,-71],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[35,-93],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[40,-87],name:"US"},{latLng:[32,-89],name:"US"},{latLng:[36,-94],name:"US"},{latLng:[30,-93],name:"US"},{latLng:[46,-116],name:"US"},{latLng:[43,-78],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[38,-80],name:"US"},{latLng:[44,-94],name:"US"},{latLng:[43,-104],name:"US"},{latLng:[41,-85],name:"US"},{latLng:[39,-81],name:"US"},{latLng:[36,-97],name:"US"},{latLng:[43,-95],name:"US"},{latLng:[40,-94],name:"US"},{latLng:[32,-100],name:"US"},{latLng:[64,-164],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[47,-96],name:"US"},{latLng:[69,-153],name:"US"},{latLng:[36,-77],name:"US"},{latLng:[40,-75],name:"US"},{latLng:[37,-75],name:"US"},{latLng:[40,-76],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[67,-159],name:"US"},{latLng:[39,-99],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[37,-78],name:"US"},{latLng:[36,-95],name:"US"},{latLng:[33,-88],name:"US"},{latLng:[40,-98],name:"US"},{latLng:[27,-97],name:"US"},{latLng:[38,-116],name:"US"},{latLng:[43,-95],name:"US"},{latLng:[42,-83],name:"US"},{latLng:[36,-89],name:"US"},{latLng:[39,-74],name:"US"},{latLng:[43,-86],name:"US"},{latLng:[36,-100],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[45,-88],name:"US"},{latLng:[44,-84],name:"US"},{latLng:[43,-102],name:"US"},{latLng:[42,-89],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[37,-86],name:"US"},{latLng:[40,-80],name:"US"},{latLng:[30,-86],name:"US"},{latLng:[48,-119],name:"US"},{latLng:[27,-80],name:"US"},{latLng:[35,-96],name:"US"},{latLng:[35,-97],name:"US"},{latLng:[35,-95],name:"US"},{latLng:[33,-88],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[35,-102],name:"US"},{latLng:[47,-101],name:"US"},{latLng:[44,-92],name:"US"},{latLng:[42,-112],name:"US"},{latLng:[43,-75],name:"US"},{latLng:[45,-89],name:"US"},{latLng:[43,-76],name:"US"},{latLng:[34,-77],name:"US"},{latLng:[42,-77],name:"US"},{latLng:[46,-89],name:"US"},{latLng:[33,-117],name:"US"},{latLng:[28,-81],name:"US"},{latLng:[38,-86],name:"US"},{latLng:[41,-74],name:"US"},{latLng:[36,-79],name:"US"},{latLng:[30,-93],name:"US"},{latLng:[44,-72],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[33,-80],name:"US"},{latLng:[36,-91],name:"US"},{latLng:[30,-89],name:"US"},{latLng:[43,-78],name:"US"},{latLng:[44,-72],name:"US"},{latLng:[38,-95],name:"US"},{latLng:[38,-91],name:"US"},{latLng:[36,-96],name:"US"},{latLng:[39,-98],name:"US"},{latLng:[28,-81],name:"US"},{latLng:[43,-95],name:"US"},{latLng:[43,-85],name:"US"},{latLng:[44,-84],name:"US"},{latLng:[43,-76],name:"US"},{latLng:[37,-103],name:"US"},{latLng:[32,-105],name:"US"},{latLng:[40,-96],name:"US"},{latLng:[45,-84],name:"US"},{latLng:[42,-75],name:"US"},{latLng:[39,-97],name:"US"},{latLng:[42,-85],name:"US"},{latLng:[41,-83],name:"US"},{latLng:[36,-94],name:"US"},{latLng:[46,-95],name:"US"},{latLng:[33,-92],name:"US"},{latLng:[32,-92],name:"US"},{latLng:[38,-107],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[44,-88],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[42,-116],name:"US"},{latLng:[44,-70],name:"US"},{latLng:[36,-92],name:"US"},{latLng:[43,-87],name:"US"},{latLng:[46,-123],name:"US"},{latLng:[40,-95],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[26,-80],name:"US"},{latLng:[43,-94],name:"US"},{latLng:[32,-98],name:"US"},{latLng:[35,-76],name:"US"},{latLng:[34,-89],name:"US"},{latLng:[32,-94],name:"US"},{latLng:[39,-105],name:"US"},{latLng:[45,-110],name:"US"},{latLng:[44,-109],name:"US"},{latLng:[39,-87],name:"US"},{latLng:[32,-97],name:"US"},{latLng:[34,-102],name:"US"},{latLng:[28,-82],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[41,-74],name:"US"},{latLng:[36,-80],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[41,-84],name:"US"},{latLng:[38,-99],name:"US"},{latLng:[40,-96],name:"US"},{latLng:[36,-96],name:"US"},{latLng:[44,-116],name:"US"},{latLng:[36,-96],name:"US"},{latLng:[32,-83],name:"US"},{latLng:[30,-89],name:"US"},{latLng:[30,-102],name:"US"},{latLng:[48,-97],name:"US"},{latLng:[36,-89],name:"US"},{latLng:[48,-117],name:"US"},{latLng:[34,-77],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[38,-79],name:"US"},{latLng:[48,-96],name:"US"},{latLng:[44,-102],name:"US"},{latLng:[45,-68],name:"US"},{latLng:[40,-89],name:"US"},{latLng:[44,-91],name:"US"},{latLng:[40,-101],name:"US"},{latLng:[45,-102],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[32,-87],name:"US"},{latLng:[34,-92],name:"US"},{latLng:[38,-89],name:"US"},{latLng:[38,-86],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[31,-88],name:"US"},{latLng:[37,-89],name:"US"},{latLng:[39,-82],name:"US"},{latLng:[40,-77],name:"US"},{latLng:[35,-87],name:"US"},{latLng:[40,-118],name:"US"},{latLng:[36,-78],name:"US"},{latLng:[57,-132],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[47,-108],name:"US"},{latLng:[38,-93],name:"US"},{latLng:[37,-91],name:"US"},{latLng:[40,-99],name:"US"},{latLng:[40,-75],name:"US"},{latLng:[34,-90],name:"US"},{latLng:[40,-102],name:"US"},{latLng:[39,-99],name:"US"},{latLng:[48,-107],name:"US"},{latLng:[40,-88],name:"US"},{latLng:[39,-83],name:"US"},{latLng:[33,-88],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[34,-82],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[31,-82],name:"US"},{latLng:[42,-97],name:"US"},{latLng:[48,-99],name:"US"},{latLng:[47,-122],name:"US"},{latLng:[44,-92],name:"US"},{latLng:[31,-85],name:"US"},{latLng:[34,-93],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[39,-90],name:"US"},{latLng:[38,-87],name:"US"},{latLng:[37,-82],name:"US"},{latLng:[31,-90],name:"US"},{latLng:[39,-91],name:"US"},{latLng:[39,-83],name:"US"},{latLng:[41,-75],name:"US"},{latLng:[32,-111],name:"US"},{latLng:[32,-111],name:"US"},{latLng:[46,-92],name:"US"},{latLng:[27,-82],name:"US"},{latLng:[44,-96],name:"US"},{latLng:[45,-69],name:"US"},{latLng:[39,-106],name:"US"},{latLng:[35,-77],name:"US"},{latLng:[34,-95],name:"US"},{latLng:[36,-79],name:"US"},{latLng:[38,-112],name:"US"},{latLng:[39,-120],name:"US"},{latLng:[29,-89],name:"US"},{latLng:[39,-94],name:"US"},{latLng:[41,-97],name:"US"},{latLng:[42,-104],name:"US"},{latLng:[39,-81],name:"US"},{latLng:[40,-120],name:"US"},{latLng:[42,-96],name:"US"},{latLng:[41,-70],name:"US"},{latLng:[42,-94],name:"US"},{latLng:[38,-80],name:"US"},{latLng:[35,-90],name:"US"},{latLng:[30,-91],name:"US"},{latLng:[34,-94],name:"US"},{latLng:[27,-81],name:"US"},{latLng:[34,-85],name:"US"},{latLng:[41,-93],name:"US"},{latLng:[47,-96],name:"US"},{latLng:[37,-93],name:"US"},{latLng:[41,-97],name:"US"},{latLng:[35,-82],name:"US"},{latLng:[44,-123],name:"US"},{latLng:[35,-84],name:"US"},{latLng:[30,-94],name:"US"},{latLng:[45,-92],name:"US"},{latLng:[48,-112],name:"US"},{latLng:[34,-89],name:"US"},{latLng:[34,-96],name:"US"},{latLng:[35,-93],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[45,-95],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[41,-81],name:"US"},{latLng:[44,-89],name:"US"},{latLng:[41,-87],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[38,-87],name:"US"},{latLng:[39,-96],name:"US"},{latLng:[35,-96],name:"US"},{latLng:[41,-95],name:"US"},{latLng:[41,-77],name:"US"},{latLng:[45,-99],name:"US"},{latLng:[35,-101],name:"US"},{latLng:[45,-105],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[46,-112],name:"US"},{latLng:[42,-112],name:"US"},{latLng:[41,-92],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[34,-91],name:"US"},{latLng:[46,-105],name:"US"},{latLng:[37,-98],name:"US"},{latLng:[39,-84],name:"US"},{latLng:[34,-88],name:"US"},{latLng:[29,-104],name:"US"},{latLng:[45,-83],name:"US"},{latLng:[39,-79],name:"US"},{latLng:[45,-90],name:"US"},{latLng:[37,-78],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[38,-76],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[55,-133],name:"US"},{latLng:[41,-71],name:"US"},{latLng:[37,-102],name:"US"},{latLng:[38,-104],name:"US"},{latLng:[34,-92],name:"US"},{latLng:[32,-83],name:"US"},{latLng:[37,-89],name:"US"},{latLng:[41,-86],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[37,-92],name:"US"},{latLng:[37,-80],name:"US"},{latLng:[34,-95],name:"US"},{latLng:[29,-81],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[41,-89],name:"US"},{latLng:[39,-86],name:"US"},{latLng:[40,-93],name:"US"},{latLng:[41,-73],name:"US"},{latLng:[41,-84],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[38,-81],name:"US"},{latLng:[35,-103],name:"US"},{latLng:[39,-76],name:"US"},{latLng:[40,-73],name:"US"},{latLng:[31,-85],name:"US"},{latLng:[34,-90],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[42,-88],name:"US"},{latLng:[37,-80],name:"US"},{latLng:[32,-95],name:"US"},{latLng:[37,-81],name:"US"},{latLng:[39,-91],name:"US"},{latLng:[45,-93],name:"US"},{latLng:[48,-98],name:"US"},{latLng:[34,-101],name:"US"},{latLng:[33,-85],name:"US"},{latLng:[36,-91],name:"US"},{latLng:[31,-84],name:"US"},{latLng:[38,-89],name:"US"},{latLng:[40,-85],name:"US"},{latLng:[39,-92],name:"US"},{latLng:[35,-79],name:"US"},{latLng:[38,-79],name:"US"},{latLng:[32,-89],name:"US"},{latLng:[46,-97],name:"US"},{latLng:[31,-92],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[46,-114],name:"US"},{latLng:[39,-101],name:"US"},{latLng:[39,-93],name:"US"},{latLng:[31,-101],name:"US"},{latLng:[29,-99],name:"US"},{latLng:[47,-96],name:"US"},{latLng:[32,-93],name:"US"},{latLng:[33,-95],name:"US"},{latLng:[40,-100],name:"US"},{latLng:[44,-95],name:"US"},{latLng:[31,-103],name:"US"},{latLng:[28,-97],name:"US"},{latLng:[37,-98],name:"US"},{latLng:[42,-73],name:"US"},{latLng:[44,-94],name:"US"},{latLng:[48,-101],name:"US"},{latLng:[39,-97],name:"US"},{latLng:[37,-90],name:"US"},{latLng:[35,-84],name:"US"},{latLng:[38,-98],name:"US"},{latLng:[44,-93],name:"US"},{latLng:[41,-111],name:"US"},{latLng:[40,-95],name:"US"},{latLng:[38,-88],name:"US"},{latLng:[32,-91],name:"US"},{latLng:[47,-104],name:"US"},{latLng:[46,-96],name:"US"},{latLng:[40,-82],name:"US"},{latLng:[34,-80],name:"US"},{latLng:[43,-90],name:"US"},{latLng:[33,-82],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[35,-79],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[37,-77],name:"US"},{latLng:[39,-96],name:"US"},{latLng:[40,-94],name:"US"},{latLng:[36,-106],name:"US"},{latLng:[39,-108],name:"US"},{latLng:[37,-106],name:"US"},{latLng:[39,-85],name:"US"},{latLng:[36,-90],name:"US"},{latLng:[39,-81],name:"US"},{latLng:[33,-115],name:"US"},{latLng:[35,-84],name:"US"},{latLng:[38,-81],name:"US"},{latLng:[37,-80],name:"US"},{latLng:[37,-79],name:"US"},{latLng:[45,-96],name:"US"},{latLng:[35,-100],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[36,-86],name:"US"},{latLng:[31,-96],name:"US"},{latLng:[34,-79],name:"US"},{latLng:[43,-96],name:"US"},{latLng:[42,-99],name:"US"},{latLng:[42,-89],name:"US"},{latLng:[41,-90],name:"US"},{latLng:[37,-79],name:"US"},{latLng:[37,-84],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[36,-79],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[41,-74],name:"US"},{latLng:[32,-96],name:"US"},{latLng:[35,-99],name:"US"},{latLng:[36,-95],name:"US"},{latLng:[48,-99],name:"US"},{latLng:[39,-99],name:"US"},{latLng:[48,-105],name:"US"},{latLng:[34,-103],name:"US"},{latLng:[44,-84],name:"US"},{latLng:[48,-95],name:"US"},{latLng:[46,-106],name:"US"},{latLng:[39,-83],name:"US"},{latLng:[40,-106],name:"US"},{latLng:[38,-83],name:"US"},{latLng:[35,-80],name:"US"},{latLng:[31,-99],name:"US"},{latLng:[39,-85],name:"US"},{latLng:[38,-99],name:"US"},{latLng:[32,-94],name:"US"},{latLng:[45,-91],name:"US"},{latLng:[32,-85],name:"US"},{latLng:[38,-98],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[35,-81],name:"US"},{latLng:[35,-86],name:"US"},{latLng:[43,-73],name:"US"},{latLng:[31,-93],name:"US"},{latLng:[31,-93],name:"US"},{latLng:[42,-95],name:"US"},{latLng:[38,-121],name:"US"},{latLng:[43,-69],name:"US"},{latLng:[43,-84],name:"US"},{latLng:[38,-106],name:"US"},{latLng:[39,-75],name:"US"},{latLng:[37,-80],name:"US"},{latLng:[34,-92],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[38,-97],name:"US"},{latLng:[39,-93],name:"US"},{latLng:[40,-97],name:"US"},{latLng:[40,-111],name:"US"},{latLng:[34,-81],name:"US"},{latLng:[34,-78],name:"US"},{latLng:[31,-94],name:"US"},{latLng:[36,-121],name:"US"},{latLng:[34,-116],name:"US"},{latLng:[33,-116],name:"US"},{latLng:[37,-122],name:"US"},{latLng:[30,-95],name:"US"},{latLng:[37,-121],name:"US"},{latLng:[37,-107],name:"US"},{latLng:[36,-108],name:"US"},{latLng:[37,-109],name:"US"},{latLng:[48,-122],name:"US"},{latLng:[35,-120],name:"US"},{latLng:[37,-122],name:"US"},{latLng:[38,-108],name:"US"},{latLng:[35,-104],name:"US"},{latLng:[28,-97],name:"US"},{latLng:[31,-98],name:"US"},{latLng:[44,-98],name:"US"},{latLng:[47,-115],name:"US"},{latLng:[35,-106],name:"US"},{latLng:[41,-83],name:"US"},{latLng:[39,-89],name:"US"},{latLng:[43,-82],name:"US"},{latLng:[39,-111],name:"US"},{latLng:[34,-120],name:"US"},{latLng:[37,-121],name:"US"},{latLng:[31,-110],name:"US"},{latLng:[37,-122],name:"US"},{latLng:[35,-105],name:"US"},{latLng:[30,-87],name:"US"},{latLng:[27,-82],name:"US"},{latLng:[43,-73],name:"US"},{latLng:[46,-97],name:"US"},{latLng:[41,-96],name:"US"},{latLng:[43,-89],name:"US"},{latLng:[41,-96],name:"US"},{latLng:[45,-91],name:"US"},{latLng:[42,-74],name:"US"},{latLng:[30,-100],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[42,-74],name:"US"},{latLng:[46,-86],name:"US"},{latLng:[40,-90],name:"US"},{latLng:[40,-92],name:"US"},{latLng:[42,-76],name:"US"},{latLng:[40,-76],name:"US"},{latLng:[38,-82],name:"US"},{latLng:[40,-92],name:"US"},{latLng:[34,-79],name:"US"},{latLng:[34,-94],name:"US"},{latLng:[39,-90],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[41,-90],name:"US"},{latLng:[38,-100],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[44,-93],name:"US"},{latLng:[32,-89],name:"US"},{latLng:[37,-89],name:"US"},{latLng:[36,-84],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[41,-103],name:"US"},{latLng:[32,-81],name:"US"},{latLng:[32,-100],name:"US"},{latLng:[35,-92],name:"US"},{latLng:[35,-94],name:"US"},{latLng:[40,-102],name:"US"},{latLng:[37,-97],name:"US"},{latLng:[28,-81],name:"US"},{latLng:[30,-84],name:"US"},{latLng:[35,-96],name:"US"},{latLng:[42,-76],name:"US"},{latLng:[41,-83],name:"US"},{latLng:[35,-85],name:"US"},{latLng:[35,-94],name:"US"},{latLng:[33,-94],name:"US"},{latLng:[35,-83],name:"US"},{latLng:[38,-111],name:"US"},{latLng:[37,-100],name:"US"},{latLng:[40,-97],name:"US"},{latLng:[32,-99],name:"US"},{latLng:[37,-91],name:"US"},{latLng:[32,-90],name:"US"},{latLng:[36,-91],name:"US"},{latLng:[40,-122],name:"US"},{latLng:[44,-88],name:"US"},{latLng:[39,-95],name:"US"},{latLng:[43,-87],name:"US"},{latLng:[33,-86],name:"US"},{latLng:[39,-88],name:"US"},{latLng:[39,-85],name:"US"},{latLng:[41,-95],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[39,-92],name:"US"},{latLng:[40,-84],name:"US"},{latLng:[35,-89],name:"US"},{latLng:[31,-94],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[45,-93],name:"US"},{latLng:[39,-100],name:"US"},{latLng:[48,-104],name:"US"},{latLng:[42,-102],name:"US"},{latLng:[47,-100],name:"US"},{latLng:[44,-106],name:"US"},{latLng:[39,-101],name:"US"},{latLng:[41,-98],name:"US"},{latLng:[45,-120],name:"US"},{latLng:[36,-101],name:"US"},{latLng:[42,-84],name:"US"},{latLng:[47,-115],name:"US"},{latLng:[44,-94],name:"US"},{latLng:[39,-120],name:"US"},{latLng:[33,-107],name:"US"},{latLng:[45,-112],name:"US"},{latLng:[36,-86],name:"US"},{latLng:[31,-89],name:"US"},{latLng:[43,-96],name:"US"},{latLng:[42,-103],name:"US"},{latLng:[46,-101],name:"US"},{latLng:[41,-122],name:"US"},{latLng:[57,-135],name:"US"},{latLng:[48,-121],name:"US"},{latLng:[59,-135],name:"US"},{latLng:[46,-121],name:"US"},{latLng:[46,-103],name:"US"},{latLng:[39,-98],name:"US"},{latLng:[32,-89],name:"US"},{latLng:[36,-85],name:"US"},{latLng:[32,-95],name:"US"},{latLng:[36,-81],name:"US"},{latLng:[48,-121],name:"US"},{latLng:[40,-77],name:"US"},{latLng:[34,-106],name:"US"},{latLng:[38,-121],name:"US"},{latLng:[45,-69],name:"US"},{latLng:[38,-75],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[39,-79],name:"US"},{latLng:[32,-97],name:"US"},{latLng:[38,-122],name:"US"},{latLng:[36,-77],name:"US"},{latLng:[63,-143],name:"US"},{latLng:[33,-84],name:"US"},{latLng:[34,-81],name:"US"},{latLng:[38,-87],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[44,-98],name:"US"},{latLng:[47,-117],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[29,-89],name:"US"},{latLng:[29,-90],name:"US"},{latLng:[38,-90],name:"US"},{latLng:[33,-86],name:"US"},{latLng:[38,-89],name:"US"},{latLng:[42,-82],name:"US"},{latLng:[38,-93],name:"US"},{latLng:[45,-92],name:"US"},{latLng:[35,-90],name:"US"},{latLng:[37,-90],name:"US"},{latLng:[30,-90],name:"US"},{latLng:[30,-90],name:"US"},{latLng:[30,-90],name:"US"},{latLng:[29,-81],name:"US"},{latLng:[41,-86],name:"US"},{latLng:[41,-85],name:"US"},{latLng:[30,-92],name:"US"},{latLng:[44,-75],name:"US"},{latLng:[47,-92],name:"US"},{latLng:[38,-90],name:"US"},{latLng:[38,-90],name:"US"},{latLng:[27,-80],name:"US"},{latLng:[30,-91],name:"US"},{latLng:[29,-91],name:"US"},{latLng:[38,-76],name:"US"},{latLng:[30,-89],name:"US"},{latLng:[38,-98],name:"US"},{latLng:[38,-77],name:"US"},{latLng:[37,-120],name:"US"},{latLng:[44,-100],name:"US"},{latLng:[35,-80],name:"US"},{latLng:[37,-101],name:"US"},{latLng:[41,-97],name:"US"},{latLng:[41,-89],name:"US"},{latLng:[46,-102],name:"US"},{latLng:[40,-81],name:"US"},{latLng:[41,-86],name:"US"},{latLng:[26,-98],name:"US"},{latLng:[38,-79],name:"US"},{latLng:[37,-90],name:"US"},{latLng:[45,-94],name:"US"},{latLng:[44,-93],name:"US"},{latLng:[47,-97],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[34,-97],name:"US"},{latLng:[32,-98],name:"US"},{latLng:[42,-89],name:"US"},{latLng:[31,-101],name:"US"},{latLng:[41,-85],name:"US"},{latLng:[42,-77],name:"US"},{latLng:[37,-101],name:"US"},{latLng:[45,-96],name:"US"},{latLng:[48,-117],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[36,-87],name:"US"},{latLng:[45,-109],name:"US"},{latLng:[36,-89],name:"US"},{latLng:[36,-80],name:"US"},{latLng:[35,-92],name:"US"},{latLng:[30,-89],name:"US"},{latLng:[36,-93],name:"US"},{latLng:[33,-100],name:"US"},{latLng:[39,-119],name:"US"},{latLng:[42,-93],name:"US"},{latLng:[43,-71],name:"US"},{latLng:[46,-98],name:"US"},{latLng:[42,-109],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[40,-72],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[39,-87],name:"US"},{latLng:[40,-93],name:"US"},{latLng:[43,-72],name:"US"},{latLng:[41,-74],name:"US"},{latLng:[41,-76],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[44,-100],name:"US"},{latLng:[37,-80],name:"US"},{latLng:[39,-106],name:"US"},{latLng:[41,-81],name:"US"},{latLng:[40,-110],name:"US"},{latLng:[37,-97],name:"US"},{latLng:[36,-86],name:"US"},{latLng:[32,-88],name:"US"},{latLng:[28,-82],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[33,-80],name:"US"},{latLng:[33,-90],name:"US"},{latLng:[36,-80],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[41,-75],name:"US"},{latLng:[38,-75],name:"US"},{latLng:[41,-74],name:"US"},{latLng:[36,-77],name:"US"},{latLng:[39,-121],name:"US"},{latLng:[30,-100],name:"US"},{latLng:[30,-82],name:"US"},{latLng:[35,-83],name:"US"},{latLng:[45,-109],name:"US"},{latLng:[41,-108],name:"US"},{latLng:[45,-95],name:"US"},{latLng:[34,-101],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[38,-76],name:"US"},{latLng:[33,-82],name:"US"},{latLng:[33,-86],name:"US"},{latLng:[33,-90],name:"US"},{latLng:[32,-85],name:"US"},{latLng:[42,-92],name:"US"},{latLng:[36,-93],name:"US"},{latLng:[30,-90],name:"US"},{latLng:[36,-105],name:"US"},{latLng:[32,-97],name:"US"},{latLng:[34,-89],name:"US"},{latLng:[32,-82],name:"US"},{latLng:[30,-83],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[40,-94],name:"US"},{latLng:[37,-85],name:"US"},{latLng:[32,-99],name:"US"},{latLng:[39,-80],name:"US"},{latLng:[45,-90],name:"US"},{latLng:[40,-89],name:"US"},{latLng:[37,-81],name:"US"},{latLng:[40,-122],name:"US"},{latLng:[31,-82],name:"US"},{latLng:[38,-105],name:"US"},{latLng:[32,-91],name:"US"},{latLng:[29,-90],name:"US"},{latLng:[31,-84],name:"US"},{latLng:[30,-102],name:"US"},{latLng:[33,-102],name:"US"},{latLng:[43,-111],name:"US"},{latLng:[47,-112],name:"US"},{latLng:[43,-110],name:"US"},{latLng:[37,-91],name:"US"},{latLng:[36,-101],name:"US"},{latLng:[40,-97],name:"US"},{latLng:[30,-83],name:"US"},{latLng:[39,-101],name:"US"},{latLng:[41,-100],name:"US"},{latLng:[33,-99],name:"US"},{latLng:[42,-96],name:"US"},{latLng:[46,-122],name:"US"},{latLng:[31,-83],name:"US"},{latLng:[45,-123],name:"US"},{latLng:[34,-98],name:"US"},{latLng:[42,-76],name:"US"},{latLng:[41,-77],name:"US"},{latLng:[34,-88],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[35,-89],name:"US"},{latLng:[34,-88],name:"US"},{latLng:[33,-94],name:"US"},{latLng:[36,-87],name:"US"},{latLng:[46,-94],name:"US"},{latLng:[43,-100],name:"US"},{latLng:[41,-72],name:"US"},{latLng:[31,-100],name:"US"},{latLng:[42,-76],name:"US"},{latLng:[40,-113],name:"US"},{latLng:[48,-111],name:"US"},{latLng:[32,-82],name:"US"},{latLng:[34,-105],name:"US"},{latLng:[48,-99],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[47,-97],name:"US"},{latLng:[35,-82],name:"US"},{latLng:[45,-96],name:"US"},{latLng:[30,-97],name:"US"},{latLng:[46,-107],name:"US"},{latLng:[38,-99],name:"US"},{latLng:[44,-91],name:"US"},{latLng:[32,-82],name:"US"},{latLng:[36,-87],name:"US"},{latLng:[38,-85],name:"US"},{latLng:[40,-123],name:"US"},{latLng:[31,-95],name:"US"},{latLng:[43,-99],name:"US"},{latLng:[33,-85],name:"US"},{latLng:[36,-86],name:"US"},{latLng:[41,-80],name:"US"},{latLng:[39,-79],name:"US"},{latLng:[36,-118],name:"US"},{latLng:[36,-95],name:"US"},{latLng:[34,-90],name:"US"},{latLng:[38,-119],name:"US"},{latLng:[31,-83],name:"US"},{latLng:[43,-97],name:"US"},{latLng:[33,-87],name:"US"},{latLng:[40,-81],name:"US"},{latLng:[43,-83],name:"US"},{latLng:[32,-83],name:"US"},{latLng:[42,-114],name:"US"},{latLng:[30,-94],name:"US"},{latLng:[39,-80],name:"US"},{latLng:[35,-76],name:"US"},{latLng:[41,-110],name:"US"},{latLng:[40,-109],name:"US"},{latLng:[41,-74],name:"US"},{latLng:[45,-118],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[0,0],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[33,-92],name:"US"},{latLng:[30,-82],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[37,-89],name:"US"},{latLng:[39,-84],name:"US"},{latLng:[41,-94],name:"US"},{latLng:[37,-87],name:"US"},{latLng:[32,-92],name:"US"},{latLng:[34,-89],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[36,-103],name:"US"},{latLng:[34,-80],name:"US"},{latLng:[40,-83],name:"US"},{latLng:[45,-118],name:"US"},{latLng:[40,-77],name:"US"},{latLng:[34,-81],name:"US"},{latLng:[42,-96],name:"US"},{latLng:[36,-83],name:"US"},{latLng:[32,-94],name:"US"},{latLng:[38,-80],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[31,-102],name:"US"},{latLng:[40,-111],name:"US"},{latLng:[29,-99],name:"US"},{latLng:[29,-101],name:"US"},{latLng:[61,-144],name:"US"},{latLng:[34,-106],name:"US"},{latLng:[44,-115],name:"US"},{latLng:[48,-106],name:"US"},{latLng:[41,-98],name:"US"},{latLng:[35,-92],name:"US"},{latLng:[40,-91],name:"US"},{latLng:[42,-86],name:"US"},{latLng:[35,-85],name:"US"},{latLng:[40,-84],name:"US"},{latLng:[32,-95],name:"US"},{latLng:[36,-78],name:"US"},{latLng:[38,-87],name:"US"},{latLng:[41,-79],name:"US"},{latLng:[34,-119],name:"US"},{latLng:[40,-87],name:"US"},{latLng:[29,-92],name:"US"},{latLng:[39,-87],name:"US"},{latLng:[31,-93],name:"US"},{latLng:[37,-94],name:"US"},{latLng:[43,-90],name:"US"},{latLng:[28,-96],name:"US"},{latLng:[39,-87],name:"US"},{latLng:[46,-89],name:"US"},{latLng:[39,-82],name:"US"},{latLng:[36,-76],name:"US"},{latLng:[29,-81],name:"US"},{latLng:[38,-87],name:"US"},{latLng:[40,-85],name:"US"},{latLng:[44,-92],name:"US"},{latLng:[38,-96],name:"US"},{latLng:[46,-94],name:"US"},{latLng:[35,-95],name:"US"},{latLng:[46,-123],name:"US"},{latLng:[35,-78],name:"US"},{latLng:[30,-84],name:"US"},{latLng:[44,-69],name:"US"},{latLng:[33,-87],name:"US"},{latLng:[34,-85],name:"US"},{latLng:[30,-95],name:"US"},{latLng:[46,-118],name:"US"},{latLng:[46,-118],name:"US"},{latLng:[38,-101],name:"US"},{latLng:[30,-95],name:"US"},{latLng:[45,-117],name:"US"},{latLng:[48,-97],name:"US"},{latLng:[31,-90],name:"US"},{latLng:[30,-86],name:"US"},{latLng:[33,-83],name:"US"},{latLng:[45,-100],name:"US"},{latLng:[42,-88],name:"US"},{latLng:[41,-92],name:"US"},{latLng:[48,-101],name:"US"},{latLng:[31,-103],name:"US"},{latLng:[31,-82],name:"US"},{latLng:[33,-82],name:"US"},{latLng:[40,-90],name:"US"},{latLng:[40,-87],name:"US"},{latLng:[41,-93],name:"US"},{latLng:[36,-86],name:"US"},{latLng:[32,-90],name:"US"},{latLng:[38,-91],name:"US"},{latLng:[40,-74],name:"US"},{latLng:[43,-73],name:"US"},{latLng:[36,-78],name:"US"},{latLng:[39,-84],name:"US"},{latLng:[41,-79],name:"US"},{latLng:[35,-85],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[38,-87],name:"US"},{latLng:[40,-111],name:"US"},{latLng:[45,-121],name:"US"},{latLng:[44,-93],name:"US"},{latLng:[43,-107],name:"US"},{latLng:[45,-91],name:"US"},{latLng:[31,-88],name:"US"},{latLng:[35,-94],name:"US"},{latLng:[39,-103],name:"US"},{latLng:[30,-85],name:"US"},{latLng:[32,-82],name:"US"},{latLng:[44,-116],name:"US"},{latLng:[38,-89],name:"US"},{latLng:[38,-86],name:"US"},{latLng:[41,-91],name:"US"},{latLng:[39,-97],name:"US"},{latLng:[37,-85],name:"US"},{latLng:[30,-90],name:"US"},{latLng:[45,-67],name:"US"},{latLng:[39,-77],name:"US"},{latLng:[45,-92],name:"US"},{latLng:[33,-90],name:"US"},{latLng:[37,-90],name:"US"},{latLng:[41,-96],name:"US"},{latLng:[43,-73],name:"US"},{latLng:[35,-76],name:"US"},{latLng:[39,-81],name:"US"},{latLng:[36,-95],name:"US"},{latLng:[45,-123],name:"US"},{latLng:[40,-80],name:"US"},{latLng:[41,-71],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[30,-96],name:"US"},{latLng:[37,-113],name:"US"},{latLng:[44,-72],name:"US"},{latLng:[36,-81],name:"US"},{latLng:[43,-88],name:"US"},{latLng:[35,-98],name:"US"},{latLng:[40,-119],name:"US"},{latLng:[42,-83],name:"US"},{latLng:[36,-81],name:"US"},{latLng:[43,-94],name:"US"},{latLng:[43,-88],name:"US"},{latLng:[44,-88],name:"US"},{latLng:[44,-89],name:"US"},{latLng:[31,-81],name:"US"},{latLng:[38,-88],name:"US"},{latLng:[39,-85],name:"US"},{latLng:[40,-93],name:"US"},{latLng:[36,-84],name:"US"},{latLng:[42,-83],name:"US"},{latLng:[31,-88],name:"US"},{latLng:[37,-90],name:"US"},{latLng:[42,-97],name:"US"},{latLng:[43,-77],name:"US"},{latLng:[35,-78],name:"US"},{latLng:[40,-81],name:"US"},{latLng:[41,-75],name:"US"},{latLng:[35,-87],name:"US"},{latLng:[38,-110],name:"US"},{latLng:[38,-82],name:"US"},{latLng:[38,-78],name:"US"},{latLng:[36,-88],name:"US"},{latLng:[27,-99],name:"US"},{latLng:[41,-111],name:"US"},{latLng:[32,-84],name:"US"},{latLng:[42,-94],name:"US"},{latLng:[37,-87],name:"US"},{latLng:[32,-93],name:"US"},{latLng:[33,-89],name:"US"},{latLng:[37,-92],name:"US"},{latLng:[40,-98],name:"US"},{latLng:[38,-80],name:"US"},{latLng:[40,-104],name:"US"},{latLng:[40,-85],name:"US"},{latLng:[47,-99],name:"US"},{latLng:[30,-91],name:"US"},{latLng:[32,-91],name:"US"},{latLng:[30,-91],name:"US"},{latLng:[41,-73],name:"US"},{latLng:[40,-79],name:"US"},{latLng:[38,-76],name:"US"},{latLng:[43,-104],name:"US"},{latLng:[39,-80],name:"US"},{latLng:[44,-85],name:"US"},{latLng:[29,-96],name:"US"},{latLng:[48,-121],name:"US"},{latLng:[46,-109],name:"US"},{latLng:[32,-82],name:"US"},{latLng:[41,-98],name:"US"},{latLng:[44,-120],name:"US"},{latLng:[35,-100],name:"US"},{latLng:[35,-91],name:"US"},{latLng:[34,-83],name:"US"},{latLng:[38,-88],name:"US"},{latLng:[40,-86],name:"US"},{latLng:[35,-85],name:"US"},{latLng:[39,-114],name:"US"},{latLng:[41,-89],name:"US"},{latLng:[34,-84],name:"US"},{latLng:[41,-85],name:"US"},{latLng:[36,-84],name:"US"},{latLng:[46,-117],name:"US"},{latLng:[46,-104],name:"US"},{latLng:[38,-101],name:"US"},{latLng:[33,-98],name:"US"},{latLng:[38,-75],name:"US"},{latLng:[34,-99],name:"US"},{latLng:[31,-87],name:"US"},{latLng:[31,-83],name:"US"},{latLng:[33,-82],name:"US"},{latLng:[36,-81],name:"US"},{latLng:[46,-96],name:"US"},{latLng:[32,-83],name:"US"},{latLng:[31,-91],name:"US"},{latLng:[41,-87],name:"US"},{latLng:[26,-97],name:"US"},{latLng:[48,-103],name:"US"},{latLng:[41,-84],name:"US"},{latLng:[33,-79],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[37,-88],name:"US"},{latLng:[35,-86],name:"US"},{latLng:[30,-97],name:"US"},{latLng:[37,-95],name:"US"},{latLng:[35,-77],name:"US"},{latLng:[36,-86],name:"US"},{latLng:[29,-98],name:"US"},{latLng:[39,-78],name:"US"},{latLng:[41,-71],name:"US"},{latLng:[42,-72],name:"US"},{latLng:[43,-72],name:"US"},{latLng:[31,-103],name:"US"},{latLng:[31,-92],name:"US"},{latLng:[42,-89],name:"US"},{latLng:[43,-93],name:"US"},{latLng:[44,-88],name:"US"},{latLng:[43,-91],name:"US"},{latLng:[43,-91],name:"US"},{latLng:[34,-87],name:"US"},{latLng:[33,-89],name:"US"},{latLng:[39,-81],name:"US"},{latLng:[33,-97],name:"US"},{latLng:[36,-82],name:"US"},{latLng:[37,-83],name:"US"},{latLng:[41,-83],name:"US"},{latLng:[32,-95],name:"US"},{latLng:[39,-81],name:"US"},{latLng:[44,-90],name:"US"},{latLng:[42,-96],name:"US"},{latLng:[40,-89],name:"US"},{latLng:[38,-84],name:"US"},{latLng:[35,-91],name:"US"},{latLng:[36,-98],name:"US"},{latLng:[37,-95],name:"US"},{latLng:[36,-99],name:"US"},{latLng:[38,-75],name:"US"},{latLng:[42,-71],name:"US"},{latLng:[31,-83],name:"US"},{latLng:[43,-93],name:"US"},{latLng:[40,-94],name:"US"},{latLng:[56,-132],name:"US"},{latLng:[42,-93],name:"US"},{latLng:[45,-93],name:"US"},{latLng:[37,-92],name:"US"},{latLng:[40,-83],name:"US"},{latLng:[39,-94],name:"US"},{latLng:[42,-78],name:"US"},{latLng:[41,-76],name:"US"},{latLng:[37,-81],name:"US"},{latLng:[36,-81],name:"US"},{latLng:[36,-80],name:"US"},{latLng:[46,-120],name:"US"},{latLng:[59,-140],name:"US"},{latLng:[34,-89],name:"US"},{latLng:[45,-123],name:"US"},{latLng:[35,-82],name:"US"},{latLng:[43,-97],name:"US"},{latLng:[42,-77],name:"US"},{latLng:[34,-112],name:"US"},{latLng:[32,-90],name:"US"},{latLng:[35,-93],name:"US"},{latLng:[44,-95],name:"US"},{latLng:[45,-108],name:"US"},{latLng:[33,-102],name:"US"},{latLng:[38,-121],name:"US"},{latLng:[43,-70],name:"US"},{latLng:[40,-97],name:"US"},{latLng:[39,-76],name:"US"},{latLng:[34,-81],name:"US"},{latLng:[37,-76],name:"US"},{latLng:[33,-98],name:"US"},{latLng:[39,-121],name:"US"},{latLng:[65,-151],name:"US"},{latLng:[32,-113],name:"US"},{latLng:[40,-102],name:"US"},{latLng:[27,-99],name:"US"},{latLng:[28,-99],name:"US"},{latLng:[44,-101],name:"US"},{latLng:[53,-116],name:"Canada"},{latLng:[-14,-170],name:"US"},{latLng:[31,117],name:"China"},{latLng:[12,-69],name:"Netherlands"},{latLng:[-35,149],name:"Australia"},{latLng:[40,116],name:"China"},{latLng:[32,-64],name:"United Kingdom"},{latLng:[53,-127],name:"Canada"},{latLng:[19,-81],name:"United Kingdom"},{latLng:[49,-2],name:"United Kingdom"},{latLng:[30,107],name:"China"},{latLng:[12,-68],name:"Netherlands"},{latLng:[0,0],name:"Canada"},{latLng:[0,0],name:"Cruise Ship"},{latLng:[0,0],name:"US"},{latLng:[61,-6],name:"Denmark"},{latLng:[4,-53],name:"France"},{latLng:[-17,-149],name:"France"},{latLng:[26,117],name:"China"},{latLng:[37,101],name:"China"},{latLng:[36,-5],name:"United Kingdom"},{latLng:[0,0],name:"Canada"},{latLng:[0,0],name:"US"},{latLng:[71,-42],name:"Denmark"},{latLng:[16,-61],name:"France"},{latLng:[13,144],name:"US"},{latLng:[23,113],name:"China"},{latLng:[23,108],name:"China"},{latLng:[26,106],name:"China"},{latLng:[19,109],name:"China"},{latLng:[39,116],name:"China"},{latLng:[47,127],name:"China"},{latLng:[33,113],name:"China"},{latLng:[22,114],name:"China"},{latLng:[30,112],name:"China"},{latLng:[27,111],name:"China"},{latLng:[44,113],name:"China"},{latLng:[54,-4],name:"United Kingdom"},{latLng:[32,119],name:"China"},{latLng:[27,115],name:"China"},{latLng:[43,126],name:"China"},{latLng:[41,122],name:"China"},{latLng:[22,113],name:"China"},{latLng:[53,-98],name:"Canada"},{latLng:[14,-61],name:"France"},{latLng:[-12,45],name:"France"},{latLng:[16,-62],name:"United Kingdom"},{latLng:[46,-66],name:"Canada"},{latLng:[-20,165],name:"France"},{latLng:[-33,151],name:"Australia"},{latLng:[53,-57],name:"Canada"},{latLng:[37,106],name:"China"},{latLng:[15,145],name:"US"},{latLng:[-12,130],name:"Australia"},{latLng:[44,-63],name:"Canada"},{latLng:[51,-85],name:"Canada"},{latLng:[46,-63],name:"Canada"},{latLng:[18,-66],name:"US"},{latLng:[35,95],name:"China"},{latLng:[52,-73],name:"Canada"},{latLng:[-27,153],name:"Australia"},{latLng:[-21,55],name:"France"},{latLng:[17,-62],name:"France"},{latLng:[52,-106],name:"Canada"},{latLng:[35,108],name:"China"},{latLng:[36,118],name:"China"},{latLng:[31,121],name:"China"},{latLng:[37,112],name:"China"},{latLng:[30,102],name:"China"},{latLng:[18,-63],name:"Netherlands"},{latLng:[-34,138],name:"Australia"},{latLng:[18,-63],name:"France"},{latLng:[-42,147],name:"Australia"},{latLng:[39,117],name:"China"},{latLng:[31,88],name:"China"},{latLng:[-37,144],name:"Australia"},{latLng:[18,-64],name:"US"},{latLng:[-31,115],name:"Australia"},{latLng:[41,85],name:"China"},{latLng:[24,101],name:"China"},{latLng:[29,120],name:"China"},{latLng:[33,67],name:"Afghanistan"},{latLng:[41,20],name:"Albania"},{latLng:[28,1],name:"Algeria"},{latLng:[42,1],name:"Andorra"},{latLng:[-11,17],name:"Angola"},{latLng:[17,-61],name:"Antigua and Barbuda"},{latLng:[-38,-63],name:"Argentina"},{latLng:[40,45],name:"Armenia"},{latLng:[47,14],name:"Austria"},{latLng:[40,47],name:"Azerbaijan"},{latLng:[25,-78],name:"Bahamas"},{latLng:[26,50],name:"Bahrain"},{latLng:[23,90],name:"Bangladesh"},{latLng:[13,-59],name:"Barbados"},{latLng:[53,27],name:"Belarus"},{latLng:[50,4],name:"Belgium"},{latLng:[13,-59],name:"Belize"},{latLng:[9,2],name:"Benin"},{latLng:[27,90],name:"Bhutan"},{latLng:[-16,-63],name:"Bolivia"},{latLng:[43,17],name:"Bosnia and Herzegovina"},{latLng:[-14,-51],name:"Brazil"},{latLng:[4,114],name:"Brunei"},{latLng:[42,25],name:"Bulgaria"},{latLng:[12,-1],name:"Burkina Faso"},{latLng:[16,-23],name:"Cabo Verde"},{latLng:[11,104],name:"Cambodia"},{latLng:[3,11],name:"Cameroon"},{latLng:[6,20],name:"Central African Republic"},{latLng:[15,18],name:"Chad"},{latLng:[-35,-71],name:"Chile"},{latLng:[4,-74],name:"Colombia"},{latLng:[-4,15],name:"Congo (Brazzaville)"},{latLng:[-4,15],name:"Congo (Kinshasa)"},{latLng:[9,-83],name:"Costa Rica"},{latLng:[7,-5],name:"Cote d'Ivoire"},{latLng:[45,15],name:"Croatia"},{latLng:[21,-77],name:"Cuba"},{latLng:[35,33],name:"Cyprus"},{latLng:[49,15],name:"Czechia"},{latLng:[56,9],name:"Denmark"},{latLng:[11,42],name:"Djibouti"},{latLng:[15,-61],name:"Dominica"},{latLng:[18,-70],name:"Dominican Republic"},{latLng:[-1,-78],name:"Ecuador"},{latLng:[26,30],name:"Egypt"},{latLng:[13,-88],name:"El Salvador"},{latLng:[1,10],name:"Equatorial Guinea"},{latLng:[15,39],name:"Eritrea"},{latLng:[58,25],name:"Estonia"},{latLng:[-26,31],name:"Eswatini"},{latLng:[9,40],name:"Ethiopia"},{latLng:[-17,178],name:"Fiji"},{latLng:[61,25],name:"Finland"},{latLng:[0,11],name:"Gabon"},{latLng:[13,-15],name:"Gambia"},{latLng:[42,43],name:"Georgia"},{latLng:[51,10],name:"Germany"},{latLng:[7,-1],name:"Ghana"},{latLng:[39,21],name:"Greece"},{latLng:[12,-61],name:"Grenada"},{latLng:[15,-90],name:"Guatemala"},{latLng:[9,-9],name:"Guinea"},{latLng:[4,-58],name:"Guyana"},{latLng:[18,-72],name:"Haiti"},{latLng:[41,12],name:"Holy See"},{latLng:[15,-86],name:"Honduras"},{latLng:[47,19],name:"Hungary"},{latLng:[64,-19],name:"Iceland"},{latLng:[20,78],name:"India"},{latLng:[0,113],name:"Indonesia"},{latLng:[32,53],name:"Iran"},{latLng:[33,43],name:"Iraq"},{latLng:[53,-7],name:"Ireland"},{latLng:[31,34],name:"Israel"},{latLng:[41,12],name:"Italy"},{latLng:[18,-77],name:"Jamaica"},{latLng:[36,138],name:"Japan"},{latLng:[31,36],name:"Jordan"},{latLng:[48,66],name:"Kazakhstan"},{latLng:[0,37],name:"Kenya"},{latLng:[35,127],name:"Korea, South"},{latLng:[29,47],name:"Kuwait"},{latLng:[41,74],name:"Kyrgyzstan"},{latLng:[56,24],name:"Latvia"},{latLng:[33,35],name:"Lebanon"},{latLng:[6,-9],name:"Liberia"},{latLng:[47,9],name:"Liechtenstein"},{latLng:[55,23],name:"Lithuania"},{latLng:[49,6],name:"Luxembourg"},{latLng:[-18,46],name:"Madagascar"},{latLng:[4,101],name:"Malaysia"},{latLng:[3,73],name:"Maldives"},{latLng:[35,14],name:"Malta"},{latLng:[21,-10],name:"Mauritania"},{latLng:[-20,57],name:"Mauritius"},{latLng:[23,-102],name:"Mexico"},{latLng:[47,28],name:"Moldova"},{latLng:[43,7],name:"Monaco"},{latLng:[46,103],name:"Mongolia"},{latLng:[42,19],name:"Montenegro"},{latLng:[31,-7],name:"Morocco"},{latLng:[-18,35],name:"Mozambique"},{latLng:[-22,18],name:"Namibia"},{latLng:[28,84],name:"Nepal"},{latLng:[52,5],name:"Netherlands"},{latLng:[-40,174],name:"New Zealand"},{latLng:[12,-85],name:"Nicaragua"},{latLng:[17,8],name:"Niger"},{latLng:[9,8],name:"Nigeria"},{latLng:[41,21],name:"North Macedonia"},{latLng:[60,8],name:"Norway"},{latLng:[21,55],name:"Oman"},{latLng:[30,69],name:"Pakistan"},{latLng:[8,-80],name:"Panama"},{latLng:[-6,143],name:"Papua New Guinea"},{latLng:[-23,-58],name:"Paraguay"},{latLng:[-9,-75],name:"Peru"},{latLng:[12,121],name:"Philippines"},{latLng:[51,19],name:"Poland"},{latLng:[39,-8],name:"Portugal"},{latLng:[25,51],name:"Qatar"},{latLng:[45,24],name:"Romania"},{latLng:[61,105],name:"Russia"},{latLng:[-1,29],name:"Rwanda"},{latLng:[13,-60],name:"Saint Lucia"},{latLng:[12,-61],name:"Saint Vincent and the Grenadines"},{latLng:[43,12],name:"San Marino"},{latLng:[23,45],name:"Saudi Arabia"},{latLng:[14,-14],name:"Senegal"},{latLng:[44,21],name:"Serbia"},{latLng:[-4,55],name:"Seychelles"},{latLng:[1,103],name:"Singapore"},{latLng:[48,19],name:"Slovakia"},{latLng:[46,14],name:"Slovenia"},{latLng:[5,46],name:"Somalia"},{latLng:[-30,22],name:"South Africa"},{latLng:[40,-3],name:"Spain"},{latLng:[7,80],name:"Sri Lanka"},{latLng:[12,30],name:"Sudan"},{latLng:[3,-56],name:"Suriname"},{latLng:[60,18],name:"Sweden"},{latLng:[46,8],name:"Switzerland"},{latLng:[34,38],name:"Syria"},{latLng:[23,121],name:"Taiwan*"},{latLng:[-6,34],name:"Tanzania"},{latLng:[15,100],name:"Thailand"},{latLng:[-8,125],name:"Timor-Leste"},{latLng:[8,0],name:"Togo"},{latLng:[10,-61],name:"Trinidad and Tobago"},{latLng:[33,9],name:"Tunisia"},{latLng:[38,35],name:"Turkey"},{latLng:[1,32],name:"Uganda"},{latLng:[48,31],name:"Ukraine"},{latLng:[23,53],name:"United Arab Emirates"},{latLng:[55,-3],name:"United Kingdom"},{latLng:[-32,-55],name:"Uruguay"},{latLng:[41,64],name:"Uzbekistan"},{latLng:[6,-66],name:"Venezuela"},{latLng:[14,108],name:"Vietnam"},{latLng:[-13,27],name:"Zambia"},{latLng:[-19,29],name:"Zimbabwe"}]
,
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
            // label.html("<strong>"+label.html()+"</strong>"+_this.markupdata[code]);                
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

        var j=1;
        for(i in data.data.contacts.regional)
        {
            console.log(data.data.contacts.regional[i]['loc']);
            //var j =i;
            html+="<tr>";
            html+="<td>"+j+"</td>";
            html+="<td>"+data.data.contacts.regional[i]['loc'];
            html+="<td>"+data.data.contacts.regional[i]['number'];
            html+="</tr>";
            ++j;
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
 // $("div.datahub-meta").addClass("hide");
 $("iframe").contents().find(".datahub-meta").addClass("hide");
  /* $('iframe').load(function() {
    $("iframe").contents().find(".datahub-meta").addClass("hide");
  }); */
});