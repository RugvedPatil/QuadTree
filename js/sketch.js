let particles = []
let fr;


function setup()
{
    const canvas_div = document.getElementById("canvas_div");
    const frameRate_div = document.getElementById("frame_rate");
    const canvas_width = canvas_div.clientWidth;
    const canvas = createCanvas(canvas_width,580);

    canvas.parent(canvas_div);

    fr = createP('');
    fr.parent(frameRate_div);

    for(let i=0; i<100; i++)
    {
        particles[i] = new Particle(random(width),random(height));
    }
}

function draw()
{
    background(0);

    let boundary = new Rectangle(canvas.width,canvas.height,canvas.width,canvas.height);
    let qtree = new QuadTree(boundary, 10);
    fr.html('frame rate = '+ floor(frameRate()));

    for(let p of particles)
    {
        let point  = new Point (p.x, p.y, p);
        qtree.insert(point);

        p.move();
        p.render();
        p.setHighlight(false);
        qtree.show();
    }
    for(let p of particles)
    {
        let range = new Circle(p.x,p.y, p.r*2);
        let points = qtree.query(range);
        for(let point of points)
        {
            let other = point.userData; 
            if(p!== other && p.intersects(other))
            {
                p.setHighlight(true);
            }
        }
    }
    frameRate(120);
}