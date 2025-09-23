// 代码生成时间: 2025-09-23 13:58:09
// THREE.js library should be included in the HTML file

class SortingAlgorithmVisualizer {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Add lights to the scene
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    this.scene.add(directionalLight);
  }

  // Function to create a bar for each number in the array
  createBar(number) {
    const geometry = new THREE.BoxGeometry(0.1, number, 0.1);
    const material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
    const bar = new THREE.Mesh(geometry, material);
    bar.position.y = number;
    bar.position.x = Math.random() * 10 - 5; // Randomize x position
    bar.position.z = Math.random() * 10 - 5; // Randomize z position
    this.scene.add(bar);
    return bar;
  }

  // Function to animate the bars
  animateBars(array) {
    array.forEach((number) => {
      const bar = this.createBar(number);
      const targetPositionY = number;
      let y = bar.position.y;

      const animate = () => {
        y -= 0.01;
        bar.position.y = y;
        if (y < targetPositionY) {
          y = targetPositionY;
          cancelAnimationFrame(animate);
        } else {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    });
  }

  // Function to sort the array using a chosen algorithm
  sortArray(array, algorithm) {
    try {
      switch (algorithm) {
        case 'bubbleSort':
          return this.bubbleSort(array);
        case 'selectionSort':
          return this.selectionSort(array);
        case 'insertionSort':
          return this.insertionSort(array);
        default:
          throw new Error('Algorithm not supported');
      }
    } catch (error) {
      console.error('Sort error:', error.message);
    }
  }

  // Bubble Sort Algorithm
  bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    this.animateBars(array);
    return array;
  }

  // Selection Sort Algorithm
  selectionSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
      let indexMin = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[indexMin]) {
          indexMin = j;
        }
      }
      if (indexMin !== i) {
        let temp = array[indexMin];
        array[indexMin] = array[i];
        array[i] = temp;
      }
    }
    this.animateBars(array);
    return array;
  }

  // Insertion Sort Algorithm
  insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j = j - 1;
      }
      array[j + 1] = key;
    }
    this.animateBars(array);
    return array;
  }
}

// Example usage of the SortingAlgorithmVisualizer class
const visualizer = new SortingAlgorithmVisualizer();
const array = [5, 3, 8, 4, 2, 7, 1, 6];
visualizer.sortArray(array, 'bubbleSort');

// Resize renderer on window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  visualizer.camera.aspect = window.innerWidth / window.innerHeight;
  visualizer.camera.updateProjectionMatrix();
  visualizer.renderer.setSize(window.innerWidth, window.innerHeight);
}
