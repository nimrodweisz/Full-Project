import { Gauge } from '@mui/x-charts/Gauge';

interface ChartsOverviewDemoProps {
    value: number; // Adjust the type according to what you expect 'value' to be
  }
  
const ChartsOverviewDemo: React.FC<ChartsOverviewDemoProps> = ({ value }) => {
  return (
    
      <Gauge 
        value={value} 
        sx={{
          fontSize:50
        }}
      />
   
  );

  };
  export default ChartsOverviewDemo