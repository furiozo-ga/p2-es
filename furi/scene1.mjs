export default function s1 () {
    let world = new p2.World({ gravity: [0, 0]})    // Create a World
    world.sleepMode = p2.World.BODY_SLEEPING
    this.setWorld(world)

    // // Create ground
    // let planeShape = new p2.Plane()
    // let plane = new p2.Body({ position: [0, -2], })
    // plane.addShape(planeShape)
    // world.addBody(plane)

    // // Create kinematic, moving box
    // var kinematicBody = new p2.Body({
    //     type: p2.Body.KINEMATIC,
    //     position: [0, 0.5],
    // })
    // var boxShape = new p2.Box({ width: 2, height: 0.5 })
    // kinematicBody.addShape(boxShape)
    // world.addBody(kinematicBody)

    // // Create dynamic box
    // var boxBody = new p2.Body({
    //     mass: 1,
    //     position: [0, 2],
    // })
    // boxBody.addShape(new p2.Box({ width: 0.5, height: 0.5 }))
    // world.addBody(boxBody)

    // // Create dynamic circle connected to the kinematic body
    // var circleBody = new p2.Body({
    //     mass: 1,
    //     position: [0, -0.5],
    //     velocity: [-1, 0],
    // })
    // circleBody.addShape(new p2.Circle({ radius: 0.25 }))
    // world.addBody(circleBody)

    // world.addConstraint(new p2.DistanceConstraint(kinematicBody, circleBody))

    // world.on('postStep', function () {
    //     // Kinematic bodies are controlled via velocity.
    //     kinematicBody.velocity[1] = 1 * Math.sin(world.time * 2)
    //     // enactControl(this)
    // })

    // Create proto box
    var a1 = new p2.Body({
        mass: 1,
        damping: .5,
        angularDamping: .5,
        position: [0, 0],
    })
    a1.addShape(new p2.Box({ width: 1, height: 2 }))
    world.addBody(a1)

    this.selected.push(a1)

    world.on('postStep',enactControl)
    this.elementContainer.style.width='60%'
    this.resizeToFit()
    this.frame(0,0,20,20)

}

function enactControl() {
    let bs=this.bodies
    for(let n=0;n<bs.length;++n){
        if(!bs[n].control) continue
        let b=bs[n],
            c=b.control
        
        if(c.forward){ b.wakeUp();b.applyForceLocal([  0, 10]) }
        if(c.back   ){ b.wakeUp();b.applyForceLocal([  0,-10]) }
        if(c.right  ){ b.wakeUp();b.applyForceLocal([ 10,  0]) }
        if(c.left   ){ b.wakeUp();b.applyForceLocal([-10,  0]) }
        if(c.turnl  ){ c.turnr || (b.wakeUp(),b.angularForce=1) }
        else if(c.turnr){b.wakeUp();b.angularForce=-1 }
        if(c.break  ){ b.applyDamping( Math.hypot(...b.velocity)<1?1:(1-b.damping)**6 ) }
    }
}