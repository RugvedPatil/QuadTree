let particles = []
let fr;

function setup()
{
    canvas.width = window.innerWidth * 0.7 ;
    canvas.height = window.innerHeight * 0.8;
    createCanvas(canvas.width,canvas.height);
    fr = createP('');

    for(let i=0; i<100; i++)
    {
        particles[i] = new Particle(random(width),random(height));
    }

}

function draw()
{
    background(0);

    let boundary = new Rectangle(300,200,600,400);
    let qtree = new QuadTree(boundary, 4);
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

}