import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highestAlphabet', label: 'Highest Alphabet' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const response = await axios.post('/bfhl', { data: JSON.parse(jsonData) });
      setResponse(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          JSON Data:
          <textarea value={jsonData} onChange={(e) => setJsonData(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </form>

      {response && (
        <div>
          <Select
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedOptions}
            onChange={setSelectedOptions}
          />

          {selectedOptions.includes('numbers') && (
            <div>
              <h3>Numbers:</h3>
              <ul>
                {response.numbers.map((number, index) => (
                  <li key={index}>{number}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedOptions.includes('alphabets') && (
            <div>
              <h3>Alphabets:</h3>
              <ul>
                {response.alphabets.map((alphabet, index) => (
                  <li key={index}>{alphabet}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedOptions.includes('highestAlphabet') && (
            <div>
              <h3>Highest Alphabet:</h3>
              <p>{response.highest_alphabet}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
