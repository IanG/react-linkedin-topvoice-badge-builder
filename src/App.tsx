import { useState } from 'react'
import TopVoiceList from "./components/TopVoiceList.tsx";
import TopVoiceInputForm from "./components/TopVoiceInputForm.tsx";

import './App.css'

export default function App() {
    const [topVoices, setTopVoices] = useState<string[]>([]);

    function onNewTopVoice(newTopVoice: string) {
        setTopVoices(topVoices.concat(newTopVoice));
    }

    function onRemoveTopVoice(index: number) {
        setTopVoices((currentTopVoices) => [
            ...currentTopVoices.slice(0, index), // Get elements before the index
            ...currentTopVoices.slice(index + 1), // Get elements after the index
        ]);
    }

    return (
      <>
          <div className={"heading"} style={{width: "50%", margin: "auto"}}>
              <h1>
                  <i className="bi bi-linkedin text-primary" ></i>&nbsp;
                  <span>Top Voice Badge Builder</span>
              </h1>
              <p>Do you have FOMO ? Are you not being recognised for all the awesome skills you have ? Tired of writing comments to try and earn top voice badges ? </p>
              <p>LinkedIn are about to <a href="https://www.linkedin.com/help/linkedin/answer/a6245087" target="_blank">remove</a> our ability to gain top voice gold badges - but do not dismay - you can get that warm fuzzy feeling and self-certify as a top voice !</p>
          </div>

          <div style={{width: "50%", margin: "auto"}}>
              <TopVoiceInputForm onNewTopVoice={onNewTopVoice}/>
          </div>

          <div style={{width: "50%", margin: "auto", marginTop: "20px" }}>
              <TopVoiceList topVoices={topVoices} onRemoveTopVoice={onRemoveTopVoice}/>
          </div>
      </>
    )
}
