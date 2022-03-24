export default function downloadFile(filename: string, field: string) {

    const blob = new Blob([field])
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = `${filename}.csv`;
    a.click();

}