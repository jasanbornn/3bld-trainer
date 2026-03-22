import { useState } from 'react'
import './App.css'

const Cube = window.Cube;
Cube.initSolver();

const cube = new Cube();

function Button({text, onClick}) {

    return (
        <button
            className="button"
            onClick={onClick}
        >{text}</button>
    )

}

function App() {
    const [count, setCount] = useState(0);
    const [solution, setSolution] = useState("");

    function updateScramble() {
        cube.randomize();
        setSolution(Cube.inverse(cube.solve()));
        console.log("state: " + JSON.stringify(cube.toJSON()));
        console.log("faces: " + cube.asString());
    }

    return (
        <>
        <section id="scramble-box">
        <div>
            <h1>{solution}</h1>
        </div>

        <Button text="↺" onClick={updateScramble}/>

        </section>

        </>
    )
}

export default App
