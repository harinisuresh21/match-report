import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Downloads a DOM element as a high-resolution PNG image
 */
export async function downloadAsImage(element, filename = 'match-report.png', format = 'png') {
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution (Retina / print quality)
      useCORS: true, // Allow cross-origin images
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL(`image/${format}`, 0.95);
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
    alert('Failed to generate image. Please check if external image URLs permit CORS access.');
  }
}

/**
 * Downloads a DOM element as a 1-page PDF document
 */
export async function downloadAsPDF(element, filename = 'match-report.pdf') {
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0a0e1a',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Scale image to fit A4 page while maintaining aspect ratio
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const widthInMm = imgWidth * ratio;
    const heightInMm = imgHeight * ratio;

    const xOffset = (pdfWidth - widthInMm) / 2;
    const yOffset = (pdfHeight - heightInMm) / 2;

    pdf.addImage(imgData, 'JPEG', xOffset, yOffset, widthInMm, heightInMm);
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
}
