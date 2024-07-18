class StringClass {
    static equal( arr1, arr2 ) {
        if ( arr1.length !== arr2.length ) {
            return false;
        }

        for ( i = 0; i < arr1.length; i++ ) {
            if ( arr1[ i ] !== arr2[ i ] ) {
                return false;
            }
        }

        return true;
    }
}

function createRandomString() {
    let string = "";
    let min = 3;
    let max = 8;
    let width = Math.round( Math.random() * ( max - min ) + 1 );
    let height = Math.round( Math.random() * ( max - min ) + 1 );
    for ( row = 0; row < height; row++ ) {
        if ( row > 0 ) {
            string += "|";
        }
        for ( col = 0; col < width; col++ ) {
            string += Math.round( Math.random() ).toString();
        }
    }
    return string;
}