import {TopVoice} from "./TopVoice.tsx";
import {Alert, Button, ListGroup} from "react-bootstrap";

interface TopVoiceListProps {
    topVoices: string[]
    onRemoveTopVoice: (index: number) => void;
}

export default function TopVoiceList({ topVoices, onRemoveTopVoice }: TopVoiceListProps) {
    return (
        <>
            {topVoices.length > 0 ? (
                <>
                    <ListGroup>
                        {topVoices.map((value, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" style={{ padding: '0.25rem 0.5rem' }}>
                                <TopVoice caption={value}/>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => onRemoveTopVoice(index)}
                                >
                                    <i className="bi bi-trash3"></i>
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div style={{paddingTop: "20px"}}>
                    {(() => {
                        if (topVoices.length == 1)
                        {
                            return <Alert key={"warning"} variant={"warning"}><i className="bi bi-emoji-smile-fill"/>&nbsp;Great Start, but you are better than this.</Alert>;
                        }
                        if (topVoices.length > 1 && topVoices.length < 5)
                        {
                            return <Alert key={"warning"} variant={"warning"}><i className="bi bi-emoji-laughing-fill"/>&nbsp;Keep going...you are better than this.</Alert>;
                        }
                        if (topVoices.length >= 5) {
                            return <Alert key={"success"} variant={"success"}><i className="bi bi-award-fill"/>&nbsp;Wow, you really are a top voice.</Alert>;
                        }
                        return null;
                    })()}
                    </div>
                </>
            ) : (
                <Alert key={"danger"} variant={"danger"}>
                    <i className="bi bi-emoji-frown-fill"/>&nbsp;You are not a top voice in anything right now.</Alert>
            )}
        </>
    )
}