import { Grid, GridCol, List, ListItem, ThemeIcon } from '@mantine/core';
import './styles.css';
import { use, useState } from 'react';
import { IconCornerDownRight } from '@tabler/icons-react';
import PixelButton from '../../components/pixel-button/PixelButton';
import { useNavigate } from 'react-router';

const DiaryPage = () => {
    const [dateItems, setDateItems] = useState<any[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [contentTitle, setContentTitle] = useState<string>('Select a Diary Entry');
    const [contentBody, setContentBody] = useState<string>('');

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
        const path = `/letters/${year}/${month}/files.json`;
        fetch(path) // A JSON file containing a list of filenames
            .then(res => res.json())
            .then(files => {
                const dateItems = files.map((json: any) => json.replace('.json', '')).filter((json: any) => json !== '.DS_Store').sort((a: string, b: string) =>  new Date(a).getTime() - new Date(b).getTime());
                setDateItems(dateItems)
            })
            .catch(error => console.error('Error loading JSON:', error));
    }

    const fetchContent = (date: string) => {
        const path = `/letters/${selectedYear}/${selectedMonth}/${date}.json`;
        fetch(path) // A JSON file containing a list of filenames
            .then(res => res.json())
            .then(content => {
                console.log(content)
                setContentTitle(content.title)
                setContentBody(content.textContent)
            })
            .catch(error => console.error('Error loading JSON:', error));
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
                            <PixelButton title='back' showIcon={true} onClick={() => {navigate('/')}}/>
                        </div>
                    </GridCol>
                </Grid>
            </div>
        </div>
    )
}

export default DiaryPage;