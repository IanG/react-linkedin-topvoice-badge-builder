import {TopVoiceBadge} from "./TopVoiceBadge.tsx";
import {Button, ListGroup} from "react-bootstrap";
import {TopVoice} from "../types/topvoice.ts";

interface TopVoiceBadgeListProps {
    topVoices: TopVoice[]
    onRemoveTopVoice: (index: number) => void;
}

export default function TopVoiceBadgeList({ topVoices, onRemoveTopVoice }: TopVoiceBadgeListProps) {
    return (
        <>
            {topVoices.length > 0 && (
                <>
                    <ListGroup>
                        {topVoices.map((value, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" style={{ padding: '0.25rem 0.5rem' }}>
                                <TopVoiceBadge topVoice={value}/>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => onRemoveTopVoice(index)}
                                >
                                    <i className="bi bi-trash3"/>
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </>
            )}
        </>
    )
}