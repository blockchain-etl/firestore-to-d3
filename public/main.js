width=1600;
height=900;
collection="transactions00";
initnodes = [
{id:"abcc"},{id:"bgogo"},{id:"bibox"},{id:"bigone"},{id:"bilaxy"},{id:"binance"},{id:"bitmart"},{id:"bitun.io"},{id:"bitbox"},{id:"bitfinex"},{id:"bithumb"},{id:"bitmax"},{id:"bittrex"},{id:"bity.com"},{id:"coss.io"},{id:"crex24"},{id:"cashierest"},{id:"changelly"},{id:"cobinhood"},{id:"coinexchange.io"},{id:"coinbene"},{id:"coinbene:"},{id:"coindelta"},{id:"coinex"},{id:"coinhako"},{id:"cryptopia"},{id:"digifinex"},{id:"fcoin"},{id:"gbx"},{id:"ggbtc.com"},{id:"gate.io"},{id:"gemini"},{id:"hitbtc"},{id:"hotbit"},{id:"huobi"},{id:"kraken"},{id:"kryptono"},{id:"kucoin"},{id:"latoken"},{id:"liqui.io"},{id:"liquid"},{id:"livecoin.net"},{id:"mercatox"},{id:"nexbit"},{id:"otcbtc"},{id:"okex"},{id:"paribu"},{id:"peatio"},{id:"poloniex"},{id:"remitano"},{id:"shapeshift"},{id:"tidex"},{id:"topbtc"},{id:"trade.io"},{id:"uex"},{id:"upbit"},{id:"yobit.net"},{id:"yunbi"},{id:"zb.com"},{id:"binance"},{id:"bitfinex"},{id:"bittrex"},{id:"gemini"},{id:"kraken"},{id:"poloniex"}
];
initlinks = [
//{source: "binance", target: "bitmart"}
];

const firebaseConfig = {
    apiKey: "AIzaSyAsFzJuQOwc6Uohdz988k8k2u8JzFLuQmk",
    authDomain: "exchange-flow-demo.web.app",
    databaseURL: "https://exchange-flow-demo-default-rtdb.firebaseio.com",
    projectId: "exchange-flow-demo",
    storageBucket: "exchange-flow-demo.appspot.com",
    messagingSenderId: "207436503306",
    appId: "1:207436503306:web:6eac9b884ca9abe6a6c2f3",
    measurementId: "G-2D4LJ1VV1H"
};
firebase.initializeApp(firebaseConfig);

//var graph;
//var graph = new myGraph("#svgdiv");

function myGraph() {

    // Add and remove elements on the graph object
    this.addNode = function (id) {
        nodes.push({"id": id});
        update();
    };

    this.removeNode = function (id) {
        var i = 0;
        var n = findNode(id);
        while (i < links.length) {
            if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
                links.splice(i, 1);
            }
            else i++;
        }
        nodes.splice(findNodeIndex(id), 1);
        update();
    };

    this.removeLink = function (source, target) {
        for (var i = 0; i < links.length; i++) {
            if (links[i].source.id == source && links[i].target.id == target) {
                links.splice(i, 1);
                break;
            }
        }
        update();
    };

    this.removeallLinks = function () {
        links.splice(0, links.length);
        update();
    };

    this.removeAllNodes = function () {
        nodes.splice(0, links.length);
        update();
    };

    this.addLink = function (source, target, value) {
        var s = findNode(source),
            t = findNode(target)
        if (typeof s === 'undefined') {
            console.log("Adding node: ", source);
            this.addNode(source);
        } else {
            //sourceElement = document.getElementById(tx['source']);
            //sourceElement.setAttribute('r',s.weight)
            //console.log(s);
        }
        if (typeof t === 'undefined') {
            console.log("Adding node: ", target);
            this.addNode(target);
        } else {
            targetElement = document.getElementById(tx['target']);
            //console.log(t);
        }
        if (typeof s !== 'undefined' && typeof t !== 'undefined') {
            if (links.length > 100) {
                links.shift();
            }
            links.push({"source": s, "target": t, "value": value});
            update();
        }
    };

    var findNode = function (id) {
        for (var i in nodes) {
            if (nodes[i]["id"] === id) return nodes[i];
        }
        ;
    };

    var findNodeIndex = function (id) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id == id) {
                return i;
            }
        }
        ;
    };

    // set up the D3 visualisation in the specified element
    var w = width, h = height;

    var color = d3.scale.category20();

    var vis = d3.select("body")
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .attr("id", "svg")
            .attr("pointer-events", "all")
            .attr("viewBox", "0 0 " + w + " " + h)
            .attr("perserveAspectRatio", "xMinYMid")
            .append('svg:g');

    var force = d3.layout.force();

    var nodes = force.nodes(),
            links = force.links();

    var update = function () {
        var link = vis.selectAll("line")
                .data(links, function (d) {
                    //console.log(d)
                    return d.source.id + "-" + d.target.id;
                });

        link.enter().append("line")
                .attr("id", function (d) {
                    return d.source.id + "-" + d.target.id;
                })
                .attr("stroke-width", function (d) {
                    return d.value / 10;
                })
                .attr("class", "link");
        link.append("title")
                .text(function (d) {
                    return d.value;
                });
        link.exit().remove();

        var node = vis.selectAll("g.node")
                .data(nodes, function (d) {
                    return d.id;
                });

        var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .call(force.drag);

        nodeEnter.append("svg:circle")
                .attr("r", 20)
                //.attr("r", function(d){
                //    return d.weight / 10;
                //})
                .attr("id", function (d) {
                    return "Node;" + d.id;
                })
                .attr("class", "nodeStrokeClass")
                .attr("fill", function(d) { return color(d.id); });

        nodeEnter.append("svg:text")
                .attr("class", "textClass")
                .attr("x", 14)
                .attr("y", ".31em")
                .text(function (d) {
                    return d.id;
                });

        node.exit().remove();

        force.on("tick", function () {

            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            link.attr("x1", function (d) {
                return d.source.x;
            })
                    .attr("y1", function (d) {
                        return d.source.y;
                    })
                    .attr("x2", function (d) {
                        return d.target.x;
                    })
                    .attr("y2", function (d) {
                        return d.target.y;
                    });
        });

        // Restart the force layout.
        force
                .gravity(.01)
                .charge(-80000)
                //.gravity(0)
                //.charge(function(d){
                //    var charge = -500;
                //    if (d.index === 0) charge = 10 * charge;
                //    return charge;
                //})
                .friction(0)
                .linkDistance( function(d) { return d.value * 10 } )
                .size([w, h])
                .start();
    };


    // Make it all go
    update();
}

seen = [];
const firestoreCollection = firebase
    .firestore()
    .collection(collection)
//    .orderBy("block_timestamp", "desc")
    .orderBy("_replay_timestamp", "desc")
    .limit(30);

firestoreCollection.get().then(onData);
firestoreCollection.onSnapshot(onData);

function initializeGraph() {
    console.log("Starting");
    return;
    for (const n of initnodes) {
        graph.addNode(n['id']);
    }
    keepNodesOnTop();
}

function onData(querySnapshot) {
    querySnapshot.forEach(t => {
        tx = t.data();
        if (tx['source'] != '' && tx['target'] != '') {
            //console.log(tx['source'], tx['target'], tx['value']);
            // callback for the changes in the network
            //graph.removeLink(tx['source'], tx['target']);
            //graph.addLink(tx['source'], tx['target'], tx['value']);
            graph.addLink(tx['source'], tx['target'], 20);
        }
    });
        keepNodesOnTop();
}

//initializeGraph();

// because of the way the network is created, nodes are created first, and links second,
// so the lines were on top of the nodes, this just reorders the DOM to put the svg:g on top
function keepNodesOnTop() {
    $(".nodeStrokeClass").each(function( index ) {
        var gnode = this.parentNode;
        gnode.parentNode.appendChild(gnode);
    });
}
function clearNodes() {
    d3.select("svg")
            .remove();
}
