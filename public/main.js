const firebaseConfig = {
};
firebase.initializeApp(firebaseConfig);

function createChart({
    id: containerID,
    collection
}) {

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    color = d3.scaleOrdinal(d3.schemeCategory10);

var nodes = [
{id:"abcc"},{id:"bgogo"},{id:"bibox"},{id:"bigone"},{id:"bilaxy"},{id:"binance"},{id:"bitmart"},{id:"bitun.io"},{id:"bitbox"},{id:"bitfinex"},{id:"bithumb"},{id:"bitmax"},{id:"bittrex"},{id:"bity.com"},{id:"coss.io"},{id:"crex24"},{id:"cashierest"},{id:"changelly"},{id:"cobinhood"},{id:"coinexchange.io"},{id:"coinbene"},{id:"coinbene:"},{id:"coindelta"},{id:"coinex"},{id:"coinhako"},{id:"cryptopia"},{id:"digifinex"},{id:"fcoin"},{id:"gbx"},{id:"ggbtc.com"},{id:"gate.io"},{id:"gemini"},{id:"hitbtc"},{id:"hotbit"},{id:"huobi"},{id:"kraken"},{id:"kryptono"},{id:"kucoin"},{id:"latoken"},{id:"liqui.io"},{id:"liquid"},{id:"livecoin.net"},{id:"mercatox"},{id:"nexbit"},{id:"otcbtc"},{id:"okex"},{id:"paribu"},{id:"peatio"},{id:"poloniex"},{id:"remitano"},{id:"shapeshift"},{id:"tidex"},{id:"topbtc"},{id:"trade.io"},{id:"uex"},{id:"upbit"},{id:"yobit.net"},{id:"yunbi"},{id:"zb.com"},{id:"binance"},{id:"bitfinex"},{id:"bittrex"},{id:"gemini"},{id:"kraken"},{id:"poloniex"}
];
var links = [];

var simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("link", d3.forceLink(links).distance(200))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .alphaTarget(1)
    .on("tick", ticked);

var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    link = g.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).selectAll(".link"),
    node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");

restart();

//d3.timeout(function() {
//  links.push({source: a, target: b}); // Add a-b.
//  links.push({source: b, target: c}); // Add b-c.
//  links.push({source: c, target: a}); // Add c-a.
//  restart();
//}, 1000);

//d3.interval(function() {
//  nodes.pop(); // Remove c.
//  links.pop(); // Remove c-a.
//  links.pop(); // Remove b-c.
//  restart();
//}, 2000, d3.now());

//d3.interval(function() {
//  nodes.push(c); // Re-add c.
//  links.push({source: b, target: c}); // Re-add b-c.
//  links.push({source: c, target: a}); // Re-add c-a.
//  restart();
//}, 2000, d3.now() + 1000);

function restart() {

  // Apply the general update pattern to the nodes.
  node = node.data(nodes, function(d) { return d.id;});
  node.exit().remove();
  node = node.enter().append("circle").attr("fill", function(d) { return color(d.id); }).attr("r", 10).merge(node);

  // Apply the general update pattern to the links.
  link = link.data(links, function(d) { return d.source.id + "-" + d.target.id; });
  link.exit().remove();
  link = link.enter().append("line").merge(link);

  // Update and restart the simulation.
  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
}

function ticked() {
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}


    const firestoreCollection = firebase
        .firestore()
        .collection(collection)
        .orderBy("block_timestamp", "desc")
        .limit(30);

    firestoreCollection.get().then(onData);
    firestoreCollection.onSnapshot(onData);

    function onData (querySnapshot) {
        let entries = [];

        querySnapshot.forEach(tx => {


//            svg.append("g")
//                .attr("class", "nodes")
//                .selectAll("circle");
                
//            const { timestamp, candlestick } = tx.data();
//            console.log(tx.data());

//            val = Number(tx.data()['value']) / 1e18;
//            console.log(tx.data()['exchange'] + ' ' + tx.data()['io'] + ' ' + String(val));

        });

//        entries = entries.sort((a, b) => d3.ascending(a.timestamp, b.timestamp));

//        chartData = entries;

//        const chart = renderChart({
//            size,
//            data: chartData
//        // }).Bheight(height);
//        });
//
//        d3.select(containerID).call(chart);
//
//        d3
//            .selectAll(`${containerID} .bands rect`)
//            .on("mouseover", function (d, i) {
//                d3.select(this).classed("hoved", true);
//                d3.select(`${containerID} .stick${i}`).classed("hoved", true);
//                d3.select(`${containerID} .candle${i}`).classed("hoved", true);
//                d3.select(`${containerID} .volume${i}`).classed("hoved", true);
//                d3.select(`${containerID} .sigma${i}`).classed("hoved", true);
//            })
//            .on("mouseout", function (d, i) {
//                d3.select(this).classed("hoved", false);
//                d3.select(`${containerID} .stick${i}`).classed("hoved", false);
//                d3.select(`${containerID} .candle${i}`).classed("hoved", false);
//                d3.select(`${containerID} .volume${i}`).classed("hoved", false);
//                d3.select(`${containerID} .sigma${i}`).classed("hoved", false);
//            });
    }
}

function renderChart({ size, data }) {
    const margin = 1;
    const width = 800;
    const height = 600;
    // let Bheight = 460;
    let Bheight = height;
    const lastEntry = data[data.length - 1];
    const lastClose = lastEntry.close;

    function csrender(selection) {
        selection.each(function () {
            const minimal = d3.min(data, d => d.low);
            const maximal = d3.max(data, d => d.high);

            const x = d3.scaleBand().range([0, width]);
            let y = d3.scaleLinear()
                    .domain([1, 10000])
                    .range([height, 0]);

            const xAxis = d3.axisBottom().scale(x).tickFormat(d3.timeFormat("%H:%M"));

            x.domain(data.map(d => d.timestamp));
            y.domain([minimal, maximal]).nice();

            const xtickdelta = Math.ceil(60 / (width / data.length));

            xAxis.tickValues(x.domain().filter((d, i) => {
                return !((i + Math.floor(xtickdelta / 2)) % xtickdelta);
            }));

            const barwidth = x.bandwidth();
            const candlewidth = Math.floor(d3.min([barwidth * 0.8, 13]) / 2) * 2 + 1;
            const delta = Math.round((barwidth - candlewidth) / 2);

            d3.select(this).select("svg").remove();

            const svg = d3
                .select(this)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", Bheight + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("g")
                .attr("class", "axis xaxis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            const yTicksCount = Math.floor(height / 100) < 3 ? 3 : Math.floor(height / 100);
            const yTicks = d3.axisRight()
                .scale(y)
                .ticks(yTicksCount);

                yTicks
                    .tickValues([...yTicks.scale().ticks(yTicksCount), lastClose])
                    .ticks(yTicksCount + 1)
                    .tickFormat(d3.format(""))
                    .tickSize(width)
                    .tickSizeOuter(0);

            svg.append("g")
                .attr("class", "axis grid")
                .attr("transform", "translate(0,0)")
                .call(yTicks);

            const bands = svg
                .selectAll(".bands")
                .data([data])
                .enter()
                .append("g")
                .attr("class", "bands");

            bands.selectAll("rect")
                .data(d => d)
                .enter()
                .append("rect")
                .attr("x", d => x(d.timestamp) + Math.floor(barwidth / 2))
                .attr("y", 0)
                .attr("height", Bheight)
                .attr("width", 1)
                .attr("class", (d, i) => "band" + i)
                .style("stroke-width", Math.floor(barwidth));

            var stick = svg.selectAll(".sticks")
                .data([data])
                .enter()
                .append("g")
                .attr("class", "sticks");

            stick.selectAll("rect")
                .data(d => d)
                .enter()
                .append("rect")
                .attr("x", d => x(d.timestamp) + Math.floor(barwidth / 2))
                .attr("y", d => y(d.high))
                .attr("class", (d, i) => "stick" + i)
                .attr("height", d => y(d.low) - y(d.high))
                .attr("width", 1)
                .classed("rise", d => (d.close > d.open))
                .classed("fall", d => (d.open > d.close));

            var candle = svg.selectAll(".candles")
                .data([data])
                .enter()
                .append("g")
                .attr("class", "candles");

            candle.selectAll("rect")
                .data(d => d)
                .enter()
                .append("g")
                .attr("class", (d, i) => "candle-" + i)
                .classed("rise", ({ close, open }) => close > open)
                .classed("fall", ({ close, open }) => open > close)
                .append("rect")
                .attr("x", d => x(d.timestamp) + delta)
                .attr("y", d => y(d3.max([d.open, d.close])))
                .attr("height", d => y(d3.min([d.open, d.close])) - y(d3.max([d.open, d.close])))
                .attr("width", candlewidth);

            // Style `Last Price` Tick
            const YTicks = svg.selectAll('.axis.grid .tick');
            YTicks
                .classed("last-price", data => data === lastClose)
                .classed("fall", data => data === lastClose && lastClose < lastEntry.open)
                .classed("rise", data => data === lastClose && lastClose > lastEntry.open);

            const lastPriceText = svg.select(".last-price text");
            const lastPriceTextLength = lastPriceText
                .node()
                .getComputedTextLength();
            lastPriceText.attr("x", +lastPriceText.attr("x") + 4);
            const lastPriceTextX = lastPriceText.attr("x");


            const lastPriceTextPadding = 8;
            const lastPriceRectWidth = lastPriceTextLength + lastPriceTextPadding;
            const lastPriceRectX = lastPriceTextX - lastPriceTextPadding / 2;


            svg.select(".last-price")
                .insert("rect", ":first-child")
                .attr("x", lastPriceRectX)
                .attr("y", -10)
                .attr("width", lastPriceRectWidth)
                .attr("height", 18);

        });
    }

    csrender.Bheight = value => {
        if (!arguments.length) return Bheight;
        Bheight = value;
        return csrender;
    };

    return csrender;
}
