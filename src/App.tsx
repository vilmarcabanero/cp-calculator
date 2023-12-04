import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface StatValues {
  [key: string]: string;
}

interface CPValues {
  [key: string]: number;
}

const CombatPowerCalculator = () => {
  const initialStats: StatValues = {
    attack: '',
    defense: '',
    // ... add other stats here
  };

  const [stats, setStats] = useState<StatValues>(initialStats);
  const [totalCP, setTotalCP] = useState(0);
  const [autoClear, setAutoClear] = useState(true); // state for auto clear mode

  const cpValues: CPValues = {
    attack: 34.5,
    defense: 21,
    // ... add CP values for other stats
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStats(prevStats => ({
      ...prevStats,
      [name]: value
    }));
  };

  const calculateAndAddToTotalCP = () => {
    let totalForCurrentInputs = 0;
    for (const stat in stats) {
      totalForCurrentInputs += (parseFloat(stats[stat]) || 0) * (cpValues[stat] || 0);
    }
    setTotalCP(prevTotalCP => prevTotalCP + totalForCurrentInputs);
    if (autoClear) setStats(initialStats);
  };

  const resetCalculator = () => {
    setStats(initialStats);
    setTotalCP(0);
  };

  const toggleAutoClear = () => {
    setAutoClear(!autoClear);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Combat Power Calculator
      </Typography>

      <Button onClick={toggleAutoClear} variant="contained" color="primary">
        {autoClear ? 'Switch to Manual Clear' : 'Switch to Auto Clear'}
      </Button>

      {Object.keys(initialStats).map(stat => (
        <div key={stat}>
          <TextField
            label={stat.charAt(0).toUpperCase() + stat.slice(1)}
            type="text"
            id={stat}
            name={stat}
            value={stats[stat]}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
        </div>
      ))}

      <Button onClick={calculateAndAddToTotalCP} variant="contained" color="secondary">
        Calculate
      </Button>
      <Button onClick={resetCalculator} variant="contained">
        Reset
      </Button>

      <Typography variant="subtitle1">
        <strong>Total CP: {totalCP}</strong>
      </Typography>
    </div>
  );
};

export default CombatPowerCalculator;
