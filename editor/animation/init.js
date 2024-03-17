requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function number_of_sides_visualization(tgt_node, data) {
            if (!data || !data.ext) {
                return
            }

            /**
             * attr
             */
            const attr = {
                grid: {
                    'stroke-width': '0.1px',
                    'stroke': '#82D1F5',
                    'stroke': '#65A1CF',
                },
                polygon: {
                    'stroke-width': '1px',
                    'stroke': '#333333',
                    'fill': '#82D1F5',
                    'opacity': '0.5',
                },
                origin: {
                    'font-size': '10px', 
                    'font-family': 'times',
                    'font-weight': 'bold',
                },
                axis: {
                    'stroke-width': '0.5px',
                    'arrow-end': 'block-wide-long',
                },
            }

            /**
             * values
             */
            const input = data.in[0]
            const xs = input.map(inp=>[inp.values[0].values[0], inp.values[1].values[0], inp.values[2].values[0],]).reduce((a, b)=>a.concat(b))
            const ys = input.map(inp=>[inp.values[0].values[1], inp.values[1].values[1], inp.values[2].values[1],]).reduce((a, b)=>a.concat(b))
            const grid_seize_px_h = 200
            const grid_seize_px_w = 200
            const os = 20
            const width = xs.reduce((a, b)=>Math.max(a, b)) + 1
            const height = ys.reduce((a, b)=>Math.max(a, b)) + 1
            const side = Math.max(width, height)
            const y_mod = height - side
            const unit = 200 / side

            // paper
            const paper = Raphael(tgt_node, grid_seize_px_w + os * 2, grid_seize_px_h + os * 2)

            // draw grid
            for (let i = 0; i < side; i += 1) {
                for (let j = 0; j < side; j += 1) {
                    paper.rect(j * unit + os, i * unit + os, unit, unit).attr(attr.grid)
                }
            }

            // draw triangles
            input.forEach(inp => {
                const [[x1, y1], [x2, y2], [x3, y3]] = [
                    inp.values[0].values,
                    inp.values[1].values,
                    inp.values[2].values,
                ]
                const path = [
                    'M', x1 * unit + os, (height - y1 - y_mod) * unit + os,
                    'L', x2 * unit + os, (height - y2 - y_mod) * unit + os,
                    'L', x3 * unit + os, (height - y3 - y_mod) * unit + os,
                    'z'
                ]
                paper.path(path).attr(attr.polygon)
            })

            // draw origin
            paper.text(os, grid_seize_px_w + os * 1.5, 0).attr(attr.origin)
            // draw axis
            paper.path(['M', os, grid_seize_px_h + os, 'v', -grid_seize_px_h]).attr(attr.axis)
            paper.path(['M', os, grid_seize_px_h + os, 'h', grid_seize_px_w]).attr(attr.axis)

        }
        var io = new extIO({
            animation: function ($expl, data) {
                number_of_sides_visualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
