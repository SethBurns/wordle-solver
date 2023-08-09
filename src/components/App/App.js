import { Form } from '../Form/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="wordle-solver-title">WORDLE SOLVER</h1>
      <h2>
        Enter green and yellow letters in their corresponding places.<br></br> For
        example, a green "K" on letter 3 should be placed in the middle green
        square. <br></br> A yellow "D" on letter 2 should be placed in the yellow box second from the left. <br></br>
        Enter all black letters in any order. <br></br>
        No commas between letters. <br></br> One letter per green input, as many in other inputs as needed.
      </h2>
      <Form />
    </div>
  );
}

export default App;
