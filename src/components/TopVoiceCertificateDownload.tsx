import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";

import {TopVoice} from "../types/topvoice.ts";
import CertificateDownloadModal from "../modals/CertificateDownloadModal.tsx";

interface TopVoiceCertificateDownloadProps {
    topVoices: TopVoice[]
}

export default function TopVoiceCertificateDownload({topVoices}: TopVoiceCertificateDownloadProps) {
    const [ downloadButtonEnabled, setDownloadButtonEnabled ] = useState<boolean>(topVoices.length > 0);
    const [ downloadModalVisible, setDownloadModalVisible ] = useState<boolean>(false);

    useEffect(() => {
        console.log('TopVoices length:', topVoices.length);
        setDownloadButtonEnabled(topVoices.length > 0);
    }, [topVoices]);

    return (
        <>
            <CertificateDownloadModal topVoices={topVoices} visible={downloadModalVisible} setVisible={setDownloadModalVisible}/>
            <Button disabled={!downloadButtonEnabled} onClick={() => { setDownloadModalVisible(true) }}><i className="bi bi-box-arrow-down" ></i>&nbsp;Download your top voice certificate</Button>
        </>
    )
}