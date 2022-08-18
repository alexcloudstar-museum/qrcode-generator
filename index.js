const form = document.getElementById('form');
const url = document.getElementById('url');
const size = document.getElementById('size');
const qrcode = document.getElementById('qrcode');

const submitForm = e => {
  e.preventDefault();

  if (!url.value) return alert('Please provide an url!');

  clearQRCode();

  toggleSpinner();
  setTimeout(() => {
    generateQRCode();

    const img = qrcode.querySelector('img').src;

    toggleSpinner();
    setTimeout(() => {
      generateDownloadLink(img);
      isQrCode = true;
    }, 50);
  }, 1000);
};

const generateDownloadLink = imgSrc => {
  const qrcodeContainer = document.getElementById('qrCodeContainer');
  const link = document.createElement('a');

  link.innerHTML = 'Download image';
  link.title = 'Download image';
  link.id = 'downloadImageUrl';
  const classes = [
    'mt-12',
    'w-1/4',
    'transition-all',
    'text-green-900',
    'bg-white',
    'border',
    'border-green-300',
    'focus:outline-none',
    'hover:bg-green-100',
    'focus:ring-4',
    'focus:ring-green-200',
    'font-medium',
    'rounded-lg',
    'text-sm',
    'px-5',
    'py-2.5',
    'mr-2',
    'mb-2',
    'dark:bg-green-600',
    'dark:text-white',
    'dark:border-green-600',
    'dark:hover:bg-green-700',
    'dark:hover:border-green-600',
    'dark:focus:ring-green-700',
    'mb-8',
    'text-center',
  ];
  link.classList.add(...classes);

  link.href = imgSrc;
  link.download = 'qrcode.jpg';

  qrcodeContainer.appendChild(link);
};

const generateQRCode = () => {
  new QRCode(document.getElementById('qrcode'), {
    text: url.value,
    width: size.value,
    height: size.value,
  });
};

const toggleSpinner = () => {
  const spinner = document.getElementById('spinner');

  if (spinner.classList.contains('hidden'))
    return spinner.classList.remove('hidden');

  return spinner.classList.add('hidden');
};

const clearQRCode = () => {
  qrcode.innerHTML = '';
  const downloadImageUrl = document.getElementById('downloadImageUrl');
  if (downloadImageUrl) downloadImageUrl.remove();
};

form.addEventListener('submit', submitForm);
