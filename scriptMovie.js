let movieURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
let movieData 

let svg = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawTreeMap = () => {
    let hierarchy = d3.hierarchy(movieData, (d) => {
        return d['children']
    }).sum((d) => {
        return d['value']
    }).sort((node1,node2) => {
        return node2['value'] - node1['value']
    })

    let createTreeMap = d3.treemap()
                        .size([1000,600])

    createTreeMap(hierarchy)

    let movieTiles = hierarchy.leaves()
    console.log(movieTiles)

    let block = svg.selectAll('g')
                    .data(movieTiles)
                    .enter()
                    .append('g')
                    .attr('transform',(d)=> {
                        return 'translate(' + d['x0'] + ',' + d['y0']+')'

                    })

    block.append('rect')
        .attr('class' , 'tile')
        .attr('fill', (d) => {
            let category = d['data']['category']

            if (category === 'Action') {
                return 'Olive'
            } else if (category === 'Drama'){
                return 'Grey'
            } else if (category === 'Adventure'){
                return 'OrangeRed'
            } else if (category === 'Family'){
                return 'DarkMagenta'
            } else if (category === 'Animation'){
                return 'Chocolate'
            } else if (category === 'Comedy'){
                return 'Teal'
            } else if (category === 'Biography'){
                return 'PaleVioletRed'
            }

        })

        .attr('data-name' , (d) => {
            return d['data']['name']
        })
        .attr('data-category' , (d) => {
            return d['data']['category']
        })
        .attr('data-value' , (d) => {
            return d['data']['value']
        })
        .attr('width' , (d) => {
            return d['x1'] - d['x0']
        })
        .attr('height' , (d) => {
            return d['y1'] - d['y0']
        })


        .on ('mouseover',(d) => {
            tooltip.transition()
                    .style('visibility', 'visible')
            
            tooltip .attr('data-value',d['data']['value'])
                    .text( d['data']['name'] + ' | ' + d['data']['category'] + ' |  $' + d['data']['value'])
                    
    
    
        })
    
        .on ('mouseout', (d) => {
            tooltip.transition()
            .style('visibility', 'hidden')
        })

    block.append('text')
        .text((d)=> {
            return d['data']['name']
        })
        .attr('x', 5)
        .attr('y', 20)


    


}


d3.json(movieURL).then(
    (data, error) => {
        if(error) {
            console.log(error)
        } else {
            movieData = data
            console.log(movieData)
            drawTreeMap()
        }
    }
)