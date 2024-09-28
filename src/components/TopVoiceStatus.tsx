import {TopVoice} from "../types/topvoice.ts";
import {Alert} from "react-bootstrap";

interface TopVoiceStatusProps {
    topVoices: TopVoice[]
}

export default function TopVoiceStatus({topVoices}: TopVoiceStatusProps) {
    return (
        <>
            {topVoices.length > 0 ? (
                <>
                    <div>
                        {(() => {
                            if (topVoices.length == 1)
                            {
                                return <Alert key="1badge" variant={"warning"}><i className="bi bi-emoji-smile-fill"/>&nbsp;Great Start, but you are better than this.</Alert>;
                            }
                            if (topVoices.length > 1 && topVoices.length < 5)
                            {
                                return <Alert key="somebadges" variant={"warning"}><i className="bi bi-emoji-laughing-fill"/>&nbsp;Keep going...you are better than this.</Alert>;
                            }
                            if (topVoices.length >= 5) {
                                return <Alert key="lotsofbadges" variant={"success"}><i className="bi bi-award-fill"/>&nbsp;Wow, you really are a top voice.</Alert>;
                            }
                            return null;
                        })()}
                    </div>
                </>
            ) : (
                <Alert variant={"danger"}>
                    <i className="bi bi-emoji-frown-fill"/>&nbsp;You are not a top voice in anything right now.
                </Alert>
            )}
        </>
    )
}