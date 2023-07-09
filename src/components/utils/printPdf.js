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
    console.log(innerHTML);
    let fakeIFrame = window.document.createElement("iframe");
    document.body.appendChild(fakeIFrame);
    let fakeContent = fakeIFrame.contentWindow;
    fakeContent.document.open();
    fakeContent.document.write(innerHTML);
    fakeContent.document.close();
    fakeContent.focus();
    fakeIFrame.addEventListener("load", () => {
        fakeContent.print();
    });
}