import {Form, Button,  InputGroup, ListGroup} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {TopVoice, TopVoiceType} from "../types/topvoice.ts";


interface TopVoiceInputFormForm {
    topVoices: TopVoice[],
    onNewTopVoice: (newTopVoice: TopVoice) => void,
}

export default function TopVoiceInputForm({topVoices, onNewTopVoice}: TopVoiceInputFormForm) {

    const [description, setDescription] = useState<string>("");
    const [badgeType, setBadgeType] = useState<TopVoiceType>(TopVoiceType.Gold);

    const [isInvalid, setIsInvalid] = useState<boolean>(false);

    const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
    const [validationMessage, setValidationMessage] = useState<string>("");

    const buttonRef = useRef<HTMLButtonElement>(null);
    const topVoiceInputRef = useRef<HTMLInputElement>(null);

    function addTopVoice() {
        const newTopVoice: TopVoice = {
            type: badgeType,
            description: description,
            createdAt: new Date()
        }

        onNewTopVoice(newTopVoice);

        setDescription("");
        setButtonEnabled(false)
        topVoiceInputRef.current?.focus();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const cursorKeys = [ "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown" ];
        const modificationKeys: string[] = [ "Backspace", "Delete", "Space" ];
        const isAlphanumeric = /^[a-zA-Z0-9 ]$/;

        if (event.key === "Enter" && buttonRef.current) {
            buttonRef.current.click();
        }

        if (!isAlphanumeric.test(event.key) && !modificationKeys.includes(event.key) && !cursorKeys.includes(event.key)) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        topVoiceInputRef.current?.focus();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDescription(value);
        setIsInvalid(!validateInput(value)); // Update the invalid state based on the validation
    };

    const validateInput = (value: string) => {
        if (topVoices.some(topVoice => topVoice.description === value))
        {
            setValidationMessage(`You already have a badge for '${value}', don't be greedy!`);
            setButtonEnabled(false)
            return false;
        }

        setButtonEnabled(!!topVoiceInputRef.current?.value?.length);
        return true;
    };

    const handleSelect = (badgeType: TopVoiceType) => {
        setBadgeType(badgeType);
    };

    const getItemStyle = (type: TopVoiceType) => {
        const styleMap = {
            [TopVoiceType.Gold]: { backgroundColor: 'rgb(252, 227, 188)', color: 'rgb(145, 89, 7)' },
            [TopVoiceType.Blue]: { backgroundColor: 'rgb(221, 231, 241)', color: 'rgb(10, 102, 194)' },
            [TopVoiceType.Unicorn]: { backgroundColor: 'rgb(234, 206, 223)', color: 'rgb(126, 0, 199)' },
        };

        return type in styleMap
            ? {
                ...styleMap[type],
                backgroundColor: badgeType === type ? styleMap[type].backgroundColor : '',
                color: badgeType === type ? styleMap[type].color : '',
                cursor: 'pointer'
            }
            : {};
    };

    return (
        <>
            <div style={{paddingBottom: "20px"}}>
                <ListGroup as="ul">
                    <ListGroup.Item
                        as="li"
                        onClick={() => handleSelect(TopVoiceType.Gold)}
                        style={getItemStyle(TopVoiceType.Gold)}
                    >
                        <img className="icon" src={`/svg/badges/gold.svg`} alt="gold" width={18} height={18}/>
                        &nbsp;Gold level top voice badge
                    </ListGroup.Item>

                    <ListGroup.Item
                        as="li"
                        onClick={() => handleSelect(TopVoiceType.Blue)}
                        style={getItemStyle(TopVoiceType.Blue)}
                    >
                        <img className="icon" src={`/svg/badges/blue.svg`} alt="blue" width={18} height={18}/>
                        &nbsp;LinkedIn blue level top voice badge
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        onClick={() => handleSelect(TopVoiceType.Unicorn)}
                        style={getItemStyle(TopVoiceType.Unicorn)}
                    >
                        <img className="icon" src={`/svg/badges/unicorn.svg`} alt="unicorn" width={22} height={22}/>
                        &nbsp;Unicorn level badge
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div>
                <InputGroup hasValidation>
                    <Form.Control
                        ref={topVoiceInputRef}
                        style={{outline: "none", boxShadow: "none"}}
                        name={"top-voice-name"}
                        type={"text"}
                        minLength={1}
                        maxLength={40}
                        placeholder="Become a top voice in..."
                        value={description}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        required
                        isInvalid={isInvalid}
                    />
                    <Button size="sm" ref={buttonRef} onClick={addTopVoice} disabled={!buttonEnabled}>Earn Badge</Button>
                    <Form.Control.Feedback type="invalid">
                        {validationMessage}
                    </Form.Control.Feedback>
                </InputGroup>
            </div>
        </>
    )
}