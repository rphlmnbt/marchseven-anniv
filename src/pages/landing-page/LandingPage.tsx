import PixelButton from '../../components/pixel-button/PixelButton';
import './styles.css';

const LandingPage = () => {
  return (
    <div className="background-pink center">
      <div className="entry-text">Rei's Letter</div>
      <div className="entry-text">Compendium</div>
      <PixelButton title='start' showIcon={true} />
    </div>
  );
}

export default LandingPage;