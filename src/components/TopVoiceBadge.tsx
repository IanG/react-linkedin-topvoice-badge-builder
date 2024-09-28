import {TopVoice} from "../types/topvoice.ts";

interface TopVoiceBadgeProps {
    topVoice: TopVoice
}

import "./TopVoiceBadge.css"

export function TopVoiceBadge({topVoice}: TopVoiceBadgeProps) {

    return (
        <div className={`top-voice ${topVoice.type}`}>
            <img src={`/svg/badges/${topVoice.type}.svg`} alt={topVoice.type} width={18} height={18}/>
            <span className={"caption"}>{topVoice.description}</span>
        </div>
    )
}