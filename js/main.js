// Create Block Pattern, Crease Pattern and Primitive Pattern
SVGDrawer.CreateSVG( "BlockPatternSVG", "BlockPattern_SVG", 600, 600 );
SVGDrawer.CreateSVG( "CreasePatternSVG", "CreasePattern_SVG", 600, 600 );
SVGDrawer.CreateSVG( "PrimitivePatternSVG", "PrimitivePattern_SVG", 780, 60 );
SVGDrawer.CreateSVG( "SegmentPatternSVG", "SegmentPattern_SVG", 420, 60 );

// Create graph
let graph = new Graph( "010|111|010" );

// Draw Block Pattern & Crease Pattern
DrawPattern( graph );

// Draw Primitive Pattern
DrawAllPrimitivePattern();

// Draw Primitive Pattern
DrawAllSegmentPattern();