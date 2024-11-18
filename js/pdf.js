function downloadFile() {
    const link = document.createElement('a');
    link.href = 'img/CV_YVAN_SERIKOFF.pdf'; // Replace with the actual path to the file
    link.download = 'img/CV_YVAN_SERIKOFF.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById("download-pdf").addEventListener("click", () => {
    downloadFile();
});
