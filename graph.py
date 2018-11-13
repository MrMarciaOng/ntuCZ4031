from node_modules.vis import vis
import json

class graph(data):
    nodes = vis.DataSet([])
    edges = vis.DataSet([])

    counter = 0

    def head_dealer(self, jsonMessage):

        counter += 1
        nodesLabel = ""

        jsonObject = json.loads(jsonMessage)
        
        for jsonPlan in jsonObject["Plan"]:
            for attribute, value in jsonPlan.items():
                if(attribute != "Plans"):
                    nodesLabel = nodesLabel + attribute + ": " + value + '\n'
        
        node_creator(nodesLabel, counter, jsonObject["Plan"]["Node Type"])

        if(jsonObject["Plan"]["Plans"] != undefined):
            body_dealer(jsonObject["Plan"]["Plans"],counter) # pass to recursive function


    def node_creator(nodesLabel, counter, nodeType):
        if (nodeType == "Hash Join"):
            nodes.add({id: counter, color : "#e0dab3", label: nodesLabel, shape : "circle"})

        elif (nodeType == "Hash"):
            nodes.add({id: counter, color : "#c1bfae", label: nodesLabel, shape : "circle"})

        elif (nodeType == "Nested Loop"):
            nodes.add({id: counter, color : "#ad6e4a", label: nodesLabel, shape : "circle"})
        
        elif (nodeType == "Merge Join"):
            nodes.add({id: counter, color : "#4aad69", label: nodesLabel, shape : "circle"})
        
        elif (nodeType == "Seq Scan"):
            nodes.add({id: counter, color : "#c1bfae", label: nodesLabel, shape : "box"})
        
        elif (nodeType == "Index Scan"):
            nodes.add({id: counter, color : "#ad6e4a", label: nodesLabel, shape : "box"})
        
        elif (nodeType == "Values Scan"):
            nodes.add({id: counter, color : "#4aad69", label: nodesLabel, shape : "box"})
        
        elif (nodeType == "Index Only Scan"):
            nodes.add({id: counter, color : "#c1bfae", label: nodesLabel, shape : "box"})
        
        elif (nodeType == "Subquery Scan"):
            nodes.add({id: counter, color : "#8aad4a", label: nodesLabel, shape : "box"})
        
        elif (nodeType == "Function Scan"):
            nodes.add({id: counter, color : "#a37d7d", label: nodesLabel, shape : "box"})
        
        elif (nodeType == "Sort"):
            nodes.add({id: counter, color : "#8aad4a", label: nodesLabel, shape : "diamond"})

        elif (nodeType == "Aggregate"):
            nodes.add({id: counter, color : "#a37d7d", label: nodesLabel, shape : "diamond"})
        
        else:
            nodes.add({id: counter,color : "#4aad69", label: nodesLabel})

        # 'Materialize'
        # 'Limit'
        # 'Result' 
        # 'Gather'
        # 'Gather Merge'
        
        # 'BitmapAnd'
        # 'BitmapOr'
        # 'Bitmap Heap Scan'
        # 'Bitmap Index Scan'
        # 'CTE Scan'
        # 'Append'
        # 'Unique'


    #deal with everything that has plans recursively
    def body_dealer(bodyMessage, parentCounter):
        bodyObject = json.loads(bodyMessage)
        
        for i in range len(bodyObject):
            counter += 1
            nodesLabel = ""

            for attribute, value in bodyObject[i].items():
                if(attribute != "Plans"):
                    nodesLabel = nodesLabel + attribute + ": " + value + '\n'

            node_creator(nodesLabel, counter, bodyObject[i]["Node Type"])
            
            edges.add({from: counter, to: parentCounter, arrows : "to"})
                if(bodyObject[i].Plans != undefined):
                    body_dealer(bodyObject[i].Plans, counter)


    # create an array with edges


    # create a network
    container = document.getElementById('mynetwork');

    # provide the data in the vis format
    data = {
        nodes: nodes,
        edges: edges
    }

    options = { edges: {
                font: {
                    size: 12
                    }   
                }       ,
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
            }

    # initialize your network!
    def initialize_network(self, container, )
    network = vis.Network(container, data, options)
