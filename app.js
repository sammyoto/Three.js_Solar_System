//Global Variables
let scene, camera, renderer, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, sun;

//Function will be called in the animation loop. Orbits based on orbit radius
function orbit(planet) {
    //Defining orbit logic
    let x = planet.body.position.x;
    let z = planet.body.position.z;

    //Positive or Negative x/z value logic
    let rightX = x > 0;
    let leftX = x <= 0;
    let topZ = z >= 0;
    let bottomZ = z < 0;

    let firstQuad = rightX && topZ;
    let secondQuad = leftX && topZ;
    let thirdQuad = leftX && bottomZ;
    let fourthQuad = rightX && bottomZ;

    //Motion Logic
         if (firstQuad) {
             planet.body.position.x -= planet.orbitspeed;
             planet.body.position.z += planet.orbitspeed;
         }
         if (secondQuad) {
             planet.body.position.x -= planet.orbitspeed;
             planet.body.position.z -= planet.orbitspeed;
         }
         if (thirdQuad) {
             planet.body.position.x += planet.orbitspeed;
             planet.body.position.z -= planet.orbitspeed;
         }
         if (fourthQuad) {
             planet.body.position.x += planet.orbitspeed;
             planet.body.position.z += planet.orbitspeed;
         }

    //Rotate planet
    planet.body.rotation.y += 0.01;
    }

    //Planet Constructor
function planet(name, radius, texture, orbitradius, orbitspeed) {
    //Initialize local vars
    this.name = name;
    this.radius = radius;
    this.orbitradius = orbitradius;
    this.orbitspeed = orbitspeed;

    //Load Textures and create geometry
    this.texture = new THREE.TextureLoader().load(texture);
    this.body = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 16), new THREE.MeshBasicMaterial( {map:(this.texture)}));
    this.body.position.z = -this.orbitradius;
    scene.add(this.body);
}

// Initialize Objects

function init() {
    // Initialize essential variables
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Initialize Planets
    sun = new planet('sun', 100, 'textures/sun.jpg', 0, 0);
    mercury = new planet('mercury', 10, 'textures/mercury.jpg', 300, 3);
    venus = new planet('venus', 24, 'textures/venus.jpg', 400, 2);
    earth = new planet('earth', 25, 'textures/earth.jpg', 500, 1);
    mars = new planet('mars', 13, 'textures/mars.jpg', 650, 1);
    jupiter = new planet('jupiter', 70, 'textures/jupiter.jpg', 1000, 1);
    saturn = new planet('saturn', 60, 'textures/saturn.jpg', 1100, 0.8);
    uranus = new planet('uranus', 40, 'textures/uranus.jpg', 1200, 0.5);
    neptune = new planet('neptune', 40, 'textures/neptune.jpg', 1300, 0.4);

    // Adjust camera position
    camera.position.z = 1500;
    camera.position.y = 100;
}



    // Function called every frame
function animate() {
    requestAnimationFrame(animate);
    
    // call orbit function on all planets to make them orbit
    orbit(sun);
    orbit(mercury);
    orbit(venus);
    orbit(earth);
    orbit(mars);
    orbit(jupiter);
    orbit(saturn);
    orbit(uranus);
    orbit(neptune);
    
    renderer.render(scene, camera);
}

    // Window resize function so website doesn't break
function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);


    // Function calls
init();
animate();


