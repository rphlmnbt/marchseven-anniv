import { useNavigate } from 'react-router';
import PixelButton from '../../components/pixel-button/PixelButton';
import './styles.css';

const LandingPage = () => {
  let navigate = useNavigate();

  const navigateToDiary = () => {
    navigate('/diary')
  }
  return (
    <div className="background-pink center">
      <div className="entry-text">Rei's Letter</div>
      <div className="entry-text">Compendium</div>
      <PixelButton title='start' showIcon={true} onClick={navigateToDiary} />
    </div>
  );
}

export default LandingPage;