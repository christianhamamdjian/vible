export const printPdf = (div) => {
    let innerHTML = `<!DOCTYPE html>
    <html lang="pt-BR">
    <head>   
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link href="/css/app.css" rel="stylesheet" />
    </head>
    <body>`;
    innerHTML += div.innerHTML + "</body></html>";
    let tempIFrame = window.document.createElement("iframe");
    document.body.appendChild(tempIFrame);
    let tempContent = tempIFrame.contentWindow;
    tempContent.document.open();
    tempContent.document.write(innerHTML);
    tempContent.document.close();
    tempContent.focus();
    tempIFrame.addEventListener("load", () => {
        tempContent.print();
    });

    // let printContents = div.innerHTML;
    // let originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
}