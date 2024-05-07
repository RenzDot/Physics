// program.ts
/// <reference path="libraries/matter.d.ts" />

var Runner = Matter.Runner;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;

let engine = Matter.Engine.create();
engine.gravity.scale = 0;

let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1000,
        height: 700, 
        wireframes: true
    }
});

let walls = [
  Bodies.rectangle(render.canvas.width/2, 10, render.canvas.width, 10, {isStatic: true}),
  Bodies.rectangle(render.canvas.width/2, render.canvas.height-10, render.canvas.width, 10, {isStatic: true}),
  Bodies.rectangle(10, render.canvas.height/2, 10, render.canvas.height, {isStatic: true}),
  Bodies.rectangle(render.canvas.width - 10, render.canvas.height/2, 10, render.canvas.height, {isStatic: true}),  
]

let ship = Bodies.circle(render.canvas.width/2, render.canvas.height/2, 5);
let ship2 = Bodies.circle(20, 20, 5);
ship.restitution = 1;
ship.velocity.x = -1000;


let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: { 
        render: { visible: false }
    }
});
render.mouse = mouse;

World.add(engine.world, [ship, ship2, mouseConstraint].concat(walls));
Runner.run(engine);
Render.run(render);

