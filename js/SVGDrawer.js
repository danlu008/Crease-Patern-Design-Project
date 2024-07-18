class SVGDrawer {
    static svgNS = "http://www.w3.org/2000/svg";
    static strokeWidth = 1;
    static padding = 5;

    static CreateSVG( id, appendId, width, height ) {
        let div = document.getElementById( appendId );
        let svg = document.createElementNS( this.svgNS, "svg" );
        let viewBox = [ -this.padding, -this.padding, width + this.padding * 2, height + this.padding * 2 ];
        svg.setAttribute( 'id', id );
        svg.setAttribute( 'xmlns', "http://www.w3.org/2000/svg" );
        svg.setAttribute( 'width', width );
        svg.setAttribute( 'height', height );
        svg.setAttribute( 'viewBox', viewBox.toString() );
        div.append( svg );
        return svg;
    }

    static CreateRectangle( svg, posX, posY, width, height, color = "none", altitude = 0 ) {
        let rect = document.createElementNS( this.svgNS, "rect" );
        rect.setAttribute( 'x', posX );
        rect.setAttribute( 'y', posY );
        rect.setAttribute( 'width', width );
        rect.setAttribute( 'height', height );
        rect.setAttribute( 'stroke', 'black' );
        rect.setAttribute( 'stroke-width', this.strokeWidth );
        rect.setAttribute( 'fill', color );
        rect.setAttribute( 'altitude', altitude );
        svg.append( rect );
        return rect;
    }

    static CreateLine( svg, X1, Y1, X2, Y2, color ) {
        let svgNS = "http://www.w3.org/2000/svg";
        let newLine = document.createElementNS( svgNS, "line" );
        newLine.setAttribute( 'x1', X1 );
        newLine.setAttribute( 'y1', Y1 );
        newLine.setAttribute( 'x2', X2 );
        newLine.setAttribute( 'y2', Y2 );
        newLine.setAttribute( 'stroke', color );
        newLine.setAttribute( 'stroke-width', this.strokeWidth );
        svg.append( newLine );
    }

    static Reset( svg, width, height ) {
        let viewBox = [ -this.padding, -this.padding, width + this.padding * 2, height + this.padding * 2 ];
        svg.innerHTML = '';
        svg.setAttribute( 'width', width );
        svg.setAttribute( 'height', height );
        svg.setAttribute( 'viewBox', viewBox.toString() );
    }

    static DownloadSVG( id ) {
        let svg = document.getElementById( id );
        let serializer = new XMLSerializer();
        let source = serializer.serializeToString( svg );
        let blob = new Blob( [ source ] );
        let element = document.createElement( "a" );
        element.download = "download.svg";
        element.href = window.URL.createObjectURL( blob );
        element.click();
        element.remove();
    }
}