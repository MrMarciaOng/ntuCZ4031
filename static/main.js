var ws = new WebSocket("ws://localhost:8888/websocket");
var hword = null;

ws.onmessage = function (e) {
    console.log(e)
    createGraph(e.data);
    hword = document.getElementById("highlight").innerHTML;
}

function handleSubmit(e) {
    ws.send(JSON.stringify(e));
}

function highlight(word) {
    var rgxp = new RegExp(word);
    var repl = '<span style="background-color:#343a40; color:#FFFFFF">' + word + '</span>';
    document.getElementById("highlight").innerHTML =  document.getElementById("highlight").innerHTML.replace(rgxp, repl);   
}

function highlightAll() {
    var repl = '<span style="background-color:#343a40; color:#FFFFFF">' + hword + '</span>';
    document.getElementById("highlight").innerHTML =  repl;   
}

function unhighlight(){
    document.getElementById("highlight").innerHTML = hword;
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
    var biggestbodyparent;
    
    var longestactual = 0;
    var longestactualid;
    var longestactualparent;
    
    function finaledit(data)
    {
    
        console.log("BIGGEST BODY ID:" +biggestbodyid)
        console.log(data);
        data.nodes.update({id: longestactualid,  color: {border: 'BLUE'}});
        data.nodes.update({id: biggestbodyid,  color: {border: 'RED'}});
        
    
    
        if(longestactualid == biggestbodyid)
        {
            data.edges.update({from: biggestbodyid, to: biggestbodyparent, label: 'Biggest Cost And Longest Actual Time', font: {color : 'RED'}});
        }
        else
        {
            data.edges.update({from: biggestbodyid, to: biggestbodyparent, label: 'Biggest Cost', font: {color : 'RED'}});
            data.edges.update({from: longestactualid, to: longestactualparent, label: 'Longest Actual Time', font: {color : 'BLUE'}});
        }
        
    
    
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
        updateheadnodes(this.data);
        if(arrayc["Plan"].Plans !== undefined)
            {
                this.bodydealer(arrayc["Plan"]["Plans"],this.counter) // pass to recursive function
    
            }
        finaledit(this.data);
        legendmaker(this.network,this.data);
    
       
       
    };
    
    function updateheadnodes(data)
    {
    
      
        data.nodes.update({id: 1,  color: {border: 'GREEN'}});
    };
    
    function legendmaker(network,data)
    {
         var hor =  100
         var ver =  300
          console.log(network.view.sourceTranslation.x);
          var step = 7;
          data.nodes.add({id: 9000, x: hor, y: ver, label: 'Internet', value: 1, fixed: true, physics:false});
          data.nodes.add({id: 9001, x: hor, y: ver + step, label: 'Switch', value: 1, fixed: true,  physics:false});
          data.nodes.add({id: 9002, x: hor, y: ver + 2 * step, label: 'Server', fixed: true,  physics:false});
          data.nodes.add({id: 9003, x: hor, y: ver + 3 * step, label: 'Computer', value: 1, fixed: true,  physics:false});
          data.nodes.add({id: 9004, x: hor, y: ver + 4 * step, label: 'Smartphone', value: 1, fixed: true,  physics:false});
    }
    this.nodecreator = function(nodesLabel,nodesTitle,displayNode,counter,nodetype)
    {
    
        if(displayNode!=null){
            var newObj = JSON.parse(JSON.stringify(displayNode));
        //     if(newObj.Plans != null){
        //     delete newObj.Plans;
        //     }
        }
        if (nodetype == "Hash Join")
        {
            this.nodes.add({id: counter,color : "#e0dab3",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' }, label: nodesLabel,title: '<pre>' + nodesTitle + '</pre>', shape : "circle",display: newObj})
        }
        else if (nodetype == "Hash")
        {
            this.nodes.add({id: counter,color : "#c1bfae",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' }, label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "circle", display: newObj})
        }
        else if (nodetype == "Nested Loop")
        {
            this.nodes.add({id: counter,color : "#ad6e4a",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' }, label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "circle", display: newObj})
        }
        else if (nodetype == "Merge Join")
        {
            this.nodes.add({id: counter,color : "#4aad69", font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>',shape : "circle", display: newObj})
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
            this.nodes.add({id: counter,color : "#4aad69", font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "box", display: newObj})
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
            this.nodes.add({id: counter,color : "#a37d7d",font: { multi: 'html', bold:{ color : "red"},face: 'georgia' },label: nodesLabel, title: '<pre>' + nodesTitle + '</pre>', shape : "diamond", display: newObj})
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
        
        Object.keys(bodypart[i]).forEach(function(key) {
            if(key != "Plans"){
                var tempString = key + ": " + String(bodypart[i][key]);
                if(key == "Total Cost")
                {
                    temphold = parseFloat(bodypart[i]["Total Cost"]);
                    console.log("Temphold :"+temphold);
                    if(biggestbody <= temphold) 
                    {
                        biggestbody = temphold;
                        biggestbodyid = holdcount;
                        biggestbodyparent = parentcounter;
    
                        nodesLabel = nodesLabel.concat(tempString +'\n');
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
                    temphold = parseFloat(bodypart[i]["Actual Total Time"]);
                    console.log("Temphold :"+temphold);
                    if(longestactual <= temphold) 
                    {
                        longestactual = temphold;
                        longestactualid = holdcount;
                        longestactualparent = parentcounter;
    
                        nodesLabel = nodesLabel.concat(tempString +'\n');
                        nodesTitle = nodesTitle.concat(tempString +'\n');
                    }
                    else
                    {
                        nodesLabel = nodesLabel.concat(tempString +'\n');
                        nodesTitle = nodesTitle.concat(tempString +'\n');
    
                    }
    
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
                    nodesLabel = nodesLabel.concat(tempString+'\n');
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
                else if(key == "Output")
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
    
            physics : false,
            edges: {
                font: {
                    size: 12
                }
            },
            nodes: {
    
                chosen: false,
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
                    nodeSpacing: 420,
                    treeSpacing: 666,
                }
    
            }
        };
    
        // initialize your network!
        this.network = new vis.Network(this.container, this.data, this.options);
    
    
    this.network.on('click', function (properties) {
        var ids = properties.nodes;
        // console.log(ids);
        // console.log(this.body.nodes[ids]);
        var clickedNodes = this.body.nodes[ids];
        var nodeTextObject = clickedNodes["shape"]["labelModule"]["elementOptions"].display;
        console.log(nodeTextObject);

        // get the reference for the body
        var div_nodetext = document.getElementById('nodetext');
        
        // creates a <table> element
        var tbl = document.createElement("table");
        tbl.classList.add('table');
        tbl.classList.add('table-striped');
        var tbody = document.createElement("tbody");
        
        // creating rows
        Object.keys(nodeTextObject).forEach(function (key) {
            if(key == "Plans"){
                return;
            }
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
    
    this.network.on('click', function (properties) {
        var ids = properties.nodes;
        unhighlight();
        var clickedNodes = this.body.nodes[ids];
        var nodeTextObject = clickedNodes["shape"]["labelModule"]["elementOptions"].display;
        var word = "";
        Object.keys(nodeTextObject).forEach(function (key) {
            if(key == "Relation Name"){
                word = String(nodeTextObject[key]);
            }
            else if(key == "Alias") {
                if (word == String(nodeTextObject[key])){
                    highlight(word);
                }
                else{
                    word = word + " " + String(nodeTextObject[key]);
                    highlight(word);
                }
            }
            else if(key =="Hash Cond") {
                if (word==""){
                    word = String(nodeTextObject[key]);
                }
                highlight(word);
            }
            else if (key == "Plans"){
                console.log(nodeTextObject[key][0]);
                if(nodeTextObject[key][0]["Node Type"]=="Seq Scan"){
                    word = String(nodeTextObject[key][0]["Relation Name"]);
                    if(word == String(nodeTextObject[key][0]["Alias"])) {
                        highlight(word);
                    }
                    else{
                        word = word + " " + String(nodeTextObject[key][0]["Alias"]);
                        highlight(word);
                    }
                } 
            } 
        });
        if(ids==1){
            highlightAll();
        }
    })
};