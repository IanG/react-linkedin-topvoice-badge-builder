import {Button, Modal} from "react-bootstrap";
import {TopVoice, TopVoiceType} from "../types/topvoice.ts";
import {TopVoiceBadge} from "../components/TopVoiceBadge.tsx";

import "./CertificateDownloadModal.css"
import {useRef} from "react";
import html2canvas from "html2canvas";

interface CertificateDownloadModalProps {
    topVoices: TopVoice[]
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export default function CertificateDownloadModal({topVoices, visible, setVisible}: CertificateDownloadModalProps) {

    const certificateRef = useRef<HTMLDivElement>(null);

    const downloadCertificate = async () => {
        if (certificateRef.current) {
            const canvas = await html2canvas(certificateRef.current);
            const dataURL = canvas.toDataURL('image/jpeg');

            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'top-voice-certificate.jpg';
            link.click();
        }
    }

    return (
        <Modal show={visible}>
            <Modal.Header closeButton onHide={() => setVisible(false)}>
                <Modal.Title>
                    Download Your Certificate
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Well done, you've achieved so much. Click the download button to save a jpeg image of your certificate</p>

                <div ref={certificateRef} className={"top-voice-certificate"}>
                {Object.values(TopVoiceType).map((type) => {
                    const voiceType = type;
                    const filteredVoices = topVoices.filter((topVoice) => topVoice.type === voiceType);

                    if (filteredVoices.length === 0) return null;

                    const badgeLabelMap = {
                        [TopVoiceType.Gold]: "Gold Top Voice Badges:",
                        [TopVoiceType.Blue]: "Blue Top Voice Badges:",
                        [TopVoiceType.Unicorn]: "Unicorn Top Voice Badges:"
                    };

                    return (
                        <div key={type}>
                            <span>{badgeLabelMap[voiceType]}</span>
                            <div>
                            {filteredVoices.map((voice) => (
                                <TopVoiceBadge topVoice={voice} key={voice.description} />
                            ))}</div>
                        </div>
                    );
                })}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={downloadCertificate}><i className="bi bi-box-arrow-down"/>&nbsp;Download</Button>
                <Button onClick={() => setVisible(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}