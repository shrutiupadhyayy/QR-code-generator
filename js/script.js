const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    //show the spinner that we created

    setTimeout(() => {
      hideSpinner();

      //generating the qr code after the spinner is hid
      generateQRCode(url, size);

      setTimeout(() => { 
        //create a variable
        //*From the QR code id element, we need to run query selector on that, we need the image which is inside of it and the address/source to that image
        const saveUrl = qr.querySelector('img').src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        //passing in the id and making an object,
        //a text value which will be the url
        //we get this from the form and passing in this function as an argument
        text: url,
        width: size,
        height: size
    })
}
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

//clearing UI for generation of QR codes in different sizes
    const clearUI = () => {
        qr.innerHTML = '';
        const saveLink = document.getElementById('save-link');
        if (saveLink)
        saveLink.remove();
    };

    const createSaveBtn = (saveUrl) => {
        const link = document.createElement('a');
        link.id = 'save-link';
        link.classList = 'bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
        link.href= saveUrl;
        link.download = 'qrcode';
        link.innerHTML = 'Save Image';
        document.getElementById('generated').appendChild(link);
    };
    //in the image element, it has the current source url, we pass that particular url in this function, we want to make that as the HREF value of the link we are creating
    //that will allow us to click button and download the image


hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
