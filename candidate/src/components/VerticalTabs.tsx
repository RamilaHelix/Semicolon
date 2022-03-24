import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            className='testcase-tabpanel'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


export default function VerticalTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box className='vertical-tabs' display={'flex'} flexGrow={1}>
            <Tabs
                className='testcases-tabs'
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="testcases"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                {
                    props.tabs && props.tabs.map((t, i) => (
                        <Tab
                            sx={{
                                color: t.color ? '#20eb18' : '#eb0c08',
                                '&.Mui-selected': {
                                    color: t.color ? '#20eb18' : '#eb0c08',
                                }
                            }}
                            color={t.color ? '#20eb18' : '#eb0c08'}
                            label={t.title}
                            key={t.title + "" + i}
                            {...a11yProps(i)}
                        />
                    ))
                }
            </Tabs>
            {
                props.tabs && props.tabs.map((t, i) => (
                    <TabPanel value={value} index={i} key={t.title + "" + i}>
                        {t.value}
                    </TabPanel>
                ))
            }
        </Box>
    );
}

