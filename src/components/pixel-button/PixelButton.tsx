import { Button } from '@mantine/core';
import { IconNotebook } from '@tabler/icons-react'; 
import './styles.css';

interface IButtonProps {
    title: string;
    showIcon: boolean;
    onClick: () => any;
}

const PixelButton = (props: IButtonProps) => {
    const {title, showIcon, onClick} = props;

    const icon = <IconNotebook size={25} />;
    return (
        <Button justify='center' leftSection={showIcon && icon} className='pixel-button' onClick={onClick}>
            {title}
        </Button>
    )
}

export default PixelButton;