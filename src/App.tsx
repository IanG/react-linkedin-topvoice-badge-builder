import {useState} from 'react'
import confetti from 'canvas-confetti';

import TopVoiceBadgeList from "./components/TopVoiceBadgeList.tsx";
import TopVoiceInputForm from "./components/TopVoiceInputForm.tsx";
import TopVoiceStatus from "./components/TopVoiceStatus.tsx";

import {TopVoice, TopVoiceType} from "./types/topvoice.ts";

import './App.css'
import TopVoiceCertificateDownload from "./components/TopVoiceCertificateDownload.tsx";

export default function App() {
    const [topVoices, setTopVoices] = useState<TopVoice[]>([]);

    const badgesToWowAt: number = 4;

    function onNewTopVoice(newTopVoice: TopVoice) {

        if(newTopVoice.type == TopVoiceType.Unicorn)
        {
            const hornAudio = new Audio("./audio/big-applause.mp3");
            void hornAudio.play();
            launchConfetti();
        }

        if(newTopVoice.type == TopVoiceType.Blue)
        {
            const applauseAudio = new Audio("./audio/applause.mp3");
            void applauseAudio.play();
        }

        if(topVoices.length == badgesToWowAt)
        {
            const audio = new Audio("./audio/wow.mp3");
            void audio.play();
        }

        setTopVoices(topVoices.concat(newTopVoice));
    }

    function onRemoveTopVoice(index: number) {
        setTopVoices((currentTopVoices) => [
            ...currentTopVoices.slice(0, index),
            ...currentTopVoices.slice(index + 1),
        ]);
    }

    function launchConfetti() {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
        });
    }

    return (
        <>
            <div className={"heading"} style={{width: "50%", margin: "auto", textAlign: "left"}}>
                <center>
                    <h1>
                        <i className="bi bi-linkedin text-primary"></i>&nbsp;
                        <span>Top Voice Badge Builder</span>
                    </h1>
                </center>

                <p>Do you have FOMO ? Are you not being recognised for the awesome skills you have ? Tired of
                    writing comments to try and earn top voice badges ? </p>
                <p>LinkedIn are about to <a href="https://www.linkedin.com/help/linkedin/answer/a6245087"
                                            target="_blank">remove</a> our ability to gain top voice gold badges - but
                    do not dismay - you can get that warm fuzzy feeling and self-certify as a top voice !</p>
            </div>

            <div style={{width: "50%", margin: "auto"}}>
                <TopVoiceInputForm topVoices={topVoices} onNewTopVoice={onNewTopVoice}/>
            </div>

            <div style={{width: "50%", margin: "auto", marginTop: "20px"}}>
                <TopVoiceBadgeList topVoices={topVoices} onRemoveTopVoice={onRemoveTopVoice}/>
            </div>

            <div style={{width: "50%", margin: "auto", marginTop: "20px"}}>
                <TopVoiceStatus topVoices={topVoices}/>
            </div>

            <div style={{width: "50%", margin: "auto", marginTop: "20px"}}>
                <TopVoiceCertificateDownload topVoices={topVoices}/>
            </div>

            <div style={{width: "50%", margin: "auto",  marginTop: "20px", textAlign: "left"}}>
                <p><i className="bi bi-exclamation-circle"></i>&nbsp;If you enjoyed using this little application maybe you can come check out my LinkedIn profile <a href={"https://www.linkedin.com/in/ian-gratton/"} target={"_blank"}>here</a>.</p>
            </div>
        </>
    )
}
