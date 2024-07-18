/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                    5 Types of Segment Structure                                    ║
║----------------------------------------------------------------------------------------------------║
║       1. The hollow square □ represents the direction of the horizontal plane.                     ║
║       2. The solid square ■ represents the direction of the vertical plane.                        ║
║       3. Connect the edges of the same type and align the dots to assemble the segments.           ║
║       4. Every four segments can be combined to form one primitive.                                ║
║----------------------------------------------------------------------------------------------------║
║                                                                                                    ║
║                                                                                                    ║
║       ┌---□---┐           ┌---■---┐          ┌---□---┐          ┌---□---┐          ┌---■---┐       ║
║       |       |           |       |          |       |          |       |          |       |       ║
║       □   E   □           □   V   □          ■   H   ■          □   I   ■          ■   O   □       ║
║       |       |           |       |          |       |          |       |          |       |       ║
║       └---□---●           └---■---●          └---□---●          └---■---●          └---□---●       ║
║                                                                                                    ║
║      Empty  Wall        Vertical Wall     Horizontal Wall      Inner  Wall        Outer  Wall      ║
║                                                                                                    ║
║                                                                                                    ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

function DrawSegmentPattern( svg, segment, shiftX = 0, shiftY = 0, scale = 1 ) {
    for ( i in segment.edges ) {
        let V1 = segment.edges[ i ][ 0 ];
        let V2 = segment.edges[ i ][ 1 ];
        let color = "";
        let X1 = ( segment.vertices[ V1 ][ 0 ] / 3 + shiftX ) * scale;
        let Y1 = ( segment.vertices[ V1 ][ 1 ] / 3 + shiftY ) * scale;
        let X2 = ( segment.vertices[ V2 ][ 0 ] / 3 + shiftX ) * scale;
        let Y2 = ( segment.vertices[ V2 ][ 1 ] / 3 + shiftY ) * scale;

        if ( segment.edges_assignment[ i ] === 'M' ) {
            color = "red";
        } else if ( segment.edges_assignment[ i ] === 'V' ) {
            color = "blue";
        } else if ( segment.edges_assignment[ i ] === 'U' ) {
            color = "#ff00ff";
        }

        SVGDrawer.CreateLine( svg, X1, Y1, X2, Y2, color );
    }
}

function DrawAllSegmentPattern() {
    let svg = document.getElementById( "SegmentPatternSVG" );
    let shiftX = 0, shiftY = 0;
    let scale = 60;
    for ( i in Segment.Types ) {
        DrawSegmentPattern( svg, Segment.Types[ i ], shiftX, shiftY, scale );
        SVGDrawer.CreateRectangle( svg, shiftX * scale, shiftY, scale, scale );
        shiftX += 1.5;
    }
}

class Segment {
    static vertices = {
        0: [ 0, 0 ],
        1: [ 1, 0 ],
        2: [ 2, 0 ],
        3: [ 3, 0 ],
        4: [ 0, 1 ],
        5: [ 1, 1 ],
        6: [ 2, 1 ],
        7: [ 3, 1 ],
        8: [ 0, 2 ],
        9: [ 1, 2 ],
        10: [ 2, 2 ],
        11: [ 3, 2 ],
        12: [ 0, 3 ],
        13: [ 1, 3 ],
        14: [ 2, 3 ],
        15: [ 3, 3 ],
    }
    static edges = {

        0: {
            0: [ 1, 5, 'V' ],
            1: [ 2, 6, 'M' ],
            2: [ 4, 5, 'V' ],
            3: [ 5, 6, 'M' ],
            4: [ 6, 7, 'V' ],
            5: [ 5, 9, 'V' ],
            6: [ 6, 10, 'M' ],
            7: [ 8, 9, 'M' ],
            8: [ 9, 10, 'V' ],
            9: [ 10, 11, 'M' ],
            10: [ 9, 13, 'V' ],
            11: [ 10, 14, 'M' ],
        },

        1: {
            0: [ 0, 4, 'U' ],
            1: [ 4, 8, 'U' ],
            2: [ 8, 12, 'U' ],
            3: [ 2, 6, 'U' ],
            4: [ 6, 10, 'U' ],
            5: [ 10, 14, 'U' ],
            6: [ 4, 6, 'V' ],
            7: [ 6, 7, 'V' ],
            8: [ 8, 10, 'M' ],
            9: [ 10, 11, 'M' ],
        },

        2: {
            0: [ 0, 1, 'U' ],
            1: [ 1, 2, 'U' ],
            2: [ 2, 3, 'U' ],
            3: [ 8, 9, 'U' ],
            4: [ 9, 10, 'U' ],
            5: [ 10, 11, 'U' ],
            6: [ 1, 9, 'V' ],
            7: [ 9, 13, 'V' ],
            8: [ 2, 10, 'M' ],
            9: [ 10, 14, 'M' ],
        },

        3: {
            0: [ 1, 2, 'U' ],
            1: [ 2, 3, 'U' ],
            2: [ 4, 8, 'U' ],
            3: [ 8, 12, 'U' ],
            4: [ 1, 4, 'U' ],
            5: [ 1, 10, 'U' ],
            6: [ 4, 10, 'U' ],
            7: [ 2, 10, 'M' ],
            8: [ 10, 14, 'U' ],
            9: [ 8, 10, 'M' ],
            10: [ 10, 11, 'U' ],
        },

        4: {
            0: [ 0, 2, 'U' ],
            1: [ 0, 6, 'U' ],
            2: [ 2, 6, 'U' ],
            3: [ 2, 7, 'M' ],
            4: [ 6, 7, 'V' ],
            5: [ 0, 8, 'U' ],
            6: [ 0, 9, 'U' ],
            7: [ 6, 9, 'U' ],
            8: [ 6, 10, 'M' ],
            9: [ 7, 10, 'V' ],
            10: [ 8, 9, 'U' ],
            11: [ 9, 10, 'M' ],
            12: [ 10, 11, 'M' ],
            13: [ 8, 13, 'M' ],
            14: [ 9, 13, 'V' ],
            15: [ 10, 13, 'V' ],
            16: [ 10, 14, 'M' ],
        }
    };
    static Types = {
        // Empty Wall
        "E": {
            vertices: this.vertices,
            edges: {
                0: [ 1, 5 ],
                1: [ 2, 6 ],
                2: [ 4, 5 ],
                3: [ 5, 6 ],
                4: [ 6, 7 ],
                5: [ 5, 9 ],
                6: [ 6, 10 ],
                7: [ 8, 9 ],
                8: [ 9, 10 ],
                9: [ 10, 11 ],
                10: [ 9, 13 ],
                11: [ 10, 14 ],
            },
            edges_assignment: {
                0: 'V',
                1: 'M',
                2: 'V',
                3: 'M',
                4: 'V',
                5: 'V',
                6: 'M',
                7: 'M',
                8: 'V',
                9: 'M',
                10: 'V',
                11: 'M',
            },
        },
        // Vertical Wall
        "V": {
            vertices: this.vertices,
            edges: {
                0: [ 0, 4 ],
                1: [ 4, 8 ],
                2: [ 8, 12 ],
                3: [ 2, 6 ],
                4: [ 6, 10 ],
                5: [ 10, 14 ],
                6: [ 4, 6 ],
                7: [ 6, 7 ],
                8: [ 8, 10 ],
                9: [ 10, 11 ],
            },
            edges_assignment: {
                0: 'U',
                1: 'U',
                2: 'U',
                3: 'U',
                4: 'U',
                5: 'U',
                6: 'V',
                7: 'V',
                8: 'M',
                9: 'M',
            },
        },
        // Horizontal Wall
        "H": {
            vertices: this.vertices,
            edges: {
                0: [ 0, 1 ],
                1: [ 1, 2 ],
                2: [ 2, 3 ],
                3: [ 8, 9 ],
                4: [ 9, 10 ],
                5: [ 10, 11 ],
                6: [ 1, 9 ],
                7: [ 9, 13 ],
                8: [ 2, 10 ],
                9: [ 10, 14 ],
            },
            edges_assignment: {
                0: 'U',
                1: 'U',
                2: 'U',
                3: 'U',
                4: 'U',
                5: 'U',
                6: 'V',
                7: 'V',
                8: 'M',
                9: 'M',
            },
        },
        // Inner Wall
        "I": {
            vertices: this.vertices,
            edges: {
                0: [ 1, 2 ],
                1: [ 2, 3 ],
                2: [ 4, 8 ],
                3: [ 8, 12 ],
                4: [ 1, 4 ],
                5: [ 1, 10 ],
                6: [ 4, 10 ],
                7: [ 2, 10 ],
                8: [ 10, 14 ],
                9: [ 8, 10 ],
                10: [ 10, 11 ],
            },
            edges_assignment: {
                0: 'U',
                1: 'U',
                2: 'U',
                3: 'U',
                4: 'U',
                5: 'U',
                6: 'U',
                7: 'M',
                8: 'U',
                9: 'M',
                10: 'U',
            },
        },
        // Outer Wall
        "O": {
            vertices: this.vertices,
            edges: {
                0: [ 0, 2 ],
                1: [ 0, 6 ],
                2: [ 2, 6 ],
                3: [ 2, 7 ],
                4: [ 6, 7 ],
                5: [ 0, 8 ],
                6: [ 0, 9 ],
                7: [ 6, 9 ],
                8: [ 6, 10 ],
                9: [ 7, 10 ],
                10: [ 8, 9 ],
                11: [ 9, 10 ],
                12: [ 10, 11 ],
                13: [ 8, 13 ],
                14: [ 9, 13 ],
                15: [ 10, 13 ],
                16: [ 10, 14 ],
            },
            edges_assignment: {
                0: 'U',
                1: 'U',
                2: 'U',
                3: 'M',
                4: 'V',
                5: 'U',
                6: 'U',
                7: 'U',
                8: 'M',
                9: 'V',
                10: 'U',
                11: 'M',
                12: 'M',
                13: 'M',
                14: 'V',
                15: 'V',
                16: 'M',
            },
        },
    };
}

segment = new Object();
for ( i = 0; i < 4; i++ ) {
    segment[ i ] = new Object();
    segment[ i ].id = i;
}

segment[ 0 ].vertices_coords = {
    0: [ 1, 0 ],
    1: [ 2, 0 ],
    2: [ 3, 0 ],
    3: [ 0, 1 ],
    4: [ 0, 2 ],
    5: [ 2, 2 ],
    6: [ 3, 2 ],
    7: [ 0, 3 ],
    8: [ 2, 3 ],
};
segment[ 0 ].edges = {
    0: [ 0, 1, 'U' ],
    1: [ 1, 2, 'U' ],
    2: [ 3, 4, 'U' ],
    3: [ 4, 7, 'U' ],
    4: [ 0, 3, 'U' ],
    5: [ 0, 5, 'U' ],
    6: [ 3, 5, 'U' ],
    7: [ 1, 5, 'M' ],
    8: [ 5, 8, 'U' ],
    9: [ 4, 5, 'M' ],
    10: [ 5, 6, 'U' ],
};

segment[ 1 ].vertices_coords = {
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
segment[ 1 ].edges = {
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

segment[ 2 ].vertices_coords = {
    0: [ 0, 0 ],
    1: [ 2, 0 ],
    2: [ 2, 1 ],
    3: [ 3, 1 ],
    4: [ 0, 2 ],
    5: [ 1, 2 ],
    6: [ 2, 2 ],
    7: [ 3, 2 ],
    8: [ 1, 3 ],
    9: [ 2, 3 ],
};
segment[ 2 ].edges = {
    0: [ 0, 1, 'U' ],
    1: [ 0, 2, 'U' ],
    2: [ 1, 2, 'U' ],
    3: [ 1, 3, 'M' ],
    4: [ 2, 3, 'V' ],
    5: [ 0, 4, 'U' ],
    6: [ 0, 5, 'U' ],
    7: [ 2, 5, 'U' ],
    8: [ 2, 6, 'M' ],
    9: [ 3, 6, 'V' ],
    10: [ 4, 5, 'U' ],
    11: [ 5, 6, 'M' ],
    12: [ 6, 7, 'M' ],
    13: [ 4, 8, 'M' ],
    14: [ 5, 8, 'V' ],
    15: [ 6, 8, 'V' ],
    16: [ 6, 9, 'M' ],
};

segment[ 3 ].vertices_coords = {
    0: [ 1, 0 ],
    1: [ 2, 0 ],
    2: [ 0, 1 ],
    3: [ 1, 1 ],
    4: [ 2, 1 ],
    5: [ 3, 1 ],
    6: [ 0, 2 ],
    7: [ 1, 2 ],
    8: [ 2, 2 ],
    9: [ 3, 2 ],
    10: [ 1, 3 ],
    11: [ 2, 3 ],
};
segment[ 3 ].edges = {
    0: [ 0, 3, 'V' ],
    1: [ 1, 4, 'M' ],
    2: [ 2, 3, 'V' ],
    3: [ 3, 4, 'M' ],
    4: [ 4, 5, 'V' ],
    5: [ 3, 7, 'V' ],
    6: [ 4, 8, 'M' ],
    7: [ 6, 7, 'M' ],
    8: [ 7, 8, 'V' ],
    9: [ 8, 9, 'M' ],
    10: [ 7, 10, 'V' ],
    11: [ 8, 11, 'M' ],
};