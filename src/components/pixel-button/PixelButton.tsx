import { Button } from '@mantine/core';
import { IconNotebook, IconDeviceSpeaker, IconDeviceSpeakerOff, IconReceiptRefund } from '@tabler/icons-react'; 
import './styles.css';

interface IButtonProps {
    title: string;
    icon: 'start' | 'soundOff' | 'soundOn' | 'back';
    showIcon: boolean;
    onClick: () => any;
}

const PixelButton = (props: IButtonProps) => {
    const {title, showIcon, icon, onClick} = props;

    const getIcon = () => {
        if (icon === 'start') {
            return <IconNotebook size={25} />
        } else if (icon === 'soundOff') {
            return <IconDeviceSpeakerOff size={25} />
        } else if (icon === 'soundOn') {
            return <IconDeviceSpeaker size={25} />
        } else if (icon === 'back') {
            return <IconReceiptRefund size={25} />
        }
    };
    return (
        <Button justify='center' leftSection={showIcon && getIcon()} className='pixel-button' onClick={onClick}>
            {title}
        </Button>
    )
}

export default PixelButton;