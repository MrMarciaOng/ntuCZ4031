const OPERATORS = {
	"<=": "is less than or equal to",
	">=": "is larger than or equal to",
	">": "is larger than",
	"<": "is less than",
	"=": "is equal to",
	"-": "minus",
	"\\+": "plus"
};

var ws = new WebSocket("ws://localhost:8888/websocket");

// ws.onopen = function() {
// 	// speak("Hello");
// }

ws.onmessage = function(e) {
	console.log(e)
    createGraph(e.data);	
}

function handleSubmit(e) {
	ws.send(JSON.stringify(e));
}

function createGraph(data){
    var data = JSON.parse(data);
    var graph = new Graph();
    graph.headdealer(data);
}

function Graph(){
this.nodes = new vis.DataSet([]);
this.edges = new vis.DataSet([]);

this.counter = 0;


this.headdealer = function(arrayc)
{
    // console.log(arrayc);
    // console.log(arrayc["Plan"]);
    this.counter++;
    var nodesLabel = "";
    Object.keys(arrayc["Plan"]).forEach(function(key) {
        if(key != "Plans"){
            var tempString = key + ": " + String(arrayc["Plan"][key]);
            if(key == "Total Cost")
            {
                nodesLabel = nodesLabel.concat("<b>"+tempString+"</b>" + '\n');

            }
            else
            {
                nodesLabel = nodesLabel.concat(tempString + '\n');

            }

        }

    });
    console.log(nodesLabel);
    this.nodecreator(nodesLabel,this.counter,arrayc["Plan"]["Node Type"]);
    //nodes.add({id: counter,color : {border : 'red'}, label: nodesLabel})
    // nodes.add({id: counter,color : {border : 'red'}, label:String("Join Type: "+arrayc["Plan"]['Join Type']+'\n'+ "Node Type: "+arrayc["Plan"]['Node Type']+'\n'+ "Node Type: "+arrayc["Plan"]['Total Cost']+'\n'+ "Plan Rows: "+arrayc["Plan"]['Plan Rows'])})
    if(arrayc["Plan"].Plans !== undefined)
        {
            this.bodydealer(arrayc["Plan"]["Plans"],this.counter) // pass to recursive function
        }
    
    // create an array with edges


   
   
};


this.nodecreator = function(nodesLabel,counter,nodetype)
{
    if (nodetype == "Hash Join")
    {
        this.nodes.add({id: counter,color : "#e0dab3",font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape : "circle"})
    }
    else if (nodetype == "Hash")
    {
        this.nodes.add({id: counter,color : "#c1bfae",font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape : "circle"})
    }
    else if (nodetype == "Nested Loop")
    {
        this.nodes.add({id: counter,color : "#ad6e4a", font: { multi: 'html', face: 'georgia' },label: nodesLabel, shape : "circle"})
    }
    else if (nodetype == "Merge Join")
    {
        this.nodes.add({id: counter,color : "#4aad69", font: { multi: 'html', face: 'georgia' },label: nodesLabel, shape : "circle"})
    }

    else if (nodetype == "Seq Scan")
    {
        this.nodes.add({id: counter,color : "#c1bfae",font: { multi: 'html', face: 'georgia' },label: nodesLabel, shape : "box"})
    }
    else if (nodetype == "Index Scan")
    {
        this.nodes.add({id: counter,color : "#ad6e4a",font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape : "box"})
    }
    else if (nodetype == "Values Scan")
    {
        this.nodes.add({id: counter,color : "#4aad69", font: { multi: 'html', face: 'georgia' },label: nodesLabel, shape : "box"})
    }

    else if (nodetype == "Index Only Scan")
    {
        this.nodes.add({id: counter,color : "#c1bfae",font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape : "box"})
    }
    else if (nodetype == "Subquery Scan")
    {
        this.nodes.add({id: counter,color : "#8aad4a", font: { multi: 'html', face: 'georgia' },label: nodesLabel, shape : "box"})
    }
    else if (nodetype == "Function Scan")
    {
        this.nodes.add({id: counter,color : "#a37d7d", font: { multi: 'html', face: 'georgia' },label: nodesLabel, shape : "box"})
    }

     else if (nodetype == "Sort")
    {
        this. nodes.add({id: counter,color : "#8aad4a", font: { multi: 'html', face: 'georgia' },label: nodesLabel, shape : "diamond"})
    }
    else if (nodetype == "Aggregate")
    {
        this.nodes.add({id: counter,color : "#a37d7d",font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape : "diamond"})
    }


    else
    {
        this.nodes.add({id: counter,color : "#4aad69",font: { multi: 'html', face: 'georgia' }, label: nodesLabel})
    }
    /*
    'Materialize'
    'Limit'
    'Result' 
    'Gather'
    'Gather Merge'
    
    'BitmapAnd'
    'BitmapOr'
    'Bitmap Heap Scan'
    'Bitmap Index Scan'
    'CTE Scan'
    'Append'
    'Unique'*/
};

this.bodydealer = function(bodypart,parentcounter) // deal with everything that has plans recursively
{
    console.log(bodypart.length);

    for(let i=0 ; i< bodypart.length;i++)
    {

    this.counter++;
    var nodesLabel = "";
    Object.keys(bodypart[i]).forEach(function(key) {
        if(key != "Plans"){
            var tempString = key + ": " + String(bodypart[i][key]);
            if(key == "Total Cost")
            {
                nodesLabel = nodesLabel.concat("<b>"+tempString+"</b>" + '\n');

            }
            else
            {
                nodesLabel = nodesLabel.concat(tempString + '\n');

            }

        }

    });
    //nodes.add({id: counter, label: nodesLabel});
    this.nodecreator(nodesLabel,this.counter,bodypart[i]["Node Type"]);
    // nodes.add({id: counter, label: String("Node Type: "+bodypart[i]["Node Type"]+'\n'+ "Plan Rows: "+bodypart[i]['Total Cost']+'\n'+ "Plan Rows: "+bodypart[i]['Plan Rows'])});
    this.edges.add({from: this.counter, to: parentcounter ,arrows : "to"})
        if(bodypart[i].Plans != undefined)
        {
            this.bodydealer(bodypart[i].Plans,this.counter)
        }
    }
    
};

 // create a network
 this.container = document.getElementById('graph');

 //provide the data in the vis format
 this.data = {
     nodes: this.nodes,
     edges: this.edges
 };
 this.options = {edges: {
     font: {
         size: 12
     }
     },
     nodes: {
     shape: 'box',
     font: {
         bold: {
         color: '#0077aa'
         
         }
     }},
     layout: {
             hierarchical: {
                 direction: "DU",
                 sortMethod: "directed",
                 levelSeparation: 256,
                 nodeSpacing: 720,
                 treeSpacing: 1000,
             }
 
 }
     };

 // initialize your network!
 this.network = new vis.Network(this.container, this.data, this.options);

}
