import * as React from 'react'

interface Contest {
    contest_id: string,
    candidate_id: string,
    name: string,
    duration: number
}
interface FullScreen {
    contest: Contest;
    fullScreen: boolean,
    setFullScreen: (fullScreen: boolean) => void
    setContest: (contest: Contest) => void
}

const FullScreenContext = React.createContext<FullScreen>(
    { fullScreen: false, setFullScreen: () => { }, setContest: () => { }, contest: { contest_id: '', candidate_id: '', name: '', duration: 0 } })

export const useContext = () => React.useContext(FullScreenContext);

export const FullScreenProvider: React.FC<FullScreen> = (props: any) => {

    const [fullScreen, setFullScreen] = React.useState(props.fullscreen);
    const [contest, setContest] = React.useState(props.contest);

    React.useEffect(() => {
        if (props.fullscreen)
            setFullScreen(props.fullscreen)
    }, [props.fullscreen])

    React.useEffect(() => {
        if (props.contest)
            setContest(props.contest)
    }, [props.contest])

    return (
        <FullScreenContext.Provider value={{
            contest,
            setContest,
            fullScreen,
            setFullScreen
        }}>
            {props.children}
        </FullScreenContext.Provider>
    )

}