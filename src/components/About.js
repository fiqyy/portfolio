import Resume from '../assets/PDFs/UpdatedResume.pdf';

export default function About() {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = Resume;
        link.download = 'UpdatedResume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="about-container">
            <h1>About Me</h1>
            <div className="pdf-preview-container">
                <div className="pdf-viewer">
                    <iframe
                        src={Resume}
                        width="100%"
                        height="600"
                        title="Resume PDF"
                    />
                    <button className="pdf-download-btn" onClick={handleDownload}>
                        Download CV
                    </button>
                </div>
            </div>
        </div>
    )
}
