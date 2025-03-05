import { useNavigate } from 'react-router';
import PixelButton from '../../components/pixel-button/PixelButton';
import clickSfx from '../../assets/sounds/click.wav';
import useSound from 'use-sound';
import './styles.css';

const LandingPage = () => {
  let navigate = useNavigate();
  const [playClick] = useSound(clickSfx);

  const navigateToDiary = () => {
    playClick();
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