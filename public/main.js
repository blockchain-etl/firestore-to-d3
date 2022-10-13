width=1600;
height=900;
collection="transactions00";
nodes = [
{id:"abcc"},{id:"bgogo"},{id:"bibox"},{id:"bigone"},{id:"bilaxy"},{id:"binance"},{id:"bitmart"},{id:"bitun.io"},{id:"bitbox"},{id:"bitfinex"},{id:"bithumb"},{id:"bitmax"},{id:"bittrex"},{id:"bity.com"},{id:"coss.io"},{id:"crex24"},{id:"cashierest"},{id:"changelly"},{id:"cobinhood"},{id:"coinexchange.io"},{id:"coinbene"},{id:"coinbene:"},{id:"coindelta"},{id:"coinex"},{id:"coinhako"},{id:"cryptopia"},{id:"digifinex"},{id:"fcoin"},{id:"gbx"},{id:"ggbtc.com"},{id:"gate.io"},{id:"gemini"},{id:"hitbtc"},{id:"hotbit"},{id:"huobi"},{id:"kraken"},{id:"kryptono"},{id:"kucoin"},{id:"latoken"},{id:"liqui.io"},{id:"liquid"},{id:"livecoin.net"},{id:"mercatox"},{id:"nexbit"},{id:"otcbtc"},{id:"okex"},{id:"paribu"},{id:"peatio"},{id:"poloniex"},{id:"remitano"},{id:"shapeshift"},{id:"tidex"},{id:"topbtc"},{id:"trade.io"},{id:"uex"},{id:"upbit"},{id:"yobit.net"},{id:"yunbi"},{id:"zb.com"},{id:"binance"},{id:"bitfinex"},{id:"bittrex"},{id:"gemini"},{id:"kraken"},{id:"poloniex"}
];
links = [
{source: "binance", target: "bitmart"}
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

    function handleZoom(e) {
        d3.selectAll("svg g")
            .attr("transform", e.transform)
    }

    function initZoom(zoom) {
        d3.select('svg')
            .call(zoom);
    }
    function createTooltip() {
        return (d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden"));
    }

    function initializeGraph(nodes, links) {
        var svg = d3.select('svg');
        // erase everything
        svg.selectAll("*").remove();

        // initialize zoom
        var zoom = d3.zoom()
            .on("zoom", this.handleZoom)
        this.initZoom(zoom)
        d3.select("svg")
            .call(zoom)

        // initialize tooltip
        tooltip = this.createTooltip()

        // set up simulation, link and node
        simulation = d3
            .forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(function (n) { return n.id; }))
            .force(
                "x",
                d3.forceX().strength(0.05)
            )
            .force(
                "y",
                d3.forceY().strength(0.05)
            )
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        link = svg.append("g")
            .attr('stroke', 'black')
            .attr('stroke-opacity', 0.8)
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('id', (d) => d.source.id + '-' + d.target.id)
            .attr('stroke-width', 1.5);


        node = svg.append("g")
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("id", function (d) { return d.id; })
            .attr("r", function (d) {
                return 15;
            })
            .attr("class", "node")
            .attr('fill', function (d) { return 'grey';
                if (!clusterColors.hasOwnProperty(d.cluster)) {
                    clusterColors[d.cluster] = "#" + Math.floor(Math.random() * 16777215).toString(16)
                }
                return clusterColors[d.cluster]
            })
            .on("mouseover", function (d) {
                tooltip.text(d.srcElement["__data__"]["id"])
                tooltip.style("visibility", "visible")
            })
            .on("mousemove", function (event, d) { return tooltip.style("top", (event.y - 10) + "px").style("left", (event.x + 10) + "px"); })
            .on("mouseout", function (event, d) { return tooltip.style("visibility", "hidden"); })
//            .call(this.drag(simulation));



        simulation.on("tick", () => {
            node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
            link
                .attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y);
        });
    }

    function updateGraph(nodes, links) {

        // Update existing nodes
        node.selectAll('circle').style('fill', function (d) { return 'grey';
            if (!clusterColors.hasOwnProperty(d.cluster)) {
                clusterColors[d.cluster] = "#" + Math.floor(Math.random() * 16777215).toString(16);
            }
            return clusterColors[d.cluster];
        });

        // Remove old nodes
        node.exit().remove();

        // Add new nodes
        node = node.data(nodes, (d) => d.id);
        node = node
            .enter()
            .append('circle')
            .attr("r", function (d) {
                return 15;
            })
            .attr('fill', function (d) { return 'grey';
                if (!clusterColors.hasOwnProperty(d.cluster)) {
                    clusterColors[d.cluster] = "#" + Math.floor(Math.random() * 16777215).toString(16)
                }
                return clusterColors[d.cluster]
            })
            .on("mouseover", function (d) {
                tooltip.text(d.srcElement["__data__"]["id"])
                tooltip.style("visibility", "visible")
            })
            .on("mousemove", function (event, d) { return tooltip.style("top", (event.y - 10) + "px").style("left", (event.x + 10) + "px"); })
            .on("mouseout", function (event, d) { return tooltip.style("visibility", "hidden"); })
//            .call(this.drag())
            .merge(node);

        link = link.data(links, (d) => {
            return d.source.id + '-' + d.target.id;
        });

        // Remove old links
        link.exit().remove();

        link = link
            .enter()
            .append('line')
            .attr('id', (d) => d.source.id + '-' + d.target.id)
            .attr('stroke', 'black')
            .attr('stroke-opacity', 0.8)
            .attr('stroke-width', 1.5)
            .merge(link);

        // Set up simulation on new nodes and edges
        try {
            simulation
                .nodes(nodes)
                .force('link', d3.forceLink(links).id(function (n) { return n.id; }))
                .force(
                    'collide',
                    d3
                        .forceCollide()
                        .radius(function (d) {
                            return 20;
                        })
                )
                .force('charge', d3.forceManyBody())
                .force('center', d3.forceCenter(width / 2, height / 2));
        } catch (err) {
            console.log('err', err);
        }

        simulation.on('tick', () => {
            node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
            link
                .attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y);
        });
        simulation.alphaTarget(0.1).restart();
    }


pi = 3.14159;
function radiusToArea(radius) {
  return pi * radius**2;
}
function areaToRadius(area) {
  return area <= 0 ? 5 : Math.sqrt(area/pi);
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

function onData (querySnapshot) {
  querySnapshot.forEach(t => {
    tx = t.data();
    link = d3.selectAll('svg').append("g")
      .attr('stroke', 'black')
      .attr('stroke-opacity', 0.8)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('id', (d) => tx['source'] + '-' + tx['target'])
      .attr('stroke-width', 1.5);

    sourceElement = document.getElementById(tx['source']);
    targetElement = document.getElementById(tx['target']);
    if (sourceElement != null) {
      sourceArea = radiusToArea(sourceElement.getAttribute('r'));
      sourceArea -= Number(tx['value']);
      sourceElement.style['fill'] = 'blue';
      sourceElement.setAttribute('r', areaToRadius(sourceArea));
    }
    if (targetElement != null) {
      targetArea = radiusToArea(targetElement.getAttribute('r'));
      targetArea -= Number(tx['value']);
      targetElement.style['fill'] = 'red';
      sourceElement.setAttribute('r', areaToRadius(targetArea));
    }
  });
}

initializeGraph(nodes,links);
