var ws = new WebSocket("ws://localhost:8888/websocket");

ws.onmessage = function (e) {
    console.log(e)
    createGraph(e.data);
}

function handleSubmit(e) {
    ws.send(JSON.stringify(e));
}

function createGraph(data) {
    console.log(data);
    var graph = new Graph();
    graph.headdealer(data);
}

function Graph() {
    this.nodes = new vis.DataSet([]);
this.edges = new vis.DataSet([]);

this.counter = 0;
this.maxCost = 0;

var biggestbody = 0;
var biggestbodyid; 

function finaledit(data)
{

    console.log("BIGGEST BODY ID:" +biggestbodyid)
    console.log(data);
    data.nodes.update({id: biggestbodyid,  color: {border: 'orange'}});

};


this.headdealer = function(arrayc)
{
   
    arrayc = JSON.parse(arrayc);
    this.counter++;
    var nodesLabel = "";
    var nodesTitle = "";
    var debugcon = "";
    var displayNode = "";
    Object.keys(arrayc["Plan"]).forEach(function(key) {
        if(key != "Plans"){
            var tempString = key + ": " + String(arrayc["Plan"][key]);
            if(key == "Total Cost")
            {
                nodesTitle = nodesTitle.concat(tempString +'\n');
                nodesLabel = nodesLabel.concat(tempString +'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');

            }
            else if(key == "Actual Total Time")
            {
                nodesTitle = nodesTitle.concat(tempString +'\n');
                nodesLabel = nodesLabel.concat(tempString +'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Relation Name")
            {
                nodesTitle = nodesTitle.concat(tempString +'\n');
                nodesLabel = nodesLabel.concat(tempString+'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Node Type")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                nodesLabel = nodesLabel.concat(tempString +'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Alias Name")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Join Type")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Plan Rows")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Actual Rows")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Plan Rows")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Hash Cond")
            {
                nodesTitle = nodesTitle.concat(tempString +'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else
            {
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }

        }

    });
    console.log(debugcon);
    this.nodecreator(nodesLabel,nodesTitle, arrayc["Plan"],this.counter,arrayc["Plan"]["Node Type"]);

    if(arrayc["Plan"].Plans !== undefined)
        {
            this.bodydealer(arrayc["Plan"]["Plans"],this.counter) // pass to recursive function

        }
    finaledit(this.data);

   
   
};


this.nodecreator = function(nodesLabel,nodesTitle,displayNode,counter,nodetype)
{

    if(displayNode!=null){
        var newObj = JSON.parse(JSON.stringify(displayNode));
        if(newObj.Plans != null){
        delete newObj.Plans;
        }
    }
    if (nodetype == "Hash Join")
    {
        this.nodes.add({id: counter,color : "#e0dab3",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' }, label: nodesLabel,title: '<pre>' + nodesTitle + '</pre>', shape : "circle",display: newObj})
    }
    else if (nodetype == "Hash")
    {
        this.nodes.add({id: counter,color : "#c1bfae",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' }, label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "circle, display: newObj"})
    }
    else if (nodetype == "Nested Loop")
    {
        this.nodes.add({id: counter,color : "#ad6e4a",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' }, label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "circle, display: newObj"})
    }
    else if (nodetype == "Merge Join")
    {
        this.nodes.add({id: counter,color : "#4aad69", font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>',shape : "circle, display: newObj"})
    }

    else if (nodetype == "Seq Scan")
    {
        this.nodes.add({id: counter,color : "#c1bfae",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "box", display: newObj})
    }
    else if (nodetype == "Index Scan")
    {
        this.nodes.add({id: counter,color : "#ad6e4a",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "box",display: newObj})
    }
    else if (nodetype == "Values Scan")
    {
        this.nodes.add({id: counter,color : "#4aad69", font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "box, display: newObj"})
    }

    else if (nodetype == "Index Only Scan")
    {
        this.nodes.add({id: counter,color : "#c1bfae",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "box", display: newObj})
    }
    else if (nodetype == "Subquery Scan")
    {
        this.nodes.add({id: counter,color : "#8aad4a", font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "box", display: newObj})
    }
    else if (nodetype == "Function Scan")
    {
        this.nodes.add({id: counter,color : "#a37d7d", font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "box", display: newObj})
    }

     else if (nodetype == "Sort")
    {
        this. nodes.add({id: counter,color : "#8aad4a", font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "diamond", display: newObj})
    }
    else if (nodetype == "Aggregate")
    {
        this.nodes.add({id: counter,color : "#a37d7d",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "diamond, display: newObj"})
    }
    else
    {
        this.nodes.add({id: counter,color : "#4aad69",font: { multi: 'html', face: 'georgia' }, label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', display: newObj})
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
    var nodesTitle = "";
    var nodesTotal = "";

    holdcount = this.counter;
    console.log(this.counter + " OI COUNTER HERE LA")
    
    Object.keys(bodypart[i]).forEach(function(key) {
        if(key != "Plans"){
            var tempString = key + ": " + String(bodypart[i][key]);
            if(key == "Total Cost")
            {
                temphold = parseInt(bodypart[i]["Total Cost"]);
                console.log("Temphold :"+temphold);
                if(biggestbody <= temphold) 
                {
                    biggestbody = temphold;
                    biggestbodyid = holdcount;
                    console.log("CURRENT BIGGEST LAAAHH"+biggestbodyid);
                    nodesLabel = nodesLabel.concat("<b>"+tempString+"</b>" +'\n');
                    nodesTitle = nodesTitle.concat(tempString +'\n');
                }
                else
                {
                    nodesLabel = nodesLabel.concat(tempString +'\n');
                    nodesTitle = nodesTitle.concat(tempString +'\n');

                }
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');

            }
            else if(key == "Actual Total Time")
            {
                nodesTitle = nodesTitle.concat(tempString +'\n');
                nodesLabel = nodesLabel.concat(tempString +'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Relation Name")
            {
                nodesTitle = nodesTitle.concat(tempString +'\n');
                nodesLabel = nodesLabel.concat(tempString +'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Node Type")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                nodesLabel = nodesLabel.concat(tempString +'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Alias Name")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Join Type")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Plan Rows")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Actual Rows")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Plan Rows")
            {
                nodesTitle = nodesTitle.concat(tempString+'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else if(key == "Hash Cond")
            {
                nodesTitle = nodesTitle.concat(tempString +'\n');
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }
            else
            {
                //displayNode = displayNode.concat("<b>"+tempString+"</b>" +'\n');
            }

        }

    });
    //nodes.add({id: counter, label: nodesLabel});

    
    this.nodecreator(nodesLabel,nodesTitle,bodypart[i],this.counter,bodypart[i]["Node Type"],);
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
            }

        }
    };

    // initialize your network!
    this.network = new vis.Network(this.container, this.data, this.options);

    this.network.on('click', function (properties) {
        var ids = properties.nodes;
        console.log(ids);
        console.log(this.body.nodes[ids]);
        var clickedNodes = this.body.nodes[ids];
        var nodeTextObject = clickedNodes["shape"]["labelModule"]["elementOptions"].display;

        // get the reference for the body
        var div_nodetext = document.getElementById('nodetext');

        // creates a <table> element
        var tbl = document.createElement("table");
        tbl.classList.add('table');
        tbl.classList.add('table-striped');
        var tbody = document.createElement("tbody");

        // creating rows
        Object.keys(nodeTextObject).forEach(function (key) {
            let row = document.createElement("tr");
            let nodeKey = document.createElement("td");
            let nodeKeyText = document.createTextNode(key);
            nodeKey.appendChild(nodeKeyText);
            let nodeValue = document.createElement("td");
            let nodeValueText = document.createTextNode(nodeTextObject[key]);
            
            nodeValue.appendChild(nodeValueText);
        
            row.appendChild(nodeKey);
            row.appendChild(nodeValue);           
            tbody.appendChild(row);

        });//close
        
        tbl.appendChild(tbody); // add the row to the end of the table body

        if(div_nodetext.firstChild != null){
            div_nodetext.replaceChild(tbl, div_nodetext.firstChild);
        }
        else{
            div_nodetext.appendChild(tbl);
        }
    
    })
};