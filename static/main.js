<<<<<<< HEAD
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

ws.onmessage = function (e) {
    console.log(e)
    createGraph(e.data);
=======
var ws = new WebSocket("ws://localhost:8888/websocket");

ws.onmessage = function(e) {
	console.log(e)
    createGraph(e.data);	
>>>>>>> 13910a132e168b4be1aaec35175adbfd968c7924
}

function handleSubmit(e) {
    ws.send(JSON.stringify(e));
}

function createGraph(data) {
    console.log(data);
    var graph = new Graph();
    graph.headdealer(data);
}

<<<<<<< HEAD
function Graph() {
=======
function Graph(){
>>>>>>> 13910a132e168b4be1aaec35175adbfd968c7924
    this.nodes = new vis.DataSet([]);
    this.edges = new vis.DataSet([]);

    this.counter = 0;


<<<<<<< HEAD
    this.headdealer = function (arrayc) {
=======
    this.headdealer = function(arrayc)
    {
>>>>>>> 13910a132e168b4be1aaec35175adbfd968c7924
        console.log(arrayc);
        console.log(arrayc["Plan"]);
        arrayc = JSON.parse(arrayc);
        this.counter++;
        var nodesLabel = "";
<<<<<<< HEAD
        Object.keys(arrayc["Plan"]).forEach(function (key) {
            if (key != "Plans") {
                var tempString = key + ": " + String(arrayc["Plan"][key]);
                if (key == "Total Cost") {
                    nodesLabel = nodesLabel.concat("<b>" + tempString + "</b>" + '\n');

                }
                else {
                    nodesLabel = nodesLabel.concat(tempString + '\n');

                }

            }

        });
        console.log(nodesLabel);
        this.nodecreator(nodesLabel, this.counter, arrayc["Plan"]["Node Type"], arrayc["Plan"]);
        //nodes.add({id: counter,color : {border : 'red'}, label: nodesLabel})
        // nodes.add({id: counter,color : {border : 'red'}, label:String("Join Type: "+arrayc["Plan"]['Join Type']+'\n'+ "Node Type: "+arrayc["Plan"]['Node Type']+'\n'+ "Node Type: "+arrayc["Plan"]['Total Cost']+'\n'+ "Plan Rows: "+arrayc["Plan"]['Plan Rows'])})
        if (arrayc["Plan"].Plans !== undefined) {
            this.bodydealer(arrayc["Plan"]["Plans"], this.counter) // pass to recursive function
        }

        // create an array with edges


    };


    this.nodecreator = function (nodesLabel, counter, nodetype, displayNode) {
        displayNode = displayNode || null;
        if (displayNode != null) {
            var newObj = JSON.parse(JSON.stringify(displayNode));
            if (newObj.Plans != null) {
                delete newObj.Plans;
            }
        }

        if (nodetype == "Hash Join") {
            this.nodes.add({ id: counter, color: "#e0dab3", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "circle", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else if (nodetype == "Hash") {
            this.nodes.add({ id: counter, color: "#c1bfae", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "circle", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else if (nodetype == "Nested Loop") {
            this.nodes.add({ id: counter, color: "#ad6e4a", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "circle", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else if (nodetype == "Merge Join") {
            this.nodes.add({ id: counter, color: "#4aad69", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "circle", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else if (nodetype == "Seq Scan") {
            this.nodes.add({ id: counter, color: "#c1bfae", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "box", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else if (nodetype == "Index Scan") {
            this.nodes.add({ id: counter, color: "#ad6e4a", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "box", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else if (nodetype == "Values Scan") {
            this.nodes.add({ id: counter, color: "#4aad69", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "box", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else if (nodetype == "Index Only Scan") {
            this.nodes.add({ id: counter, color: "#c1bfae", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "box", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else if (nodetype == "Subquery Scan") {
            this.nodes.add({ id: counter, color: "#8aad4a", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "box", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else if (nodetype == "Function Scan") {
            this.nodes.add({ id: counter, color: "#a37d7d", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "box", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else if (nodetype == "Sort") {
            this.nodes.add({ id: counter, color: "#8aad4a", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "diamond", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else if (nodetype == "Aggregate") {
            this.nodes.add({ id: counter, color: "#a37d7d", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, shape: "diamond", title: '<pre>' + nodesLabel + '</pre>', display: newObj })
        }
        else {
            this.nodes.add({ id: counter, color: "#4aad69", font: { multi: 'html', face: 'georgia' }, label: nodesLabel, title: '<pre>' + nodesLabel + '</pre>', display: newObj })
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

    this.bodydealer = function (bodypart, parentcounter) // deal with everything that has plans recursively
    {
        console.log(bodypart.length);

        for (let i = 0; i < bodypart.length; i++) {

            this.counter++;
            var nodesLabel = "";
            Object.keys(bodypart[i]).forEach(function (key) {
                if (key != "Plans") {
                    var tempString = key + ": " + String(bodypart[i][key]);
                    if (key == "Total Cost") {
                        nodesLabel = nodesLabel.concat("<b>" + tempString + "</b>" + '\n');

                    }
                    else {
                        nodesLabel = nodesLabel.concat(tempString + '\n');

                    }
=======
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
    };

    this.nodecreator = function(nodesLabel,counter,nodetype)
    {
        if (nodetype == "Hash Join")
        {
            this.nodes.add({id: counter,color : "#e0dab3",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' }, label: nodesLabel, shape : "circle"})
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
>>>>>>> 13910a132e168b4be1aaec35175adbfd968c7924

                }

            });
            //nodes.add({id: counter, label: nodesLabel});
            this.nodecreator(nodesLabel, this.counter, bodypart[i]["Node Type"], bodypart[i]);
            // nodes.add({id: counter, label: String("Node Type: "+bodypart[i]["Node Type"]+'\n'+ "Plan Rows: "+bodypart[i]['Total Cost']+'\n'+ "Plan Rows: "+bodypart[i]['Plan Rows'])});
            this.edges.add({ from: this.counter, to: parentcounter, arrows: "to" })
            if (bodypart[i].Plans != undefined) {
                this.bodydealer(bodypart[i].Plans, this.counter)
            }
<<<<<<< HEAD
        }

    };

    // create a network
    this.container = document.getElementById('graph');

    //provide the data in the vis format
    this.data = {
        nodes: this.nodes,
        edges: this.edges
    };
    console.log(this.nodes);
    this.options = {
        edges: {
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
            }
        },
        layout: {
            hierarchical: {
                direction: "DU",
                sortMethod: "directed",
                levelSeparation: 256,
                nodeSpacing: 720,
                treeSpacing: 1000,
=======

        });
        //nodes.add({id: counter, label: nodesLabel});
        this.nodecreator(nodesLabel,this.counter,bodypart[i]["Node Type"]);
        // nodes.add({id: counter, label: String("Node Type: "+bodypart[i]["Node Type"]+'\n'+ "Plan Rows: "+bodypart[i]['Total Cost']+'\n'+ "Plan Rows: "+bodypart[i]['Plan Rows'])});
        this.edges.add({from: this.counter, to: parentcounter ,arrows : "to"})
            if(bodypart[i].Plans != undefined)
            {
                this.bodydealer(bodypart[i].Plans,this.counter)
>>>>>>> 13910a132e168b4be1aaec35175adbfd968c7924
            }
        }
<<<<<<< HEAD
    };

    // initialize your network!
    this.network = new vis.Network(this.container, this.data, this.options);

    this.network.on('click', function (properties) {
        var ids = properties.nodes;
        console.log(ids);
        console.log(this.body.nodes[ids]);
        var clickedNodes = this.body.nodes[ids];
        var nodeTextObject = clickedNodes["shape"]["labelModule"]["elementOptions"].display;
        // document.getElementById("nodetext").innerHTML = clickedNodes["shape"]["labelModule"]["elementOptions"].display;
        console.log('clicked nodes:', clickedNodes);
        console.log(nodeTextObject);
        console.log(nodeTextObject["Total Cost"]);
        console.log(Object.keys(nodeTextObject));
        console.log(nodeTextObject["Node Type"]);


        // get the reference for the body
        var div_nodetext = document.getElementById('nodetext');

        // creates a <table> element
        var tbl = document.createElement("table");

        // creating rows
        Object.keys(nodeTextObject).forEach(function (key) {
            let row = document.createElement("tr");
            let nodeKey = document.createElement("td");
            let nodeKeyText = document.createTextNode(key);
            nodeKey.appendChild(nodeKeyText);
            let nodeValue = document.createElement("td");
            let nodeValueText = document.createTextNode(nodeTextObject[key]);
            
            nodeValue.appendChild(nodeValueText);
            //  for (var c = 0; c < 2; c++) {
            //     var cell = document.createElement("td");
            //     getRandom = Math.floor(Math.random() * (max - min + 1)) + min;
            //     var cellText = document.createTextNode(nodeTextObjec);
            //     cell.appendChild(cellText);
            //     row.appendChild(cell);
            // }
            row.appendChild(nodeKey);
            row.appendChild(nodeValue);           

            tbl.appendChild(row); // add the row to the end of the table body
        });//close

        div_nodetext.appendChild(tbl);


    })
};
=======
        
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
>>>>>>> 13910a132e168b4be1aaec35175adbfd968c7924
