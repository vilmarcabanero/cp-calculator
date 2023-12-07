import { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import statsData from './stats.json';

interface StatValues {
  [key: string]: string;
}


interface CPValues {
  [key: string]: number;
}

const CombatPowerCalculator = () => {
  const initialStats = statsData.reduce((acc, stat) => {
    acc[stat.name] = '';
    return acc;
  }, {} as StatValues);
  
  const cpValues = statsData.reduce((acc, stat) => {
    acc[stat.name] = stat.value;
    return acc;
  }, {} as CPValues);
  

  const [stats, setStats] = useState<StatValues>(initialStats);
  const [totalCP, setTotalCP] = useState(0);
  const [autoClear, setAutoClear] = useState(true);

  const attackStats = statsData.filter(stat => stat.id <= 16);
  const defenseStats = statsData.filter(stat => stat.id > 16);


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

  const clearStats = () => {
    setStats(initialStats);
  }

  const resetCP = () => {
    setTotalCP(0);
  }


  const toggleAutoClear = () => {
    setAutoClear(!autoClear);
  };

  /*
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Combat Power Calculator
      </Typography>

      <Button onClick={toggleAutoClear} variant="contained" color="primary">
        {autoClear ? 'Switch to Manual Clear' : 'Switch to Auto Clear'}
      </Button>

      {statsData.map(stat => (
        <div key={stat.id}>
          <TextField
            type="text"
            label={stat.description}
            id={stat.name}
            name={stat.name}
            value={stats[stat.name]}
            onChange={handleInputChange}
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
  ); */

  return (
    <div style={{ maxWidth: '68rem', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '5rem' }}>
        <div style={{ width: '32em' }}> {/* First Column for Attack Abilities */}
          <Typography variant="h6">Attack Abilities</Typography>
          {attackStats.map(stat => (
            <TextField
              key={stat.id}
              type="number"
              label={stat.description}
              id={stat.name}
              name={stat.name}
              value={stats[stat.name]}
              onChange={handleInputChange}
              style={{ margin: '4px 4px' }}
            />
          ))}
        </div>

        <div style={{ width: '32rem' }}> {/* Second Column for Defense Abilities */}
          <Typography variant="h6">Defense Abilities</Typography>
          {defenseStats.map(stat => (
            <TextField
              key={stat.id}
              type="number"
              label={stat.description}
              id={stat.name}
              name={stat.name}
              value={stats[stat.name]}
              onChange={handleInputChange}
              style={{ margin: '4px 4px' }}
            />
          ))}
        </div>
      </div>

      <div style={{
        flexBasis: '100%',
        paddingTop: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'white',
        position: 'relative', // Ensure the parent has a position context
        paddingBottom: '100px' // Adjust as needed for space for fixed elements
      }}>
        {/* Fixed Typography for Total CP */}
        <Typography variant="subtitle1" style={{
          marginBottom: '20px',
          position: 'fixed',
          bottom: 25, // Adjust as per your layout needs
          background: 'white',
          zIndex: 1000,
          width: '100%', // Ensure it spans the full width
          textAlign: 'center', // Center the text,
          padding: '10px'
        }}>
          <strong>Total CP: {totalCP}</strong>
        </Typography>

        {/* Fixed Buttons Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          bottom: 0,
          background: 'white',
          zIndex: 1000,
          width: '100%', // Adjust width as per your layout needs
          padding: '10px' // Add some padding around the buttons
        }}>
          {/* Button Group */}
          <Button onClick={calculateAndAddToTotalCP} variant="contained" color="secondary" style={{
            marginRight: '10px',
            flex: 1 // Makes buttons share space equally
          }}>
            Calculate
          </Button>
          <Button onClick={resetCalculator} variant="contained" style={{
            flex: 1 // Makes buttons share space equally
          }}>
            Reset All
          </Button>
        </div>
</div>

        
      </div>

  );
};

export default CombatPowerCalculator;
