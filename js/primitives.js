/*
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                         13 Types of Primitive Structure ( Exclude Rotational Symmetry )                                               ║
║-------------------------------------------------------------------------------------------------------------------------------------------------------║
║                                 1. The hollow square □ represents the direction of the horizontal plane.                                              ║
║                                 2. The solid square ■ represents the direction of the vertical plane.                                                 ║
║                                 3. Connect the edges of the same type and align the dots to assemble the primitives.                                  ║
║                                 4. A primitive can independently form an origami model.                                                               ║
║                                 5. Two or more primitives can be combined to form an origami model.                                                   ║
║-------------------------------------------------------------------------------------------------------------------------------------------------------║
║                                                                                                                                                       ║
║     ┌---□---┬---□---┐              ┌---□---┬---□---┐              ┌---■---┬---■---┐              ┌---■---┬---■---┐              ┌---■---┬---■---┐     ║
║     |       |       |              |       |       |              |       |       |              |       |       |              |       |       |     ║
║     □   E   □   E   □              □   I   ■   I   □              □   V   □   H   □              □   V   □   H   □              □   V   □   O   ■     ║
║     |       |       |              |       |       |              |       |       |              |       |       |              |       |       |     ║
║     ├---□---●---□---┤              ├---■---●---■---┤              ├---■---●---■---┤              ├---■---●---■---┤              ├---■---●---□---┤     ║
║     |       |       |              |       |       |              |       |       |              |       |       |              |       |       |     ║
║     □   E   □   E   □              □   I   ■   I   □              □   I   ■   I   □              □   H   □   V   □              □   I   ■   H   ■     ║
║     |       |       |              |       |       |              |       |       |              |       |       |              |       |       |     ║
║     └---□---┴---□---┘              └---□---┴---□---┘              └---□---┴---□---┘              └---■---┴---■---┘              └---□---┴---□---┘     ║
║     0 side open (flat)             0 side open (dot)                 1 side open               2 side open (straight)          2 side open (angle)    ║
║       ( S0F, EEEE )                  ( S0D, IIII )                   ( S1, HVII )                  ( S2S, HVHV )                  ( S2A, OVIH )       ║
║                                                                                                                                                       ║
║     ┌---■---┬---□---┐              ┌---■---┬---■---┐              ┌---■---┬---□---┐              ┌---■---┬---□---┐              ┌---■---┬---■---┐     ║
║     |       |       |              |       |       |              |       |       |              |       |       |              |       |       |     ║
║     □   V   □   E   □              □   V   □   O   ■              □   V   □   E   □              □   V   □   E   □              ■   O   □   O   ■     ║
║     |       |       |              |       |       |              |       |       |              |       |       |              |       |       |     ║
║     ├---■---●---□---┤              ├---■---●---□---┤              ├---■---●---□---┤              ├---■---●---□---┤              ├---□---●---□---┤     ║
║     |       |       |              |       |       |              |       |       |              |       |       |              |       |       |     ║
║     □   I   ■   H   ■              □   H   □   O   ■              □   H   □   O   ■              □   H   □   E   □              ■   O   □   O   ■     ║
║     |       |       |              |       |       |              |       |       |              |       |       |              |       |       |     ║
║     └---□---┴---□---┘              └---■---┴---■---┘              └---■---┴---■---┘              └---■---┴---□---┘              └---■---┴---■---┘     ║
║   2 side 1 corner open                3 side open                3 side 1 corner open           3 side 2 corner open               4 side open        ║
║      ( S2C1, EVIH )                   ( S3, OVHO )                  ( S3C1, EVHO )                 ( S3C2, EVHE )                  ( S4, OOOO )       ║
║                                                                                                                                                       ║
║     ┌---■---┬---□---┐              ┌---■---┬---□---┐              ┌---■---┬---□---┐              ┌---■---┬---□---┐                                    ║
║     |       |       |              |       |       |              |       |       |              |       |       |                                    ║
║     ■   O   □   E   □              ■   O   □   E   □              ■   O   □   E   □              ■   O   □   E   □                                    ║
║     |       |       |              |       |       |              |       |       |              |       |       |                                    ║
║     ├---□---●---□---┤              ├---□---●---□---┤              ├---□---●---□---┤              ├---□---●---□---┤                                    ║
║     |       |       |              |       |       |              |       |       |              |       |       |                                    ║
║     ■   O   □   O   ■              ■   O   □   E   □              □   E   □   O   ■              □   E   □   E   □                                    ║
║     |       |       |              |       |       |              |       |       |              |       |       |                                    ║
║     └---■---┴---■---┘              └---■---┴---□---┘              └---□---┴---■---┘              └---□---┴---□---┘                                    ║
║    4 side 1 corner open       4 side 2 corner open (side)   4 side 2 corner open (diagonal)     4 side 3 corner open                                  ║
║      ( S4C1, EOOO )                  ( S4C2S, EOOE )               ( S4C2D, EOEO )                 ( S4C3, EOEE )                                     ║
║                                                                                                                                                       ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

function flip( segment, quadrant ) {
    let shiftX = 1.5;
    let shiftY = 1.5;
    let quadrantToXY = [];
    if ( quadrant === "1" ) {
        quadrantToXY = [ -1, 1 ];
    } else if ( quadrant === "2" ) {
        quadrantToXY = [ 1, 1 ];
    } else if ( quadrant === "3" ) {
        quadrantToXY = [ 1, -1 ];
    } else if ( quadrant === "4" ) {
        quadrantToXY = [ -1, -1 ];
    }
    let newSegment = JSON.parse( JSON.stringify( segment ) );
    for ( i in segment.vertices_coords ) {
        let x = segment.vertices_coords[ i ][ 0 ];
        let y = segment.vertices_coords[ i ][ 1 ];
        newSegment.vertices_coords[ i ][ 0 ] = quadrantToXY[ 0 ] * ( x - shiftX ) + shiftX;
        newSegment.vertices_coords[ i ][ 1 ] = quadrantToXY[ 1 ] * ( y - shiftY ) + shiftY;
    }
    return newSegment;
};

function transpose( segment ) {
    let Tsegment = new Object();
    Tsegment = new Object();
    Tsegment.vertices_coords = {
        0: [ 0, 0 ],
        1: [ 2, 0 ],
        2: [ 0, 1 ],
        3: [ 2, 1 ],
        4: [ 3, 1 ],
        5: [ 0, 2 ],
        6: [ 2, 2 ],
        7: [ 3, 2 ],
        8: [ 0, 3 ],
        9: [ 2, 3 ],
    };
    Tsegment.edges = {
        0: [ 0, 2, 'U' ],
        1: [ 1, 3, 'U' ],
        2: [ 2, 3, 'V' ],
        3: [ 3, 4, 'V' ],
        4: [ 2, 5, 'U' ],
        5: [ 3, 6, 'U' ],
        6: [ 5, 6, 'M' ],
        7: [ 6, 7, 'M' ],
        8: [ 5, 8, 'U' ],
        9: [ 6, 9, 'U' ],
    };

    for ( i in segment.vertices_coords ) {
        let temp = segment.vertices_coords[ i ][ 0 ];
        Tsegment.vertices_coords[ i ][ 0 ] = segment.vertices_coords[ i ][ 1 ];
        Tsegment.vertices_coords[ i ][ 1 ] = temp;
    }
    return Tsegment;
}

function setSegment( primitive ) {
    let j = 0;
    for ( position in primitive.segment ) {
        let segment = primitive.segment[ position ];
        let shiftX = 0;
        let shiftY = 0;
        if ( position == "1" ) {
            segment = flip( segment, position );
            shiftX = 3;
            shiftY = 0;
        } else if ( position == "2" ) {
            segment = flip( segment, position );
            shiftX = 0;
            shiftY = 0;
        } else if ( position == "3" ) {
            segment = flip( segment, position );
            shiftX = 0;
            shiftY = 3;
        } else if ( position == "4" ) {
            segment = flip( segment, position );
            shiftX = 3;
            shiftY = 3;
        }
        for ( i in Object.keys( segment.edges ) ) {
            primitive.edges[ j ] = [
                segment.vertices_coords[ segment.edges[ i ][ 0 ] ][ 0 ] + shiftX,
                segment.vertices_coords[ segment.edges[ i ][ 0 ] ][ 1 ] + shiftY,
                segment.vertices_coords[ segment.edges[ i ][ 1 ] ][ 0 ] + shiftX,
                segment.vertices_coords[ segment.edges[ i ][ 1 ] ][ 1 ] + shiftY
            ];
            if ( segment.edges[ i ][ 2 ] === 'M' ) {
                primitive.edges_assignment[ j ] = "red";
            } else if ( segment.edges[ i ][ 2 ] === 'V' ) {
                primitive.edges_assignment[ j ] = "blue";
            } else if ( segment.edges[ i ][ 2 ] === 'U' ) {
                primitive.edges_assignment[ j ] = "#ff00ff";
            }
            j++;
        }
    }
}
/*
class Primitive {
    static flat = PrimitiveConstructor( 0, 0, [ 0, 0, 0, 0 ] ),
    static 0_open = PrimitiveConstructor( 0, 1, [ 3, 3, 3, 3 ] ),
    static 1_open = PrimitiveConstructor( 1, 1, [ 1, 1, 3, 3 ] ),
    static 2_side_open = PrimitiveConstructor( 2, 1, [ 1, 4, 2, 3 ] ),
    static 2_opposite_open = PrimitiveConstructor( 2, 1, [ 1, 1, 1, 1 ] ),
    static 3_open = PrimitiveConstructor( 3, 1, [ 4, 4, 2, 2 ] ),
    static 4_open = PrimitiveConstructor( 4, 1, [ 4, 4, 4, 4 ] ),
    static 2_side_open_1_corner = PrimitiveConstructor( 2, 1, [ 1, 0, 2, 4 ] ),
    static 3_open_1_side = PrimitiveConstructor( 3, 1, [ 0, 0, 2, 2 ] ),

    PrimitiveConstructor( ajacent = 0, fill = 0, segment = [], edges = new Object(), edges_assignment = new Object() ) {
        let obj = new Object();
        obj.ajacent = ajacent;
        obj.fill = fill;
        obj.segment = segment;
        obj.edges = edges;
        obj.edges_assignment = edges_assignment;
        return obj;
    }
}
*/
primitives = new Object();
for ( i = 0; i < 9; i++ ) {
    primitives[ i ] = new Object();
    primitives[ i ].ajacent = 0;
    primitives[ i ].fill = 0;
    primitives[ i ].direction = 0;    // Up, Down, Left, Right
    primitives[ i ].segment = new Object();
    primitives[ i ].edges = new Object();
    primitives[ i ].edges_assignment = new Object();
}

primitives[ 0 ].name = "flat";
primitives[ 0 ].ajacent = 0;
primitives[ 0 ].fill = 0;
primitives[ 0 ].segment = {
    1: segment[ 3 ],
    2: segment[ 3 ],
    3: segment[ 3 ],
    4: segment[ 3 ],
};
setSegment( primitives[ 0 ] );


primitives[ 1 ].name = "0_open";
primitives[ 1 ].ajacent = 0;
primitives[ 1 ].fill = 1;
primitives[ 1 ].segment = {
    1: segment[ 0 ],
    2: segment[ 0 ],
    3: segment[ 0 ],
    4: segment[ 0 ],
};
setSegment( primitives[ 1 ] );

primitives[ 2 ].name = "1_open";
primitives[ 2 ].ajacent = 1;
primitives[ 2 ].fill = 1;
primitives[ 2 ].segment = {
    1: segment[ 1 ],
    2: segment[ 1 ],
    3: segment[ 0 ],
    4: segment[ 0 ],
};
setSegment( primitives[ 2 ] );

primitives[ 3 ].name = "2_side_open";
primitives[ 3 ].ajacent = 2;
primitives[ 3 ].fill = 1;
primitives[ 3 ].segment = {
    1: segment[ 1 ],
    2: segment[ 2 ],
    3: transpose( segment[ 1 ] ),
    4: segment[ 0 ],
};
setSegment( primitives[ 3 ] );

primitives[ 4 ].name = "2_opposite_open";
primitives[ 4 ].ajacent = 2;
primitives[ 4 ].fill = 1;
primitives[ 4 ].segment = {
    1: segment[ 1 ],
    2: segment[ 1 ],
    3: segment[ 1 ],
    4: segment[ 1 ],
};
setSegment( primitives[ 4 ] );

primitives[ 5 ].name = "3_open";
primitives[ 5 ].ajacent = 3;
primitives[ 5 ].fill = 1;
primitives[ 5 ].segment = {
    1: segment[ 2 ],
    2: segment[ 2 ],
    3: transpose( segment[ 1 ] ),
    4: transpose( segment[ 1 ] ),
};
setSegment( primitives[ 5 ] );

primitives[ 6 ].name = "4_open";
primitives[ 6 ].ajacent = 4;
primitives[ 6 ].fill = 1;
primitives[ 6 ].segment = {
    1: segment[ 2 ],
    2: segment[ 2 ],
    3: segment[ 2 ],
    4: segment[ 2 ],
};
setSegment( primitives[ 6 ] );

primitives[ 7 ].name = "2_side_open_1_corner";
primitives[ 7 ].ajacent = 2;
primitives[ 7 ].fill = 1;
primitives[ 7 ].segment = {
    1: segment[ 1 ],
    2: segment[ 3 ],
    3: transpose( segment[ 1 ] ),
    4: segment[ 0 ],
};
setSegment( primitives[ 7 ] );

primitives[ 8 ].name = "3_open_1_side";
primitives[ 8 ].ajacent = 3;
primitives[ 8 ].fill = 1;
primitives[ 8 ].segment = {
    1: segment[ 3 ],
    2: segment[ 3 ],
    3: transpose( segment[ 1 ] ),
    4: transpose( segment[ 1 ] ),
};
setSegment( primitives[ 8 ] );

// primitives[9].name = '4_open_inner';
// primitives[9].ajacent = 4;
// primitives[9].fill = true;
// primitives[9].segment = {
//     1: segment[3],
//     2: segment[3],
//     3: segment[3],
//     4: segment[3],
// };
// setSegment(primitives[9]);