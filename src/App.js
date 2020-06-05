import React, { Component, useState } from 'react';
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

class ThreeJSModel extends Component {
  componentDidMount() {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement);
    const geometry = new BoxGeometry(1, 1, 1);
    const { color } = this.props;
    const material = new MeshBasicMaterial({ color });
    const cube = new Mesh(geometry, material);
    this.cude = cube;
    scene.add(cube);
    camera.position.z = 5;
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }

  componentDidUpdate(prev) {
    const { color } = this.props;
    if (color) {
      this.cude.material.color.setHex(color);
    }
  }

  render() {
    return (
      <div
        ref={ref => {
          this.mount = ref;
        }}
      />
    );
  }
}

function App() {
  const [color, setColor] = useState(0x00ff00);

  console.log(color);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          Threejs with React Demo <br />
          <input
            type="button"
            value="Red"
            onClick={() => setColor(0xff0000)}
            style={{ width: '100px', fontSize: 32, marginRight: '2rem', backgroundColor: 'red' }}
          />
          <input
            type="button"
            value="Blue"
            onClick={() => setColor(0x0000ff)}
            style={{ width: '100px', fontSize: 32, marginRight: '2rem', backgroundColor: 'blue' }}
          />
          <input
            type="button"
            value="Green"
            onClick={() => setColor(0x00ff00)}
            style={{ width: '100px', fontSize: 32, marginRight: '2rem', backgroundColor: 'green' }}
          />
        </div>
        <ThreeJSModel color={color} />
      </header>
    </div>
  );
}

export default App;
