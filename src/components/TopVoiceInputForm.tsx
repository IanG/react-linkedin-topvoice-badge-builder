import {Button, FormControl, InputGroup} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";


interface TopVoiceInputFormForm {
    onNewTopVoice: (newValue: string) => void,
}

export default function TopVoiceInputForm({onNewTopVoice}: TopVoiceInputFormForm) {

    const [currentTopVoice, setCurrentTopVoice] = useState<string>("");

    const buttonRef = useRef<HTMLButtonElement>(null);
    const topVoiceInputRef = useRef<HTMLInputElement>(null);

    function addTopVoice() {
        onNewTopVoice(currentTopVoice);
        setCurrentTopVoice("");
        topVoiceInputRef.current?.focus();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && buttonRef.current) {
            buttonRef.current.click(); // Programmatically trigger the button click
        }
    };

    useEffect(() => {
        topVoiceInputRef.current?.focus();
    }, []);

    return (
        <InputGroup>
            <FormControl
                ref={topVoiceInputRef}
                style={{ outline: "none", boxShadow: "none"}}
                name={"top-voice-name"}
                type={"text"}
                minLength={0}
                maxLength={50}
                placeholder="Become a top voice in..."
                value={currentTopVoice}
                onChange={(e) => setCurrentTopVoice(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button size="sm" ref={buttonRef} onClick={addTopVoice}>Earn Another Badge</Button>
        </InputGroup>
    )
}