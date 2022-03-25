import { Box, Button, Typography } from '@mui/material';
import React, { CSSProperties } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import Modal from '../components/Modal';
import { useContext } from '../context/candidateContest';
import Timer from '../elements/Timer';
import WhiteButton from '../elements/WhiteButton';
import useSessionStorage from '../hooks/useSessionStorage';
import MobileScreen from '../pages/MobileScreen';

const goToFullScreenstyle: CSSProperties = {
    background: 'white',
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '999'
}
function ModalData(timeUp: boolean) {
    if (timeUp) {
        return (<>
            <h1>Your Test has been auto Submitted</h1>
            <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, delectus.</h1>
            <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, delectus.</h1>
            <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, delectus.</h1>
        </>)
    }
    else {
        return (<>
            <h1>Full Screen needed</h1>
            <h1>if you exit full screen test will be pause.</h1>
            <h1>switching tabs will disable the question</h1>
            <h1>Lorem ipsum dolor sit.</h1>
        </>)
    }
}

interface Layout {
    timeUp: (warning: string) => void,
    time: number,
}
const TestLayout: React.FC<Layout> = ({ timeUp, time }) => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 10);
    const { seconds, restart
    } = useTimer({
        expiryTimestamp, onExpire: () => {
            if (!timeUpt) {
                // endTest("expire")
            }
            console.warn("onExpire called")
        },
        autoStart: false
    });

    function endTest(reason: string) {
        setOpen(true)
        timeUp(reason)
        setTimeUpt(true);
    }
    const fscreen = React.useRef<HTMLDivElement>(null);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const { fullScreen, setFullScreen, setContest } = useContext();
    const [open, setOpen] = React.useState<boolean>(true);
    const [timeUpt, setTimeUpt] = React.useState<boolean>(false);
    const [warning, setWarning] = React.useState<{ open: boolean, count: number }>({ open: false, count: 0 });
    const elem = document;
    const navigation = useNavigate();

    const goFullScreen = () => {
        fscreen.current?.requestFullscreen();
        setFullScreen(true)
    }
    const visibilitychange = () => {
        if (elem.fullscreenElement) {
            elem.exitFullscreen()
        }
    }
    const resize = () => {
        setWindowWidth(window.innerWidth)
    }
    const keydown = (e: KeyboardEvent) => {
        if (e.code === 'Escape' || e.code === 'F5' || e.code === 'F11' || e.code === 'F12' || e.altKey || e.ctrlKey) {
            e.preventDefault()
            e.stopPropagation();
        }
        if (e.metaKey)
            elem.exitFullscreen()
    }
    const contextmenu = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation();
    }
    const fullscreenchange = () => {
        if (elem.fullscreenElement === null) {
            setFullScreen(false)
            const time = new Date();
            time.setSeconds(time.getSeconds() + 10);
            restart(time)
            setWarning(e => ({ open: true, count: e.count + 1 }))
        }
    }
    const mouseleave = () => {
        if (elem.fullscreenElement) {
            elem.exitFullscreen()
            setWarning(e => ({ open: true, count: e.count + 1 }))
        }
    }
    const popstate = (e) => {
        e.preventDefault()
        e.stopPropagation();
        window.history.pushState(null, document.title, window.location.href);
    }

    React.useEffect(() => {
        window.addEventListener("resize", resize)
        elem.addEventListener('visibilitychange', visibilitychange)
        elem.addEventListener('keydown', keydown)
        //elem.addEventListener('contextmenu', contextmenu)
        fscreen.current?.addEventListener('fullscreenchange', fullscreenchange)
        //fscreen.current?.addEventListener('mouseleave', mouseleave)
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', popstate);
        window.addEventListener('onbeforeunload', function () { return "Your work will be lost."; })

        return () => {
            elem.removeEventListener('visibilitychange', visibilitychange)
            elem.removeEventListener('keydown', keydown)
            elem.removeEventListener('contextmenu', contextmenu)
            fscreen.current?.removeEventListener('fullscreenchange', fullscreenchange)
            fscreen.current?.removeEventListener('mouseleave', mouseleave)
            window.removeEventListener('resize', resize)
            window.removeEventListener('popstate', popstate);
        }
    }, [])
    React.useEffect(() => {
        if (warning.count === 3) {
            // setTimeUpt(true);
            // timeUp("warning")
            // setOpen(true);
            //endTest("warning")
        }
        return () => { }
    }, [warning.count])

    const outOfTime = (timeup: boolean) => {
        if (elem.fullscreenElement) {
            elem.exitFullscreen()
            // setTimeUpt(true)
            // timeUp("timeUp")
            // setOpen(true)
            endTest("timeUp")
        }
    }

    // if (windowWidth < 1200)
    //     return <MobileScreen />
    const [timer] = useSessionStorage("timer", time)
    return (<>
        {(!fullScreen) &&
            <div className='full-screen' style={goToFullScreenstyle}>
                <Button onClick={goFullScreen} variant='contained' sx={{ fontSize: '1.7rem', height: '6rem', width: '28rem' }}>Allow Fullscreen</Button>
            </div>}
        <div ref={fscreen} className="Quize" style={{ backgroundColor: 'white' }}>
            <Box position={"absolute"} right={8} top={6} display={'flex'}>
                <Timer
                    minute={timer}
                    onOutOfTime={outOfTime}
                    isPlaying={fullScreen}
                />
                <WhiteButton onClick={() => {
                    elem.exitFullscreen()
                    endTest("endTest")
                }} sx={{ marginTop: '3px' }}>End Test</WhiteButton>
            </Box>
            <Outlet />
        </div>
        <Modal open={open} onClose={function (): void {
            setOpen(false)
            if (timeUpt) {
                setContest({ contest_id: '', candidate_id: '', duration: 0, name: '' })
                navigation('/endtest')
            }
        }} >
            {ModalData(timeUpt)}
        </Modal>
        <Modal open={warning.open && !timeUpt}
            onClose={function (): void {
                setWarning((e) => ({ count: e.count, open: false }));
            }} >
            <Typography variant="h3"
                fontWeight={600}
                color="#f90000de"
                marginTop={"1rem"}
            >
                Warning {warning.count}<br />
                Allow FullScreen in
                <div>{seconds}s</div>
            </Typography>
            <Button onClick={() => {
                restart(expiryTimestamp, false);
                goFullScreen()
            }}
                variant='contained' sx={{ fontSize: '1.7rem' }}>Allow Fullscreen</Button>
            <Typography variant="body1" color="black" >test will be exited after 3 warning</Typography>
        </Modal>
    </>)
}

export default TestLayout