class Graph {
    constructor( string = "" ) {
        this.string = string;
        this.charArray = string.split( '|' );
        this.boundary = 1;
        this.column = this.charArray[ 0 ].length + 2 * this.boundary;
        this.row = this.charArray.length + 2 * this.boundary;
        this.gridSize = Math.min( 100, 600 / this.column, 600 / this.row );
        this.width = this.gridSize * this.column;
        this.height = this.gridSize * this.row;
        this.CalculateMatrix();
    }

    GetMatrix() {
        return this.matrix;
    }

    CalculateMatrix() {
        this.matrix = [];
        for ( let row = 0; row < this.row; row++ ) {
            let _matrix = [];
            for ( let col = 0; col < this.column; col++ ) {
                let e = new Object();
                e.direction = [];
                e.ajacent = 0;
                if ( row == 0 || col == 0 || row == this.row - 1 || col == this.column - 1 ) {
                    e.fill = 0;
                } else if ( this.charArray[ row - 1 ][ col - 1 ] == '0' ) {
                    e.fill = 0;
                } else {
                    e.fill = 1;
                }
                _matrix.push( e );
            }
            this.matrix.push( _matrix );
        }
        this.CalculateAjacent();
    }

    CalculateAjacent() {
        for ( let row = 0; row < this.row; row++ ) {
            for ( let col = 0; col < this.column; col++ ) {
                this.matrix[ row ][ col ].direction = [];
                this.matrix[ row ][ col ].ajacent = 0;

                if ( row - 1 >= 0 && this.matrix[ row - 1 ][ col ].fill ) {
                    this.matrix[ row ][ col ].direction.push( "Up" );
                    this.matrix[ row ][ col ].ajacent++;
                }
                if ( row + 1 < this.row && this.matrix[ row + 1 ][ col ].fill ) {
                    this.matrix[ row ][ col ].direction.push( "Down" );
                    this.matrix[ row ][ col ].ajacent++;
                }
                if ( col - 1 >= 0 && this.matrix[ row ][ col - 1 ].fill ) {
                    this.matrix[ row ][ col ].direction.push( "Left" );
                    this.matrix[ row ][ col ].ajacent++;
                }
                if ( col + 1 < this.column && this.matrix[ row ][ col + 1 ].fill ) {
                    this.matrix[ row ][ col ].direction.push( "Right" );
                    this.matrix[ row ][ col ].ajacent++;
                }
            }
        }
    }
}

function DrawPattern( graph ) {
    let BlockPattern_svg = document.getElementById( "BlockPatternSVG" );
    let CreasePattern_svg = document.getElementById( "CreasePatternSVG" );
    DrawBlockPattern( BlockPattern_svg, graph );
    DrawCreasePattern( CreasePattern_svg, graph );
}

function DrawRandomPattern() {
    let string = createRandomString();
    let graph = new Graph( string );
    DrawPattern( graph );
}

function DrawBlockPattern( svg, graph ) {
    SVGDrawer.Reset( svg, graph.width, graph.height );
    for ( let row = 0; row < graph.row; row++ ) {
        for ( let col = 0; col < graph.column; col++ ) {
            DrawBlock( svg, row, col, graph );
        }
    }
}

function DrawBlock( svg, row, col, graph ) {
    let posX = col * graph.gridSize;
    let posY = row * graph.gridSize;
    let altitude = graph.matrix[ row ][ col ].fill;
    let rect = SVGDrawer.CreateRectangle( svg, posX, posY, graph.gridSize, graph.gridSize, "none", altitude )

    if ( rect.getAttribute( 'altitude' ) == "0" ) {
        rect.setAttribute( 'fill', "white" );
    } else if ( rect.getAttribute( 'altitude' ) == "1" ) {
        rect.setAttribute( 'fill', 'CadetBlue' );
    }

    rect.onclick = function () {
        if ( rect.getAttribute( 'altitude' ) == "0" ) {
            rect.setAttribute( 'altitude', 1 );
            graph.matrix[ row ][ col ].fill = 1;
        } else if ( rect.getAttribute( 'altitude' ) == "1" ) {
            rect.setAttribute( 'altitude', 0 );
            graph.matrix[ row ][ col ].fill = 0;
        }
        // Recalculate ajacent
        graph.CalculateAjacent();
        // Draw Block Pattern & Crease Pattern
        DrawPattern( graph );
    };
    svg.append( rect );
}

function DrawCreasePattern( svg, graph ) {
    SVGDrawer.Reset( svg, graph.width, graph.height );
    let matrix = graph.matrix;
    let grid = 1 / 6;

    for ( row = 0; row < matrix.length; row++ ) {
        for ( col = 0; col < matrix[ 0 ].length; col++ ) {
            // Block absent
            if ( matrix[ row ][ col ].fill == 0 ) {
                DrawPrimitivePattern( svg, primitives[ 0 ], col, row, graph.gridSize );
                continue;
            }

            // Block exist
            let ajacent = matrix[ row ][ col ].ajacent;
            if ( ajacent === 0 ) {
                DrawPrimitivePattern( svg, primitives[ 1 ], col, row, graph.gridSize );
            } else if ( ajacent === 1 ) {
                if ( matrix[ row ][ col ].direction[ 0 ] === 'Up' ) {
                    DrawPrimitivePattern( svg, primitives[ 2 ], col, row, graph.gridSize );
                } else if ( matrix[ row ][ col ].direction[ 0 ] === 'Down' ) {
                    for ( i = 0; i < Object.keys( primitives[ 2 ].edges ).length; i++ ) {
                        createCreasePatternPart( svg, graph.gridSize, grid, col, row, primitives[ 2 ].edges[ i ][ 0 ], 6 - primitives[ 2 ].edges[ i ][ 1 ], primitives[ 2 ].edges[ i ][ 2 ], 6 - primitives[ 2 ].edges[ i ][ 3 ], primitives[ 2 ].edges_assignment[ i ] );
                    }
                } else if ( matrix[ row ][ col ].direction[ 0 ] === 'Left' ) {
                    for ( i = 0; i < Object.keys( primitives[ 2 ].edges ).length; i++ ) {
                        createCreasePatternPart( svg, graph.gridSize, grid, col, row, primitives[ 2 ].edges[ i ][ 1 ], primitives[ 2 ].edges[ i ][ 0 ], primitives[ 2 ].edges[ i ][ 3 ], primitives[ 2 ].edges[ i ][ 2 ], primitives[ 2 ].edges_assignment[ i ] );
                    }
                } else if ( matrix[ row ][ col ].direction[ 0 ] === 'Right' ) {
                    for ( i = 0; i < Object.keys( primitives[ 2 ].edges ).length; i++ ) {
                        createCreasePatternPart( svg, graph.gridSize, grid, col, row, 6 - primitives[ 2 ].edges[ i ][ 1 ], primitives[ 2 ].edges[ i ][ 0 ], 6 - primitives[ 2 ].edges[ i ][ 3 ], primitives[ 2 ].edges[ i ][ 2 ], primitives[ 2 ].edges_assignment[ i ] );
                    }
                }
            } else if ( ajacent === 2 ) {
                if ( matrix[ row ][ col ].direction[ 0 ] === 'Up' && matrix[ row ][ col ].direction[ 1 ] === 'Down' ) {
                    DrawPrimitivePattern( svg, primitives[ 4 ], col, row, graph.gridSize );
                } else if ( matrix[ row ][ col ].direction[ 0 ] === 'Left' && matrix[ row ][ col ].direction[ 1 ] === 'Right' ) {
                    for ( i = 0; i < Object.keys( primitives[ 4 ].edges ).length; i++ ) {
                        createCreasePatternPart( svg, graph.gridSize, grid, col, row, primitives[ 4 ].edges[ i ][ 1 ], primitives[ 4 ].edges[ i ][ 0 ], primitives[ 4 ].edges[ i ][ 3 ], primitives[ 4 ].edges[ i ][ 2 ], primitives[ 4 ].edges_assignment[ i ] );
                    }
                } else if ( matrix[ row ][ col ].direction[ 0 ] === 'Up' && matrix[ row ][ col ].direction[ 1 ] === 'Left' ) {
                    if ( matrix[ row - 1 ][ col - 1 ].fill ) {
                        DrawPrimitivePattern( svg, primitives[ 7 ], col, row, graph.gridSize );
                        continue;
                    }
                    DrawPrimitivePattern( svg, primitives[ 3 ], col, row, graph.gridSize );
                } else if ( matrix[ row ][ col ].direction[ 0 ] === 'Up' && matrix[ row ][ col ].direction[ 1 ] === 'Right' ) {
                    if ( matrix[ row - 1 ][ col + 1 ].fill ) {
                        for ( i = 0; i < Object.keys( primitives[ 7 ].edges ).length; i++ ) {
                            createCreasePatternPart( svg, graph.gridSize, grid, col, row, 6 - primitives[ 7 ].edges[ i ][ 0 ], primitives[ 7 ].edges[ i ][ 1 ], 6 - primitives[ 7 ].edges[ i ][ 2 ], primitives[ 7 ].edges[ i ][ 3 ], primitives[ 7 ].edges_assignment[ i ] );
                        }
                        continue;
                    }
                    for ( i = 0; i < Object.keys( primitives[ 3 ].edges ).length; i++ ) {
                        createCreasePatternPart( svg, graph.gridSize, grid, col, row, 6 - primitives[ 3 ].edges[ i ][ 0 ], primitives[ 3 ].edges[ i ][ 1 ], 6 - primitives[ 3 ].edges[ i ][ 2 ], primitives[ 3 ].edges[ i ][ 3 ], primitives[ 3 ].edges_assignment[ i ] );
                    }
                } else if ( matrix[ row ][ col ].direction[ 0 ] === 'Down' && matrix[ row ][ col ].direction[ 1 ] === 'Left' ) {
                    if ( matrix[ row + 1 ][ col - 1 ].fill ) {
                        for ( i = 0; i < Object.keys( primitives[ 7 ].edges ).length; i++ ) {
                            createCreasePatternPart( svg, graph.gridSize, grid, col, row, primitives[ 7 ].edges[ i ][ 0 ], 6 - primitives[ 7 ].edges[ i ][ 1 ], primitives[ 7 ].edges[ i ][ 2 ], 6 - primitives[ 7 ].edges[ i ][ 3 ], primitives[ 7 ].edges_assignment[ i ] );
                        }
                        continue;
                    }
                    for ( i = 0; i < Object.keys( primitives[ 3 ].edges ).length; i++ ) {
                        createCreasePatternPart( svg, graph.gridSize, grid, col, row, primitives[ 3 ].edges[ i ][ 0 ], 6 - primitives[ 3 ].edges[ i ][ 1 ], primitives[ 3 ].edges[ i ][ 2 ], 6 - primitives[ 3 ].edges[ i ][ 3 ], primitives[ 3 ].edges_assignment[ i ] );
                    }
                } else if ( matrix[ row ][ col ].direction[ 0 ] === 'Down' && matrix[ row ][ col ].direction[ 1 ] === 'Right' ) {
                    if ( matrix[ row + 1 ][ col + 1 ].fill ) {
                        for ( i = 0; i < Object.keys( primitives[ 7 ].edges ).length; i++ ) {
                            createCreasePatternPart( svg, graph.gridSize, grid, col, row, 6 - primitives[ 7 ].edges[ i ][ 0 ], 6 - primitives[ 7 ].edges[ i ][ 1 ], 6 - primitives[ 7 ].edges[ i ][ 2 ], 6 - primitives[ 7 ].edges[ i ][ 3 ], primitives[ 7 ].edges_assignment[ i ] );
                        }
                        continue;
                    }
                    for ( i = 0; i < Object.keys( primitives[ 3 ].edges ).length; i++ ) {
                        createCreasePatternPart( svg, graph.gridSize, grid, col, row, 6 - primitives[ 3 ].edges[ i ][ 0 ], 6 - primitives[ 3 ].edges[ i ][ 1 ], 6 - primitives[ 3 ].edges[ i ][ 2 ], 6 - primitives[ 3 ].edges[ i ][ 3 ], primitives[ 3 ].edges_assignment[ i ] );
                    }
                }
            } else if ( ajacent === 3 ) {
                if ( StringClass.equal( matrix[ row ][ col ].direction, [ 'Up', 'Left', 'Right' ] ) ) {
                    if ( matrix[ row - 1 ][ col - 1 ].fill && matrix[ row - 1 ][ col + 1 ].fill ) {
                        DrawPrimitivePattern( svg, primitives[ 8 ], col, row, graph.gridSize );
                        continue;
                    }
                    DrawPrimitivePattern( svg, primitives[ 5 ], col, row, graph.gridSize );
                } else if ( StringClass.equal( matrix[ row ][ col ].direction, [ 'Up', 'Down', 'Right' ] ) ) {
                    if ( matrix[ row - 1 ][ col + 1 ].fill && matrix[ row + 1 ][ col + 1 ].fill ) {
                        for ( i = 0; i < Object.keys( primitives[ 8 ].edges ).length; i++ ) {
                            createCreasePatternPart( svg, graph.gridSize, grid, col, row, 6 - primitives[ 8 ].edges[ i ][ 1 ], primitives[ 8 ].edges[ i ][ 0 ], 6 - primitives[ 8 ].edges[ i ][ 3 ], primitives[ 8 ].edges[ i ][ 2 ], primitives[ 8 ].edges_assignment[ i ] );
                        }
                        continue;
                    }
                    for ( i = 0; i < Object.keys( primitives[ 5 ].edges ).length; i++ ) {
                        createCreasePatternPart( svg, graph.gridSize, grid, col, row, 6 - primitives[ 5 ].edges[ i ][ 1 ], primitives[ 5 ].edges[ i ][ 0 ], 6 - primitives[ 5 ].edges[ i ][ 3 ], primitives[ 5 ].edges[ i ][ 2 ], primitives[ 5 ].edges_assignment[ i ] );
                    }
                } else if ( StringClass.equal( matrix[ row ][ col ].direction, [ "Down", "Left", "Right" ] ) ) {
                    if ( matrix[ row + 1 ][ col - 1 ].fill && matrix[ row + 1 ][ col + 1 ].fill ) {
                        for ( i = 0; i < Object.keys( primitives[ 8 ].edges ).length; i++ ) {
                            createCreasePatternPart( svg, graph.gridSize, grid, col, row, primitives[ 8 ].edges[ i ][ 0 ], 6 - primitives[ 8 ].edges[ i ][ 1 ], primitives[ 8 ].edges[ i ][ 2 ], 6 - primitives[ 8 ].edges[ i ][ 3 ], primitives[ 8 ].edges_assignment[ i ] );
                        }
                        continue;
                    }
                    for ( i = 0; i < Object.keys( primitives[ 5 ].edges ).length; i++ ) {
                        createCreasePatternPart( svg, graph.gridSize, grid, col, row, primitives[ 5 ].edges[ i ][ 0 ], 6 - primitives[ 5 ].edges[ i ][ 1 ], primitives[ 5 ].edges[ i ][ 2 ], 6 - primitives[ 5 ].edges[ i ][ 3 ], primitives[ 5 ].edges_assignment[ i ] );
                    }
                } else if ( ( matrix[ row ][ col ], [ 'Up', 'Down', 'Left' ] ) ) {
                    if ( matrix[ row - 1 ][ col - 1 ].fill && matrix[ row + 1 ][ col - 1 ].fill ) {
                        for ( i = 0; i < Object.keys( primitives[ 8 ].edges ).length; i++ ) {
                            createCreasePatternPart( svg, graph.gridSize, grid, col, row, primitives[ 8 ].edges[ i ][ 1 ], primitives[ 8 ].edges[ i ][ 0 ], primitives[ 8 ].edges[ i ][ 3 ], primitives[ 8 ].edges[ i ][ 2 ], primitives[ 8 ].edges_assignment[ i ] );
                        }
                        continue;
                    }
                    for ( i = 0; i < Object.keys( primitives[ 5 ].edges ).length; i++ ) {
                        createCreasePatternPart( svg, graph.gridSize, grid, col, row, primitives[ 5 ].edges[ i ][ 1 ], primitives[ 5 ].edges[ i ][ 0 ], primitives[ 5 ].edges[ i ][ 3 ], primitives[ 5 ].edges[ i ][ 2 ], primitives[ 5 ].edges_assignment[ i ] );
                    }
                }
            } else if ( ajacent === 4 ) {
                if ( matrix[ row - 1 ][ col - 1 ].fill && matrix[ row - 1 ][ col + 1 ].fill && matrix[ row + 1 ][ col - 1 ].fill && matrix[ row + 1 ][ col + 1 ].fill ) {
                    DrawPrimitivePattern( svg, primitives[ 0 ], col, row, graph.gridSize );
                } else {
                    DrawPrimitivePattern( svg, primitives[ 6 ], col, row, graph.gridSize );
                }
            }
        }
    }
    // boundary
    SVGDrawer.CreateRectangle( svg, 0, 0, matrix[ 0 ].length * graph.gridSize, matrix.length * graph.gridSize, "none", 1 );
}

function createCreasePatternPart( svg, scale, grid, posX, posY, posX1, posY1, posX2, posY2, color ) {
    let svgNS = "http://www.w3.org/2000/svg";
    let newLine = document.createElementNS( svgNS, "line" );
    newLine.setAttribute( 'x1', ( posX + grid * posX1 ) * scale );
    newLine.setAttribute( 'y1', ( posY + grid * posY1 ) * scale );
    newLine.setAttribute( 'x2', ( posX + grid * posX2 ) * scale );
    newLine.setAttribute( 'y2', ( posY + grid * posY2 ) * scale );
    newLine.setAttribute( 'stroke', color );
    newLine.setAttribute( 'stroke-width', 1 );
    svg.append( newLine );
}

function DrawPrimitivePattern( svg, primitive, shiftX = 0, shiftY = 0, scale = 1 ) {
    for ( i in primitive.edges ) {
        let X1 = ( primitive.edges[ i ][ 0 ] / 6 + shiftX ) * scale;
        let Y1 = ( primitive.edges[ i ][ 1 ] / 6 + shiftY ) * scale;
        let X2 = ( primitive.edges[ i ][ 2 ] / 6 + shiftX ) * scale;
        let Y2 = ( primitive.edges[ i ][ 3 ] / 6 + shiftY ) * scale;
        let color = primitive.edges_assignment[ i ];
        SVGDrawer.CreateLine( svg, X1, Y1, X2, Y2, color );
    }
}

function DrawAllPrimitivePattern() {
    let svg = document.getElementById( "PrimitivePatternSVG" );
    let shiftX = 0, shiftY = 0;
    let scale = 60;
    for ( i in primitives ) {
        DrawPrimitivePattern( svg, primitives[ i ], shiftX, shiftY, scale );
        SVGDrawer.CreateRectangle( svg, shiftX * scale, shiftY, scale, scale );
        shiftX += 1.5;
    }
}