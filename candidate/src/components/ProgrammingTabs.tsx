import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface TabPanelProps {
    dir?: string;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            className="program-tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box padding={3} display={value === index ? 'block' : 'none'}>
                    {children}
                </Box>
            )}
        </div>
    );
}

interface TabsProps {
    tabs: { title: string, value: React.ReactNode, disabled: boolean; }[],
    // activeTab: (activeTabNo: number) => void,
    // ref?: React.Ref<any>
}

export const ProgrammingTabs: React.FC<TabsProps> = (props) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box display="flex" flexDirection="column" id='question-tabs'
            sx={{
                maxWidth: 480, //bgcolor: 'background.paper',
            }}
        >
            <Tabs
                className='program-tabs'
                value={value}
                onChange={handleChange}
                variant="scrollable"
            >
                {
                    props.tabs && props.tabs.map((t, i) => (
                        <Tab
                            disabled={t.disabled}
                            label={t.title}
                            key={t.title + "" + i}
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


