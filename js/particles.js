class Particle
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.r = 4;
        this.highlight = false;
    }

    move()
    {
        this.x += random(-5,5);
        this.y += random(-5,5);
    }

    intersects(other)
    {
        let d = dist(this.x, this.y, other.x, other.y);
        return (d < this.r + other.r)
    }

    setHighlight(value)
    {
        this.highlight = value
    }

    render()
    {
        if (this.highlight)
        {
            noStroke();
            fill(225);
        }
        else
        {
            noStroke();
            fill(0);
        }
        ellipse(this.x,this.y,this.r*2)
    }
}