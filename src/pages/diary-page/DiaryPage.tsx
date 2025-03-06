import { Grid, GridCol, List, ListItem } from '@mantine/core';
import './styles.css';
import { useState } from 'react';
import { IconCornerDownRight } from '@tabler/icons-react';
import PixelButton from '../../components/pixel-button/PixelButton';
import { useNavigate } from 'react-router';
import clickSfx from '../../assets/sounds/click.wav';
import bgm from '../../assets/sounds/bgm.mp3'
import useSound from 'use-sound';

const DiaryPage = () => {
    const [dateItems, setDateItems] = useState<any[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [contentTitle, setContentTitle] = useState<string>('Select a Diary Entry');
    const [contentBody, setContentBody] = useState<string>('');
    const [isSoundPlaying, setIsSoundPlaying] = useState<boolean>(false);

    const [playClick] = useSound(clickSfx);
    const [playBGM, { stop }] = useSound(bgm, { volume: 0.75 });

    const navigate = useNavigate();

    const tableOfContents = [
        {
            year: '2024',
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }, {
            year: '2025',
            months: ['January', 'February', 'March']
        }

    ]

    const expandMonth = (year: string, month: string) => {
        playClick();
        setDateItems([]);
        if (selectedMonth === month && selectedYear === year) {
            setSelectedMonth('');
            setSelectedYear('');
        } else {
            setSelectedMonth(month);
            setSelectedYear(year);
            fetchFiles(year, month);
        }
    }

    const fetchFiles = (year: string, month: string) => {
        const path = `${import.meta.env.BASE_URL}letters/${year}/${month}/files.json`;
        fetch(path) // A JSON file containing a list of filenames
            .then(res => res.json())
            .then(files => {
                const dateItems = files.map((json: any) => json.replace('.json', '')).filter((json: any) => json !== '.DS_Store').sort((a: string, b: string) =>  new Date(a).getTime() - new Date(b).getTime());
                setDateItems(dateItems)
            })
            .catch(error => console.error('Error loading JSON:', error));
    }

    const fetchContent = (date: string) => {
        playClick();
        const path = `${import.meta.env.BASE_URL}letters/${selectedYear}/${selectedMonth}/${date}.json`;
        fetch(path) // A JSON file containing a list of filenames
            .then(res => res.json())
            .then(content => {
                console.log(content)
                setContentTitle(content.title)
                setContentBody(content.textContent)
            })
            .catch(error => console.error('Error loading JSON:', error));
    }

    const navigateBack = () => {
        playClick();
        navigate('/');
    }

    const playSound = () => {
        if (isSoundPlaying === false) {
            playClick();
            playBGM();
            setIsSoundPlaying(true);
        } else {
            playClick();
            stop();
            setIsSoundPlaying(false);
        }
    }
    return (
        <div className='background-pink center'>
            <div style={{width: '100vw', height: '100vh'}}>
                <Grid>
                    <GridCol span={4}>
                        <div className='table-of-contents'>
                            <div className='table-of-contents-title'>
                                TABLE OF CONTENTS
                            </div>
                            <div className='table-of-contents-content'>
                                <List>
                                {tableOfContents.map((year) => {
                                    return (
                                        <div>
                                            <ListItem>{year.year}</ListItem>
                                            <List 
                                                withPadding
                                                icon={
                                                    <IconCornerDownRight size={20} />
                                                  }
                                            
                                            >
                                                {year.months.map((month) => {
                                                    return (
                                                        <div>
                                                            <ListItem className='month-item' onClick={() => expandMonth(year.year, month)}>{month}</ListItem>
                                                            {selectedMonth === month && selectedYear === year.year && (
                                                                <List withPadding>
                                                                    {dateItems.map((date) => {
                                                                        return (
                                                                            <ListItem className='month-item' onClick={() => fetchContent(date)}>{date}</ListItem>
                                                                        )
                                                                    })}
                                                                </List>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </List>                                        
                                        </div>
                                    )
                                })}
                                </List>
                            </div>
                        </div>
                    </GridCol>
                    <GridCol span={8}>
                        <div className='diary-content'>
                            <div className='diary-content-title'>
                                {contentTitle}
                            </div>
                            <div className='diary-content-body'>
                                {contentBody}
                            </div>
                        </div>
                        <div className='diary-content-footer'>
                            <PixelButton title='play sound' showIcon={true} onClick={playSound} icon={isSoundPlaying ? 'soundOff' : 'soundOn'}/>
                            <span style={{paddingRight: '8px'}} />
                            <PixelButton title='back' showIcon={true} onClick={navigateBack} icon='back'/>
                        </div>
                    </GridCol>
                </Grid>
            </div>
        </div>
    )
}

export default DiaryPage;