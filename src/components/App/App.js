import { useState } from 'react';
import { Form } from '../Form/Form';
import './App.css';

function App() {
  const [hideButtonText, setHideButtonText] = useState('Hide Instructions');
  const [instructionsHidden, setInstructionsHidden] = useState(false);
  

  function handleHideClick(e) {
    e.preventDefault();
    if (!instructionsHidden) {
      setHideButtonText('Show Instuctions');
      setInstructionsHidden(true);
    } else {
      setHideButtonText('Hide Instructions');
      setInstructionsHidden(false);
    }
  }


  return (
    <div className="App">
      <h1 className="wordle-solver-title">WORDLE SOLVER</h1>
      {!instructionsHidden && (
        <h2>
          Enter green and yellow letters in their corresponding places.<br></br>{' '}
          For example, a green "K" on letter 3 should be placed in the middle
          green square. <br></br> A yellow "D" on letter 2 should be placed in
          the yellow box second from the left. <br></br>
          Enter all black letters in any order. <br></br>
          No commas between letters. <br></br> One letter per green input, as
          many in other inputs as needed.
        </h2>
      )}
      <button
        id="hide"
        onClick={(e) => {
          handleHideClick(e);
        }}
      >
        {hideButtonText}
      </button>
      <Form />
    </div>
  );
}

export default App;
